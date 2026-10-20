"use client";
import { useCart } from "@/lib/commerce/cart";
import { money } from "@/lib/commerce/money";
export default function CartView() {
  const { lines, setQty, total, ready } = useCart();
  if (!ready) return <div className="h-40" />;
  if (!lines.length) return <div className="rounded-[18px] border border-white/10 p-10"><p className="mono text-paper/50">$ helm cart</p><p className="mt-3 text-[18px]">cart is empty</p><a href="/pricing" className="btn-mint mt-8">See plans →</a></div>;
  return (<div className="grid gap-8 md:grid-cols-12"><ul className="divide-y divide-white/10 border-y border-white/10 md:col-span-8">{lines.map((l) => <li key={l.id + l.opt} className="flex items-center gap-4 py-6"><span className="display flex-1 text-[30px]">{l.name}</span>
    <span className="flex items-center rounded-full border border-white/15"><button aria-label="Less" onClick={() => setQty(l.id, l.opt, l.qty - 1)} className="px-3 py-1">−</button><span className="mono w-6 text-center">{l.qty}</span><button aria-label="More" onClick={() => setQty(l.id, l.opt, l.qty + 1)} className="px-3 py-1">+</button></span>
    <span className="mono w-28 text-right">{money(l.price * l.qty)}/mo</span><button onClick={() => setQty(l.id, l.opt, 0)} className="mono text-paper/40 hover:text-[#ff6b6b]">rm</button></li>)}</ul>
    <aside className="rounded-[18px] bg-graphite p-7 md:col-span-4"><p className="mono text-paper/50">Summary</p><div className="mt-6 flex justify-between text-[15px]"><span>Monthly</span><span className="mono">{money(total)}</span></div><div className="mt-2 flex justify-between text-[15px] text-paper/50"><span>Tax</span><span className="mono">at checkout</span></div>
      <a href="/checkout" className="btn-mint mt-8 w-full justify-center">Checkout →</a><p className="mt-3 text-[12px] text-paper/45">Demo store. Nothing is charged.</p></aside></div>);
}
