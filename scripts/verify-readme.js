#!/usr/bin/env node

/**
 * EchoAI README Verification Script
 * 
 * This script verifies that the README.md properly references all screenshots
 * and that the screenshot files exist.
 */

const fs = require('fs');
const path = require('path');

const README_PATH = path.join(__dirname, '../README.md');
const SCREENSHOTS_DIR = path.join(__dirname, '../docs');

function verifyReadme() {
  console.log('🔍 Verifying EchoAI README and Screenshots...');
  
  // Check if README exists
  if (!fs.existsSync(README_PATH)) {
    console.log('❌ README.md not found');
    return false;
  }
  
  const readmeContent = fs.readFileSync(README_PATH, 'utf8');
  
  // Expected screenshot files
  const expectedScreenshots = [
    'screenshot-light.png',
    'screenshot-dark.png',
    'screenshot-settings.png',
    'screenshot-error.png'
  ];
  
  // Expected demo files (optional)
  const expectedDemos = [
    'demo-desktop.gif',
    'demo-mobile.gif'
  ];
  
  let allGood = true;
  
  console.log('\n📸 Checking Screenshots:');
  
  // Check if each screenshot exists and is referenced in README
  expectedScreenshots.forEach(filename => {
    const filePath = path.join(SCREENSHOTS_DIR, filename);
    const exists = fs.existsSync(filePath);
    const referenced = readmeContent.includes(filename);
    
    if (exists && referenced) {
      console.log(`✅ ${filename}: Found and referenced`);
    } else if (exists && !referenced) {
      console.log(`⚠️  ${filename}: Found but not referenced in README`);
      allGood = false;
    } else if (!exists && referenced) {
      console.log(`❌ ${filename}: Referenced in README but file missing`);
      allGood = false;
    } else {
      console.log(`❌ ${filename}: Missing file and not referenced`);
      allGood = false;
    }
  });
  
  console.log('\n🎬 Checking Demo Files:');
  
  // Check demo files (optional)
  expectedDemos.forEach(filename => {
    const filePath = path.join(SCREENSHOTS_DIR, filename);
    const exists = fs.existsSync(filePath);
    const referenced = readmeContent.includes(filename);
    
    if (exists && referenced) {
      console.log(`✅ ${filename}: Found and referenced`);
    } else if (exists && !referenced) {
      console.log(`⚠️  ${filename}: Found but not referenced in README`);
    } else if (!exists && referenced) {
      console.log(`❌ ${filename}: Referenced in README but file missing`);
    } else {
      console.log(`ℹ️  ${filename}: Not found (optional - can be created later)`);
    }
  });
  
  // Check README structure
  console.log('\n📋 Checking README Structure:');
  
  const requiredSections = [
    '## 📱 Demo',
    '### 🎨 UI Screenshots',
    'screenshot-light.png',
    'screenshot-dark.png',
    'screenshot-settings.png',
    'screenshot-error.png'
  ];
  
  requiredSections.forEach(section => {
    if (readmeContent.includes(section)) {
      console.log(`✅ Section found: ${section}`);
    } else {
      console.log(`❌ Section missing: ${section}`);
      allGood = false;
    }
  });
  
  // Summary
  console.log('\n📊 Verification Summary:');
  
  if (allGood) {
    console.log('✅ All screenshots are properly set up and referenced in README!');
    console.log('🎉 Your README is ready for GitHub!');
  } else {
    console.log('❌ Some issues found. Please check the output above.');
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Commit your changes: git add . && git commit -m "Add screenshots"');
  console.log('2. Push to GitHub: git push');
  console.log('3. Check your README on GitHub to ensure images display correctly');
  console.log('4. Consider creating demo GIFs for even better visual appeal');
  
  return allGood;
}

// Run verification
if (require.main === module) {
  verifyReadme();
}

module.exports = { verifyReadme };
