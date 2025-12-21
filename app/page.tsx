"use client";

import { useState } from "react";
import { LandingPage } from "@/app/components/LandingPage";
import { LoadingScreen } from "@/app/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className="relative min-h-screen bg-black overflow-hidden">
        <LandingPage />
      </main>
    </>
  );
}
