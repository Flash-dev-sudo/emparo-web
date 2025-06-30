#!/usr/bin/env node

/**
 * Post-install hook that runs automatically after npm install
 * This ensures the deployment structure is created regardless of build configuration
 * Works within Render's npm workflow since render.yaml is completely ignored
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, cpSync, writeFileSync } from 'fs';

console.log('Post-install: Setting up Render deployment structure...');

try {
  // Always run in Render environment (detected by RENDER env var or production)
  if (process.env.RENDER || process.env.NODE_ENV === 'production' || process.argv.includes('--force')) {
    console.log('Render deployment environment detected');
    
    // Run the build process first
    console.log('Building application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Create the directory structure Render expects
    console.log('Creating src/dist directory structure...');
    if (!existsSync('src')) {
      mkdirSync('src', { recursive: true });
    }
    if (!existsSync('src/dist')) {
      mkdirSync('src/dist', { recursive: true });
    }
    
    // Copy server file to exact location Render expects
    if (existsSync('dist/index.js')) {
      copyFileSync('dist/index.js', 'src/dist/index.js');
      console.log('✓ Server file copied to src/dist/index.js');
    } else {
      throw new Error('Built server file not found at dist/index.js');
    }
    
    // Copy static files to serve from correct location
    if (existsSync('dist/public')) {
      cpSync('dist/public', 'src/dist/public', { recursive: true });
      console.log('✓ Static files copied to src/dist/public');
    }
    
    // Create a start script that uses the correct path
    const startScript = `#!/usr/bin/env node
// Auto-generated start script for Render deployment
console.log('Starting Emparo server from src/dist/index.js...');
process.env.NODE_ENV = 'production';
import('./src/dist/index.js').catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});`;
    
    writeFileSync('render-start.js', startScript);
    console.log('✓ Created render-start.js for Render compatibility');
    
    console.log('✓ Render deployment setup completed successfully');
    console.log('Files created at expected Render paths:');
    console.log('  - Server: /opt/render/project/src/dist/index.js');
    console.log('  - Static: /opt/render/project/src/dist/public/');
    
  } else {
    console.log('Development environment, skipping deployment setup');
  }
} catch (error) {
  console.error('❌ Post-install setup failed:', error.message);
  console.error('This will cause deployment to fail on Render');
  // Don't fail the npm install process in development
  if (!process.env.RENDER && process.env.NODE_ENV !== 'production') {
    process.exit(0);
  } else {
    process.exit(1);
  }
}