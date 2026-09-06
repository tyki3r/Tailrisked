import React from 'react';
import { DEFAULT_TELEGRAM_LINK } from '../data/mockTradingData';
import { Send, ArrowUpRight, Activity, Radio, BookOpen } from 'lucide-react';

interface MacroNewslettersProps {
  telegramUrl?: string;
}

export const MacroNewsletters: React.FC<MacroNewslettersProps> = ({
  telegramUrl = DEFAULT_TELEGRAM_LINK,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto" id="journal-section">
      <div className="relative rounded-[2rem] border border-white/[0.06] bg-[#0A0A0B]/80 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden">
        {/* Subtle sleek gradient accent instead of heavy glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-50" />
        
        {/* CTA Section */}
        <div className="relative z-10 flex flex-col items-center text-center py-2 sm:py-6">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 sm:mb-8">
            Join the Club
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl mx-auto mb-10 text-left">
            <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
              <div className="p-2.5 rounded-full bg-white/[0.04] w-fit">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-[15px] font-semibold text-white/90 leading-snug">
                  Real-time trades
                </h4>
                <p className="text-xs sm:text-sm text-[#E5E5E5]/50 leading-relaxed font-light">
                  Entries, exits, and updates sent in real-time.
                </p>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
              <div className="p-2.5 rounded-full bg-white/[0.04] w-fit">
                <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-[15px] font-semibold text-white/90 leading-snug">
                  Livestreams
                </h4>
                <p className="text-xs sm:text-sm text-[#E5E5E5]/50 leading-relaxed font-light">
                  Live scalping during NY session.
                </p>
              </div>
            </div>
            
            <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors flex flex-col items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
              <div className="p-2.5 rounded-full bg-white/[0.04] w-fit">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-[15px] font-semibold text-white/90 leading-snug">
                  Market memos
                </h4>
                <p className="text-xs sm:text-sm text-[#E5E5E5]/50 leading-relaxed font-light">
                  Regular notes and updates on macro shifts.
                </p>
              </div>
            </div>
          </div>
          
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm sm:text-base tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            <Send className="w-4 h-4 fill-black" />
            <span>Join the discord</span>
            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
};
