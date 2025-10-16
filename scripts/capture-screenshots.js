#!/usr/bin/env node

/**
 * EchoAI Screenshot Capture Script
 * 
 * This script helps automate the process of capturing screenshots
 * for the EchoAI documentation using Puppeteer.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, '../docs');
const CLIENT_URL = 'http://localhost:5173';

async function captureScreenshots() {
  console.log('📸 Starting EchoAI Screenshot Capture...');
  
  // Ensure docs directory exists
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    defaultViewport: { width: 1200, height: 800 }
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to the app
    console.log('🌐 Navigating to EchoAI...');
    await page.goto(CLIENT_URL, { waitUntil: 'networkidle0' });
    
    // Wait for app to load
    await page.waitForSelector('[data-testid="chat-input"]', { timeout: 10000 });
    
    // 1. Light Mode Screenshot
    console.log('📱 Capturing light mode screenshot...');
    await page.evaluate(() => {
      // Ensure light mode is active
      const darkModeToggle = document.querySelector('[data-testid="dark-mode-toggle"]');
      if (darkModeToggle) {
        // Check if we're in dark mode by looking at the body class or other indicators
        const isDarkMode = document.body.classList.contains('dark') || 
                          document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.body).backgroundColor.includes('rgb(15, 23, 42)'); // slate-900
        if (isDarkMode) {
          darkModeToggle.click();
        }
      }
    });
    
    // Add some sample conversation
    await addSampleConversation(page);
    
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'screenshot-light.png'),
      fullPage: true
    });
    
    // 2. Dark Mode Screenshot
    console.log('🌙 Capturing dark mode screenshot...');
    await page.evaluate(() => {
      const darkModeToggle = document.querySelector('[data-testid="dark-mode-toggle"]');
      if (darkModeToggle) {
        // Check if we're in light mode
        const isDarkMode = document.body.classList.contains('dark') || 
                          document.documentElement.classList.contains('dark') ||
                          window.getComputedStyle(document.body).backgroundColor.includes('rgb(15, 23, 42)'); // slate-900
        if (!isDarkMode) {
          darkModeToggle.click();
        }
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for theme transition
    
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'screenshot-dark.png'),
      fullPage: true
    });
    
    // 3. Settings Modal Screenshot
    console.log('⚙️ Capturing settings modal screenshot...');
    await page.click('[data-testid="settings-button"]');
    await page.waitForSelector('[data-testid="settings-modal"]');
    
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'screenshot-settings.png'),
      fullPage: true
    });
    
    // Close settings modal
    await page.click('[data-testid="settings-close"]');
    
    // 4. Error State Screenshot (simulate error)
    console.log('❌ Capturing error state screenshot...');
    await simulateError(page);
    
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'screenshot-error.png'),
      fullPage: true
    });
    
    console.log('✅ All screenshots captured successfully!');
    console.log('📁 Screenshots saved to:', SCREENSHOTS_DIR);
    
  } catch (error) {
    console.error('❌ Error capturing screenshots:', error.message);
  } finally {
    await browser.close();
  }
}

async function addSampleConversation(page) {
  // Add a sample user message
  await page.type('[data-testid="chat-input"]', 'Hello! Can you help me understand quantum computing?');
  await page.keyboard.press('Enter');
  
  // Wait for AI response
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Add another message
  await page.type('[data-testid="chat-input"]', 'That was helpful! Can you also explain machine learning?');
  await page.keyboard.press('Enter');
  
  await new Promise(resolve => setTimeout(resolve, 3000));
}

async function simulateError(page) {
  // Simulate network error by intercepting requests
  await page.setRequestInterception(true);
  
  page.on('request', (request) => {
    if (request.url().includes('/api/chat')) {
      request.abort();
    } else {
      request.continue();
    }
  });
  
  // Try to send a message that will fail
  await page.type('[data-testid="chat-input"]', 'This will cause an error');
  await page.keyboard.press('Enter');
  
  // Wait for error to appear
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Run the script
if (require.main === module) {
  captureScreenshots().catch(console.error);
}

module.exports = { captureScreenshots };
