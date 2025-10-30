import React, { useState, useMemo } from 'react';
import { brandDocument } from '../../services/geminiService';
import { Brand } from '../../types';
import { BrandDetailModal } from '../ui/BrandDetailModal';

export const BrandCatalogView: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  
  const brandList = useMemo(() => {
    const brands: Brand[] = [];
    const lines = brandDocument.split('\n');
    let currentSector = 'Unknown';
    let currentBrand: Partial<Brand> | null = null;
    let isParsingSubBrands = false;
    const brandRegex = /^(\d+)\.\s+(.*)/;

    const finishCurrentBrand = () => {
      if (currentBrand) {
        if (!currentBrand.description && currentBrand.type) {
          currentBrand.description = currentBrand.type;
        }
        const name = currentBrand.name || '';
        const sector = currentBrand.sector || '';
        let tier = 'Operational'; // Default
        if (sector.includes('SOAZA')) {
            if (name.includes('CORE') || name.includes('VAULTPAY')) tier = 'Sovereign';
            else if (name.includes('FRESH') || name.includes('THREADS') || name.includes('SPIRITLINE')) tier = 'Dynastic';
            else tier = 'Operational';
        } else if (sector.includes('SEEDWAVE VERIFIED')) {
            if (name.includes('AUREUM PATH')) tier = 'Sovereign';
            else if (name.includes('LIONSTREAM') || name.includes('SOLVEMIND') || name.includes('GLYPHFRAME')) tier = 'Dynastic';
            else if (name.includes('VAULTSKIN') || name.includes('FIREPULSE') || name.includes('SIGILLOCK')) tier = 'Operational';
            else tier = 'Market';
        } else if (name.includes('MONSTER OMNI')) {
            tier = 'Sovereign';
        } else if (name.startsWith('AG-')) {
            tier = 'Operational';
        } else if (sector.includes('Fashion')) {
            tier = 'Market';
        }
        currentBrand.tier = tier;
        brands.push(currentBrand as Brand);
      }
      currentBrand = null;
      isParsingSubBrands = false;
    };

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('SECTION ')) {
        finishCurrentBrand();
        currentSector = trimmedLine.split(': ')[1]?.replace(/ \(.*/, '') || 'Unknown Section';
        continue;
      }
      if (trimmedLine.startsWith('SECTOR:')) {
        finishCurrentBrand();
        currentSector = trimmedLine.substring(7).trim();
        continue;
      }
      if (trimmedLine.length === 0) { isParsingSubBrands = false; }
      const brandMatch = trimmedLine.match(brandRegex);
      if (brandMatch) {
        finishCurrentBrand();
        currentBrand = {
          id: brandMatch[1].padStart(2, '0'),
          name: brandMatch[2].trim(),
          sector: currentSector,
          subBrands: [],
          faaSystemLinks: [],
        };
        continue;
      }
      if (currentBrand) {
        if (isParsingSubBrands && (trimmedLine.startsWith('- ') || trimmedLine.startsWith('  '))) {
          (currentBrand.subBrands as string[]).push(trimmedLine.replace(/^- /, '').trim());
          continue;
        } else { isParsingSubBrands = false; }
        const separatorIndex = trimmedLine.indexOf(':');
        if (separatorIndex > -1) {
          const key = trimmedLine.substring(0, separatorIndex).trim();
          const value = trimmedLine.substring(separatorIndex + 1).trim();
          switch (key) {
            case 'Type': currentBrand.type = value; break;
            case 'Description': currentBrand.description = value; break;
            case 'Master License Fee': currentBrand.masterLicenseFee = value; break;
            case 'Monthly Fee': currentBrand.monthlyFee = value; break;
            case 'Royalty': currentBrand.royalty = value; break;
            case 'Use Phrase': currentBrand.usePhrase = value; break;
            case 'Omnidrop Kit': currentBrand.omnidropKit = value; break;
            case 'ClaimRoot™': currentBrand.claimRoot = value; break;
            case 'PulseTrade™': currentBrand.pulseTrade = value; break;
            case 'VaultPay™': currentBrand.vaultPay = value; break;
            case 'Activation Time': currentBrand.activationTime = value; break;
            case 'GhostTrace™': currentBrand.ghostTrace = value; break;
            case 'Deployment Region': currentBrand.deploymentRegion = value; break;
            case 'Family Bundle': currentBrand.familyBundle = value; break;
            case 'FAA System Links': currentBrand.faaSystemLinks = value.split(',').map(s => s.trim()); break;
            case 'Sub-Brands': isParsingSubBrands = true; break;
          }
        }
      }
    }
    finishCurrentBrand();
    return brands;
  }, []);

  return (
    <div className="animate-fade-in">
        <div className="pb-6">
            <p className="text-xl font-bold text-[var(--color-text-primary)]">
              If you don't like the fruits you are growing, change the seeds...
            </p>
        </div>
        <div className="overflow-x-auto bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-[var(--color-border)]">
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">ID</th>
                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Brand</th>
                        <th scope="col" className="w-1/3 px-6 py-3 text-left text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Family</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Tier</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                {brandList.map((brand) => (
                    <tr key={brand.id} onClick={() => setSelectedBrand(brand)} className="hover:bg-[var(--color-bg-secondary)] transition-colors cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-text-secondary)] text-center">{brand.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[var(--color-text-primary)]">{brand.name}</td>
                        <td className="px-6 py-4 text-sm text-[var(--color-text-secondary)]">{brand.description || brand.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">{brand.sector || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-secondary)]">{brand.tier}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        {selectedBrand && <BrandDetailModal brand={selectedBrand} onClose={() => setSelectedBrand(null)} />}
    </div>
  );
};
