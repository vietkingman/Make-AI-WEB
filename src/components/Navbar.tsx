import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { cx } from '@/lib/format';

const links = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Blog SEO', href: '/blog' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Kho QR', href: '/warehouse' },
  { label: 'Đơn hàng', href: '/orders' },
  { label: 'Giao hàng', href: '/shipping' },
  { label: 'Rewards', href: '/rewards' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-cyan-300/10 bg-slate-950/82 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl'
          : 'border-white/5 bg-slate-950/40 backdrop-blur-md',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg shadow-cyan-500/25 transition-transform group-hover:scale-105">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-display text-lg font-black tracking-tight text-white">Livestream Master</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300">Trận Chiến Chốt Đơn</p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cx(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'bg-cyan-400/12 text-cyan-200' : 'text-slate-300 hover:bg-white/5 hover:text-white',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/blog"
          className="hidden rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Xem blog SEO
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/10 p-2 text-white lg:hidden"
          aria-label="Mở menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cx(
                    'rounded-2xl px-4 py-3 text-base font-bold',
                    isActive ? 'bg-cyan-400/12 text-cyan-200' : 'text-slate-300 hover:bg-white/5',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
