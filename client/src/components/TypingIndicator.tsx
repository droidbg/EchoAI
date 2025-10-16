import { FC, useState, useEffect } from "react";

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

const TypingIndicator: FC<TypingIndicatorProps> = ({ isDarkMode }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Reading your message...",
    "Processing your request...",
    "Thinking through the best response...",
    "Generating a thoughtful answer...",
    "Almost ready with my response..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%]">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className={`rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg ${
          isDarkMode 
            ? 'bg-white/10 backdrop-blur-sm border border-white/20' 
            : 'bg-white/80 backdrop-blur-sm border border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-600'}`}>
              {messages[currentMessage]}
            </p>
            <div className="flex space-x-1">
              <div className={`w-1.5 h-1.5 rounded-full ${
                isDarkMode ? 'bg-white/60' : 'bg-gray-400'
              } animate-bounce`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${
                isDarkMode ? 'bg-white/60' : 'bg-gray-400'
              } animate-bounce`} style={{ animationDelay: '150ms' }}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${
                isDarkMode ? 'bg-white/60' : 'bg-gray-400'
              } animate-bounce`} style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;