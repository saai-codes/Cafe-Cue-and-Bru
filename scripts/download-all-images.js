import fs from 'fs';
import path from 'path';
import https from 'https';

const images = [
  // Hero & Ambience
  {
    dest: 'public/images/hero/rooftop-hero.jpg',
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1920&q=80',
    title: 'Rooftop Cafe Sunset View'
  },
  {
    dest: 'public/images/ambience/rooftop-terrace.jpg',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    title: 'Warm Rooftop Terrace Seating'
  },
  {
    dest: 'public/images/ambience/rooftop-night.jpg',
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    title: 'Rooftop Night Ambience and Fairy Lights'
  },
  {
    dest: 'public/images/ambience/cafe-interior.jpg',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    title: 'Cozy Cafe Interior Lounge'
  },
  {
    dest: 'public/images/ambience/sunset-city.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Sunset Golden Hour Sky'
  },

  // Pool & Snooker
  {
    dest: 'public/images/pool/pool-table-hero.jpg',
    url: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1400&q=80',
    title: 'Snooker Table Balls and Cue'
  },
  {
    dest: 'public/images/pool/pool-balls-rack.jpg',
    url: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=1200&q=80',
    title: 'Snooker Triangle Rack and Felt'
  },
  {
    dest: 'public/images/pool/pool-lounge.jpg',
    url: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=1200&q=80',
    title: 'Billiards Lounge Gaming Room'
  },

  // Starters
  {
    dest: 'public/images/food/starters/cheese-chilli-nachos.jpg',
    url: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    title: 'Cheese Chilli Nachos'
  },
  {
    dest: 'public/images/food/starters/garlic-bread.jpg',
    url: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=800&q=80',
    title: 'Herbed Garlic Bread'
  },
  {
    dest: 'public/images/food/starters/cheese-garlic-bread.jpg',
    url: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=800&q=80',
    title: 'Cheese Garlic Bread'
  },
  {
    dest: 'public/images/food/starters/bread-pizza.jpg',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    title: 'Bread Pizza Toast'
  },
  {
    dest: 'public/images/food/starters/paneer-chilli.jpg',
    url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    title: 'Chilli Paneer Starter'
  },

  // Hot Beverages
  {
    dest: 'public/images/food/beverages/espresso.jpg',
    url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    title: 'Fresh Crema Espresso'
  },
  {
    dest: 'public/images/food/beverages/cappuccino.jpg',
    url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    title: 'Frothy Cappuccino with Latte Art'
  },
  {
    dest: 'public/images/food/beverages/cafe-latte.jpg',
    url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80',
    title: 'Smooth Cafe Latte'
  },
  {
    dest: 'public/images/food/beverages/hot-chocolate.jpg',
    url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    title: 'Rich Hot Chocolate'
  },
  {
    dest: 'public/images/food/beverages/masala-chai.jpg',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    title: 'Authentic Masala Chai'
  },

  // Cold Beverages
  {
    dest: 'public/images/food/beverages/iced-latte.jpg',
    url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    title: 'Classic Iced Latte'
  },
  {
    dest: 'public/images/food/beverages/cold-coffee.jpg',
    url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    title: 'Creamy Cold Coffee'
  },
  {
    dest: 'public/images/food/beverages/cold-coffee-icecream.jpg',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    title: 'Cold Coffee with Ice Cream Float'
  },
  {
    dest: 'public/images/food/beverages/iced-americano.jpg',
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    title: 'Iced Americano'
  },
  {
    dest: 'public/images/food/beverages/peach-iced-tea.jpg',
    url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    title: 'Peach Iced Tea'
  },

  // Sandwiches
  {
    dest: 'public/images/food/sandwiches/veg-grilled-sandwich.jpg',
    url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    title: 'Veg Grilled Sandwich'
  },
  {
    dest: 'public/images/food/sandwiches/cheese-grilled-sandwich.jpg',
    url: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=800&q=80',
    title: 'Cheese Grilled Sandwich'
  },
  {
    dest: 'public/images/food/sandwiches/veg-club-sandwich.jpg',
    url: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=800&q=80',
    title: 'Veg Club Sandwich'
  },
  {
    dest: 'public/images/food/sandwiches/paneer-tikka-sandwich.jpg',
    url: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&w=800&q=80',
    title: 'Paneer Tikka Sandwich'
  },
  {
    dest: 'public/images/food/sandwiches/chicken-grilled-sandwich.jpg',
    url: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80',
    title: 'Chicken Grilled Sandwich'
  },

  // Fries
  {
    dest: 'public/images/food/fries/salted-fries.jpg',
    url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    title: 'Salted French Fries'
  },
  {
    dest: 'public/images/food/fries/peri-peri-fries.jpg',
    url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    title: 'Peri Peri Fries'
  },
  {
    dest: 'public/images/food/fries/cheese-fries.jpg',
    url: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    title: 'Cheesy Loaded Fries'
  },

  // Mojitos
  {
    dest: 'public/images/food/mojitos/lemon-mojito.jpg',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    title: 'Lemon Mint Mojito'
  },
  {
    dest: 'public/images/food/mojitos/green-apple-mojito.jpg',
    url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    title: 'Green Apple Mojito'
  },
  {
    dest: 'public/images/food/mojitos/pineapple-mojito.jpg',
    url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80',
    title: 'Pineapple Mojito'
  },
  {
    dest: 'public/images/food/mojitos/ocean-blue-mojito.jpg',
    url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80',
    title: 'Ocean Blue Mojito'
  },
  {
    dest: 'public/images/food/mojitos/spicy-guava-mojito.jpg',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    title: 'Spicy Guava Mojito'
  },

  // Burger Menu
  {
    dest: 'public/images/food/burgers/reg-cheese-burger.jpg',
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    title: 'Regular Cheese Burger'
  },
  {
    dest: 'public/images/food/burgers/cheese-burger.jpg',
    url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    title: 'Gourmet Cheese Burger'
  },
  {
    dest: 'public/images/food/burgers/double-cheese-burger.jpg',
    url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    title: 'Double Cheese Burger'
  },
  {
    dest: 'public/images/food/burgers/special-double-patty-burger.jpg',
    url: 'https://images.unsplash.com/photo-1583032015879-6a3c42a259c6?auto=format&fit=crop&w=800&q=80',
    title: 'Cafe Special Double Patty Burger'
  },
  {
    dest: 'public/images/food/burgers/sizzling-burger.jpg',
    url: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    title: 'Sizzling Burger Platter'
  },

  // Chocolate Fun & Desserts
  {
    dest: 'public/images/food/desserts/chocolate-blast-sundae.jpg',
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    title: 'Chocolate Blast Sundae'
  },
  {
    dest: 'public/images/food/desserts/hot-chocolate-fudge.jpg',
    url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    title: 'Hot Chocolate Fudge Sundae'
  },
  {
    dest: 'public/images/food/desserts/sizzling-brownie.jpg',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    title: 'Sizzling Brownie with Ice Cream'
  },
  {
    dest: 'public/images/food/desserts/freyo-tower.jpg',
    url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    title: 'FREYO Tower Rooftop Special'
  },

  // Milkshakes (Each flavor specifically matched!)
  {
    dest: 'public/images/food/shakes/strawberry-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    title: 'Strawberry Milkshake'
  },
  {
    dest: 'public/images/food/shakes/mango-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    title: 'Mango Milkshake'
  },
  {
    dest: 'public/images/food/shakes/butterscotch-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    title: 'Butterscotch Milkshake'
  },
  {
    dest: 'public/images/food/shakes/vanilla-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1577805947695-8d1ab47743d2?auto=format&fit=crop&w=800&q=80',
    title: 'Vanilla Milkshake'
  },
  {
    dest: 'public/images/food/shakes/rose-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    title: 'Rose Milkshake'
  },
  {
    dest: 'public/images/food/shakes/chocolate-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
    title: 'Chocolate Milkshake'
  },
  {
    dest: 'public/images/food/shakes/pistachio-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    title: 'Pistachio Milkshake'
  },
  {
    dest: 'public/images/food/shakes/pineapple-milkshake.jpg',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    title: 'Pineapple Milkshake'
  },
  {
    dest: 'public/images/food/shakes/oreo-shake.jpg',
    url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    title: 'Oreo Shake'
  },
  {
    dest: 'public/images/food/shakes/kitkat-shake.jpg',
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    title: 'Kitkat Shake'
  },
  {
    dest: 'public/images/food/shakes/white-chocolate-shake.jpg',
    url: 'https://images.unsplash.com/photo-1577805947695-8d1ab47743d2?auto=format&fit=crop&w=800&q=80',
    title: 'White Chocolate Shake'
  },

  // Momos
  {
    dest: 'public/images/food/momos/regular-momos.jpg',
    url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    title: 'Steamed Regular Momos'
  },
  {
    dest: 'public/images/food/momos/tandoori-momos.jpg',
    url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    title: 'Tandoori Momos'
  },
  {
    dest: 'public/images/food/momos/peri-peri-momos.jpg',
    url: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=800&q=80',
    title: 'Peri Peri Momos'
  },
  {
    dest: 'public/images/food/momos/schezwan-momos.jpg',
    url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    title: 'Schezwan Momos'
  },
  {
    dest: 'public/images/food/momos/fried-momos.jpg',
    url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
    title: 'Golden Fried Momos'
  },

  // Pizza
  {
    dest: 'public/images/food/pizza/margherita-pizza.jpg',
    url: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    title: 'Classic Margherita Pizza'
  },
  {
    dest: 'public/images/food/pizza/veggie-supreme-pizza.jpg',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    title: 'Veggie Supreme Pizza'
  },
  {
    dest: 'public/images/food/pizza/paneer-tikka-pizza.jpg',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    title: 'Paneer Tikka Pizza'
  },
  {
    dest: 'public/images/food/pizza/cheese-corn-pizza.jpg',
    url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    title: 'Cheese Corn Pizza'
  },
  {
    dest: 'public/images/food/pizza/chicken-bbq-pizza.jpg',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    title: 'Chicken BBQ Pizza'
  },

  // Maggie
  {
    dest: 'public/images/food/maggie/plain-maggie.jpg',
    url: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    title: 'Plain Maggie'
  },
  {
    dest: 'public/images/food/maggie/masala-maggie.jpg',
    url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    title: 'Masala Maggie'
  },
  {
    dest: 'public/images/food/maggie/cheese-maggie.jpg',
    url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80',
    title: 'Cheese Maggie'
  },
  {
    dest: 'public/images/food/maggie/veggie-maggie.jpg',
    url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    title: 'Veggie Masala Maggie'
  },
  {
    dest: 'public/images/food/maggie/peri-peri-maggie.jpg',
    url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    title: 'Peri Peri Maggie'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      // Already downloaded
      return resolve('Already exists');
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`Failed with status code: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve('Downloaded'));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${images.length} curated images...`);
  let successCount = 0;
  let failCount = 0;

  for (const img of images) {
    try {
      const res = await downloadFile(img.url, img.dest);
      console.log(`✓ [${res}] ${img.title} -> ${img.dest}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Error downloading ${img.title}: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nCompleted: ${successCount} successful, ${failCount} failed.`);
}

run();

