export interface ContentCard {
  id: string;
  day: number;
  title: string;
  summary: string;
  content: string;
  codeExample?: string;
  tags: string[];
}

export interface UserProgress {
  currentDay: number;
  completedCards: string[];
  bookmarkedCards: string[];
}