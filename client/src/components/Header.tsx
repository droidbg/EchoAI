import { FC } from 'react';
import Orb from './Orb';

export interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  userApiKey: string;
  onOpenSettings: () => void;
  onOpenSidebar: () => void;
}

const Header: FC<HeaderProps> = ({
  isDarkMode,
  toggleDarkMode,
  userApiKey,
  onOpenSettings,
  onOpenSidebar,
}) => {
  return (
    <header
      className='relative z-10 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 fade'
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className='flex items-center gap-2.5'>
        <button onClick={onOpenSidebar} className='icon-btn h-9 w-9 md:hidden' aria-label='Open menu'>
          <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>

        {/* Brand — shown on mobile (sidebar carries it on desktop) */}
        <div className='flex items-center gap-2 md:hidden'>
          <Orb variant='sm' />
          <span className='text-[16px] font-bold tracking-tight' style={{ color: 'var(--text)' }}>
            EchoAI
          </span>
        </div>

        {/* Status — desktop */}
        <div className='hidden items-center gap-2 md:flex' style={{ color: 'var(--text-dim)' }}>
          <span className='chip__dot' style={{ background: '#34d399' }} />
          <span className='text-[13px]'>Online · ready to help</span>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        {userApiKey && (
          <div className='chip' title='Using your own API key'>
            <span className='chip__dot' />
            <span className='hidden sm:inline'>Your key</span>
            <span className='sm:hidden'>Key</span>
          </div>
        )}

        <button
          onClick={onOpenSettings}
          data-testid='settings-button'
          className='icon-btn'
          title='API Settings'
          aria-label='API Settings'
        >
          <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.7}
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        </button>

        <button
          onClick={toggleDarkMode}
          data-testid='dark-mode-toggle'
          className='icon-btn'
          title='Toggle Theme'
          aria-label='Toggle Theme'
        >
          {isDarkMode ? (
            <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          ) : (
            <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
