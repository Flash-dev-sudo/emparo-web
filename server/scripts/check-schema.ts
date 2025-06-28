import { createClient } from "@libsql/client";

const DATABASE_URL = process.env.TILL_DATABASE_URL || "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = process.env.TILL_DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

async function checkSchema() {
  console.log("🔍 Checking database schema...");
  
  try {
    // Check if table exists and get its structure
    const result = await client.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='menu_items';");
    console.log("Table schema:", result.rows);
    
    // Check existing data
    const dataResult = await client.execute("SELECT * FROM menu_items LIMIT 3;");
    console.log("Sample data:", dataResult.rows);
    
    // Get column info
    const columnsResult = await client.execute("PRAGMA table_info(menu_items);");
    console.log("Columns:", columnsResult.rows);
    
  } catch (error) {
    console.error("❌ Error checking schema:", error);
  }
}

checkSchema();