'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Shared background component used across all sections
const SharedBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 h-full w-full bg-[#0B0F1A] z-0 overflow-hidden">
            {/* Megazord on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden">
                <img
                    src="/assets/megazord.png"
                    alt="Megazord"
                    className="absolute h-full w-auto object-cover object-right opacity-15 mix-blend-screen"
                    style={{ filter: 'hue-rotate(200deg) saturate(1.0) brightness(0.7)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0F1A]/70 to-[#0B0F1A]"></div>
            </div>

            {/* Lord Zedd on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
                <img
                    src="/assets/Lord_Zeed_BTFG.webp"
                    alt="Lord Zedd"
                    className="absolute h-full w-auto object-cover object-left opacity-15 mix-blend-screen"
                    style={{ filter: 'hue-rotate(340deg) saturate(0.7) brightness(0.6)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B0F1A]/70 to-[#0B0F1A]"></div>
            </div>

            {/* Cool blue gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-cyan-950/20"></div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.08]" style={{
                backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
            }}></div>

            {/* Cold radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/8 via-blue-900/5 to-transparent"></div>

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40"></div>
        </div>
    );
};

const CodeathonSection: React.FC = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-20">
            {/* Content */}
            <div className="relative z-10 max-w-7xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left side - Heading */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-4">
                            <div className="h-1 w-20 bg-cyan-500 mb-8"></div>
                            <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-white font-orbitron tracking-tight">
                                CODEATHON
                            </h2>
                            <p className="text-2xl md:text-3xl text-cyan-400 font-light tracking-wide">
                                Build Under Pressure.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right side - Glass card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Main explanation card */}
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-8 shadow-2xl">
                            <div className="space-y-4 text-gray-300">
                                <p className="text-lg leading-relaxed">
                                    Teams build a <span className="text-white font-semibold">working prototype</span> to solve real-world problem statements.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Architect <span className="text-cyan-400 font-semibold">scalable solutions</span> and present your vision to industry judges.
                                </p>
                            </div>
                        </div>

                        {/* What You'll Be Asked To Do */}
                        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-8 shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-6 font-orbitron tracking-wide">
                                What You'll Be Asked To Do
                            </h3>
                            <ul className="space-y-3">
                                {['System design', 'Implementation', 'Optimization', 'Presentation'].map((item, index) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-3 text-gray-300"
                                    >
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                        <span className="text-lg">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const CTFSection: React.FC = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-20">
            {/* Content */}
            <div className="relative z-10 max-w-7xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {/* Heading */}
                    <div className="text-center space-y-4">
                        <div className="h-1 w-20 bg-red-500 mx-auto mb-8"></div>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white font-orbitron tracking-tight">
                            CAMPUS CTF HUNT
                        </h2>
                        <p className="text-2xl md:text-3xl text-red-400 font-light tracking-wide">
                            Solve. Decode. Extract.
                        </p>
                    </div>

                    {/* Two column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
                        {/* Main explanation - spans 2 columns */}
                        <div className="lg:col-span-2 backdrop-blur-md bg-white/5 border border-red-500/20 rounded-lg p-8 shadow-2xl hover:border-red-500/40 transition-colors duration-300">
                            <div className="space-y-4 text-gray-300">
                                <p className="text-lg leading-relaxed">
                                    A <span className="text-white font-semibold">live, campus-wide competition</span> where teams face timed riddle-solving challenges.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Compete on a <span className="text-red-400 font-semibold">real-time leaderboard</span> as you solve riddles to extract keys.
                                </p>
                                <div className="pt-4 border-t border-white/10 mt-6">
                                    <p className="text-sm text-gray-400 italic">
                                        Key submission format required for validation
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Arena Stats panel */}
                        <div className="backdrop-blur-md bg-white/5 border border-red-500/20 rounded-lg p-8 shadow-2xl hover:border-red-500/40 transition-colors duration-300">
                            <h3 className="text-xl font-bold text-white mb-6 font-orbitron tracking-wide border-b border-red-500/30 pb-3">
                                Arena Stats
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Duration', value: '3.5 Hours' },
                                    { label: 'Format', value: 'Campus Hunt' },
                                    { label: 'Team Size', value: '2–4' },
                                    { label: 'Leaderboard', value: 'Live' }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                                        <span className="text-white font-bold">{stat.value}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const KeysSection: React.FC = () => {
    const keys = [
        {
            title: 'INTELLIGENCE',
            description: 'Gather data, analyze patterns, exploit weaknesses'
        },
        {
            title: 'DECRYPTION',
            description: 'Break codes, reverse engineer, unlock secrets'
        },
        {
            title: 'CONTROL',
            description: 'Dominate systems, execute commands, claim victory'
        }
    ];

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 py-20">
            {/* Content */}
            <div className="relative z-10 max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center space-y-16"
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white font-orbitron tracking-tight">
                            THE THREE KEYS
                        </h2>
                        <p className="text-xl text-gray-400">
                            Master these to break the stalemate
                        </p>
                    </div>

                    {/* Three cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {keys.map((key, index) => (
                            <motion.div
                                key={key.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="group backdrop-blur-md bg-white/5 border-t-2 border-cyan-500 border-x border-b border-white/10 rounded-lg p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white font-orbitron tracking-wide group-hover:text-cyan-400 transition-colors duration-300">
                                        {key.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {key.description}
                                    </p>
                                </div>
                                {/* Hover glow effect */}
                                <div className="absolute inset-0 rounded-lg bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-300 pointer-events-none"></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const MissionStructure: React.FC = () => {
    return (
        <div id="intel" className="relative w-full">
            {/* Fixed background that stays constant while scrolling through Mission Structure */}
            <SharedBackground />

            {/* Content sections */}
            <div className="relative z-10">
                <CodeathonSection />
                <CTFSection />
                <KeysSection />
            </div>
        </div>
    );
};

export default MissionStructure;
