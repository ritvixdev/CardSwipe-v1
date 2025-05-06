import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProgressState {
  currentDay: number;
  completedCards: string[];
  viewedCards: string[];
  setCurrentDay: (day: number) => void;
  markCardCompleted: (cardId: string) => void;
  markCardViewed: (cardId: string) => void;
  isCardCompleted: (cardId: string) => boolean;
  isCardViewed: (cardId: string) => boolean;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      currentDay: 1,
      completedCards: [],
      viewedCards: [],
      
      setCurrentDay: (day: number) => {
        set({ currentDay: day });
      },
      
      markCardCompleted: (cardId: string) => {
        set((state) => ({
          completedCards: state.completedCards.includes(cardId) 
            ? state.completedCards 
            : [...state.completedCards, cardId]
        }));
      },
      
      markCardViewed: (cardId: string) => {
        set((state) => ({
          viewedCards: state.viewedCards.includes(cardId) 
            ? state.viewedCards 
            : [...state.viewedCards, cardId]
        }));
      },
      
      isCardCompleted: (cardId: string) => {
        return get().completedCards.includes(cardId);
      },
      
      isCardViewed: (cardId: string) => {
        return get().viewedCards.includes(cardId);
      },
      
      resetProgress: () => {
        set({ 
          currentDay: 1,
          completedCards: [],
          viewedCards: []
        });
      }
    }),
    {
      name: 'js-learning-progress',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);