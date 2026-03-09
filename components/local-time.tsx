"use client";

import { useEffect, useState } from "react";

export default function LocalTime({ timezone }: { timezone: string }) {
    const [clock, setClock] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setClock(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const zoneTime = new Intl.DateTimeFormat("en-NZ", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone
    }).format(clock);

    return <>{zoneTime}</>;
}
