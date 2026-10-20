import { Win } from "@/components/UI";
export const metadata = { title: "Order placed — Helm" };
export default function Page() { return <main className="min-h-[80svh] bg-ink pb-24 pt-[clamp(110px,11vw,160px)] text-paper"><div className="wrap max-w-[900px]"><h1 className="display text-[clamp(56px,8vw,128px)]">You have the helm.</h1>
  <Win title="helm — zsh" className="mt-10"><pre className="mono whitespace-pre-wrap text-[13px] leading-[1.8]"><span>$ helm login</span>{"\n"}<span className="text-paper/60">  demo order received · no charge made</span>{"\n"}<span className="text-paper/60">  seat reserved for private build</span>{"\n"}<span className="text-mint">  next: helm init in your repo</span></pre></Win>
  <div className="mt-8 flex gap-3"><a href="/docs/getting-started" className="btn-mint">Getting started →</a><a href="/" className="btn-ghost">Home</a></div></div></main>; }
