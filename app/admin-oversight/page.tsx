'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Participant {
    id: string;
    name: string;
    reg_no: string;
    email: string;
    phone: string;
    department: string;
    year: string;
    is_leader: boolean;
}

interface Team {
    id: string;
    team_name: string;
    faction: string;
    advisor_name: string;
    advisor_email: string;
    created_at: string;
    participants: Participant[];
}

export default function AdminOversight() {
    const [passcode, setPasscode] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [registrations, setRegistrations] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Tactical Authorization (Simple but effective for internal use)
    const AUTH_PASSCODE = 'GRIDLOCK_2026_OVERSEER';

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode === AUTH_PASSCODE) {
            setIsAuthorized(true);
            fetchRegistrations();
        } else {
            alert('ACCESS DENIED: INVALID QUANTUM SIGNATURE');
        }
    };

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/registrations');
            const data = await response.json();
            if (response.ok) {
                setRegistrations(data.registrations);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to uplink with Database');
        } finally {
            setLoading(false);
        }
    };

    const handlePurge = async (teamId: string, teamName: string) => {
        const confirmed = window.confirm(`CRITICAL PROTOCOL: ARE YOU SURE YOU WANT TO PURGE SQUAD: ${teamName}? \nTHIS ACTION CANNOT BE REVERSED.`);

        if (confirmed) {
            try {
                const response = await fetch(`/api/admin/registrations?teamId=${teamId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setRegistrations(prev => prev.filter(t => t.id !== teamId));
                } else {
                    const data = await response.json();
                    alert(`PURGE FAILED: ${data.error}`);
                }
            } catch (err) {
                alert('COMMUNICATION ERROR: UPLINK FAILED DURING PURGE.');
            }
        }
    };

    const filteredTeams = registrations.filter(team =>
        team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center p-6 font-display">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-[2rem] backdrop-blur-xl shadow-2xl space-y-8"
                >
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                            COMMAND <span className="text-primary">OVERSIGHT</span>
                        </h1>
                        <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">Enter Protocol Passcode</p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="relative">
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-center text-primary font-mono tracking-widest focus:border-primary outline-none transition-all"
                                placeholder="********"
                            />
                            <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none"></div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-background-dark font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                        >
                            INITIATE BIOSCAN
                        </button>
                    </form>

                    <p className="text-[8px] text-center text-gray-600 tracking-widest uppercase">Unauthorized access is logged and prosecuted by Grid Sentinel protocols.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-dark text-white font-body p-6 md:p-12">
            {/* Header */}
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-display font-black italic tracking-tighter uppercase">
                        REGISTRATION <span className="text-primary">DATABASE</span>
                    </h1>
                    <div className="flex items-center gap-4 text-[10px] font-display tracking-widest text-primary/60 uppercase">
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></span>
                            Live Uplink Active
                        </span>
                        <span>Total Squads: {registrations.length}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-96">
                    <div className="relative w-full">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">search</span>
                        <input
                            type="text"
                            placeholder="SEARCH SQUAD OR OPERATIVE..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-xs font-display tracking-wider outline-none focus:border-primary transition-all uppercase"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto space-y-8">
                {loading ? (
                    <div className="flex items-center justify-center py-40">
                        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                ) : error ? (
                    <div className="p-10 border border-secondary/20 bg-secondary/5 rounded-2xl text-center space-y-4">
                        <span className="material-icons text-secondary text-4xl">warning</span>
                        <p className="text-secondary font-display tracking-widest uppercase text-sm">{error}</p>
                        <button onClick={fetchRegistrations} className="px-6 py-2 border border-secondary text-secondary rounded-full text-xs hover:bg-secondary/10 uppercase">Retry Uplink</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredTeams.map((team) => (
                            <motion.div
                                key={team.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.07] transition-all"
                            >
                                {/* Team Summary Header */}
                                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-xl shadow-lg ${team.faction === 'RANGER' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/20 text-secondary border border-secondary/30'
                                            }`}>
                                            {team.faction === 'RANGER' ? 'R' : 'V'}
                                        </div>
                                        <div className="space-y-0.5">
                                            <h2 className="text-2xl font-display font-black italic tracking-tight uppercase leading-none">{team.team_name}</h2>
                                            <p className="text-[10px] text-gray-500 font-display tracking-widest uppercase italic">
                                                Enlisted: {new Date(team.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                                        <div className="flex flex-wrap gap-4 md:gap-8 bg-black/20 p-4 rounded-2xl border border-white/5">
                                            <div className="space-y-1">
                                                <p className="text-[8px] text-gray-500 tracking-widest uppercase">Advisor Contact</p>
                                                <p className="text-xs font-medium text-white/90 uppercase">{team.advisor_name || 'N/A'}</p>
                                                <p className="text-[10px] text-primary/70 font-mono tracking-tight">{team.advisor_email || 'NO_EMAIL'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[8px] text-gray-500 tracking-widest uppercase">Squad Size</p>
                                                <p className="text-xs font-display text-white">{team.participants.length} OPERATIVES</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handlePurge(team.id, team.team_name)}
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all group/purge"
                                            title="PURGE SQUAD"
                                        >
                                            <span className="material-icons text-xl group-hover/purge:animate-pulse">delete_forever</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Participants Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-black/40 border-b border-white/5">
                                                <th className="px-8 py-4 text-[10px] font-display tracking-widest text-gray-400 uppercase">Status</th>
                                                <th className="px-8 py-4 text-[10px] font-display tracking-widest text-gray-400 uppercase">Operative Name</th>
                                                <th className="px-8 py-4 text-[10px] font-display tracking-widest text-gray-400 uppercase">RA ID</th>
                                                <th className="px-8 py-4 text-[10px] font-display tracking-widest text-gray-400 uppercase">Communication</th>
                                                <th className="px-8 py-4 text-[10px] font-display tracking-widest text-gray-400 uppercase">Dept / Year</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.02]">
                                            {team.participants.map((p) => (
                                                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-display border tracking-tighter ${p.is_leader
                                                            ? 'bg-primary/20 text-primary border-primary/30 shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                                                            : 'bg-white/5 text-gray-400 border-white/10'
                                                            }`}>
                                                            {p.is_leader ? 'LEADER' : 'MEMBER'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="font-display text-sm font-bold text-white group-hover:text-primary transition-colors uppercase">{p.name}</p>
                                                    </td>
                                                    <td className="px-8 py-5 font-mono text-xs text-gray-400 tracking-wider font-semibold">
                                                        {p.reg_no}
                                                    </td>
                                                    <td className="px-8 py-5 space-y-1">
                                                        <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
                                                            <span className="material-icons text-[14px] text-primary/50">email</span>
                                                            {p.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
                                                            <span className="material-icons text-[14px] text-primary/50">smartphone</span>
                                                            {p.phone}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-xs text-white uppercase font-semibold">{p.department}</p>
                                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{p.year || '-'}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ))}

                        {filteredTeams.length === 0 && (
                            <div className="py-20 text-center space-y-4">
                                <span className="material-icons text-6xl text-white/5">visibility_off</span>
                                <p className="text-gray-500 font-display tracking-[0.3em] uppercase italic">Intelligence scan yielded zero results.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Tactical Footer */}
            <footer className="max-w-7xl mx-auto mt-20 text-center opacity-30">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                <p className="text-[9px] font-display tracking-[0.5em] text-white/50 uppercase">
                    ACM SIGCHI - GRIDLOCK COMMAND CENTER // PROTOCOL OVERSIGHT v1.0.4
                </p>
            </footer>
        </div>
    );
}
