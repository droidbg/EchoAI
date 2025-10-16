import { FC, useState, useEffect } from "react";
import { ApiKeyManager } from "../utils/ApiKeyManager";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onApiKeyChange: (apiKey: string) => void;
  currentApiKey: string;
}

const SettingsModal: FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  onApiKeyChange, 
  currentApiKey 
}) => {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setApiKey(currentApiKey);
      setValidationMessage("");
    }
  }, [isOpen, currentApiKey]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setValidationMessage("Please enter an API key");
      return;
    }

    // Validate API key format
    const formatValidation = ApiKeyManager.validateApiKeyFormat(apiKey);
    if (!formatValidation.isValid) {
      setValidationMessage(formatValidation.message);
      return;
    }

    setIsValidating(true);
    setValidationMessage("");

    try {
      // Test the API key
      const testResult = await ApiKeyManager.testApiKey(apiKey);
      
      if (testResult.isValid) {
        onApiKeyChange(apiKey);
        setValidationMessage("API key saved successfully!");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setValidationMessage(testResult.message);
      }
    } catch (error) {
      console.error('API key validation error:', error);
      setValidationMessage("Failed to validate API key. Please check your connection and try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setApiKey("");
    onApiKeyChange("");
    setValidationMessage("API key cleared. Using default server key.");
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl ${
        isDarkMode 
          ? 'bg-slate-800 border border-white/20' 
          : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            API Settings
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-white/10 text-white' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* API Key Input */}
          <div className="space-y-3">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className={`w-full px-4 py-3 pr-12 rounded-xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 border-white/20 text-white placeholder-white/50 focus:border-purple-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-purple-400'
                } focus:outline-none focus:ring-2 focus:ring-purple-400/20`}
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${
                  isDarkMode ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showApiKey ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Info Text */}
          <div className={`p-4 rounded-xl ${
            isDarkMode ? 'bg-blue-900/20 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-start space-x-3">
              <svg className={`w-5 h-5 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="space-y-2">
                <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  <strong>Why use your own API key?</strong>
                </p>
                <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                  <li>• Higher rate limits and faster responses</li>
                  <li>• Your conversations stay private</li>
                  <li>• Backup when our server is down</li>
                  <li>• No usage restrictions</li>
                </ul>
                <p className={`text-xs ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                  Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">OpenAI Platform</a>
                </p>
              </div>
            </div>
          </div>

          {/* Validation Message */}
          {validationMessage && (
            <div className={`p-3 rounded-xl ${
              validationMessage.includes("success") || validationMessage.includes("cleared")
                ? isDarkMode ? 'bg-green-900/20 border border-green-500/20' : 'bg-green-50 border border-green-200'
                : isDarkMode ? 'bg-red-900/20 border border-red-500/20' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${
                validationMessage.includes("success") || validationMessage.includes("cleared")
                  ? isDarkMode ? 'text-green-300' : 'text-green-700'
                  : isDarkMode ? 'text-red-300' : 'text-red-700'
              }`}>
                {validationMessage}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={handleClear}
              disabled={isValidating}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20 disabled:opacity-50' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'
              }`}
            >
              Clear Key
            </button>
            <button
              onClick={handleSave}
              disabled={isValidating}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                isValidating
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
              }`}
            >
              {isValidating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Validating...</span>
                </div>
              ) : (
                'Save Key'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
