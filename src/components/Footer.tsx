import { Github, Mail, Radio, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Blog SEO', href: '/blog' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Kho QR', href: '/warehouse' },
  { label: 'Rewards', href: '/rewards' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-5 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link to="/" className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-display text-lg font-black text-white">Livestream Master</p>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-200">E-commerce game project</p>
            </div>
          </Link>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Website giới thiệu dự án game, leaderboard và hệ thống blog SEO tự động từ Google Sheets, Make.com và Google Apps Script.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Modules</h3>
          <div className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm font-semibold text-slate-400 transition-colors hover:text-cyan-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-emerald-300">Contact</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" /> support@livestreammaster.vn</p>
            <p className="flex items-center gap-2"><Github className="h-4 w-4 text-cyan-300" /> GitHub source + Netlify deploy</p>
            <p className="flex items-center gap-2"><Radio className="h-4 w-4 text-cyan-300" /> Runtime blog API, no rebuild per post</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs font-bold uppercase tracking-widest text-slate-500 md:flex-row">
        <p>© 2026 Livestream Master Team</p>
        <p>Built for final e-commerce/game presentation</p>
      </div>
    </footer>
  );
}
