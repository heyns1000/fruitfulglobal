import React, { useState } from 'react';
import { processTakeoutData } from '../../services/geminiService';
import { Card } from '../ui/Card';

export const ImportView: React.FC = () => {
  const [takeoutData, setTakeoutData] = useState<string>('');
  const [processedJson, setProcessedJson] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessData = async () => {
    if (!takeoutData.trim()) {
      setError('Please paste your Takeout data into the text area first.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setProcessedJson('');
      const result = await processTakeoutData(takeoutData);
      if (result) {
        try {
            const cleanedResult = result.replace(/^```json\s*/, '').replace(/```$/, '');
            const parsed = JSON.parse(cleanedResult);
            setProcessedJson(JSON.stringify(parsed, null, 2));
        } catch (parseError) {
            setProcessedJson(result);
            setError("Model returned a non-JSON response, but we're displaying the raw output. You may need to manually clean it.");
            console.error("JSON parsing error:", parseError);
        }
      } else {
        setError('The processing returned an empty result.');
      }
    } catch (e) {
      setError('An error occurred while processing the data. The model may be overloaded.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Takeout Data Consolidator</h2>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          This tool uses a powerful prompt to process your downloaded Google Takeout files and structure them into a single JSON file.
        </p>
      </div>

      <Card className="p-6 bg-[var(--color-bg-tertiary)]/60 border-[var(--color-border)]">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">How It Works - The Efficient Way</h3>
        <ol className="list-decimal list-inside space-y-3 text-[var(--color-text-secondary)]">
            <li>Go to <a href="https://takeout.google.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">Google Takeout</a> and download your Gemini data.</li>
            <li>Unzip the downloaded folder and open one of the HTML files (e.g., "MyActivity.html") in a text editor.</li>
            <li>Copy the <span className="font-bold text-[var(--color-primary-text)]">entire content</span> of the file.</li>
            <li>Paste the content into the text area below in <span className="font-bold">Step 1</span>.</li>
            <li>Click "Consolidate Data". The AI will process everything in one go.</li>
        </ol>
        <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg text-yellow-500 text-sm">
            <strong>Important:</strong> This process sends your Takeout data and the powerful prompt to the AI all at once. This cannot be done in a standard Gemini chat, which is why this dedicated tool is necessary.
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="font-semibold text-[var(--color-text-primary)] text-lg mb-2">Step 1: Paste Your Takeout Data</h3>
        <textarea
          value={takeoutData}
          onChange={(e) => setTakeoutData(e.target.value)}
          placeholder="Paste the raw content from one of your Takeout HTML or JSON files here..."
          className="w-full h-64 p-3 bg-[var(--color-input-bg)] border border-[var(--color-input-border)] rounded-md text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
          disabled={loading}
        />
      </Card>
      
      <div className="text-center">
        <button 
          onClick={handleProcessData} 
          disabled={loading || !takeoutData}
          className="px-8 py-3 bg-[var(--color-primary)] text-[var(--color-text-accent)] font-bold rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 mx-auto shadow-lg hover:shadow-[var(--color-primary)]/30"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing... This may take a moment.</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Consolidate Data</span>
            </>
          )}
        </button>
      </div>

      {error && <p className="text-[var(--color-error)] text-center p-4 bg-[var(--color-error-bg)] rounded-lg">{error}</p>}

      {processedJson && !loading && (
        <Card className="p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[var(--color-text-primary)] text-lg">Step 2: Copy Your Consolidated JSON</h3>
                <button 
                    onClick={() => navigator.clipboard.writeText(processedJson)}
                    className="px-3 py-1 text-sm bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] text-[var(--color-text-primary)] rounded-md transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                </button>
            </div>
          <pre className="w-full h-96 p-3 bg-gray-900 text-gray-200 border border-[var(--color-border)] rounded-md text-sm overflow-auto">
            <code>
              {processedJson}
            </code>
          </pre>
        </Card>
      )}
    </div>
  );
};
