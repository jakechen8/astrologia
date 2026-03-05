// ============================================================
// Zustand Store — Global State Management
// ============================================================
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, BirthProfile, AstroChart, LifeprintState, Reading, DailyQuestion, DailyCheckin } from '@/types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;

  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;

  // Birth Profile
  birthProfile: BirthProfile | null;
  setBirthProfile: (profile: BirthProfile) => void;

  // Astro Chart
  astroChart: AstroChart | null;
  setAstroChart: (chart: AstroChart) => void;

  // Lifeprint
  lifeprint: LifeprintState | null;
  setLifeprint: (state: LifeprintState) => void;

  // Today
  todayQuestion: DailyQuestion | null;
  setTodayQuestion: (question: DailyQuestion) => void;
  todayReading: Reading | null;
  setTodayReading: (reading: Reading) => void;
  hasAnsweredToday: boolean;
  setHasAnsweredToday: (answered: boolean) => void;

  // History
  checkins: DailyCheckin[];
  addCheckin: (checkin: DailyCheckin) => void;
  readings: Reading[];
  addReading: (reading: Reading) => void;

  // UI State
  showExplainer: boolean;
  setShowExplainer: (show: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  onboardingStep: 0,
  birthProfile: null,
  astroChart: null,
  lifeprint: null,
  todayQuestion: null,
  todayReading: null,
  hasAnsweredToday: false,
  checkins: [],
  readings: [],
  showExplainer: false,
  activeTab: 'today',
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      setBirthProfile: (profile) => set({ birthProfile: profile }),
      setAstroChart: (chart) => set({ astroChart: chart }),
      setLifeprint: (state) => set({ lifeprint: state }),
      setTodayQuestion: (question) => set({ todayQuestion: question }),
      setTodayReading: (reading) => set({ todayReading: reading }),
      setHasAnsweredToday: (answered) => set({ hasAnsweredToday: answered }),
      addCheckin: (checkin) =>
        set((state) => ({ checkins: [...state.checkins, checkin] })),
      addReading: (reading) =>
        set((state) => ({ readings: [...state.readings, reading] })),
      setShowExplainer: (show) => set({ showExplainer: show }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      reset: () => set(initialState),
    }),
    {
      name: 'astrapulse-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        birthProfile: state.birthProfile,
        astroChart: state.astroChart,
        lifeprint: state.lifeprint,
        checkins: state.checkins,
        readings: state.readings,
        hasAnsweredToday: state.hasAnsweredToday,
      }),
    }
  )
);
