import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const VIEWPORTS = [
  { name: 'Small Phone (iPhone SE)', width: 320, height: 568 },
  { name: 'Standard Android', width: 360, height: 800 },
  { name: 'Modern iPhone (12/13/14)', width: 390, height: 844 },
  { name: 'Large Phone (Pro Max)', width: 430, height: 932 },
  { name: 'Tablet Portrait (iPad)', width: 768, height: 1024 },
  { name: 'Tablet Landscape (iPad)', width: 1024, height: 768 },
  { name: 'Small Laptop / HD', width: 1280, height: 720 },
  { name: 'Standard Laptop', width: 1366, height: 768 },
  { name: 'Full HD Desktop', width: 1920, height: 1080 },
];

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(1000, () => req.destroy(new Error('Timeout')));
      });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
}

async function run() {
  console.log('Starting preview server for audit...');
  const server = spawn('node', ['./node_modules/vite/bin/vite.js', 'preview', '--port', '4173'], {
    stdio: 'ignore',
  });

  try {
    await waitForServer('http://localhost:4173');
    console.log('Preview server ready at http://localhost:4173\n');

    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    console.log('=================================================================');
    console.log('   CAFE CUE & BREW — RESPONSIVE & HORIZONTAL OVERFLOW AUDIT');
    console.log('=================================================================\n');

    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });

      // Check horizontal scroll / overflow
      const overflowMetrics = await page.evaluate(() => {
        const docEl = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
        const innerWidth = window.innerWidth;
        const hasOverflow = scrollWidth > innerWidth;

        // Find elements wider than innerWidth or offset beyond innerWidth
        const overflowingElements = [];
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > innerWidth + 1.5 || rect.left < -1.5) {
            overflowingElements.push({
              tag: el.tagName.toLowerCase(),
              id: el.id,
              className: el.className ? String(el.className).slice(0, 80) : '',
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              scrollWidth: el.scrollWidth,
            });
          }
        }

        return {
          scrollWidth,
          innerWidth,
          hasOverflow,
          overflowCount: overflowingElements.length,
          topOverflows: overflowingElements.slice(0, 5),
        };
      });

      const status = overflowMetrics.hasOverflow ? '⚠️  OVERFLOW' : '✅ PASS';
      console.log(
        `[${status}] ${vp.name.padEnd(26)} | Viewport: ${String(vp.width).padStart(4)}x${String(vp.height).padEnd(4)} | Doc scrollWidth: ${overflowMetrics.scrollWidth}px`
      );

      if (overflowMetrics.hasOverflow) {
        console.log(`     Found ${overflowMetrics.overflowCount} overflowing elements:`);
        for (const el of overflowMetrics.topOverflows) {
          console.log(`     - <${el.tag}> ${el.id ? '#' + el.id : ''} right:${el.right}px (viewport:${vp.width}px) class: "${el.className}"`);
        }
      }
    }

    if (consoleErrors.length > 0) {
      console.log('\nConsole Errors Detected:');
      consoleErrors.forEach((e) => console.log(' - ' + e));
    } else {
      console.log('\n✅ Zero console errors detected.');
    }

    await browser.close();
  } finally {
    server.kill();
  }
}

run().catch((err) => {
  console.error('Audit script error:', err);
  process.exit(1);
});
