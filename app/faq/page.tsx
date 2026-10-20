import { Head } from "@/components/UI";
import Faq from "@/components/Faq";
export const metadata = { title: "FAQ — Helm" };
export default function Page() { return <main><Head k="File › FAQ" title={<>FAQ.</>} /><section className="bg-ink pb-28 text-paper"><div className="wrap max-w-[1000px]"><Faq /></div></section></main>; }
