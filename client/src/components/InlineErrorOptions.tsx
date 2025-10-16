import { FC } from "react";

interface InlineErrorOptionsProps {
  onRetry: () => void;
  onUseOwnKey: () => void;
  isDarkMode: boolean;
  isRetrying?: boolean;
}

const InlineErrorOptions: FC<InlineErrorOptionsProps> = ({ 
  onRetry, 
  onUseOwnKey, 
  isDarkMode, 
  isRetrying = false 
}) => {
  return (
    <div className="mt-4 space-y-3">
      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        What would you like to do?
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Retry Button */}
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
            isRetrying
              ? isDarkMode
                ? 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
              : isDarkMode
                ? 'bg-blue-900/20 border-blue-500/20 hover:bg-blue-900/30 text-blue-300 hover:border-blue-400/30'
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {isRetrying ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span className="font-medium">
              {isRetrying ? 'Retrying...' : 'Try Again'}
            </span>
          </div>
        </button>

        {/* Use Own API Key Button */}
        <button
          onClick={onUseOwnKey}
          className={`flex-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
            isDarkMode
              ? 'bg-purple-900/20 border-purple-500/20 hover:bg-purple-900/30 text-purple-300 hover:border-purple-400/30'
              : 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className="font-medium">Use Your API Key</span>
          </div>
        </button>
      </div>

      {/* Info */}
      <div className={`p-3 rounded-xl ${
        isDarkMode ? 'bg-blue-900/10 border border-blue-500/10' : 'bg-blue-50 border border-blue-200'
      }`}>
        <div className="flex items-start space-x-2">
          <svg className={`w-4 h-4 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              Using your own API key provides:
            </p>
            <ul className={`text-xs mt-1 space-y-0.5 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
              <li>• Higher rate limits and faster responses</li>
              <li>• Complete privacy for your conversations</li>
              <li>• No dependency on server availability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlineErrorOptions;
