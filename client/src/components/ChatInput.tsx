import { useState, useRef, useEffect } from "react";

export type Message = {
  sender: string;
  message: string;
};

interface ChatInputProps {
  isLoading: boolean;
  sendMessage: (msg: Message) => void;
  isDarkMode: boolean;
  suggestionPrompt?: string;
  onSuggestionPromptUsed?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, isLoading, isDarkMode, suggestionPrompt, onSuggestionPromptUsed }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim() === "" || isLoading) return;

    sendMessage({ sender: "user", message: value.trim() });
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Handle suggestion prompt
  useEffect(() => {
    if (suggestionPrompt) {
      setValue(suggestionPrompt);
      onSuggestionPromptUsed?.();
      // Focus the textarea
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [suggestionPrompt, onSuggestionPromptUsed]);

  return (
    <div className={`w-full rounded-2xl border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30' 
        : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300'
    } shadow-lg`}>
      <div className="flex items-end p-3 sm:p-4 space-x-2 sm:space-x-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
            className={`w-full resize-none border-0 bg-transparent outline-none text-sm leading-relaxed placeholder-opacity-60 ${
              isDarkMode 
                ? 'text-white placeholder-white/60' 
                : 'text-gray-800 placeholder-gray-500'
            }`}
            style={{ minHeight: '20px', maxHeight: '120px' }}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={value.trim() === ""}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
                value.trim() === ""
                  ? isDarkMode
                    ? 'bg-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Character count and tips */}
      <div className={`px-3 sm:px-4 pb-2 text-xs flex justify-between items-center ${
        isDarkMode ? 'text-white/50' : 'text-gray-500'
      }`}>
        <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
        <span className="sm:hidden">Enter to send</span>
        <span>{value.length}/2000</span>
      </div>
    </div>
  );
};

export default ChatInput;
