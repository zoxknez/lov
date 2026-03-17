"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useRef } from "react";

interface ParallaxImageProps extends ImageProps {
  containerClassName?: string;
  imageClassName?: string;
  offset?: number;
}

export default function ParallaxImage({ 
  containerClassName = "", 
  imageClassName = "", 
  offset = 50, 
  alt,
  ...props 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate the y transform based on scroll
  // We use slightly larger scale to ensure the image covers the container when moving
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const scale = shouldReduceMotion ? 1 : 1.15;

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          alt={alt}
          className={`object-cover ${imageClassName}`}
          {...props} 
        />
      </motion.div>
    </div>
  );
}
