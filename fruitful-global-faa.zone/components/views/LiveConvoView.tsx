import React, { useState, useEffect, useRef } from 'react';
import { ai } from '../../services/geminiService';
import { Modality, LiveServerMessage } from '@google/genai';
import { createBlob, decode, decodeAudioData } from '../../utils/audioUtils';
import { Card } from '../ui/Card';

export const LiveConvoView: React.FC = () => {
    type SessionStatus = 'inactive' | 'connecting' | 'active' | 'error' | 'stopped';
    const [status, setStatus] = useState<SessionStatus>('inactive');
    const [transcription, setTranscription] = useState<{ user: string, model: string }[]>([]);
    const [currentTurn, setCurrentTurn] = useState({ user: '', model: '' });

    const sessionRef = useRef<any | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef(0);
    const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

    const stopSession = () => {
        console.log('Stopping session...');
        if (sessionRef.current) {
            sessionRef.current.close();
            sessionRef.current = null;
        }
        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }
        if (mediaStreamSourceRef.current) {
            mediaStreamSourceRef.current.disconnect();
            mediaStreamSourceRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
             audioContextRef.current.close();
        }
        if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
            outputAudioContextRef.current.close();
        }

        nextStartTimeRef.current = 0;
        sourcesRef.current.forEach(source => source.stop());
        sourcesRef.current.clear();
        setStatus('stopped');
    };

    const startSession = async () => {
        setStatus('connecting');
        setCurrentTurn({ user: '', model: '' });
        setTranscription([]);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        console.log('Session opened.');
                        setStatus('active');
                        mediaStreamSourceRef.current = audioContextRef.current!.createMediaStreamSource(stream);
                        processorRef.current = audioContextRef.current!.createScriptProcessor(4096, 1, 1);

                        processorRef.current.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromise.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };

                        mediaStreamSourceRef.current.connect(processorRef.current);
                        processorRef.current.connect(audioContextRef.current!.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        if (message.serverContent?.inputTranscription) {
                            setCurrentTurn(prev => ({...prev, user: prev.user + message.serverContent!.inputTranscription!.text}));
                        }
                        if (message.serverContent?.outputTranscription) {
                            setCurrentTurn(prev => ({...prev, model: prev.model + message.serverContent!.outputTranscription!.text}));
                        }
                        if (message.serverContent?.turnComplete) {
                            setCurrentTurn(prevTurn => {
                                setTranscription(prevTranscription => [...prevTranscription, prevTurn]);
                                return { user: '', model: '' };
                            });
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio && outputAudioContextRef.current) {
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
                            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContextRef.current, 24000, 1);
                            const source = outputAudioContextRef.current.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(outputAudioContextRef.current.destination);
                            source.addEventListener('ended', () => sourcesRef.current.delete(source));
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }

                        if (message.serverContent?.interrupted) {
                           sourcesRef.current.forEach(source => source.stop());
                           sourcesRef.current.clear();
                           nextStartTimeRef.current = 0;
                        }
                    },
                    onerror: (e: ErrorEvent) => {
                        console.error('Session error:', e);
                        setStatus('error');
                        stopSession();
                    },
                    onclose: (e: CloseEvent) => {
                        console.log('Session closed.');
                        if(status !== 'stopped') setStatus('inactive');
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    inputAudioTranscription: {},
                    outputAudioTranscription: {},
                },
            });
            
            sessionRef.current = await sessionPromise;

        } catch (err) {
            console.error('Failed to start session:', err);
            setStatus('error');
        }
    };
    
    useEffect(() => {
        return () => {
            stopSession();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStatusIndicator = () => {
        switch (status) {
            case 'inactive': return <><div className="w-4 h-4 rounded-full bg-gray-400 mr-3"></div>Inactive</>;
            case 'connecting': return <><div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse mr-3"></div>Connecting...</>;
            case 'active': return <><div className="w-4 h-4 rounded-full bg-green-500 animate-pulse mr-3"></div>Listening...</>;
            case 'error': return <><div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>Error</>;
            case 'stopped': return <><div className="w-4 h-4 rounded-full bg-gray-400 mr-3"></div>Stopped</>;
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Live Conversation</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">Speak directly with Gemini in real-time.</p>
            </div>
            <Card className="p-6 text-center">
                 <div className="flex items-center justify-center font-semibold text-lg mb-6 text-[var(--color-text-primary)]">
                    {getStatusIndicator()}
                </div>
                {status === 'active' ? (
                    <button onClick={stopSession} className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors text-xl shadow-lg">
                        Stop Session
                    </button>
                ) : (
                    <button onClick={startSession} className="px-8 py-4 bg-[var(--color-primary)] text-[var(--color-text-accent)] font-bold rounded-full hover:bg-[var(--color-primary-hover)] transition-colors text-xl shadow-lg" disabled={status==='connecting'}>
                        {status === 'connecting' ? 'Initializing...' : 'Start Conversation'}
                    </button>
                )}
                 {status === 'error' && <p className="text-[var(--color-error)] mt-4">An error occurred. Please check the console and try again.</p>}
            </Card>

            <Card className="p-6">
                 <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 text-lg">Conversation Transcript</h3>
                 <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                    {transcription.map((turn, index) => (
                        <div key={index} className="pb-2 border-b border-[var(--color-border)] last:border-b-0">
                            <p><strong className="font-semibold text-[var(--color-primary-text)]">You:</strong> {turn.user}</p>
                            <p><strong className="font-semibold text-purple-400">Gemini:</strong> {turn.model}</p>
                        </div>
                    ))}
                    {(currentTurn.user || currentTurn.model) && (
                         <div className="pb-2">
                            <p><strong className="font-semibold text-[var(--color-primary-text)]">You:</strong> {currentTurn.user}</p>
                            <p><strong className="font-semibold text-purple-400">Gemini:</strong> {currentTurn.model} <span className="animate-pulse">...</span></p>
                        </div>
                    )}
                    {transcription.length === 0 && !currentTurn.user && !currentTurn.model && (
                        <p className="text-[var(--color-text-tertiary)]">Transcript will appear here...</p>
                    )}
                 </div>
            </Card>

        </div>
    );
};
