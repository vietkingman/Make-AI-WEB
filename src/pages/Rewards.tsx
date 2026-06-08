import { CheckCircle2, Gift, History, Info, LogOut, ShieldCheck, TrendingUp, Wallet, XCircle } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

import LayoutTransition from '@/components/ui/LayoutTransition';
import { useLanguage } from '@/lib/language';
import { authenticateWallet, redeemReward, refreshWallet, type WalletSession } from '@/lib/rewards-api';

const STORAGE_KEY = 'livestream-master-wallet-session';

const copy = {
  en: {
    title: 'Play. Earn. Redeem.',
    intro: 'Players can verify their name and email to unlock wallet money from Google Sheets and use it directly on the website.',
    signInTitle: 'Verify Wallet',
    signInDesc: 'Enter the exact name and email used in the game. If both match the Players sheet, your wallet will unlock.',
    fullName: 'Full Name',
    email: 'Email',
    verify: 'Verify Wallet',
    verifying: 'Verifying...',
    verified: 'Wallet connected successfully.',
    balance: 'Wallet Balance',
    updated: 'Last synced',
    refresh: 'Refresh',
    logout: 'Logout',
    rewards: 'Rewards You Can Buy',
    ownedRewards: 'Owned Products',
    redeem: 'Redeem',
    redeeming: 'Processing...',
    locked: 'Verify to redeem',
    insufficient: 'Not enough money',
    owned: 'Already owned',
    note: 'Gameplay logs are saved into Data. Wallet balance and owned products are stored in Players. Purchase history is saved in Transaction.',
    signedInAs: 'Signed in as',
    notVerified: 'Not verified yet',
    tipsTitle: 'Website Flow',
    tips: [
      'Game logs are appended to Data and player totals are updated in Players.',
      'Website verifies the exact name + email against Players.',
      'Redeem actions deduct balance, update owned items, and save a Transaction row.',
    ],
    successTitle: 'Purchase Successful',
    errorTitle: 'Purchase Failed',
    closePopup: 'Close',
    popupSuccess: 'Reward redeemed and saved to your account.',
    popupError: 'The reward could not be redeemed.',
  },
  vi: {
    title: 'Chơi. Kiếm. Đổi Thưởng.',
    intro: 'Người chơi có thể xác thực đúng tên và email để mở ví từ Google Sheets và dùng trực tiếp trên website.',
    signInTitle: 'Xác Thực Ví',
    signInDesc: 'Nhập đúng name và email đã dùng trong game. Nếu trùng với sheet Players, ví của bạn sẽ được mở.',
    fullName: 'Họ Tên',
    email: 'Email',
    verify: 'Xác Thực Ví',
    verifying: 'Đang xác thực...',
    verified: 'Đã kết nối ví thành công.',
    balance: 'Số Dư Ví',
    updated: 'Đồng bộ lần cuối',
    refresh: 'Làm Mới',
    logout: 'Đăng Xuất',
    rewards: 'Phần Thưởng Có Thể Mua',
    ownedRewards: 'Sản Phẩm Đã Sở Hữu',
    redeem: 'Đổi Ngay',
    redeeming: 'Đang xử lý...',
    locked: 'Cần xác thực',
    insufficient: 'Không đủ số dư',
    owned: 'Đã sở hữu',
    note: 'Log gameplay được lưu vào Data. Số dư ví và sản phẩm đã sở hữu nằm trong Players. Lịch sử mua hàng được lưu ở Transaction.',
    signedInAs: 'Đăng nhập với',
    notVerified: 'Chưa xác thực',
    tipsTitle: 'Luồng Hoạt Động',
    tips: [
      'Game ghi log vào Data và cập nhật tổng điểm, tổng coin trong Players.',
      'Website đối chiếu đúng name + email với Players.',
      'Khi redeem, hệ thống trừ coin, cập nhật sở hữu và lưu thêm một dòng Transaction.',
    ],
    successTitle: 'Mua Thành Công',
    errorTitle: 'Mua Thất Bại',
    closePopup: 'Đóng',
    popupSuccess: 'Phần thưởng đã được lưu vào tài khoản của bạn.',
    popupError: 'Không thể đổi phần thưởng này.',
  },
} as const;

const rewards = [
  { name: '10% Discount', cost: 2000, descEn: 'Valid for all platform products.', descVi: 'Áp dụng cho toàn bộ sản phẩm trên nền tảng.', limited: false },
  { name: '20% Super Deal', cost: 4500, descEn: 'High value for top sellers only.', descVi: 'Giá trị cao dành cho người chơi xuất sắc.', limited: true },
  { name: 'Free Shipping', cost: 3000, descEn: 'Voucher for free nationwide delivery.', descVi: 'Voucher miễn phí giao hàng toàn quốc.', limited: false },
  { name: 'Mystery Box', cost: 6000, descEn: 'Unbox a random premium reward.', descVi: 'Mở hộp bí ẩn với phần thưởng cao cấp ngẫu nhiên.', limited: true },
  { name: '50k VND Coupon', cost: 5000, descEn: 'Direct discount on next order.', descVi: 'Giảm trực tiếp cho đơn tiếp theo.', limited: false },
  { name: 'VIP Chat Accessory', cost: 1500, descEn: 'Show off in your next stream.', descVi: 'Phụ kiện nổi bật cho buổi live tiếp theo.', limited: false },
];

type WalletForm = {
  name: string;
  email: string;
};

type PopupState = {
  kind: 'success' | 'error';
  title: string;
  message: string;
} | null;

function getFriendlyErrorMessage(message: string, language: 'en' | 'vi') {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes('mailapp.sendemail') ||
    normalizedMessage.includes('script.send_mail') ||
    normalizedMessage.includes('authorization')
  ) {
    return language === 'en'
      ? 'Purchase was saved, but Apps Script could not send the email confirmation. Please re-authorize MailApp in Apps Script.'
      : 'Đơn đã được lưu nhưng Apps Script chưa gửi được email xác nhận. Hãy cấp lại quyền MailApp trong Apps Script.';
  }

  if (normalizedMessage.includes('already been purchased')) {
    return language === 'en'
      ? 'This account already owns this reward.'
      : 'Tài khoản này đã sở hữu phần thưởng này.';
  }

  if (normalizedMessage.includes('not enough money')) {
    return language === 'en'
      ? 'Your balance is not enough to buy this reward.'
      : 'Số dư của bạn không đủ để mua phần thưởng này.';
  }

  if (normalizedMessage.includes('wallet not found')) {
    return language === 'en'
      ? 'We could not find this wallet. Please verify the correct name and email.'
      : 'Không tìm thấy ví này. Hãy kiểm tra lại đúng name và email.';
  }

  if (normalizedMessage.includes('name or email is incorrect')) {
    return language === 'en'
      ? 'The name or email is incorrect.'
      : 'Name hoặc email không chính xác.';
  }

  if (normalizedMessage.includes('missing name')) {
    return language === 'en' ? 'Please enter your name.' : 'Vui lòng nhập họ tên.';
  }

  if (normalizedMessage.includes('missing email')) {
    return language === 'en' ? 'Please enter your email.' : 'Vui lòng nhập email.';
  }

  if (normalizedMessage.includes('invalid cost')) {
    return language === 'en' ? 'This reward has an invalid price.' : 'Phần thưởng này đang có giá không hợp lệ.';
  }

  return message;
}

function normalizeWalletSession(session: WalletSession) {
  return {
    ...session,
    ownedItems: Array.isArray(session.ownedItems) ? session.ownedItems : [],
  };
}

function formatDate(value?: string) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

export default function Rewards() {
  const { language } = useLanguage();
  const content = copy[language];
  const [form, setForm] = useState<WalletForm>({ name: '', email: '' });
  const [wallet, setWallet] = useState<WalletSession | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [redeemingItem, setRedeemingItem] = useState<string>('');
  const [popup, setPopup] = useState<PopupState>(null);

  useEffect(() => {
    const storedSession = window.localStorage.getItem(STORAGE_KEY);
    if (!storedSession) {
      return;
    }

    try {
      const session = normalizeWalletSession(JSON.parse(storedSession) as WalletSession);
      setWallet(session);
      setForm({ name: session.name, email: session.email });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persistWallet = (session: WalletSession) => {
    const normalizedSession = normalizeWalletSession(session);

    setWallet(normalizedSession);
    setForm({ name: normalizedSession.name, email: normalizedSession.email });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedSession));
  };

  const clearWallet = () => {
    setWallet(null);
    setStatus('');
    setError('');
    setPopup(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const openPopup = (kind: 'success' | 'error', title: string, message: string) => {
    setPopup({ kind, title, message });
  };

  const handleVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('');
    setIsLoading(true);

    try {
      const response = await authenticateWallet(form);
      if (!response.ok || !response.data) {
        throw new Error(response.message || 'Unable to verify wallet.');
      }

      persistWallet(response.data);
      setStatus(content.verified);
    } catch (requestError) {
      const rawMessage = requestError instanceof Error ? requestError.message : 'Unable to verify wallet.';
      setError(getFriendlyErrorMessage(rawMessage, language));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!wallet) {
      return;
    }

    setError('');
    setStatus('');
    setIsLoading(true);

    try {
      const response = await refreshWallet(wallet);
      if (!response.ok || !response.data) {
        throw new Error(response.message || 'Unable to refresh wallet.');
      }

      persistWallet(response.data);
      setStatus(content.verified);
    } catch (requestError) {
      const rawMessage = requestError instanceof Error ? requestError.message : 'Unable to refresh wallet.';
      setError(getFriendlyErrorMessage(rawMessage, language));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeem = async (itemName: string, cost: number) => {
    if (!wallet) {
      setError(content.locked);
      openPopup('error', content.errorTitle, content.locked);
      return;
    }

    setError('');
    setStatus('');
    setRedeemingItem(itemName);

    try {
      const response = await redeemReward({
        name: wallet.name,
        email: wallet.email,
        itemName,
        cost,
      });

      if (!response.ok || !response.data) {
        throw new Error(response.message || 'Unable to redeem reward.');
      }

      persistWallet(response.data);
      const successMessage = `${itemName}. ${content.popupSuccess}`;
      setStatus(successMessage);
      openPopup('success', content.successTitle, successMessage);
    } catch (requestError) {
      const rawMessage = requestError instanceof Error ? requestError.message : content.popupError;
      const message = getFriendlyErrorMessage(rawMessage, language);
      setError(message);
      openPopup('error', content.errorTitle, message);
    } finally {
      setRedeemingItem('');
    }
  };

  return (
    <LayoutTransition>
      <div className="px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h1 className="mb-6 font-display text-4xl font-bold lg:text-7xl">
              <span className="text-gradient">{content.title}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-500">{content.intro}</p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleVerify} className="rounded-[2.5rem] border border-white/50 p-8 lg:p-10 glass">
              <div className="mb-8">
                <h2 className="mb-3 font-display text-3xl font-bold">{content.signInTitle}</h2>
                <p className="text-gray-500">{content.signInDesc}</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="pl-1 text-xs font-bold uppercase tracking-widest text-gray-500">{content.fullName}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-xl border border-white/70 bg-white/80 px-5 py-4 outline-none transition-all placeholder:text-gray-400 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50"
                    placeholder={language === 'en' ? 'Enter your in-game name' : 'Nhập đúng tên đã dùng trong game'}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="pl-1 text-xs font-bold uppercase tracking-widest text-gray-500">{content.email}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    className="w-full rounded-xl border border-white/70 bg-white/80 px-5 py-4 outline-none transition-all placeholder:text-gray-400 focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/50"
                    placeholder={language === 'en' ? 'Enter the same email from the game' : 'Nhập đúng email đã dùng trong game'}
                    required
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-2xl bg-brand-blue px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-brand-blue/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? content.verifying : content.verify}
                </button>
                {wallet && (
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="rounded-2xl bg-white/80 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-800 transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {content.refresh}
                  </button>
                )}
              </div>

              {(status || error) && (
                <div className={`mt-6 rounded-2xl px-5 py-4 text-sm font-medium ${error ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
                  {error || status}
                </div>
              )}
            </form>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/50 p-8 lg:p-10 glass">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-orange/10 blur-3xl" />
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/20 text-brand-orange">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{content.balance}</p>
                    <p className="text-sm text-gray-500">
                      {wallet ? `${content.signedInAs} ${wallet.name}` : content.notVerified}
                    </p>
                  </div>
                </div>
                {wallet && <TrendingUp className="h-6 w-6 text-brand-orange" />}
              </div>

              <div className="mb-6">
                <div className="font-display text-5xl font-black text-slate-900">
                  {(wallet?.totalMoney ?? 0).toLocaleString()} <span className="text-xl text-brand-orange">MONEY</span>
                </div>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                  {content.updated}: {wallet ? formatDate(wallet.updatedAt) : '-'}
                </p>
              </div>

              <div className="mb-6 rounded-2xl bg-white/70 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500">{content.ownedRewards}</p>
                {wallet && wallet.ownedItems?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {wallet.ownedItems.map((item) => (
                      <span key={item} className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'No owned products yet.' : 'Chưa có sản phẩm đã sở hữu.'}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={!wallet || isLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/80 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <History className="h-4 w-4" />
                  {content.refresh}
                </button>
                <button
                  type="button"
                  onClick={clearWallet}
                  disabled={!wallet}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut className="h-4 w-4" />
                  {content.logout}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">{content.rewards}</h2>
              <div className="rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest glass">
                Google Sheets Live Wallet
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rewards.map((reward) => {
                const isOwned = Boolean(wallet?.ownedItems?.includes(reward.name));
                const canRedeem = Boolean(wallet && wallet.totalMoney >= reward.cost && !redeemingItem && !isOwned);
                const buttonLabel = !wallet
                  ? content.locked
                  : isOwned
                    ? content.owned
                    : wallet.totalMoney < reward.cost
                      ? content.insufficient
                      : redeemingItem === reward.name
                        ? content.redeeming
                        : content.redeem;

                return (
                  <div key={reward.name} className="rounded-3xl border border-white/50 p-6 transition-all hover:border-brand-orange/30 glass">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-orange neon-border">
                        <Gift className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {reward.limited && (
                          <span className="rounded-full bg-brand-orange px-3 py-1 text-[10px] font-black uppercase text-white shadow-lg shadow-brand-orange/20">
                            Limited
                          </span>
                        )}
                        {isOwned && (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase text-emerald-700">
                            {content.owned}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="mb-2 font-display text-xl font-bold">{reward.name}</h3>
                    <p className="mb-8 text-sm leading-relaxed text-gray-500">
                      {language === 'en' ? reward.descEn : reward.descVi}
                    </p>

                    <div className="flex items-center justify-between border-t border-brand-orange/10 pt-6">
                      <div className="font-display text-2xl font-black text-brand-orange">
                        {reward.cost.toLocaleString()} <span className="text-[10px]">MONEY</span>
                      </div>
                      <button
                        type="button"
                        disabled={!canRedeem || redeemingItem === reward.name}
                        onClick={() => handleRedeem(reward.name, reward.cost)}
                        className="rounded-xl bg-brand-orange/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-orange shadow-inner transition-all hover:bg-brand-orange hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {buttonLabel}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[3rem] border border-white/50 bg-brand-card p-12 lg:p-20">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-3xl font-bold">{content.tipsTitle}</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {content.tips.map((tip, index) => (
                <div key={tip} className="rounded-2xl p-6 glass">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/15 text-brand-blue">
                    {index === 0 && <ShieldCheck className="h-5 w-5" />}
                    {index === 1 && <Wallet className="h-5 w-5" />}
                    {index === 2 && <Gift className="h-5 w-5" />}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">{tip}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-start gap-4 rounded-2xl p-6 glass">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
              <p className="text-sm leading-relaxed text-gray-500">{content.note}</p>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/35 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
            <div className="mb-5 flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${popup.kind === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {popup.kind === 'success' ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">{popup.title}</h3>
                <p className="text-sm text-gray-500">{popup.kind === 'success' ? content.popupSuccess : content.popupError}</p>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">{popup.message}</p>
            <button
              type="button"
              onClick={() => setPopup(null)}
              className="w-full rounded-2xl bg-brand-blue px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-xl shadow-brand-blue/20 transition-all hover:scale-[1.02]"
            >
              {content.closePopup}
            </button>
          </div>
        </div>
      )}
    </LayoutTransition>
  );
}
