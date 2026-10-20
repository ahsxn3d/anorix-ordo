"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Mark } from "./Logo";
import { useCart } from "@/lib/commerce/cart";
import { layers, docs } from "@/lib/data";

type M = { k: string; items: [string, string, string?][] };
const menus: M[] = [
  { k: "Helm", items: [["About Helm", "/about"], ["Pricing", "/pricing"], ["Changelog", "/changelog"], ["—", ""], ["Contact", "/contact"]] },
  { k: "File", items: [["Docs", "/docs"], ...docs.map((d) => [d.title, `/docs/${d.slug}`] as [string, string]), ["—", ""], ["FAQ", "/faq"]] },
  { k: "Layers", items: [["All layers", "/features"], ...layers.map((l) => [l.name, `/features/${l.slug}`, l.no] as [string, string, string])] },
  { k: "Agents", items: [["Mission loop", "/#core"], ["Use cases", "/#library"], ["Autonomy levels", "/#rollout"]] },
];
function Clock() { const [t, setT] = useState(""); useEffect(() => { const f = () => setT(new Date().toLocaleTimeString("en-GB", { weekday: "short", hour: "2-digit", minute: "2-digit" })); f(); const i = setInterval(f, 15000); return () => clearInterval(i); }, []); return <span className="tabular-nums">{t}</span>; }
export default function MenuBar() {
  const path = usePathname(), { count } = useCart(), [open, setOpen] = useState<string | null>(null), [sheet, setSheet] = useState(false), bar = useRef<HTMLDivElement>(null);
  useEffect(() => { const f = (e: MouseEvent) => { if (!bar.current?.contains(e.target as Node)) setOpen(null); }; const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setSheet(false); } }; addEventListener("pointerdown", f); addEventListener("keydown", k); return () => { removeEventListener("pointerdown", f); removeEventListener("keydown", k); }; }, []);
  useEffect(() => { setOpen(null); setSheet(false); }, [path]);
  return (
    <header ref={bar} className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-[30px] items-center justify-between border-b border-white/10 bg-ink/80 px-3 text-[12.5px] text-paper/85 backdrop-blur-xl">
        <div className="flex items-center">
          {menus.map((m, i) => (
            <div key={m.k} className="relative" onMouseEnter={() => open && setOpen(m.k)}>
              <button aria-haspopup="menu" aria-expanded={open === m.k} onClick={() => setOpen(open === m.k ? null : m.k)} className={`flex h-[24px] items-center gap-1.5 rounded-[5px] px-2.5 transition-colors ${open === m.k ? "bg-white/15" : "hover:bg-white/10"} ${i > 0 ? "hidden md:flex" : ""}`}>
                {i === 0 ? <><Mark className="h-[15px] w-[15px]" /><span className="font-semibold">Helm</span></> : m.k}</button>
              {open === m.k && <div role="menu" className="absolute left-0 top-[28px] min-w-[220px] rounded-[9px] border border-white/10 bg-graphite/95 p-1 shadow-2xl backdrop-blur-xl">
                {m.items.map(([l, h, kbd], j) => l === "—" ? <div key={j} className="my-1 h-px bg-white/10" /> :
                  <a key={h} role="menuitem" href={h} className={`flex items-center justify-between rounded-[5px] px-3 py-1.5 hover:bg-mint hover:text-ink ${path === h ? "text-mint" : ""}`}><span>{l}</span>{kbd && <span className="mono text-[10px] opacity-50">{kbd}</span>}</a>)}
              </div>}
            </div>))}
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <span className="hidden items-center gap-1.5 sm:flex"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />3 agents running</span>
          <a href="/cart" className="rounded-[5px] px-2 hover:bg-white/10">Cart{count ? ` (${count})` : ""}</a>
          <a href="/pricing" className="hidden rounded-[5px] bg-mint px-2.5 text-ink md:block">Get Helm</a>
          <Clock />
          <button aria-label="Menu" aria-expanded={sheet} onClick={() => setSheet(!sheet)} className="rounded-[5px] px-2 hover:bg-white/10 md:hidden">{sheet ? "✕" : "☰"}</button>
        </div>
      </div>
      {sheet && <nav aria-label="Mobile" className="max-h-[calc(100svh-30px)] overflow-auto border-b border-white/10 bg-graphite/95 p-3 backdrop-blur-xl md:hidden">
        {menus.map((m) => <div key={m.k} className="mb-3"><p className="mono px-2 py-1 text-paper/45">{m.k}</p>{m.items.filter(([l]) => l !== "—").map(([l, h]) => <a key={h} href={h} className="block rounded-[6px] px-2 py-2 text-[17px] text-paper hover:bg-white/10">{l}</a>)}</div>)}
        <a href="/pricing" className="btn-mint mt-2 w-full justify-center">Get Helm</a></nav>}
    </header>
  );
}
