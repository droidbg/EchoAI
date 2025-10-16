import { FC } from "react";

interface AiChatProps {
  message: string;
  isDarkMode: boolean;
}

const AiChat: FC<AiChatProps> = ({ message, isDarkMode }) => {
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
            ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white' 
            : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
