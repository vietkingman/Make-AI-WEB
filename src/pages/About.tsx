import { Heart, Lightbulb, Palette, ShieldCheck, Target } from 'lucide-react';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';

const copy = {
  en: {
    story: 'Our Story',
    title: 'About the Game',
    paragraphs: [
      'Livestream Master turns the high-pressure environment of online selling into an adrenaline-pumping hybrid action game.',
      'We believe that the modern livestreamer is an athlete of the digital age, managing physical inventory logistics while simultaneously defending their reputation against swarms of digital bots.',
    ],
    players: 'Early Access Players',
    vouchers: 'Vouchers Redeemed',
    card: 'Driven by passion, built for the community.',
    vision: 'Our goal is to create a fun, fast, and relatable game experience inspired by the livestream economy.',
    team: 'Meet the Team',
    teamDesc: 'The creators behind the chaotic warehouse and the admin ship.',
  },
  vi: {
    story: 'Câu Chuyện',
    title: 'Về Game',
    paragraphs: [
      'Livestream Master biến môi trường bán hàng trực tuyến đầy áp lực thành một tựa game hành động lai đầy kích thích.',
      'Chúng tôi tin rằng streamer hiện đại là vận động viên của kỷ nguyên số, vừa quản lý kho hàng vừa bảo vệ uy tín trước các đợt bot tấn công.',
    ],
    players: 'Người Chơi Sớm',
    vouchers: 'Voucher Đã Đổi',
    card: 'Xây dựng bằng đam mê, dành cho cộng đồng.',
    vision: 'Mục tiêu của chúng tôi là tạo ra một trải nghiệm vui, nhanh và gần gũi, lấy cảm hứng từ kinh tế livestream.',
    team: 'Gặp Gỡ Team',
    teamDesc: 'Những người đứng sau kho hàng hỗn loạn và con tàu admin.',
  },
} as const;

export default function About() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-32 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-block rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-1 text-sm font-bold uppercase tracking-widest text-brand-blue">
                {content.story}
              </div>
              <h1 className="mb-8 font-display text-4xl font-bold lg:text-7xl">
                {content.title.split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{content.title.split(' ').slice(-1)}</span>
              </h1>
              <div className="space-y-6 text-left text-lg leading-relaxed text-gray-500">
                <p>{content.paragraphs[0]}</p>
                <p>{content.paragraphs[1]}</p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-bold text-brand-orange">1M+</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{content.players}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-bold text-brand-blue">500k</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{content.vouchers}</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-video overflow-hidden rounded-3xl p-4 shadow-2xl group glass">
                <div className="absolute inset-0 bg-mesh opacity-30 transition-all group-hover:opacity-50" />
                <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/40 p-8">
                  <Heart className="mb-6 h-16 w-16 animate-pulse text-brand-purple" />
                  <p className="text-center font-display text-xl font-bold">{content.card}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mb-32 overflow-hidden rounded-[3rem] border border-white/50 bg-brand-card p-12 text-center lg:p-20">
            <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-brand-blue/5 blur-[100px]" />
            <div className="relative z-10 mx-auto max-w-3xl space-y-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white neon-border">
                <Lightbulb className="h-8 w-8 text-brand-orange" />
              </div>
              <h2 className="font-display text-3xl font-bold italic tracking-tight lg:text-5xl">"{content.vision}"</h2>
              <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-brand-orange">
                <span>Vision</span>
                <span>&bull;</span>
                <span>Quality</span>
                <span>&bull;</span>
                <span>Impact</span>
              </div>
            </div>
          </div>

          <div className="mb-32">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold lg:text-5xl">{content.team}</h2>
              <p className="text-gray-500">{content.teamDesc}</p>
            </div>

            <div className="rounded-[3rem] p-12 text-center lg:p-20 glass">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                <div className="space-y-4">
                  <Target className="mx-auto mb-6 h-12 w-12 text-brand-orange" />
                  <h3 className="font-display text-xl font-bold">{language === 'en' ? 'Innovation First' : 'Ưu Tiên Sáng Tạo'}</h3>
                  <p className="text-sm text-gray-500">{language === 'en' ? 'Built for a fresh, startup-energy game concept exploring the viral economy.' : 'Được xây dựng theo tinh thần startup trẻ, khám phá nền kinh tế viral.'}</p>
                </div>
                <div className="space-y-4">
                  <Palette className="mx-auto mb-6 h-12 w-12 text-brand-blue" />
                  <h3 className="font-display text-xl font-bold">{language === 'en' ? 'Visual Excellence' : 'Hình Ảnh Nổi Bật'}</h3>
                  <p className="text-sm text-gray-500">{language === 'en' ? 'Focused on high-impact UI/UX and smooth 60FPS animations.' : 'Tập trung vào UI/UX ấn tượng và chuyển động mượt 60FPS.'}</p>
                </div>
                <div className="space-y-4">
                  <ShieldCheck className="mx-auto mb-6 h-12 w-12 text-brand-purple" />
                  <h3 className="font-display text-xl font-bold">{language === 'en' ? 'Safe Environment' : 'Môi Trường An Toàn'}</h3>
                  <p className="text-sm text-gray-500">{language === 'en' ? 'A clean reward experience where your skills are the only currency that matters.' : 'Trải nghiệm đổi thưởng minh bạch, nơi kỹ năng là giá trị quan trọng nhất.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
}
