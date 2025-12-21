"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CountdownTimer } from "./CountdownTimer";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lasersRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Set the event date - March 21, 2026
  const eventDate = new Date("2026-03-21T00:00:00");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      );

      // Laser lines animation
      gsap.fromTo(
        ".laser-line",
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.5,
        }
      );

      // Bottom content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.8 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black px-6 md:px-12 py-8">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/80 pointer-events-none" />

      {/* Laser Lines */}
      <div
        ref={lasersRef}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <div className="relative w-full h-full max-w-4xl">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="laser-line absolute top-0 bottom-0 w-[2px] origin-top"
              style={{
                left: `${20 + i * 15}%`,
                background:
                  "linear-gradient(180deg, transparent 0%, #ff0000 20%, #ff0000 80%, transparent 100%)",
                boxShadow: "0 0 20px 2px rgba(255, 0, 0, 0.6)",
                opacity: 0.7 - i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Title */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 md:pt-24 gap-4">
        <Badge 
          variant="outline" 
          className="border-red-500/50 text-red-400 bg-red-500/10 hover:bg-red-500/20 px-4 py-1"
        >
          March 2026
        </Badge>
        <h1
          ref={titleRef}
          className="synapse-title text-center text-white"
          style={{
            fontSize: "clamp(3rem, 15vw, 12rem)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            textShadow: "0 0 60px rgba(255,255,255,0.1)",
          }}
        >
          SYNAPSE&apos; 26
        </h1>
        <p className="text-white/50 text-lg md:text-xl tracking-widest mt-2">
          DA KA TYOHAAR
        </p>
      </div>

      {/* Bottom Section */}
      <div 
        ref={contentRef}
        className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8 pb-4"
      >
        {/* Countdown Timer Card */}
        <Card className="bg-black/30 border-white/10 backdrop-blur-sm order-2 md:order-1">
          <CardContent className="p-4 md:p-6">
            <CountdownTimer targetDate={eventDate} />
          </CardContent>
        </Card>

        {/* Register Button */}
        <div className="order-1 md:order-2">
          <Button
            variant="outline"
            size="lg"
            className="group relative px-12 py-6 md:px-16 md:py-7 text-lg md:text-xl font-semibold tracking-wider bg-transparent border-2 border-white text-white rounded-none hover:bg-white hover:text-black transition-all duration-300 overflow-hidden"
          >
            {/* Red accent bar */}
            <span className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-red-600 transform origin-left transition-transform duration-300 group-hover:scale-x-0" />
            Register
          </Button>
        </div>
      </div>
    </section>
  );
}
