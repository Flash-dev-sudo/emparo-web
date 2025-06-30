import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { menuItems } from "@shared/schema";

// Till system credentials (READ ONLY - NO CHANGES)
const TILL_DATABASE_URL = process.env.TILL_DATABASE_URL;
const TILL_DATABASE_AUTH_TOKEN = process.env.TILL_DATABASE_AUTH_TOKEN;

// Website database credentials
const WEBSITE_DATABASE_URL = "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const WEBSITE_DATABASE_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const tillClient = createClient({
  url: TILL_DATABASE_URL,
  authToken: TILL_DATABASE_AUTH_TOKEN,
});

const websiteClient = createClient({
  url: WEBSITE_DATABASE_URL,
  authToken: WEBSITE_DATABASE_AUTH_TOKEN,
});

const websiteDb = drizzle(websiteClient);

async function copyAuthenticData() {
  try {
    console.log("🔍 Reading authentic data from till system (READ ONLY)...");
    
    // Get categories mapping
    const categoriesResult = await tillClient.execute("SELECT * FROM categories;");
    console.log("Categories found:", categoriesResult.rows);
    
    const categoryMap: { [key: number]: string } = {};
    categoriesResult.rows.forEach(row => {
      categoryMap[row.id as number] = row.name as string;
    });
    
    // Get all menu items
    const menuResult = await tillClient.execute("SELECT * FROM menu_items WHERE available = 1;");
    console.log(`Found ${menuResult.rows.length} available menu items`);
    
    // Transform data for website
    const transformedItems = menuResult.rows.map(row => ({
      name: row.name as string,
      description: row.description as string,
      price: (row.price as number) / 100, // Convert pence to pounds
      category: categoryMap[row.category_id as number] || "Other",
    }));
    
    console.log("Sample transformed items:");
    transformedItems.slice(0, 3).forEach(item => {
      console.log(`- ${item.name}: £${item.price} (${item.category})`);
    });
    
    // Clear website database and insert authentic data
    console.log("\n📝 Updating website database with authentic data...");
    await websiteDb.delete(menuItems);
    
    // Insert in batches
    const batchSize = 10;
    let totalInserted = 0;
    
    for (let i = 0; i < transformedItems.length; i += batchSize) {
      const batch = transformedItems.slice(i, i + batchSize);
      await websiteDb.insert(menuItems).values(batch);
      totalInserted += batch.length;
      console.log(`Inserted batch: ${totalInserted}/${transformedItems.length} items`);
    }
    
    // Display final category breakdown
    const categoryBreakdown: { [key: string]: number } = {};
    transformedItems.forEach(item => {
      categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + 1;
    });
    
    console.log("\n✅ Website updated with authentic menu:");
    Object.entries(categoryBreakdown).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} items`);
    });
    
    console.log(`\nTotal: ${transformedItems.length} authentic menu items`);
    
  } catch (error) {
    console.error("❌ Error copying authentic data:", error);
  }
}

copyAuthenticData();