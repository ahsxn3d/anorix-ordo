import Logo from "./Logo";
import { Arrow } from "./Nav";

const words = ["Plan", "Build", "Critique", "Test", "Approve", "Ship", "Stop", "Explain"];

export default function Closing() {
  return (
    <>
      <section id="demo" className="sheet relative z-10 -mt-10 overflow-hidden bg-mint text-ink">
        <div className="flex overflow-hidden border-b border-ink/10 py-4">
          <div className="marquee flex shrink-0 gap-10 pr-10">
            {[...words, ...words, ...words, ...words].map((w, i) => (
              <span key={i} className="mono flex items-center gap-10 whitespace-nowrap text-ink/70">{w}<span className="h-1 w-1 rounded-full bg-ink/50" /></span>
            ))}
          </div>
        </div>
        <div className="wrap py-[clamp(88px,11vw,170px)]">
          <h2 className="display text-[clamp(64px,13vw,230px)]" data-reveal="chars">Take the</h2>
          <h2 className="display text-[clamp(64px,13vw,230px)]" data-reveal="chars">helm.</h2>
          <div className="mt-12 grid grid-cols-4 gap-6 md:grid-cols-12">
            <p className="col-span-4 max-w-[40ch] text-[17px] leading-relaxed text-ink/75 md:col-span-5" data-fade>
              Helm is in private build. Join the early list and tell us what you make; early-access details are a placeholder until the first version opens.
            </p>
            <div className="col-span-4 flex flex-wrap items-start gap-3 md:col-span-6 md:col-start-7 md:justify-end" data-fade>
              <a href="#top" className="btn-mint !bg-ink !text-paper hover:!bg-coal">Join the early list <Arrow /></a>
              <a href="#core" className="btn-ghost">How approvals work</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="relative z-10 overflow-hidden bg-ink text-paper">
        <div className="wrap pt-20">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-6">
            <div className="col-span-2 md:col-span-4">
              <Logo />
              <p className="mt-5 max-w-[30ch] text-[14px] leading-relaxed text-paper/50">A layered agent OS for web designers and vibe-coders. The agents do the work; you keep the helm.</p>
            </div>
            {[["Product", ["Mission loop", "Layers", "Approvals", "Kill switch"]], ["Build", ["Use cases", "Docs (soon)", "Changelog", "Roadmap"]], ["Anorix", ["About", "Projects", "Contact", "Press"]]].map(([h, ls]) => (
              <div key={h as string} className="md:col-span-2">
                <p className="mono mb-4 text-paper/60">{h as string}</p>
                <ul className="space-y-2.5">{(ls as string[]).map((l) => <li key={l}><a href="#top" className="text-[14px] text-paper/70 transition-colors hover:text-mint">{l}</a></li>)}</ul>
              </div>
            ))}
            <div className="col-span-2 md:col-span-2">
              <p className="mono mb-4 text-paper/60">Status</p>
              <p className="flex items-center gap-2 text-[14px] text-paper/70"><span className="h-1.5 w-1.5 rounded-full bg-mint pulse-dot" /> Kill switch armed</p>
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-paper/60 md:flex-row">
            <span className="mono">© 2026 Helm by Anorix. Concept site; details are placeholders.</span>
            <span className="mono">Designed &amp; built by Anorix</span>
          </div>
        </div>
        <p aria-hidden className="display pointer-events-none select-none text-center text-[34vw] leading-[0.72] text-paper/[0.06]" style={{ fontStretch: "100%" }}>Helm</p>
      </footer>
    </>
  );
}
