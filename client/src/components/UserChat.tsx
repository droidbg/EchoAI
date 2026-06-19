import { FC } from 'react';

interface UserChatProps {
  message: string;
}

const UserChat: FC<UserChatProps> = ({ message }) => {
  return (
    <div className='flex justify-end msg-in'>
      <div className='flex max-w-[86%] items-end gap-2.5 sm:max-w-[78%]'>
        <div className='bubble bubble-user'>{message}</div>
        <div
          className='grid h-8 w-8 flex-shrink-0 place-items-center rounded-full'
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          <svg
            className='h-4 w-4'
            style={{ color: 'var(--text-dim)' }}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.8}
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
