import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import BlogCard from '@/components/BlogCard';
import SeoHead from '@/components/SeoHead';
import { getBlogPosts } from '@/lib/blogApi';
import { cx } from '@/lib/format';
import type { BlogPost } from '@/types/blog';

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ['Tất cả', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))], [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = category === 'Tất cả' || post.category === category;
      const text = [post.title, post.summary, post.category, post.tags.join(' ')].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || text.includes(normalizedQuery));
    });
  }, [category, posts, query]);

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  return (
    <>
      <SeoHead title="Blog SEO - Livestream Master" description="Blog SEO tự động từ Google Sheets và Make.com AI cho dự án Livestream Master." />
      <section className="px-5 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">AI SEO Content Hub</p>
            <h1 className="mb-5 font-display text-5xl font-black leading-tight lg:text-7xl">Blog tự động từ Google Sheets</h1>
            <p className="text-lg leading-8 text-slate-300">
              Make.com tạo bài bằng Gemini, lưu vào Blog_Storage, website fetch qua Apps Script JSONP và hiển thị ngay mà không cần rebuild Netlify.
            </p>
          </div>

          <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <Search className="h-5 w-5 text-cyan-300" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm theo title, keyword, summary..."
                  className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-slate-500"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={cx(
                      'rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors',
                      category === item ? 'bg-cyan-300 text-slate-950' : 'bg-white/5 text-slate-300 hover:bg-white/10',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-10 text-center text-slate-400">Đang tải blog...</div>}

          {!loading && filteredPosts.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-10 text-center text-slate-400">Chưa có bài phù hợp.</div>
          )}

          {featured && (
            <div className="mb-10">
              <BlogCard post={featured} featured />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <div key={post.post_id}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
