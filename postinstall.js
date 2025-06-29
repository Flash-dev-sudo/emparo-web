#!/usr/bin/env node

/**
 * Post-install script that runs automatically after npm install
 * This ensures deployment compatibility regardless of build configuration
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync } from 'fs';

console.log('Post-install: Setting up deployment structure...');

try {
  // Only run build in production environment
  if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
    console.log('Production environment detected, running full build...');
    
    // Run the build process
    execSync('npm run build', { stdio: 'inherit' });
    
    // Create robust directory structure
    const dirs = ['dist/server', 'src/dist', 'dist/src'];
    for (const dir of dirs) {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    }
    
    // Copy files to all possible locations
    if (existsSync('dist/public')) {
      cpSync('dist/public', 'dist/server/public', { recursive: true });
      cpSync('dist/public', 'src/dist/public', { recursive: true });
      console.log('Static files copied to all deployment locations');
    }
    
    if (existsSync('dist/index.js')) {
      cpSync('dist/index.js', 'dist/server/index.js');
      cpSync('dist/index.js', 'src/dist/index.js');
      console.log('Server files copied to all deployment locations');
    }
    
    console.log('Post-install setup completed successfully');
  } else {
    console.log('Development environment, skipping production setup');
  }
} catch (error) {
  console.error('Post-install setup failed:', error.message);
  // Don't fail the install process
  process.exit(0);
}