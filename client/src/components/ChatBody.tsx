import { FC, useEffect, useRef } from "react";
import { Message } from "./ChatInput";
import UserChat from "./UserChat";
import AiChat from "./AiChat";
import TypingIndicator from "./TypingIndicator";
import autoAnimate from "@formkit/auto-animate";

interface ChatBodyProps {
  chats: Message[];
  isDarkMode: boolean;
  isLoading?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatBody: FC<ChatBodyProps> = ({ chats, isDarkMode, isLoading = false, onSuggestionClick }) => {
  const parent = useRef(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  //for animation
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  // for scrolling
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, isLoading]);

  return (
    <div className="flex flex-col gap-6 h-full" ref={parent}>
      {chats.map((chat: Message, index) => {
        return chat.sender === "user" ? (
          <UserChat key={index} message={chat.message} isDarkMode={isDarkMode} />
        ) : (
          <AiChat key={index} message={chat.message} isDarkMode={isDarkMode} />
        );
      })}
      
      {isLoading && <TypingIndicator isDarkMode={isDarkMode} />}
      
      {chats.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center animate-bounce-slow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <h2 className={`text-3xl font-bold mb-4 gradient-text ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Welcome to EchoAI
          </h2>
          <p className={`text-lg mb-8 max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your intelligent AI assistant is ready to help. Ask me anything!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl w-full">
            {[
              "Explain quantum computing",
              "Write a creative story",
              "Help with coding",
              "Plan a vacation"
            ].map((suggestion, index) => (
              <div
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer hover-lift ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white/50 border-gray-200 hover:bg-white/80'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div ref={bottomRef} className="h-4"></div>
    </div>
  );
};

export default ChatBody;
