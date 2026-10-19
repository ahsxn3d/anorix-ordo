import Image from "next/image";
export default function Quote() {
  return (
    <section className="relative z-10 bg-ink text-paper">
      <div className="wrap border-t border-white/10 py-[clamp(88px,11vw,170px)]">
        <div className="grid grid-cols-4 gap-4 md:grid-cols-12 md:gap-6">
          <div className="col-span-4 md:col-span-3">
            <p className="mono text-paper/60">07 — Field notes</p>
            <div data-clip className="relative mt-6 aspect-[4/5] overflow-hidden rounded-[20px] bg-graphite">
              <Image data-clip-img src="/img/orbit.webp" alt="" fill sizes="(min-width:768px) 22vw, 90vw" className="object-cover" />
            </div>
          </div>
          <figure className="col-span-4 md:col-span-9">
            <blockquote className="text-[clamp(30px,3.7vw,60px)] font-medium leading-[1.08] tracking-[-0.025em]" data-reveal="blur" data-scrub>
              “We stopped closing the books and started reading them. Ordo does the reconciling at 2 a.m., and my team walks in to decisions, not spreadsheets.”
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4" data-fade>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-mint font-semibold text-ink">MR</span>
              <span><span className="block text-[15px]">Maya Rahman</span><span className="mono text-paper/60">VP Revenue Ops · Northfield (fictional)</span></span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
