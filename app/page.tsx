'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import RegistrationModal from '@/components/RegistrationModal';
import IntelligencePanel from '@/components/IntelligencePanel';
import { NavbarComponent } from '@/components/NavbarComponent';
import AboutSection from '@/components/AboutSection';
import MissionStructure from '@/components/MissionStructure';
import TimelineSection from '@/components/TimelineSection';


export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [intelligence, setIntelligence] = useState<string | null>(null);


    const handleRegisterClick = () => {
        setIsModalOpen(true);
    };

    const handleIntelGenerated = (intel: string) => {
        setIntelligence(intel);
        setIsModalOpen(false);
    };



    return (
        <main className="relative min-h-screen bg-background-dark font-body select-none">


            {/* Main App with fade-in */}
            <div
                className="min-h-screen relative"
            >
                {/* Background Stardust Overlay */}
                <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:20px_20px] z-10"></div>

                {/* UI Elements */}
                <div className="fixed top-10 left-10 hidden md:block z-40 opacity-50">
                    <div className="flex items-center gap-2 text-primary font-display text-xs tracking-widest uppercase">
                        <span className="material-icons text-sm">grid_view</span>
                        SYSTEM: ONLINE
                    </div>
                    <div className="w-24 h-[1px] bg-primary mt-1 shadow-[0_0_10px_#00E5FF]"></div>
                </div>

                <div className="fixed bottom-10 right-10 hidden md:block z-40 opacity-50 text-right">
                    <div className="flex items-center justify-end gap-2 text-secondary font-display text-xs tracking-widest uppercase">
                        THREAT LEVEL: CRITICAL
                        <span className="material-icons text-sm">warning</span>
                    </div>
                    <div className="w-24 h-[1px] bg-secondary mt-1 ml-auto shadow-[0_0_10px_#FF1744]"></div>
                </div>

                {/* Navbar */}
                <NavbarComponent onRegister={handleRegisterClick} />

                {/* Main Content */}
                <HeroSection onRegister={handleRegisterClick} />
                <AboutSection />
                <MissionStructure />
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
        </main>
    );
}
