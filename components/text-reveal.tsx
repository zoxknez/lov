'use client';

import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="animate-reveal inline-block mr-[0.2em]">
          <span 
            className="transition-all"
            style={{ 
              animationDelay: `${delay + (i * 0.05)}s`,
              visibility: isVisible ? 'visible' : 'hidden'
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
