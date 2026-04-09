export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | string[];
  tags: string[];
  categories: string[];
  company: string;
  imageUrl: string;
  imageHint: string;
  authorId: string;
  publishedAt: string;
  isFeatured: boolean;
  readTime?: number;
  url?: string;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  logoHint: string;
  industry: string;
};

export type User = {
  id: string;
  displayName: string;
  email: string;
  photoUrl: string;
  photoHint: string;
  role: 'reader' | 'author' | 'editor' | 'admin';
};

export type Trend = {
  keyword: string;
  score: number;
  relatedArticles: string[];
};

export type Comment = {
  id:string;
  articleId: string;
  userId: string;
  text: string;
  createdAt: Date;
};

export type HackerNewsStory = {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  summary?: string | string[];
  type?: string;
  dead?: boolean;
  deleted?: boolean;
  kids?: number[];
};
