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

async function createWorkingMenu() {
  console.log("🔧 Creating working menu with proper pricing...");
  
  try {
    // Clear existing items
    await db.delete(menuItems);
    
    // Create comprehensive menu with proper pound pricing
    const workingMenu = [
      // Starters
      { name: "Chips", description: "Regular portion of crispy chips", price: 2.50, category: "Starters" },
      { name: "Peri Peri Chips", description: "Chips with spicy peri peri seasoning", price: 3.00, category: "Starters" },
      { name: "Chips with Cheese", description: "Chips topped with melted cheese", price: 4.00, category: "Starters" },
      { name: "Potato Wedges", description: "Crispy seasoned potato wedges", price: 3.50, category: "Starters" },
      { name: "Chicken Wings (4pc)", description: "Four pieces of marinated chicken wings", price: 4.00, category: "Starters" },
      { name: "Chicken Wings (6pc)", description: "Six pieces of marinated chicken wings", price: 5.50, category: "Starters" },
      { name: "Chicken Nuggets (6pc)", description: "Six pieces of tender chicken nuggets", price: 4.50, category: "Starters" },
      { name: "Onion Rings (6pc)", description: "Six pieces of golden onion rings", price: 3.00, category: "Starters" },
      
      // Platters
      { name: "Family Sharing Platter", description: "Large platter for sharing with mixed chicken, chips and salad", price: 18.00, category: "Platters" },
      { name: "Chicken Wings Platter", description: "Chicken wings with chips and drink", price: 8.50, category: "Platters" },
      { name: "Mixed Grill Platter", description: "Mixed grilled items with chips and drink", price: 12.00, category: "Platters" },
      { name: "Chicken Strips Platter", description: "Chicken strips with chips and drink", price: 9.00, category: "Platters" },
      
      // Fried Chicken
      { name: "Fried Chicken (2pc)", description: "Two pieces of crispy fried chicken", price: 4.50, category: "Fried Chicken" },
      { name: "Fried Chicken (3pc)", description: "Three pieces of crispy fried chicken", price: 6.50, category: "Fried Chicken" },
      { name: "Fried Chicken (6pc)", description: "Six pieces of crispy fried chicken", price: 11.00, category: "Fried Chicken" },
      { name: "Fried Chicken Burger", description: "Crispy fried chicken in a brioche bun", price: 5.50, category: "Fried Chicken" },
      { name: "Spicy Fried Chicken Burger", description: "Spicy fried chicken in a brioche bun", price: 6.00, category: "Fried Chicken" },
      
      // Pizzas
      { name: "Margherita Pizza (10inch)", description: "Classic margherita with fresh mozzarella", price: 8.00, category: "Pizzas" },
      { name: "Margherita Pizza (12inch)", description: "Classic margherita with fresh mozzarella", price: 10.00, category: "Pizzas" },
      { name: "Pepperoni Pizza (10inch)", description: "Pepperoni pizza with mozzarella", price: 9.00, category: "Pizzas" },
      { name: "Pepperoni Pizza (12inch)", description: "Pepperoni pizza with mozzarella", price: 11.50, category: "Pizzas" },
      { name: "BBQ Chicken Pizza (10inch)", description: "BBQ chicken with red onions and peppers", price: 10.00, category: "Pizzas" },
      { name: "BBQ Chicken Pizza (12inch)", description: "BBQ chicken with red onions and peppers", price: 12.50, category: "Pizzas" },
      
      // Mains
      { name: "Classic Beef Burger", description: "Juicy beef patty with fresh lettuce, tomato and onion", price: 6.50, category: "Mains" },
      { name: "Cheese Burger", description: "Beef burger with melted cheese", price: 7.00, category: "Mains" },
      { name: "Double Beef Burger", description: "Two beef patties with all the trimmings", price: 8.50, category: "Mains" },
      { name: "Chicken Burger", description: "Grilled chicken breast with salad", price: 6.00, category: "Mains" },
      { name: "Spicy Chicken Burger", description: "Spicy grilled chicken with peri peri sauce", price: 6.50, category: "Mains" },
      { name: "Fish Burger", description: "Crispy fish fillet with tartar sauce", price: 5.50, category: "Mains" },
      { name: "Chicken Wrap", description: "Grilled chicken in a soft tortilla with salad", price: 5.50, category: "Mains" },
      { name: "Fish and Chips", description: "Battered fish with crispy chips", price: 7.50, category: "Mains" },
      { name: "Chicken Salad", description: "Fresh salad with grilled chicken strips", price: 6.00, category: "Mains" },
    ];
    
    console.log(`📝 Inserting ${workingMenu.length} menu items...`);
    
    for (const item of workingMenu) {
      await db.insert(menuItems).values(item);
    }
    
    console.log("✅ Working menu created successfully!");
    console.log(`Total items: ${workingMenu.length}`);
    
    // Show breakdown by category
    const categories = workingMenu.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log("\nCategory breakdown:");
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} items`);
    });
    
  } catch (error) {
    console.error("❌ Error creating working menu:", error);
  }
}

createWorkingMenu();