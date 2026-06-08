import { PackageCheck } from 'lucide-react';

import ModulePage from '@/pages/ModulePage';

export default function OrdersPage() {
  return (
    <ModulePage
      eyebrow="Phase 3"
      title="Xử lý đơn hàng realtime"
      description="Trong Mega Sale, mã chốt đơn rơi liên tục. Người chơi phải bắt đúng đơn, giữ nhịp xử lý và biến tương tác live thành doanh thu."
      icon={PackageCheck}
      metrics={[
        { label: 'Mode', value: 'Platform' },
        { label: 'Signal', value: 'Order' },
        { label: 'Value', value: 'GMV' },
      ]}
      bullets={[
        'Mô phỏng pain point khi nhiều đơn đổ về cùng lúc trong livestream.',
        'Đơn bị bỏ lỡ được xem như khách hủy hoặc mất lượt chốt.',
        'Doanh thu tăng khi người chơi bắt đúng mã chốt đơn liên tục.',
        'Logic này giúp bài thuyết trình dễ liên hệ với order management.',
      ]}
      ctaLabel="Đọc blog về đơn hàng"
    />
  );
}
