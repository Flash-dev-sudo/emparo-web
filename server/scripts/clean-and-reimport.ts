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

async function cleanAndReimport() {
  console.log("🧹 Clearing website menu items...");
  
  try {
    // Delete all existing menu items
    await db.delete(menuItems);
    console.log("✅ Cleared existing menu items");
    
    // Sample menu with correct pricing structure
    const sampleMenu = [
      { name: "Chips", description: "Regular portion of crispy chips", price: 2.50, category: "Starters" },
      { name: "Peri Peri Chips", description: "Chips with spicy peri peri seasoning", price: 3.00, category: "Starters" },
      { name: "Chicken Wings (4pc)", description: "Four pieces of marinated chicken wings", price: 4.00, category: "Starters" },
      { name: "Chicken Wings (6pc)", description: "Six pieces of marinated chicken wings", price: 5.50, category: "Starters" },
      { name: "Family Sharing Platter", description: "Large platter for sharing", price: 18.00, category: "Platters" },
      { name: "Fried Chicken Burger", description: "Crispy fried chicken in a bun", price: 5.50, category: "Fried Chicken" },
      { name: "Margherita Pizza (10inch)", description: "Classic margherita pizza", price: 8.00, category: "Pizzas" },
      { name: "Classic Beef Burger", description: "Juicy beef patty with fresh toppings", price: 6.50, category: "Mains" },
    ];
    
    console.log("📝 Inserting sample menu with correct pricing...");
    
    for (const item of sampleMenu) {
      await db.insert(menuItems).values(item);
      console.log(`✓ Added ${item.name}: £${item.price}`);
    }
    
    console.log("✅ Sample menu imported successfully!");
    
  } catch (error) {
    console.error("❌ Error during clean and reimport:", error);
  }
}

cleanAndReimport();