import React from 'react';
import { Brand } from '../../types';
import { Card } from './Card';

interface BrandDetailModalProps {
  brand: Brand;
  onClose: () => void;
}

export const BrandDetailModal: React.FC<BrandDetailModalProps> = ({ brand, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const DetailRow: React.FC<{ label: string; value?: string | string[] }> = ({ label, value }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-[var(--color-text-secondary)]">{label}</dt>
        <dd className="mt-1 text-sm text-[var(--color-text-primary)] sm:mt-0 sm:col-span-2">
          {Array.isArray(value) ? (
            <ul className="list-disc list-inside space-y-1">
              {value.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          ) : ( value )}
        </dd>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <Card 
        className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-[var(--color-bg-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{brand.name}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-[var(--color-border)] text-[var(--color-text-secondary)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <dl className="divide-y divide-[var(--color-border)]">
            <DetailRow label="ID" value={brand.id} />
            <DetailRow label="Description" value={brand.description || brand.type} />
            <DetailRow label="Family / Sector" value={brand.sector} />
            <DetailRow label="Tier" value={brand.tier} />
            <DetailRow label="Master License Fee" value={brand.masterLicenseFee} />
            <DetailRow label="Monthly Fee" value={brand.monthlyFee} />
            <DetailRow label="Royalty" value={brand.royalty} />
            <DetailRow label="Use Phrase" value={brand.usePhrase} />
            <DetailRow label="Omnidrop Kit" value={brand.omnidropKit} />
            <DetailRow label="ClaimRoot™" value={brand.claimRoot} />
            <DetailRow label="PulseTrade™" value={brand.pulseTrade} />
            <DetailRow label="VaultPay™" value={brand.vaultPay} />
            <DetailRow label="Activation Time" value={brand.activationTime} />
            <DetailRow label="GhostTrace™" value={brand.ghostTrace} />
            <DetailRow label="Deployment Region" value={brand.deploymentRegion} />
            <DetailRow label="Family Bundle" value={brand.familyBundle} />
            <DetailRow label="FAA System Links" value={brand.faaSystemLinks} />
            <DetailRow label="Sub-Brands" value={brand.subBrands} />
          </dl>
        </div>
      </Card>
    </div>
  );
};
