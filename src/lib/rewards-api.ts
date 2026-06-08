const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwcYbJtBoixm3_GB07LTNsghFZaRF01bwHP1o7B13MQMUfG7z5ox1jV9Z13WknLx15YSw/exec';

type ApiResponse<T> = {
  ok: boolean;
  message?: string;
  data?: T;
};

type RawWalletSession = {
  name?: string;
  email?: string;
  money?: number;
  coins?: number;
  balance?: number;
  totalCoins?: number;
  updatedAt?: string;
  lastPlayed?: string;
  ownedItems?: string[];
};

export type WalletUser = {
  name: string;
  email: string;
};

export type WalletSession = WalletUser & {
  totalMoney: number;
  updatedAt?: string;
  ownedItems: string[];
};

export type RedeemPayload = WalletUser & {
  itemName: string;
  cost: number;
  note?: string;
};

function normalizeWalletSession(session: RawWalletSession): WalletSession {
  const totalMoney = [
    session.totalCoins,
    session.coins,
    session.money,
    session.balance,
  ].find((value) => typeof value === 'number' && Number.isFinite(value));

  return {
    name: String(session.name || '').trim(),
    email: String(session.email || '').trim(),
    totalMoney: totalMoney ?? 0,
    updatedAt: session.updatedAt || session.lastPlayed,
    ownedItems: Array.isArray(session.ownedItems) ? session.ownedItems : [],
  };
}

async function request<T>(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      query.set(key, String(value));
    }
  });

  const response = await fetch(`${APPS_SCRIPT_URL}?${query.toString()}`, {
    method: 'GET',
  });

  const text = await response.text();

  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    throw new Error(text || 'Invalid Apps Script response');
  }
}

async function requestWallet(params: Record<string, string | number | undefined>) {
  const response = await request<RawWalletSession>(params);

  return {
    ...response,
    data: response.data ? normalizeWalletSession(response.data) : undefined,
  } as ApiResponse<WalletSession>;
}

export async function authenticateWallet(user: WalletUser) {
  return requestWallet({
    action: 'auth',
    name: user.name.trim(),
    email: user.email.trim(),
  });
}

export async function redeemReward(payload: RedeemPayload) {
  return requestWallet({
    action: 'redeem',
    name: payload.name.trim(),
    email: payload.email.trim(),
    itemName: payload.itemName,
    cost: payload.cost,
    note: payload.note,
  });
}

export async function refreshWallet(user: WalletUser) {
  return requestWallet({
    action: 'balance',
    name: user.name.trim(),
    email: user.email.trim(),
  });
}
