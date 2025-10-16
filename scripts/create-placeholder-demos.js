#!/usr/bin/env node

/**
 * EchoAI Placeholder Demo Creation Script
 * 
 * This script creates placeholder demo GIFs to prevent broken images in README.
 * These are simple colored rectangles that indicate where real demos should go.
 */

const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '../docs');

function createPlaceholderDemos() {
  console.log('🎬 Creating placeholder demo GIFs...');
  
  // Create a simple SVG placeholder
  const createPlaceholderSVG = (width, height, text, color) => {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dy=".3em">
        ${text}
      </text>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" dy=".3em">
        Demo Coming Soon
      </text>
    </svg>`;
  };
  
  // Create desktop placeholder
  const desktopSVG = createPlaceholderSVG(800, 450, 'Desktop Demo', '#6366f1');
  const desktopPath = path.join(SCREENSHOTS_DIR, 'demo-desktop.svg');
  fs.writeFileSync(desktopPath, desktopSVG);
  console.log('✅ Created desktop placeholder: demo-desktop.svg');
  
  // Create mobile placeholder
  const mobileSVG = createPlaceholderSVG(300, 600, 'Mobile Demo', '#8b5cf6');
  const mobilePath = path.join(SCREENSHOTS_DIR, 'demo-mobile.svg');
  fs.writeFileSync(mobilePath, mobileSVG);
  console.log('✅ Created mobile placeholder: demo-mobile.svg');
  
  console.log('\n📝 Note: These are placeholder files.');
  console.log('Replace them with actual GIF recordings when ready.');
  console.log('SVG format ensures they display properly on GitHub.');
  
  console.log('\n🎯 To create real demos:');
  console.log('1. Record your screen using tools like QuickTime, OBS, or ScreenFlow');
  console.log('2. Export as GIF with appropriate dimensions');
  console.log('3. Replace the .svg files with .gif files');
  console.log('4. Update README.md to reference .gif files instead of .svg');
}

// Run the script
if (require.main === module) {
  createPlaceholderDemos();
}

module.exports = { createPlaceholderDemos };
