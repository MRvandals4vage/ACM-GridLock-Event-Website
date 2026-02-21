
import React from 'react';
import GlitchText from './GlitchText';

interface HeroSectionProps {
  onRegister: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onRegister }) => {
  return (
    <main className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden bg-background-dark">
      {/* Background Image - Behind everything */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Ranger Background"
          className="w-full h-full object-cover opacity-100"
          src="/assets/ranger bg.png"
        />
      </div>

      {/* Left Profile - The Human / Villain Side */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden z-10">
        <div className="absolute inset-0 bg-background-light mix-blend-multiply opacity-80"></div>
        <img
          alt="Lord Zedd Profile"
          className="absolute bottom-0 right-0 h-[100%] md:h-[105%] w-auto object-cover object-right md:translate-x-12 opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 z-10 transform scale-x-[-1] filter hover:brightness-110"
          src="/assets/lord zedd.png"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-secondary/20 z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-20"></div>
      </div>

      {/* Right Profile - The Ranger Side */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden z-10">
        <div className="absolute inset-0 bg-background-dark mix-blend-multiply opacity-80"></div>
        <img
          alt="Red Ranger Profile"
          className="absolute bottom-0 left-0 h-[85%] md:h-[95%] w-auto object-cover object-left md:-translate-x-12 opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 z-10 transform scale-x-[-1] filter hover:brightness-110"
          src="/assets/red mighty morphin.png"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background-dark via-transparent to-primary/20 z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-20"></div>
      </div>

      {/* Center UI Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center w-full max-w-4xl text-center px-4">
        {/* Animated Center Line */}
        <div className="hidden md:block absolute top-[-50vh] bottom-[-50vh] w-[2px] bg-gradient-to-b from-transparent via-accent to-transparent crack-effect opacity-80 animate-pulse-slow left-1/2 -translate-x-1/2 -z-10"></div>

        <p className="text-sm md:text-base tracking-[0.6em] text-gray-400 uppercase mb-4 font-semibold animate-pulse">
          ACM SIGCHI presents
        </p>

        <div className="font-display text-7xl md:text-[10rem] font-black italic tracking-tighter mb-4 relative group cursor-default flex items-center justify-center">
          <span className="text-white drop-shadow-2xl">GRID</span>
          <GlitchText speed={0.5} enableShadows={true} className="lock-title">
            LOCK
          </GlitchText>
        </div>

        <p className="text-xl md:text-3xl font-light tracking-widest text-gray-300 mb-12 max-w-2xl mx-auto drop-shadow-lg font-body uppercase">
          The War Has Reached a <span className="font-bold text-white border-b-2 border-accent">Stalemate.</span>
        </p>

        <button
          onClick={onRegister}
          className="group relative px-12 py-5 bg-background-dark text-white font-display font-bold uppercase tracking-[0.2em] border-2 border-primary hover:bg-primary/10 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.4)] active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-3">
            Register for Intel
            <span className="material-icons text-lg group-hover:translate-x-2 transition-transform duration-300">shield</span>
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-transform duration-700 ease-in-out"></div>
          {/* Glowing corners */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary group-hover:scale-150 transition-transform"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary group-hover:scale-150 transition-transform"></div>
        </button>
      </div>

      {/* Top/Bottom Vignettes */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background-dark to-transparent pointer-events-none z-40"></div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background-dark to-transparent pointer-events-none z-40"></div>
    </main>
  );
};

export default HeroSection;
