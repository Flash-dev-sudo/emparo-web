import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { menuItems } from "@shared/schema";

const DATABASE_URL = process.env.DATABASE_URL || "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

async function updateMenuItems() {
  console.log("Updating menu items with proper images and heat levels...");
  
  // Update existing items with proper images and heat levels
  const updates = [
    { id: 1, image: "/images/ChatGPT Image May 22, 2025, 07_35_09 PM.png", heatLevel: 3, category: "chicken" },
    { id: 2, image: "/images/ChatGPT Image May 22, 2025, 07_40_16 PM.png", heatLevel: 2, category: "chicken" },
    { id: 3, image: "/images/ChatGPT Image May 22, 2025, 07_51_37 PM.png", heatLevel: 2, category: "chicken" },
    { id: 4, image: "/images/ChatGPT Image May 22, 2025, 08_20_28 PM.png", heatLevel: 2, category: "burgers" },
    { id: 5, image: "/images/ChatGPT Image May 22, 2025, 08_27_31 PM.png", heatLevel: 3, category: "burgers" },
    { id: 6, image: "/images/ChatGPT Image May 22, 2025, 09_20_56 PM.png", heatLevel: 2, category: "chicken" },
    { id: 7, image: "/images/ChatGPT Image May 22, 2025, 09_38_22 PM.png", heatLevel: 3, category: "chicken" },
    { id: 8, image: "/images/ChatGPT Image May 22, 2025, 10_02_17 PM.png", heatLevel: 2, category: "chicken" },
    { id: 9, image: "/images/ChatGPT Image May 22, 2025, 10_07_25 PM.png", heatLevel: 1, category: "chicken" },
    { id: 10, image: "/images/ChatGPT Image May 22, 2025, 10_10_13 PM.png", heatLevel: 2, category: "sides" },
    { id: 11, image: "/images/ChatGPT Image May 22, 2025, 10_18_07 PM.png", heatLevel: 3, category: "sides" },
    { id: 12, image: "/images/ChatGPT Image May 22, 2025, 10_21_07 PM.png", heatLevel: 0, category: "drinks" },
    { id: 13, image: "/images/ChatGPT Image May 22, 2025, 10_24_05 PM.png", heatLevel: 0, category: "drinks" },
    { id: 14, image: "/images/ChatGPT Image May 22, 2025, 10_24_17 PM.png", heatLevel: 0, category: "drinks" }
  ];

  for (const update of updates) {
    try {
      const result = await db.update(menuItems)
        .set({ 
          image: update.image, 
          heatLevel: update.heatLevel, 
          category: update.category 
        })
        .where(eq(menuItems.id, update.id));
      console.log(`Updated item ${update.id}`);
    } catch (error) {
      console.error(`Error updating item ${update.id}:`, error);
    }
  }
  
  console.log("Menu items updated successfully!");
}

updateMenuItems().catch(console.error);