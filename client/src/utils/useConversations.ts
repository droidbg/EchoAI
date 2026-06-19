/**
 * useConversations — client-side multi-conversation store for EchoAI.
 *
 * The conversation state has many related transitions (add message, remove
 * error, create, delete, rename, select), so it's modelled with a pure
 * `useReducer` — a single atomic source of truth — encapsulated in this hook
 * together with localStorage persistence. Conversation content isn't sensitive,
 * so localStorage (durable across reloads) is the right fit. Transient UI flags
 * (loading, theme, open panels) live as plain useState in the component.
 *
 * @license Apache-2.0
 */
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { Message } from '../components/ChatInput';
import { newId } from './id';

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'echoai_conversations';
const DEFAULT_TITLE = 'New chat';

const createBlankConversation = (): Conversation => ({
  id: newId(),
  title: DEFAULT_TITLE,
  messages: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

const loadConversations = (): Conversation[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is Conversation =>
        c && typeof c.id === 'string' && typeof c.title === 'string' && Array.isArray(c.messages)
    );
  } catch {
    return [];
  }
};

interface State {
  conversations: Conversation[];
  activeId: string;
}

type Action =
  | { type: 'ADD_MESSAGE'; conversationId: string; message: Message }
  | { type: 'REMOVE_ERROR'; conversationId: string; errorId: string }
  | { type: 'SELECT'; id: string }
  | { type: 'CREATE'; fresh: Conversation }
  | { type: 'DELETE'; id: string; fresh: Conversation }
  | { type: 'RENAME'; id: string; title: string };

/** Pure reducer — every transition derives the next state from the previous. */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(c => {
          if (c.id !== action.conversationId) return c;
          const isFirst = c.messages.length === 0;
          const title =
            isFirst && action.message.sender === 'user' && c.title === DEFAULT_TITLE
              ? action.message.message.slice(0, 48).trim() || DEFAULT_TITLE
              : c.title;
          return { ...c, title, messages: [...c.messages, action.message], updatedAt: Date.now() };
        }),
      };

    case 'REMOVE_ERROR':
      return {
        ...state,
        conversations: state.conversations.map(c =>
          c.id === action.conversationId
            ? { ...c, messages: c.messages.filter(m => m.errorId !== action.errorId) }
            : c
        ),
      };

    case 'SELECT':
      return { ...state, activeId: action.id };

    case 'CREATE': {
      // Reuse an existing empty chat rather than stacking blanks.
      const blank = state.conversations.find(c => c.messages.length === 0);
      if (blank) return { ...state, activeId: blank.id };
      return {
        conversations: [action.fresh, ...state.conversations],
        activeId: action.fresh.id,
      };
    }

    case 'DELETE': {
      const next = state.conversations.filter(c => c.id !== action.id);
      if (next.length === 0) {
        return { conversations: [action.fresh], activeId: action.fresh.id };
      }
      return {
        conversations: next,
        activeId: state.activeId === action.id ? next[0].id : state.activeId,
      };
    }

    case 'RENAME':
      return {
        ...state,
        conversations: state.conversations.map(c =>
          c.id === action.id ? { ...c, title: action.title.trim() || DEFAULT_TITLE } : c
        ),
      };

    default:
      return state;
  }
}

const createInitialState = (): State => {
  const loaded = loadConversations();
  const conversations = loaded.length ? loaded : [createBlankConversation()];
  return { conversations, activeId: conversations[0].id };
};

export function useConversations() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  // Persist whenever the conversation list changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.conversations));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [state.conversations]);

  const activeMessages = useMemo(
    () => state.conversations.find(c => c.id === state.activeId)?.messages ?? [],
    [state.conversations, state.activeId]
  );

  const addMessage = useCallback(
    (conversationId: string, message: Message) => dispatch({ type: 'ADD_MESSAGE', conversationId, message }),
    []
  );
  const removeErrorMessage = useCallback(
    (conversationId: string, errorId: string) => dispatch({ type: 'REMOVE_ERROR', conversationId, errorId }),
    []
  );
  const selectConversation = useCallback((id: string) => dispatch({ type: 'SELECT', id }), []);
  const createConversation = useCallback(() => dispatch({ type: 'CREATE', fresh: createBlankConversation() }), []);
  const deleteConversation = useCallback(
    (id: string) => dispatch({ type: 'DELETE', id, fresh: createBlankConversation() }),
    []
  );
  const renameConversation = useCallback(
    (id: string, title: string) => dispatch({ type: 'RENAME', id, title }),
    []
  );

  return {
    conversations: state.conversations,
    activeId: state.activeId,
    activeMessages,
    selectConversation,
    createConversation,
    deleteConversation,
    renameConversation,
    addMessage,
    removeErrorMessage,
  };
}
