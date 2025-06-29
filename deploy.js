#!/usr/bin/env node

/**
 * Simple, robust deployment script for Render
 * Addresses the core path resolution issue
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, cpSync } from 'fs';

console.log('Starting deployment build...');

try {
  // Build the application
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verify build completed
  if (!existsSync('dist/index.js') || !existsSync('dist/public')) {
    throw new Error('Build failed - missing dist files');
  }
  
  // Create the specific directory structure Render expects
  // Based on the error: /opt/render/project/src/dist/index.js
  mkdirSync('src', { recursive: true });
  mkdirSync('src/dist', { recursive: true });
  mkdirSync('src/dist/server', { recursive: true });
  
  // Copy server file to expected location
  copyFileSync('dist/index.js', 'src/dist/index.js');
  
  // Copy static files
  cpSync('dist/public', 'src/dist/public', { recursive: true });
  cpSync('dist/public', 'src/dist/server/public', { recursive: true });
  
  console.log('Deployment structure created successfully');
  console.log('Files available at:');
  console.log('- src/dist/index.js');
  console.log('- src/dist/public/');
  console.log('- src/dist/server/public/');
  
} catch (error) {
  console.error('Deployment build failed:', error.message);
  process.exit(1);
}