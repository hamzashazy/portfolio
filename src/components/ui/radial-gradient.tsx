"use client";

import React, { useState, useEffect } from 'react';

export const RadialGradient = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setPosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 transition-all duration-300" 
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsla(var(--primary) / 0.15), transparent 80%)`
      }}
    ></div>
  );
};
