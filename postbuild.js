#!/usr/bin/env node

/**
 * Post-build script that runs automatically after the build
 * Creates the directory structure Render expects
 */

import { existsSync, mkdirSync, copyFileSync, cpSync } from 'fs';

console.log('Post-build: Creating Render deployment structure...');

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
    console.log('Server file copied to src/dist/index.js');
  }

  // Copy static files
  if (existsSync('dist/public')) {
    cpSync('dist/public', 'src/dist/public', { recursive: true });
    console.log('Static files copied to src/dist/public');
  }

  console.log('Render deployment structure created successfully');

} catch (error) {
  console.error('Post-build setup failed:', error.message);
  process.exit(1);
}