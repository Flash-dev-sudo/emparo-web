#!/usr/bin/env node

// Production startup script for Render deployment
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set production environment
process.env.NODE_ENV = 'production';

// Import and start the server
const serverPath = join(__dirname, 'dist', 'index.js');
console.log('Starting server from:', serverPath);

import(serverPath).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});