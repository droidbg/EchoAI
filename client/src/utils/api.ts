/**
 * API Utility for EchoAI
 *
 * This module handles all API communications for the EchoAI application,
 * including both server-side calls and direct Google Gemini API calls.
 *
 * Features:
 * - Automatic fallback between user API key and server API key
 * - Comprehensive error handling with user-friendly messages
 * - Support for both the server proxy and direct Gemini calls
 *
 * @author EchoAI Contributors
 * @license Apache-2.0
 */

import { Message } from '../components/ChatInput';
import { ApiKeyManager } from './ApiKeyManager';

const MODEL = 'gemini-2.5-flash';
const SYSTEM_INSTRUCTION =
  'You are EchoAI, a helpful AI assistant. Provide clear, concise, and helpful responses.';
const DEFAULT_SERVER_URL = 'https://echoai2.vercel.app/';

/** Human-readable message for a known server/HTTP status, or null if unmapped. */
const serverErrorMessage = (status: number): string | null => {
  switch (status) {
    case 401:
      return 'Server API key is invalid or expired. Please try using your own API key.';
    case 429:
      return 'Server rate limit exceeded. Please try again later or use your own API key.';
    case 500:
      return 'Server is experiencing issues. Please try again later or use your own API key.';
    case 404:
      return 'Server endpoint not found. Please try again later or use your own API key.';
    default:
      return null;
  }
};

export const fetchResponse = async (messages: Message[]) => {
  try {
    const prompt = messages
      .map(message => (message.sender === 'user' ? message.message : ''))
      .join(' \n');

    // Check if user has provided their own API key
    const userApiKey = ApiKeyManager.getApiKey();

    if (userApiKey) {
      // Use the user's Gemini API key directly
      return await fetchWithUserApiKey(prompt, userApiKey);
    } else {
      // Use the server's API key
      return await fetchWithServerApiKey(prompt);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Network connection failed. Please check your internet connection and try again.'
      );
    } else if (error instanceof Error) {
      throw error; // Re-throw our custom errors
    } else {
      throw new Error('An unexpected error occurred. Please try again or use your own API key.');
    }
  }
};

// Fetch response using the user's Gemini API key directly via the GenAI SDK.
// The SDK is imported lazily so its weight stays out of the initial bundle —
// most sessions use the server fallback and never load it.
const fetchWithUserApiKey = async (prompt: string, apiKey: string) => {
  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Invalid response format from Gemini API');
    }
    return { message: text };
  } catch (error) {
    const status = (error as { status?: number })?.status;
    const reason = `${(error as Error)?.message ?? ''}`.toLowerCase();

    if (status === 400 || status === 401 || status === 403 || reason.includes('api key')) {
      throw new Error('Invalid API key. Please check your API key in settings.');
    }
    if (
      status === 429 ||
      reason.includes('quota') ||
      reason.includes('resource_exhausted') ||
      reason.includes('rate limit')
    ) {
      throw new Error('Rate limit or quota exceeded. Please try again later.');
    }
    if (error instanceof Error) throw error;
    throw new Error('Failed to reach Gemini. Please try again or check your API key.');
  }
};

// Fetch response using server API key (fallback)
const fetchWithServerApiKey = async (prompt: string) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL ?? DEFAULT_SERVER_URL;

  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: prompt }),
  });

  if (!response.ok) {
    throw new Error(
      serverErrorMessage(response.status) ??
        `Server error (${response.status}). Please try again or use your own API key.`
    );
  }

  const data = await response.json();
  // The proxy may return a 200 envelope carrying an error status in the body.
  if (data.status && data.status !== 200) {
    throw new Error(
      serverErrorMessage(data.status) ??
        `Server error (${data.status}). Please try again or use your own API key.`
    );
  }
  return data;
};
