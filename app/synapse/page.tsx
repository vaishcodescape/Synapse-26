"use client";

import HeroSection from "@/components/Hero-Section";
import AboutSection from "@/components/Home-AboutSection";
import JokerSection from "@/components/Home-JokerSection";
import ArtistsSection from "@/components/Artists";
import HallOfFame from "@/components/Home-HallOfFame";
import Footer from "@/components/ui/Footer";
import { SmoothScroller } from "@/components/ui/SmoothScroller";

export default function HomeSection() {
  return (
    <SmoothScroller>
      <main className="flex flex-col ">
        <HeroSection />
        <div className="end hidden overflow-x-hidden w-full flex-col relative top-[500vh]">
          <AboutSection />
          <JokerSection />
          <ArtistsSection />
          <HallOfFame />
          <Footer />
        </div>
      </main>
    </SmoothScroller>
  );
}
