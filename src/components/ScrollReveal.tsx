"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  staggerChildren?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  staggerChildren = 0
}: ScrollRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px -50px 0px" });

  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return { y: 40, x: 0 };
      case "down": return { y: -40, x: 0 };
      case "left": return { x: 40, y: 0 };
      case "right": return { x: -40, y: 0 };
      case "none": return { x: 0, y: 0 };
    }
  };

  const offset = getDirectionOffset();

  const variants = {
    hidden: { 
      opacity: 0, 
      ...offset 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        delay,
        staggerChildren
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
