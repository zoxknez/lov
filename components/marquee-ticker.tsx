"use client";

interface MarqueeTickerProps {
  items: string[];
  separator?: string;
  className?: string;
  speed?: "slow" | "medium" | "fast";
}

const speedMap = { slow: "36s", medium: "24s", fast: "16s" };

export default function MarqueeTicker({
  items,
  separator = "✦",
  className = "",
  speed = "medium"
}: MarqueeTickerProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="ticker-track"
        style={{ animationDuration: speedMap[speed] }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 whitespace-nowrap">
            <span className="label-xs text-white/40">{item}</span>
            <span className="text-[#c9922a] text-xs">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
