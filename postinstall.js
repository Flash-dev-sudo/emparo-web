#!/usr/bin/env node

/**
 * Post-install hook that runs automatically after npm install
 * This ensures the deployment structure is created regardless of build configuration
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, cpSync } from 'fs';

console.log('Post-install: Setting up deployment structure...');

try {
  // Only run in production/deployment environment
  if (process.env.NODE_ENV === 'production' || process.env.RENDER || process.argv.includes('--force')) {
    console.log('Production environment detected, running build setup...');
    
    // Run the build process
    execSync('npm run build', { stdio: 'inherit' });
    
    // Create required directory structure
    if (!existsSync('src')) {
      mkdirSync('src', { recursive: true });
    }
    if (!existsSync('src/dist')) {
      mkdirSync('src/dist', { recursive: true });
    }
    
    // Copy server file to expected location
    if (existsSync('dist/index.js')) {
      copyFileSync('dist/index.js', 'src/dist/index.js');
      console.log('✓ Server file copied to src/dist/index.js');
    }
    
    // Copy static files for serving
    if (existsSync('dist/public')) {
      cpSync('dist/public', 'src/dist/public', { recursive: true });
      console.log('✓ Static files copied to src/dist/public');
    }
    
    console.log('Post-install deployment setup completed successfully');
  } else {
    console.log('Development environment, skipping deployment setup');
  }
} catch (error) {
  console.error('Post-install setup encountered an error:', error.message);
  // Don't fail the npm install process
  process.exit(0);
}