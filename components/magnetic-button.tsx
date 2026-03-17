"use client";

import { useRef, ReactNode, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  tag?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  tag = "button",
  href,
  onClick,
  type = "button",
  disabled,
  "aria-label": ariaLabel
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }

  const props = {
    ref: ref as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: { transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" },
    "aria-label": ariaLabel
  };

  if (tag === "a") {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
