export type AssetClass = 'CRYPTO' | 'FX' | 'EQUITIES' | 'INDICES' | 'COMMODITIES' | 'VOLATILITY';

export type TradeDirection = 'LONG' | 'SHORT' | 'VOL_HEDGE';

export type TradeStatus = 'ACTIVE' | 'TRIMMED' | 'CLOSED_WIN' | 'CLOSED_LOSS' | 'BREAKEVEN';

export interface Trade {
  id: string;
  ticker: string;
  assetName: string;
  assetClass: AssetClass;
  direction: TradeDirection;
  entryDate: string;
  entryPrice: number;
  currentPrice: number;
  targetPrice: number;
  stopLoss: number;
  riskRewardRatio: string;
  rMultiple: number; // e.g., +3.8R, -1.0R
  pnlPercent: number; // e.g., +42.5%
  status: TradeStatus;
  sizingRiskPercent: number; // e.g., 1.0% risk
  timeframe: string; // e.g., '4H / Daily'
  thesis: string;
  catalyst: string;
  telegramAlertTime: string;
  chartImageSeed?: string;
  keyLevels: {
    invalidation: string;
    tp1: string;
    tp2: string;
    tp3: string;
  };
}

export interface TelegramPost {
  id: string;
  type: 'TRADE_ALERT' | 'TRADE_UPDATE' | 'MACRO_VOICE' | 'CHART_DISPATCH' | 'PINNED';
  timestamp: string;
  author: string;
  authorTag: string;
  content: string;
  ticker?: string;
  direction?: TradeDirection;
  stats?: {
    views: number;
    reactions: { emoji: string; count: number }[];
  };
  hasChart?: boolean;
  chartDescription?: string;
  voiceNoteDuration?: string;
}

export interface MacroNewsletter {
  id: string;
  issueNumber: number;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  regime: 'VOLATILITY EXPANSION' | 'LIQUIDITY CONTRACTION' | 'ASYMMETRIC REFLATION' | 'CROSS-ASSET BREAKDOWN';
  summary: string[];
  fullContent: string[];
  keyTickers: string[];
  author: string;
}

export interface TrackRecordStats {
  winRate: number;
  profitFactor: number;
  totalR: number;
  averageRR: number;
  sharpeRatio: number;
  maxDrawdown: number;
  openPositionsCount: number;
  totalTrades: number;
  telegramSubscribers: number;
}

export interface EquityPoint {
  date: string;
  rMultiple: number;
  benchmarkR: number;
  note?: string;
}
