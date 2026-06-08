import { Bug, Gift, Handshake, Info, MessageSquare, Send } from 'lucide-react';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';

const copy = {
  en: {
    title: 'Connect With Us',
    intro: "Have a question about the game or your rewards? We're here to help.",
    formTitle: 'Send a Message',
    labels: ['Full Name', 'Email Address', 'Reason for Contact', 'Message'],
    placeholders: ['John Doe', 'john@example.com', 'How can we help you master the stream?'],
    options: ['General Inquiry', 'Report a Bug', 'Voucher Support', 'Partnership'],
    submit: 'Send Message',
    supportItems: [
      ['Report a Bug', 'Found something broken in the warehouse? Let our testers know.'],
      ['Partnership', "Interested in featuring your brand's vouchers? Reach out."],
      ['Voucher Support', "Issues with redeeming your hard-earned coins? We're on it."],
      ['Game Feedback', 'Share your ideas to improve the platformer and shooter modes.'],
    ],
    note: 'Support response time is typically within 24-48 hours. For urgent account issues, please use our Discord channel.',
  },
  vi: {
    title: 'Kết Nối Cùng Chúng Tôi',
    intro: 'Bạn có câu hỏi về game hoặc phần thưởng? Chúng tôi sẵn sàng hỗ trợ.',
    formTitle: 'Gửi Tin Nhắn',
    labels: ['Họ Tên', 'Địa Chỉ Email', 'Lý Do Liên Hệ', 'Nội Dung'],
    placeholders: ['Nguyễn Văn A', 'ban@example.com', 'Chúng tôi có thể hỗ trợ bạn như thế nào?'],
    options: ['Hỏi Đáp Chung', 'Báo Lỗi', 'Hỗ Trợ Voucher', 'Hợp Tác'],
    submit: 'Gửi Ngay',
    supportItems: [
      ['Báo Lỗi', 'Phát hiện lỗi trong kho hàng? Hãy báo cho đội tester biết.'],
      ['Hợp Tác', 'Muốn đưa voucher thương hiệu của bạn vào game? Hãy liên hệ.'],
      ['Hỗ Trợ Voucher', 'Gặp vấn đề khi đổi thưởng? Chúng tôi sẽ xử lý.'],
      ['Đóng Góp Ý Tưởng', 'Chia sẻ ý tưởng để cải thiện chế độ platformer và shooter.'],
    ],
    note: 'Thời gian phản hồi thường trong 24-48 giờ. Nếu tài khoản gặp vấn đề khẩn cấp, vui lòng dùng kênh Discord.',
  },
} as const;

export default function Contact() {
  const { language } = useLanguage();
  const content = copy[language];
  const icons = [Bug, Handshake, Gift, MessageSquare];

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h1 className="mb-6 font-display text-4xl font-bold lg:text-7xl">
              {content.title.split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{content.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-500">{content.intro}</p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="order-2 rounded-[2.5rem] border-white/50 p-8 lg:order-1 lg:col-span-2 lg:p-12 glass">
              <h2 className="mb-8 font-display text-3xl font-bold">{content.formTitle}</h2>
              <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="pl-1 text-xs font-bold uppercase tracking-widest text-gray-500">{content.labels[0]}</label>
                    <input type="text" placeholder={content.placeholders[0]} className="w-full rounded-xl border border-white/70 bg-white/80 px-5 py-4 outline-none transition-all placeholder:text-gray-400 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="pl-1 text-xs font-bold uppercase tracking-widest text-gray-500">{content.labels[1]}</label>
                    <input type="email" placeholder={content.placeholders[1]} className="w-full rounded-xl border border-white/70 bg-white/80 px-5 py-4 outline-none transition-all placeholder:text-gray-400 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="pl-1 text-xs font-bold uppercase tracking-widest text-gray-500">{content.labels[2]}</label>
                  <select className="w-full cursor-pointer appearance-none rounded-xl border border-white/70 bg-white/80 px-5 py-4 outline-none transition-all focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50">
                    {content.options.map((option) => <option key={option}>{option}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="pl-1 text-xs font-bold uppercase tracking-widest text-gray-500">{content.labels[3]}</label>
                  <textarea rows={5} placeholder={content.placeholders[2]} className="w-full resize-none rounded-xl border border-white/70 bg-white/80 px-5 py-4 outline-none transition-all placeholder:text-gray-400 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50" />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-blue px-10 py-5 text-lg font-bold text-white shadow-xl shadow-brand-blue/20 transition-all hover:scale-105 sm:w-auto">
                  <Send className="h-5 w-5" />
                  {content.submit}
                </button>
              </form>
            </div>

            <div className="order-1 space-y-6 lg:order-2">
              {content.supportItems.map((item, index) => {
                const Icon = icons[index];
                return (
                  <div key={item[0]} className="flex items-start gap-6 rounded-3xl border-white/50 p-6 transition-all group hover:bg-white/90 glass">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white neon-border">
                      <Icon className={`h-6 w-6 ${index === 0 ? 'text-red-400' : index === 1 ? 'text-brand-blue' : index === 2 ? 'text-brand-orange' : 'text-brand-purple'}`} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-display text-lg font-bold">{item[0]}</h3>
                      <p className="text-sm leading-relaxed text-gray-500">{item[1]}</p>
                    </div>
                  </div>
                );
              })}

              <div className="relative mt-8 overflow-hidden rounded-[2rem] border-brand-orange/20 p-8 glass">
                <div className="absolute right-0 top-0 p-4">
                  <Info className="h-5 w-5 text-brand-orange/30" />
                </div>
                <p className="text-xs italic leading-relaxed text-gray-500">{content.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTransition>
  );
}
