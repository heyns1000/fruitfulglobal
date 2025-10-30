import React from 'react';
import { ICONS } from '../constants';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const NavItem: React.FC<{
    viewName: View;
    label: string;
    icon: React.JSX.Element;
    isActive: boolean;
    onClick: () => void;
  }> = ({ viewName, label, icon, isActive, onClick }) => {
    const activeClasses = 'bg-[var(--color-primary-light)] text-[var(--color-primary-text)] border-[var(--color-primary)]';
    const inactiveClasses = 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]';

    return (
      <li>
        <button
          onClick={onClick}
          className={`flex items-center p-3 my-1 w-full text-sm font-medium rounded-lg transition-all duration-200 border-l-4 ${isActive ? activeClasses : `${inactiveClasses} border-transparent`}`}
        >
          {icon}
          <span className="ml-4 hidden md:block">{label}</span>
        </button>
      </li>
    );
  };

  const Divider: React.FC<{ label: string }> = ({ label }) => (
      <li className="mt-4 mb-2 px-3">
          <span className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider hidden md:block">{label}</span>
          <hr className="md:hidden border-t border-[var(--color-border)] my-2" />
      </li>
  );
  
  const navItems: { view: View; label: string; icon: React.JSX.Element }[] = [
    { view: 'chatbot', label: 'Fruitful Assist', icon: ICONS.chatbot },
    { view: 'liveConvo', label: 'Live Conversation', icon: ICONS.liveConvo },
    { view: 'imageAnalyzer', label: 'Image Analyzer', icon: ICONS.imageAnalyzer },
    { view: 'imageEditor', label: 'Image Editor', icon: ICONS.imageEditor },
  ];

  const dataItems: { view: View; label: string; icon: React.JSX.Element }[] = [
    { view: 'profile', label: 'Profile', icon: ICONS.profile },
    { view: 'chats', label: 'Chats', icon: ICONS.chats },
    { view: 'canvases', label: 'Canvases', icon: ICONS.canvases },
    { view: 'brands', label: 'Brand Catalog', icon: ICONS.brands },
    { view: 'globalIndex', label: 'Global Index', icon: ICONS.globalIndex },
    { view: 'vault', label: 'Design Vault', icon: ICONS.vault },
    { view: 'zoho', label: 'Zoho Integration', icon: ICONS.zoho },
    { view: 'importer', label: 'Data Importer', icon: ICONS.importer },
    { view: 'source', label: 'Source Document', icon: ICONS.source },
  ]

  return (
    <nav className="fixed top-0 left-0 h-full bg-[var(--color-bg-secondary)] backdrop-blur-lg border-r border-[var(--color-border)] w-16 md:w-64 z-20 flex flex-col p-2">
       <div className="flex items-center justify-center md:justify-start gap-2 p-3 h-[69px] border-b border-[var(--color-border)] mb-4">
        <span className="text-xl font-bold text-[var(--color-text-primary)] hidden md:block">Fruitful Global</span>
        <span className="text-2xl font-bold text-[var(--color-text-primary)] md:hidden">FG</span>
      </div>
      <ul className="flex-1">
        <Divider label="Gemini Tools" />
        {navItems.map((item) => (
          <NavItem
            key={item.view}
            viewName={item.view}
            label={item.label}
            icon={item.icon}
            isActive={currentView === item.view}
            onClick={() => setCurrentView(item.view)}
          />
        ))}
        <Divider label="Data Explorer" />
        {dataItems.map((item) => (
            <NavItem
                key={item.view}
                viewName={item.view}
                label={item.label}
                icon={item.icon}
                isActive={currentView === item.view}
                onClick={() => setCurrentView(item.view)}
            />
        ))}
      </ul>
    </nav>
  );
};
