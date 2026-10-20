import { notFound } from "next/navigation";
import { Win } from "@/components/UI";
import OrbitMini from "@/components/OrbitMini";
import { layers, getLayer } from "@/lib/data";
export function generateStaticParams() { return layers.map((l) => ({ layer: l.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ layer: string }> }) { const l = getLayer((await params).layer); return { title: l ? `${l.name} layer — Helm` : "Layer — Helm" }; }
export default async function Page({ params }: { params: Promise<{ layer: string }> }) {
  const l = getLayer((await params).layer); if (!l) notFound(); const i = layers.indexOf(l), next = layers[(i + 1) % layers.length];
  return (<main>
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"><div className="absolute inset-0 md:left-[40%]"><OrbitMini stage={0.15 + i * 0.2} /></div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="wrap relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:justify-center"><p className="mono text-mint">{l.no} / Layer</p><h1 className="display mt-4 text-[clamp(80px,14vw,240px)]">{l.name}</h1><p className="mt-4 text-[clamp(22px,2.2vw,32px)]">{l.line}</p><p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-paper/65">{l.body}</p>
        <div className="mt-8 flex gap-3"><a href="/pricing" className="btn-mint">Get Helm →</a><a href="/docs/layers" className="btn-ghost">Read the docs</a></div></div></section>
    <section className="sheet relative z-10 -mt-10 bg-paper py-[clamp(80px,10vw,140px)] text-ink"><div className="wrap grid gap-6 md:grid-cols-12">
      <div className="md:col-span-5"><p className="mono mb-4 text-stone">What it does</p><ul className="divide-y divide-ink/10 border-y border-ink/10">{l.does.map((d) => <li key={d} className="py-4 text-[18px]">{d}</li>)}</ul>
        <p className="mono mb-4 mt-10 text-stone">What it waits for you on</p><div className="flex flex-wrap gap-2">{l.holds.map((h) => <span key={h} className="rounded-full bg-ink px-4 py-2 text-[14px] text-paper">{h}</span>)}</div></div>
      <Win title="helm — zsh" className="md:col-span-6 md:col-start-7"><pre className="mono whitespace-pre-wrap text-[13px] leading-[1.8]"><span className="text-paper">$ {l.cmd}</span>{"\n"}<span className="text-paper/60">{l.does.map((d, k) => `  [${k + 1}/${l.does.length}] ${d.toLowerCase()} … ok`).join("\n")}</span>{"\n"}<span className="text-mint">  {l.holds[0].startsWith("Nothing") ? "report written" : `held: ${l.holds.join(", ").toLowerCase()} → waiting for you`}</span></pre></Win>
    </div></section>
    <section className="bg-ink py-16 text-paper"><div className="wrap"><a href={`/features/${next.slug}`} className="group flex items-end justify-between border-t border-white/10 pt-8"><span><span className="mono text-paper/50">Next layer · {next.no}</span><span className="display mt-3 block text-[clamp(48px,7vw,120px)] group-hover:text-mint">{next.name}</span></span><span className="text-[40px]">→</span></a></div></section>
  </main>);
}
