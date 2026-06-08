import { ChevronRight, Download, Play, Shield, ShoppingBag, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';

const copy = {
  en: {
    badge: '#1 Hybrid Action Game',
    introLine1: 'Run fast. Sell faster. Survive the spam.',
    introLine2: 'A high-octane battle between chaotic warehouses and viral bot attacks.',
    download: 'Download Now',
    gameplay: 'Watch Gameplay',
    stats: [
      { label: '2 Gameplay Modes', sub: 'Platformer & Shooter' },
      { label: 'Real Rewards', sub: 'Exchange for Vouchers' },
      { label: 'Fast Sessions', sub: '3-5 Min Challenges' },
    ],
    sceneTitle: 'Platformer + Shooter',
    sceneDesc: 'Chaos in the warehouse, war in the chat.',
    bubble1: '"Chot don! Chot don!" Hot sale',
    bubble2: '"Bot detected: [SPAM]" Alert',
    whyTitle: 'Why Play Livestream Master?',
    whyDesc: 'The perfect mix of physical agility and mental focus, inspired by the real economy of livestreaming.',
    whyCards: [
      { title: 'Fast Gameplay', desc: 'Quick 3-minute matches designed for your coffee breaks or busy schedule.' },
      { title: 'Dual-Mode Action', desc: 'Seamlessly transition between warehouse platforming and chat defense shooting.' },
      { title: 'Livestream Chaos', desc: 'Feel the pressure of real comments, spam attacks, and high-stakes selling.' },
    ],
    previewTag: 'Game Preview',
    previewTitle1: 'One Live.',
    previewTitle2: 'Two Battles.',
    steps: [
      {
        title: 'Run the Warehouse',
        desc: 'Navigate the chaotic warehouse, jump over spills, and pick up the correct items to fill customer orders before the timer runs out.',
      },
      {
        title: 'Fight the Spam',
        desc: 'When your stream goes viral, spam bots will flood the chat. Take command of the mod-ship and blast the spam away without hitting your fans.',
      },
    ],
    learnMore: 'Learn more about mechanics',
    ctaTitle: 'Ready to become the ultimate seller?',
    ctaDesc: "Join thousands of players in the world's first livestream hybrid game. It's time to sell or go home.",
    viewRewards: 'View Rewards',
  },
  vi: {
    badge: '#1 Game Hành Động Lai',
    introLine1: 'Chạy nhanh. Chốt đơn nhanh hơn. Sống sót giữa spam.',
    introLine2: 'Trận chiến tốc độ cao giữa kho hàng hỗn loạn và lũ bot đang viral.',
    download: 'Tải Ngay',
    gameplay: 'Xem Gameplay',
    stats: [
      { label: '2 Chế Độ Chơi', sub: 'Platformer & Shooter' },
      { label: 'Thưởng Thật', sub: 'Đổi Voucher' },
      { label: 'Trận Nhanh', sub: 'Thử Thách 3-5 Phút' },
    ],
    sceneTitle: 'Platformer + Shooter',
    sceneDesc: 'Hỗn loạn trong kho, chiến đấu trong khung chat.',
    bubble1: '"Chốt đơn! Chốt đơn!" Sale nóng',
    bubble2: '"Phát hiện bot: [SPAM]" Cảnh báo',
    whyTitle: 'Vì Sao Nên Chơi Livestream Master?',
    whyDesc: 'Sự kết hợp giữa nhanh tay, tập trung và áp lực livestream thương mại điện tử.',
    whyCards: [
      { title: 'Gameplay Nhanh', desc: 'Trận đấu 3 phút gọn gàng, hợp cả lúc giải lao hay khi bạn đang bận rộn.' },
      { title: 'Hành Động 2 Lớp', desc: 'Chuyển mượt giữa vượt kho và bắn hạ spam trong một buổi live.' },
      { title: 'Hỗn Loạn Livestream', desc: 'Cảm nhận áp lực comment thật, spam bot và những pha chốt đơn đầy kịch tính.' },
    ],
    previewTag: 'Xem Trước',
    previewTitle1: 'Một Buổi Live.',
    previewTitle2: 'Hai Trận Chiến.',
    steps: [
      {
        title: 'Vận Hành Kho Hàng',
        desc: 'Len xuống giữa kho hàng hỗn loạn, vượt chướng ngại và lấy đúng món để kịp xử lý đơn trước khi hết giờ.',
      },
      {
        title: 'Bắn Hạ Spam',
        desc: 'Khi stream bắt đầu viral, bot sẽ tràn vào chat. Điều khiển mod-ship để quét sạch spam mà không bắn trúng fan.',
      },
    ],
    learnMore: 'Xem thêm về cơ chế chơi',
    ctaTitle: 'Sẵn sàng trở thành chiến thần chốt đơn?',
    ctaDesc: 'Tham gia cùng hàng ngàn người chơi trong tựa game livestream lai đầu tiên. Đã đến lúc bán hoặc về.',
    viewRewards: 'Xem Thưởng',
  },
} as const;

export default function Home() {
  const { language } = useLanguage();
  const content = copy[language];

  return (
    <LayoutTransition>
      <div className="relative overflow-hidden pt-20">
        <div className="absolute left-10 top-20 h-64 w-64 animate-pulse-slow rounded-full bg-brand-blue/20 blur-[120px]" />
        <div className="absolute right-10 top-60 h-96 w-96 animate-pulse-slow rounded-full bg-brand-purple/10 blur-[120px]" />

        <section className="relative px-6 py-20 lg:py-32">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border-brand-blue/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-blue glass"
              >
                <TrendingUp className="h-3 w-3" />
                {content.badge}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-display text-5xl font-bold leading-[0.95] lg:text-8xl"
              >
                Livestream <br />
                <span className="text-gradient">Master</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500 lg:mx-0 lg:text-xl"
              >
                {content.introLine1} <br className="hidden md:block" />
                {content.introLine2}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <Link
                  to="/download"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand-orange px-8 py-4 text-lg font-bold text-white shadow-xl shadow-brand-orange/20 transition-all hover:scale-105 hover:bg-brand-orange/90 sm:w-auto"
                >
                  <Download className="h-5 w-5" />
                  {content.download}
                </Link>
                <Link
                  to="/gameplay"
                  className="flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 text-lg font-bold text-slate-800 transition-all hover:bg-white/90 sm:w-auto glass"
                >
                  <Play className="h-5 w-5 fill-current" />
                  {content.gameplay}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start"
              >
                {content.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col border-l border-brand-orange/20 pl-4">
                    <span className="text-lg font-bold text-slate-900">{stat.label}</span>
                    <span className="text-sm text-gray-500">{stat.sub}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="relative flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                className="relative z-10"
              >
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-purple blur opacity-30 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl p-4 shadow-2xl md:aspect-square glass">
                    <div className="absolute inset-0 bg-mesh opacity-50" />
                    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg border border-white/40 p-8 text-center">
                      <div className="absolute left-4 top-4 flex gap-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">LIVE 1.2M</span>
                      </div>
                      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-orange/20 animate-float">
                        <ShoppingBag className="h-12 w-12 text-brand-orange" />
                      </div>
                      <h3 className="mb-2 font-display text-2xl font-bold">{content.sceneTitle}</h3>
                      <p className="text-sm text-gray-500">{content.sceneDesc}</p>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-4 -top-10 z-20 rounded-2xl border-brand-blue/30 p-3 text-xs font-medium text-slate-800 shadow-lg glass"
                >
                  {content.bubble1}
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -left-6 bottom-10 z-20 rounded-2xl border-brand-purple/30 p-3 text-xs font-medium text-slate-800 shadow-lg glass"
                >
                  {content.bubble2}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-brand-card/70 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold lg:text-5xl">{content.whyTitle}</h2>
              <p className="mx-auto max-w-2xl text-gray-500">{content.whyDesc}</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {content.whyCards.map((card, index) => (
                <div key={card.title} className="group rounded-2xl p-8 transition-all hover:bg-white/90 glass">
                  <div className="neon-border mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white transition-transform group-hover:scale-110">
                    {index === 0 && <Zap className="h-6 w-6 text-brand-blue" />}
                    {index === 1 && <TrendingUp className="h-6 w-6 text-brand-purple" />}
                    {index === 2 && <Shield className="h-6 w-6 text-brand-orange" />}
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold">{card.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-gray-500">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{content.previewTag}</span>
                <h2 className="font-display text-4xl font-bold lg:text-6xl">
                  {content.previewTitle1} <br />
                  {content.previewTitle2}
                </h2>
              </div>

              <div className="space-y-8">
                {content.steps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/15 font-display font-black text-brand-blue">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-2 font-display text-xl font-bold">{step.title}</h3>
                      <p className="text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/gameplay" className="group inline-flex items-center gap-2 font-bold text-brand-blue">
                {content.learnMore}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-3xl p-2 glass">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 via-pink-50 to-sky-50">
                <div className="absolute inset-0 bg-mesh opacity-30" />
                <Play className="h-16 w-16 text-slate-300" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="rounded-full px-3 py-1 text-[10px] font-bold text-slate-700 glass">ALPHA FOOTAGE 0.4.1</div>
                  <div className="rounded-full px-3 py-1 text-[10px] font-bold text-brand-orange glass">4K 60FPS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-32">
          <div className="mx-auto max-w-4xl rounded-[3rem] bg-gradient-to-br from-brand-blue via-brand-purple to-brand-orange p-px">
            <div className="relative overflow-hidden rounded-[2.9rem] bg-white/80 p-12 text-center lg:p-20">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand-blue/10 blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-purple/10 blur-[80px]" />

              <h2 className="relative z-10 mb-6 font-display text-4xl font-bold lg:text-6xl">{content.ctaTitle}</h2>
              <p className="relative z-10 mx-auto mb-10 max-w-xl text-lg text-gray-500">{content.ctaDesc}</p>

              <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/download"
                  className="w-full rounded-2xl bg-brand-orange px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-brand-orange/30 transition-all hover:scale-105 sm:w-auto"
                >
                  {content.download}
                </Link>
                <Link
                  to="/rewards"
                  className="w-full rounded-2xl px-10 py-5 text-xl font-bold text-slate-800 transition-all hover:bg-white/95 sm:w-auto glass"
                >
                  {content.viewRewards}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </LayoutTransition>
  );
}
