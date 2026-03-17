"use client";

import { useEffect, useState } from "react";

export default function LocalTime({ timezone }: { timezone: string }) {
    const [zoneTime, setZoneTime] = useState<string | null>(null);

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat("en-NZ", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: timezone
        });

        const updateClock = () => setZoneTime(formatter.format(new Date()));

        updateClock();
        const id = setInterval(updateClock, 1000);
        return () => clearInterval(id);
    }, [timezone]);

    return <span suppressHydrationWarning>{zoneTime ?? "--, -- --- --:--"}</span>;
}
