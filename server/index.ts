import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { existsSync, mkdirSync, copyFileSync, cpSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

// Render deployment compatibility - auto-setup required directory structure
if (process.env.NODE_ENV === "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  console.log("Production mode: Setting up Render deployment structure...");
  
  // Create src/dist directory structure that Render expects
  const projectRoot = join(__dirname, "..");
  const srcDir = join(projectRoot, "src");
  const srcDistDir = join(srcDir, "dist");
  
  if (!existsSync(srcDir)) {
    mkdirSync(srcDir, { recursive: true });
  }
  if (!existsSync(srcDistDir)) {
    mkdirSync(srcDistDir, { recursive: true });
  }

  // Copy built server to expected location
  const builtServer = join(projectRoot, "dist", "index.js");
  const targetServer = join(srcDistDir, "index.js");
  
  if (existsSync(builtServer) && !existsSync(targetServer)) {
    copyFileSync(builtServer, targetServer);
    console.log("✓ Server copied to src/dist/index.js");
  }

  // Copy static files
  const publicDir = join(projectRoot, "dist", "public");
  const targetPublic = join(srcDistDir, "public");
  
  if (existsSync(publicDir) && !existsSync(targetPublic)) {
    cpSync(publicDir, targetPublic, { recursive: true });
    console.log("✓ Static files copied to src/dist/public");
  }

  // If we're not running from the expected location, restart from there
  if (!__filename.includes("src/dist/index.js") && existsSync(targetServer)) {
    console.log("Restarting from Render's expected location: src/dist/index.js");
    const server = spawn("node", [targetServer], {
      stdio: "inherit",
      env: process.env,
      cwd: projectRoot
    });
    
    server.on("close", (code) => process.exit(code));
    server.on("error", (error) => {
      console.error("Restart failed:", error);
      process.exit(1);
    });
    
    process.exit(0);
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use PORT from environment (for deployment) or default to 5000 (for development)
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
