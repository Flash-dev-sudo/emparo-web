import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { menuItems, type MenuItem } from "@shared/schema";

const DATABASE_URL = process.env.TILL_DATABASE_URL || "libsql://emparo-periperi-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = process.env.TILL_DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTEwNTE2NjksImlkIjoiNGNiZGQ0MjctZmY2NS00YzZkLTlkY2QtNGMwYTEwODkzNTUwIiwicmlkIjoiNDYzOGQ5OTQtM2IzNS00NGQ3LWI3MTYtNTExYWMwZmRmMWYzIn0.4puL-wZhuvPDqvwQEk77Bl5BhsXppCEEscL8tHwhMwbndnsnExtJQHPoPt0uM2PwOsCQ_KoUNtVJADqvLZj5BQ";

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

export class DatabaseService {
  async getMenuItems(): Promise<MenuItem[]> {
    try {
      const result = await client.execute(`
        SELECT m.id, m.name, m.description, m.price, c.name as category
        FROM menu_items m
        JOIN categories c ON m.category_id = c.id
        WHERE m.available = true
      `);
      
      return result.rows.map(row => ({
        id: row.id as number,
        name: row.name as string,
        description: row.description as string,
        price: row.price as number,
        category: row.category as string,
      }));
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw new Error("Failed to fetch menu items");
    }
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    try {
      const result = await client.execute(`
        SELECT m.id, m.name, m.description, m.price, c.name as category
        FROM menu_items m
        JOIN categories c ON m.category_id = c.id
        WHERE m.available = true AND c.name = ?
      `, [category]);
      
      return result.rows.map(row => ({
        id: row.id as number,
        name: row.name as string,
        description: row.description as string,
        price: row.price as number,
        category: row.category as string,
      }));
    } catch (error) {
      console.error("Error fetching menu items by category:", error);
      throw new Error("Failed to fetch menu items by category");
    }
  }

  async updateMenuItem(id: number, data: { name?: string; price?: number; description?: string }): Promise<MenuItem> {
    try {
      await client.execute({
        sql: "UPDATE menu_items SET name = ?, price = ?, description = ? WHERE id = ?",
        args: [data.name, data.price, data.description, id]
      });
      
      const result = await client.execute(`
        SELECT m.id, m.name, m.description, m.price, c.name as category
        FROM menu_items m
        JOIN categories c ON m.category_id = c.id
        WHERE m.id = ?
      `, [id]);
      
      const row = result.rows[0];
      return {
        id: row.id as number,
        name: row.name as string,
        description: row.description as string,
        price: row.price as number,
        category: row.category as string,
      };
    } catch (error) {
      console.error("Error updating menu item:", error);
      throw new Error("Failed to update menu item");
    }
  }
}

export const databaseService = new DatabaseService();
