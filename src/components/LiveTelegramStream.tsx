import React, { useState } from 'react';
import { Send, Pin, Volume2, Play, Pause, ExternalLink, CheckCheck, MessageSquare, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';
import { TELEGRAM_FEED, DEFAULT_TELEGRAM_LINK } from '../data/mockTradingData';
import { TelegramPost } from '../types';

interface LiveTelegramStreamProps {
  telegramUrl: string;
}

export const LiveTelegramStream: React.FC<LiveTelegramStreamProps> = ({
  telegramUrl = DEFAULT_TELEGRAM_LINK,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ALERTS' | 'UPDATES' | 'MACRO'>('ALL');

  const filteredFeed = TELEGRAM_FEED.filter((post) => {
    if (activeFilter === 'ALERTS') return post.type === 'TRADE_ALERT';
    if (activeFilter === 'UPDATES') return post.type === 'TRADE_UPDATE';
    if (activeFilter === 'MACRO') return post.type === 'MACRO_VOICE' || post.type === 'CHART_DISPATCH';
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16" id="telegram-stream-section">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span>Direct Telegram Desk Wire</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Live Trading Floor & Dispatches
          </h2>
          <p className="text-[#E5E5E5]/60 text-sm mt-1.5 font-light">
            Unfiltered preview of live entries, stops, trims, and macro notes dispatched to subscribers.
          </p>
        </div>

        {/* Filter Badges & Join Action */}
        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'ALERTS', 'UPDATES', 'MACRO'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'bg-white/[0.025] text-white/50 hover:text-white border border-white/[0.08]'
              }`}
            >
              {filter === 'ALL' ? 'All Dispatches' : filter}
            </button>
          ))}

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="stream-header-join-btn"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 text-[10px] font-bold uppercase tracking-wider transition-colors"
          >
            <Send className="w-3 h-3 fill-[#D4AF37]" />
            <span>Open Desk</span>
          </a>
        </div>
      </div>

      {/* Telegram Channel Container (Stylized Phone/Desktop Chat Surface) */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#0A0A0C]/90 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Telegram App Header Bar */}
        <div className="bg-white/[0.02] px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-black border border-[#D4AF37]/40 flex items-center justify-center font-bold text-[#D4AF37] font-['Rock_3D',_sans-serif] text-xs">
              TR
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#0A0A0C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">Tailrisked Trading Floor</span>
                <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                  Verified
                </span>
              </div>
              <div className="text-[11px] text-white/40 font-mono">
                5,180 subscribers · 142 online · Live trading desk
              </div>
            </div>
          </div>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center"
          >
            <div className="absolute -inset-0.5 bg-[#D4AF37] opacity-25 blur-sm group-hover:opacity-50 transition-opacity rounded-full" />
            <button className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-[#FAF9F6] text-black font-bold text-[10px] uppercase tracking-widest transition-transform active:scale-95 cursor-pointer shadow-sm">
              <Send className="w-3 h-3 fill-black" />
              <span>Join Channel</span>
            </button>
          </a>
        </div>

        {/* Telegram Messages List */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[620px] overflow-y-auto font-sans">
          {filteredFeed.map((post) => (
            <div
              key={post.id}
              className={`relative rounded-2xl p-4 sm:p-5 text-sm transition-all ${
                post.type === 'PINNED'
                  ? 'bg-[#D4AF37]/[0.04] border border-[#D4AF37]/25'
                  : post.type === 'TRADE_ALERT'
                  ? 'bg-white/[0.025] border border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                  : post.type === 'TRADE_UPDATE'
                  ? 'bg-emerald-950/15 border border-emerald-500/25'
                  : 'bg-white/[0.015] border border-white/[0.06]'
              }`}
            >
              {/* Pinned Tag if applicable */}
              {post.type === 'PINNED' && (
                <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-mono mb-2 pb-2 border-b border-white/[0.06]">
                  <Pin className="w-3.5 h-3.5 rotate-45 text-[#D4AF37]" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold">Pinned Announcement</span>
                </div>
              )}

              {/* Author & Timestamp */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#D4AF37] text-xs sm:text-sm">
                    {post.author}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">
                    {post.authorTag}
                  </span>
                </div>
                <span className="text-[11px] text-white/40 font-mono">
                  {post.timestamp}
                </span>
              </div>

              {/* Message Content */}
              <div className="text-[#E5E5E5]/90 whitespace-pre-line leading-relaxed font-sans text-[13px] sm:text-sm">
                {post.content}
              </div>

              {/* Chart Visual Dispatch Simulation */}
              {post.hasChart && (
                <div className="mt-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-mono text-[11px]">{post.chartDescription}</span>
                  </div>
                  <span className="text-[9px] text-[#D4AF37] font-mono uppercase bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20 font-semibold tracking-wider">
                    4K Chart Attached
                  </span>
                </div>
              )}

              {/* Voice Note Simulation */}
              {post.voiceNoteDuration && (
                <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center cursor-pointer hover:bg-[#F3E5AB] transition-colors shadow-sm"
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                  </button>
                  <div className="flex-1 space-y-1">
                    {/* Simulated Waveform */}
                    <div className="flex items-center gap-0.5 h-5">
                      {[12, 24, 18, 30, 14, 28, 22, 16, 26, 34, 20, 15, 29, 31, 19, 14, 27, 33, 18, 12].map((height, i) => (
                        <div
                          key={i}
                          style={{ height: `${height}px` }}
                          className={`w-1 rounded-full transition-all ${
                            isPlayingAudio ? 'bg-[#D4AF37] animate-pulse' : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider font-mono text-white/40 flex justify-between">
                      <span>{isPlayingAudio ? 'Playing snippet...' : 'Macro Voice Memo'}</span>
                      <span>{post.voiceNoteDuration}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reactions & Seen Footer */}
              <div className="mt-3 pt-2.5 flex items-center justify-between text-xs text-white/40 font-mono border-t border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  {post.stats?.reactions.map((r, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] text-white/70"
                    >
                      <span>{r.emoji}</span>
                      <span>{r.count}</span>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
                  <span>{post.stats?.views.toLocaleString()} views</span>
                  <CheckCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Telegram Footer Input Funnel Bar */}
        <div className="bg-white/[0.02] p-4 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white/60 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Live entries and stops are published exclusively via Telegram push notifications.</span>
          </div>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="stream-bottom-join-btn"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center shrink-0"
          >
            <div className="absolute -inset-0.5 bg-[#D4AF37] opacity-30 blur-sm group-hover:opacity-60 transition-opacity rounded-full" />
            <button className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#FAF9F6] text-black font-bold text-[11px] uppercase tracking-widest transition-colors cursor-pointer">
              <Send className="w-3 h-3 fill-black" />
              <span>Get Instant Alerts</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
