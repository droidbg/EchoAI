// API Key Management Utility
// Following industry best practices for client-side API key storage

const API_KEY_STORAGE_KEY = "echoai_user_api_key";

export class ApiKeyManager {
  /**
   * Store API key in localStorage with basic obfuscation
   * Note: This is not encryption, just basic obfuscation for casual inspection
   */
  static setApiKey(apiKey: string): void {
    try {
      // Basic obfuscation - not secure against determined attackers
      // but prevents casual inspection in dev tools
      const obfuscated = btoa(apiKey + "_echoai");
      localStorage.setItem(API_KEY_STORAGE_KEY, obfuscated);
    } catch (error) {
      console.error("Failed to store API key:", error);
      throw new Error(
        "Failed to store API key. Please check your browser settings."
      );
    }
  }

  /**
   * Retrieve API key from localStorage
   */
  static getApiKey(): string | null {
    try {
      const obfuscated = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (!obfuscated) return null;

      // Deobfuscate
      const deobfuscated = atob(obfuscated);
      return deobfuscated.replace("_echoai", "");
    } catch (error) {
      console.error("Failed to retrieve API key:", error);
      return null;
    }
  }

  /**
   * Remove API key from localStorage
   */
  static clearApiKey(): void {
    try {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear API key:", error);
    }
  }

  /**
   * Check if user has a stored API key
   */
  static hasApiKey(): boolean {
    return this.getApiKey() !== null;
  }

  /**
   * Validate API key format
   */
  static validateApiKeyFormat(apiKey: string): {
    isValid: boolean;
    message: string;
  } {
    if (!apiKey || !apiKey.trim()) {
      return { isValid: false, message: "API key cannot be empty" };
    }

    if (!apiKey.startsWith("sk-")) {
      return {
        isValid: false,
        message: 'OpenAI API keys should start with "sk-"',
      };
    }

    if (apiKey.length < 10) {
      return { isValid: false, message: "API key appears to be too short" };
    }

    if (apiKey.length > 500) {
      return { isValid: false, message: "API key appears to be too long" };
    }

    // Basic format validation for OpenAI keys
    // OpenAI API keys can vary significantly in length and format
    // Supports both sk- and sk-proj- formats
    const keyPattern = /^sk(-proj)?-[a-zA-Z0-9_-]+$/;
    if (!keyPattern.test(apiKey)) {
      return { isValid: false, message: "API key format appears invalid" };
    }

    return { isValid: true, message: "API key format is valid" };
  }

  /**
   * Test API key by making a simple request to OpenAI
   */
  static async testApiKey(
    apiKey: string
  ): Promise<{ isValid: boolean; message: string }> {
    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return { isValid: true, message: "API key is valid and working" };
      } else if (response.status === 401) {
        return {
          isValid: false,
          message: "Invalid API key. Please check your key and try again.",
        };
      } else if (response.status === 429) {
        return {
          isValid: false,
          message: "API key rate limit exceeded. Please try again later.",
        };
      } else {
        return {
          isValid: false,
          message: `API request failed with status ${response.status}`,
        };
      }
    } catch (error) {
      console.error("API key test failed:", error);
      return {
        isValid: false,
        message: "Failed to test API key. Please check your connection.",
      };
    }
  }

  /**
   * Get masked API key for display purposes
   */
  static getMaskedApiKey(): string {
    const apiKey = this.getApiKey();
    if (!apiKey) return "";

    if (apiKey.length <= 8) return "sk-****";

    const start = apiKey.substring(0, 6);
    const end = apiKey.substring(apiKey.length - 4);
    const middle = "*".repeat(Math.min(apiKey.length - 10, 8));

    return `${start}${middle}${end}`;
  }
}

// Security warnings and best practices
export const API_KEY_SECURITY_NOTES = {
  WARNING:
    "API keys are stored locally in your browser. Never share your API key with others.",
  BEST_PRACTICES: [
    "Keep your API key private and never share it",
    "Monitor your OpenAI usage regularly",
    "Set usage limits in your OpenAI account",
    "Use environment variables in production applications",
    "Consider using API key rotation for enhanced security",
  ],
  STORAGE_LIMITATION:
    "This is client-side storage and not suitable for production applications with multiple users.",
};
