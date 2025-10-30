import React, { useState, useLayoutEffect, createContext, useContext, ReactNode } from 'react';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

import { ProfileView } from './components/views/ProfileView';
import { ChatsView } from './components/views/ChatsView';
import { CanvasesView } from './components/views/CanvasesView';
import { ImportView } from './components/views/ImportView';
import { VaultView } from './components/views/VaultView';
import { ZohoView } from './components/views/ZohoView';
import { BrandCatalogView } from './components/views/BrandCatalogView';
import { SourceDocumentView } from './components/views/SourceDocumentView';
import { ChatbotView } from './components/views/ChatbotView';
import { ImageAnalyzerView } from './components/views/ImageAnalyzerView';
import { ImageEditorView } from './components/views/ImageEditorView';
import { LiveConvoView } from './components/views/LiveConvoView';
import { GlobalIndexView } from './components/views/GlobalIndexView';
import { View } from './types';

const Footer: React.FC = () => {
    return (
        <footer className="global-footer py-8 px-6 md:px-12 text-center text-sm">
            <div className="flex flex-wrap justify-center mb-4">
                <a href="https://footer.global.repo.seedwave.faa.zone/privacy.html" className="transition-colors mx-2 my-1">Privacy</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/terms.html" className="transition-colors mx-2 my-1">Terms</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/contact.html" className="transition-colors mx-2 my-1">Contact</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/copyright.html" className="transition-colors mx-2 my-1">Copyright</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/developers.html" className="transition-colors mx-2 my-1">Developers</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/vaultmesh.html" className="transition-colors mx-2 my-1">VaultMesh</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/fruitful.html" className="transition-colors mx-2 my-1">Fruitful</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/faa.zone.html" className="transition-colors mx-2 my-1">FAA.Zone</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/about.html" className="transition-colors mx-2 my-1">About</a>
                <a href="https://footer.global.repo.seedwave.faa.zone/accessibility.html" className="transition-colors mx-2 my-1">Accessibility</a>
            </div>
            <span>© 2025 FAA™ Treaty System™. All Rights Reserved.</span> <span>Powered by 🦍 glyphs + Vault API. Synced with Seedwave™.</span>
        </footer>
    );
};


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('brands');

  const renderView = () => {
    switch (currentView) {
      case 'profile': return <ProfileView />;
      case 'chats': return <ChatsView />;
      case 'canvases': return <CanvasesView />;
      case 'importer': return <ImportView />;
      case 'vault': return <VaultView />;
      case 'zoho': return <ZohoView />;
      case 'brands': return <BrandCatalogView />;
      case 'source': return <SourceDocumentView />;
      case 'chatbot': return <ChatbotView />;
      case 'imageAnalyzer': return <ImageAnalyzerView />;
      case 'imageEditor': return <ImageEditorView />;
      case 'liveConvo': return <LiveConvoView />;
      case 'globalIndex': return <GlobalIndexView />;
      default: return <BrandCatalogView />;
    }
  };

  return (
      <div className="flex h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 pl-16 md:pl-64 flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {renderView()}
          </div>
          <Footer />
        </main>
      </div>
  );
};

export default App;