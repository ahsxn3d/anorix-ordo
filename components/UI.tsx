export function Head({ k, title, lead, light = false }: { k: string; title: React.ReactNode; lead?: string; light?: boolean }) {
  return (<section className={`${light ? "bg-paper text-ink" : "bg-ink text-paper"} pb-[clamp(56px,7vw,100px)] pt-[clamp(120px,12vw,180px)]`}><div className="wrap">
    <p className={`mono mb-8 ${light ? "text-stone" : "text-paper/55"}`}>{k}</p><h1 className="display text-[clamp(56px,9vw,160px)]">{title}</h1>
    {lead && <p className={`mt-8 max-w-[56ch] text-[17px] leading-relaxed ${light ? "text-ink/65" : "text-paper/65"}`}>{lead}</p>}</div></section>);
}
export function Win({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (<div className={`overflow-hidden rounded-[14px] border border-white/10 bg-[#08090a] text-paper ${className}`}><div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5"><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-mint" /><span className="mono ml-2 text-[11px] text-paper/45">{title}</span></div><div className="p-5">{children}</div></div>);
}
