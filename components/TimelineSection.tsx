'use client';

import { Timeline } from './Timeline';

const eventData = [
    {
        title: "9:00 – 9:30",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-3 font-orbitron">Registration</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Check-in and team verification. Secure your access keys and prepare for deployment.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-cyan-300">
                        <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        <span className="font-orbitron">Check-in Active</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "9:30 – 10:00",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                    <h4 className="text-2xl font-bold text-purple-400 mb-3 font-orbitron">Opening Brief + Rules</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Mission overview, environment setup, and engagement protocols. Understanding the rules is the difference between victory and stalemate.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "10:00 – 12:15",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/60 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                    <h4 className="text-2xl font-bold text-blue-400 mb-3 font-orbitron">Round 1 – Codathon</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The primary construction phase. Architect and implement your core solution to the tactical problems presented.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "12:20 – 1:30",
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
        title: "1:30 – 2:45",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-red-500/30 rounded-xl p-6 hover:border-red-400/60 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                    <h4 className="text-2xl font-bold text-red-400 mb-3 font-orbitron">Round 2 – 3-Node Rotation</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        High-speed tactical rotation. Coordinate with your team to secure and maintain control over critical network nodes.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "2:45 – 3:45",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                    <h4 className="text-2xl font-bold text-green-400 mb-3 font-orbitron">Round 3 – GPS Precision Capture</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Final field engagement. Deploy precision capture techniques to secure geographical assets and tip the scales.
                    </p>
                </div>
            </div>
        ),
    },
    {
        title: "3:45 – 4:00",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-400/60 transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
                    <h4 className="text-2xl font-bold text-yellow-400 mb-3 font-orbitron">Results + Closing</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Data finalization and victor announcement. The stalemate is broken.
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
