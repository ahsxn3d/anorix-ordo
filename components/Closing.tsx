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
              Helm is in private build. Pick a plan to reserve a seat; checkout on this site is a demo and nothing is charged.
            </p>
            <div className="col-span-4 flex flex-wrap items-start gap-3 md:col-span-6 md:col-start-7 md:justify-end" data-fade>
              <a href="/pricing" className="btn-mint !bg-ink !text-paper hover:!bg-coal">See plans <Arrow /></a>
              <a href="/features/shipper" className="btn-ghost">How approvals work</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
