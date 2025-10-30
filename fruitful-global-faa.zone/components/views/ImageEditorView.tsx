import React, { useState, useCallback } from 'react';
import { editImage } from '../../services/geminiService';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const ImageEditorView: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [imageInfo, setImageInfo] = useState<{ name: string, type: string } | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setError(null);
            setEditedImage(null);
            setImageInfo({ name: file.name, type: file.type });
            const reader = new FileReader();
            reader.onloadend = () => {
                setOriginalImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = useCallback(async () => {
        if (!originalImage || !imageInfo || !prompt.trim()) {
            setError('Please upload an image and enter a prompt.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setEditedImage(null);
            
            const base64Data = originalImage.split(',')[1];
            const result = await editImage(base64Data, imageInfo.type, prompt);

            if (result) {
                setEditedImage(`data:image/png;base64,${result}`);
            } else {
                setError('Failed to edit image. The result was empty.');
            }
        } catch (e) {
            setError('An error occurred while editing the image.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [originalImage, imageInfo, prompt]);

    return (
        <div className="max-w-6xl mx-auto animate-fade-in space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Image Editor</h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">Upload an image, describe your edit, and let Gemini bring it to life.</p>
            </div>

            <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="text-center">
                        <input type="file" id="imageEditorUpload" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <label htmlFor="imageEditorUpload" className="px-6 py-3 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-border)] cursor-pointer transition-colors font-semibold">
                            {originalImage ? 'Change Image' : 'Choose an Image'}
                        </label>
                        {imageInfo && <p className="text-sm text-[var(--color-text-secondary)] mt-3">Selected: {imageInfo.name}</p>}
                    </div>
                     <div>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe your edit... e.g., 'add a birthday hat on the cat'"
                            className="w-full h-24 p-3 bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-md text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-primary)] transition"
                            disabled={loading || !originalImage}
                        />
                    </div>
                </div>
                {originalImage && (
                    <div className="text-center mt-6">
                         <button onClick={handleEdit} disabled={loading || !prompt.trim()} className="px-8 py-3 bg-[var(--color-primary)] text-[var(--color-text-accent)] font-bold rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] transition-colors">
                            {loading ? 'Generating...' : 'Apply Edit'}
                        </button>
                    </div>
                )}
            </Card>

            {loading && <div className="h-60 flex items-center justify-center"><LoadingSpinner message="Applying edits..." /></div>}
            {error && <p className="text-[var(--color-error)] text-center p-4 bg-[var(--color-error-bg)] rounded-lg">{error}</p>}
            
            {!loading && (editedImage || originalImage) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                    <Card className="p-4">
                        <h3 className="font-bold text-center mb-2 text-[var(--color-text-primary)]">Original</h3>
                        {originalImage && <img src={originalImage} alt="Original" className="w-full rounded-lg" />}
                    </Card>
                    <Card className="p-4">
                        <h3 className="font-bold text-center mb-2 text-[var(--color-text-primary)]">Edited</h3>
                        {editedImage ? <img src={editedImage} alt="Edited" className="w-full rounded-lg" /> : <div className="h-full flex items-center justify-center text-[var(--color-text-secondary)]">Your edited image will appear here</div>}
                    </Card>
                </div>
            )}
        </div>
    );
};
