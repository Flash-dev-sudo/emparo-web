import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { menuItems } from "@shared/schema";

// Till system database credentials
const TILL_DB_URL = "libsql://emapro-flash.aws-eu-west-1.turso.io";
const TILL_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDg3MzI4MjgsImlkIjoiNDVlNjg2NjQtZTk5NC00NmYyLWE3NjYtN2Y1NjlkM2M2ZjU0IiwicmlkIjoiNmI1NzJlN2ItMzVlNS00NDJlLTg3MzgtZmQ1ZGZjMWM4MjYyIn0.OdhTd-h9N4OFqGGDCdgdp2fmIJ4XyYM2vYUWobZl0wBzWcPM9cVmQpXPNrBZfFQdDWmjw9s0_SLT7-bSfJLbCg";

// Website database credentials
const WEBSITE_DB_URL = "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const WEBSITE_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

async function migrateCompleteMenu() {
  try {
    console.log("Connecting to till system database...");
    const tillClient = createClient({
      url: TILL_DB_URL,
      authToken: TILL_DB_AUTH_TOKEN,
    });

    console.log("Connecting to website database...");
    const websiteClient = createClient({
      url: WEBSITE_DB_URL,
      authToken: WEBSITE_DB_AUTH_TOKEN,
    });
    const websiteDb = drizzle(websiteClient);

    console.log("Fetching categories from till system...");
    const categoriesResult = await tillClient.execute("SELECT id, name FROM categories ORDER BY display_order");
    const categoryMap = new Map();
    categoriesResult.rows.forEach(row => {
      categoryMap.set(row.id, row.name);
    });

    console.log("Fetching menu items from till system...");
    const menuResult = await tillClient.execute("SELECT * FROM menu_items WHERE available = 1 ORDER BY category_id, name");
    
    console.log(`Found ${menuResult.rows.length} available items in till system`);

    // Transform data to match website schema
    const transformedItems = menuResult.rows.map((item: any) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price / 100, // Convert from pence to pounds
      category: categoryMap.get(item.category_id) || 'Other',
      image: 'image', // Placeholder for now
      heatLevel: null
    }));

    console.log("Clearing existing menu items from website database...");
    await websiteDb.delete(menuItems);

    console.log("Inserting transformed menu items to website database...");
    
    // Insert in batches to avoid issues
    const batchSize = 10;
    for (let i = 0; i < transformedItems.length; i += batchSize) {
      const batch = transformedItems.slice(i, i + batchSize);
      await websiteDb.insert(menuItems).values(batch);
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(transformedItems.length/batchSize)}`);
    }

    console.log(`Successfully migrated ${transformedItems.length} menu items`);
    
    // Display categories summary
    console.log("\nMenu categories:");
    categoryMap.forEach((name, id) => {
      const count = transformedItems.filter(item => item.category === name).length;
      console.log(`- ${name}: ${count} items`);
    });

  } catch (error) {
    console.error("Error migrating data:", error);
  }
}

migrateCompleteMenu();