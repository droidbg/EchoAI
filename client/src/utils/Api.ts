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

import { GoogleGenAI } from '@google/genai';
import { Message } from '../components/ChatInput';
import { ApiKeyManager } from './ApiKeyManager';

const MODEL = 'gemini-2.5-flash';
const SYSTEM_INSTRUCTION =
  'You are EchoAI, a helpful AI assistant. Provide clear, concise, and helpful responses.';

export const fetchResponse = async (chats: Message[]) => {
  try {
    const message = chats.map(chat => (chat.sender === 'user' ? chat.message : '')).join(' \n');

    // Check if user has provided their own API key
    const userApiKey = ApiKeyManager.getApiKey();

    if (userApiKey) {
      // Use the user's Gemini API key directly
      return await fetchWithUserApiKey(message, userApiKey);
    } else {
      // Use the server's API key
      return await fetchWithServerApi(message);
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

// Fetch response using the user's Gemini API key directly via the GenAI SDK
const fetchWithUserApiKey = async (message: string, apiKey: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: message,
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
const fetchWithServerApi = async (message: string) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const response = await fetch(serverUrl ?? 'https://echoai2.vercel.app/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Server API key is invalid or expired. Please try using your own API key.');
    } else if (response.status === 429) {
      throw new Error(
        'Server rate limit exceeded. Please try again later or use your own API key.'
      );
    } else if (response.status === 500) {
      throw new Error(
        'Server is experiencing issues. Please try again later or use your own API key.'
      );
    } else if (response.status === 404) {
      throw new Error('Server endpoint not found. Please try again later or use your own API key.');
    } else {
      throw new Error(
        `Server error (${response.status}). Please try again or use your own API key.`
      );
    }
  }

  const data = await response.json();
  if (data.status == 401) {
    throw new Error('Server API key is invalid or expired. Please try using your own API key.');
  } else if (data.status == 429) {
    throw new Error('Server rate limit exceeded. Please try again later or use your own API key.');
  } else if (data.status == 500) {
    throw new Error(
      'Server is experiencing issues. Please try again later or use your own API key.'
    );
  } else if (data.status && data.status !== 200) {
    throw new Error(`Server error (${data.status}). Please try again or use your own API key.`);
  }
  return data;
};
