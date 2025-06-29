#!/usr/bin/env node

/**
 * Root-level server entry point for Render deployment
 * This file intercepts the default start command and ensures proper deployment structure
 */

import { existsSync, mkdirSync, copyFileSync, cpSync } from 'fs';
import { execSync } from 'child_process';

console.log('Deployment interceptor: Ensuring proper server setup...');

async function setupDeployment() {
  try {
    // Ensure build exists
    if (!existsSync('dist/index.js')) {
      console.log('Running build process...');
      execSync('npm run build', { stdio: 'inherit' });
    }

    // Create the directory structure Render expects
    if (!existsSync('src')) {
      mkdirSync('src', { recursive: true });
    }
    if (!existsSync('src/dist')) {
      mkdirSync('src/dist', { recursive: true });
    }

    // Copy server file to expected location
    if (existsSync('dist/index.js') && !existsSync('src/dist/index.js')) {
      copyFileSync('dist/index.js', 'src/dist/index.js');
      console.log('Server file copied to src/dist/index.js');
    }

    // Copy static files
    if (existsSync('dist/public') && !existsSync('src/dist/public')) {
      cpSync('dist/public', 'src/dist/public', { recursive: true });
      console.log('Static files copied to src/dist/public');
    }

    // Import and start the actual server
    const { default: server } = await import('./src/dist/index.js');
    
  } catch (error) {
    console.error('Deployment setup failed:', error.message);
    
    // Fallback: try to start from original location
    try {
      console.log('Attempting fallback startup...');
      const { default: server } = await import('./dist/index.js');
    } catch (fallbackError) {
      console.error('All startup attempts failed:', fallbackError.message);
      process.exit(1);
    }
  }
}

// Set production environment
process.env.NODE_ENV = 'production';

// Run the deployment setup
setupDeployment();