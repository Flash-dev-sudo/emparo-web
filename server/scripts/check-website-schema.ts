import { createClient } from "@libsql/client";

// Website database credentials
const WEBSITE_DB_URL = "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const WEBSITE_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIDoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

async function checkWebsiteSchema() {
  try {
    console.log("Connecting to website database...");
    const websiteClient = createClient({
      url: WEBSITE_DB_URL,
      authToken: WEBSITE_DB_AUTH_TOKEN,
    });
    
    console.log("Checking schema for menu_items table...");
    const schema = await websiteClient.execute("PRAGMA table_info(menu_items)");
    console.log("Current menu_items schema:");
    console.log(JSON.stringify(schema.rows, null, 2));

    console.log("\nCurrent data in menu_items:");
    const data = await websiteClient.execute("SELECT * FROM menu_items LIMIT 3");
    console.log(JSON.stringify(data.rows, null, 2));

  } catch (error) {
    console.error("Error checking schema:", error);
  }
}

checkWebsiteSchema();