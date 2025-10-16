import { FC } from "react";

interface UserChatProps {
  message: string;
  isDarkMode: boolean;
}

const UserChat: FC<UserChatProps> = ({ message, isDarkMode }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-end space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[80%]">
        <div className={`rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
