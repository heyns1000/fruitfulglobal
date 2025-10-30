import React from 'react';
import { brandDocument } from '../../services/geminiService';
import { Card } from '../ui/Card';

export const SourceDocumentView: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
          Original Brand Document Source
        </h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          This page displays the complete and unmodified text file that was provided for the Brand Catalog. This is the entire data source used by the application, shown here for full transparency.
        </p>
      </div>
      <Card className="h-[calc(100vh-14rem)] flex flex-col">
        <div className="p-6 overflow-y-auto flex-1">
          <pre className="whitespace-pre-wrap text-sm text-[var(--color-text-secondary)] font-mono leading-relaxed">
            {brandDocument}
          </pre>
        </div>
      </Card>
    </div>
  );
};
