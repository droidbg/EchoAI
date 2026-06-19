import { FC, useState } from 'react';
import { ApiKeyManager } from '../utils/ApiKeyManager';

interface SettingsModalProps {
  onClose: () => void;
  isDarkMode: boolean;
  onApiKeyChange: (apiKey: string) => void;
  currentApiKey: string;
}

const SettingsModal: FC<SettingsModalProps> = ({ onClose, onApiKeyChange, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(() => currentApiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const isPositive =
    validationMessage.includes('success') || validationMessage.includes('cleared');

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setValidationMessage('Please enter an API key');
      return;
    }

    const formatValidation = ApiKeyManager.validateApiKeyFormat(apiKey);
    if (!formatValidation.isValid) {
      setValidationMessage(formatValidation.message);
      return;
    }

    setIsValidating(true);
    setValidationMessage('');

    try {
      const testResult = await ApiKeyManager.testApiKey(apiKey);
      if (testResult.isValid) {
        onApiKeyChange(apiKey);
        setValidationMessage('API key saved successfully!');
        setTimeout(() => onClose(), 1500);
      } else {
        setValidationMessage(testResult.message);
      }
    } catch (error) {
      console.error('API key validation error:', error);
      setValidationMessage('Failed to validate API key. Please check your connection and try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setApiKey('');
    onApiKeyChange('');
    setValidationMessage('API key cleared. Using default server key.');
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 fade'>
      {/* Backdrop */}
      <div
        role='button'
        tabIndex={0}
        aria-label='Close settings'
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
        className='absolute inset-0'
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div data-testid='settings-modal' className='modal-card relative w-full max-w-md rise'>
        {/* Header */}
        <div
          className='flex items-center justify-between p-6'
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <h2 className='font-display text-xl font-semibold' style={{ color: 'var(--text)' }}>
            API Settings
          </h2>
          <button
            onClick={onClose}
            data-testid='settings-close'
            className='icon-btn h-9 w-9'
            aria-label='Close'
          >
            <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.9} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className='space-y-5 p-6'>
          <div className='space-y-2.5'>
            <label
              htmlFor='api-key-input'
              className='block text-sm font-medium'
              style={{ color: 'var(--text)' }}
            >
              OpenAI API Key
            </label>
            <div className='relative'>
              <input
                id='api-key-input'
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder='sk-…'
                className='field'
              />
              <button
                type='button'
                onClick={() => setShowApiKey(!showApiKey)}
                aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                className='absolute right-3 top-1/2 -translate-y-1/2'
                style={{ color: 'var(--text-faint)' }}
              >
                {showApiKey ? (
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.8}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                    />
                  </svg>
                ) : (
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.8}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className='text-[12px]' style={{ color: 'var(--text-faint)' }}>
              Stored only in this browser session — never sent to our servers.
            </p>
          </div>

          {/* Info */}
          <div className='info-panel p-4'>
            <p className='text-sm font-medium' style={{ color: 'var(--text)' }}>
              Why use your own API key?
            </p>
            <ul className='mt-2 space-y-1 text-[12px]' style={{ color: 'var(--text-dim)' }}>
              <li>• Higher rate limits and faster responses</li>
              <li>• Your conversations stay private</li>
              <li>• Backup when our server is down</li>
            </ul>
            <p className='mt-2 text-[12px]' style={{ color: 'var(--text-dim)' }}>
              Get your key from{' '}
              <a
                href='https://platform.openai.com/api-keys'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:no-underline'
                style={{ color: 'var(--accent-ink)' }}
              >
                OpenAI Platform
              </a>
            </p>
          </div>

          {/* Validation Message */}
          {validationMessage && (
            <div
              className='rounded-2xl p-3'
              style={{
                background: isPositive ? 'var(--accent-soft)' : 'var(--danger-soft)',
                border: `1px solid ${isPositive ? 'var(--accent-ring)' : 'var(--danger)'}`,
              }}
            >
              <p
                className='text-sm'
                style={{ color: isPositive ? 'var(--accent-ink)' : 'var(--danger)' }}
              >
                {validationMessage}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className='flex gap-3'>
            <button onClick={handleClear} disabled={isValidating} className='btn-soft flex-1'>
              Clear Key
            </button>
            <button
              onClick={handleSave}
              disabled={isValidating}
              className='btn-accent flex-1'
              style={{ padding: '12px 16px', borderRadius: 'var(--r-md)' }}
            >
              {isValidating ? (
                <span className='flex items-center justify-center gap-2'>
                  <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70' />
                  Validating…
                </span>
              ) : (
                'Save Key'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
