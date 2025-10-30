import React, { useState, useEffect } from 'react';
import { useGeminiData } from '../../hooks/useGeminiData';
import { generateChatList, generateChatHistory } from '../../services/geminiService';
import { Chat, Message } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Card } from '../ui/Card';
import { ICONS } from '../../constants';

export const ChatsView: React.FC = () => {
  const { data: chatList, loading, error, refresh: fetchChats } = useGeminiData<Chat[]>(generateChatList);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  
  const chats = chatList || [];
  
  const ChatDetail: React.FC<{ chat: Chat; onBack: () => void }> = ({ chat, onBack }) => {
    const [messages, setMessages] = useState<Message[]>(chat.messages || []);
    const [loading, setLoading] = useState<boolean>(!chat.messages);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchHistory = async () => {
        if (!chat.messages) {
          try {
            setLoading(true);
            const history = await generateChatHistory(chat.title);
            if (history) {
              setMessages(history);
            } else {
              setError('Failed to load chat history.');
            }
          } catch (e) {
            setError('An error occurred while fetching chat history.');
            console.error(e);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchHistory();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat]);

    return (
      <div className="flex flex-col h-full animate-fade-in">
        <div className="flex items-center mb-4 p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)] rounded-t-lg">
          <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-[var(--color-border)] transition-colors text-[var(--color-text-secondary)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{chat.title}</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && <LoadingSpinner message="Recreating conversation..."/>}
          {error && <p className="text-[var(--color-error)]">{error}</p>}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'gemini' && <div className="flex-shrink-0">{ICONS.gemini}</div>}
              <div className={`max-w-xl p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[var(--color-primary)] text-[var(--color-text-accent)]' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  if (selectedChat) {
    return <Card className="h-full flex flex-col"><ChatDetail chat={selectedChat} onBack={() => setSelectedChat(null)} /></Card>;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Chats</h2>
        <button onClick={fetchChats} disabled={loading} className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-accent)] rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] transition-colors flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.898 2.188A1.001 1.001 0 0116 8.999a5 5 0 00-9.807.752 1 1 0 01-1.858-.686A7.002 7.002 0 014 5.101V3a1 1 0 01-1-1zM2.001 10a1 1 0 01.858-.686A5 5 0 0011.808 10a1 1 0 11-1.858.686A7.002 7.002 0 012.9 14.899V17a1 1 0 11-2 0v-5a1 1 0 011.001-1z" clipRule="evenodd" /></svg>}
            Regenerate
        </button>
      </div>
      {loading && <LoadingSpinner message="Finding recent conversations..." />}
      {error && <p className="text-[var(--color-error)] text-center">{error}</p>}
      {!loading && !error && (
        <div className="space-y-4">
          {chats.map((chat) => (
            <Card key={chat.id} onClick={() => setSelectedChat(chat)} className="p-4 flex justify-between items-center">
                <div>
                    <h4 className="font-bold text-lg text-[var(--color-text-primary)]">{chat.title}</h4>
                    <p className="text-sm text-[var(--color-text-secondary)]">{chat.summary}</p>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{new Date(chat.lastUpdated).toLocaleString()}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--color-text-tertiary)]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
