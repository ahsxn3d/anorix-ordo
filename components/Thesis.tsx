export default function Thesis() {
  const beats = [
    ["Signal.", "Your stack already knows everything: every invoice, seat, ticket and signature. It just never acts on it."],
    ["Noise.", "So people do. Spreadsheets, Friday reconciliations, renewal fire drills and a forecast nobody fully trusts."],
    ["Solved.", "Ordo agents read the signal, do the work and leave a receipt. Your team keeps judgement, not chores."],
  ];
  return (
    <section className="sheet relative z-10 -mt-10 bg-paper text-ink">
      <div className="wrap py-[clamp(88px,11vw,170px)]">
        <p className="mono mb-10 text-stone">01 — The gap</p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
          {beats.map(([h, p]) => (
            <div key={h} className="border-t border-ink/15 pt-6">
              <h2 className="display text-[clamp(64px,7.4vw,118px)]" data-reveal="chars">{h}</h2>
              <p className="mt-6 max-w-[34ch] text-[16px] leading-relaxed text-ink/70" data-fade>{p}</p>
            </div>
          ))}
        </div>
        <p className="display mt-[clamp(96px,12vw,190px)] max-w-[15ch] text-[clamp(44px,6.6vw,108px)]" data-reveal="blur" data-scrub>
          We are building the operating system for the revenue work nobody wants to do.
        </p>
      </div>
    </section>
  );
}
