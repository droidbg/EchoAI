import { FC } from 'react';
import InlineErrorOptions from './InlineErrorOptions';
import Orb from './Orb';

interface AiChatProps {
  message: string;
  isError?: boolean;
  onRetry?: () => void;
  onUseOwnKey?: () => void;
  isRetrying?: boolean;
}

const AiChat: FC<AiChatProps> = ({
  message,
  isError = false,
  onRetry,
  onUseOwnKey,
  isRetrying = false,
}) => {
  return (
    <div className='flex justify-start msg-in'>
      <div className='flex max-w-[88%] items-start gap-2.5 sm:max-w-[82%]'>
        {isError ? (
          <div
            className='mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full'
            style={{
              background: 'var(--danger-soft)',
              border: '1px solid var(--danger)',
            }}
          >
            <svg
              className='h-4 w-4'
              style={{ color: 'var(--danger)' }}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.9}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
        ) : (
          <Orb variant='sm' className='mt-0.5' />
        )}

        <div className={`bubble ${isError ? 'bubble-error' : 'bubble-ai'}`}>
          {message}
          {isError && onRetry && onUseOwnKey && (
            <InlineErrorOptions onRetry={onRetry} onUseOwnKey={onUseOwnKey} isRetrying={isRetrying} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChat;
