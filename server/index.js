/**
 * EchoAI Server
 *
 * A Node.js Express server that provides Google Gemini API integration for the
 * EchoAI chat application. This server acts as a proxy between the client and
 * Google's Gemini API, handling authentication and request processing.
 *
 * @author EchoAI Contributors
 * @license Apache-2.0
 */

import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
env.config();

const app = express();
const PORT = process.env.PORT || 3080;
const MODEL = "gemini-2.5-flash";
const SYSTEM_INSTRUCTION =
  "You are EchoAI, a helpful AI assistant. Provide clear, concise, and helpful responses.";

// Allowed client origins: localhost (dev) + the known production client +
// anything set via CLIENT_URL (comma-separated). Building an explicit list
// keeps CORS working even if CLIENT_URL is unset on the host, instead of
// silently dropping the Access-Control-Allow-Origin header.
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://echoai2.vercel.app',
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(o => o.trim()).filter(Boolean)
    : []),
];

// Middleware configuration
app.use(cors({
  origin(origin, callback) {
    // Allow non-browser / same-origin requests (no Origin header) and any
    // explicitly allow-listed origin.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Validate Gemini API key
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY environment variable is required');
  process.exit(1);
}

// Configure Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Health check endpoint
 * @route GET /
 * @returns {Object} Server status
 */
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    service: "EchoAI Server",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * Chat completion endpoint
 * @route POST /
 * @param {Object} req.body - Request body containing the user message
 * @param {string} req.body.message - The user's message to process
 * @returns {Object} The Gemini response
 */
app.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate request body
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        status: 400,
        error: "Invalid request",
        message: "Message is required and must be a non-empty string"
      });
    }

    // Log the request (sanitized for privacy)
    console.log(`📝 Processing message: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`);

    // Generate a response with Gemini
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: message.trim(),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 2000,
        temperature: 0.7,
      },
    });

    const responseMessage = response.text;

    // Validate the response
    if (!responseMessage) {
      throw new Error("No response from Gemini");
    }

    // Log successful response
    console.log(`✅ Response generated: ${responseMessage.substring(0, 50)}${responseMessage.length > 50 ? '...' : ''}`);

    res.status(200).json({
      message: responseMessage,
      usage: response.usageMetadata,
      model: MODEL
    });

  } catch (error) {
    console.error("❌ Error processing request:", error);

    const status = error?.status;
    const reason = `${error?.message || ''}`.toLowerCase();

    // Invalid / missing API key
    if (status === 401 || status === 403 || reason.includes('api key') || reason.includes('permission')) {
      return res.status(401).json({
        status: 401,
        error: "Invalid API key",
        message: "Gemini API key is invalid or expired."
      });
    }

    // Rate limit / quota exhausted
    if (status === 429 || reason.includes('quota') || reason.includes('resource_exhausted') || reason.includes('rate limit')) {
      return res.status(429).json({
        status: 429,
        error: "Rate limit exceeded",
        message: "Too many requests or quota exceeded. Please try again later."
      });
    }

    // Generic error response
    res.status(500).json({
      status: 500,
      error: "Internal server error",
      message: process.env.NODE_ENV === 'production'
        ? "An error occurred while processing your request."
        : error.message
    });
  }
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
  console.error("🚨 Unhandled error:", err);
  res.status(500).json({
    status: 500,
    error: "Internal server error",
    message: "An unexpected error occurred"
  });
});

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: "Not found",
    message: "The requested endpoint does not exist"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 EchoAI Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 Gemini API Key: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});
