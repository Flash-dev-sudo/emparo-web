import type { Express } from "express";
import { createServer, type Server } from "http";
import { databaseService } from "./services/database";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all menu items
  app.get("/api/menu", async (req, res) => {
    try {
      const menuItems = await databaseService.getMenuItems();
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu:", error);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  // Get menu items by category
  app.get("/api/menu/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const menuItems = await databaseService.getMenuItemsByCategory(category);
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu by category:", error);
      res.status(500).json({ error: "Failed to fetch menu items by category" });
    }
  });

  // Contact form submission (placeholder)
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, phone, message } = req.body;
      
      // In a real implementation, this would send an email or save to database
      console.log("Contact form submission:", { firstName, lastName, email, phone, message });
      
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error handling contact form:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
