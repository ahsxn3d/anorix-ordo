import { Head } from "@/components/UI";
import { changelog } from "@/lib/data";
export const metadata = { title: "Changelog — Helm" };
export default function Page() { return (<main><Head k="Helm › Changelog" title={<>What changed.</>} lead="Private-build notes. Versions and dates firm up when Helm opens." />
  <section className="bg-ink pb-28 text-paper"><div className="wrap max-w-[1000px]">{changelog.map(([v, st, list]) => <div key={v} className="grid gap-4 border-t border-white/10 py-10 md:grid-cols-[200px_1fr]"><div><p className="display text-[64px] text-mint">v{v}</p><p className="mono text-paper/45">{st}</p></div><ul className="space-y-3 text-[17px]">{list.map((x) => <li key={x} className="flex gap-3"><span className="mono text-mint">+</span>{x}</li>)}</ul></div>)}</div></section></main>); }
