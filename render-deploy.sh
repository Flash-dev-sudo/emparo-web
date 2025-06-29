#!/bin/bash
# Ultimate fallback deployment script for Render
# Creates files in all possible expected locations

set -e

echo "Starting Render deployment..."

# Install dependencies
npm install

# Build the application
npm run build

# Verify build completed
if [ ! -f "dist/index.js" ] || [ ! -d "dist/public" ]; then
    echo "Build failed - missing dist files"
    exit 1
fi

# Create all possible directory structures based on Render error patterns
mkdir -p src/dist
mkdir -p src/dist/server
mkdir -p dist/server
mkdir -p project/src/dist

# Copy server file to all expected locations
cp dist/index.js src/dist/index.js
cp dist/index.js dist/server/index.js
cp dist/index.js project/src/dist/index.js 2>/dev/null || true

# Copy static files to all expected locations
cp -r dist/public src/dist/public
cp -r dist/public src/dist/server/public
cp -r dist/public dist/server/public
cp -r dist/public project/src/dist/public 2>/dev/null || true

echo "Deployment files created at multiple locations:"
echo "✓ src/dist/index.js"
echo "✓ src/dist/public/"
echo "✓ dist/server/index.js" 
echo "✓ dist/server/public/"

echo "Render deployment setup completed successfully"