export interface Guest {
  name: string;
  email: string;
  attendance: 'yes' | 'no' | 'maybe';
  guestsCount: number;
  dietaryRestrictions?: string;
  message?: string;
}

export enum Tone {
  FORMAL = 'Formel',
  FUNNY = 'Drôle',
  SENTIMENTAL = 'Touchant',
  POETIC = 'Poétique'
}

export interface WishRequest {
  relationship: string;
  tone: Tone;
}