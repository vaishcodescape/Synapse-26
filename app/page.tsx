"use client";
import HomeSection from "@/app/synapse/page";
export default function Home() {

  return (
    <>
      <main className="relative min-h-screen bg-black overflow-hidden">
        {/* Main Content - Hidden during loading, visible after */}
        <div 
          className={`relative w-full transition-opacity duration-500`}
        >
          <HomeSection />
        </div>

      </main>

      {/* Just use this single section as Home Page 
      <HomeMainSection /> 
      */}
    </>
  );
}
