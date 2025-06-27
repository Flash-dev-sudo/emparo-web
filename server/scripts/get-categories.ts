import { createClient } from "@libsql/client";

// Till system database credentials
const TILL_DB_URL = "libsql://emapro-flash.aws-eu-west-1.turso.io";
const TILL_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDg3MzI4MjgsImlkIjoiNDVlNjg2NjQtZTk5NC00NmYyLWE3NjYtN2Y1NjlkM2M2ZjU0IiwicmlkIjoiNmI1NzJlN2ItMzVlNS00NDJlLTg3MzgtZmQ1ZGZjMWM4MjYyIn0.OdhTd-h9N4OFqGGDCdgdp2fmIJ4XyYM2vYUWobZl0wBzWcPM9cVmQpXPNrBZfFQdDWmjw9s0_SLT7-bSfJLbCg";

async function getCategories() {
  try {
    console.log("Connecting to till system database...");
    const tillClient = createClient({
      url: TILL_DB_URL,
      authToken: TILL_DB_AUTH_TOKEN,
    });
    
    console.log("Checking for categories table...");
    const tables = await tillClient.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log("Available tables:");
    tables.rows.forEach(row => console.log(`- ${row.name}`));
    
    // Try to find categories
    try {
      const categories = await tillClient.execute("SELECT * FROM categories");
      console.log("\nCategories found:");
      console.log(JSON.stringify(categories.rows, null, 2));
    } catch (e) {
      console.log("\nNo categories table found, checking for category names in menu_items...");
      const uniqueCategories = await tillClient.execute("SELECT DISTINCT category_id FROM menu_items ORDER BY category_id");
      console.log("Unique category IDs:");
      console.log(JSON.stringify(uniqueCategories.rows, null, 2));
    }

  } catch (error) {
    console.error("Error:", error);
  }
}

getCategories();