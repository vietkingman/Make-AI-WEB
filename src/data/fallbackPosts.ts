import type { BlogPost } from '@/types/blog';

export const fallbackPosts: BlogPost[] = [
  {
    post_id: 'post_idea_001',
    source_idea_id: 'idea_001',
    status: 'PUBLISHED',
    title: 'Vì sao leaderboard game livestream cần tính cả doanh thu và uy tín kênh',
    slug: 'leaderboard-game-livestream-doanh-thu-uy-tin',
    summary:
      'Một leaderboard tốt không chỉ xếp hạng điểm số, mà còn phản ánh doanh thu, uy tín kênh và khả năng xử lý đơn hàng trong phiên live.',
    category: 'Leaderboard',
    tags: ['leaderboard', 'livestream game', 'gamification', 'Google Sheets'],
    cover: '/content/blog/covers/default-cover.svg',
    author: 'Livestream Master Team',
    language: 'vi',
    seo_title: 'Leaderboard livestream game: doanh thu và uy tín kênh',
    seo_description:
      'Tìm hiểu cách Livestream Master thiết kế leaderboard dựa trên doanh thu, uy tín kênh, đơn hàng và độ chính xác.',
    published_at: '2026-06-08',
    published_url: '/blog/leaderboard-game-livestream-doanh-thu-uy-tin',
    image_prompt:
      'A premium ecommerce livestream game leaderboard dashboard with revenue, reputation, and order metrics.',
    content_json: {
      intro:
        'Trong Livestream Master, leaderboard không nên chỉ là một bảng điểm cao nhất. Vì game mô phỏng một phiên livestream bán hàng, thứ hạng cần phản ánh cả kết quả kinh doanh lẫn chất lượng vận hành.',
      sections: [
        {
          heading: 'Doanh thu cho thấy hiệu quả chốt đơn',
          body:
            'Doanh thu là chỉ số dễ hiểu nhất với người chơi và hội đồng chấm điểm. Nó kết nối trực tiếp giữa hành động trong game với mục tiêu thương mại điện tử: bán đúng hàng, chốt đúng lúc và chuyển đơn thành giá trị thật.',
          bullets: ['Gom hàng đúng làm tăng cơ hội bán', 'Chốt đơn tốt làm tăng tổng doanh thu', 'Giao hàng thành công giúp doanh thu được ghi nhận'],
        },
        {
          heading: 'Uy tín kênh giúp leaderboard công bằng hơn',
          body:
            'Nếu chỉ tính tiền, người chơi có thể bỏ qua trải nghiệm khách hàng. Chỉ số uy tín kênh buộc người chơi phải lọc spam cẩn thận, tránh bắn nhầm khách thật và giữ môi trường livestream chuyên nghiệp.',
          bullets: ['Spam bị xử lý đúng giúp kênh sạch', 'Bắn nhầm khách làm tụt HP', 'HP thấp khiến thành tích mất cân bằng'],
        },
        {
          heading: 'Google Sheets phù hợp cho demo đồ án',
          body:
            'Với đồ án TMĐT, Google Sheets giúp nhóm dễ trình bày luồng dữ liệu. Make.com có thể thêm bài blog vào Blog_Storage, còn website đọc dữ liệu qua Apps Script JSONP mà không cần rebuild Netlify.',
        },
      ],
      conclusion:
        'Một leaderboard tốt biến game thành mô hình vận hành có logic: bán được hàng, giữ được uy tín và giao được đơn.',
      cta: {
        label: 'Xem leaderboard',
        href: '/leaderboard',
      },
    },
    content_plain:
      'Leaderboard của Livestream Master nên kết hợp doanh thu, uy tín kênh, số đơn và độ chính xác. Cách này giúp thành tích phản ánh đúng bản chất một phiên livestream commerce.',
  },
  {
    post_id: 'post_idea_002',
    source_idea_id: 'idea_002',
    status: 'READY',
    title: 'Quản lý kho trong game livestream: vì sao QR sản phẩm giúp giảm lỗi đơn hàng',
    slug: 'quan-ly-kho-livestream-qr-san-pham',
    summary:
      'QR sản phẩm giúp người chơi hiểu cách nhận diện hàng hóa, hạn chế nhặt sai sản phẩm và mô phỏng tư duy quản lý kho trong TMĐT.',
    category: 'Warehouse',
    tags: ['warehouse', 'QR sản phẩm', 'inventory', 'livestream commerce'],
    cover: '/content/blog/covers/default-cover.svg',
    author: 'Livestream Master Team',
    language: 'vi',
    seo_title: 'Quản lý kho livestream bằng QR sản phẩm',
    seo_description:
      'Bài viết giải thích cách QR sản phẩm hỗ trợ quản lý kho trong game livestream và giảm lỗi đơn hàng.',
    published_at: '2026-06-08',
    published_url: '/blog/quan-ly-kho-livestream-qr-san-pham',
    image_prompt:
      'A clean futuristic warehouse with QR product scanning, ecommerce boxes, and livestream game UI overlays.',
    content_json: {
      intro:
        'Trong một phiên livestream bán hàng, lỗi kho thường bắt đầu từ việc nhận diện sai sản phẩm. Khi biến bài toán này thành game, QR sản phẩm là một chi tiết nhỏ nhưng giúp gameplay có logic thực tế.',
      sections: [
        {
          heading: 'QR biến sản phẩm thành dữ liệu dễ kiểm tra',
          body:
            'Thay vì chỉ nhìn hình ảnh sản phẩm, người chơi có thể hiểu mỗi món hàng cần có mã định danh. Điều này giống cách doanh nghiệp TMĐT kiểm tra SKU, tồn kho và đơn hàng.',
        },
        {
          heading: 'Gameplay warehouse trở nên có mục tiêu hơn',
          body:
            'Khi mỗi sản phẩm có mã, người chơi không chỉ chạy và nhặt vật phẩm. Họ phải chọn đúng hàng theo yêu cầu, tránh phế liệu và giữ nhịp xử lý trước khi phiên live bắt đầu.',
        },
      ],
      conclusion:
        'QR sản phẩm giúp module warehouse vừa dễ chơi, vừa có giá trị giải thích cho đồ án thương mại điện tử.',
      cta: {
        label: 'Khám phá module warehouse',
        href: '/warehouse',
      },
    },
    content_plain:
      'QR sản phẩm giúp người chơi hiểu cách quản lý SKU, kiểm tra tồn kho và giảm sai sót khi xử lý đơn trong livestream commerce.',
  },
  {
    post_id: 'post_idea_003',
    source_idea_id: 'idea_003',
    status: 'DONE',
    title: 'Cách hệ thống chống spam giúp buổi livestream bán hàng chuyên nghiệp hơn',
    slug: 'he-thong-chong-spam-livestream-ban-hang',
    summary:
      'Spam comment làm mất niềm tin khách hàng. Module chống spam biến việc kiểm duyệt bình luận thành một thử thách phản xạ trong game.',
    category: 'Spam Control',
    tags: ['spam comment', 'moderation', 'livestream bán hàng'],
    cover: '/content/blog/covers/default-cover.svg',
    author: 'Livestream Master Team',
    language: 'vi',
    seo_title: 'Chống spam livestream bán hàng bằng gamification',
    seo_description:
      'Tìm hiểu cách hệ thống chống spam trong Livestream Master giúp mô phỏng kiểm duyệt bình luận livestream.',
    published_at: '2026-06-08',
    published_url: '/blog/he-thong-chong-spam-livestream-ban-hang',
    image_prompt:
      'A vibrant livestream chat moderation interface with spam shields, clean ecommerce dashboard, cyber game style.',
    content_json: null,
    content_plain:
      'Spam comment có thể làm khách thật mất niềm tin. Trong Livestream Master, người chơi điều khiển khiên admin để bắn hạ bình luận độc hại nhưng không được bắn nhầm khách thật. Cơ chế này giúp người chơi hiểu rằng kiểm duyệt không chỉ là xóa comment, mà là bảo vệ trải nghiệm mua hàng.',
  },
];
