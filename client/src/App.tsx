/**
 * EchoAI Main Application Component
 *
 * Orchestrates the workspace: a conversation sidebar, the chat workspace, API
 * key management, theme switching and error handling. Conversations persist
 * client-side via the useConversations store.
 *
 * @author EchoAI Contributors
 * @license Apache-2.0
 */

import { Analytics } from '@vercel/analytics/react';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import ChatBody from './components/ChatBody';
import ChatInput, { ChatInputRef, Message } from './components/ChatInput';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import Sidebar from './components/Sidebar';
import { fetchResponse } from './utils/api';
import { ApiKeyManager } from './utils/ApiKeyManager';
import { newId } from './utils/id';
import { useConversations } from './utils/useConversations';

const NAME_KEY = 'echoai_display_name';
const THEME_KEY = 'echoai_theme';

function App() {
  const {
    conversations,
    activeId,
    activeMessages,
    selectConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    addMessage,
    removeErrorMessage,
  } = useConversations();

  const [isLoading, setIsLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  // Dark-first by default; an explicit toggle is remembered across visits.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) !== 'light';
    } catch {
      return true;
    }
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('You');

  const chatInputRef = useRef<ChatInputRef>(null);
  // The conversation a pending request belongs to (so a reply lands in the
  // right chat even if the user switches conversations mid-request).
  const pendingConversationId = useRef<string>('');

  useEffect(() => {
    setUserApiKey(ApiKeyManager.getApiKey() || '');
    try {
      const stored = localStorage.getItem(NAME_KEY);
      if (stored) setDisplayName(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }, [isDarkMode]);

  const handleApiKeyChange = (newApiKey: string) => {
    if (newApiKey) {
      ApiKeyManager.setApiKey(newApiKey);
    } else {
      ApiKeyManager.clearApiKey();
    }
    setUserApiKey(newApiKey);
  };

  const handleDisplayNameChange = (name: string) => {
    const clean = name.trim() || 'You';
    setDisplayName(clean);
    try {
      localStorage.setItem(NAME_KEY, clean);
    } catch {
      /* ignore */
    }
  };

  const mutation = useMutation({
    mutationFn: (messages: Message[]) => fetchResponse(messages),
    onSuccess: (data: { message: string }) => {
      addMessage(pendingConversationId.current || activeId, {
        id: newId(),
        sender: 'ai',
        message: data.message.replace(/^\n\n/, ''),
      });
    },
    onError: (error: unknown) => {
      console.error('Error fetching response:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      addMessage(pendingConversationId.current || activeId, {
        id: newId(),
        sender: 'ai',
        message: errorMessage,
        isError: true,
        errorId: `error_${newId()}`,
      });
    },
    onSettled: () => {
      setIsLoading(false);
      setIsRetrying(false);
    },
  });

  const sendMessage = (message: Message) => {
    pendingConversationId.current = activeId;
    addMessage(activeId, message);
    setIsLoading(true);
    mutation.mutate([message]);
  };

  const handleRetryMessage = (errorId: string) => {
    const errorIndex = activeMessages.findIndex(message => message.errorId === errorId);
    if (errorIndex === -1) return;

    let userMessageIndex = -1;
    for (let i = errorIndex - 1; i >= 0; i--) {
      if (activeMessages[i].sender === 'user') {
        userMessageIndex = i;
        break;
      }
    }
    if (userMessageIndex === -1) return;

    const userMessage = activeMessages[userMessageIndex];
    pendingConversationId.current = activeId;
    removeErrorMessage(activeId, errorId);
    setIsRetrying(true);
    setIsLoading(true);
    mutation.mutate([userMessage]);
  };

  const handleSuggestionClick = (prompt: string) => {
    chatInputRef.current?.setSuggestion(prompt);
  };

  const handleNewChat = () => {
    createConversation();
    setIsSidebarOpen(false);
  };

  const handleSelectConversation = (id: string) => {
    selectConversation(id);
    setIsSidebarOpen(false);
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <div className={`relative h-dvh overflow-hidden ${isDarkMode ? '' : 'theme-light'}`}>
      <div className='aura' />

      <div className='relative z-10 flex h-full'>
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
          onNewChat={handleNewChat}
          onDelete={deleteConversation}
          onRename={renameConversation}
          displayName={displayName}
          onDisplayNameChange={handleDisplayNameChange}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className='flex h-full min-w-0 flex-1 flex-col'>
          <Header
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            userApiKey={userApiKey}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />

          <main className='min-h-0 flex-1 overflow-y-auto'>
            <div className='mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 py-6 sm:px-6'>
              <ChatBody
                messages={activeMessages}
                isDarkMode={isDarkMode}
                isLoading={isLoading}
                onSuggestionClick={handleSuggestionClick}
                onRetryMessage={handleRetryMessage}
                onUseOwnKey={() => setIsSettingsOpen(true)}
                isRetrying={isRetrying}
              />
            </div>
          </main>

          <div className='px-4 pb-4 sm:px-6 sm:pb-6'>
            <div className='mx-auto w-full max-w-3xl'>
              <ChatInput
                ref={chatInputRef}
                sendMessage={sendMessage}
                isLoading={isLoading}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>
      </div>

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
