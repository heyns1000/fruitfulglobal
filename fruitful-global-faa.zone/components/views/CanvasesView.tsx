import React from 'react';
import { useGeminiData } from '../../hooks/useGeminiData';
import { generateCanvasList } from '../../services/geminiService';
import { Canvas } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Card } from '../ui/Card';

export const CanvasesView: React.FC = () => {
  const { data: canvasList, loading, error, refresh: fetchCanvases } = useGeminiData<Canvas[]>(generateCanvasList);
  const canvases = canvasList || [];
  
  const CanvasCard: React.FC<{ canvas: Canvas }> = ({ canvas }) => {
    const typeClasses: { [key: string]: string } = {
      'Code Project': 'bg-[var(--color-tag-code-bg)] text-[var(--color-tag-code-text)]',
      'Document': 'bg-[var(--color-tag-doc-bg)] text-[var(--color-tag-doc-text)]',
      'Whiteboard': 'bg-[var(--color-tag-board-bg)] text-[var(--color-tag-board-text)]',
      'Design Mockup': 'bg-[var(--color-tag-mockup-bg)] text-[var(--color-tag-mockup-text)]',
    };

    return (
      <Card className="overflow-hidden group">
        <img src={canvas.thumbnailUrl} alt={canvas.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="p-4">
          <h4 className="font-bold text-[var(--color-text-primary)] truncate">{canvas.title}</h4>
          <div className="flex justify-between items-center mt-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeClasses[canvas.type] || 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'}`}>
                  {canvas.type}
              </span>
              <p className="text-xs text-[var(--color-text-secondary)]">{new Date(canvas.lastModified).toLocaleDateString()}</p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Canvases</h2>
        <button onClick={fetchCanvases} disabled={loading} className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-accent)] rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] transition-colors flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.898 2.188A1.001 1.001 0 0116 8.999a5 5 0 00-9.807.752 1 1 0 01-1.858-.686A7.002 7.002 0 014 5.101V3a1 1 0 01-1-1zM2.001 10a1 1 0 01.858-.686A5 5 0 0011.808 10a1 1 0 11-1.858.686A7.002 7.002 0 012.9 14.899V17a1 1 0 11-2 0v-5a1 1 0 011.001-1z" clipRule="evenodd" /></svg>}
            Regenerate
        </button>
      </div>
      {loading && <LoadingSpinner message="Building creative canvases..." />}
      {error && <p className="text-[var(--color-error)] text-center">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {canvases.map((canvas) => (
            <CanvasCard key={canvas.id} canvas={canvas} />
          ))}
        </div>
      )}
    </div>
  );
};
