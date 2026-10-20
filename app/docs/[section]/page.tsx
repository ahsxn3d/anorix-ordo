import { notFound } from "next/navigation";
import { Win } from "@/components/UI";
import { docs } from "@/lib/data";
export function generateStaticParams() { return docs.map((d) => ({ section: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) { const s = (await params).section, d = docs.find((x) => x.slug === s); return { title: `${d?.title ?? "Docs"} — Helm docs` }; }
export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const s = (await params).section, d = docs.find((x) => x.slug === s); if (!d) notFound();
  return (<main className="bg-ink pb-28 pt-[clamp(100px,10vw,140px)] text-paper"><div className="wrap grid gap-10 md:grid-cols-12">
    <aside className="md:col-span-3"><p className="mono mb-4 text-paper/45">docs/</p><ul className="space-y-1">{docs.map((x) => <li key={x.slug}><a href={`/docs/${x.slug}`} className={`block rounded-[6px] px-3 py-2 text-[15px] ${x.slug === s ? "bg-mint text-ink" : "text-paper/70 hover:bg-white/5"}`}>{x.title}</a></li>)}</ul></aside>
    <article className="md:col-span-8 md:col-start-5"><p className="mono text-paper/45">{d.slug}.md</p><h1 className="display mt-4 text-[clamp(56px,8vw,128px)]">{d.title}</h1><p className="mt-5 max-w-[50ch] text-[18px] text-paper/65">{d.lead}</p>
      <div className="mt-12 space-y-8">{d.body.map(([h, code], i) => <section key={h}><h2 className="text-[22px] font-semibold"><span className="mono mr-3 text-mint">{i + 1}.</span>{h}</h2><Win title="terminal" className="mt-4"><pre className="mono overflow-x-auto whitespace-pre text-[13px] leading-[1.8] text-paper/85">{code}</pre></Win></section>)}</div>
      <p className="mt-12 text-[14px] text-paper/45">Helm is in private build; commands show the intended interface.</p></article></div></main>);
}
