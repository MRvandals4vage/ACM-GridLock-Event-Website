'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function AttendancePage() {
    const [pin, setPin] = useState('');
    const [teamName, setTeamName] = useState('');
    const [mode, setMode] = useState<'PIN' | 'NAME'>('PIN');
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    const markAttendance = async (teamId: string, secret: string, teamNameVal?: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/check-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teamId, secret, teamName: teamNameVal }),
            });
            const data = await response.json();
            setResult({ success: response.ok, message: data.message || data.error });
        } catch (err) {
            setResult({ success: false, message: 'CRITICAL UPLINK FAILURE' });
        } finally {
            setLoading(false);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'PIN' && pin) {
            markAttendance('', pin);
        } else if (mode === 'NAME' && teamName) {
            markAttendance('', '', teamName);
        }
    };

    useEffect(() => {
        if (scanning) {
            scannerRef.current = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );
            scannerRef.current.render((decodedText) => {
                // Format: GRIDLOCK_ATTENDANCE:teamId:secret
                if (decodedText.startsWith('GRIDLOCK_ATTENDANCE:')) {
                    const [, teamId, secret] = decodedText.split(':');
                    markAttendance(teamId, secret);
                    setScanning(false);
                    scannerRef.current?.clear();
                } else {
                    setResult({ success: false, message: 'INVALID LOGISTIC SIGNATURE' });
                }
            }, (error) => {
                // console.warn(error);
            });
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => console.error("Scanner clear error:", err));
            }
        };
    }, [scanning]);

    return (
        <div className="min-h-screen bg-background-dark text-white font-display p-6 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black italic tracking-tighter uppercase">
                        BIOSCAN <span className="text-primary">VERIFICATION</span>
                    </h1>
                    <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">Squad Deployment Protocol</p>
                </div>

                <div className="space-y-6">
                    {/* QR Toggle */}
                    <button
                        onClick={() => {
                            setScanning(!scanning);
                            setResult(null);
                        }}
                        className={`w-full py-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${scanning
                            ? 'border-secondary bg-secondary/10 text-secondary'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-primary/50 hover:bg-primary/5 hover:text-white'
                            }`}
                    >
                        <span className="material-icons text-4xl">{scanning ? 'qr_code_scanner' : 'photo_camera'}</span>
                        <span className="font-bold tracking-widest uppercase text-xs">
                            {scanning ? 'TERMINATE SCAN' : 'INITIATE QR BIOSCAN'}
                        </span>
                    </button>

                    {scanning && (
                        <div id="reader" className="overflow-hidden rounded-2xl border border-white/10 bg-black/40"></div>
                    )}

                    {!scanning && (
                        <div className="space-y-6">
                            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setMode('PIN')}
                                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${mode === 'PIN' ? 'bg-primary text-background-dark' : 'text-gray-500'}`}
                                >
                                    PIN Access
                                </button>
                                <button
                                    onClick={() => setMode('NAME')}
                                    className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${mode === 'NAME' ? 'bg-primary text-background-dark' : 'text-gray-500'}`}
                                >
                                    Squad Name
                                </button>
                            </div>

                            <form onSubmit={handleManualSubmit} className="space-y-4">
                                <div className="relative">
                                    <p className="text-[8px] text-center text-gray-500 tracking-widest uppercase mb-2">
                                        Manual Override ({mode === 'PIN' ? 'Enter PIN' : 'Enter Squad Name'})
                                    </p>
                                    {mode === 'PIN' ? (
                                        <input
                                            type="text"
                                            value={pin}
                                            onChange={(e) => setPin(e.target.value)}
                                            placeholder="XXXXXXXX..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-center text-primary font-mono tracking-[0.5em] focus:border-primary outline-none transition-all placeholder:tracking-normal"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={teamName}
                                            onChange={(e) => setTeamName(e.target.value)}
                                            placeholder="SQUAD NAME..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-center text-primary font-display font-black tracking-widest focus:border-primary outline-none transition-all italic placeholder:italic"
                                        />
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || (mode === 'PIN' ? !pin : !teamName)}
                                    className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase tracking-[0.2em] rounded-xl transition-all disabled:opacity-20"
                                >
                                    {loading ? 'UPLINKING...' : 'VERIFY IDENTITY'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className={`p-6 rounded-2xl border text-center space-y-2 ${result.success
                                ? 'bg-primary/10 border-primary/30 text-primary'
                                : 'bg-secondary/10 border-secondary/30 text-secondary'
                                }`}
                        >
                            <span className="material-icons text-3xl">
                                {result.success ? 'verified' : 'gpp_bad'}
                            </span>
                            <p className="font-bold tracking-widest uppercase text-xs">{result.message}</p>
                            {result.success && (
                                <button
                                    onClick={() => setResult(null)}
                                    className="mt-4 px-6 py-2 bg-primary text-background-dark rounded-lg text-[10px] font-black uppercase"
                                >
                                    NEXT SCAN
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-transparent">
                    <a href="/admin-oversight" className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                        <span className="material-icons text-sm">arrow_back</span>
                        Back to Data
                    </a>
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[8px] text-gray-600 uppercase tracking-widest">SENTINEL MODE ACTIVE</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

