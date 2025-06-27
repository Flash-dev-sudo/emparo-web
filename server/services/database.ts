import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { menuItems, type MenuItem } from "@shared/schema";

const DATABASE_URL = process.env.DATABASE_URL || "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

export class DatabaseService {
  async getMenuItems(): Promise<MenuItem[]> {
    try {
      const items = await db.select().from(menuItems);
      return items;
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw new Error("Failed to fetch menu items");
    }
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    try {
      const items = await db.select().from(menuItems).where(eq(menuItems.category, category));
      return items;
    } catch (error) {
      console.error("Error fetching menu items by category:", error);
      throw new Error("Failed to fetch menu items by category");
    }
  }
}

export const databaseService = new DatabaseService();
