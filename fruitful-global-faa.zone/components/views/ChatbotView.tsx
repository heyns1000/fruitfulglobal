import React, { useState, useEffect, useRef } from 'react';
import { ai } from '../../services/geminiService';
import { Message, GeminiChat } from '../../types';
import { Card } from '../ui/Card';
import { ICONS } from '../../constants';

export const ChatbotView: React.FC = () => {
    const [chat, setChat] = useState<GeminiChat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = () => {
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are Fruitful Assist, a helpful and friendly AI assistant for the Fruitful Global ecosystem. Answer questions concisely and clearly.',
                },
            });
            setChat(newChat);
             setMessages([
                {
                    id: 'initial-message',
                    sender: 'gemini',
                    content: 'Hello! How can I help you explore the Fruitful Global ecosystem today?',
                    timestamp: new Date().toISOString(),
                }
            ]);
        };
        initChat();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !chat || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            content: input,
            timestamp: new Date().toISOString(),
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setLoading(true);

        try {
            const stream = await chat.sendMessageStream({ message: currentInput });
            let geminiResponse = '';
            
            const geminiMessageId = (Date.now() + 1).toString();
            const initialGeminiMessage: Message = {
                id: geminiMessageId,
                sender: 'gemini',
                content: '',
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, initialGeminiMessage]);

            for await (const chunk of stream) {
                geminiResponse += chunk.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === geminiMessageId ? { ...msg, content: geminiResponse } : msg
                ));
            }

        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'gemini',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">Fruitful Assist</h2>
            <Card className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            {msg.sender === 'gemini' && <div className="flex-shrink-0 pt-1">{ICONS.gemini}</div>}
                            <div className={`max-w-xl p-3 rounded-lg shadow-md ${msg.sender === 'user' ? 'bg-[var(--color-primary)] text-[var(--color-text-accent)]' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'}`}>
                                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>
                                    {msg.content}
                                    {loading && msg.sender === 'gemini' && index === messages.length - 1 && <span className="inline-block w-1 h-4 bg-[var(--color-text-secondary)] ml-1 animate-pulse"></span>}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask Fruitful Assist..."
                            className="flex-1 w-full px-4 py-2 bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
                            disabled={loading}
                        />
                        <button onClick={handleSend} disabled={loading || !input.trim()} className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-accent)] font-semibold rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] disabled:cursor-not-allowed transition-colors">
                            Send
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
