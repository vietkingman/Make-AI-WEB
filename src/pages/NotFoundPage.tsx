import { Link } from 'react-router-dom';

import SeoHead from '@/components/SeoHead';

export default function NotFoundPage() {
  return (
    <section className="px-5 pb-20 pt-32">
      <SeoHead title="404 - Livestream Master" />
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-10 text-center backdrop-blur-xl">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">404</p>
        <h1 className="mb-4 font-display text-5xl font-black">Trang này chưa lên live</h1>
        <p className="mb-8 text-slate-300">Đường dẫn không tồn tại hoặc bài viết chưa được publish từ Blog_Storage.</p>
        <Link to="/" className="rounded-full bg-cyan-300 px-6 py-3 font-black text-slate-950">Về trang chủ</Link>
      </div>
    </section>
  );
}
