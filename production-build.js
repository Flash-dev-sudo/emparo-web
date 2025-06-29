#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('Starting production build...');

try {
  // Run the standard build
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verify dist/index.js exists
  if (!existsSync('dist/index.js')) {
    console.error('✗ Server build failed - dist/index.js not found');
    process.exit(1);
  }

  // Verify dist/public exists
  if (!existsSync('dist/public')) {
    console.error('✗ Client build failed - dist/public not found');
    process.exit(1);
  }

  // Create server directory structure for static file serving
  const serverDir = 'dist/server';
  if (!existsSync(serverDir)) {
    mkdirSync(serverDir, { recursive: true });
  }

  // Copy public files to server directory for correct path resolution
  console.log('Setting up static file structure...');
  cpSync('dist/public', join(serverDir, 'public'), { recursive: true });
  console.log('✓ Static files copied to server directory');

  // Create a symlink fallback for additional path resolution
  try {
    execSync('ln -sf public dist/server/static', { stdio: 'pipe' });
    console.log('✓ Created static file symlink');
  } catch (e) {
    console.log('ℹ Symlink creation skipped (not critical)');
  }

  // Verify final structure
  const requiredFiles = [
    'dist/index.js',
    'dist/public/index.html',
    'dist/server/public/index.html'
  ];

  let allFilesExist = true;
  for (const file of requiredFiles) {
    if (existsSync(file)) {
      console.log(`✓ ${file} exists`);
    } else {
      console.log(`✗ ${file} missing`);
      allFilesExist = false;
    }
  }

  if (allFilesExist) {
    console.log('✓ Production build completed successfully!');
    process.exit(0);
  } else {
    console.error('✗ Production build verification failed');
    process.exit(1);
  }

} catch (error) {
  console.error('✗ Production build failed:', error.message);
  process.exit(1);
}