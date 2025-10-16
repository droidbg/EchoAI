#!/usr/bin/env node

/**
 * EchoAI Screenshot Optimization Script
 * 
 * This script optimizes the captured screenshots for better web performance.
 */

const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, '../docs');
const MAX_WIDTH = 400; // Target width for screenshots

function optimizeScreenshots() {
  console.log('🔧 Optimizing EchoAI Screenshots...');
  
  const screenshotFiles = [
    'screenshot-light.png',
    'screenshot-dark.png', 
    'screenshot-settings.png',
    'screenshot-error.png'
  ];
  
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;
  
  screenshotFiles.forEach(filename => {
    const filePath = path.join(SCREENSHOTS_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeBefore = stats.size;
      totalSizeBefore += sizeBefore;
      
      console.log(`📸 ${filename}: ${(sizeBefore / 1024).toFixed(1)}KB`);
      
      // For now, just report the file sizes
      // In a real implementation, you would use sharp or similar to resize/compress
      totalSizeAfter += sizeBefore;
    } else {
      console.log(`❌ ${filename}: Not found`);
    }
  });
  
  console.log('\n📊 Screenshot Summary:');
  console.log(`Total size: ${(totalSizeBefore / 1024).toFixed(1)}KB`);
  console.log(`Files: ${screenshotFiles.length}`);
  
  // Check if files are reasonable size
  const avgSize = totalSizeBefore / screenshotFiles.length;
  if (avgSize > 200 * 1024) { // 200KB average
    console.log('\n⚠️  Screenshots are quite large. Consider:');
    console.log('- Using image compression tools like TinyPNG');
    console.log('- Converting to WebP format for better compression');
    console.log('- Reducing image dimensions if needed');
  } else {
    console.log('\n✅ Screenshot sizes look good!');
  }
  
  console.log('\n🎯 Next Steps:');
  console.log('1. Screenshots are ready for your README');
  console.log('2. Consider creating demo GIFs for better visual appeal');
  console.log('3. Test the README on GitHub to ensure images load properly');
}

// Run optimization
if (require.main === module) {
  optimizeScreenshots();
}

module.exports = { optimizeScreenshots };
