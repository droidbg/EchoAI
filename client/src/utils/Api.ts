/**
 * API Utility for EchoAI
 *
 * This module handles all API communications for the EchoAI application,
 * including both server-side and direct OpenAI API calls.
 *
 * Features:
 * - Automatic fallback between user API key and server API key
 * - Comprehensive error handling with user-friendly messages
 * - Support for both server and direct OpenAI API calls
 * - Request/response logging and debugging
 *
 * @author EchoAI Contributors
 * @license Apache-2.0
 */

import { Message } from '../components/ChatInput';
import { ApiKeyManager } from './ApiKeyManager';

export const fetchResponse = async (chats: Message[]) => {
  try {
    const message = chats.map(chat => (chat.sender === 'user' ? chat.message : '')).join(' \n');

    console.log('message: ', message);

    // Check if user has provided their own API key
    const userApiKey = ApiKeyManager.getApiKey();

    if (userApiKey) {
      // Use user's API key directly with OpenAI
      return await fetchWithUserApiKey(message, userApiKey);
    } else {
      // Use server API key
      return await fetchWithServerApi(message);
    }
  } catch (error) {
    console.log(error);
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

// Fetch response using user's API key directly with OpenAI
const fetchWithUserApiKey = async (message: string, apiKey: string) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful AI assistant. Provide clear, concise, and helpful responses.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key in settings.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status === 402) {
        throw new Error('Insufficient credits. Please add credits to your OpenAI account.');
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return {
        message: data.choices[0].message.content,
        usage: data.usage, // Include usage info for transparency
      };
    } else {
      throw new Error('Invalid response format from OpenAI API');
    }
  } catch (error) {
    console.error('User API key request failed:', error);
    throw error;
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
  console.log(data);
  return data;
};
