import React from 'react';
import { Send, Shield, Zap, TrendingUp, Lock, RefreshCw, Eye } from 'lucide-react';
import { DEFAULT_TELEGRAM_LINK } from '../data/mockTradingData';

interface EdgePhilosophyProps {
  telegramUrl: string;
}

export const EdgePhilosophy: React.FC<EdgePhilosophyProps> = ({
  telegramUrl = DEFAULT_TELEGRAM_LINK,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16" id="philosophy-section">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold">
          <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Our Trading Mandate</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          How Tailrisked Prices Asymmetry
        </h2>
        <p className="text-[#E5E5E5]/60 text-base md:text-lg leading-relaxed font-light">
          Most market participants spend their energy attempting to predict the future. We structure trades where we can be wrong frequently and still generate outsized returns through positive convexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Pillar 1 */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 space-y-4 relative overflow-hidden hover:border-[#D4AF37]/30 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">
            1. Strictly Capped 1R Downside
          </h3>
          <p className="text-sm text-[#E5E5E5]/60 leading-relaxed font-light">
            Every trade is entered with a mathematically calculated stop loss based on market structure invalidation. We never add to losers, never widen stops, and never take open-ended risk. Downside is strictly fixed.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">
            Max Risk: 1.0% equity per idea
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 space-y-4 relative overflow-hidden hover:border-[#D4AF37]/30 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">
            2. Fat-Tail Right-Skew Upside
          </h3>
          <p className="text-sm text-[#E5E5E5]/60 leading-relaxed font-light">
            We target trades with at least 3:1 to 8:1 asymmetric payoff profiles. Through cheap out-of-the-money options hedges, volatility breakouts, and macro momentum runners, our winners dwarf standard swings.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">
            Average R:R: 1 : 3.65
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 space-y-4 relative overflow-hidden hover:border-[#D4AF37]/30 transition-all shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37]">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">
            3. Zero Hindsight Public Proof
          </h3>
          <p className="text-sm text-[#E5E5E5]/60 leading-relaxed font-light">
            Every execution signal is broadcast live in Telegram before entry fills. When stops are hit, they are logged immediately. No edited posts, no cherry-picked winning trades, 100% public accountability.
          </p>
          <div className="pt-2 text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">
            Public ledger since day 1
          </div>
        </div>
      </div>
    </div>
  );
};
