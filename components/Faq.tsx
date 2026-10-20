"use client";
import { useState } from "react";
import { faq } from "@/lib/data";
export default function Faq() { const [o, setO] = useState(0);
  return <ul className="border-t border-white/10">{faq.map(([q, a], i) => <li key={q} className="border-b border-white/10"><button aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)} className="flex w-full items-center gap-6 py-6 text-left"><span className="mono w-10 text-paper/40">?{i + 1}</span><span className="flex-1 text-[clamp(20px,2vw,28px)] font-medium">{q}</span><span className={`mono text-mint transition-transform ${o === i ? "rotate-90" : ""}`}>›</span></button>
  {o === i && <p className="pb-7 pl-16 text-[16px] leading-relaxed text-paper/65">{a}</p>}</li>)}</ul>; }
