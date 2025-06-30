import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { menuItems } from "@shared/schema";

const DATABASE_URL = process.env.TILL_DATABASE_URL || "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = process.env.TILL_DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

async function fixPrices() {
  console.log("🔧 Converting prices from pence to pounds...");
  
  try {
    // Get all items with pence pricing (anything over £50 is likely in pence)
    const items = await db.select().from(menuItems);
    
    for (const item of items) {
      if (item.price > 50) {
        const newPrice = item.price / 100; // Convert pence to pounds
        await db
          .update(menuItems)
          .set({ price: newPrice })
          .where({ id: item.id });
        
        console.log(`Fixed ${item.name}: £${item.price/100} -> £${newPrice}`);
      }
    }
    
    console.log("✅ Price conversion completed!");
    
  } catch (error) {
    console.error("❌ Error fixing prices:", error);
  }
}

fixPrices();