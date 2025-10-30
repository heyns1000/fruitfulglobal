import React from 'react';
import { useGeminiData } from '../../hooks/useGeminiData';
import { generateUserProfile } from '../../services/geminiService';
import { UserProfile } from '../../types';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Card } from '../ui/Card';

export const ProfileView: React.FC = () => {
  const { data: profile, loading, error } = useGeminiData<UserProfile>(generateUserProfile);

  if (loading) {
    return <div className="h-full flex items-center justify-center"><LoadingSpinner message="Crafting a user persona..." /></div>;
  }

  if (error || !profile) {
    return <div className="text-center py-10 text-[var(--color-error)]">{error || 'No profile data available.'}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">User Profile</h2>
      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <img src={profile.avatarUrl} alt={profile.name} className="w-32 h-32 rounded-full border-4 border-[var(--color-primary)] shadow-lg" />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{profile.name}</h3>
            <p className="text-[var(--color-primary)]">{profile.email}</p>
            <p className="text-[var(--color-text-secondary)] mt-3 text-sm max-w-prose">{profile.bio}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Preferences</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 bg-[var(--color-bg-tertiary)]">
              <div className="font-medium text-[var(--color-text-secondary)]">Theme</div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)] capitalize flex items-center gap-2">
                 {profile.preferences.theme === 'dark' ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.706-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zm.464-10.607a1 1 0 000 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" clipRule="evenodd" /></svg>}
                {profile.preferences.theme}
              </div>
            </Card>
            <Card className="p-4 bg-[var(--color-bg-tertiary)]">
              <div className="font-medium text-[var(--color-text-secondary)]">Notifications</div>
              <div className={`text-lg font-semibold flex items-center gap-2 ${profile.preferences.notifications ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                {profile.preferences.notifications ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
                {profile.preferences.notifications ? 'Enabled' : 'Disabled'}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};
