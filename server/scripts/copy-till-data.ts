import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { menuItems } from "@shared/schema";

// Till system database credentials
const TILL_DB_URL = "libsql://emapro-flash.aws-eu-west-1.turso.io";
const TILL_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDg3MzI4MjgsImlkIjoiNDVlNjg2NjQtZTk5NC00NmYyLWE3NjYtN2Y1NjlkM2M2ZjU0IiwicmlkIjoiNmI1NzJlN2ItMzVlNS00NDJlLTg3MzgtZmQ1ZGZjMWM4MjYyIn0.OdhTd-h9N4OFqGGDCdgdp2fmIJ4XyYM2vYUWobZl0wBzWcPM9cVmQpXPNrBZfFQdDWmjw9s0_SLT7-bSfJLbCg";

// Website database credentials
const WEBSITE_DB_URL = "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const WEBSITE_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

async function copyTillDataToWebsite() {
  try {
    console.log("Connecting to till system database...");
    const tillClient = createClient({
      url: TILL_DB_URL,
      authToken: TILL_DB_AUTH_TOKEN,
    });
    const tillDb = drizzle(tillClient);

    console.log("Connecting to website database...");
    const websiteClient = createClient({
      url: WEBSITE_DB_URL,
      authToken: WEBSITE_DB_AUTH_TOKEN,
    });
    const websiteDb = drizzle(websiteClient);

    console.log("Fetching menu items from till system...");
    const tillMenuItems = await tillDb.select().from(menuItems);
    console.log(`Found ${tillMenuItems.length} items in till system`);

    console.log("Clearing existing menu items from website database...");
    await websiteDb.delete(menuItems);

    console.log("Copying menu items to website database...");
    if (tillMenuItems.length > 0) {
      await websiteDb.insert(menuItems).values(tillMenuItems);
    }

    console.log(`Successfully copied ${tillMenuItems.length} menu items to website database`);
    
    // Display categories summary
    const categoryMap = new Map<string, number>();
    tillMenuItems.forEach(item => {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + 1);
    });
    
    console.log("\nMenu categories:");
    categoryMap.forEach((count, category) => {
      console.log(`- ${category}: ${count} items`);
    });

  } catch (error) {
    console.error("Error copying data:", error);
  }
}

// Only run if credentials are provided
if (TILL_DB_URL && TILL_DB_AUTH_TOKEN) {
  copyTillDataToWebsite();
} else {
  console.log("Please provide till system database credentials in this script");
}