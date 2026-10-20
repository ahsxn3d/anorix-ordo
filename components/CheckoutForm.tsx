"use client";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { money } from "@/lib/commerce/money";
export default function CheckoutForm() {
  const { lines, total, clear, ready } = useCart(), [busy, setBusy] = useState(false);
  const f = "w-full rounded-[10px] border border-white/15 bg-transparent px-4 py-3 text-[15px] outline-none focus:border-mint";
  if (ready && !lines.length) return <p className="text-paper/60">Your cart is empty. <a href="/pricing" className="text-mint underline">See plans</a></p>;
  return (<form className="grid gap-10 md:grid-cols-12" onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(() => { clear(); location.href = "/checkout/done"; }, 800); }}>
    <div className="grid gap-4 sm:grid-cols-2 md:col-span-7"><p className="mono text-paper/50 sm:col-span-2">1 · Account</p>
      <label className="text-[13px] text-paper/60">Name<input required autoComplete="name" className={`${f} mt-2`} /></label><label className="text-[13px] text-paper/60">Email<input required type="email" autoComplete="email" className={`${f} mt-2`} /></label>
      <label className="text-[13px] text-paper/60 sm:col-span-2">Repo you'll start with (optional)<input placeholder="github.com/you/site" className={`${f} mt-2`} /></label>
      <p className="mono mt-4 text-paper/50 sm:col-span-2">2 · Payment (demo)</p>
      <label className="text-[13px] text-paper/60 sm:col-span-2">Card number<input required inputMode="numeric" placeholder="4242 4242 4242 4242" className={`${f} mt-2`} /></label>
      <label className="text-[13px] text-paper/60">Expiry<input required placeholder="12 / 28" className={`${f} mt-2`} /></label><label className="text-[13px] text-paper/60">CVC<input required placeholder="123" className={`${f} mt-2`} /></label></div>
    <aside className="h-fit rounded-[18px] bg-graphite p-7 md:col-span-5"><p className="mono text-paper/50">Order</p><ul className="mt-4 space-y-2 text-[15px]">{lines.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name} × {l.qty}</span><span className="mono">{money(l.price * l.qty)}</span></li>)}</ul>
      <div className="mt-6 flex justify-between border-t border-white/10 pt-4 text-[18px]"><span>Monthly</span><span className="mono">{money(total)}</span></div>
      <button disabled={busy} className="btn-mint mt-8 w-full justify-center disabled:opacity-60">{busy ? "Processing…" : "Place demo order"}</button><p className="mt-3 text-[12px] text-paper/45">Demo checkout: no card is charged and nothing is stored.</p></aside></form>);
}
