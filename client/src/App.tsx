/**
 * EchoAI Main Application Component
 *
 * This is the main React component that orchestrates the entire EchoAI application.
 * It manages chat state, API key management, theme switching, and error handling.
 *
 * Features:
 * - Chat message management and display
 * - Dark/light mode theme switching
 * - API key management and validation
 * - Error handling with retry mechanisms
 * - Suggestion prompts for common use cases
 * - Responsive design for all devices
 *
 * @author EchoAI Contributors
 * @license Apache-2.0
 */

import { Analytics } from '@vercel/analytics/react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import ChatBody from './components/ChatBody';
import ChatInput, { ChatInputRef, Message } from './components/ChatInput';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import { fetchResponse } from './utils/Api';
import { ApiKeyManager } from './utils/ApiKeyManager';

type AppState = {
  chats: Message[];
  isLoading: boolean;
  isRetrying: boolean;
};

type AppAction =
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'REMOVE_ERROR_MESSAGE'; errorId: string }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_RETRYING'; isRetrying: boolean }
  | { type: 'SET_CHATS'; chats: Message[] };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, chats: [...state.chats, action.message] };
    case 'REMOVE_ERROR_MESSAGE':
      return { ...state, chats: state.chats.filter(c => c.errorId !== action.errorId) };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_RETRYING':
      return { ...state, isRetrying: action.isRetrying };
    case 'SET_CHATS':
      return { ...state, chats: action.chats };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    chats: [],
    isLoading: false,
    isRetrying: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userApiKey, setUserApiKey] = useState<string>('');

  const chatInputRef = useRef<ChatInputRef>(null);

  const { chats, isLoading, isRetrying } = state;

  // Load user API key on component mount
  useEffect(() => {
    const storedApiKey = ApiKeyManager.getApiKey();
    setUserApiKey(storedApiKey || '');
  }, []);

  const handleApiKeyChange = (newApiKey: string) => {
    if (newApiKey) {
      ApiKeyManager.setApiKey(newApiKey);
    } else {
      ApiKeyManager.clearApiKey();
    }
    setUserApiKey(newApiKey);
  };

  const handleRetryMessage = async (errorId: string) => {
    // Find the user message that corresponds to this error
    const errorIndex = chats.findIndex(chat => chat.errorId === errorId);
    if (errorIndex === -1) return;

    // Find the user message before this error
    let userMessageIndex = -1;
    for (let i = errorIndex - 1; i >= 0; i--) {
      if (chats[i].sender === 'user') {
        userMessageIndex = i;
        break;
      }
    }

    if (userMessageIndex === -1) return;

    const userMessage = chats[userMessageIndex];

    // Remove the error message
    dispatch({ type: 'REMOVE_ERROR_MESSAGE', errorId });

    dispatch({ type: 'SET_RETRYING', isRetrying: true });
    dispatch({ type: 'SET_LOADING', isLoading: true });

    try {
      mutation.mutate([userMessage]);
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      dispatch({ type: 'SET_RETRYING', isRetrying: false });
    }
  };

  const handleUseOwnKey = () => {
    setIsSettingsOpen(true);
  };

  const mutation = useMutation({
    mutationFn: (messages: Message[]) => {
      return fetchResponse(messages);
    },
    onSuccess: (data: { message: string }) => {
      dispatch({
        type: 'ADD_MESSAGE',
        message: {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          sender: 'ai',
          message: data.message.replace(/^\n\n/, ''),
        },
      });
      dispatch({ type: 'SET_LOADING', isLoading: false });
    },
    onError: (error: unknown) => {
      console.error('Error fetching response:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      dispatch({
        type: 'ADD_MESSAGE',
        message: {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          sender: 'ai',
          message: errorMessage,
          isError: true,
          errorId: errorId,
        },
      });
      dispatch({ type: 'SET_LOADING', isLoading: false });
    },
    onSettled: () => {
      // This runs after both success and error
      dispatch({ type: 'SET_LOADING', isLoading: false });
    },
  });

  const sendMessage = async (message: Message) => {
    dispatch({ type: 'ADD_MESSAGE', message });
    dispatch({ type: 'SET_LOADING', isLoading: true });
    mutation.mutate([message]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Map suggestions to better AI prompts
    const promptMap: { [key: string]: string } = {
      'Explain quantum computing':
        'Please explain quantum computing in simple terms, covering the basic concepts like qubits, superposition, and entanglement, and how it differs from classical computing.',
      'Write a creative story':
        'Help me write a creative short story. Please provide an engaging plot with interesting characters and a compelling narrative structure.',
      'Help with coding':
        'I need help with coding. Please assist me with best practices, debugging techniques, and provide clear explanations with examples.',
      'Plan a vacation':
        'Help me create a comprehensive vacation plan including popular destinations, must-visit attractions, recommended hotels, local cuisine, and travel tips.',
    };

    const prompt = promptMap[suggestion] || suggestion;
    chatInputRef.current?.setSuggestion(prompt);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`${
        isDarkMode ? 'bg-slate-900' : 'bg-blue-50'
      } min-h-screen transition-all duration-500`}
      style={{ minHeight: '100vh' }}
    >
      {/* Background Gradient Overlay */}
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}
      ></div>

      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className='relative z-10 flex flex-col min-h-screen' style={{ minHeight: '100vh' }}>
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          userApiKey={userApiKey}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Main Chat Area */}
        <main className='flex-1 flex flex-col max-w-4xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6'>
          <div className='flex-1 overflow-hidden rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl'>
            <div className='h-full overflow-auto p-3 sm:p-6'>
              <ChatBody
                chats={chats}
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                onSuggestionClick={handleSuggestionClick}
                onRetryMessage={handleRetryMessage}
                onUseOwnKey={handleUseOwnKey}
                isRetrying={isRetrying}
              />
            </div>
          </div>

          {/* Chat Input */}
          <div className='mt-4 sm:mt-6'>
            <ChatInput
              ref={chatInputRef}
              sendMessage={sendMessage}
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          isDarkMode={isDarkMode}
          onApiKeyChange={handleApiKeyChange}
          currentApiKey={userApiKey}
        />
      )}

      <Analytics />
    </div>
  );
}

export default App;
