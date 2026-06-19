import { FC } from 'react';

interface InlineErrorOptionsProps {
  onRetry: () => void;
  onUseOwnKey: () => void;
  isRetrying?: boolean;
}

const InlineErrorOptions: FC<InlineErrorOptionsProps> = ({
  onRetry,
  onUseOwnKey,
  isRetrying = false,
}) => {
  return (
    <div className='mt-4 space-y-3'>
      <p className='text-[13px]' style={{ color: 'var(--text-dim)' }}>
        What would you like to do?
      </p>

      <div className='flex flex-col gap-2.5 sm:flex-row'>
        <button onClick={onRetry} disabled={isRetrying} className='btn-soft flex-1'>
          <span className='flex items-center justify-center gap-2'>
            {isRetrying ? (
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
            ) : (
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.9}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            )}
            {isRetrying ? 'Retrying…' : 'Try again'}
          </span>
        </button>

        <button
          onClick={onUseOwnKey}
          className='flex-1 btn-accent'
          style={{ padding: '12px 16px', borderRadius: 'var(--r-md)' }}
        >
          <span className='flex items-center justify-center gap-2 font-medium'>
            <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.9}
                d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
              />
            </svg>
            Use your API key
          </span>
        </button>
      </div>

      <div className='info-panel p-3'>
        <p className='text-[12px] font-medium' style={{ color: 'var(--text)' }}>
          Your own key unlocks:
        </p>
        <ul className='mt-1 space-y-0.5 text-[12px]' style={{ color: 'var(--text-dim)' }}>
          <li>• Higher rate limits & faster responses</li>
          <li>• Complete privacy for your conversations</li>
          <li>• No dependency on server availability</li>
        </ul>
      </div>
    </div>
  );
};

export default InlineErrorOptions;
