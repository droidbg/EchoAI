import React, { useEffect, useRef, useState } from 'react';

export type Message = {
  id: string; // Added stable unique id
  sender: string;
  message: string;
  isError?: boolean;
  errorId?: string; // Unique identifier for error messages to handle retries
};

export interface ChatInputRef {
  setSuggestion: (text: string) => void;
}

interface ChatInputProps {
  isLoading: boolean;
  sendMessage: (msg: Message) => void;
  isDarkMode: boolean;
}

const MAX = 2000;

const ChatInput = React.forwardRef<ChatInputRef, ChatInputProps>(
  ({ sendMessage, isLoading }, ref) => {
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => ({
      setSuggestion: (text: string) => {
        setValue(text);
        textareaRef.current?.focus();
      },
    }));

    const handleSubmit = () => {
      if (value.trim() === '' || isLoading) return;
      sendMessage({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        sender: 'user',
        message: value.trim(),
      });
      setValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    // Auto-resize textarea
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [value]);

    const canSend = value.trim() !== '' && !isLoading;

    return (
      <div className='composer'>
        <div className='flex items-end gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3'>
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={e => setValue(e.target.value.slice(0, MAX))}
            onKeyDown={handleKeyDown}
            placeholder='Message EchoAI…'
            data-testid='chat-input'
            disabled={isLoading}
            className='flex-1 py-1.5'
            style={{ minHeight: '24px', maxHeight: '160px' }}
          />

          {isLoading ? (
            <div className='btn-accent btn-round h-10 w-10' aria-label='Generating'>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70' />
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canSend}
              className='btn-accent btn-round h-10 w-10'
              aria-label='Send message'
            >
              <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 12h14M13 6l6 6-6 6'
                />
              </svg>
            </button>
          )}
        </div>

        <div
          className='flex items-center justify-between px-4 pb-2 text-[11px]'
          style={{ color: 'var(--text-faint)' }}
        >
          <span className='hidden sm:inline'>Enter to send · Shift + Enter for a new line</span>
          <span className='sm:hidden'>Enter to send</span>
          <span>
            {value.length}/{MAX}
          </span>
        </div>
      </div>
    );
  }
);

export default ChatInput;
