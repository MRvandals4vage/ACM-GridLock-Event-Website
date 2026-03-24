'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
    return (
        <section
            className="relative w-full min-h-screen z-20 flex flex-col items-center justify-center overflow-hidden bg-black py-20"
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
                    className="w-full h-full object-cover opacity-50"
                />
            </div>

            {/* Dark overlay gradients for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center max-w-6xl mx-auto"
                >
                    <h2 className="text-4xl md:text-7xl font-black font-orbitron text-white mb-12 tracking-wider drop-shadow-lg text-center">
                        MISSION BRIEFING
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
                        {/* Left Side: Description */}
                        <div className="space-y-8 text-left">
                            <p className="text-2xl md:text-4xl text-white font-bold font-orbitron tracking-widest uppercase">
                                This is <span className="text-cyan-400 text-glow-blue">GRID</span><span className="text-red-500 text-glow-red">LOCK</span>.
                            </p>

                            <div className="space-y-6">
                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                    GRIDLOCK is a multi-stage technical adventure challenge that simulates restoring a corrupted digital grid system across campus.
                                </p>
                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                    Teams must decode, calculate, and navigate through three power sectors before executing a final campus CTF hunt.
                                </p>

                                <ul className="space-y-4 pt-4">
                                    {[
                                        { icon: 'code', text: 'Competitive coding' },
                                        { icon: 'psychology', text: 'Logical puzzle solving' },
                                        { icon: 'location_on', text: 'Campus-based coordinate hunt' },
                                        { icon: 'gps_fixed', text: 'GPS precision-based final capture' }
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + i * 0.1 }}
                                            className="flex items-center gap-4 text-cyan-400 font-display tracking-widest text-sm md:text-base"
                                        >
                                            <span className="material-icons text-primary">{item.icon}</span>
                                            {item.text}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Side: Data Panel */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden group w-full">
                            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                            <h3 className="text-xl font-bold text-cyan-400 mb-8 font-orbitron tracking-widest border-b border-white/10 pb-4 uppercase">
                                Encounter Data
                            </h3>

                            <div className="space-y-6">
                                {[
                                    { label: 'Organized by', value: 'ACM SIGCHI Student Chapter – SRM' },
                                    { label: 'Venue', value: 'TP413' },
                                    { label: 'Theme', value: 'Power Rangers' },
                                    { label: 'Date', value: '2nd April 2026' },
                                    { label: 'Time', value: '9:00 AM – 5:00 PM' },
                                    { label: 'Team Size', value: '2–4 Members' },
                                    { label: 'Winners', value: 'Top 3 Teams' }
                                ].map((detail, i) => (
                                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-3">
                                        <span className="text-gray-400 text-sm font-display uppercase tracking-widest">{detail.label}</span>
                                        <span className="text-white font-bold md:text-right">{detail.value}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-gray-500 italic mt-8 text-center uppercase tracking-tighter">
                                All assets must be secured within designated protocol windows.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
