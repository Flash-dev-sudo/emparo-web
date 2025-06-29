#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync } from 'fs';
import { join } from 'path';

console.log('Starting production build...');

// Run the standard build
console.log('Building application...');
execSync('npm run build', { stdio: 'inherit' });

// Create server directory structure
const serverDir = 'dist/server';
if (!existsSync(serverDir)) {
  mkdirSync(serverDir, { recursive: true });
}

// Copy public files to server directory for correct path resolution
console.log('Setting up static file structure...');
if (existsSync('dist/public')) {
  cpSync('dist/public', join(serverDir, 'public'), { recursive: true });
  console.log('✓ Static files copied to server directory');
} else {
  console.error('✗ Public directory not found');
  process.exit(1);
}

console.log('Production build completed successfully!');