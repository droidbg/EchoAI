<div align="center">
  <img src="./client/public/favicon.svg" alt="EchoAI Logo" width="120" height="120">
  
  # EchoAI
  
  **A modern, responsive AI chat workspace built with React, TypeScript, and Google Gemini**
  
  <br>
  
  <!-- Badges -->
  <p align="center">
    <a href="https://github.com/droidbg/EchoAI">
      <img src="https://img.shields.io/github/stars/droidbg/EchoAI?style=for-the-badge&logo=github&color=yellow&labelColor=black" alt="GitHub stars">
    </a>
    <a href="https://github.com/droidbg/EchoAI/fork">
      <img src="https://img.shields.io/github/forks/droidbg/EchoAI?style=for-the-badge&logo=github&color=blue&labelColor=black" alt="GitHub forks">
    </a>
    <a href="https://github.com/droidbg/EchoAI/issues">
      <img src="https://img.shields.io/github/issues/droidbg/EchoAI?style=for-the-badge&logo=github&color=red&labelColor=black" alt="GitHub issues">
    </a>
    <a href="https://github.com/droidbg/EchoAI/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge&logo=apache" alt="License">
    </a>
  </p>
  
  <p align="center">
    <a href="https://nodejs.org/">
      <img src="https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
    </a>
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react&logoColor=white" alt="React">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.6.2-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    </a>
  </p>
  
  <p align="center">
    <a href="https://echoai2.vercel.app">
      <img src="https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Now-green?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
    </a>
    <a href="https://github.com/droidbg/EchoAI/discussions">
      <img src="https://img.shields.io/badge/💬%20Discussions-Join%20Us-blue?style=for-the-badge&logo=github&logoColor=white" alt="Discussions">
    </a>
  </p>
  
  <br>
  
  <!-- Quick Links -->
  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 📱 Demo

<div align="center">
  
  ### 🖥️ Desktop View
  <img src="./docs/demo-desktop.gif" alt="EchoAI Desktop Demo" width="800" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  
  <br><br>
  
  ### 📱 Mobile View
  <img src="./docs/demo-mobile.gif" alt="EchoAI Mobile Demo" width="300" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  
  <br><br>
  
  ### 🎨 UI Screenshots
  
  <table>
    <tr>
      <td align="center">
        <strong>Light Mode</strong><br>
        <img src="./docs/screenshot-light.png" alt="Light Mode" width="400" style="border-radius: 8px;">
      </td>
      <td align="center">
        <strong>Dark Mode</strong><br>
        <img src="./docs/screenshot-dark.png" alt="Dark Mode" width="400" style="border-radius: 8px;">
      </td>
    </tr>
    <tr>
      <td align="center">
        <strong>Settings Modal</strong><br>
        <img src="./docs/screenshot-settings.png" alt="Settings" width="400" style="border-radius: 8px;">
      </td>
      <td align="center">
        <strong>Error Handling</strong><br>
        <img src="./docs/screenshot-error.png" alt="Error Handling" width="400" style="border-radius: 8px;">
      </td>
    </tr>
  </table>
  
  <br>
  
  **[🚀 Try EchoAI Live](https://echoai2.vercel.app)** • **[📖 View Documentation](#-documentation)**
  
</div>

---

## 📊 Project Status

<div align="center">

| Status            | Description          |
| ----------------- | -------------------- |
| 🟢 **Stable**     | Production ready     |
| 🟢 **Active**     | Regular updates      |
| 🟢 **Maintained** | Bug fixes & features |
| 🟢 **Documented** | Comprehensive docs   |

</div>

### 🎯 Current Version: `v1.0.0`

- ✅ **Workspace UI**: Sidebar with saved chat history, "New Chat", and an editable profile
- ✅ **Design**: "Midnight Indigo" dark theme + premium light theme, with a signature animated AI orb
- ✅ **AI Chat**: Google Gemini integration, suggestion grid, retry & error recovery
- ✅ **Security**: Session-scoped API key storage, input validation
- 🔄 **Roadmap**: See [Issues](https://github.com/droidbg/EchoAI/issues) for upcoming features

---

## 🌟 Features

### 🎨 **Modern Workspace Interface**

- **Sidebar Navigation**: Persistent chat history with rename/delete, a one-click "New Chat", and an editable local profile
- **"Midnight Indigo" Theme**: A premium dark-first design with a polished light variant, toggleable anytime
- **Signature AI Orb**: A pure-CSS glass-marble orb used as the brand mark, hero and thinking indicator
- **Responsive Design**: Fixed sidebar on desktop, slide-in drawer on mobile — works across all devices
- **Accessibility**: Keyboard-navigable, clear focus styles, and `prefers-reduced-motion` support

### 🤖 **AI-Powered Conversations**

- **Gemini Integration**: Powered by Google Gemini 2.5 Flash for intelligent, contextual responses
- **Smart Suggestions**: Pre-built prompts for common use cases
- **Context Awareness**: Maintains conversation context throughout the chat
- **Error Recovery**: Intelligent retry mechanisms with fallback options

### 💬 **Saved Conversations**

- **Multiple Chats**: Start as many conversations as you like and switch between them instantly
- **Persistent History**: Conversations are saved in your browser and survive reloads
- **Auto-Titles**: Each chat is named from your first message — rename or delete anytime

### 🔐 **Flexible API Key Management**

- **User API Keys**: Use your own Google Gemini API key for personal use
- **Server Fallback**: Built-in server with default API key for easy setup
- **Session Storage**: Your API key is kept only for the current browser session and never sent to our servers
- **Key Validation**: Real-time API key testing and validation

### ⚡ **Performance & Reliability**

- **Fast Loading**: Optimized bundle size and lazy loading
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Retry Logic**: Automatic retry mechanisms for failed requests
- **Offline Support**: Graceful degradation when offline

### 🛠️ **Developer Experience**

- **TypeScript**: Full type safety and excellent developer experience
- **Modern Stack**: React 18, Vite, Tailwind CSS, and more
- **Hot Reload**: Fast development with instant feedback
- **ESLint & Prettier**: Consistent code formatting and quality

---

## 📋 Table of Contents

<details>
<summary>Click to expand</summary>

- [📱 Demo](#-demo)
- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [💻 Usage](#-usage)
- [🏗️ Architecture](#️-architecture)
- [📚 API Documentation](#-api-documentation)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support](#-support)

</details>

---

## 🚀 Quick Start

> **⚡ Get up and running in under 5 minutes!**

### 📋 Prerequisites

| Requirement        | Version  | Download                                                |
| ------------------ | -------- | ------------------------------------------------------- |
| **Node.js**        | ≥ 20.0.0 | [Download](https://nodejs.org/)                         |
| **npm**            | Latest   | Included with Node.js                                   |
| **Gemini API Key** | Any      | [Get Key](https://aistudio.google.com/apikey)           |

### ⚡ One-Command Setup

```bash
# Clone, install, and start EchoAI
git clone https://github.com/droidbg/EchoAI.git && cd EchoAI && npm run setup
```

> **Note**: The `npm run setup` script will be added to automate the entire setup process.

### 1. Clone the Repository

```bash
git clone https://github.com/droidbg/EchoAI.git
cd EchoAI
```

### 2. Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Configure Environment

```bash
# Copy environment templates
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Edit the environment files:

**`client/.env`:**

```env
VITE_SERVER_URL=http://localhost:3080/
```

**`server/.env`:**

```env
GEMINI_API_KEY=AIza-your-gemini-api-key-here
```

### 4. Start the Application

```bash
# Terminal 1: Start the server
cd server
npm start

# Terminal 2: Start the client
cd client
npm start
```

Visit `http://localhost:5173` to see EchoAI in action! 🎉

---

## 📦 Installation

### Option 1: Full Stack Setup (Recommended)

This setup includes both the React frontend and Node.js backend:

```bash
# Clone and setup
git clone https://github.com/droidbg/EchoAI.git
cd EchoAI

# Install all dependencies
npm run install:all

# Configure environment
cp client/.env.example client/.env
cp server/.env.example server/.env

# Start both client and server
npm run dev
```

### Option 2: Client-Only Setup

If you prefer to use your own backend or API:

```bash
# Clone and setup client only
git clone https://github.com/droidbg/EchoAI.git
cd EchoAI/client

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start client
npm start
```

### Option 3: Server-Only Setup

For deploying just the backend:

```bash
# Clone and setup server only
git clone https://github.com/droidbg/EchoAI.git
cd EchoAI/server

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start server
npm start
```

---

## ⚙️ Configuration

### Environment Variables

#### Client Configuration (`client/.env`)

| Variable          | Description        | Default                  | Required |
| ----------------- | ------------------ | ------------------------ | -------- |
| `VITE_SERVER_URL` | Backend server URL | `http://localhost:3080/` | Yes      |
| `VITE_DEBUG`      | Enable debug mode  | `false`                  | No       |

#### Server Configuration (`server/.env`)

| Variable         | Description         | Default       | Required        |
| ---------------- | ------------------- | ------------- | --------------- |
| `GEMINI_API_KEY` | Your Gemini API key | -             | Yes             |
| `PORT`           | Server port         | `3080`        | No              |
| `NODE_ENV`       | Environment mode    | `development` | No              |
| `CLIENT_URL`     | Client URL for CORS | -             | No (production) |

### API Key Setup

#### Using Your Own API Key (Recommended)

1. **Get a Gemini API Key**:

   - Visit [Google AI Studio](https://aistudio.google.com/apikey)
   - Create a new API key
   - Copy the key (starts with `AIza`)

2. **Add to EchoAI**:
   - Click the settings gear icon in the top-right corner
   - Paste your API key in the "Gemini API Key" field
   - Click "Save Key"
   - The system will test your key automatically

#### Using Server API Key

1. **Add to Server Environment**:

   ```bash
   # In server/.env
   GEMINI_API_KEY=AIza-your-gemini-api-key-here
   ```

2. **Restart the Server**:
   ```bash
   cd server
   npm start
   ```

---

## 💻 Usage

### Basic Chat

1. **Start a Conversation**: Type your message in the input field
2. **Send Message**: Press Enter or click the send button
3. **View Response**: The AI response will appear in the chat
4. **Continue Chatting**: Keep the conversation going naturally

### Using Suggestions

EchoAI provides helpful suggestions to get you started:

- **"Explain quantum computing"** - Get explanations of complex topics
- **"Write a creative story"** - Generate creative content
- **"Help with coding"** - Get programming assistance
- **"Plan a vacation"** - Get travel planning help

### Error Handling

When errors occur, EchoAI provides helpful options:

- **Try Again**: Retry the failed request
- **Use Your API Key**: Switch to your personal API key
- **Clear Error**: Dismiss the error and continue

### Settings

Access settings by clicking the gear icon:

- **API Key Management**: Add, test, or remove your API key
- **Theme Toggle**: Switch between dark and light modes
- **Key Status**: See which API key is currently active

---

## 🏗️ Architecture

### Frontend (React + TypeScript)

```
client/
├── src/
│   ├── components/             # React components
│   │   ├── Sidebar.tsx         # Workspace nav: history, new chat, profile
│   │   ├── Header.tsx          # Top bar: status, settings, theme toggle
│   │   ├── Orb.tsx             # Signature animated AI orb
│   │   ├── ChatBody.tsx        # Message list + welcome / suggestion grid
│   │   ├── ChatInput.tsx       # Composer
│   │   ├── AiChat.tsx          # AI message bubble
│   │   ├── UserChat.tsx        # User message bubble
│   │   ├── TypingIndicator.tsx # Thinking animation
│   │   ├── InlineErrorOptions.tsx # In-bubble retry / use-own-key actions
│   │   └── SettingsModal.tsx   # API key settings
│   ├── utils/                  # Utilities & state
│   │   ├── Api.ts              # API communication
│   │   ├── ApiKeyManager.ts    # API key management
│   │   └── useConversations.ts # Reducer-backed chat store (localStorage)
│   ├── App.tsx                 # Workspace shell & orchestration
│   └── main.tsx                # Application entry point
├── public/                     # Static assets
└── package.json                # Dependencies and scripts
```

### Backend (Node.js + Express)

```
server/
├── index.js               # Main server file
├── package.json          # Dependencies and scripts
├── vercel.json           # Vercel deployment config
└── .env.example          # Environment template
```

### Technology Stack

#### Frontend

- **React 18** - Modern React with hooks, `useReducer` state and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first styling layered over a custom design-token system
- **Fraunces + Plus Jakarta Sans** - Distinctive serif/sans type pairing
- **React Query** - Data fetching for chat requests
- **Auto Animate** - Smooth list animations
- **localStorage** - Client-side persistence for saved conversations

#### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Google GenAI SDK** - Official `@google/genai` client for Gemini
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## 📚 API Documentation

### Server Endpoints

#### Health Check

```http
GET /
```

**Response:**

```json
{
  "status": "healthy",
  "service": "EchoAI Server",
  "version": "1.0.0",
  "timestamp": "2024-12-19T10:30:00.000Z",
  "environment": "development"
}
```

#### Chat Completion

```http
POST /
Content-Type: application/json

{
  "message": "Hello, how are you?"
}
```

**Response:**

```json
{
  "message": "Hello! I'm doing well, thank you for asking. How can I help you today?",
  "usage": {
    "promptTokenCount": 10,
    "candidatesTokenCount": 20,
    "totalTokenCount": 30
  },
  "model": "gemini-2.5-flash"
}
```

**Error Responses:**

| Status | Error                 | Description                |
| ------ | --------------------- | -------------------------- |
| 400    | Invalid request       | Missing or invalid message |
| 401    | Invalid API key       | Gemini API key is invalid  |
| 402    | Insufficient quota    | Gemini API quota exceeded  |
| 429    | Rate limit exceeded   | Too many requests          |
| 500    | Internal server error | Server-side error          |

### Client API

#### Message Type

```typescript
interface Message {
  sender: 'user' | 'ai';
  message: string;
  isError?: boolean;
  errorId?: string;
}
```

#### API Functions

```typescript
// Fetch AI response
fetchResponse(messages: Message[]): Promise<{ message: string }>

// API Key Management
ApiKeyManager.getApiKey(): string | null
ApiKeyManager.setApiKey(key: string): void
ApiKeyManager.clearApiKey(): void
ApiKeyManager.validateApiKeyFormat(key: string): { isValid: boolean; message: string }
ApiKeyManager.testApiKey(key: string): Promise<{ isValid: boolean; message: string }>
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

#### Deploy Client

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy client
cd client
vercel

# Follow the prompts to configure
```

#### Deploy Server

```bash
# Deploy server
cd server
vercel

# Add environment variables in Vercel dashboard
# GEMINI_API_KEY=your-key-here
```

### Option 2: Railway

#### Deploy Full Stack

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option 3: Self-Hosted

#### Using Docker

```dockerfile
# Dockerfile for server
FROM node:24-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ .
EXPOSE 3080
CMD ["npm", "start"]
```

#### Using PM2

```bash
# Install PM2
npm i -g pm2

# Start server with PM2
cd server
pm2 start index.js --name echoai-server
pm2 startup
pm2 save
```

### Environment Variables for Production

```bash
# Server
GEMINI_API_KEY=AIza-your-production-key
NODE_ENV=production
PORT=3080
CLIENT_URL=https://your-client-domain.com

# Client
VITE_SERVER_URL=https://your-server-domain.com
```

---

## 🤝 Contributing

We welcome contributions to EchoAI! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test them
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Setup

```bash
# Fork and clone
git clone https://github.com/droidbg/EchoAI.git
cd EchoAI

# Install dependencies
npm run install:all

# Start development servers
npm run dev
```

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Add JSDoc comments for complex functions
- Write meaningful commit messages
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google** for the Gemini models and the GenAI SDK
- **React Team** for the excellent framework
- **Vercel** for the deployment platform
- **All Contributors** who help make EchoAI better

---

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/droidbg/EchoAI/wiki)
- **Issues**: [GitHub Issues](https://github.com/droidbg/EchoAI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/droidbg/EchoAI/discussions)
- **Security**: [Security Policy](SECURITY.md)

---

<div align="center">
  <p>Made with ❤️ by the EchoAI Contributors</p>
  <p>
    <a href="https://github.com/droidbg/EchoAI">⭐ Star us on GitHub</a> •
    <a href="https://github.com/droidbg/EchoAI/issues">🐛 Report Bug</a> •
    <a href="https://github.com/droidbg/EchoAI/issues">💡 Request Feature</a>
  </p>
</div>
