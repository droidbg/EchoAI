/**
 * EchoAI Server
 * 
 * A Node.js Express server that provides OpenAI API integration for the EchoAI chat application.
 * This server acts as a proxy between the client and OpenAI's API, handling authentication
 * and request processing.
 * 
 * @author EchoAI Contributors
 * @license Apache-2.0
 */

import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from "body-parser";
import OpenAI from "openai";

// Load environment variables
env.config();

const app = express();
const PORT = process.env.PORT || 3080;

// Middleware configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : ['http://localhost:3000', 'http://localhost:5173'],
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

// Validate OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

// Configure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Health check endpoint
 * @route GET /
 * @returns {Object} Server status
 */
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    service: "EchoAI Server",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * Chat completion endpoint
 * @route POST /
 * @param {Object} req.body - Request body containing the user message
 * @param {string} req.body.message - The user's message to process
 * @returns {Object} OpenAI's response
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

    // Create OpenAI completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message.trim(),
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    // Validate OpenAI response
    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    const responseMessage = completion.choices[0].message.content;
    
    // Log successful response
    console.log(`✅ Response generated: ${responseMessage.substring(0, 50)}${responseMessage.length > 50 ? '...' : ''}`);

    res.status(200).json({ 
      message: responseMessage,
      usage: completion.usage,
      model: completion.model
    });

  } catch (error) {
    console.error("❌ Error processing request:", error);

    // Handle different types of errors
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        status: 402,
        error: "Insufficient quota",
        message: "OpenAI API quota exceeded. Please check your billing."
      });
    }

    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({
        status: 429,
        error: "Rate limit exceeded",
        message: "Too many requests. Please try again later."
      });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        status: 401,
        error: "Invalid API key",
        message: "OpenAI API key is invalid or expired."
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
  console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
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
