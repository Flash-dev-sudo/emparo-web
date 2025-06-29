#!/bin/bash

# Deployment script for Render
set -e

echo "Building Emparo Peri Peri website..."

# Install dependencies
npm install

# Build the application
npm run build

# Verify build output exists
if [ ! -f "dist/index.js" ]; then
  echo "Error: dist/index.js not found after build"
  exit 1
fi

if [ ! -f "dist/public/index.html" ]; then
  echo "Error: dist/public/index.html not found after build"
  exit 1
fi

# Create src directory and symlink for Render's path resolution
mkdir -p src
ln -sf ../dist src/dist

echo "Build completed successfully!"
echo "Server file: $(pwd)/dist/index.js"
echo "Symlink created: $(pwd)/src/dist/index.js"