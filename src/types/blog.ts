export type BlogContentJson = {
  intro?: string;
  sections?: Array<{
    heading: string;
    body: string;
    bullets?: string[];
  }>;
  conclusion?: string;
  cta?: {
    label: string;
    href: string;
  };
};

export type BlogPost = {
  post_id: string;
  source_idea_id?: string;
  status: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  tags: string[];
  cover?: string;
  author: string;
  language: string;
  seo_title?: string;
  seo_description?: string;
  content_json?: BlogContentJson | null;
  content_plain?: string;
  published_at?: string;
  published_url?: string;
  image_prompt?: string;
};
