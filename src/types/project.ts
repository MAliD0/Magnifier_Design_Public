export interface Project {
  slug: string;
  title: string;
  location?: string;
  year?: number;
  summary?: string;
  coverImage?: {
    src: string;
    alt: string;
  };
  gallery?: Array<{
    src: string;
    alt: string;
  }>;
}
