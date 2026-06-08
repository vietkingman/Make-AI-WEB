import { Facebook, MessageCircle, ShoppingBag, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useLanguage } from '@/lib/language';

const socialLinks = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitter, label: 'Twitter' },
  { icon: MessageCircle, label: 'Discord' },
];

const copy = {
  en: {
    description:
      'The ultimate hybrid action game. Experience the pressure of the warehouse and the chaos of the livestream chat. Run fast, sell faster, and survive the spam.',
    game: 'Game',
    company: 'Company',
    support: 'Support',
    howToPlay: 'How to Play',
    features: 'Features',
    rewards: 'Rewards Exchange',
    blog: 'Blog',
    download: 'Download',
    about: 'About Us',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    supportText: 'Have issues with your orders or rewards? Contact our team.',
    copyright: '2026 Livestream Master Team. All Rights Reserved.',
    madeWith: 'Made with passion for casual gamers.',
  },
  vi: {
    description:
      'Tựa game hành động lai đầy năng lượng. Cảm nhận áp lực kho hàng và sự hỗn loạn của livestream chat. Chạy nhanh, chốt đơn nhanh hơn và vượt qua spam.',
    game: 'Game',
    company: 'Công Ty',
    support: 'Hỗ Trợ',
    howToPlay: 'Cách Chơi',
    features: 'Tính Năng',
    rewards: 'Đổi Thưởng',
    blog: 'Blog',
    download: 'Tải Game',
    about: 'Giới Thiệu',
    contact: 'Liên Hệ',
    privacy: 'Chính Sách Bảo Mật',
    terms: 'Điều Khoản Sử Dụng',
    supportText: 'Gặp vấn đề với đơn hàng hoặc phần thưởng? Hãy liên hệ đội hỗ trợ.',
    copyright: '2026 Livestream Master Team. Bảo lưu mọi quyền.',
    madeWith: 'Tạo ra với nhiệt huyết dành cho game thủ trẻ.',
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <footer className="border-t border-brand-orange/10 bg-brand-bg px-6 pb-10 pt-20">
      <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">Livestream Master</span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">{content.description}</p>
          <div className="mt-2 flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-brand-orange">{content.game}</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li><Link to="/gameplay" className="transition-colors hover:text-brand-blue">{content.howToPlay}</Link></li>
            <li><Link to="/features" className="transition-colors hover:text-brand-blue">{content.features}</Link></li>
            <li><Link to="/blog" className="transition-colors hover:text-brand-blue">{content.blog}</Link></li>
            <li><Link to="/rewards" className="transition-colors hover:text-brand-blue">{content.rewards}</Link></li>
            <li><Link to="/download" className="transition-colors hover:text-brand-blue">{content.download}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-brand-orange">{content.company}</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li><Link to="/about" className="transition-colors hover:text-brand-blue">{content.about}</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-brand-blue">{content.contact}</Link></li>
            <li><a href="#" className="transition-colors hover:text-brand-blue">{content.privacy}</a></li>
            <li><a href="#" className="transition-colors hover:text-brand-blue">{content.terms}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-brand-orange">{content.support}</h4>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-400">{content.supportText}</p>
            <Link to="/contact" className="text-sm font-bold text-brand-blue hover:underline">
              support@livestreammaster.com
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-brand-orange/10 pt-8 text-xs font-bold uppercase tracking-widest text-gray-500 md:flex-row">
        <p>&copy; {content.copyright}</p>
        <p>{content.madeWith}</p>
      </div>
    </footer>
  );
}
