#!/usr/bin/env node

/**
 * Fast deployment script for Render
 * Minimal operations for maximum reliability
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

try {
  console.log('Quick deployment starting...');
  
  // Run build only
  execSync('npm run build', { stdio: 'inherit' });
  
  // Create src/dist directory
  mkdirSync('src/dist', { recursive: true });
  
  // Copy server file to expected location
  copyFileSync('dist/index.js', 'src/dist/index.js');
  
  console.log('✓ Server file copied to src/dist/index.js');
  console.log('Quick deployment completed');
  
} catch (error) {
  console.error('Quick deployment failed:', error.message);
  process.exit(1);
}