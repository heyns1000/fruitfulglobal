import React from 'react';

export const LoadingSpinner: React.FC<{ title?: string; message?: string }> = ({ title = "Loading...", message = "Please wait a moment." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</p>
      <p className="text-sm text-[var(--color-text-secondary)] mt-1">{message}</p>
    </div>
  );
};
