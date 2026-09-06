import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A0A0B] py-12 px-4 mt-12 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-3xl font-black text-white font-['Rock_3D',_cursive,_sans-serif] tracking-wider mb-2 drop-shadow-[0_2px_12px_rgba(212,175,55,0.2)]">
            tailrisked
          </div>
          <p className="text-[#E5E5E5]/50 text-xs max-w-md font-sans leading-relaxed font-light">
            Tailrisked is a public trading journal. None of the views or opinions expressed by any contributors are intended to be taken as financial advice.
          </p>
        </div>

        <div className="text-xs font-mono text-white/40">
          © {new Date().getFullYear()} Tailrisked. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

