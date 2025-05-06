import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BookmarkState {
  bookmarkedCards: string[];
  addBookmark: (cardId: string) => void;
  removeBookmark: (cardId: string) => void;
  isBookmarked: (cardId: string) => boolean;
  clearAllBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarkedCards: [],
      
      addBookmark: (cardId: string) => {
        set((state) => ({
          bookmarkedCards: [...state.bookmarkedCards, cardId]
        }));
      },
      
      removeBookmark: (cardId: string) => {
        set((state) => ({
          bookmarkedCards: state.bookmarkedCards.filter(id => id !== cardId)
        }));
      },
      
      isBookmarked: (cardId: string) => {
        return get().bookmarkedCards.includes(cardId);
      },
      
      clearAllBookmarks: () => {
        set({ bookmarkedCards: [] });
      }
    }),
    {
      name: 'js-learning-bookmarks',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);