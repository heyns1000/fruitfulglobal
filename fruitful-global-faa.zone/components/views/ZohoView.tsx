import React from 'react';
import { useGeminiData } from '../../hooks/useGeminiData';
import { generateZohoIntegrations } from '../../services/geminiService';
import { ZohoIntegration } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Card } from '../ui/Card';

export const ZohoView: React.FC = () => {
  const { data: integrationList, loading, error, refresh: fetchIntegrations } = useGeminiData<ZohoIntegration[]>(generateZohoIntegrations);
  const integrations = integrationList || [];
  
  const ZohoIntegrationCard: React.FC<{ integration: ZohoIntegration }> = ({ integration }) => {
    const categoryColors: { [key: string]: string } = {
      'CRM': 'bg-blue-100 text-blue-800 border-blue-300',
      'Finance': 'bg-green-100 text-green-800 border-green-300',
      'HR': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Marketing': 'bg-pink-100 text-pink-800 border-pink-300',
      'Custom App': 'bg-indigo-100 text-indigo-800 border-indigo-300',
    };

    const statusColors: { [key: string]: string } = {
      'Live': 'bg-green-500',
      'Pending': 'bg-yellow-500',
      'Error': 'bg-red-500',
    };

    const handleCardClick = () => {
      window.open(integration.url, '_blank', 'noopener,noreferrer');
    };

    return (
      <Card className="p-4 flex flex-col h-full group" onClick={handleCardClick}>
          <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${categoryColors[integration.category] || 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'}`}>
                  {integration.category}
              </span>
               <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${statusColors[integration.status] || 'bg-gray-400'}`}></span>
                  <span className="text-xs font-bold text-[var(--color-text-secondary)]">
                      {integration.status}
                  </span>
              </div>
          </div>
        <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-1">{integration.name}</h4>
        <p className="text-sm text-[var(--color-text-secondary)] flex-grow">{integration.description}</p>
        <div className="mt-4 text-xs text-[var(--color-primary)] font-mono truncate group-hover:underline">
          {integration.url}
        </div>
      </Card>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Zoho Integrations</h2>
        <button onClick={fetchIntegrations} disabled={loading} className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-accent)] rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] transition-colors flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.898 2.188A1.001 1.001 0 0116 8.999a5 5 0 00-9.807.752 1 1 0 01-1.858-.686A7.002 7.002 0 014 5.101V3a1 1 0 01-1-1zM2.001 10a1 1 0 01.858-.686A5 5 0 0011.808 10a1 1 0 11-1.858.686A7.002 7.002 0 012.9 14.899V17a1 1 0 11-2 0v-5a1 1 0 011.001-1z" clipRule="evenodd" /></svg>}
            Regenerate
        </button>
      </div>
      {loading && <LoadingSpinner message="Building Zoho integration matrix..." />}
      {error && <p className="text-[var(--color-error)] text-center">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <ZohoIntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      )}
    </div>
  );
};
