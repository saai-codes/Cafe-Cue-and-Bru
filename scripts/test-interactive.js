import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const VIEWPORTS = [
  { name: 'Small Phone (iPhone SE 1st gen)', width: 320, height: 568 },
  { name: 'Standard Android (Galaxy S20)', width: 360, height: 800 },
  { name: 'Modern iPhone (12/13/14)', width: 390, height: 844 },
  { name: 'Large Phone (Pro Max / Plus)', width: 430, height: 932 },
  { name: 'Tablet Portrait (iPad 10")', width: 768, height: 1024 },
  { name: 'Tablet Landscape (iPad 10")', width: 1024, height: 768 },
  { name: 'HD Laptop (1280x720)', width: 1280, height: 720 },
  { name: 'Standard Laptop (1366x768)', width: 1366, height: 768 },
  { name: 'Full HD Desktop (1080p)', width: 1920, height: 1080 },
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
  const server = spawn('node', ['./node_modules/vite/bin/vite.js', 'preview', '--port', '4173'], {
    stdio: 'ignore',
  });

  try {
    await waitForServer('http://localhost:4173');
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    console.log('=================================================================');
    console.log('   CAFE CUE & BREW — INTERACTIVE STATE & VIEWPORT AUDIT');
    console.log('=================================================================\n');

    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });

      console.log(`Auditing ${vp.name} (${vp.width}x${vp.height}):`);

      // 1. Mobile navigation test (if width < 1024)
      if (vp.width < 1024) {
        const opened = await page.evaluate(() => {
          const btn = document.querySelector('button[aria-label="Open Navigation Menu"]');
          if (btn) {
            btn.click();
            return true;
          }
          return false;
        });

        if (opened) {
          await new Promise((r) => setTimeout(r, 400));
          const drawerStats = await page.evaluate(() => {
            const drawer = document.querySelector('[role="dialog"]');
            if (!drawer) return null;
            const inner = drawer.querySelector('.bg-\\[\\#0E1522\\]') || drawer;
            const rect = inner.getBoundingClientRect();
            return {
              width: Math.round(rect.width),
              right: Math.round(rect.right),
              left: Math.round(rect.left),
              windowWidth: window.innerWidth,
              overflow: rect.right > window.innerWidth + 1 || rect.left < -1,
            };
          });

          const status = drawerStats && !drawerStats.overflow ? '✅ Fits Screen' : '⚠️ Overflow';
          console.log(`  - Mobile Menu Drawer: ${status} (Width: ${drawerStats?.width}px, Window: ${vp.width}px)`);

          // Close drawer via Escape
          await page.keyboard.press('Escape');
          await new Promise((r) => setTimeout(r, 300));
        }
      }

      // 2. Quick View modal test
      await page.evaluate(() => {
        document.getElementById('menu')?.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 400));

      const qvOpened = await page.evaluate(() => {
        const btn = document.querySelector('button[title="View dish details"]');
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });

      if (qvOpened) {
        await new Promise((r) => setTimeout(r, 450));
        const modalStats = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"]');
          if (!dialog) return null;
          const card = dialog.querySelector('.max-w-2xl') || dialog;
          const rect = card.getBoundingClientRect();
          return {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            right: Math.round(rect.right),
            left: Math.round(rect.left),
            windowWidth: window.innerWidth,
            overflow: rect.right > window.innerWidth + 1 || rect.left < -1,
          };
        });

        const status = modalStats && !modalStats.overflow ? '✅ Fits Screen' : '⚠️ Overflow';
        console.log(`  - Quick View Modal: ${status} (Card: ${modalStats?.width}x${modalStats?.height}px, Window: ${vp.width}px)`);

        // Close modal via Escape
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 300));
      }

      // 3. Add to estimate tray & open drawer
      const addClicked = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const addBtn = btns.find((b) => b.textContent && b.textContent.includes('Add to Estimate'));
        if (addBtn) {
          addBtn.click();
          return true;
        }
        return false;
      });

      if (addClicked) {
        await new Promise((r) => setTimeout(r, 400));
        await page.evaluate(() => {
          const btns = Array.from(document.querySelectorAll('button'));
          const floatBtn = btns.find((b) => b.textContent && b.textContent.includes('View Estimate'));
          if (floatBtn) floatBtn.click();
        });

        await new Promise((r) => setTimeout(r, 450));
        const drawerStats = await page.evaluate(() => {
          const dialog = document.querySelector('[role="dialog"]');
          if (!dialog) return null;
          const panel = dialog.querySelector('.bg-\\[\\#121927\\]');
          if (!panel) return null;
          const rect = panel.getBoundingClientRect();
          return {
            width: Math.round(rect.width),
            right: Math.round(rect.right),
            left: Math.round(rect.left),
            windowWidth: window.innerWidth,
            overflow: rect.right > window.innerWidth + 1,
          };
        });

        const status = drawerStats && !drawerStats.overflow ? '✅ Fits Screen' : '⚠️ Overflow';
        console.log(`  - Order Estimate Drawer: ${status} (Drawer: ${drawerStats?.width}px, Left: ${drawerStats?.left}px, Window: ${vp.width}px)`);

        // Close drawer via Escape
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 300));
      }

      // 4. Ambience Lightbox test
      await page.evaluate(() => {
        document.getElementById('ambience')?.scrollIntoView();
      });
      await new Promise((r) => setTimeout(r, 400));

      const cardClicked = await page.evaluate(() => {
        const card = document.querySelector('#ambience .cursor-pointer');
        if (card) {
          card.click();
          return true;
        }
        return false;
      });

      if (cardClicked) {
        await new Promise((r) => setTimeout(r, 450));
        const lbStats = await page.evaluate(() => {
          const card = document.querySelector('#ambience .max-w-4xl');
          if (!card) return null;
          const rect = card.getBoundingClientRect();
          return {
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            right: Math.round(rect.right),
            left: Math.round(rect.left),
            windowWidth: window.innerWidth,
            overflow: rect.right > window.innerWidth + 1 || rect.left < -1,
          };
        });

        const status = lbStats && !lbStats.overflow ? '✅ Fits Screen' : '⚠️ Overflow';
        console.log(`  - Ambience Lightbox: ${status} (Lightbox: ${lbStats?.width}x${lbStats?.height}px, Window: ${vp.width}px)`);

        // Close lightbox via Escape
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 300));
      }

      console.log('');
    }

    if (consoleErrors.length > 0) {
      console.log('Console Errors Detected:');
      consoleErrors.forEach((e) => console.log(' - ' + e));
    } else {
      console.log('✅ Zero console errors detected during interactive tests.');
    }

    await browser.close();
  } finally {
    server.kill();
  }
}

run().catch(console.error);
