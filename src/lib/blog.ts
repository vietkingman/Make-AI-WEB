export type BlogPost = {
  id: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  language: 'vi' | 'en';
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  cover: string;
  author: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  content: string[];
};

export async function getBlogPosts() {
  const response = await fetch('/content/blog/posts.json', {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to load blog posts.');
  }

  const posts = (await response.json()) as BlogPost[];

  return posts
    .filter((post) => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
