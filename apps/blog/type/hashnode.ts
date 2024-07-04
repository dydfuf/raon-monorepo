export interface Publication {
  posts: Posts;
}

export interface Post {
  id: string;
  title: string;
  subtitle: string | null;
  brief: string;
  readTimeInMinutes: number;
  views: number;
  publishedAt: string;
  updatedAt: string | null;
  tags: Tag[];
  coverImage: string | null;
  content: Content;
  seo: Seo;
  ogMetaData: OgMetaData;
  slug: string;
}

interface Tag {
  name: string;
}

interface Content {
  markdown: string;
}

interface Seo {
  title: string | null;
  description: string;
}

interface OgMetaData {
  image: string | null;
}

interface Edge {
  node: Post;
}

interface Posts {
  edges: Edge[];
}
