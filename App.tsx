
import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import RegistrationModal from './components/RegistrationModal';
import IntelligencePanel from './components/IntelligencePanel';
import { NavbarComponent } from './components/NavbarComponent';
import AboutSection from './components/AboutSection';
import MissionStructure from './components/MissionStructure';
import TimelineSection from './components/TimelineSection';
import IntroSequence from './components/IntroSequence';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intelligence, setIntelligence] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleIntelGenerated = (intel: string) => {
    setIntelligence(intel);
    setIsModalOpen(false);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {/* Intro Sequence */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      {/* Main App with fade-in */}
      <div
        className="min-h-screen relative font-body select-none transition-opacity duration-[400ms]"
        style={{
          opacity: showIntro ? 0 : 1,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Background Stardust Overlay - Optimized */}
        <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:20px_20px] z-10"></div>

        {/* UI Elements */}
        <div className="fixed top-10 left-10 hidden md:block z-40 opacity-50">
          <div className="flex items-center gap-2 text-primary font-display text-xs tracking-widest">
            <span className="material-icons text-sm">grid_view</span>
            SYSTEM: ONLINE
          </div>
          <div className="w-24 h-[1px] bg-primary mt-1"></div>
        </div>

        <div className="fixed bottom-10 right-10 hidden md:block z-40 opacity-50 text-right">
          <div className="flex items-center justify-end gap-2 text-secondary font-display text-xs tracking-widest">
            THREAT LEVEL: CRITICAL
            <span className="material-icons text-sm">warning</span>
          </div>
          <div className="w-24 h-[1px] bg-secondary mt-1 ml-auto"></div>
        </div>

        {/* Navbar */}
        <NavbarComponent onRegister={handleRegisterClick} />

        {/* Main Content */}
        <HeroSection onRegister={handleRegisterClick} />

        {/* About Section with Scroll-Synced Video */}
        <AboutSection />

        {/* Mission Structure - Codeathon, CTF, Three Keys */}
        <MissionStructure />

        {/* Recruitment Timeline */}
        <TimelineSection />

        {/* Intelligence Result Section */}
        {intelligence && (
          <IntelligencePanel
            content={intelligence}
            onClose={() => setIntelligence(null)}
          />
        )}

        {/* Modals */}
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onIntelGenerated={handleIntelGenerated}
        />
      </div>
    </>
  );
};

export default App;
