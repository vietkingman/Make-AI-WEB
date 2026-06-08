import { Apple, Download as DownloadIcon, Laptop, QrCode, ShieldCheck, Smartphone, Zap } from 'lucide-react';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';

const copy = {
  en: {
    titleA: 'Start Your',
    titleB: 'Battle',
    intro: 'Download Livestream Master today and claim your 1,000 coin welcome bonus.',
    requires: 'Requires',
    download: 'Download Now',
    scanTitle: 'Scan to Download',
    scanDesc: 'Point your phone camera at the QR code to instantly download the app for your device.',
    stores: ['Available on Play Store', 'App Store'],
    benefits: [
      ['Secure Install', '100% Virus-free verified.'],
      ['Fast Setup', 'Ready to play in seconds.'],
      ['Lightweight', 'Small battery footprint.'],
      ['Free to Play', 'Always will be.'],
    ],
  },
  vi: {
    titleA: 'Bắt Đầu',
    titleB: 'Trên Chiến',
    intro: 'Tải Livestream Master hôm nay và nhận ngay 1,000 coin chào mừng.',
    requires: 'Yêu Cầu',
    download: 'Tải Ngay',
    scanTitle: 'Quét Mã Để Tải',
    scanDesc: 'Dùng camera điện thoại quét QR để tải app ngay lập tức cho thiết bị của bạn.',
    stores: ['Có trên Play Store', 'App Store'],
    benefits: [
      ['Cài Đặt An Toàn', 'Đã được xác minh không virus.'],
      ['Khởi Động Nhanh', 'Sẵn sàng chơi chỉ sau vài giây.'],
      ['Nhẹ Máy', 'Tốn pin thấp và chạy mượt.'],
      ['Miễn Phí', 'Luôn luôn miễn phí.'],
    ],
  },
} as const;

const platforms = [
  { icon: Smartphone, name: 'Android APK', version: 'v1.2.4', size: '85 MB', req: 'Android 8.0+', color: 'bg-green-600' },
  { icon: Apple, name: 'iOS Store', version: 'v1.2.4', size: '112 MB', req: 'iOS 14.0+', color: 'bg-blue-600' },
  { icon: Laptop, name: 'Windows PC', version: 'v1.2.4', size: '240 MB', req: 'Windows 10+', color: 'bg-purple-600' },
];

export default function Download() {
  const { language } = useLanguage();
  const content = copy[language];
  const benefitIcons = [ShieldCheck, Zap, Smartphone, DownloadIcon];

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h1 className="mb-6 font-display text-4xl font-bold lg:text-7xl">
              {content.titleA} <span className="text-gradient">{content.titleB}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-500">{content.intro}</p>
          </div>

          <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.name} className="flex flex-col items-center rounded-3xl border-white/50 p-8 text-center transition-all group hover:border-brand-blue/30 glass">
                  <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${platform.color} shadow-xl shadow-black/10 transition-transform group-hover:scale-110`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-bold">{platform.name}</h3>
                  <div className="mb-8 flex gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span>{platform.version}</span>
                    <span>&bull;</span>
                    <span>{platform.size}</span>
                  </div>
                  <p className="mb-10 text-sm italic leading-relaxed text-gray-500">{content.requires}: {platform.req}</p>
                  <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-4 font-bold text-white transition-colors hover:bg-brand-orange/90">
                    <DownloadIcon className="h-5 w-5" />
                    {content.download}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center gap-10 rounded-[3rem] p-12 md:flex-row glass">
              <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-3xl bg-white p-4">
                <QrCode className="h-full w-full text-brand-bg" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h3 className="font-display text-3xl font-bold">{content.scanTitle}</h3>
                <p className="text-gray-500">{content.scanDesc}</p>
                <div className="flex justify-center gap-4 pt-4 text-sm font-bold text-brand-orange md:justify-start">
                  <span>{content.stores[0]}</span>
                  <span>&bull;</span>
                  <span>{content.stores[1]}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 rounded-[2rem] p-12 glass">
              {content.benefits.map((item, index) => {
                const Icon = benefitIcons[index];
                return (
                  <div key={item[0]} className="space-y-2">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                      <Icon className={`h-6 w-6 ${index === 0 ? 'text-green-500' : index === 1 ? 'text-brand-blue' : index === 2 ? 'text-brand-purple' : 'text-brand-orange'}`} />
                    </div>
                    <h4 className="text-sm font-bold">{item[0]}</h4>
                    <p className="text-xs leading-relaxed text-gray-500">{item[1]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
}
