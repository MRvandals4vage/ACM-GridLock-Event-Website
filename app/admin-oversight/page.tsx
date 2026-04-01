'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Participant {
    id: string;
    name: string;
    reg_no: string;
    email: string;
    phone: string;
    department: string;
    year: string;
    is_leader: boolean;
    attendance_checked_in?: boolean;
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
    const AUTH_PASSCODE = 'GRIDLOCK_OVERSEER';

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

    const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
    const [filterMode, setFilterMode] = useState<'ALL' | 'CHECKED_IN' | 'PENDING'>('ALL');

    const filteredTeams = registrations.filter(team => {
        const matchesSearch = team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const isCheckedIn = team.participants.some(p => p.attendance_checked_in);

        if (filterMode === 'CHECKED_IN' && !isCheckedIn) return false;
        if (filterMode === 'PENDING' && isCheckedIn) return false;

        return matchesSearch;
    });

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

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <div className="flex bg-black/40 p-1 rounded-full border border-white/5">
                        <button onClick={() => setFilterMode('ALL')} className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-full transition-all ${filterMode === 'ALL' ? 'bg-primary text-background-dark' : 'text-gray-500 hover:text-white'}`}>All</button>
                        <button onClick={() => setFilterMode('CHECKED_IN')} className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-full transition-all ${filterMode === 'CHECKED_IN' ? 'bg-green-500 text-background-dark' : 'text-gray-500 hover:text-white'}`}>Checked In</button>
                        <button onClick={() => setFilterMode('PENDING')} className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-full transition-all ${filterMode === 'PENDING' ? 'bg-red-500 text-background-dark' : 'text-gray-500 hover:text-white'}`}>Pending</button>
                    </div>
                    <Link
                        href="/admin-oversight/attendance"
                        className="px-6 py-2.5 bg-primary text-background-dark font-display font-black text-[10px] tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] uppercase flex items-center gap-2"
                    >
                        <span className="material-icons text-sm">qr_code_scanner</span>
                        Attendance Scan
                    </Link>
                    <div className="relative w-full md:w-80">
                        <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">search</span>
                        <input
                            type="text"
                            placeholder="SEARCH SQUAD..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-[10px] font-display tracking-wider outline-none focus:border-primary transition-all uppercase"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto space-y-4">
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
                    <div className="grid grid-cols-1 gap-4">
                        {filteredTeams.map((team) => (
                            <motion.div
                                key={team.id}
                                layout
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all"
                            >
                                {/* Team Summary Header (Clickable) */}
                                <div
                                    className="p-5 md:p-6 flex items-center justify-between cursor-pointer group"
                                    onClick={() => setExpandedTeamId(expandedTeamId === team.id ? null : team.id)}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-lg shadow-lg ${team.faction === 'RANGER' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/20 text-secondary border border-secondary/30'
                                            }`}>
                                            {team.faction === 'RANGER' ? 'R' : 'V'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-xl font-display font-black italic tracking-tight uppercase leading-none group-hover:text-primary transition-colors">{team.team_name}</h2>
                                                {team.participants.some(p => p.attendance_checked_in) ? (
                                                    <span className="px-2 py-0.5 rounded border border-green-500/30 bg-green-500/10 text-[8px] text-green-400 font-bold tracking-widest uppercase mt-1">CHECKED IN</span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded border border-red-500/30 bg-red-500/10 text-[8px] text-red-400 font-bold tracking-widest uppercase mt-1">PENDING</span>
                                                )}
                                            </div>
                                            <p className="text-[8px] text-gray-500 font-display tracking-widest uppercase mt-1 italic">
                                                Operatives: {team.participants.length} // Deployment: {new Date(team.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePurge(team.id, team.team_name);
                                            }}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all group/purge"
                                        >
                                            <span className="material-icons text-base">delete_forever</span>
                                        </button>
                                        <span className={`material-icons transition-transform duration-300 ${expandedTeamId === team.id ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Participants Table */}
                                <AnimatePresence>
                                    {expandedTeamId === team.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-white/5 bg-black/20"
                                        >
                                            <div className="p-6 space-y-6">
                                                {/* Advisor Info */}
                                                <div className="flex gap-8 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="space-y-1">
                                                        <p className="text-[8px] text-gray-500 tracking-widest uppercase font-display">Faculty Advisor</p>
                                                        <p className="text-xs font-bold text-white uppercase">{team.advisor_name || 'N/A'}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[8px] text-gray-500 tracking-widest uppercase font-display">Advisor Contact</p>
                                                        <p className="text-[10px] text-primary font-mono tracking-tight">{team.advisor_email || 'NO_EMAIL'}</p>
                                                    </div>
                                                </div>

                                                <div className="overflow-x-auto rounded-xl border border-white/10">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="bg-white/5 border-b border-white/5">
                                                                <th className="px-6 py-3 text-[9px] font-display tracking-widest text-gray-400 uppercase">Role</th>
                                                                <th className="px-6 py-3 text-[9px] font-display tracking-widest text-gray-400 uppercase">Operative</th>
                                                                <th className="px-6 py-3 text-[9px] font-display tracking-widest text-gray-400 uppercase">RA ID</th>
                                                                <th className="px-6 py-3 text-[9px] font-display tracking-widest text-gray-400 uppercase">Contacts</th>
                                                                <th className="px-6 py-3 text-[9px] font-display tracking-widest text-gray-400 uppercase">Faculty Advisor</th>
                                                                <th className="px-6 py-3 text-[9px] font-display tracking-widest text-gray-400 uppercase">Dept</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-white/[0.02]">
                                                            {team.participants.map((p) => (
                                                                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group/row">
                                                                    <td className="px-6 py-4">
                                                                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-display border tracking-tighter ${p.is_leader
                                                                            ? 'bg-primary/20 text-primary border-primary/30'
                                                                            : 'bg-white/5 text-gray-400 border-white/10'
                                                                            }`}>
                                                                            {p.is_leader ? 'LEADER' : 'MEMBER'}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <p className="font-display text-sm font-bold text-white uppercase group-hover/row:text-primary transition-colors">{p.name}</p>
                                                                    </td>
                                                                    <td className="px-6 py-4 font-mono text-[10px] text-gray-400 tracking-wider">
                                                                        {p.reg_no}
                                                                    </td>
                                                                    <td className="px-6 py-4 space-y-1">
                                                                        <p className="text-[10px] text-white/70 font-mono">{p.email}</p>
                                                                        <p className="text-[10px] text-white/50 font-mono">{p.phone}</p>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <p className="text-[10px] text-white uppercase font-bold">{(p as any).fa_name || '-'}</p>
                                                                        <p className="text-[9px] text-primary/60 font-mono italic">{(p as any).fa_email || '-'}</p>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <p className="text-[10px] text-white uppercase">{p.department}</p>
                                                                        <p className="text-[9px] text-gray-500 uppercase">{p.year}</p>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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
