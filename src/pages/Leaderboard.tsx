import {
  Boxes,
  ChevronDown,
  CircleDollarSign,
  Crown,
  Medal,
  PackageCheck,
  Shield,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  Target,
  Trophy,
  Truck,
  Users,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';
import { cn } from '@/lib/utils';

type GameKey = 'warehouse' | 'spam' | 'orders' | 'shipping';

type Player = {
  rank: number;
  name: string;
  liveId: string;
  revenue: number;
  hp: number;
  orders: number;
  accuracy: number;
  streak: number;
};

type GameBoard = {
  key: GameKey;
  accent: 'blue' | 'purple' | 'orange' | 'green';
  icon: ReactNode;
  metricIcon: ReactNode;
  en: {
    phase: string;
    title: string;
    mode: string;
    summary: string;
    primaryMetric: string;
    secondaryMetric: string;
    winCondition: string;
    risk: string;
  };
  vi: {
    phase: string;
    title: string;
    mode: string;
    summary: string;
    primaryMetric: string;
    secondaryMetric: string;
    winCondition: string;
    risk: string;
  };
  players: Player[];
};

const copy = {
  en: {
    badge: 'Global Live Ranking',
    titleA: 'Leaderboard',
    titleB: 'for 4 Game Phases',
    intro:
      'Track the best livestream sellers across warehouse prep, spam defense, order closing, and shipping. Rankings are sorted by revenue first, then reputation and successful orders.',
    topSellers: 'Top Sellers',
    allRanks: 'Rank Table',
    revenue: 'Revenue',
    hp: 'Channel HP',
    orders: 'Orders',
    accuracy: 'Accuracy',
    streak: 'Streak',
    player: 'Player',
    liveId: 'Live ID',
    scoringTitle: 'Scoring Logic',
    scoring:
      'Each Game Over payload should send liveId, player name, phase, revenue, channelHp, deliveredOrders, accuracy, and streak to the leaderboard endpoint. The server can upsert by liveId to avoid duplicate rows.',
    sync: 'Google Sheets ready',
    filterLabel: 'Choose board',
  },
  vi: {
    badge: 'Bảng Xếp Hạng Phiên Live',
    titleA: 'Leaderboard',
    titleB: 'cho 4 Game',
    intro:
      'Theo dõi chiến thần bán hàng qua 4 chặng: gom hàng, lọc spam, chốt đơn và vận chuyển. Xếp hạng ưu tiên doanh thu, sau đó đến uy tín kênh và số đơn thành công.',
    topSellers: 'Top người chơi',
    allRanks: 'Bảng thứ hạng',
    revenue: 'Doanh thu',
    hp: 'Uy tín',
    orders: 'Đơn',
    accuracy: 'Chuẩn xác',
    streak: 'Chuỗi',
    player: 'Người chơi',
    liveId: 'Mã live',
    scoringTitle: 'Logic tính hạng',
    scoring:
      'Khi Game Over, mỗi game nên gửi liveId, tên người chơi, phase, revenue, channelHp, deliveredOrders, accuracy và streak lên endpoint leaderboard. Server upsert theo liveId để không bị trùng dòng.',
    sync: 'Sẵn sàng nối Google Sheets',
    filterLabel: 'Chọn bảng',
  },
} as const;

const boards: GameBoard[] = [
  {
    key: 'warehouse',
    accent: 'blue',
    icon: <Boxes className="h-6 w-6" />,
    metricIcon: <PackageCheck className="h-5 w-5" />,
    en: {
      phase: 'Phase 1',
      title: 'Warehouse Rush',
      mode: 'Endless Runner',
      summary: 'Collect hot-trend products while dodging warehouse waste before the stream starts.',
      primaryMetric: 'Inventory Value',
      secondaryMetric: 'Clean Pick Rate',
      winCondition: 'Pick target products and keep momentum high.',
      risk: 'Stun penalties reduce stock and channel stamina.',
    },
    vi: {
      phase: 'Phase 1',
      title: 'Gom Hàng Vào Kho',
      mode: 'Endless Runner',
      summary: 'Nhặt sản phẩm hot-trend và né phế liệu kho trước khi phiên livestream bùng nổ.',
      primaryMetric: 'Giá trị hàng',
      secondaryMetric: 'Tỷ lệ nhặt đúng',
      winCondition: 'Nhặt đúng hàng mục tiêu và giữ nhịp chạy.',
      risk: 'Va chạm làm mất hàng và tụt thể lực.',
    },
    players: [
      { rank: 1, name: 'Tuấn Việt', liveId: 'cpt_01', revenue: 12980000, hp: 98, orders: 184, accuracy: 97, streak: 42 },
      { rank: 2, name: 'Thanh Hoà', liveId: 'cpt_02', revenue: 11840000, hp: 94, orders: 169, accuracy: 95, streak: 36 },
      { rank: 3, name: 'Bảo Nguyên', liveId: 'cpt_03', revenue: 10950000, hp: 91, orders: 158, accuracy: 92, streak: 31 },
      { rank: 4, name: 'Nguyễn Trí', liveId: 'cpt_04', revenue: 9720000, hp: 89, orders: 144, accuracy: 90, streak: 28 },
      { rank: 5, name: 'Minh Khang', liveId: 'cpt_05', revenue: 8610000, hp: 86, orders: 131, accuracy: 88, streak: 24 },
    ],
  },
  {
    key: 'spam',
    accent: 'purple',
    icon: <ShieldAlert className="h-6 w-6" />,
    metricIcon: <Shield className="h-5 w-5" />,
    en: {
      phase: 'Phase 2',
      title: 'Spam Defense',
      mode: 'Space Shooter',
      summary: 'Shoot red spam comments while protecting real customers in the livestream chat.',
      primaryMetric: 'Clean Chat Value',
      secondaryMetric: 'Channel HP',
      winCondition: 'Remove bot attacks without hitting fans.',
      risk: 'Friendly fire drains reputation and can collapse the channel.',
    },
    vi: {
      phase: 'Phase 2',
      title: 'Chiến Thần Lọc Spam',
      mode: 'Space Shooter',
      summary: 'Bắn comment spam màu đỏ nhưng phải bảo vệ khách thật trong khung chat live.',
      primaryMetric: 'Giá trị chat sạch',
      secondaryMetric: 'Uy tín kênh',
      winCondition: 'Xóa bot phá hoại mà không bắn nhầm khách.',
      risk: 'Bắn nhầm khách thật làm tụt uy tín kênh.',
    },
    players: [
      { rank: 1, name: 'Thanh Hoà', liveId: 'cpt_02', revenue: 15320000, hp: 100, orders: 213, accuracy: 99, streak: 58 },
      { rank: 2, name: 'Nguyễn Trí', liveId: 'cpt_04', revenue: 14170000, hp: 97, orders: 201, accuracy: 96, streak: 49 },
      { rank: 3, name: 'Tuấn Việt', liveId: 'cpt_01', revenue: 13760000, hp: 94, orders: 194, accuracy: 94, streak: 45 },
      { rank: 4, name: 'Bảo Nguyên', liveId: 'cpt_03', revenue: 12430000, hp: 90, orders: 181, accuracy: 91, streak: 39 },
      { rank: 5, name: 'Gia Hân', liveId: 'cpt_06', revenue: 11090000, hp: 88, orders: 162, accuracy: 89, streak: 34 },
    ],
  },
  {
    key: 'orders',
    accent: 'orange',
    icon: <ShoppingCart className="h-6 w-6" />,
    metricIcon: <CircleDollarSign className="h-5 w-5" />,
    en: {
      phase: 'Phase 3',
      title: 'Order Closing War',
      mode: 'Platformer',
      summary: 'Jump between product platforms and catch falling order codes during Mega Sale.',
      primaryMetric: 'Closed Revenue',
      secondaryMetric: 'Order Capture',
      winCondition: 'Catch invoices before they touch the ground.',
      risk: 'Missed codes become canceled orders and lower sales efficiency.',
    },
    vi: {
      phase: 'Phase 3',
      title: 'Cuộc Chiến Chốt Đơn',
      mode: 'Platformer',
      summary: 'Nhảy giữa các tầng kệ sản phẩm để bắt mã chốt đơn rơi xuống trong Mega Sale.',
      primaryMetric: 'Doanh thu chốt',
      secondaryMetric: 'Tỷ lệ bắt đơn',
      winCondition: 'Bắt hóa đơn trước khi rơi xuống đất.',
      risk: 'Để rơi mã đơn sẽ mất lượt chốt và giảm hiệu suất.',
    },
    players: [
      { rank: 1, name: 'Bảo Nguyên', liveId: 'cpt_03', revenue: 22650000, hp: 95, orders: 276, accuracy: 96, streak: 63 },
      { rank: 2, name: 'Tuấn Việt', liveId: 'cpt_01', revenue: 21440000, hp: 93, orders: 261, accuracy: 94, streak: 57 },
      { rank: 3, name: 'Thanh Hoà', liveId: 'cpt_02', revenue: 20570000, hp: 91, orders: 249, accuracy: 92, streak: 52 },
      { rank: 4, name: 'Nguyễn Trí', liveId: 'cpt_04', revenue: 19380000, hp: 89, orders: 236, accuracy: 90, streak: 47 },
      { rank: 5, name: 'Khánh Linh', liveId: 'cpt_07', revenue: 17820000, hp: 86, orders: 221, accuracy: 88, streak: 41 },
    ],
  },
  {
    key: 'shipping',
    accent: 'green',
    icon: <Truck className="h-6 w-6" />,
    metricIcon: <Target className="h-5 w-5" />,
    en: {
      phase: 'Phase 4',
      title: 'Speed Shipping',
      mode: 'Physics Simulation',
      summary: 'Launch packed orders into moving trucks while avoiding system traffic spikes.',
      primaryMetric: 'Delivered Revenue',
      secondaryMetric: 'Delivery Rate',
      winCondition: 'Land boxes inside trucks with clean timing.',
      risk: 'Broken packages trigger refunds and reduce delivery success.',
    },
    vi: {
      phase: 'Phase 4',
      title: 'Vận Chuyển Thần Tốc',
      mode: 'Physics Simulation',
      summary: 'Căn lực bắn hộp hàng vào xe tải đang chạy và né các khối lỗi hệ thống.',
      primaryMetric: 'Doanh thu giao',
      secondaryMetric: 'Tỷ lệ giao hàng',
      winCondition: 'Bắn đơn vào thùng xe với timing chuẩn.',
      risk: 'Hàng vỡ hoặc rơi ngoài sẽ hoàn tiền và giảm tỷ lệ giao.',
    },
    players: [
      { rank: 1, name: 'Nguyễn Trí', liveId: 'cpt_04', revenue: 24890000, hp: 96, orders: 302, accuracy: 98, streak: 71 },
      { rank: 2, name: 'Bảo Nguyên', liveId: 'cpt_03', revenue: 23160000, hp: 94, orders: 287, accuracy: 95, streak: 64 },
      { rank: 3, name: 'Thanh Hoà', liveId: 'cpt_02', revenue: 22410000, hp: 92, orders: 278, accuracy: 93, streak: 59 },
      { rank: 4, name: 'Tuấn Việt', liveId: 'cpt_01', revenue: 21630000, hp: 90, orders: 264, accuracy: 91, streak: 54 },
      { rank: 5, name: 'Hoàng Nam', liveId: 'cpt_08', revenue: 19970000, hp: 88, orders: 246, accuracy: 89, streak: 48 },
    ],
  },
];

const accentClass = {
  blue: {
    text: 'text-brand-blue',
    bg: 'bg-brand-blue',
    soft: 'bg-brand-blue/10',
    border: 'border-brand-blue/20',
    shadow: 'shadow-brand-blue/20',
  },
  purple: {
    text: 'text-brand-purple',
    bg: 'bg-brand-purple',
    soft: 'bg-brand-purple/10',
    border: 'border-brand-purple/20',
    shadow: 'shadow-brand-purple/20',
  },
  orange: {
    text: 'text-brand-orange',
    bg: 'bg-brand-orange',
    soft: 'bg-brand-orange/10',
    border: 'border-brand-orange/20',
    shadow: 'shadow-brand-orange/20',
  },
  green: {
    text: 'text-emerald-600',
    bg: 'bg-emerald-500',
    soft: 'bg-emerald-50',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-500/20',
  },
} as const;

function formatMoney(value: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

function getRankIcon(rank: number) {
  if (rank === 1) {
    return <Crown className="h-5 w-5" />;
  }

  if (rank <= 3) {
    return <Medal className="h-5 w-5" />;
  }

  return <Trophy className="h-4 w-4" />;
}

export default function Leaderboard() {
  const { language } = useLanguage();
  const content = copy[language];
  const [activeKey, setActiveKey] = useState<GameKey>('warehouse');

  const activeBoard = useMemo(
    () => boards.find((board) => board.key === activeKey) ?? boards[0],
    [activeKey],
  );
  const boardContent = activeBoard[language];
  const accent = accentClass[activeBoard.accent];
  const topThree = activeBoard.players.slice(0, 3);
  const bestPlayer = activeBoard.players[0];
  const totalRevenue = activeBoard.players.reduce((sum, player) => sum + player.revenue, 0);
  const averageHp = Math.round(activeBoard.players.reduce((sum, player) => sum + player.hp, 0) / activeBoard.players.length);

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-blue glass">
                <Trophy className="h-4 w-4" />
                {content.badge}
              </div>
              <h1 className="mb-6 font-display text-4xl font-bold leading-tight lg:text-7xl">
                {content.titleA} <br />
                <span className="text-gradient">{content.titleB}</span>
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-gray-500">{content.intro}</p>
            </div>

            <div className="rounded-[2rem] p-6 glass">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{content.filterLabel}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{boardContent.title}</p>
                </div>
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg', accent.bg, accent.shadow)}>
                  {activeBoard.icon}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {boards.map((board) => {
                  const isActive = board.key === activeKey;
                  const itemAccent = accentClass[board.accent];
                  const itemContent = board[language];

                  return (
                    <button
                      key={board.key}
                      type="button"
                      onClick={() => setActiveKey(board.key)}
                      className={cn(
                        'min-h-24 rounded-2xl border p-3 text-left transition-all hover:-translate-y-0.5',
                        isActive
                          ? cn(itemAccent.bg, 'border-transparent text-white shadow-lg', itemAccent.shadow)
                          : 'border-white/70 bg-white/60 text-slate-700 hover:bg-white',
                      )}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        {board.icon}
                        {isActive && <ChevronDown className="h-4 w-4" />}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-80">{itemContent.phase}</div>
                      <div className="mt-1 text-sm font-bold leading-tight">{itemContent.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeBoard.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className={cn('rounded-[2rem] border p-6', accent.soft, accent.border)}>
                  <div className={cn('mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white', accent.bg)}>
                    {activeBoard.metricIcon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{boardContent.primaryMetric}</p>
                  <p className="mt-2 font-display text-3xl font-black">{formatMoney(bestPlayer.revenue)}</p>
                </div>
                <div className="rounded-[2rem] p-6 glass">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-orange neon-border">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{content.orders}</p>
                  <p className="mt-2 font-display text-3xl font-black">{bestPlayer.orders}</p>
                </div>
                <div className="rounded-[2rem] p-6 glass">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 neon-border">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{content.hp}</p>
                  <p className="mt-2 font-display text-3xl font-black">{averageHp}/100</p>
                </div>
                <div className="rounded-[2rem] p-6 glass">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-purple neon-border">
                    <Zap className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{content.revenue}</p>
                  <p className="mt-2 font-display text-3xl font-black">{formatMoney(totalRevenue)}</p>
                </div>
              </div>

              <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[2.5rem] border border-white/50 p-8 glass">
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                      <span className={cn('mb-3 inline-block rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest', accent.soft, accent.text)}>
                        {boardContent.phase} - {boardContent.mode}
                      </span>
                      <h2 className="font-display text-3xl font-bold">{boardContent.title}</h2>
                    </div>
                    <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg', accent.bg, accent.shadow)}>
                      {activeBoard.icon}
                    </div>
                  </div>
                  <p className="mb-8 text-base leading-relaxed text-gray-500">{boardContent.summary}</p>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white/70 p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600">{boardContent.secondaryMetric}</p>
                      <p className="text-sm leading-relaxed text-gray-500">{boardContent.winCondition}</p>
                    </div>
                    <div className="rounded-2xl bg-white/70 p-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-red-500">Risk</p>
                      <p className="text-sm leading-relaxed text-gray-500">{boardContent.risk}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2.5rem] border border-white/50 p-8 glass">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <h2 className="font-display text-3xl font-bold">{content.topSellers}</h2>
                    <span className="rounded-full bg-white/70 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-brand-orange">
                      {content.sync}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {topThree.map((player) => (
                      <div
                        key={player.liveId}
                        className={cn(
                          'relative overflow-hidden rounded-3xl border p-5',
                          player.rank === 1 ? cn(accent.soft, accent.border, 'md:-mt-4') : 'border-white/70 bg-white/65',
                        )}
                      >
                        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/50 blur-2xl" />
                        <div className="relative mb-5 flex items-center justify-between">
                          <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl text-white', player.rank === 1 ? accent.bg : 'bg-slate-900')}>
                            {getRankIcon(player.rank)}
                          </div>
                          <span className="font-display text-3xl font-black">#{player.rank}</span>
                        </div>
                        <h3 className="relative font-display text-xl font-bold">{player.name}</h3>
                        <p className="relative mb-5 text-xs font-bold uppercase tracking-widest text-gray-500">{player.liveId}</p>
                        <p className={cn('relative font-display text-2xl font-black', accent.text)}>{formatMoney(player.revenue)}</p>
                        <div className="relative mt-5 grid grid-cols-2 gap-3 text-xs font-bold text-gray-500">
                          <span>{content.hp}: {player.hp}</span>
                          <span>{content.orders}: {player.orders}</span>
                          <span>{content.accuracy}: {player.accuracy}%</span>
                          <span>{content.streak}: {player.streak}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2.5rem] border border-white/50 glass">
                <div className="flex flex-col gap-4 border-b border-brand-orange/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="font-display text-3xl font-bold">{content.allRanks}</h2>
                  <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <Sparkles className="h-4 w-4 text-brand-orange" />
                    {boardContent.primaryMetric}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse">
                    <thead>
                      <tr className="text-left text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <th className="px-6 py-4">Rank</th>
                        <th className="px-6 py-4">{content.player}</th>
                        <th className="px-6 py-4">{content.liveId}</th>
                        <th className="px-6 py-4">{content.revenue}</th>
                        <th className="px-6 py-4">{content.hp}</th>
                        <th className="px-6 py-4">{content.orders}</th>
                        <th className="px-6 py-4">{content.accuracy}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeBoard.players.map((player) => (
                        <tr key={player.liveId} className="border-t border-brand-orange/10 bg-white/30 transition-colors hover:bg-white/70">
                          <td className="px-6 py-5">
                            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl font-display font-black text-white', player.rank <= 3 ? accent.bg : 'bg-slate-900')}>
                              {player.rank}
                            </div>
                          </td>
                          <td className="px-6 py-5 font-bold">{player.name}</td>
                          <td className="px-6 py-5 text-sm font-bold uppercase tracking-widest text-gray-500">{player.liveId}</td>
                          <td className={cn('px-6 py-5 font-display text-xl font-black', accent.text)}>{formatMoney(player.revenue)}</td>
                          <td className="px-6 py-5">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                              <div className={cn('h-full rounded-full', player.hp >= 90 ? 'bg-emerald-500' : 'bg-brand-orange')} style={{ width: `${player.hp}%` }} />
                            </div>
                            <span className="mt-2 block text-xs font-bold text-gray-500">{player.hp}/100</span>
                          </td>
                          <td className="px-6 py-5 font-bold">{player.orders}</td>
                          <td className="px-6 py-5 font-bold">{player.accuracy}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-10 rounded-[2.5rem] border border-white/50 bg-brand-card p-8 lg:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg', accent.bg, accent.shadow)}>
                    <Target className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="mb-2 font-display text-2xl font-bold">{content.scoringTitle}</h2>
                    <p className="text-sm leading-relaxed text-gray-500">{content.scoring}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LayoutTransition>
  );
}
