import { ChevronRight, Focus, MousePointer2, Move, Package, ShieldAlert, Target, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';
import { cn } from '@/lib/utils';

const copy = {
  en: {
    titleA: 'Two Modes.',
    titleB: 'One Battle.',
    intro: 'The game switches between physical pressure and mental focus. Master both to survive the livestream chaos.',
    phase1: 'Phase 1',
    phase2: 'Phase 2',
    platformerTitle: 'Warehouse Platformer',
    platformerDesc: "As a livestream seller, you don't just talk. You have to find the items. Navigate through the vertical chaos of your storage facility.",
    shooterTitle: 'Spam Shooter',
    shooterDesc: 'Once the stream goes viral, the trolls come out. Deploy the Admin Ship to protect your channel from malicious bot attacks.',
    platformerFeatures: [
      ['Collect Items', 'Pick up the products your customers ordered.'],
      ['Avoid Obstacles', 'Dodge spills and loose scaffolding.'],
      ['Item Recognition', 'Grab only what is in the order list.'],
      ['Flow Movement', 'Jump and slide with precision.'],
    ],
    shooterFeatures: [
      ['Target Spam', 'Shoot down red comments and bot icons.'],
      ['Protect Fans', "Don't hit real customer messages."],
      ['Reputation Bar', 'Keep your channel healthy to earn more.'],
      ['Fast Reflexes', 'The swarm gets faster over time.'],
    ],
    loop: 'The Master Loop',
    steps: ['Start Live', 'Collect Orders', 'Reach Viral', 'Fight Spam', 'Redeem Rewards'],
  },
  vi: {
    titleA: 'Hai Chế Độ.',
    titleB: 'Một Trận Chiến.',
    intro: 'Game luôn chuyển giữa áp lực thể chất và sự tập trung tinh thần. Làm chủ cả hai để sống sót giữa hỗn loạn livestream.',
    phase1: 'Giai Đoạn 1',
    phase2: 'Giai Đoạn 2',
    platformerTitle: 'Vượt Kho Hàng',
    platformerDesc: 'Làm streamer bán hàng không chỉ là nói. Bạn phải tự tìm món. Leo nhảy qua kho hàng đầy tầng và xử lý đơn thật nhanh.',
    shooterTitle: 'Bắn Hạ Spam',
    shooterDesc: 'Khi stream lên xu hướng, troll và bot sẽ xuất hiện. Triển khai Admin Ship để bảo vệ kênh trước tấn công độc hại.',
    platformerFeatures: [
      ['Nhặt Đúng Món', 'Lấy đúng sản phẩm mà khách đã đặt.'],
      ['Né Chướng Ngại', 'Tránh vết đổ, giàn giáo lỏng lẻo và các pha bay nhảy khó.'],
      ['Nhận Diện Món', 'Chỉ nhặt món nằm trong danh sách đơn.'],
      ['Di Chuyển Mượt', 'Canh nhảy và trượt thật chính xác.'],
    ],
    shooterFeatures: [
      ['Ngắm Spam', 'Bắn hạ comment đỏ và icon bot.'],
      ['Bảo Vệ Fan', 'Không được bắn trúng khách thật.'],
      ['Thanh Uy Tín', 'Giữ cho kênh khỏe mạnh để kiếm nhiều hơn.'],
      ['Phản Xạ Nhanh', 'Đàn spam sẽ tăng tốc theo thời gian.'],
    ],
    loop: 'Vòng Lặp Chính',
    steps: ['Bắt Đầu Live', 'Lấy Đơn', 'Lên Viral', 'Đánh Spam', 'Đổi Thưởng'],
  },
} as const;

export default function Gameplay() {
  const { language } = useLanguage();
  const content = copy[language];

  const platformerFeatures = [
    { icon: <Package className="h-5 w-5 text-brand-blue" />, title: content.platformerFeatures[0][0], desc: content.platformerFeatures[0][1] },
    { icon: <ShieldAlert className="h-5 w-5 text-red-500" />, title: content.platformerFeatures[1][0], desc: content.platformerFeatures[1][1] },
    { icon: <Target className="h-5 w-5 text-brand-orange" />, title: content.platformerFeatures[2][0], desc: content.platformerFeatures[2][1] },
    { icon: <Move className="h-5 w-5 text-brand-purple" />, title: content.platformerFeatures[3][0], desc: content.platformerFeatures[3][1] },
  ];

  const shooterFeatures = [
    { icon: <Focus className="h-5 w-5 text-brand-purple" />, title: content.shooterFeatures[0][0], desc: content.shooterFeatures[0][1] },
    { icon: <MousePointer2 className="h-5 w-5 text-brand-blue" />, title: content.shooterFeatures[1][0], desc: content.shooterFeatures[1][1] },
    { icon: <TrendingUp className="h-5 w-5 text-green-500" />, title: content.shooterFeatures[2][0], desc: content.shooterFeatures[2][1] },
    { icon: <Zap className="h-5 w-5 text-brand-orange" />, title: content.shooterFeatures[3][0], desc: content.shooterFeatures[3][1] },
  ];

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h1 className="mb-6 font-display text-4xl font-bold lg:text-7xl">
              {content.titleA} <br className="lg:hidden" />
              <span className="text-gradient">{content.titleB}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-500">{content.intro}</p>
          </div>

          <div className="mb-32 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="group relative overflow-hidden rounded-3xl p-8 glass">
                <div className="absolute inset-0 bg-mesh opacity-20 transition-opacity group-hover:opacity-40" />
                <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/40">
                  <div className="w-full max-w-xs space-y-4">
                    <div className="h-2 w-full rounded-full bg-orange-100" />
                    <div className="h-2 w-1/2 translate-x-12 rounded-full bg-sky-100" />
                    <div className="h-2 w-2/3 rounded-full bg-pink-100" />
                    <motion.div
                      animate={{ x: [0, 100, 0], y: [0, -40, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute bottom-20 left-10 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue shadow-[0_0_20px_rgba(14,165,233,0.35)]"
                    >
                      <Package className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 space-y-8 lg:order-2">
              <div className="inline-block rounded-full border border-brand-blue/20 bg-brand-blue/10 px-4 py-1 text-sm font-bold uppercase tracking-widest text-brand-blue">
                {content.phase1}
              </div>
              <h2 className="font-display text-3xl font-bold lg:text-5xl">{content.platformerTitle}</h2>
              <p className="text-lg leading-relaxed text-gray-500">{content.platformerDesc}</p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {platformerFeatures.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border-white/40 p-4 glass">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-32 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-block rounded-full border border-brand-purple/20 bg-brand-purple/10 px-4 py-1 text-sm font-bold uppercase tracking-widest text-brand-purple">
                {content.phase2}
              </div>
              <h2 className="font-display text-3xl font-bold lg:text-5xl">{content.shooterTitle}</h2>
              <p className="text-lg leading-relaxed text-gray-500">{content.shooterDesc}</p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {shooterFeatures.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border-white/40 p-4 glass">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="group relative overflow-hidden rounded-3xl p-8 glass">
                <div className="absolute inset-0 bg-mesh opacity-20 transition-opacity group-hover:opacity-40" />
                <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/40 bg-white/40">
                  <div className="relative flex h-full w-full flex-col items-center justify-center p-8">
                    <motion.div
                      animate={{ x: [-100, 100, -100] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="mb-20 flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple shadow-[0_0_30px_rgba(236,72,153,0.35)]"
                    >
                      <ShieldAlert className="h-7 w-7 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ x: [-20, 20, -20] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="neon-border flex h-14 w-14 items-center justify-center rounded-b-md rounded-t-3xl bg-brand-blue"
                    >
                      <Target className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] border border-white/50 bg-brand-card p-12 text-center lg:p-20">
            <h2 className="mb-12 font-display text-3xl font-bold">{content.loop}</h2>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row lg:gap-8">
              {content.steps.map((step, index) => (
                <div key={step} className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row lg:gap-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className={cn('flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-black text-white shadow-xl', index % 2 === 0 ? 'bg-brand-orange' : 'bg-brand-blue')}>
                      {index + 1}
                    </div>
                    <span className="whitespace-nowrap text-sm font-bold">{step}</span>
                  </div>
                  {index < content.steps.length - 1 && <ChevronRight className="hidden h-8 w-8 text-brand-orange/20 md:block" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
}
