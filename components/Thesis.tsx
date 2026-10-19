export default function Thesis() {
  const beats = [
    ["Prompt.", "Vibe-coding gets you a first draft in minutes. Then the real work starts: wiring, fixing, checking every breakpoint."],
    ["Drift.", "One-shot agents forget the brief, touch files they should not, and ship without asking. You end up babysitting."],
    ["Helm.", "Helm runs the work as a mission loop. Layers plan, build and check each other, and stop for you before anything leaves your machine."],
  ];
  return (
    <section className="sheet relative z-10 -mt-10 bg-paper text-ink">
      <div className="wrap py-[clamp(88px,11vw,170px)]">
        <p className="mono mb-10 text-stone">01 — The problem</p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
          {beats.map(([h, p]) => (
            <div key={h} className="border-t border-ink/15 pt-6">
              <h2 className="display text-[clamp(64px,7.4vw,118px)]" data-reveal="chars">{h}</h2>
              <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-ink/70" data-fade>{p}</p>
            </div>
          ))}
        </div>
        <p className="display mt-[clamp(96px,12vw,190px)] max-w-[15ch] text-[clamp(44px,6.6vw,108px)]" data-reveal="blur" data-scrub>
          We are building the cockpit for people who build the web with AI.
        </p>
      </div>
    </section>
  );
}
