export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  slug: string;
} 