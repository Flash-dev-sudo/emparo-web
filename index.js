#!/usr/bin/env node

/**
 * Root-level server entry point for Render deployment
 * This file intercepts the default start command and ensures proper deployment structure
 */

import { existsSync, mkdirSync, copyFileSync, cpSync } from 'fs';
import { execSync } from 'child_process';
import { spawn } from 'child_process';

console.log('🚀 Emparo server starting...');

async function setupDeployment() {
  try {
    // Set production environment
    process.env.NODE_ENV = 'production';
    
    console.log('Setting up deployment structure for Render...');
    
    // Build the application if needed
    if (!existsSync('dist/index.js')) {
      console.log('Building application...');
      execSync('npm run build', { stdio: 'inherit' });
    }
    
    // Create the directory structure Render expects
    if (!existsSync('src')) {
      mkdirSync('src', { recursive: true });
    }
    if (!existsSync('src/dist')) {
      mkdirSync('src/dist', { recursive: true });
    }
    
    // Copy server file to the exact location Render expects
    if (existsSync('dist/index.js')) {
      copyFileSync('dist/index.js', 'src/dist/index.js');
      console.log('✓ Server copied to src/dist/index.js');
    } else {
      throw new Error('Server build file not found');
    }
    
    // Copy static files
    if (existsSync('dist/public')) {
      cpSync('dist/public', 'src/dist/public', { recursive: true });
      console.log('✓ Static files copied to src/dist/public');
    }
    
    // Start the server from the correct location
    console.log('Starting server from src/dist/index.js...');
    const server = spawn('node', ['src/dist/index.js'], {
      stdio: 'inherit',
      env: process.env,
      cwd: process.cwd()
    });
    
    server.on('close', (code) => {
      console.log(`Server exited with code: ${code}`);
      process.exit(code);
    });
    
    server.on('error', (error) => {
      console.error('Server startup failed:', error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('Deployment setup failed:', error.message);
    process.exit(1);
  }
}

setupDeployment();