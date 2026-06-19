import { FC, useEffect, useState } from 'react';
import Orb from './Orb';

const MESSAGES = [
  'Reading your message',
  'Processing your request',
  'Thinking it through',
  'Composing a response',
  'Almost ready',
];

const TypingIndicator: FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex justify-start msg-in'>
      <div className='flex max-w-[88%] items-center gap-2.5 sm:max-w-[82%]'>
        <Orb variant='sm' thinking />
        <div className='bubble bubble-ai flex items-center gap-3'>
          <span className='shimmer text-sm'>{MESSAGES[current]}</span>
          <span className='dot-3' aria-hidden='true'>
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
