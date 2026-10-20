"use client";
import { useState } from "react";
export default function Contact() { const [ok, setOk] = useState(false); const f = "w-full rounded-[10px] border border-white/15 bg-transparent px-4 py-3 text-[15px] outline-none focus:border-mint";
  if (ok) return <p className="mono text-mint">message queued · demo form, nothing was sent</p>;
  return <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} className="grid gap-4 sm:grid-cols-2"><label className="text-[13px] text-paper/60">Name<input required className={`${f} mt-2`} /></label><label className="text-[13px] text-paper/60">Email<input required type="email" className={`${f} mt-2`} /></label><label className="text-[13px] text-paper/60 sm:col-span-2">Message<textarea required rows={6} className={`${f} mt-2`} /></label><button className="btn-mint justify-center sm:col-span-2">Send</button></form>; }
