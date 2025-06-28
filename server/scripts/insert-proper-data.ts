import { createClient } from "@libsql/client";

const DATABASE_URL = process.env.TILL_DATABASE_URL || "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = process.env.TILL_DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

async function insertProperData() {
  console.log("🔧 Creating categories and menu items...");
  
  try {
    // First, ensure categories exist
    await client.execute("INSERT OR IGNORE INTO categories (id, name) VALUES (1, 'Starters');");
    await client.execute("INSERT OR IGNORE INTO categories (id, name) VALUES (2, 'Platters');");
    await client.execute("INSERT OR IGNORE INTO categories (id, name) VALUES (3, 'Fried Chicken');");
    await client.execute("INSERT OR IGNORE INTO categories (id, name) VALUES (4, 'Pizzas');");
    await client.execute("INSERT OR IGNORE INTO categories (id, name) VALUES (5, 'Mains');");
    
    console.log("✓ Categories created");
    
    // Clear existing menu items
    await client.execute("DELETE FROM menu_items;");
    
    // Insert menu items with proper schema (category_id instead of category)
    const menuItems = [
      // Starters (category_id: 1)
      ["Chips", "Regular portion of crispy chips", 2.50, 1],
      ["Peri Peri Chips", "Chips with spicy peri peri seasoning", 3.00, 1],
      ["Chips with Cheese", "Chips topped with melted cheese", 4.00, 1],
      ["Potato Wedges", "Crispy seasoned potato wedges", 3.50, 1],
      ["Chicken Wings (4pc)", "Four pieces of marinated chicken wings", 4.00, 1],
      ["Chicken Wings (6pc)", "Six pieces of marinated chicken wings", 5.50, 1],
      ["Chicken Nuggets (6pc)", "Six pieces of tender chicken nuggets", 4.50, 1],
      ["Onion Rings (6pc)", "Six pieces of golden onion rings", 3.00, 1],
      
      // Platters (category_id: 2)
      ["Family Sharing Platter", "Large platter for sharing with mixed chicken, chips and salad", 18.00, 2],
      ["Chicken Wings Platter", "Chicken wings with chips and drink", 8.50, 2],
      ["Mixed Grill Platter", "Mixed grilled items with chips and drink", 12.00, 2],
      ["Chicken Strips Platter", "Chicken strips with chips and drink", 9.00, 2],
      
      // Fried Chicken (category_id: 3)
      ["Fried Chicken (2pc)", "Two pieces of crispy fried chicken", 4.50, 3],
      ["Fried Chicken (3pc)", "Three pieces of crispy fried chicken", 6.50, 3],
      ["Fried Chicken (6pc)", "Six pieces of crispy fried chicken", 11.00, 3],
      ["Fried Chicken Burger", "Crispy fried chicken in a brioche bun", 5.50, 3],
      ["Spicy Fried Chicken Burger", "Spicy fried chicken in a brioche bun", 6.00, 3],
      
      // Pizzas (category_id: 4)
      ["Margherita Pizza (10inch)", "Classic margherita with fresh mozzarella", 8.00, 4],
      ["Margherita Pizza (12inch)", "Classic margherita with fresh mozzarella", 10.00, 4],
      ["Pepperoni Pizza (10inch)", "Pepperoni pizza with mozzarella", 9.00, 4],
      ["Pepperoni Pizza (12inch)", "Pepperoni pizza with mozzarella", 11.50, 4],
      ["BBQ Chicken Pizza (10inch)", "BBQ chicken with red onions and peppers", 10.00, 4],
      ["BBQ Chicken Pizza (12inch)", "BBQ chicken with red onions and peppers", 12.50, 4],
      
      // Mains (category_id: 5)
      ["Classic Beef Burger", "Juicy beef patty with fresh lettuce, tomato and onion", 6.50, 5],
      ["Cheese Burger", "Beef burger with melted cheese", 7.00, 5],
      ["Double Beef Burger", "Two beef patties with all the trimmings", 8.50, 5],
      ["Chicken Burger", "Grilled chicken breast with salad", 6.00, 5],
      ["Spicy Chicken Burger", "Spicy grilled chicken with peri peri sauce", 6.50, 5],
      ["Fish Burger", "Crispy fish fillet with tartar sauce", 5.50, 5],
      ["Chicken Wrap", "Grilled chicken in a soft tortilla with salad", 5.50, 5],
      ["Fish and Chips", "Battered fish with crispy chips", 7.50, 5],
      ["Chicken Salad", "Fresh salad with grilled chicken strips", 6.00, 5],
    ];
    
    console.log(`📝 Inserting ${menuItems.length} menu items...`);
    
    for (const [name, description, price, categoryId] of menuItems) {
      await client.execute({
        sql: "INSERT INTO menu_items (name, description, price, category_id, available) VALUES (?, ?, ?, ?, ?);",
        args: [name, description, price, categoryId, true]
      });
    }
    
    console.log("✅ Menu items inserted successfully!");
    
    // Verify the data
    const result = await client.execute("SELECT COUNT(*) as count FROM menu_items WHERE available = true;");
    console.log(`Total available items: ${result.rows[0].count}`);
    
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
}

insertProperData();