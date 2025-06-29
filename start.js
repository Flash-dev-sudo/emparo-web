#!/usr/bin/env node

/**
 * Smart production startup script for Render deployment
 * Automatically finds and starts the server from the correct location
 */

import { existsSync } from 'fs';
import { spawn } from 'child_process';

// Set production environment
process.env.NODE_ENV = 'production';

// List of possible server file locations in order of preference
const serverPaths = [
  'src/dist/index.js',     // Render's expected path
  'dist/index.js',         // Standard build location
  'dist/server/index.js',  // Alternative location
  'index.js'               // Fallback location
];

console.log('Starting production server...');

// Find the first existing server file
let serverPath = null;
for (const path of serverPaths) {
  if (existsSync(path)) {
    serverPath = path;
    console.log(`Found server at: ${path}`);
    break;
  }
}

if (!serverPath) {
  console.error('Error: No server file found at any expected location');
  console.error('Searched paths:', serverPaths);
  process.exit(1);
}

// Start the server
console.log(`Starting server from: ${serverPath}`);
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

server.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});