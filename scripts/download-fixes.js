import fs from 'fs';
import path from 'path';
import https from 'https';

const fixImages = [
  {
    dest: 'public/images/food/fries/salted-fries.jpg',
    url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    title: 'Salted French Fries'
  },
  {
    dest: 'public/images/food/burgers/special-double-patty-burger.jpg',
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    title: 'Cafe Special Double Patty Burger'
  },
  {
    dest: 'public/images/food/shakes/vanilla-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1579954115567-dff2eeb6fdeb?auto=format&fit=crop&w=800&q=80',
    title: 'Vanilla Milkshake'
  },
  {
    dest: 'public/images/food/shakes/white-chocolate-shake.jpg',
    url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    title: 'White Chocolate Shake'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Status: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve('Downloaded'));
      });
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  for (const img of fixImages) {
    try {
      const res = await downloadFile(img.url, img.dest);
      console.log(`✓ [${res}] ${img.title} -> ${img.dest}`);
    } catch (err) {
      console.error(`✗ Error downloading ${img.title}: ${err.message}`);
    }
  }
}

run();

