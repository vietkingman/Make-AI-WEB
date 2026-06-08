import { WalletCards } from 'lucide-react';

import ModulePage from '@/pages/ModulePage';

export default function RewardsPage() {
  return (
    <ModulePage
      eyebrow="Retention loop"
      title="Rewards và ví thưởng người chơi"
      description="Hệ thống rewards chuyển thành tích trong game thành động lực chơi lại: voucher, item, quyền lợi VIP và tracking giao dịch trong Google Sheets."
      icon={WalletCards}
      metrics={[
        { label: 'Wallet', value: 'Coins' },
        { label: 'Reward', value: 'Voucher' },
        { label: 'Loop', value: 'Replay' },
      ]}
      bullets={[
        'Người chơi có thể đổi điểm hoặc tiền game thành phần thưởng mô phỏng voucher.',
        'Google Sheets có thể lưu Players, Blog_Storage và Transaction để trình bày dữ liệu.',
        'Rewards giúp giải thích gamification và retention trong dự án.',
        'Module phù hợp để nối website, gameplay và database thành một luồng hoàn chỉnh.',
      ]}
      ctaLabel="Đọc blog về gamification"
    />
  );
}
