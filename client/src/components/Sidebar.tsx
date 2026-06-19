/**
 * Sidebar — the workspace navigation rail.
 *
 * Holds the "New chat" action, the persisted conversation history (select /
 * rename / delete) and a profile row at the bottom with an editable local
 * display name and a shortcut into Settings. Fixed on desktop, a slide-in
 * drawer on small screens.
 *
 * @license Apache-2.0
 */
import { FC, useEffect, useRef, useState } from 'react';
import { Conversation } from '../utils/useConversations';
import Orb from './Orb';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  displayName: string;
  onDisplayNameChange: (name: string) => void;
  onOpenSettings: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  conversations,
  activeId,
  onSelect,
  onNewChat,
  onDelete,
  onRename,
  displayName,
  onDisplayNameChange,
  onOpenSettings,
  isOpen,
  onClose,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(displayName);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId) editRef.current?.focus();
  }, [editingId]);

  const startRename = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setDraft(conversation.title);
  };
  const commitRename = () => {
    if (editingId) onRename(editingId, draft);
    setEditingId(null);
  };

  const commitName = () => {
    onDisplayNameChange(nameDraft);
    setEditingName(false);
  };

  const initials =
    displayName
      .trim()
      .split(/\s+/)
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'Y';

  return (
    <>
      {isOpen && <div className='scrim md:hidden' onClick={onClose} aria-hidden='true' />}

      <aside
        className={`sidebar fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-out md:static md:z-auto md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className='flex items-center justify-between gap-2 px-4 pt-4'>
          <div className='flex items-center gap-2.5'>
            <Orb variant='sm' />
            <span className='text-[17px] font-bold tracking-tight' style={{ color: 'var(--text)' }}>
              EchoAI
            </span>
          </div>
          <button
            onClick={onClose}
            className='icon-btn h-9 w-9 md:hidden'
            aria-label='Close menu'
          >
            <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* New chat */}
        <div className='px-3 pt-4'>
          <button onClick={onNewChat} className='btn-accent flex w-full items-center justify-center gap-2 py-2.5'>
            <svg className='h-[18px] w-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 5v14M5 12h14' />
            </svg>
            New chat
          </button>
        </div>

        {/* History */}
        <div className='mt-5 px-4 text-[11px] font-semibold uppercase tracking-[0.14em]' style={{ color: 'var(--text-faint)' }}>
          Recent
        </div>
        <nav className='mt-2 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2'>
          {conversations.map(conversation => {
            const isActive = conversation.id === activeId;
            const isEditing = editingId === conversation.id;
            return (
              <div
                key={conversation.id}
                role='button'
                tabIndex={0}
                onClick={() => !isEditing && onSelect(conversation.id)}
                onKeyDown={e => {
                  if (!isEditing && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onSelect(conversation.id);
                  }
                }}
                className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
              >
                <svg className='h-[15px] w-[15px] flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M8 12h8M8 8h8m-8 8h5m6-4a8 8 0 01-11.3 7.3L3 21l1.7-5.7A8 8 0 1121 12z' />
                </svg>

                {isEditing ? (
                  <input
                    ref={editRef}
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onBlur={commitRename}
                    onClick={e => e.stopPropagation()}
                    onKeyDown={e => {
                      if (e.key === 'Enter') commitRename();
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    className='nav-edit'
                  />
                ) : (
                  <span className='nav-item__title'>{conversation.title}</span>
                )}

                {!isEditing && (
                  <span className='nav-actions'>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        startRename(conversation);
                      }}
                      className='nav-action'
                      aria-label='Rename chat'
                    >
                      <svg className='h-3.5 w-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.4-9.4a2 2 0 112.8 2.8L11.8 15H9v-2.8l8.6-8.6z' />
                      </svg>
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onDelete(conversation.id);
                      }}
                      className='nav-action nav-action--danger'
                      aria-label='Delete chat'
                    >
                      <svg className='h-3.5 w-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M19 7l-.9 12a2 2 0 01-2 1.9H7.9a2 2 0 01-2-1.9L5 7m5 4v6m4-6v6M4 7h16M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3' />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Profile */}
        <div className='border-t p-3' style={{ borderColor: 'var(--border)' }}>
          <div className='profile-row'>
            <span className='avatar'>{initials}</span>
            {editingName ? (
              <input
                autoFocus
                value={nameDraft}
                onChange={e => setNameDraft(e.target.value)}
                onBlur={commitName}
                onKeyDown={e => {
                  if (e.key === 'Enter') commitName();
                  if (e.key === 'Escape') {
                    setNameDraft(displayName);
                    setEditingName(false);
                  }
                }}
                className='nav-edit'
              />
            ) : (
              <div className='min-w-0 flex-1'>
                <p className='truncate text-[13.5px] font-semibold' style={{ color: 'var(--text)' }}>
                  {displayName}
                </p>
                <p className='text-[11px]' style={{ color: 'var(--text-faint)' }}>
                  Free plan
                </p>
              </div>
            )}

            {!editingName && (
              <button
                onClick={() => {
                  setNameDraft(displayName);
                  setEditingName(true);
                }}
                className='nav-action'
                aria-label='Edit name'
              >
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.4-9.4a2 2 0 112.8 2.8L11.8 15H9v-2.8l8.6-8.6z' />
                </svg>
              </button>
            )}
            <button onClick={onOpenSettings} className='nav-action' aria-label='Settings'>
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.6} d='M10.3 4.3c.4-1.8 2.9-1.8 3.4 0a1.7 1.7 0 002.5 1.1c1.6-.9 3.3.8 2.4 2.4a1.7 1.7 0 001 2.5c1.8.5 1.8 2.9 0 3.4a1.7 1.7 0 00-1 2.5c.9 1.6-.8 3.3-2.4 2.4a1.7 1.7 0 00-2.5 1c-.5 1.8-2.9 1.8-3.4 0a1.7 1.7 0 00-2.5-1c-1.6.9-3.3-.8-2.4-2.4a1.7 1.7 0 00-1-2.5c-1.8-.5-1.8-2.9 0-3.4a1.7 1.7 0 001-2.5c-.9-1.6.8-3.3 2.4-2.4 1 .6 2.3.1 2.5-1z' />
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.6} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
