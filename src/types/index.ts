// ============================================================
// AstraPulse — Core Type Definitions
// ============================================================

export interface User {
  id: string;
  phone: string;
  email?: string;
  createdAt: Date;
  languagePref: 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';
  tonePref: 'gentle' | 'direct' | 'spiritual' | 'playful';
  timezone: string;
  streak: number;
  lastCheckIn?: Date;
  onboardingComplete: boolean;
}

export interface BirthProfile {
  userId: string;
  dob: string; // ISO date
  birthTime?: string; // HH:mm
  birthTimeConfidence: 'exact' | 'approx' | 'unknown';
  birthPlaceName: string;
  birthPlaceLat: number;
  birthPlaceLng: number;
}

export interface AstroChart {
  userId: string;
  western: {
    sunSign: string;
    moonSign: string;
    risingSign: string;
  };
  vedic: {
    rashi: string;
    nakshatra: string;
    lagna?: string;
  };
  chartJson: Record<string, unknown>;
  vedicJson: Record<string, unknown>;
  computedAt: Date;
}

export interface DailyQuestion {
  id: string;
  text: string;
  category: QuestionCategory;
  answerType: 'mcq' | 'slider' | 'text' | 'voice';
  options?: string[];
  sensitivityLevel: 0 | 1 | 2 | 3;
  memoryReference?: string; // reference to past answer
}

export type QuestionCategory =
  | 'joy_taste'
  | 'values'
  | 'relationships'
  | 'work_style'
  | 'stress'
  | 'identity'
  | 'spirituality'
  | 'culture';

export interface DailyCheckin {
  id: string;
  userId: string;
  date: string;
  questionId: string;
  answerText?: string;
  answerJson?: Record<string, unknown>;
  isPrivate: boolean;
  createdAt: Date;
}

export interface LifeprintTrait {
  name: string;
  label: string;
  score: number; // 0-1
  confidence: number; // 0-1
  evidencePointers: string[]; // checkin IDs
  userEdited: boolean;
}

export interface LifeprintState {
  userId: string;
  traits: LifeprintTrait[];
  currentState: {
    mood: number; // 1-5
    energy: number; // 1-5
    stress: number; // 1-5
    focusArea: 'love' | 'career' | 'money' | 'family' | 'self';
    weekTheme?: string;
  };
  updatedAt: Date;
}

export interface Reading {
  id: string;
  userId: string;
  date: string;
  theme: string;
  leanInto: string[];
  watchFor: string[];
  tinyAction: string;
  reflectionPrompt: string;
  explainAstro: string[];
  explainYou: string[];
  createdAt: Date;
}

export interface ShareCard {
  theme: string;
  oneLiner: string;
  tinyAction: string;
  date: string;
  sign: string;
}

export type OnboardingStep =
  | 'auth'
  | 'birth_data'
  | 'seed_questions'
  | 'first_reading';
