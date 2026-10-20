import Hero from "@/components/Hero";
import Thesis from "@/components/Thesis";
import Core from "@/components/Core";
import Agents from "@/components/Agents";
import Rollout from "@/components/Rollout";
import Library from "@/components/Library";
import Proof from "@/components/Proof";
import Quote from "@/components/Quote";
import Closing from "@/components/Closing";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Thesis />
        <Core />
        <Agents />
        <Rollout />
        <Library />
        <Proof />
        <Quote />
        <Closing />
      </main>
    </>
  );
}
