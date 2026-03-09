"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { rotatingNotes } from "@/lib/data";

export default function ConciergeStatusTicker() {
    const [tickerIndex, setTickerIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % rotatingNotes.length);
        }, 2800);
        return () => clearInterval(id);
    }, []);

    return (
        <motion.p
            key={tickerIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[12px] leading-relaxed text-stone-300 font-light"
        >
            &quot;{rotatingNotes[tickerIndex]}&quot;
        </motion.p>
    );
}
