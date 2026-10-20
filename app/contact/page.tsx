import { Head } from "@/components/UI";
import Contact from "@/components/Contact";
export const metadata = { title: "Contact — Helm" };
export default function Page() { return <main><Head k="Helm › Contact" title={<>Say hello.</>} lead="Questions about missions, plans or the private build." /><section className="bg-ink pb-28 text-paper"><div className="wrap max-w-[900px]"><Contact /></div></section></main>; }
