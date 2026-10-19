"use client";
import { useEffect, useRef, useState } from "react";

const agents = [
  { k: "Pipeline", d: "Keeps every deal honest: stage, amount, next step and close date, checked against what actually happened.",
    rows: [["Acme Robotics", "Stage corrected", "Negotiation → Proposal", "ok"], ["Northfield Labs", "Close date moved", "Oct 30 → Nov 21", "ok"], ["Helio Freight", "Missing next step", "Owner nudged", "flag"], ["Brightline AI", "Amount synced", "$84,000 → $96,000", "ok"]] },
  { k: "Billing", d: "Turns signed contracts into correct invoices, usage into line items, and payouts into a ledger that balances.",
    rows: [["INV-20931", "Usage billed", "14.2M events", "ok"], ["INV-20932", "Proration", "+6 seats, 18 days", "ok"], ["INV-20933", "Tax mismatch", "Routed to finance", "flag"], ["Payout 0917", "Reconciled", "$412,880.12", "ok"]] },
  { k: "Collections", d: "Chases politely, escalates precisely, and knows the difference between a slow payer and a churn signal.",
    rows: [["Oakridge Health", "Reminder 2 sent", "$18,400 · 12d late", "ok"], ["Vanta Logistics", "Payment plan drafted", "3 × $9,100", "ok"], ["Kite & Co", "Disputed line", "Escalated to AE", "flag"], ["Juno Studio", "Paid", "$4,250 cleared", "ok"]] },
  { k: "Forecast", d: "Builds the number bottom-up from real signals every morning, and tells you which deals move it.",
    rows: [["Q4 commit", "Updated 06:00", "$12.84M", "ok"], ["Best case", "+3 deals", "$14.10M", "ok"], ["Risk", "2 slipped", "−$610K", "flag"], ["Confidence", "Backtested", "96.4%", "ok"]] },
  { k: "Renewals", d: "Spots fading usage 90 days out, drafts the save play, and lines up the expansion while you sleep.",
    rows: [["Polaris Bank", "Usage −22%", "Save play drafted", "flag"], ["Meridian", "Expansion found", "+$48K ARR", "ok"], ["Tandem", "Auto-renewed", "$120K · 24 mo", "ok"], ["Cobalt", "Champion left", "New sponsor mapped", "ok"]] },
];

export default function Agents() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    const t = window.setInterval(() => { if (inView.current && !paused) setI((v) => (v + 1) % agents.length); }, 4200);
    return () => { clearInterval(t); io.disconnect(); };
  }, [paused]);
  useEffect(() => {
    const unpause = () => setPaused(false);
    window.addEventListener("scroll", unpause, { passive: true });
    return () => window.removeEventListener("scroll", unpause);
  }, []);
  const A = agents[i];
  return (
    <section id="agents" ref={ref} className="sheet relative z-10 -mt-10 bg-bone text-ink">
      <div className="wrap py-[clamp(88px,11vw,170px)]">
        <div className="grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
          <p className="mono col-span-4 text-stone md:col-span-3">03 — The agents</p>
          <h2 className="display col-span-4 text-[clamp(48px,6.6vw,108px)] md:col-span-9" data-reveal="lines">Five specialists.<br />One shared brain.</h2>
        </div>
        <div className="mt-[clamp(56px,7vw,110px)] grid grid-cols-4 gap-8 md:grid-cols-12 md:gap-6" onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)} onPointerLeave={() => setPaused(false)} onPointerCancel={() => setPaused(false)}>
          <div role="tablist" aria-label="Agents" className="col-span-4 md:col-span-6">
            {agents.map((a, k) => (
              <button key={a.k} role="tab" aria-selected={k === i} onClick={() => setI(k)}
                className="group relative flex w-full items-center justify-between border-t border-ink/12 py-3 text-left md:py-4">
                <span className={`display text-[clamp(40px,5.6vw,92px)] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${k === i ? "translate-x-0 text-ink" : "text-ink/35 group-hover:translate-x-2 group-hover:text-ink/45"}`}>{a.k}</span>
                <span className={`mono transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}>0{k + 1}</span>
                {k === i && !paused && <span key={i} className="absolute bottom-0 left-0 h-px w-full origin-left bg-ink" style={{ animation: "grow 4.2s linear forwards" }} />}
              </button>
            ))}
          </div>
          <div className="col-span-4 md:col-span-6 md:pl-6">
            <div className="md:sticky md:top-28">
              <p key={A.k + "d"} className="max-w-[46ch] text-[17px] leading-relaxed text-ink/70" style={{ animation: "rise .8s cubic-bezier(.16,1,.3,1) both" }}>{A.d}</p>
              <div className="mt-8 overflow-hidden rounded-[22px] bg-ink text-paper shadow-[0_40px_80px_-40px_rgba(12,13,15,.5)]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                  <span className="mono text-paper/60">{A.k.toLowerCase()}-agent · today</span>
                  <span className="mono flex items-center gap-2 text-mint"><span className="h-1.5 w-1.5 rounded-full bg-mint pulse-dot" />running</span>
                </div>
                <ul>
                  {A.rows.map((r, k) => (
                    <li key={A.k + r[0]} className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-white/[0.07] px-5 py-4 last:border-0 md:grid-cols-[1.1fr_1fr_1fr_auto]"
                      style={{ animation: `rise .7s cubic-bezier(.16,1,.3,1) ${k * 0.07}s both` }}>
                      <span className="text-[14px] text-paper/90">{r[0]}</span>
                      <span className="hidden text-[13px] text-paper/50 md:block">{r[1]}</span>
                      <span className="hidden font-mono text-[12px] text-paper/70 md:block">{r[2]}</span>
                      <span className={`mono rounded-full px-2.5 py-1 ${r[3] === "ok" ? "bg-mint/10 text-mint" : "bg-[#ffb86b]/10 text-[#ffb86b]"}`}>{r[3] === "ok" ? "Done" : "Review"}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
