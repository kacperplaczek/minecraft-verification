"use client";

import { useEffect, useState } from "react";

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: number;
  key: number;
};

export const PetalsRain = ({ count = 18 }: { count?: number }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        size: 8 + Math.floor(Math.random() * 10),
        hue: 320 + Math.random() * 30,
        key: i,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {petals.map((p) => (
        <span
          key={p.key}
          className="absolute top-0 animate-petal-fall block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue} 90% 70%)`,
            boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.3)",
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            imageRendering: "pixelated",
            willChange: "transform",
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.25))",
          }}
        />
      ))}
    </div>
  );
};