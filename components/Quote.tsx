import OrbitMini from "./OrbitMini";
export default function Quote() {
  return (
    <section className="relative z-10 bg-ink text-paper">
      <div className="wrap border-t border-white/10 py-[clamp(88px,11vw,170px)]">
        <div className="grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
          <div className="col-span-4 md:col-span-3">
            <p className="mono text-paper/60">07 — Principle</p>
            <div data-clip className="relative mt-6 aspect-[4/5] overflow-hidden rounded-[20px] bg-graphite">
              <OrbitMini />
            </div>
          </div>
          <figure className="col-span-4 md:col-span-9">
            <blockquote className="text-[clamp(30px,3.7vw,60px)] font-medium leading-[1.08] tracking-[-0.025em]" data-reveal="blur" data-scrub>
              “The agents do the work. You keep the helm: every step visible, every outward move approved, and one key that stops it all.”
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4" data-fade>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-mint font-semibold text-ink">H</span>
              <span><span className="block text-[15px]">The Helm rule</span><span className="mono text-paper/60">Design principle · not a testimonial</span></span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
