"use client";

import { useSyncExternalStore } from "react";

const KEY = "visitorName";

function subscribe(cb: () => void) {
  window.addEventListener("visitor-name", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("visitor-name", cb);
    window.removeEventListener("storage", cb);
  };
}

function read(): string | null {
  try {
    return localStorage.getItem(KEY) || null;
  } catch {
    return null;
  }
}

/** The name the visitor typed at the welcome gate, or null. Always null on the server. */
export function useVisitorName(): string | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function setVisitorName(name: string) {
  const clean = name.trim().slice(0, 40);
  // An empty name clears it ("Not you?" in the greeting card).
  try {
    if (clean) localStorage.setItem(KEY, clean);
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event("visitor-name"));
}
