import React from 'react';
import { TailriskedHeroLogo } from './components/TailriskedHeroLogo';
import { MacroNewsletters } from './components/MacroNewsletters';
import { Footer } from './components/Footer';

// UPDATE THIS CONSTANT TO PLUG IN YOUR CUSTOM DISCORD OR TELEGRAM LINK
const DISCORD_LINK = 'https://discord.gg/tailrisked';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E5E5E5] selection:bg-[#D4AF37] selection:text-black overflow-x-hidden font-sans flex flex-col justify-between">
      {/* Subtle grid pattern background */}
      <div 
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Main Single-Page Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-12 md:pt-16 pb-12 flex flex-col items-center space-y-8">
        {/* The Hero Logo */}
        <div className="w-full flex justify-center py-2 mb-10 sm:mb-16 md:mb-20">
          <TailriskedHeroLogo size="hero" />
        </div>

        {/* Public Trading Journal & CTA Section */}
        <div className="w-full">
          <MacroNewsletters telegramUrl={DISCORD_LINK} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
