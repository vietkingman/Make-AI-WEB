import { ArrowRight, BarChart3, Boxes, Bot, PackageCheck, ShieldCheck, Sparkles, Truck, WalletCards, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BlogCard from '@/components/BlogCard';
import SeoHead from '@/components/SeoHead';
import { getBlogPosts } from '@/lib/blogApi';
import type { BlogPost } from '@/types/blog';

const problems = [
  'Comment spam làm khách thật bị trôi tin nhắn.',
  'Đơn hàng đổ về quá nhanh khiến đội live xử lý chậm.',
  'Kho hàng dễ nhầm SKU, thiếu tracking và sai tồn.',
  'Giao hàng chậm làm giảm trải nghiệm sau khi chốt đơn.',
];

const modules = [
  { icon: BarChart3, title: 'Leaderboard', desc: 'Xếp hạng bằng doanh thu, uy tín kênh, đơn giao và accuracy.', href: '/leaderboard' },
  { icon: Boxes, title: 'Warehouse QR', desc: 'Mô phỏng gom hàng, nhận diện sản phẩm và kiểm soát tồn kho.', href: '/warehouse' },
  { icon: ShieldCheck, title: 'Spam Control', desc: 'Bảo vệ live chat trước spam mà không làm mất khách thật.', href: '/blog' },
  { icon: PackageCheck, title: 'Orders', desc: 'Chốt đơn realtime trong pha Mega Sale áp lực cao.', href: '/orders' },
  { icon: Truck, title: 'Shipping', desc: 'Căn lực giao hàng và theo dõi fulfillment sau phiên live.', href: '/shipping' },
  { icon: WalletCards, title: 'Rewards', desc: 'Đổi điểm thành voucher, tăng động lực chơi lại.', href: '/rewards' },
];

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts().then((items) => setPosts(items.slice(0, 3)));
  }, []);

  return (
    <>
      <SeoHead
        title="Livestream Master: Trận Chiến Chốt Đơn"
        description="Website dự án game livestream commerce với leaderboard, warehouse QR, spam control, orders, shipping, rewards và blog SEO tự động."
      />
      <section className="relative overflow-hidden px-5 pb-20 pt-32 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.28),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(139,92,246,0.28),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.16),transparent_35%)]" />
        <div className="absolute inset-0 bg-grid opacity-35" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-200">
              <Sparkles className="h-4 w-4" />
              E-commerce livestream game
            </div>
            <h1 className="mb-6 font-display text-5xl font-black leading-[0.92] tracking-tight text-white md:text-7xl lg:text-8xl">
              Livestream <span className="text-gradient">Master</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300">
              Trận Chiến Chốt Đơn biến áp lực bán hàng livestream thành gameplay 4 phase: gom hàng, lọc spam, chốt đơn và vận chuyển thần tốc.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/warehouse" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-300 to-emerald-300 px-7 py-4 font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition-transform hover:-translate-y-1">
                Tải game demo
                <Zap className="h-5 w-5" />
              </Link>
              <Link to="/blog" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-7 py-4 font-black text-white backdrop-blur-xl transition-colors hover:bg-white/12">
                Xem blog SEO
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-cyan-400/20 to-violet-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Live Control Room</p>
                  <h2 className="mt-2 font-display text-2xl font-black">1.2M viewers / Mega Sale</h2>
                </div>
                <div className="rounded-full bg-red-500 px-3 py-1 text-xs font-black uppercase">Live</div>
              </div>
              <div className="grid gap-4">
                {[
                  ['Doanh thu', '24.890.000đ', 'from-cyan-400 to-emerald-300'],
                  ['Uy tín kênh', '96/100 HP', 'from-violet-400 to-cyan-300'],
                  ['Đơn giao thành công', '302 orders', 'from-emerald-400 to-lime-300'],
                ].map(([label, value, gradient]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
                    <p className={`mt-2 bg-gradient-to-r ${gradient} bg-clip-text font-display text-4xl font-black text-transparent`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">Problem</p>
            <h2 className="font-display text-4xl font-black lg:text-6xl">Livestream commerce rất nhanh, nhưng vận hành phía sau còn nhanh hơn.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {problems.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
                <Bot className="mb-5 h-8 w-8 text-violet-300" />
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Solution modules</p>
              <h2 className="font-display text-4xl font-black lg:text-6xl">Một hệ thống game, sáu module trình bày.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map(({ icon: Icon, title, desc, href }) => (
              <Link key={title} to={href} className="group rounded-3xl border border-white/10 bg-white/[0.055] p-7 backdrop-blur-xl transition-transform hover:-translate-y-1">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-200">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-black">{title}</h3>
                <p className="mb-5 text-sm leading-7 text-slate-400">{desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-black text-emerald-300">
                  Xem module <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">Runtime SEO blog</p>
              <h2 className="font-display text-4xl font-black">Bài mới nhất từ Google Sheets</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 font-black text-cyan-200">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {posts.map((post) => (
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
