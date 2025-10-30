import { Chat as GeminiChat } from "@google/genai";

export type View = 'profile' | 'chats' | 'canvases' | 'importer' | 'vault' | 'zoho' | 'brands' | 'source' | 'chatbot' | 'imageAnalyzer' | 'imageEditor' | 'liveConvo' | 'globalIndex';

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
  };
}

export interface Message {
  id: string;
  sender: 'user' | 'gemini';
  content: string;
  timestamp: string;
}

export interface Chat {
  id:string;
  title: string;
  summary: string;
  lastUpdated: string;
  messages?: Message[];
}

export interface Canvas {
  id: string;
  title: string;
  type: 'Code Project' | 'Document' | 'Whiteboard' | 'Design Mockup';
  thumbnailUrl: string;
  lastModified: string;
}

export interface VaultNode {
  id: string;
  title: string;
  description: string;
  type: 'Core System' | 'Signal Protocol' | 'Data Layer' | 'UI Component' | 'Security Key' | 'Marketing Protocol' | 'Execution Method';
  status: 'Active' | 'Dormant' | 'Building' | 'Locked';
}

export interface ZohoIntegration {
  id: string;
  name: string;
  description: string;
  category: 'CRM' | 'Finance' | 'HR' | 'Marketing' | 'Custom App';
  status: 'Live' | 'Pending' | 'Error';
  url: string;
}

export interface Brand {
  id: string;
  name: string;
  type: string;
  masterLicenseFee?: string;
  monthlyFee?: string;
  royalty?: string;
  usePhrase?: string;
  omnidropKit?: string;
  claimRoot?: string;
  pulseTrade?: string;
  vaultPay?: string;
  activationTime?: string;
  ghostTrace?: string;
  deploymentRegion?: string;
  familyBundle?: string;
  faaSystemLinks?: string[];
  sector?: string;
  subBrands?: string[];
  description?: string;
  tier?: string;
  subBrandCount?: number;
}

export { GeminiChat };
