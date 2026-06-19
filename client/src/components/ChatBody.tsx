import autoAnimate from '@formkit/auto-animate';
import { FC, ReactNode, useEffect, useRef } from 'react';
import AiChat from './AiChat';
import { Message } from './ChatInput';
import Orb from './Orb';
import TypingIndicator from './TypingIndicator';
import UserChat from './UserChat';

interface ChatBodyProps {
  chats: Message[];
  isDarkMode: boolean;
  isLoading?: boolean;
  onSuggestionClick?: (suggestion: string) => void;
  onRetryMessage?: (errorId: string) => void;
  onUseOwnKey?: () => void;
  isRetrying?: boolean;
}

/** Prompt presets — `key` matches App's promptMap; the rest is presentation. */
const SUGGESTIONS: { key: string; title: string; hint: string; icon: ReactNode }[] = [
  {
    key: 'Explain quantum computing',
    title: 'Explain a concept',
    hint: 'Quantum computing, made simple',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.6}
        d='M12 14a2 2 0 100-4 2 2 0 000 4zM12 12c5-5 8.5-6.8 9.5-5.8s-.8 4.5-5.8 9.5m0-9.4C10.5 6.4 7 8.2 6 7.2s.8-4.5 5.8-9.5'
      />
    ),
  },
  {
    key: 'Write a creative story',
    title: 'Write something',
    hint: 'A short, original story',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.6}
        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
      />
    ),
  },
  {
    key: 'Help with coding',
    title: 'Help me build',
    hint: 'Debug & best practices',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.6}
        d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      />
    ),
  },
  {
    key: 'Plan a vacation',
    title: 'Plan a trip',
    hint: 'A full itinerary, sorted',
    icon: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.6}
        d='M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z'
      />
    ),
  },
];

const ChatBody: FC<ChatBodyProps> = ({
  chats,
  isLoading = false,
  onSuggestionClick,
  onRetryMessage,
  onUseOwnKey,
  isRetrying = false,
}) => {
  const parent = useRef(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, isLoading]);

  const isEmpty = chats.length === 0 && !isLoading;

  return (
    <div className='flex flex-1 flex-col gap-5' ref={parent}>
      {chats.map((chat: Message) => {
        return chat.sender === 'user' ? (
          <UserChat key={chat.id} message={chat.message} />
        ) : (
          <AiChat
            key={chat.id}
            message={chat.message}
            isError={chat.isError}
            onRetry={
              chat.isError && chat.errorId ? () => onRetryMessage?.(chat.errorId!) : undefined
            }
            onUseOwnKey={chat.isError ? onUseOwnKey : undefined}
            isRetrying={chat.isError && isRetrying}
          />
        );
      })}

      {isLoading && <TypingIndicator />}

      {isEmpty && (
        <div className='flex flex-1 flex-col items-center justify-center px-2 text-center'>
          <div className='rise'>
            <Orb variant='hero' />
          </div>

          <h2
            className='font-display mt-9 max-w-xl text-[32px] font-medium leading-[1.12] sm:text-[44px] rise'
            style={{ color: 'var(--text)', animationDelay: '0.1s' }}
          >
            How can I help <span style={{ color: 'var(--accent-ink)' }}>you</span> today?
          </h2>

          <p
            className='mt-4 max-w-md text-[15px] leading-relaxed rise'
            style={{ color: 'var(--text-dim)', animationDelay: '0.18s' }}
          >
            Ask anything, explore an idea, or start with one of these.
          </p>

          <div className='mt-10 grid w-full max-w-2xl grid-cols-1 gap-3.5 sm:grid-cols-2'>
            {SUGGESTIONS.map((s, index) => (
              <button
                key={s.key}
                type='button'
                onClick={() => onSuggestionClick?.(s.key)}
                className='suggest-card rise'
                style={{ animationDelay: `${0.26 + index * 0.08}s` }}
              >
                <div className='flex items-start justify-between gap-3'>
                  <span className='suggest-card__icon'>
                    <svg
                      className='h-[22px] w-[22px]'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      {s.icon}
                    </svg>
                  </span>
                  <svg
                    className='suggest-card__arrow h-[18px] w-[18px]'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 17L17 7M17 7H8M17 7v9'
                    />
                  </svg>
                </div>
                <h3 className='mt-4 text-[15.5px] font-semibold' style={{ color: 'var(--text)' }}>
                  {s.title}
                </h3>
                <p className='mt-1 text-[13.5px]' style={{ color: 'var(--text-dim)' }}>
                  {s.hint}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} className='h-1'></div>
    </div>
  );
};

export default ChatBody;
