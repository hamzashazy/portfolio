"use client";

import Image from "next/image";
import React from "react";

export default function HeroVisual() {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-pink-600/20 via-indigo-600/10 to-transparent border border-white/10">
      <Image
        src="/Portfolio.png"
        alt="Portfolio visual"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
