/**
 * API Key Manager for EchoAI
 *
 * This utility manages the user's Google Gemini API key in the browser's
 * sessionStorage so the key is cleared when the tab/session ends.
 *
 * Features:
 * - Session-scoped storage (not persisted across browser sessions)
 * - API key format validation (Google "AIza…" keys)
 * - Live API key testing against the Gemini API
 *
 * Security Note: The key is base64-ENCODED only to avoid plaintext-at-rest in
 * dev tools — this is NOT encryption and provides no protection against scripts
 * running on the page. Any code on the origin can read the key. For real
 * security, route requests through a server that holds the key (the app's
 * server-fallback path) rather than handing the key to the browser.
 *
 * @author EchoAI Contributors
 * @license Apache-2.0
 */

const API_KEY_STORAGE_KEY = 'echoai_user_api_key';
const MODELS_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

// base64 transform used only to avoid storing the raw key string verbatim.
// NOT a security control — trivially reversible by anyone with page access.
const encodeKey = (apiKey: string): string => btoa(apiKey + '_echoai');
const decodeKey = (encoded: string): string => atob(encoded).replace('_echoai', '');

export class ApiKeyManager {
  /**
   * Store API key in sessionStorage (cleared when the tab/session ends).
   * Also removes any key left in localStorage by older versions.
   */
  static setApiKey(apiKey: string): void {
    try {
      sessionStorage.setItem(API_KEY_STORAGE_KEY, encodeKey(apiKey));
      // Remove legacy persistent copy from older builds that used localStorage.
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to store API key:', error);
      throw new Error('Failed to store API key. Please check your browser settings.');
    }
  }

  /**
   * Retrieve API key from sessionStorage. Falls back to (and migrates) a key
   * left in localStorage by older versions, then clears the persistent copy.
   */
  static getApiKey(): string | null {
    try {
      let encoded = sessionStorage.getItem(API_KEY_STORAGE_KEY);

      if (!encoded) {
        // Migrate a key persisted by an older localStorage-based build.
        const legacy = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (!legacy) return null;
        sessionStorage.setItem(API_KEY_STORAGE_KEY, legacy);
        localStorage.removeItem(API_KEY_STORAGE_KEY);
        encoded = legacy;
      }

      return decodeKey(encoded);
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;
    }
  }

  /**
   * Remove API key from both sessionStorage and any legacy localStorage copy.
   */
  static clearApiKey(): void {
    try {
      sessionStorage.removeItem(API_KEY_STORAGE_KEY);
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear API key:', error);
    }
  }

  /**
   * Check if user has a stored API key
   */
  static hasApiKey(): boolean {
    return this.getApiKey() !== null;
  }

  /**
   * Validate API key format (Google Gemini "AIza…" keys)
   */
  static validateApiKeyFormat(apiKey: string): {
    isValid: boolean;
    message: string;
  } {
    const key = (apiKey || '').trim();

    if (!key) {
      return { isValid: false, message: 'API key cannot be empty' };
    }

    if (!key.startsWith('AIza')) {
      return {
        isValid: false,
        message: 'Gemini API keys should start with "AIza"',
      };
    }

    if (key.length < 30) {
      return { isValid: false, message: 'API key appears to be too short' };
    }

    if (key.length > 100) {
      return { isValid: false, message: 'API key appears to be too long' };
    }

    // Google API keys are "AIza" followed by URL-safe base64 characters.
    const keyPattern = /^AIza[0-9A-Za-z_-]+$/;
    if (!keyPattern.test(key)) {
      return { isValid: false, message: 'API key format appears invalid' };
    }

    return { isValid: true, message: 'API key format is valid' };
  }

  /**
   * Test the API key by listing models on the Gemini API.
   */
  static async testApiKey(apiKey: string): Promise<{ isValid: boolean; message: string }> {
    try {
      const response = await fetch(`${MODELS_ENDPOINT}?key=${encodeURIComponent(apiKey)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        return { isValid: true, message: 'API key is valid and working' };
      } else if (response.status === 400 || response.status === 403) {
        return {
          isValid: false,
          message: 'Invalid API key. Please check your key and try again.',
        };
      } else if (response.status === 429) {
        return {
          isValid: false,
          message: 'API key rate limit exceeded. Please try again later.',
        };
      } else {
        return {
          isValid: false,
          message: `API request failed with status ${response.status}`,
        };
      }
    } catch (error) {
      console.error('API key test failed:', error);
      return {
        isValid: false,
        message: 'Failed to test API key. Please check your connection.',
      };
    }
  }

  /**
   * Get masked API key for display purposes
   */
  static getMaskedApiKey(): string {
    const apiKey = this.getApiKey();
    if (!apiKey) return '';

    if (apiKey.length <= 8) return '••••';

    const start = apiKey.substring(0, 6);
    const end = apiKey.substring(apiKey.length - 4);
    const middle = '*'.repeat(Math.min(apiKey.length - 10, 8));

    return `${start}${middle}${end}`;
  }
}

// Security warnings and best practices
export const API_KEY_SECURITY_NOTES = {
  WARNING:
    'Your API key is kept only for the current browser session and is cleared when you close the tab. Never share your API key with others.',
  BEST_PRACTICES: [
    'Keep your API key private and never share it',
    'Monitor your Google AI Studio usage regularly',
    'Set usage limits in your Google Cloud / AI Studio account',
    'Use environment variables in production applications',
    'Consider using API key rotation for enhanced security',
  ],
  STORAGE_LIMITATION:
    'The key lives in client-side sessionStorage and is readable by any script on this origin. For multi-user or production use, hold the key server-side instead.',
};
