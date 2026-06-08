import { ArrowLeft, CalendarDays, FileText, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { getBlogPosts, type BlogPost } from '@/lib/blog';
import { useLanguage } from '@/lib/language';

const copy = {
  en: {
    back: 'Back to Blog',
    notFound: 'Post not found.',
    generated: 'AI-generated article',
  },
  vi: {
    back: 'Quay lại Blog',
    notFound: 'Không tìm thấy bài viết.',
    generated: 'Bài viết tạo bởi AI',
  },
} as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export default function BlogPost() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const content = copy[language];
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((posts) => {
        setPost(posts.find((item) => item.slug === slug) ?? null);
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  return (
    <LayoutTransition>
      <article className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-5xl">
          <Link to="/blog" className="mb-10 inline-flex items-center gap-2 font-bold text-brand-blue">
            <ArrowLeft className="h-4 w-4" />
            {content.back}
          </Link>

          {isLoading && (
            <div className="rounded-[2rem] p-10 text-center text-sm font-bold uppercase tracking-widest text-gray-500 glass">
              Loading article...
            </div>
          )}

          {!isLoading && !post && (
            <div className="rounded-[2rem] p-10 text-center text-gray-500 glass">{content.notFound}</div>
          )}

          {post && (
            <>
              <header className="mb-10">
                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-brand-blue/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-blue">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 glass">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-orange">
                    <FileText className="h-4 w-4" />
                    {content.generated}
                  </span>
                </div>

                <h1 className="mb-6 font-display text-4xl font-bold leading-tight lg:text-7xl">
                  {post.title}
                </h1>
                <p className="max-w-3xl text-lg leading-relaxed text-gray-500">{post.summary}</p>
              </header>

              <div className="mb-12 overflow-hidden rounded-[2.5rem] border border-white/50 glass">
                <img src={post.cover} alt={post.title} className="max-h-[520px] w-full object-cover" />
              </div>

              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
                <div className="rounded-[2.5rem] border border-white/50 bg-white/70 p-8 leading-relaxed text-gray-600 shadow-[0_16px_40px_rgba(249,115,22,0.08)] lg:p-12">
                  {post.content.map((paragraph) => (
                    <p key={paragraph} className="mb-6 text-lg leading-8 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <aside className="h-fit rounded-[2rem] p-6 glass">
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Metadata</p>
                  <div className="mb-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">Author</p>
                    <p className="mt-1 font-bold">{post.author}</p>
                  </div>
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-orange">
                      <Tags className="h-4 w-4" />
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/80 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </article>
    </LayoutTransition>
  );
}
