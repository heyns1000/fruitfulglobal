import React from 'react';
import { ThemeToggler } from './ThemeToggler';

export const Header: React.FC = () => {
  const bannerImageUrl = "https://storage.googleapis.com/aai-web-samples/fruitful-global-1.png";

  return (
    <header 
      className="h-24 bg-cover bg-center rounded-b-2xl shadow-lg relative"
      style={{ backgroundImage: `url(${bannerImageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/20 rounded-b-2xl"></div>
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggler />
      </div>
    </header>
  );
};
