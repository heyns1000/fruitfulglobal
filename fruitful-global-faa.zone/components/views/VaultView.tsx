import React from 'react';
import { useGeminiData } from '../../hooks/useGeminiData';
import { generateVaultNodes } from '../../services/geminiService';
import { VaultNode } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Card } from '../ui/Card';

export const VaultView: React.FC = () => {
  const { data: nodeList, loading, error, refresh: fetchNodes } = useGeminiData<VaultNode[]>(generateVaultNodes);
  const nodes = nodeList || [];
  
  const VaultNodeCard: React.FC<{ node: VaultNode }> = ({ node }) => {
    const typeColors: { [key: string]: string } = {
      'Core System': 'bg-red-100 text-red-800 border-red-300',
      'Signal Protocol': 'bg-purple-100 text-purple-800 border-purple-300',
      'Data Layer': 'bg-blue-100 text-blue-800 border-blue-300',
      'UI Component': 'bg-green-100 text-green-800 border-green-300',
      'Security Key': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Marketing Protocol': 'bg-pink-100 text-pink-800 border-pink-300',
      'Execution Method': 'bg-teal-100 text-teal-800 border-teal-300',
    };

    const statusColors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800',
      'Dormant': 'bg-gray-100 text-gray-800',
      'Building': 'bg-blue-100 text-blue-800',
      'Locked': 'bg-red-100 text-red-800',
    };

    return (
      <Card className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${typeColors[node.type] || 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'}`}>
                  {node.type}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[node.status] || 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'}`}>
                  {node.status}
              </span>
          </div>
        <h4 className="font-bold text-lg text-[var(--color-text-primary)] mb-1">{node.title}</h4>
        <p className="text-sm text-[var(--color-text-secondary)] flex-grow">{node.description}</p>
      </Card>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Design Vault</h2>
        <button onClick={fetchNodes} disabled={loading} className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-text-accent)] rounded-lg hover:bg-[var(--color-primary-hover)] disabled:bg-[var(--color-text-tertiary)] transition-colors flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.898 2.188A1.001 1.001 0 0116 8.999a5 5 0 00-9.807.752 1 1 0 01-1.858-.686A7.002 7.002 0 014 5.101V3a1 1 0 01-1-1zM2.001 10a1 1 0 01.858-.686A5 5 0 0011.808 10a1 1 0 11-1.858.686A7.002 7.002 0 012.9 14.899V17a1 1 0 11-2 0v-5a1 1 0 011.001-1z" clipRule="evenodd" /></svg>}
            Regenerate
        </button>
      </div>
      {loading && <LoadingSpinner message="Initializing core system nodes..." />}
      {error && <p className="text-[var(--color-error)] text-center">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nodes.map((node) => (
            <VaultNodeCard key={node.id} node={node} />
          ))}
        </div>
      )}
    </div>
  );
};
