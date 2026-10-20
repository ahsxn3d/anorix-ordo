import { Head } from "@/components/UI";
import AddBtn from "@/components/AddBtn";
import { plans, addons } from "@/lib/data";
import { money } from "@/lib/commerce/money";
export const metadata = { title: "Pricing — Helm" };
export default function Page() {
  return (<main><Head k="Helm › Pricing" title={<>Plans.</>} lead="Every plan has all five layers, approvals and the kill switch. Pick by how many missions you run at once." />
    <section className="bg-ink pb-20 text-paper"><div className="wrap grid gap-4 md:grid-cols-3">{plans.map((p, i) => <div key={p.id} className={`flex flex-col rounded-[22px] p-8 ${i === 1 ? "bg-mint text-ink" : "border border-white/10"}`}>
      <div className="flex justify-between"><span className="mono opacity-60">0{i + 1}</span>{i === 1 && <span className="mono rounded-full bg-ink px-3 py-1 text-mint">Most studios</span>}</div>
      <h2 className="display mt-8 text-[72px]">{p.name}</h2><p className="text-[15px] opacity-70">{p.line}</p><p className="display mt-8 text-[64px]">{money(p.price)}<span className="text-[20px] opacity-60">{p.per}</span></p>
      <ul className="mt-6 space-y-2 border-t border-current/15 pt-6 text-[15px]">{p.gets.map((g) => <li key={g}>+ {g}</li>)}</ul>
      <div className="mt-auto pt-8"><AddBtn id={p.id} className={i === 1 ? "btn-mint w-full justify-center !bg-ink !text-paper" : "btn-mint w-full justify-center"} label={`Choose ${p.name}`} /></div></div>)}</div></section>
    <section className="sheet relative z-10 -mt-6 bg-paper py-20 text-ink"><div className="wrap"><p className="mono mb-6 text-stone">Add-on layers</p><div className="divide-y divide-ink/10 border-y border-ink/10">{addons.map((a) => <div key={a.id} className="flex flex-col gap-4 py-6 md:flex-row md:items-center"><p className="display flex-1 text-[34px]">{a.name}</p><p className="flex-1 text-[15px] text-ink/60">{a.line}</p><p className="display w-[140px] text-[32px]">{money(a.price)}<span className="text-[14px] text-ink/50">{a.per}</span></p><AddBtn id={a.id} className="btn-mint !bg-ink !text-paper" label="Add" /></div>)}</div><p className="mt-6 text-[13px] text-stone">Prices in USD, billed monthly. Demo store: nothing is charged.</p></div></section></main>);
}
