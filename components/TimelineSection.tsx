'use client';

import { Timeline } from './Timeline';

const eventData = [
    {
        title: "9:00 AM – 11:00 AM",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-3 font-orbitron">Registration & Codeathon (Part 1)</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Check-in, team verification, and the start of the primary construction phase. Architect and implement your core solution.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "11:00 AM – 11:30 AM",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-400/60 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
                    <h4 className="text-2xl font-bold text-yellow-400 mb-3 font-orbitron">Refreshments Break</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Recharge your energy levels before heading back for the rest of the codeathon.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "11:30 AM – 12:00 PM",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-3 font-orbitron">Codeathon (Part 2)</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Finalize your designs and complete the technical challenges.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "12:00 PM – 1:00 PM",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-500/30 rounded-xl p-6 hover:border-gray-400/60 transition-all duration-300 shadow-lg hover:shadow-gray-500/20">
                    <h4 className="text-2xl font-bold text-gray-400 mb-3 font-orbitron">Lunch Break</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Strategic refuel. Analyze the first phase performance and recalibrate for the afternoon assault.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "1:30 PM – 5:00 PM",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-red-500/30 rounded-xl p-6 hover:border-red-400/60 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                    <h4 className="text-2xl font-bold text-red-400 mb-3 font-orbitron">Campus CTF Hunt</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        High-speed tactical rotation. Solve riddles across the campus to extract keys and break the stalemate.
                    </p>
                </div>
            </div>
        ),
    },
];

export default function TimelineSection() {
    return (
        <section
            id="timeline"
            className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-black via-black to-red-950/10"
        >
            <Timeline data={eventData} />
        </section>
    );
}
