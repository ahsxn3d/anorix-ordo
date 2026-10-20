import { Win } from "@/components/UI";
export default function NotFound() { return <main className="min-h-[80svh] bg-ink pb-24 pt-[clamp(110px,11vw,160px)] text-paper"><div className="wrap max-w-[900px]"><h1 className="display text-[clamp(80px,14vw,240px)]">404</h1>
  <Win title="helm — zsh" className="mt-8"><pre className="mono whitespace-pre-wrap text-[13px] leading-[1.8]">$ helm open this-page{"\n"}<span className="text-[#ff6b6b]">  error: no such route</span>{"\n"}<span className="text-paper/60">  hint: try / or /features</span></pre></Win>
  <div className="mt-8 flex gap-3"><a href="/" className="btn-mint">Home</a><a href="/features" className="btn-ghost">Layers</a></div></div></main>; }
