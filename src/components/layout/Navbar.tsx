import { AnimatePresence, motion } from 'motion/react';
import { Download, Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useLanguage } from '@/lib/language';
import { cn } from '@/lib/utils';

const navLinks = {
  en: [
    { name: 'Home', href: '/' },
    { name: 'Gameplay', href: '/gameplay' },
    { name: 'Features', href: '/features' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Blog', href: '/blog' },
    { name: 'Rewards', href: '/rewards' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  vi: [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Gameplay', href: '/gameplay' },
    { name: 'Tính Năng', href: '/features' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Blog', href: '/blog' },
    { name: 'Thưởng', href: '/rewards' },
    { name: 'Giới Thiệu', href: '/about' },
    { name: 'Liên Hệ', href: '/contact' },
  ],
};

const copy = {
  en: {
    tagline: 'Stream Battle Seller Rush',
    download: 'Download Now',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
  vi: {
    tagline: 'Trận Chiến Chốt Đơn Livestream',
    download: 'Tải Ngay',
    openMenu: 'Mở menu điều hướng',
    closeMenu: 'Đóng menu điều hướng',
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const content = copy[language];
  const links = navLinks[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300',
        scrolled ? 'border-b border-brand-orange/10 bg-brand-bg/80 backdrop-blur-lg' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform group-hover:scale-110">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold tracking-tight">Livestream Master</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">
              {content.tagline}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand-blue',
                location.pathname === link.href ? 'text-brand-blue' : 'text-slate-600',
              )}
            >
              {link.name}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full border border-brand-blue/20 bg-white/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand-blue/40 hover:text-brand-blue"
          >
            {language === 'en' ? 'EN / VI' : 'VI / EN'}
          </button>
          <Link
            to="/download"
            className="flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:scale-105 hover:bg-brand-orange/90 active:scale-95"
          >
            <Download className="h-4 w-4" />
            {content.download}
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? content.closeMenu : content.openMenu}
          className="p-2 text-slate-700 lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 overflow-hidden border-b border-brand-orange/10 bg-brand-bg lg:hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'py-2 text-lg font-medium',
                    location.pathname === link.href ? 'text-brand-blue' : 'text-slate-600',
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-xl border border-brand-blue/20 bg-white/80 p-4 text-sm font-bold uppercase tracking-[0.25em] text-slate-700"
              >
                {language === 'en' ? 'EN / VI' : 'VI / EN'}
              </button>
              <Link
                to="/download"
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange p-4 font-bold text-white"
              >
                <Download className="h-5 w-5" />
                {content.download}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
