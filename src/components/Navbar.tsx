import React from 'react';
import { TailriskedHeroLogo } from './TailriskedHeroLogo';
import { Send, Settings2, ShieldCheck } from 'lucide-react';
import { DEFAULT_TELEGRAM_LINK } from '../data/mockTradingData';

interface NavbarProps {
  telegramUrl: string;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ telegramUrl = DEFAULT_TELEGRAM_LINK, onOpenSettings }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#0A0A0B]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo in signature font */}
        <a href="#" className="flex items-center gap-3 group">
          <TailriskedHeroLogo size="nav" />
        </a>

        {/* Navigation Links with Sophisticated Dark uppercase tracking */}
        <nav className="hidden md:flex items-center gap-7 text-[10px] uppercase tracking-[0.28em] font-medium text-white/50">
          <a href="#macro-newsletters-section" className="hover:text-[#D4AF37] transition-colors">
            Macro Dispatches
          </a>
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">
            Telegram Desk
          </a>
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:inline-flex items-center text-[9px] uppercase tracking-[0.25em] text-white/70 border border-white/15 px-3 py-1.5 rounded-full bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-2 animate-pulse" />
            Macro Desk
          </div>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full text-white/40 hover:text-[#D4AF37] hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-colors cursor-pointer"
            title="Configure Telegram link"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-join-telegram-btn"
            className="group relative inline-flex items-center justify-center cursor-pointer"
          >
            <div className="absolute -inset-0.5 bg-[#D4AF37] opacity-25 blur-sm group-hover:opacity-60 transition-opacity rounded-full" />
            <button className="relative bg-white hover:bg-[#FAF9F6] text-black px-4 py-2 rounded-full font-bold text-[11px] uppercase tracking-wider flex items-center gap-2 transition-transform active:scale-95 shadow-sm">
              <Send className="w-3.5 h-3.5 fill-black" />
              <span>Join Telegram</span>
            </button>
          </a>
        </div>
      </div>
    </header>
  );
};
