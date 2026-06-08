import { ArrowRight, CalendarDays, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';

import { formatDate } from '@/lib/format';
import type { BlogPost } from '@/types/blog';

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={featured ? 'group grid overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/[0.06] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl lg:grid-cols-[1fr_0.9fr]' : 'group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] shadow-xl shadow-slate-950/30 backdrop-blur-xl transition-transform hover:-translate-y-1'}
    >
      <div className={featured ? 'relative min-h-80 overflow-hidden' : 'relative aspect-[16/10] overflow-hidden'}>
        <img
          src={post.cover || '/content/blog/covers/default-cover.svg'}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
      </div>

      <div className={featured ? 'flex flex-col justify-center p-7 lg:p-10' : 'p-6'}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-400/12 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-cyan-200">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
            <CalendarDays className="h-4 w-4" />
            {formatDate(post.published_at)}
          </span>
        </div>

        <h2 className={featured ? 'mb-4 font-display text-3xl font-black leading-tight text-white lg:text-5xl' : 'mb-3 font-display text-2xl font-black leading-tight text-white'}>
          {post.title}
        </h2>
        <p className="mb-5 line-clamp-3 text-sm leading-7 text-slate-300">{post.summary}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <Tags className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-sm font-black text-emerald-300">
          Đọc bài viết
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
