import React, { useState } from 'react';
import { Trade, AssetClass, TradeStatus } from '../types';
import { RECENT_TRADES, DEFAULT_TELEGRAM_LINK } from '../data/mockTradingData';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Shield, Target, AlertTriangle, Send, X, ExternalLink, Calendar, ChevronRight } from 'lucide-react';

interface TradingJournalProps {
  telegramUrl: string;
}

export const TradingJournal: React.FC<TradingJournalProps> = ({
  telegramUrl = DEFAULT_TELEGRAM_LINK,
}) => {
  const [selectedAssetClass, setSelectedAssetClass] = useState<AssetClass | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<TradeStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTradeModal, setActiveTradeModal] = useState<Trade | null>(null);

  const filteredTrades = RECENT_TRADES.filter((trade) => {
    const matchesAsset = selectedAssetClass === 'ALL' || trade.assetClass === selectedAssetClass;
    const matchesStatus = selectedStatus === 'ALL' || trade.status === selectedStatus;
    const matchesSearch =
      trade.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trade.thesis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAsset && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: TradeStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            Active Runner
          </span>
        );
      case 'TRIMMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Trimmed (Risk-Free)
          </span>
        );
      case 'CLOSED_WIN':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-white/[0.05] border border-white/15 text-white/80">
            Closed Win
          </span>
        );
      case 'CLOSED_LOSS':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-rose-950/40 border border-rose-500/30 text-rose-400">
            Stopped (-1R)
          </span>
        );
      case 'BREAKEVEN':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-white/[0.03] border border-white/10 text-white/50">
            Breakeven
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16" id="trading-journal-section">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Transparent Public Execution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Verified Public Trading Ledger
          </h2>
          <p className="text-[#E5E5E5]/60 text-sm md:text-base mt-1.5 max-w-2xl font-light">
            Every trade is timestamped in Telegram before entry. No deleted records, zero hindsight bias, and strict mathematical risk parameters.
          </p>
        </div>

        {/* Telegram Funnel Badge */}
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center"
        >
          <div className="absolute -inset-0.5 bg-[#D4AF37] opacity-25 blur-sm group-hover:opacity-60 transition-opacity rounded-full" />
          <button className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F6] text-black font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm">
            <Send className="w-3.5 h-3.5 fill-black" />
            <span>Get Next Entry Alert</span>
          </button>
        </a>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl mb-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search ticker, asset, or macro catalyst..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/60 transition-colors font-mono"
            />
          </div>

          {/* Quick Stats Summary */}
          <div className="flex items-center gap-4 text-xs font-mono text-white/40 self-end sm:self-center">
            <span>Showing <strong className="text-white">{filteredTrades.length}</strong> of {RECENT_TRADES.length} trades</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:inline text-[#D4AF37] font-semibold uppercase tracking-wider text-[10px]">Strict 1R Risk Capped</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.05]">
          <span className="text-[10px] uppercase tracking-wider font-mono text-white/40 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#D4AF37]" /> Asset:
          </span>
          {(['ALL', 'CRYPTO', 'VOLATILITY', 'FX', 'COMMODITIES', 'INDICES'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedAssetClass(cat)}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono transition-all cursor-pointer ${
                selectedAssetClass === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-white/[0.02] text-white/50 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-white/10 mx-2 hidden sm:block" />

          {/* Status Filter */}
          <span className="text-[10px] uppercase tracking-wider font-mono text-white/40 mr-1 hidden sm:inline">Status:</span>
          {(['ALL', 'ACTIVE', 'TRIMMED', 'CLOSED_WIN', 'CLOSED_LOSS'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-semibold'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrades.map((trade) => {
          const isPositive = trade.rMultiple > 0;
          return (
            <div
              key={trade.id}
              onClick={() => setActiveTradeModal(trade)}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-[#D4AF37]/40 hover:bg-white/[0.035] p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between backdrop-blur-xl shadow-lg"
            >
              <div>
                {/* Header: Ticker, Direction & Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-white font-mono tracking-tight group-hover:text-[#D4AF37] transition-colors">
                        {trade.ticker}
                      </span>
                      <span
                        className={`text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full font-semibold ${
                          trade.direction === 'LONG'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                            : trade.direction === 'SHORT'
                            ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                            : 'bg-purple-950/60 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        {trade.direction}
                      </span>
                    </div>
                    <div className="text-xs text-[#E5E5E5]/50 font-sans mt-0.5">
                      {trade.assetName}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {getStatusBadge(trade.status)}
                    <span className="text-[10px] text-white/40 font-mono">
                      {trade.timeframe}
                    </span>
                  </div>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-white/[0.025] border border-white/[0.06] font-mono text-xs mb-3">
                  <div>
                    <div className="text-white/40 text-[9px] uppercase tracking-wider">ENTRY</div>
                    <div className="text-[#E5E5E5] font-medium">${trade.entryPrice.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-white/40 text-[9px] uppercase tracking-wider">CURRENT/EXIT</div>
                    <div className="text-white font-semibold">${trade.currentPrice.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/40 text-[9px] uppercase tracking-wider">R-MULTIPLE</div>
                    <div className={`font-bold ${isPositive ? 'text-[#D4AF37]' : 'text-rose-400'}`}>
                      {trade.rMultiple > 0 ? `+${trade.rMultiple}R` : `${trade.rMultiple}R`}
                    </div>
                  </div>
                </div>

                {/* Thesis Preview */}
                <p className="text-xs text-[#E5E5E5]/60 line-clamp-2 leading-relaxed mb-4 font-light">
                  {trade.thesis}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Calendar className="w-3 h-3 text-[#D4AF37]" />
                  <span>{trade.entryDate}</span>
                </span>
                <span className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 text-[11px] font-sans font-medium">
                  Inspect Thesis & Levels <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trade Detail Modal */}
      {activeTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/[0.1] bg-[#0A0A0C] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto backdrop-blur-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveTradeModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-white font-mono">
                  {activeTradeModal.ticker}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full font-semibold ${
                    activeTradeModal.direction === 'LONG'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : activeTradeModal.direction === 'SHORT'
                      ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                      : 'bg-purple-950/60 text-purple-400 border border-purple-500/30'
                  }`}
                >
                  {activeTradeModal.direction}
                </span>
                {getStatusBadge(activeTradeModal.status)}
              </div>
              <div className="text-sm text-white/50">
                {activeTradeModal.assetName} · Alerted on Telegram at{' '}
                <span className="text-[#D4AF37] font-mono">{activeTradeModal.telegramAlertTime}</span>
              </div>
            </div>

            {/* Execution Levels Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-6 font-mono text-xs">
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider">ENTRY LEVEL</div>
                <div className="text-white text-sm font-semibold">${activeTradeModal.entryPrice.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider">STOP LOSS</div>
                <div className="text-rose-400 text-sm font-semibold">${activeTradeModal.stopLoss.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider">TARGET PRICE</div>
                <div className="text-emerald-400 text-sm font-semibold">${activeTradeModal.targetPrice.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-wider">NET RESULT</div>
                <div className={`text-sm font-bold ${activeTradeModal.rMultiple > 0 ? 'text-[#D4AF37]' : 'text-rose-400'}`}>
                  {activeTradeModal.rMultiple > 0 ? `+${activeTradeModal.rMultiple}R` : `${activeTradeModal.rMultiple}R`} ({activeTradeModal.pnlPercent > 0 ? `+${activeTradeModal.pnlPercent}%` : `${activeTradeModal.pnlPercent}%`})
                </div>
              </div>
            </div>

            {/* Invalidation & Targets */}
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#D4AF37]/20 space-y-2">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono text-[#D4AF37]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>PRE-DETERMINED INVALIDATION (STRICT 1R RISK)</span>
                </div>
                <p className="text-sm text-[#E5E5E5] font-mono">
                  {activeTradeModal.keyLevels.invalidation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono text-white/70">
                  <Target className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>TAKE PROFIT SCALING STRUCTURE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">TP 1</span>
                    <span className="text-white/90">{activeTradeModal.keyLevels.tp1}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">TP 2</span>
                    <span className="text-white/90">{activeTradeModal.keyLevels.tp2}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">TP 3 (RUNNER)</span>
                    <span className="text-[#D4AF37] font-semibold">{activeTradeModal.keyLevels.tp3}</span>
                  </div>
                </div>
              </div>

              {/* Macro Thesis */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                  Macro & Volatility Thesis
                </h4>
                <p className="text-sm text-[#E5E5E5]/80 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06] font-light">
                  {activeTradeModal.thesis}
                </p>
              </div>

              {/* Macro Catalyst */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                  Fundamental / Quantitative Catalyst
                </h4>
                <p className="text-sm text-[#E5E5E5]/80 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06] font-light">
                  {activeTradeModal.catalyst}
                </p>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
              <div className="text-xs text-white/40 font-mono text-center sm:text-left">
                Position risk sized strictly to {activeTradeModal.sizingRiskPercent}% account equity.
              </div>

              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto group relative inline-flex items-center justify-center"
              >
                <div className="absolute -inset-0.5 bg-[#D4AF37] opacity-30 blur-sm group-hover:opacity-60 transition-opacity rounded-full" />
                <button className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#FAF9F6] text-black font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer">
                  <Send className="w-3 h-3 fill-black" />
                  <span>Discuss On Telegram Desk</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
