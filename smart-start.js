#!/usr/bin/env node

/**
 * Smart start script that replaces the default package.json start command
 * Automatically handles deployment path resolution for Render
 */

import { existsSync, mkdirSync, copyFileSync, cpSync } from 'fs';
import { spawn } from 'child_process';

console.log('Smart start: Initializing production server...');

// Set production environment
process.env.NODE_ENV = 'production';

try {
  // Ensure build files exist, if not run build
  if (!existsSync('dist/index.js')) {
    console.log('Build files not found, running build...');
    const { execSync } = await import('child_process');
    execSync('npm run build', { stdio: 'inherit' });
  }

  // Create deployment structure for Render path compatibility
  if (!existsSync('src/dist')) {
    console.log('Creating deployment structure...');
    mkdirSync('src/dist', { recursive: true });
    
    // Copy server file to expected location
    copyFileSync('dist/index.js', 'src/dist/index.js');
    console.log('Server file copied to src/dist/index.js');
    
    // Copy static files if they exist
    if (existsSync('dist/public')) {
      cpSync('dist/public', 'src/dist/public', { recursive: true });
      console.log('Static files copied to src/dist/public');
    }
  }

  // Determine which server file to use
  const serverPaths = [
    'src/dist/index.js',    // Render's expected path
    'dist/index.js'         // Standard build location
  ];

  let serverPath = null;
  for (const path of serverPaths) {
    if (existsSync(path)) {
      serverPath = path;
      break;
    }
  }

  if (!serverPath) {
    throw new Error('No server file found at any expected location');
  }

  console.log(`Starting server from: ${serverPath}`);
  
  // Start the server
  const server = spawn('node', [serverPath], {
    stdio: 'inherit',
    env: process.env
  });

  server.on('close', (code) => {
    process.exit(code);
  });

  server.on('error', (error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

} catch (error) {
  console.error('Smart start failed:', error.message);
  process.exit(1);
}