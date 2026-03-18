import { FC } from 'react';

export interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userApiKey: string;
  onOpenSettings: () => void;
}

const Header: FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, userApiKey, onOpenSettings }) => {
  return (
    <header className='flex items-center justify-between p-4 sm:p-6 border-b border-white/10 backdrop-blur-sm'>
      <div className='flex items-center space-x-3 sm:space-x-4'>
        <div className='relative'>
          <img
            src='/logo.webp'
            className='h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg'
            alt='EchoAI Logo'
          />
          <div className='absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-pulse'></div>
        </div>
        <div>
          <h1
            className={`text-xl sm:text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            EchoAI
          </h1>
          <p
            className={`text-xs sm:text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } hidden sm:block`}
          >
            Your intelligent AI assistant
          </p>
        </div>
      </div>

      <div className='flex items-center space-x-2 sm:space-x-4'>
        {/* API Key Status Indicator */}
        {userApiKey && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode
                ? 'bg-green-900/20 text-green-300 border border-green-500/20'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            <div className='flex items-center space-x-1'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span>Your Key</span>
            </div>
          </div>
        )}

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          data-testid='settings-button'
          className={`p-2 rounded-full transition-all duration-300 ${
            isDarkMode
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          title='API Settings'
        >
          <svg
            className='w-4 h-4 sm:w-5 sm:h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          data-testid='dark-mode-toggle'
          className={`p-2 rounded-full transition-all duration-300 ${
            isDarkMode
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          title='Toggle Theme'
        >
          {isDarkMode ? (
            <svg
              className='w-4 h-4 sm:w-5 sm:h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
              />
            </svg>
          ) : (
            <svg
              className='w-4 h-4 sm:w-5 sm:h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
