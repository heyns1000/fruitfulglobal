import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = "bg-[var(--color-card-bg)] backdrop-blur-md border border-[var(--color-card-border)] rounded-xl shadow-lg transition-all duration-300";
  const clickableClasses = onClick ? "cursor-pointer hover:border-[var(--color-primary)] hover:shadow-xl hover:shadow-[var(--color-primary)]/10" : "";

  return (
    <div className={`${baseClasses} ${clickableClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
