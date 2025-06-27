import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { menuItems } from "@shared/schema";

const DATABASE_URL = "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

async function seedWorkingMenu() {
  try {
    console.log("Clearing existing menu items...");
    await db.delete(menuItems);

    console.log("Inserting menu items without image field...");
    const menuData = [
      // Starters
      {
        name: "Chips",
        description: "Regular portion of crispy golden chips",
        price: 2.50,
        category: "Starters",
        heatLevel: 1,
      },
      {
        name: "Peri Peri Chips",
        description: "Chips seasoned with our signature peri peri spice blend",
        price: 3.00,
        category: "Starters",
        heatLevel: 2,
      },
      {
        name: "Chips with Cheese",
        description: "Golden chips topped with melted cheese",
        price: 4.00,
        category: "Starters",
        heatLevel: 1,
      },
      {
        name: "Potato Wedges",
        description: "Crispy seasoned potato wedges",
        price: 3.50,
        category: "Starters",
        heatLevel: 1,
      },
      {
        name: "Cheesy Potato Wedges",
        description: "Potato wedges topped with melted cheese",
        price: 4.50,
        category: "Starters",
        heatLevel: 1,
      },
      {
        name: "Onion Rings",
        description: "Golden crispy beer-battered onion rings",
        price: 3.99,
        category: "Starters",
        heatLevel: 1,
      },
      {
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs",
        price: 2.99,
        category: "Starters",
        heatLevel: 1,
      },
      {
        name: "Chicken Wings Starter",
        description: "Six spicy peri peri chicken wings",
        price: 5.99,
        category: "Starters",
        heatLevel: 3,
      },
      {
        name: "Chicken Strips Starter",
        description: "Crispy chicken strips with dipping sauce",
        price: 4.99,
        category: "Starters",
        heatLevel: 2,
      },
      {
        name: "Mozzarella Sticks",
        description: "Breaded mozzarella sticks with marinara sauce",
        price: 4.50,
        category: "Starters",
        heatLevel: 1,
      },

      // Platters
      {
        name: "Family Platter",
        description: "Perfect for sharing - mixed chicken, chips, salad and bread",
        price: 18.99,
        category: "Platters",
        heatLevel: 2,
      },
      {
        name: "Chicken Platter",
        description: "Variety of chicken wings, strips and thighs with sides",
        price: 15.99,
        category: "Platters",
        heatLevel: 3,
      },
      {
        name: "Mixed Grill Platter",
        description: "Assorted grilled meats with chips and salad",
        price: 22.99,
        category: "Platters",
        heatLevel: 3,
      },
      {
        name: "Veggie Platter",
        description: "Selection of vegetarian options with dips and bread",
        price: 12.99,
        category: "Platters",
        heatLevel: 1,
      },
      {
        name: "Wing Platter",
        description: "Twenty chicken wings with various spice levels",
        price: 16.99,
        category: "Platters",
        heatLevel: 4,
      },

      // Fried Chicken
      {
        name: "Whole Fried Chicken",
        description: "Crispy golden fried whole chicken with signature coating",
        price: 12.99,
        category: "Fried Chicken",
        heatLevel: 2,
      },
      {
        name: "Half Fried Chicken",
        description: "Half portion of our crispy fried chicken",
        price: 7.99,
        category: "Fried Chicken",
        heatLevel: 2,
      },
      {
        name: "Fried Chicken Pieces",
        description: "Six mixed pieces of crispy fried chicken",
        price: 8.99,
        category: "Fried Chicken",
        heatLevel: 2,
      },
      {
        name: "Spicy Fried Wings",
        description: "Extra spicy fried chicken wings with fiery coating",
        price: 6.99,
        category: "Fried Chicken",
        heatLevel: 4,
      },
      {
        name: "Fried Chicken Burger",
        description: "Crispy fried chicken breast in a brioche bun with salad",
        price: 7.99,
        category: "Fried Chicken",
        heatLevel: 2,
      },
      {
        name: "Fried Chicken Wrap",
        description: "Fried chicken strips wrapped in soft tortilla with salad",
        price: 6.99,
        category: "Fried Chicken",
        heatLevel: 2,
      },
      {
        name: "Popcorn Chicken",
        description: "Bite-sized pieces of crispy fried chicken",
        price: 5.99,
        category: "Fried Chicken",
        heatLevel: 2,
      },

      // Pizzas
      {
        name: "Margherita Pizza",
        description: "Classic stone-baked pizza with tomato sauce and mozzarella",
        price: 9.99,
        category: "Pizzas",
        heatLevel: 1,
      },
      {
        name: "Peri Peri Chicken Pizza",
        description: "Spicy chicken with peri peri sauce, peppers and onions",
        price: 12.99,
        category: "Pizzas",
        heatLevel: 3,
      },
      {
        name: "Pepperoni Pizza",
        description: "Classic pepperoni with mozzarella cheese",
        price: 11.99,
        category: "Pizzas",
        heatLevel: 1,
      },
      {
        name: "Vegetarian Pizza",
        description: "Mixed vegetables, peppers, mushrooms and cheese",
        price: 10.99,
        category: "Pizzas",
        heatLevel: 1,
      },
      {
        name: "BBQ Chicken Pizza",
        description: "BBQ chicken with sweet barbecue sauce and red onions",
        price: 13.99,
        category: "Pizzas",
        heatLevel: 2,
      },
      {
        name: "Meat Feast Pizza",
        description: "Pepperoni, chicken, beef and ham with extra cheese",
        price: 15.99,
        category: "Pizzas",
        heatLevel: 2,
      },
      {
        name: "Hawaiian Pizza",
        description: "Ham and pineapple with mozzarella cheese",
        price: 11.99,
        category: "Pizzas",
        heatLevel: 1,
      },
      {
        name: "Four Cheese Pizza",
        description: "Mozzarella, cheddar, parmesan and blue cheese",
        price: 12.99,
        category: "Pizzas",
        heatLevel: 1,
      },

      // Mains
      {
        name: "Grilled Chicken Breast",
        description: "Tender grilled chicken breast marinated in peri peri spices",
        price: 9.99,
        category: "Mains",
        heatLevel: 2,
      },
      {
        name: "Peri Peri Chicken Thighs",
        description: "Juicy chicken thighs with authentic peri peri marinade",
        price: 8.99,
        category: "Mains",
        heatLevel: 3,
      },
      {
        name: "Whole Peri Peri Chicken",
        description: "Flame-grilled whole chicken with 24-hour peri peri marinade",
        price: 12.99,
        category: "Mains",
        heatLevel: 3,
      },
      {
        name: "Half Peri Peri Chicken",
        description: "Half portion of our signature flame-grilled chicken",
        price: 7.99,
        category: "Mains",
        heatLevel: 3,
      },
      {
        name: "Chicken Curry",
        description: "Spicy chicken curry with fragrant rice and naan bread",
        price: 11.99,
        category: "Mains",
        heatLevel: 3,
      },
      {
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with lemon butter and vegetables",
        price: 14.99,
        category: "Mains",
        heatLevel: 1,
      },
      {
        name: "Beef Steak",
        description: "Grilled sirloin steak with chips and peppercorn sauce",
        price: 16.99,
        category: "Mains",
        heatLevel: 1,
      },
      {
        name: "Lamb Chops",
        description: "Tender lamb chops with mint sauce and roasted vegetables",
        price: 15.99,
        category: "Mains",
        heatLevel: 2,
      },
      {
        name: "Vegetarian Curry",
        description: "Mixed vegetable curry with coconut rice",
        price: 8.99,
        category: "Mains",
        heatLevel: 2,
      },
      {
        name: "Fish and Chips",
        description: "Beer-battered cod with chips and mushy peas",
        price: 9.99,
        category: "Mains",
        heatLevel: 1,
      },
      {
        name: "Chicken Shawarma",
        description: "Marinated chicken strips with rice and garlic sauce",
        price: 10.99,
        category: "Mains",
        heatLevel: 2,
      },
      {
        name: "Mixed Grill",
        description: "Combination of chicken, lamb and beef with sides",
        price: 18.99,
        category: "Mains",
        heatLevel: 3,
      },
    ];

    await db.insert(menuItems).values(menuData);

    console.log(`Successfully seeded ${menuData.length} menu items!`);
    
    // Display category breakdown
    const categories = [...new Set(menuData.map(item => item.category))];
    console.log("\nMenu structure:");
    categories.forEach(category => {
      const count = menuData.filter(item => item.category === category).length;
      console.log(`- ${category}: ${count} items`);
    });
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedWorkingMenu();