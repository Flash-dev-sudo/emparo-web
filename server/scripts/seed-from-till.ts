import { createClient } from "@libsql/client";

// Till system database credentials
const TILL_DB_URL = "libsql://emapro-flash.aws-eu-west-1.turso.io";
const TILL_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDg3MzI4MjgsImlkIjoiNDVlNjg2NjQtZTk5OS00NmYyLWE3NjYtN2Y1NjlkM2M2ZjU0IiwicmlkIjoiNmI1NzJlN2ItMzVlNS00NDJlLTg3MzgtZmQ1ZGZjMWM4MjYyIn0.OdhTd-h9N4OFqGGDCdgdp2fmIJ4XyYM2vYUWobZl0wBzWcPM9cVmQpXPNrBZfFQdDWmjw9s0_SLT7-bSfJLbCg";

async function generateSeedData() {
  try {
    console.log("Connecting to till system database...");
    const tillClient = createClient({
      url: TILL_DB_URL,
      authToken: TILL_DB_AUTH_TOKEN,
    });

    console.log("Fetching categories from till system...");
    const categoriesResult = await tillClient.execute("SELECT id, name FROM categories ORDER BY display_order");
    const categoryMap = new Map();
    categoriesResult.rows.forEach(row => {
      categoryMap.set(row.id, row.name);
    });

    console.log("Fetching menu items from till system...");
    const menuResult = await tillClient.execute("SELECT * FROM menu_items WHERE available = 1 ORDER BY category_id, name");
    
    console.log(`Found ${menuResult.rows.length} available items in till system`);

    // Generate TypeScript array for manual seeding
    const items = menuResult.rows.map((item: any, index: number) => {
      const categoryName = categoryMap.get(item.category_id) || 'Other';
      const price = Number(item.price) / 100; // Convert from pence to pounds
      
      return {
        id: index + 1, // Sequential IDs starting from 1
        name: String(item.name),
        description: String(item.description),
        price: price,
        category: categoryName,
        image: 'image',
        heatLevel: 1
      };
    });

    console.log("Generated seed data:");
    console.log("export const tillMenuItems = " + JSON.stringify(items, null, 2) + ";");
    
    // Display categories summary
    console.log("\nMenu categories found:");
    categoryMap.forEach((name, id) => {
      const count = items.filter(item => item.category === name).length;
      console.log(`- ${name}: ${count} items`);
    });

  } catch (error) {
    console.error("Error fetching till data:", error);
  }
}

generateSeedData();