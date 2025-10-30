import React, { useState, useCallback } from 'react';
import { analyzeImage } from '../../services/geminiService';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const ImageAnalyzerView: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageInfo, setImageInfo] = useState<{ name: string, type: string } | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAnalysis(null);
            setError(null);
            setImageInfo({ name: file.name, type: file.type });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!image || !imageInfo) {
            setError('Please upload an image first.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setAnalysis(null);
            
            const base64Data = image.split(',')[1];
            const result = await analyzeImage(base64Data, imageInfo.type);

            if (result) {
                setAnalysis(result);
            } else {
                setError('Failed to get analysis. The result was empty.');
            }
        } catch (e) {
            setError('An error occurred during analysis.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [image, imageInfo]);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Image Analyzer</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">Upload an image and let Gemini describe it for you.</p>
            </div>
            
            <Card className="p-6">
                <div className="text-center">
                    <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <label htmlFor="imageUpload" className="px-6 py-3 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-border)] cursor-pointer transition-colors font-semibold">
                        Choose an Image
                    </label>
                    {imageInfo && <p className="text-sm text-[var(--color-text-secondary)] mt-3">Selected: {imageInfo.name}</p>}
                </div>

                {image && (
                    <div className="mt-6 flex flex-col items-center">
                        <img src={image} alt="Upload preview" className="max-w-full max-h-80 rounded-lg shadow-lg border-2 border-[var(--color-border)]" />
                        <button onClick={handleAnalyze} disabled={loading} className="mt-6 px-8 py-3 bg-[var(--color-primary)] text-[var(--color-text-accent)] font-bold rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] transition-colors">
                            {loading ? 'Analyzing...' : 'Analyze Image'}
                        </button>
                    </div>
                )}
            </Card>

            {loading && <div className="h-40 flex items-center justify-center"><LoadingSpinner message="Analyzing image..." /></div>}
            {error && <p className="text-[var(--color-error)] text-center p-4 bg-[var(--color-error-bg)] rounded-lg">{error}</p>}
            
            {analysis && (
                <Card className="p-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Analysis Result</h3>
                    <div className="text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">{analysis}</div>
                </Card>
            )}
        </div>
    );
};
