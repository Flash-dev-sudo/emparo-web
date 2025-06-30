#!/usr/bin/env node

/**
 * Comprehensive deployment script for Render
 * Creates files in all possible expected locations
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, cpSync, writeFileSync } from 'fs';

console.log('Starting comprehensive deployment build...');

try {
  // Install dependencies first
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Build the application
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verify build completed
  if (!existsSync('dist/index.js') || !existsSync('dist/public')) {
    throw new Error('Build failed - missing dist files');
  }
  
  console.log('Creating deployment structure...');
  
  // Create all possible directory structures
  const directories = [
    'src/dist',
    'src/dist/server', 
    'dist/server',
    'project/src/dist'
  ];
  
  for (const dir of directories) {
    mkdirSync(dir, { recursive: true });
  }
  
  // Copy server files to all expected locations
  const serverTargets = [
    'src/dist/index.js',      // Primary Render expected location
    'dist/server/index.js',   // Alternative location
    'project/src/dist/index.js' // Deep fallback
  ];
  
  for (const target of serverTargets) {
    try {
      copyFileSync('dist/index.js', target);
      console.log(`✓ Server copied to: ${target}`);
    } catch (e) {
      console.log(`⚠ Failed to copy server to: ${target}`);
    }
  }
  
  // Copy static files to all expected locations  
  const publicTargets = [
    'src/dist/public',
    'src/dist/server/public',
    'dist/server/public',
    'project/src/dist/public'
  ];
  
  for (const target of publicTargets) {
    try {
      cpSync('dist/public', target, { recursive: true });
      console.log(`✓ Static files copied to: ${target}`);
    } catch (e) {
      console.log(`⚠ Failed to copy static files to: ${target}`);
    }
  }
  
  // Create a deployment manifest
  const manifest = {
    buildTime: new Date().toISOString(),
    serverFiles: serverTargets.filter(existsSync),
    publicDirs: publicTargets.filter(existsSync),
    deploymentReady: true
  };
  
  writeFileSync('deployment-manifest.json', JSON.stringify(manifest, null, 2));
  
  console.log('Deployment completed successfully!');
  console.log(`Server files available at: ${manifest.serverFiles.length} locations`);
  console.log(`Static files available at: ${manifest.publicDirs.length} locations`);
  
} catch (error) {
  console.error('Deployment build failed:', error.message);
  process.exit(1);
}