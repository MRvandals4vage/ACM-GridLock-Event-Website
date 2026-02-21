'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
    return (
        <section
            className="relative w-full min-h-screen z-20 flex items-center justify-center overflow-hidden bg-black"
            id="about"
        >
            {/* Video background - Autoplay & Loop */}
            <div className="absolute inset-0 w-full h-full z-0">
                <video
                    src="/assets/animations/legbattle.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                />
            </div>

            {/* Dark overlay gradients for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-10"></div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-7xl font-black font-orbitron text-white mb-8 tracking-wider drop-shadow-lg">
                        MISSION BRIEFING
                    </h2>

                    <div className="space-y-6 md:space-y-8">
                        <p className="text-xl md:text-3xl text-gray-200 leading-relaxed font-light">
                            The war between the <span className="text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Rangers</span> and{' '}
                            <span className="text-red-500 font-bold drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">Lord Zedd's forces</span> has raged for years.
                        </p>

                        <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
                            Neither side can gain the upper hand. Every battle ends in a draw.
                            Every strategy is countered. The conflict has reached an eternal impasse.
                        </p>

                        <motion.div
                            className="py-4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <p className="text-3xl md:text-5xl text-white font-bold font-orbitron tracking-widest uppercase">
                                This is <span className="text-cyan-400 text-glow-blue">GRID</span><span className="text-red-500 text-glow-red">LOCK</span>.
                            </p>
                        </motion.div>

                        <p className="text-base md:text-xl text-gray-400 italic max-w-2xl mx-auto border-t border-white/10 pt-6">
                            We need fresh minds. New strategies. Your intelligence could tip the balance.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
