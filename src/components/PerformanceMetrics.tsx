import React from 'react';
import { TRACK_RECORD_STATS, EQUITY_CURVE } from '../data/mockTradingData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, ShieldCheck, Zap, Activity, BarChart3, Award } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16" id="performance-section">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold">
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Statistical Edge & Asymmetry</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Asymmetric Equity Curve
        </h2>
        <p className="text-[#E5E5E5]/60 text-sm md:text-base font-light">
          Our cumulative return expressed in R-multiples (risk units). We risk 1R to capture 3R to 8R on fat-tail volatility dislocations.
        </p>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
          <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">WIN RATE</div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            {TRACK_RECORD_STATS.winRate}%
          </div>
          <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono mt-1">
            High conviction
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
          <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">PROFIT FACTOR</div>
          <div className="text-2xl font-black text-[#D4AF37] font-mono mt-2">
            {TRACK_RECORD_STATS.profitFactor}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
            Gross gains / losses
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
          <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">TOTAL R CAPTURED</div>
          <div className="text-2xl font-black text-[#D4AF37] font-mono mt-2">
            +{TRACK_RECORD_STATS.totalR}R
          </div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
            Risk units net
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
          <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">AVG RISK/REWARD</div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            1 : {TRACK_RECORD_STATS.averageRR}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
            Tail convexity
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
          <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">SHARPE RATIO</div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            {TRACK_RECORD_STATS.sharpeRatio}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
            Risk-adjusted
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-colors">
          <div className="text-white/40 text-[10px] uppercase tracking-wider font-mono">MAX DRAWDOWN</div>
          <div className="text-2xl font-black text-white/70 font-mono mt-2">
            -{TRACK_RECORD_STATS.maxDrawdown}%
          </div>
          <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
            Strict defense
          </div>
        </div>
      </div>

      {/* Interactive Equity Curve Chart Container */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              <span>Cumulative Performance vs. Benchmark (in R units)</span>
            </h3>
            <p className="text-xs text-white/40 font-mono mt-0.5">
              1R = 1.0% portfolio risk per trade allocation.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <span className="w-3 h-0.5 bg-[#D4AF37] rounded-full" />
              Tailrisked (+94.6R)
            </span>
            <span className="flex items-center gap-1.5 text-white/40">
              <span className="w-3 h-0.5 bg-white/30 rounded-full" />
              Equal Weight (+15.4R)
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={EQUITY_CURVE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tailriskGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="#888888" fontSize={11} tickLine={false} />
              <YAxis stroke="#888888" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}R`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-2xl border border-white/[0.1] bg-[#0A0A0C] p-3.5 shadow-2xl font-mono text-xs space-y-1 backdrop-blur-xl">
                        <div className="text-white/50 font-bold">{data.date}</div>
                        <div className="text-[#D4AF37] font-extrabold text-sm">
                          Tailrisked: +{data.rMultiple}R
                        </div>
                        <div className="text-white/40">
                          Benchmark: +{data.benchmarkR}R
                        </div>
                        {data.note && (
                          <div className="text-[11px] text-white/70 pt-1.5 border-t border-white/[0.08]">
                            Key Event: {data.note}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="rMultiple"
                stroke="#D4AF37"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#tailriskGradient)"
              />
              <Area
                type="monotone"
                dataKey="benchmarkR"
                stroke="#666666"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
