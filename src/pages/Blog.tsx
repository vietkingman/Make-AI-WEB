import { ArrowRight, CalendarDays, FileText, Search, Sparkles, Tags } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { getBlogPosts, type BlogPost } from '@/lib/blog';
import { useLanguage } from '@/lib/language';

const copy = {
  en: {
    badge: 'AI Content Hub',
    titleA: 'Livestream',
    titleB: 'Master Blog',
    intro: 'Auto-published articles from Google Sheets ideas, cooked by Make AI, archived in Sheets, and deployed to the website.',
    search: 'Search articles',
    featured: 'Featured Post',
    latest: 'Latest Articles',
    empty: 'No published posts found.',
    read: 'Read article',
    pipeline: 'Google Sheets -> Make AI -> Blog Storage -> Website',
  },
  vi: {
    badge: 'Trung Tâm Nội Dung AI',
    titleA: 'Livestream',
    titleB: 'Master Blog',
    intro: 'Bài viết được lấy ý tưởng từ Google Sheets, Make AI cook nội dung, lưu trữ lại vào Sheets và publish lên website.',
    search: 'Tìm bài viết',
    featured: 'Bài nổi bật',
    latest: 'Bài mới nhất',
    empty: 'Chưa có bài published.',
    read: 'Đọc bài',
    pipeline: 'Google Sheets -> Make AI -> Blog Storage -> Website',
  },
} as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export default function Blog() {
  const { language } = useLanguage();
  const content = copy[language];
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getBlogPosts()
      .then(setPosts)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load blog posts.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const searchText = [post.title, post.summary, post.category, post.tags.join(' ')].join(' ').toLowerCase();
      return searchText.includes(normalizedQuery);
    });
  }, [posts, query]);

  const featuredPost = filteredPosts[0];
  const latestPosts = filteredPosts.slice(1);

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-blue glass">
                <Sparkles className="h-4 w-4" />
                {content.badge}
              </div>
              <h1 className="mb-6 font-display text-4xl font-bold leading-tight lg:text-7xl">
                {content.titleA} <br />
                <span className="text-gradient">{content.titleB}</span>
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-gray-500">{content.intro}</p>
            </div>

            <div className="rounded-[2rem] p-6 glass">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange text-white shadow-lg shadow-brand-orange/20">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Automation Flow</p>
                  <p className="font-display text-lg font-bold">{content.pipeline}</p>
                </div>
              </div>
              <label className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3">
                <Search className="h-5 w-5 text-brand-blue" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={content.search}
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
                />
              </label>
            </div>
          </div>

          {isLoading && (
            <div className="rounded-[2rem] p-10 text-center text-sm font-bold uppercase tracking-widest text-gray-500 glass">
              Loading blog...
            </div>
          )}

          {error && (
            <div className="rounded-[2rem] bg-red-50 p-10 text-center text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          {!isLoading && !error && !featuredPost && (
            <div className="rounded-[2rem] p-10 text-center text-gray-500 glass">{content.empty}</div>
          )}

          {featuredPost && (
            <>
              <section className="mb-16">
                <div className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-orange">
                  <Sparkles className="h-4 w-4" />
                  {content.featured}
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="group grid grid-cols-1 overflow-hidden rounded-[2.5rem] border border-white/50 glass lg:grid-cols-[1fr_0.9fr]"
                >
                  <div className="relative min-h-80 overflow-hidden">
                    <img
                      src={featuredPost.cover}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="mb-5 flex flex-wrap gap-3">
                      <span className="rounded-full bg-brand-blue/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-blue">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                    </div>
                    <h2 className="mb-5 font-display text-3xl font-bold leading-tight lg:text-5xl">{featuredPost.title}</h2>
                    <p className="mb-8 text-base leading-relaxed text-gray-500">{featuredPost.summary}</p>
                    <div className="inline-flex items-center gap-2 font-bold text-brand-blue">
                      {content.read}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </section>

              <section>
                <h2 className="mb-8 font-display text-3xl font-bold">{content.latest}</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {latestPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="group overflow-hidden rounded-3xl border border-white/50 glass">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-orange">
                            {post.category}
                          </span>
                          <span className="text-xs font-bold text-gray-400">{formatDate(post.publishedAt)}</span>
                        </div>
                        <h3 className="mb-3 font-display text-2xl font-bold leading-tight">{post.title}</h3>
                        <p className="mb-5 text-sm leading-relaxed text-gray-500">{post.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                              <Tags className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </LayoutTransition>
  );
}
