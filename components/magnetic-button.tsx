"use client";

import { ReactNode, MouseEventHandler } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  tag?: "button" | "a";
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className = "",
  tag = "button",
  href,
  onClick,
  type = "button",
  disabled,
  "aria-label": ariaLabel
}: MagneticButtonProps) {
  const props = {
    className,
    onClick,
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
