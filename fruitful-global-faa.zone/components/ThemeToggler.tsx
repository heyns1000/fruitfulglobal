import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';

const ThemeIcon: React.FC<{ theme: Theme }> = ({ theme }) => {
    if (theme === 'day') return <span role="img" aria-label="sun emoji">☀️</span>;
    if (theme === 'night') return <span role="img" aria-label="moon emoji">🌙</span>;
    if (theme === 'jungle') return <span role="img" aria-label="palm tree emoji">🌴</span>;
    return null;
}

export const ThemeToggler: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: Theme[] = ['day', 'night', 'jungle'];

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-full bg-[var(--color-card-bg)] border border-[var(--color-card-border)] text-xl transition-colors"
      aria-label={`Switch to next theme, current is ${theme}`}
    >
      <ThemeIcon theme={theme} />
    </button>
  );
};
