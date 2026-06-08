import { Boxes } from 'lucide-react';

import ModulePage from '@/pages/ModulePage';

export default function WarehousePage() {
  return (
    <ModulePage
      eyebrow="Phase 1"
      title="Warehouse QR và gom hàng vào kho"
      description="Module kho mô phỏng việc nhặt đúng sản phẩm hot-trend, tránh phế liệu và hiểu cách định danh hàng hóa bằng SKU/QR trong livestream commerce."
      icon={Boxes}
      metrics={[
        { label: 'Mode', value: 'Runner' },
        { label: 'Data', value: 'SKU' },
        { label: 'Goal', value: 'Stock' },
      ]}
      bullets={[
        'Người chơi phải nhận diện đúng sản phẩm mục tiêu trước khi phiên live bắt đầu.',
        'QR/SKU giúp giải thích cách doanh nghiệp giảm lỗi nhặt sai hàng.',
        'Va chạm hoặc nhặt nhầm làm giảm tồn kho và ảnh hưởng phase sau.',
        'Module phù hợp để trình bày chủ đề inventory tracking trong TMĐT.',
      ]}
      ctaLabel="Đọc bài về quản lý kho"
    />
  );
}
