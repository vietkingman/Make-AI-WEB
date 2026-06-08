import { ArrowLeft, CalendarDays, Tags } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import BlogCard from '@/components/BlogCard';
import SeoHead from '@/components/SeoHead';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blogApi';
import { formatDate } from '@/lib/format';
import type { BlogPost } from '@/types/blog';

function plainParagraphs(text?: string) {
  return (text || '')
    .split(/\n{2,}|\r\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function BlogDetailPage() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBlogPostBySlug(slug), getBlogPosts()])
      .then(([currentPost, allPosts]) => {
        setPost(currentPost);
        setRelated(
          currentPost
            ? allPosts.filter((item) => item.slug !== currentPost.slug && item.category === currentPost.category).slice(0, 3)
            : [],
        );
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const paragraphs = useMemo(() => plainParagraphs(post?.content_plain), [post]);

  if (loading) {
    return (
      <section className="px-5 pb-20 pt-32">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.055] p-10 text-center text-slate-400">Đang tải bài viết...</div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="px-5 pb-20 pt-32">
        <SeoHead title="Không tìm thấy bài viết - Livestream Master" />
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.055] p-10 text-center">
          <h1 className="mb-4 font-display text-4xl font-black">Không tìm thấy bài viết</h1>
          <Link to="/blog" className="font-black text-cyan-300">Quay lại Blog</Link>
        </div>
      </section>
    );
  }

  const content = post.content_json;
  const cta = content?.cta || { label: 'Xem thêm dự án Livestream Master', href: post.published_url || '/' };

  return (
    <>
      <SeoHead title={post.seo_title || post.title} description={post.seo_description || post.summary} />
      <article className="px-5 pb-20 pt-32">
        <div className="mx-auto max-w-5xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 font-black text-cyan-300">
            <ArrowLeft className="h-4 w-4" />
            Quay lại Blog
          </Link>

          <header className="mb-10">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950">{post.category}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post.published_at)}
              </span>
            </div>
            <h1 className="mb-6 font-display text-4xl font-black leading-tight lg:text-7xl">{post.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">{post.summary}</p>
          </header>

          <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055]">
            <img src={post.cover || '/content/blog/covers/default-cover.svg'} alt={post.title} className="max-h-[520px] w-full object-cover" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 leading-8 text-slate-300 backdrop-blur-xl lg:p-10">
              {content?.intro && <p className="mb-8 text-xl leading-9 text-slate-200">{content.intro}</p>}

              {content?.sections?.map((section) => (
                <section key={section.heading} className="mb-9">
                  <h2 className="mb-4 font-display text-3xl font-black text-white">{section.heading}</h2>
                  <p className="mb-4">{section.body}</p>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-2xl border border-cyan-300/10 bg-cyan-300/5 px-4 py-3">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {content?.conclusion && <p className="mb-8 text-lg font-semibold text-emerald-200">{content.conclusion}</p>}

              {!content && paragraphs.length > 0 && paragraphs.map((paragraph) => <p key={paragraph} className="mb-6">{paragraph}</p>)}

              {!content && paragraphs.length === 0 && (
                <p className="text-slate-400">Bài viết đang được đồng bộ nội dung. Vui lòng quay lại sau ít phút.</p>
              )}

              <div className="mt-10 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-6">
                <h3 className="mb-2 font-display text-2xl font-black text-white">Tiếp tục khám phá Livestream Master</h3>
                <p className="mb-5 text-sm text-slate-300">Từ bài blog đến gameplay, toàn bộ hệ thống được thiết kế để trình bày rõ logic TMĐT trong một trải nghiệm game.</p>
                <Link to={cta.href} className="inline-flex rounded-full bg-emerald-300 px-5 py-3 text-sm font-black text-slate-950">
                  {cta.label}
                </Link>
              </div>
            </div>

            <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">Author</p>
              <p className="mb-6 font-black text-white">{post.author}</p>
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                <Tags className="h-4 w-4" />
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/8 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">{tag}</span>
                ))}
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-8 font-display text-3xl font-black">Bài liên quan</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <div key={item.post_id}>
                    <BlogCard post={item} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
