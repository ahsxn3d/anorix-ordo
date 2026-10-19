"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const stats = [
  { v: 71, s: "%", l: "of RevOps hours handed back to the team" },
  { v: 4.2, s: "×", l: "faster month-end close, from 9 days to 2" },
  { v: 38, s: "M", pre: "$", l: "in leaked revenue recovered across customers" },
  { v: 0, s: "", l: "migrations. Ordo works on the stack you have", text: "Zero" },
];
const stack = ["Salesforce", "HubSpot", "Stripe", "NetSuite", "Snowflake", "Chargebee", "QuickBooks", "Slack", "Gong", "BigQuery", "Zuora", "Xero"];

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count); const dec = end % 1 ? 1 : 0; const o = { v: 0 };
        gsap.to(o, { v: end, duration: 2.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true }, onUpdate: () => { el.textContent = o.v.toFixed(dec); } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative z-10 bg-ink text-paper">
      <div className="wrap py-[clamp(88px,11vw,170px)]">
        <p className="mono mb-10 text-paper/60">06 — Proof</p>
        <div className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.l} className={`border-b border-white/10 py-8 sm:px-6 lg:border-b-0 ${i > 0 ? "lg:border-l" : "lg:pl-0"} ${i % 2 ? "sm:border-l" : "sm:pl-0"}`} data-fade data-delay={i * 0.08}>
              <p className="display text-[clamp(72px,8vw,136px)]" style={{ fontStretch: "70%" }}>
                {s.pre}{s.text ? s.text : <span data-count={s.v}>0</span>}<span className="text-mint">{s.s}</span>
              </p>
              <p className="mt-3 max-w-[26ch] text-[15px] leading-relaxed text-paper/55">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-[clamp(80px,9vw,140px)] grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
          <h2 className="display col-span-4 text-[clamp(40px,4.6vw,76px)] md:col-span-5" data-reveal="lines">Reads from<br />your stack.<br />Writes back.</h2>
          <ul className="col-span-4 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 sm:grid-cols-3 md:col-span-7 md:grid-cols-4">
            {stack.map((n) => (
              <li key={n} className="flex h-[86px] items-center justify-center bg-ink text-[15px] font-medium tracking-tight text-paper/55 transition-colors duration-300 hover:bg-graphite hover:text-mint md:h-[104px]">{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
