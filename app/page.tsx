import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <main className="relative isolate overflow-x-clip">
      <Hero />

      <div className="pt-8 sm:pt-12">
        <About />
      </div>
    </main>
  );
}
