#!/bin/bash

# Render deployment script that creates the required directory structure
echo "Starting Render deployment setup..."

# Install dependencies
npm install

# Build the application
npm run build

# Create the directory structure Render expects
mkdir -p src/dist

# Copy server file to expected location
cp dist/index.js src/dist/index.js
echo "✓ Server file copied to src/dist/index.js"

# Copy static files
if [ -d "dist/public" ]; then
  cp -r dist/public src/dist/public
  echo "✓ Static files copied to src/dist/public"
fi

# Verify files exist
if [ -f "src/dist/index.js" ]; then
  echo "✓ Deployment structure created successfully"
  echo "Server will start from: src/dist/index.js"
else
  echo "✗ Deployment setup failed"
  exit 1
fi