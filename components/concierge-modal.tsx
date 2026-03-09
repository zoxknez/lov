"use client";

import { motion } from "framer-motion";
import { X, Shield, Lock, Cpu, Globe, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConciergeModal({ onClose }: { onClose: () => void }) {
    const [status, setStatus] = useState("Establishing Secure Uplink...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStatus("Decrypting Client Protocol..."), 800),
            setTimeout(() => setStatus("Handshaking KAIMANAWA-ALPHA..."), 1600),
            setTimeout(() => setLoading(false), 2400)
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="premium-panel min-h-[500px] w-full max-w-2xl overflow-hidden rounded-[40px] bg-[#040705]/90 border-white/10"
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 p-8">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full bg-[#d9b167]/10 p-2">
                                <Shield size={20} className="text-[#d9b167]" />
                            </div>
                            <div>
                                <h2 className="font-serif text-2xl text-white">Concierge Secure Link</h2>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#d9b167]/60">Estate-Class Encryption</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
                        >
                            <X size={20} className="text-stone-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-10">
                        {loading ? (
                            <div className="flex h-full flex-col items-center justify-center text-center">
                                <Cpu size={48} className="mb-6 animate-spin text-[#d9b167]/30" />
                                <p className="font-mono text-sm tracking-widest text-[#d9b167] uppercase">{status}</p>
                                <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2.4, ease: "linear" }}
                                        className="h-full bg-gradient-to-r from-[#d9b167] to-[#f0d8ac]"
                                    />
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="premium-panel rounded-2xl bg-white/5 p-6 border-white/5">
                                        <Globe size={18} className="mb-3 text-[#d9b167]/60" />
                                        <h3 className="font-serif text-lg text-white">Private Allocation</h3>
                                        <p className="mt-2 text-xs leading-relaxed text-stone-400">Directly bypass automated systems for priority scheduling in the 2027 season.</p>
                                    </div>
                                    <div className="premium-panel rounded-2xl bg-white/5 p-6 border-white/5">
                                        <Lock size={18} className="mb-3 text-[#d9b167]/60" />
                                        <h3 className="font-serif text-lg text-white">Guest Privacy</h3>
                                        <p className="mt-2 text-xs leading-relaxed text-stone-400">All data is handled via private secure channel with end-to-end estate encryption.</p>
                                    </div>
                                </div>

                                <div className="rounded-3xl bg-[#d9b167]/5 p-8 border border-[#d9b167]/10">
                                    <p className="font-serif text-xl text-[#f0d8ac]">Ready to start your narrative?</p>
                                    <p className="mt-2 text-sm text-stone-300">Share your preferred program profile and we will return a tactical brief within 6 hours.</p>

                                    <button
                                        onClick={() => {
                                            onClose();
                                            window.location.href = '#contact';
                                        }}
                                        className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d9b167] underline underline-offset-4"
                                    >
                                        Proceed to Form <ArrowRight size={12} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-white/5 bg-black/20 p-6 px-10">
                        <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-stone-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Satellite Active
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-stone-600">Ref: NZ-AL-2027-ALPHA</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
