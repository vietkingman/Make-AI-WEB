import { Gift, Layers, Rocket, RotateCcw, Smartphone, Zap } from 'lucide-react';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';

const copy = {
  en: {
    title: 'Game Features',
    intro: 'Designed for the modern casual gamer who wants high stakes, fast decisions, and tangible rewards.',
    features: [
      ['Hybrid Gameplay', 'Platformer and shooter combined seamlessly. Two distinct skill sets required to master one viral stream.'],
      ['Fast Match Flow', 'Short 3-5 minute sessions perfect for mobile gaming. High density fun without the grind.'],
      ['Livestream Theme', 'Inspired by real world e-commerce pressure. Experience the thrill of chot don moments and viral growth.'],
      ['Reward System', 'Your skills earn you more than just high scores. Convert in-game coins into real brand vouchers.'],
      ['Simple Controls', 'Built for accessibility. One-handed warehouse runs and intuitive tap-to-shoot mechanics.'],
      ['Replay Value', 'Endless score chasing with global leaderboards. Every session is a new chance to rank up.'],
    ],
    panelTitle: 'Designed for Modern Casual Gamers',
    panelDesc: 'No complicated tutorials. No 40-hour grind. Just jump in, play for 5 minutes, earn your coins, and keep winning. We respect your time and provide instant feedback.',
    tags: ['No P2W', 'Skill Based', 'Fast Loads'],
  },
  vi: {
    title: 'Tính Năng Game',
    intro: 'Được thiết kế cho game thủ trẻ thích những quyết định nhanh, cuộc chơi căng và phần thưởng hữu ích.',
    features: [
      ['Gameplay Lai', 'Kết hợp mượt mà giữa platformer và shooter. Bạn cần làm chủ hai bộ kỹ năng trong một buổi live.'],
      ['Nhịp Trận Nhanh', 'Trận 3-5 phút gọn nhẹ, rất hợp cho chơi trên di động. Vui đậm đặc mà không cần cày cuốc.'],
      ['Chủ Đề Livestream', 'Lấy cảm hứng từ áp lực thương mại điện tử. Cảm nhận sự kích thích của những pha chốt đơn viral.'],
      ['Hệ Thống Thưởng', 'Kỹ năng của bạn không chỉ đổi lại điểm số. Coin trong game có thể đổi sang voucher thương hiệu.'],
      ['Điều Khiển Đơn Giản', 'Dễ tiếp cận cho mọi người. Vượt kho bằng một tay và bắn spam bằng thao tác dễ hiểu.'],
      ['Giá Trị Chơi Lại', 'Leo rank liên tục với bảng xếp hạng toàn cầu. Mỗi trận đều là cơ hội mới để bứt phá.'],
    ],
    panelTitle: 'Thiết Kế Cho Game Thủ Hiện Đại',
    panelDesc: 'Không tutorial dài dòng. Không cần cày 40 giờ. Chỉ cần vào game, chơi 5 phút, kiếm coin và tiếp tục thắng.',
    tags: ['Không P2W', 'Kỹ Năng', 'Tải Nhanh'],
  },
} as const;

export default function Features() {
  const { language } = useLanguage();
  const content = copy[language];
  const icons = [Layers, Rocket, Zap, Gift, Smartphone, RotateCcw];
  const iconColors = ['text-brand-blue', 'text-brand-purple', 'text-brand-orange', 'text-brand-blue', 'text-brand-purple', 'text-brand-orange'];

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h1 className="mb-6 font-display text-4xl font-bold lg:text-7xl">
              {content.title.split(' ')[0]} <span className="text-gradient">{content.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-500">{content.intro}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.features.map((feature, index) => {
              const Icon = icons[index];
              return (
                <div key={feature[0]} className="group relative overflow-hidden rounded-3xl border-white/50 p-8 transition-all hover:border-brand-blue/30 hover:bg-white/90 glass">
                  <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-brand-blue/10 blur-2xl transition-all group-hover:bg-brand-blue/20" />
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white transition-transform group-hover:scale-110 neon-border">
                    <Icon className={`h-8 w-8 ${iconColors[index]}`} />
                  </div>
                  <h3 className="mb-4 font-display text-2xl font-bold">{feature[0]}</h3>
                  <p className="leading-relaxed text-gray-500">{feature[1]}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-32 flex flex-col items-center gap-12 rounded-[3rem] border border-white/50 bg-brand-card p-12 lg:flex-row lg:p-20">
            <div className="flex-1 space-y-6">
              <h2 className="font-display text-3xl font-bold tracking-tight lg:text-5xl">{content.panelTitle}</h2>
              <p className="text-lg text-gray-500">{content.panelDesc}</p>
              <div className="flex flex-wrap gap-4 pt-4">
                {content.tags.map((tag, index) => (
                  <div key={tag} className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest glass ${index === 0 ? 'text-brand-blue' : index === 1 ? 'text-brand-purple' : 'text-brand-orange'}`}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full max-w-md flex-1">
              <div className="relative flex aspect-square items-center justify-center rounded-3xl p-8 glass">
                <div className="absolute inset-0 bg-mesh opacity-10" />
                <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-white/40 p-8 text-center">
                  <Smartphone className="mb-6 h-20 w-20 animate-float text-brand-blue" />
                  <div className="space-y-2">
                    <div className="mx-auto h-2 w-32 rounded-full bg-orange-100" />
                    <div className="mx-auto h-2 w-24 rounded-full bg-sky-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
}
