#!/usr/bin/env node

/**
 * Smart production startup script for Render deployment
 * Automatically finds and starts the server from the correct location
 */

import { existsSync, mkdirSync, copyFileSync, cpSync } from 'fs';
import { spawn } from 'child_process';
import { join } from 'path';

console.log('Starting Emparo server...');

// Set production environment
process.env.NODE_ENV = 'production';

function setupDeploymentStructure() {
  try {
    // Create src/dist directory structure
    if (!existsSync('src')) {
      mkdirSync('src', { recursive: true });
    }
    if (!existsSync('src/dist')) {
      mkdirSync('src/dist', { recursive: true });
    }

    // Copy server file to expected location
    if (existsSync('dist/index.js')) {
      copyFileSync('dist/index.js', 'src/dist/index.js');
      console.log('✓ Server copied to src/dist/index.js');
    }

    // Copy static files
    if (existsSync('dist/public')) {
      cpSync('dist/public', 'src/dist/public', { recursive: true });
      console.log('✓ Static files copied to src/dist/public');
    }

    return true;
  } catch (error) {
    console.error('Deployment setup failed:', error.message);
    return false;
  }
}

// Try to find the server file in different locations
const serverPaths = [
  'src/dist/index.js',  // Render's expected location
  'dist/index.js'       // Our build output location
];

let serverPath = null;
for (const path of serverPaths) {
  if (existsSync(path)) {
    serverPath = path;
    break;
  }
}

// If server not found in expected locations, try to build it
if (!serverPath) {
  console.log('Server not found, setting up deployment structure...');
  const success = setupDeploymentStructure();
  if (success && existsSync('src/dist/index.js')) {
    serverPath = 'src/dist/index.js';
  }
}

if (!serverPath) {
  console.error('❌ Server file not found. Please run: npm run build');
  process.exit(1);
}

console.log(`🚀 Starting server from: ${serverPath}`);

// Start the server
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

server.on('close', (code) => {
  console.log(`Server exited with code: ${code}`);
  process.exit(code);
});

server.on('error', (error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});