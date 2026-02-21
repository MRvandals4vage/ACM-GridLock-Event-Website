'use client';

import { Timeline } from './Timeline';

const recruitmentData = [
    {
        title: "Feb 17",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-3 font-orbitron">Applications Open</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The recruitment portal goes live. Warriors from all corners can submit their applications to join the elite ranks.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-cyan-300">
                        <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        <span className="font-orbitron">Portal Active</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Feb 21",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-red-500/30 rounded-xl p-6 hover:border-red-400/60 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                    <h4 className="text-2xl font-bold text-red-400 mb-3 font-orbitron">Applications Close</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The gates close. All submissions are locked in and the selection process begins. Only the worthy will advance.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-red-300">
                        <span className="inline-block w-2 h-2 bg-red-400 rounded-full"></span>
                        <span className="font-orbitron">Deadline: 11:59 PM</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Feb 22",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                    <h4 className="text-2xl font-bold text-cyan-400 mb-3 font-orbitron">Shortlist Released</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The first wave of candidates is revealed. Those who made the cut will be notified and prepared for the next phase.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-cyan-300">
                        <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        <span className="font-orbitron">Check Your Status</span>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Feb 23-24",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
                    <h4 className="text-2xl font-bold text-purple-400 mb-3 font-orbitron">Interview Rounds</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Face-to-face evaluation begins. Shortlisted candidates will demonstrate their skills, knowledge, and determination in structured interviews.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="bg-black/50 rounded-lg p-3 border border-purple-500/20">
                            <p className="text-xs text-purple-300 font-orbitron">Day 1</p>
                            <p className="text-sm text-gray-300">Technical Assessment</p>
                        </div>
                        <div className="bg-black/50 rounded-lg p-3 border border-purple-500/20">
                            <p className="text-xs text-purple-300 font-orbitron">Day 2</p>
                            <p className="text-sm text-gray-300">Final Evaluation</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Feb 25",
        content: (
            <div className="space-y-4">
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-green-500/30 rounded-xl p-6 hover:border-green-400/60 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                    <h4 className="text-2xl font-bold text-green-400 mb-3 font-orbitron">Final Results</h4>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The chosen ones are announced. New recruits join the ranks and prepare to enter the Grid. The stalemate will be broken.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-green-300">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="font-orbitron">Welcome to Gridlock</span>
                    </div>
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
            <Timeline data={recruitmentData} />
        </section>
    );
}
