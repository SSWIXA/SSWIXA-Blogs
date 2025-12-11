export interface Article {
  _id: string;
  title: string;
  content: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleResponse {
  articles: Article[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}