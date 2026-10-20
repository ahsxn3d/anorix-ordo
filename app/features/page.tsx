import { Head } from "@/components/UI";
import OrbitMini from "@/components/OrbitMini";
import { layers, addons } from "@/lib/data";
import AddBtn from "@/components/AddBtn";
import { money } from "@/lib/commerce/money";
export const metadata = { title: "Layers — Helm" };
export default function Page() {
  return (<main><Head k="Layers · L1–L5" title={<>Five layers.<br /><span className="text-mint">One loop.</span></>} lead="Every mission runs through the same five layers. Each one checks the last, and only the last one can touch the outside world, with your approval." />
    <section className="bg-ink pb-24 text-paper"><div className="wrap grid gap-4 md:grid-cols-12">
      <div className="relative min-h-[420px] overflow-hidden rounded-[20px] bg-graphite md:col-span-5 md:row-span-5"><OrbitMini stage={0.55} /><p className="mono absolute bottom-4 left-4 text-paper/50">Live · the swarm in order</p></div>
      {layers.map((l) => <a key={l.slug} href={`/features/${l.slug}`} className="group flex items-center justify-between gap-6 rounded-[16px] border border-white/10 p-6 transition-colors hover:border-mint/50 hover:bg-white/[.03] md:col-span-7">
        <span className="mono text-mint">{l.no}</span><span className="flex-1"><span className="display block text-[clamp(34px,3.4vw,54px)]">{l.name}</span><span className="text-[15px] text-paper/60">{l.line}</span></span><span className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition-transform group-hover:rotate-45">↗</span></a>)}
    </div></section>
    <section className="sheet relative z-10 -mt-10 bg-paper py-[clamp(80px,10vw,140px)] text-ink"><div className="wrap"><p className="mono mb-6 text-stone">Add-on layers</p><h2 className="display text-[clamp(44px,6vw,96px)]">Bolt on more control.</h2>
      <div className="mt-12 grid gap-4 md:grid-cols-3">{addons.map((a) => <div key={a.id} className="flex flex-col rounded-[20px] bg-bone p-7 ring-1 ring-ink/10"><p className="display text-[34px]">{a.name}</p><p className="mt-2 text-[15px] text-ink/60">{a.line}</p><ul className="mt-6 space-y-2 text-[14px]">{a.gets.map((g) => <li key={g}>+ {g}</li>)}</ul><div className="mt-8 flex items-center justify-between pt-4"><span className="display text-[40px]">{money(a.price)}<span className="text-[16px] text-ink/50">{a.per}</span></span><AddBtn id={a.id} className="btn-mint !bg-ink !text-paper" label="Add" /></div></div>)}</div></div></section>
  </main>);
}
