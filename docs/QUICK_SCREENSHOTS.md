# 📸 Quick Screenshot Guide

## 🚀 Automated Screenshot Capture

I've set up an automated screenshot capture system for you! Here's how to use it:

### Prerequisites

1. **Start EchoAI**: Make sure both client and server are running
2. **Install Dependencies**: Puppeteer is already installed

### Step 1: Start EchoAI

```bash
# Terminal 1: Start the server
cd server && npm start

# Terminal 2: Start the client
cd client && npm start
```

### Step 2: Capture Screenshots

```bash
# From the root directory
npm run screenshots
```

This will automatically capture:

- ✅ **Light mode screenshot** (`screenshot-light.png`)
- ✅ **Dark mode screenshot** (`screenshot-dark.png`)
- ✅ **Settings modal screenshot** (`screenshot-settings.png`)
- ✅ **Error state screenshot** (`screenshot-error.png`)

### Step 3: Check Results

The screenshots will be saved in the `docs/` folder and automatically appear in your README!

## 🎬 Manual Screenshot Creation

If you prefer to create screenshots manually:

### What You Need to Capture

#### 1. Light Mode Screenshot

- Set EchoAI to light mode
- Have a conversation with 2-3 messages
- Take full window screenshot
- Save as `docs/screenshot-light.png` (400px width)

#### 2. Dark Mode Screenshot

- Set EchoAI to dark mode
- Have a conversation with 2-3 messages
- Take full window screenshot
- Save as `docs/screenshot-dark.png` (400px width)

#### 3. Settings Modal Screenshot

- Open settings modal (gear icon)
- Show API key input field
- Take screenshot of modal
- Save as `docs/screenshot-settings.png` (400px width)

#### 4. Error State Screenshot

- Disconnect internet temporarily
- Try to send a message
- Show error with retry options
- Take screenshot
- Save as `docs/screenshot-error.png` (400px width)

### Sample Content for Screenshots

**User Messages:**

- "Hello! Can you help me understand quantum computing?"
- "That was helpful! Can you also explain machine learning?"
- "Thanks for the explanation!"

**AI Responses:**

- Let the AI respond naturally to your questions
- This creates realistic conversation content

## 🎥 Creating Demo GIFs

### Desktop Demo GIF (800px width)

1. **Record 20-30 seconds** showing:

   - Welcome screen
   - Sending a message
   - AI response with typing indicator
   - Theme toggle (light ↔ dark)
   - Opening settings modal
   - Closing settings

2. **Tools to use:**

   - **macOS**: QuickTime Player or ScreenFlow
   - **Windows**: OBS Studio or Camtasia
   - **Linux**: SimpleScreenRecorder

3. **Export settings:**
   - Width: 800px
   - Format: GIF
   - Duration: 20-30 seconds
   - File size: < 5MB

### Mobile Demo GIF (300px width)

1. **Record 15-20 seconds** showing:

   - Mobile responsive design
   - Touch interactions
   - Mobile navigation
   - Mobile settings

2. **Tools to use:**

   - **iOS**: Built-in screen recording
   - **Android**: Built-in screen recording
   - **Browser**: Chrome DevTools mobile simulation

3. **Export settings:**
   - Width: 300px
   - Format: GIF
   - Duration: 15-20 seconds
   - File size: < 3MB

## 📁 File Structure

After creating your assets, your `docs/` folder should look like:

```
docs/
├── demo-desktop.gif          # Desktop demo (800px)
├── demo-mobile.gif           # Mobile demo (300px)
├── screenshot-light.png      # Light mode (400px)
├── screenshot-dark.png       # Dark mode (400px)
├── screenshot-settings.png   # Settings modal (400px)
├── screenshot-error.png      # Error handling (400px)
└── README.md                 # Documentation
```

## 🎯 Pro Tips

### For Better Screenshots:

- ✅ Use Chrome or Firefox for consistency
- ✅ Take screenshots at 2x or 3x resolution
- ✅ Include some browser chrome for context
- ✅ Use realistic but generic content
- ✅ Ensure good contrast and readability

### For Better GIFs:

- ✅ Move slowly and deliberately
- ✅ Pause briefly at each action
- ✅ Use consistent timing
- ✅ Keep file sizes small
- ✅ Test on different devices

### Optimization:

- ✅ Compress images using tools like TinyPNG
- ✅ Optimize GIFs using EZGIF.com
- ✅ Test loading times on GitHub
- ✅ Ensure accessibility compliance

## 🚀 Quick Start Commands

```bash
# Start EchoAI
npm run dev

# Capture screenshots automatically
npm run screenshots

# Check results
ls -la docs/
```

## 🆘 Troubleshooting

### Screenshot Script Issues:

- **App not loading**: Make sure EchoAI is running on http://localhost:5173
- **Elements not found**: Check that test IDs are properly added
- **Timeout errors**: Increase timeout values in the script

### Manual Screenshot Issues:

- **Poor quality**: Use higher resolution screenshots
- **Wrong size**: Resize to exact dimensions (400px width)
- **Not showing**: Check file paths in README.md

### GIF Issues:

- **Too large**: Compress using online tools
- **Too fast**: Slow down the recording
- **Poor quality**: Use higher resolution recording

---

**Need help?** The automated script should handle most of the work for you! Just run `npm run screenshots` after starting EchoAI. 🎉
