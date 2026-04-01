'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegistrationsClosed() {
    return (
        <main className="relative min-h-screen bg-background-dark font-display overflow-hidden flex items-center justify-center p-6 uppercase tracking-wider">
            {/* Background Stardust Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:20px_20px] z-10"></div>
            
            {/* Scanline Effect */}
            <div className="fixed inset-0 pointer-events-none z-20 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[2px] animate-scanline"></div>

            <div className="relative z-30 max-w-2xl w-full text-center space-y-12">
                {/* Status Indicator */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-3 text-secondary italic font-bold">
                        <span className="material-icons animate-pulse">error_outline</span>
                        SYSTEM ALERT: CONNECTIVITY TERMINATED
                    </div>
                    <div className="h-[2px] w-48 bg-secondary shadow-[0_0_15px_#FF1744]"></div>
                </motion.div>

                {/* Main Heading */}
                <div className="space-y-4">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-black italic tracking-tighter text-white"
                    >
                        REGISTRATIONS <br />
                        <span className="text-secondary drop-shadow-[0_0_20px_#FF1744]">ARE CLOSED</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-gray-400 font-body normal-case tracking-normal max-w-lg mx-auto leading-relaxed"
                    >
                        The mobilization phase has concluded. All squad frequencies are locked and encrypted. No further operatives can be deployed at this time.
                    </motion.p>
                </div>

                {/* Return Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <Link href="/">
                        <button className="group relative px-10 py-4 bg-transparent border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-all duration-300">
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="material-icons group-hover:-translate-x-1 transition-transform">arrow_back</span>
                                RETURN TO BASE
                            </span>
                            <div className="absolute top-0 right-0 w-2 h-2 bg-primary"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary"></div>
                        </button>
                    </Link>
                </motion.div>

                {/* Decorative Elements */}
                <div className="pt-20 opacity-30 select-none">
                    <div className="text-[10px] space-y-2 font-mono text-gray-500">
                        <p>ACCESSCODE: [REDACTED]</p>
                        <p>TIMESTAMP: {new Date().toISOString()}</p>
                        <p>STATUS: MISSION_LOCKED</p>
                    </div>
                </div>
            </div>

            {/* Corner UI */}
            <div className="fixed top-10 left-10 hidden md:block z-40 opacity-50">
                <div className="flex items-center gap-2 text-primary font-display text-xs tracking-widest uppercase">
                    <span className="material-icons text-sm">grid_view</span>
                    SYSTEM: RESTRICTED
                </div>
            </div>

            <style jsx global>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }
            `}</style>
        </main>
    );
}
