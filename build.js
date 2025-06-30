#!/usr/bin/env node

/**
 * Robust production build script for Render deployment
 * This script ensures proper file structure regardless of environment
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, cpSync, writeFileSync } from 'fs';

console.log('Building Emparo application for production...');

try {
  // Run the standard build process
  console.log('Running frontend build...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('Running server build...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Create Render's expected directory structure
  console.log('Creating Render deployment structure...');
  
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
  
  // Copy static files
  if (existsSync('dist/public')) {
    cpSync('dist/public', 'src/dist/public', { recursive: true });
    console.log('✓ Static files copied to src/dist/public');
  }
  
  // Create a start script that works with the actual file locations
  const startScript = `#!/usr/bin/env node
process.env.NODE_ENV = 'production';
import('./src/dist/index.js').catch(() => {
  // Fallback to original location if src/dist doesn't exist
  import('./dist/index.js').catch(err => {
    console.error('Cannot find server file:', err.message);
    process.exit(1);
  });
});`;
  
  writeFileSync('production-start.js', startScript);
  console.log('✓ Created production-start.js');
  
  console.log('✓ Build completed successfully');
  console.log('Files ready for Render deployment:');
  console.log('  - src/dist/index.js (server)');
  console.log('  - src/dist/public/ (static files)');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}