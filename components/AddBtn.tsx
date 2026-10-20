"use client";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart";
import { items } from "@/lib/data";
export default function AddBtn({ id, className = "btn-mint", label = "Add to cart" }: { id: string; className?: string; label?: string }) {
  const { add, lines } = useCart(), [ok, setOk] = useState(false), it = items.find((x) => x.id === id)!, has = lines.some((l) => l.id === id);
  return <button onClick={() => { if (it.kind === "plan" && has) { location.href = "/cart"; return; } add({ id: it.id, name: `${it.name}${it.kind === "plan" ? " plan" : ""}`, price: it.price, opt: "monthly" }); setOk(true); setTimeout(() => setOk(false), 1600); }} className={className}>{ok ? "Added ✓" : has && it.kind === "plan" ? "In cart → view" : label}</button>;
}
