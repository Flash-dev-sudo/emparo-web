import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { menuItems, type MenuItem } from "@shared/schema";

const DATABASE_URL = process.env.DATABASE_URL || "libsql://emapro-flash.aws-eu-west-1.turso.io";
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDg3MzI4MjgsImlkIjoiNDVlNjg2NjQtZTk5NC00NmYyLWE3NjYtN2Y1NjlkM2M2ZjU0IiwicmlkIjoiNmI1NzJlN2ItMzVlNS00NDJlLTg3MzgtZmQ1ZGZjMWM4MjYyIn0.OdhTd-h9N4OFqGGDCdgdp2fmIJ4XyYM2vYUWobZl0wBzWcPM9cVmQpXPNrBZfFQdDWmjw9s0_SLT7-bSfJLbCg";

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
