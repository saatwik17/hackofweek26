export interface Trip {
  id: string;
  title: string;
  location: string;
  date: string;
  summary: string;
  imageSeed: string; // For picsum
  fullStory?: string; // Content that might be generated or hardcoded
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}