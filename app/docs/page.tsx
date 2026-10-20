import { Head } from "@/components/UI";
import { docs } from "@/lib/data";
export const metadata = { title: "Docs — Helm" };
export default function Page() {
  return (<main><Head k="File › Docs" title={<>Docs.</>} lead="Four short guides. Enough to run your first mission today and wire Helm into your own tools tomorrow." />
    <section className="bg-ink pb-28 text-paper"><div className="wrap grid gap-4 md:grid-cols-2">{docs.map((d, i) => <a key={d.slug} href={`/docs/${d.slug}`} className="group rounded-[18px] border border-white/10 p-8 transition-colors hover:border-mint/50"><span className="mono text-paper/45">{String(i + 1).padStart(2, "0")} · {d.slug}.md</span><h2 className="display mt-6 text-[clamp(40px,4vw,64px)] group-hover:text-mint">{d.title}</h2><p className="mt-3 text-[15px] text-paper/60">{d.lead}</p></a>)}</div></section></main>);
}
