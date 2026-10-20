import CartView from "@/components/CartView";
export const metadata = { title: "Cart — Helm" };
export default function Page() { return <main className="min-h-[70svh] bg-ink pb-24 pt-[clamp(110px,11vw,160px)] text-paper"><div className="wrap"><h1 className="display mb-12 text-[clamp(56px,8vw,128px)]">Cart.</h1><CartView /></div></main>; }
