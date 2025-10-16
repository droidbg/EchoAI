#!/usr/bin/env node

/**
 * EchoAI Real GIF Creation Script
 * 
 * This script creates real animated GIFs by capturing screenshots
 * and using gif-encoder-2 to create proper animated GIFs.
 */

const puppeteer = require('puppeteer');
const GIFEncoder = require('gif-encoder-2');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '../docs');
const CLIENT_URL = 'http://localhost:5173';

async function createRealGif() {
  console.log('🎬 Creating Real EchoAI GIF...');
  
  // Ensure docs directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to the app
    console.log('🌐 Navigating to EchoAI...');
    await page.goto(CLIENT_URL, { waitUntil: 'networkidle0' });
    
    // Wait for app to load
    await page.waitForSelector('[data-testid="chat-input"]', { timeout: 10000 });
    console.log('✅ App loaded successfully');
    
    // Capture screenshots
    console.log('📸 Capturing screenshots...');
    const screenshotPaths = await captureScreenshots(page);
    
    // Create GIF from screenshots
    console.log('🔄 Creating GIF from screenshots...');
    await createGifFromScreenshots(screenshotPaths);
    
    console.log('✅ Real GIF created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating GIF:', error.message);
  } finally {
    await browser.close();
  }
}

async function captureScreenshots(page) {
  const screenshotPaths = [];
  const frameCount = 4; // Few frames for smaller file
  const frameDelay = 2000; // 2 seconds between frames
  
  console.log(`📸 Capturing ${frameCount} frames...`);
  
  for (let i = 0; i < frameCount; i++) {
    console.log(`  📸 Frame ${i + 1}/${frameCount}...`);
    
    // Perform different actions based on frame number
    if (i === 1) {
      console.log('    - Typing message...');
      await page.click('[data-testid="chat-input"]');
      await page.type('[data-testid="chat-input"]', 'Hello! Can you help me?');
    } else if (i === 2) {
      console.log('    - Sending message...');
      await page.keyboard.press('Enter');
    }
    
    // Capture screenshot
    const screenshotPath = path.join(SCREENSHOTS_DIR, `gif-frame-${i + 1}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1200, height: 800 }
    });
    
    console.log(`    - Saved screenshot: ${screenshotPath}`);
    screenshotPaths.push(screenshotPath);
    
    // Wait between frames
    await new Promise(resolve => setTimeout(resolve, frameDelay));
  }
  
  return screenshotPaths;
}

async function createGifFromScreenshots(screenshotPaths) {
  console.log('🔄 Creating GIF from screenshots using gif-encoder-2...');
  
  // Set the dimensions of the GIF
  const width = 800;
  const height = 600;
  
  // Create a canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Initialize the GIF encoder
  const encoder = new GIFEncoder(width, height);
  encoder.setDelay(1000); // Set frame delay to 1 second
  encoder.start();
  
  console.log(`📊 Processing ${screenshotPaths.length} screenshots...`);
  
  // Add each screenshot as a frame
  for (let i = 0; i < screenshotPaths.length; i++) {
    const imagePath = screenshotPaths[i];
    console.log(`  - Processing frame ${i + 1}: ${path.basename(imagePath)}`);
    
    try {
      const image = await loadImage(imagePath);
      ctx.clearRect(0, 0, width, height); // Clear the canvas
      ctx.drawImage(image, 0, 0, width, height); // Draw the image
      encoder.addFrame(ctx); // Add the frame to the GIF
    } catch (error) {
      console.error(`    - Error processing ${imagePath}:`, error.message);
    }
  }
  
  encoder.finish(); // Finalize the GIF
  
  // Save the desktop GIF
  const desktopGifPath = path.join(SCREENSHOTS_DIR, 'demo-desktop.gif');
  const buffer = encoder.out.getData();
  fs.writeFileSync(desktopGifPath, buffer);
  console.log(`✅ Created demo-desktop.gif (${(fs.statSync(desktopGifPath).size / 1024).toFixed(1)}KB)`);
  
  // Create mobile version (scaled down)
  await createMobileGif(screenshotPaths, 300, 225);
  
  // Clean up temporary screenshots
  console.log('🧹 Cleaning up temporary screenshots...');
  screenshotPaths.forEach(screenshotPath => {
    if (fs.existsSync(screenshotPath)) {
      fs.unlinkSync(screenshotPath);
      console.log(`  - Removed: ${path.basename(screenshotPath)}`);
    }
  });
}

async function createMobileGif(screenshotPaths, width, height) {
  console.log(`🔄 Creating mobile GIF (${width}x${height})...`);
  
  // Create a canvas for mobile
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Initialize the GIF encoder for mobile
  const encoder = new GIFEncoder(width, height);
  encoder.setDelay(1000); // Set frame delay to 1 second
  encoder.start();
  
  // Add each screenshot as a frame (scaled down)
  for (let i = 0; i < screenshotPaths.length; i++) {
    const imagePath = screenshotPaths[i];
    console.log(`  - Processing mobile frame ${i + 1}: ${path.basename(imagePath)}`);
    
    try {
      const image = await loadImage(imagePath);
      ctx.clearRect(0, 0, width, height); // Clear the canvas
      ctx.drawImage(image, 0, 0, width, height); // Draw the image scaled down
      encoder.addFrame(ctx); // Add the frame to the GIF
    } catch (error) {
      console.error(`    - Error processing ${imagePath}:`, error.message);
    }
  }
  
  encoder.finish(); // Finalize the GIF
  
  // Save the mobile GIF
  const mobileGifPath = path.join(SCREENSHOTS_DIR, 'demo-mobile.gif');
  const buffer = encoder.out.getData();
  fs.writeFileSync(mobileGifPath, buffer);
  console.log(`✅ Created demo-mobile.gif (${(fs.statSync(mobileGifPath).size / 1024).toFixed(1)}KB)`);
}

// Run the script
if (require.main === module) {
  createRealGif().catch(console.error);
}

module.exports = { createRealGif };
