import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Till system credentials
const TILL_DATABASE_URL = process.env.TILL_DATABASE_URL;
const TILL_DATABASE_AUTH_TOKEN = process.env.TILL_DATABASE_AUTH_TOKEN;

const tillClient = createClient({
  url: TILL_DATABASE_URL,
  authToken: TILL_DATABASE_AUTH_TOKEN,
});

const tillDb = drizzle(tillClient);

async function getAuthenticMenu() {
  try {
    console.log("Connecting to authentic till system...");
    
    // Get all tables first
    const tables = await tillClient.execute("SELECT name FROM sqlite_master WHERE type='table';");
    console.log("Available tables:", tables.rows.map(row => row[0]));
    
    // Try to get menu items from likely table names
    const possibleTables = ['menu_items', 'items', 'products', 'menu', 'food_items'];
    
    for (const tableName of possibleTables) {
      try {
        console.log(`\nChecking table: ${tableName}`);
        const result = await tillClient.execute(`SELECT * FROM ${tableName} LIMIT 5;`);
        if (result.rows.length > 0) {
          console.log(`Found data in ${tableName}:`);
          console.log("Columns:", result.columns);
          console.log("Sample rows:", result.rows);
        }
      } catch (error) {
        console.log(`Table ${tableName} not found or error:`, error.message);
      }
    }
    
  } catch (error) {
    console.error("Error connecting to till system:", error);
  }
}

getAuthenticMenu();