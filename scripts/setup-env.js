#!/usr/bin/env node

/**
 * EchoAI Environment Setup Script
 * 
 * This script helps users set up their environment files for EchoAI.
 * It creates .env files from .env.example templates and provides guidance.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupEnvironment() {
  console.log('🚀 EchoAI Environment Setup');
  console.log('============================\n');

  // Check if .env files already exist
  const clientEnvPath = path.join(__dirname, '../client/.env');
  const serverEnvPath = path.join(__dirname, '../server/.env');
  
  const clientEnvExists = fs.existsSync(clientEnvPath);
  const serverEnvExists = fs.existsSync(serverEnvPath);

  if (clientEnvExists && serverEnvExists) {
    console.log('✅ Environment files already exist!');
    const overwrite = await question('Do you want to overwrite them? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  // Setup client .env
  console.log('\n📱 Setting up client environment...');
  const clientExamplePath = path.join(__dirname, '../client/.env.example');
  if (fs.existsSync(clientExamplePath)) {
    fs.copyFileSync(clientExamplePath, clientEnvPath);
    console.log('✅ Client .env file created');
  } else {
    console.log('❌ Client .env.example not found');
  }

  // Setup server .env
  console.log('\n🖥️  Setting up server environment...');
  const serverExamplePath = path.join(__dirname, '../server/.env.example');
  if (fs.existsSync(serverExamplePath)) {
    fs.copyFileSync(serverExamplePath, serverEnvPath);
    console.log('✅ Server .env file created');
  } else {
    console.log('❌ Server .env.example not found');
  }

  // Ask for OpenAI API key
  console.log('\n🔑 OpenAI API Key Setup');
  console.log('You can add your OpenAI API key now or later in the app settings.');
  const addApiKey = await question('Do you want to add your OpenAI API key now? (y/N): ');
  
  if (addApiKey.toLowerCase() === 'y' || addApiKey.toLowerCase() === 'yes') {
    const apiKey = await question('Enter your OpenAI API key (starts with sk-): ');
    if (apiKey && apiKey.startsWith('sk-')) {
      // Update server .env with API key
      const serverEnvContent = fs.readFileSync(serverEnvPath, 'utf8');
      const updatedContent = serverEnvContent.replace(
        'OPENAI_API_KEY=sk-your-openai-api-key-here',
        `OPENAI_API_KEY=${apiKey}`
      );
      fs.writeFileSync(serverEnvPath, updatedContent);
      console.log('✅ OpenAI API key added to server configuration');
    } else {
      console.log('❌ Invalid API key format. Please add it manually later.');
    }
  }

  console.log('\n🎉 Setup Complete!');
  console.log('==================');
  console.log('Next steps:');
  console.log('1. Start the server: npm run start:server');
  console.log('2. Start the client: npm run start:client');
  console.log('3. Open http://localhost:5173 in your browser');
  console.log('\nOr use: npm run dev (starts both client and server)');
  
  rl.close();
}

// Handle errors
process.on('uncaughtException', (error) => {
  console.error('❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});

// Run setup
setupEnvironment().catch((error) => {
  console.error('❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});
