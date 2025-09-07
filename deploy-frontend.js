#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('🚀 Starting frontend deployment build...');
  
  // Change to frontend directory and build
  process.chdir('frontend');
  console.log('📦 Installing frontend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🔨 Building frontend...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy build folder to root
  process.chdir('..');
  console.log('📂 Copying build folder to root...');
  
  if (fs.existsSync('build')) {
    fs.rmSync('build', { recursive: true, force: true });
  }
  
  execSync('cp -r frontend/build build', { stdio: 'inherit' });
  
  console.log('✅ Frontend deployment build completed!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
