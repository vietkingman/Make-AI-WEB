import { fallbackPosts } from '@/data/fallbackPosts';
import type { BlogContentJson, BlogPost } from '@/types/blog';

type RawPost = Record<string, unknown>;

type BlogApiListResponse = {
  ok: boolean;
  posts?: RawPost[];
  error?: string;
};

type BlogApiDetailResponse = {
  ok: boolean;
  post?: RawPost | null;
  error?: string;
};

const API_URL = import.meta.env.VITE_BLOG_API_URL as string | undefined;
const STATIC_POSTS_URL = '/content/blog/posts.json';
const PUBLIC_STATUSES = new Set(['PUBLISHED', 'READY', 'DONE']);

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(asString).filter(Boolean);
  }

  const text = asString(value);

  if (!text) {
    return [];
  }

  try {
    const parsed = JSON.parse(text) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map(asString).filter(Boolean);
    }
  } catch {
    // Comma-separated tags are the normal Google Sheets format.
  }

  return text
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeContentJson(value: unknown): BlogContentJson | null {
  if (!value) {
    return null;
  }

  if (typeof value === 'object') {
    return value as BlogContentJson;
  }

  const text = asString(value);

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as BlogContentJson;
  } catch {
    return null;
  }
}

function normalizePost(raw: RawPost): BlogPost {
  const status = asString(raw.status || raw.Status || 'PUBLISHED').toUpperCase();
  const slug = asString(raw.slug || raw.Slug);
  const title = asString(raw.title || raw.Title);
  const cover = asString(raw.cover || raw.Cover);

  return {
    post_id: asString(raw.post_id || raw.id || raw.postId || slug),
    source_idea_id: asString(raw.source_idea_id || raw.sourceIdeaId),
    status,
    title,
    slug,
    summary: asString(raw.summary || raw.Summary),
    category: asString(raw.category || raw.Category || 'Blog'),
    tags: normalizeTags(raw.tags || raw.Tags),
    cover: cover || '/content/blog/covers/default-cover.svg',
    author: asString(raw.author || raw.Author || 'Livestream Master Team'),
    language: asString(raw.language || raw.Language || 'vi'),
    seo_title: asString(raw.seo_title || raw.seoTitle),
    seo_description: asString(raw.seo_description || raw.seoDescription),
    content_json: normalizeContentJson(raw.content_json || raw.contentJson),
    content_plain: asString(raw.content_plain || raw.contentPlain),
    published_at: asString(raw.published_at || raw.publishedAt || raw.created_at || raw.createdAt),
    published_url: asString(raw.published_url || raw.publishedUrl || (slug ? `/blog/${slug}` : '')),
    image_prompt: asString(raw.image_prompt || raw.imagePrompt),
  };
}

function jsonp<T>(url: string, params: Record<string, string>) {
  return new Promise<T>((resolve, reject) => {
    const callbackName = `__lmBlogCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const cleanup = () => {
      delete (window as unknown as Record<string, unknown>)[callbackName];
      script.remove();
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error('Blog API request timed out.'));
    }, 10000);
    const requestUrl = new URL(url);

    Object.entries(params).forEach(([key, value]) => {
      requestUrl.searchParams.set(key, value);
    });
    requestUrl.searchParams.set('callback', callbackName);

    (window as unknown as Record<string, unknown>)[callbackName] = (data: T) => {
      window.clearTimeout(timeout);
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error('Unable to load Blog API.'));
    };

    script.src = requestUrl.toString();
    document.body.appendChild(script);
  });
}

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const left = new Date(a.published_at || '').getTime() || 0;
    const right = new Date(b.published_at || '').getTime() || 0;
    return right - left;
  });
}

function publicOnly(posts: BlogPost[]) {
  return posts.filter((post) => PUBLIC_STATUSES.has(post.status.toUpperCase()) && post.slug && post.title);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!API_URL) {
    try {
      const response = await fetch(STATIC_POSTS_URL, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Static posts file not found.');
      }

      const posts = (await response.json()) as RawPost[];
      return sortPosts(publicOnly(posts.map(normalizePost)));
    } catch (error) {
      console.warn(error);
      return sortPosts(publicOnly(fallbackPosts));
    }
  }

  try {
    const data = await jsonp<BlogApiListResponse>(API_URL, { action: 'getBlogPosts' });

    if (!data.ok || !Array.isArray(data.posts)) {
      throw new Error(data.error || 'Blog API returned an invalid response.');
    }

    return sortPosts(publicOnly(data.posts.map(normalizePost)));
  } catch (error) {
    console.warn(error);
    return sortPosts(publicOnly(fallbackPosts));
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!API_URL) {
    const posts = await getBlogPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  }

  try {
    const data = await jsonp<BlogApiDetailResponse>(API_URL, { action: 'getBlogPost', slug });

    if (!data.ok || !data.post) {
      throw new Error(data.error || 'Post not found.');
    }

    const post = normalizePost(data.post);

    return PUBLIC_STATUSES.has(post.status.toUpperCase()) ? post : null;
  } catch (error) {
    console.warn(error);
    return publicOnly(fallbackPosts).find((post) => post.slug === slug) ?? null;
  }
}
