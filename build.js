#!/usr/bin/env node

/**
 * Robust production build script for Render deployment
 * This script ensures proper file structure regardless of environment
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, cpSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting robust production build...');

try {
  // Ensure we're in the project root
  process.chdir(__dirname);
  
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🔨 Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verify core build files exist
  const requiredFiles = ['dist/index.js', 'dist/public/index.html'];
  for (const file of requiredFiles) {
    if (!existsSync(file)) {
      throw new Error(`Critical build file missing: ${file}`);
    }
  }
  
  console.log('📁 Setting up production file structure...');
  
  // Create multiple fallback directory structures for maximum compatibility
  const structures = [
    'dist/server',
    'dist/src',
    'src/dist'
  ];
  
  for (const dir of structures) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    
    // Copy public files to each structure
    const publicTarget = join(dir, 'public');
    if (existsSync('dist/public')) {
      cpSync('dist/public', publicTarget, { recursive: true });
      console.log(`✓ Static files copied to ${publicTarget}`);
    }
    
    // Copy server file to each structure
    const serverTarget = join(dir, 'index.js');
    if (existsSync('dist/index.js')) {
      cpSync('dist/index.js', serverTarget);
      console.log(`✓ Server file copied to ${serverTarget}`);
    }
  }
  
  // Create symlinks for additional path resolution
  const symlinkTargets = [
    { from: 'dist', to: 'src/dist' },
    { from: '../dist', to: 'dist/server/dist' },
    { from: 'dist/index.js', to: 'index.js' }
  ];
  
  for (const { from, to } of symlinkTargets) {
    try {
      if (!existsSync(to)) {
        execSync(`ln -sf ${from} ${to}`, { stdio: 'pipe' });
        console.log(`✓ Created symlink: ${to} -> ${from}`);
      }
    } catch (e) {
      // Symlinks are fallback, not critical
      console.log(`ℹ Symlink skipped: ${to}`);
    }
  }
  
  // Final verification
  const verificationPaths = [
    'dist/index.js',
    'dist/public/index.html',
    'dist/server/index.js',
    'dist/server/public/index.html',
    'src/dist/index.js',
    'src/dist/public/index.html'
  ];
  
  let verified = 0;
  for (const path of verificationPaths) {
    if (existsSync(path)) {
      console.log(`✓ ${path}`);
      verified++;
    } else {
      console.log(`✗ ${path}`);
    }
  }
  
  if (verified >= 4) { // At least 4 critical paths must exist
    console.log(`🎉 Production build completed successfully! (${verified}/${verificationPaths.length} paths verified)`);
    process.exit(0);
  } else {
    throw new Error(`Build verification failed: only ${verified}/${verificationPaths.length} paths verified`);
  }
  
} catch (error) {
  console.error('❌ Production build failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}