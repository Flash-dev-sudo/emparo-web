import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { menuItems } from "@shared/schema";

// Till system database credentials
const TILL_DB_URL = "libsql://emapro-flash.aws-eu-west-1.turso.io";
const TILL_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDg3MzI4MjgsImlkIjoiNDVlNjg2NjQtZTk5NC00NmYyLWE3NjYtN2Y1NjlkM2M2ZjU0IiwicmlkIjoiNmI1NzJlN2ItMzVlNS00NDJlLTg3MzgtZmQ1ZGZjMWM4MjYyIn0.OdhTd-h9N4OFqGGDCdgdp2fmIJ4XyYM2vYUWobZl0wBzWcPM9cVmQpXPNrBZfFQdDWmjw9s0_SLT7-bSfJLbCg";

// Website database credentials
const WEBSITE_DB_URL = "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const WEBSITE_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

async function simpleMigration() {
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

    console.log("Fetching categories from till system...");
    const categoriesResult = await tillClient.execute("SELECT id, name FROM categories ORDER BY display_order");
    const categoryMap = new Map();
    categoriesResult.rows.forEach(row => {
      categoryMap.set(row.id, row.name);
    });

    console.log("Fetching menu items from till system...");
    const menuResult = await tillClient.execute("SELECT * FROM menu_items WHERE available = 1 ORDER BY category_id, name");
    
    console.log(`Found ${menuResult.rows.length} available items in till system`);

    console.log("Clearing existing menu items from website database...");
    await websiteClient.execute("DELETE FROM menu_items");

    console.log("Inserting menu items directly with SQL...");
    
    for (const item of menuResult.rows) {
      const categoryName = categoryMap.get(item.category_id) || 'Other';
      const price = item.price / 100; // Convert from pence to pounds
      
      await websiteClient.execute({
        sql: "INSERT INTO menu_items (id, name, description, price, category, image, heat_level) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [item.id, item.name, item.description, price, categoryName, 'image', 1]
      });
    }

    console.log(`Successfully migrated ${menuResult.rows.length} menu items`);
    
    // Display categories summary
    console.log("\nMenu categories:");
    categoryMap.forEach((name, id) => {
      const count = menuResult.rows.filter((item: any) => categoryMap.get(item.category_id) === name).length;
      console.log(`- ${name}: ${count} items`);
    });

  } catch (error) {
    console.error("Error migrating data:", error);
  }
}

simpleMigration();