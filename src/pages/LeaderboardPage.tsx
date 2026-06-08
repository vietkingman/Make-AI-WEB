import { BarChart3 } from 'lucide-react';

import ModulePage from '@/pages/ModulePage';

export default function LeaderboardPage() {
  return (
    <ModulePage
      eyebrow="Revenue ranking"
      title="Leaderboard doanh thu và uy tín kênh"
      description="Bảng xếp hạng tổng hợp hiệu quả livestream bằng doanh thu, HP kênh, số đơn giao thành công và accuracy, phù hợp để trình bày dữ liệu đồ án."
      icon={BarChart3}
      metrics={[
        { label: 'Primary', value: 'Revenue' },
        { label: 'Quality', value: 'HP' },
        { label: 'Ops', value: 'Orders' },
      ]}
      bullets={[
        'Sắp xếp theo doanh thu trước, sau đó dùng uy tín kênh và số đơn giao thành công để phân hạng công bằng hơn.',
        'Hỗ trợ 4 phase game: gom hàng, lọc spam, chốt đơn và vận chuyển.',
        'Có thể lấy dữ liệu từ Google Sheets để demo dashboard trước hội đồng.',
        'Leaderboard giúp kết nối gameplay với logic thương mại điện tử thực tế.',
      ]}
    />
  );
}
