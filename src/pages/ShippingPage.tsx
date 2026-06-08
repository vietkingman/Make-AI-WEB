import { Truck } from 'lucide-react';

import ModulePage from '@/pages/ModulePage';

export default function ShippingPage() {
  return (
    <ModulePage
      eyebrow="Phase 4"
      title="Shipping và fulfillment thần tốc"
      description="Module shipping biến việc giao hàng thành bài toán căn lực, timing và né lỗi hệ thống, giúp người chơi hiểu chuỗi cung ứng sau khi chốt đơn."
      icon={Truck}
      metrics={[
        { label: 'Mode', value: 'Physics' },
        { label: 'Goal', value: 'Deliver' },
        { label: 'Risk', value: 'Refund' },
      ]}
      bullets={[
        'Đơn hàng chỉ được ghi nhận khi hộp vào đúng xe tải giao hàng.',
        'Traffic spike hoặc lỗi hệ thống làm đơn rơi, hỏng hoặc bị hoàn tiền.',
        'Delivery rate là chỉ số vận hành quan trọng bên cạnh doanh thu.',
        'Module này nối gameplay với supply chain và fulfillment trong TMĐT.',
      ]}
      ctaLabel="Đọc blog về shipping"
    />
  );
}
