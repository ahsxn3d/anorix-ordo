"use client";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const links = [["Platform", "#core"], ["Agents", "#agents"], ["Rollout", "#rollout"], ["Library", "#library"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last.current && !open);
      last.current = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${hidden ? "-translate-y-[120%]" : ""}`}>
      <div className="wrap flex items-center justify-between pt-4 md:pt-5">
        <a href="#top" aria-label="Ordo home" className="rounded-full bg-ink/70 px-3 py-2 text-paper backdrop-blur-md">
          <Logo />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-white/10 bg-graphite/70 p-1 backdrop-blur-md md:flex">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="rounded-full px-4 py-2 text-[13px] text-paper/75 transition-colors hover:bg-paper hover:text-ink">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#demo" className="btn-mint hidden !py-2.5 md:inline-flex">Book a demo <Arrow /></a>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full bg-paper text-ink md:hidden">
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-all duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      <div className={`wrap md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div className={`mt-3 overflow-hidden rounded-3xl bg-paper text-ink transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col p-6">
            {links.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="display border-b border-ink/10 py-3 text-[44px]">{l}</a>
            ))}
            <a href="#demo" onClick={() => setOpen(false)} className="btn-mint mt-6 justify-center !bg-ink !text-paper">Book a demo <Arrow /></a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3.5 w-3.5 ${className}`} aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
  );
}
