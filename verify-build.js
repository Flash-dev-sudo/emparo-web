#!/usr/bin/env node

import { existsSync } from 'fs';
import { join } from 'path';

const requiredFiles = [
  'dist/index.js',
  'dist/public/index.html',
  'dist/public/assets'
];

console.log('Verifying build output...');

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
  console.log('✓ All required build files are present');
  process.exit(0);
} else {
  console.log('✗ Build verification failed');
  process.exit(1);
}