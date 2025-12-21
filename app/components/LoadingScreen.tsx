"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(cardWrapperRef.current, { rotateY: -180, scale: 0.8 });
      gsap.set(imageRef.current, { opacity: 0 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(textRef.current, { opacity: 0 });
      gsap.set(themeRef.current, { opacity: 0, y: 25 });
      gsap.set(titleRef.current, { opacity: 0, y: 35, letterSpacing: "0.3em" });
      gsap.set(subtitleRef.current, { opacity: 0 });
      gsap.set(progressRef.current, { scaleX: 0 });
      gsap.set(".card-suit", { opacity: 0, scale: 0 });

      // Main timeline
      const tl = gsap.timeline({
        onComplete: () => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              setIsComplete(true);
              onComplete?.();
            },
          });

          exitTl
            .to(".card-suit", { opacity: 0, scale: 0, stagger: 0.02, duration: 0.2 })
            .to(textRef.current, { opacity: 0, y: -20, duration: 0.4 }, "-=0.1")
            .to(glowRef.current, { opacity: 0, scale: 1.5, duration: 0.4 }, "-=0.3")
            .to(cardWrapperRef.current, { rotateY: 180, scale: 0.8, duration: 0.6 }, "-=0.3")
            .to(imageRef.current, { opacity: 0, duration: 0.3 }, "-=0.3")
            .to(containerRef.current, { opacity: 0, duration: 0.3 }, "-=0.1");
        },
      });

      // Cinematic entrance with card flip
      tl.to(glowRef.current, {
        opacity: 0.5,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(imageRef.current, {
        opacity: 1,
        duration: 0.3,
      }, "-=0.8")
      .to(cardWrapperRef.current, {
        rotateY: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      }, "-=0.8")
      .to(textRef.current, { opacity: 1, duration: 0.3 }, "-=0.6")
      .to(themeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4")
      .to(".card-suit", {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(2)",
      }, "-=0.3")
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        letterSpacing: "0.15em",
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.3")
      .to(subtitleRef.current, {
        opacity: 1,
        duration: 0.4,
      }, "-=0.4")
      .to(progressRef.current, {
        scaleX: 1,
        duration: 2.2,
        ease: "power1.inOut",
      }, "-=0.2");

      // Subtle breathing animation with slight tilt
      gsap.to(cardWrapperRef.current, {
        scale: 1.03,
        rotateY: 5,
        rotateX: 2,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.7,
        scale: 1.1,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Suits floating
      gsap.utils.toArray(".card-suit").forEach((suit, i) => {
        gsap.to(suit as Element, {
          y: -4,
          duration: 1.5 + i * 0.15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2.5 + i * 0.1,
        });
      });

      // Auto-complete after 5s
      gsap.delayedCall(5, () => tl.progress(1));
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Red glow behind image */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220,38,38,0.25) 0%, rgba(139,0,0,0.1) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Card with 3D flip */}
      <div
        className="relative w-[85vh] md:w-[95vh] max-w-[1100px] h-[50vw] md:h-[55vw] max-h-[600px]"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={cardWrapperRef}
          className="w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card back (shown when flipped) */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
              border: "2px solid rgba(220, 38, 38, 0.3)",
              boxShadow: "0 0 60px rgba(220, 38, 38, 0.2)",
            }}
          >
            {/* Card back design */}
            <div className="absolute inset-4 rounded-xl border border-red-900/30 flex items-center justify-center">
              <div className="text-6xl md:text-8xl text-red-500/30">🃏</div>
            </div>
          </div>

          {/* Card front (the image) */}
          <div
            ref={imageRef}
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src="/loading-screen.png"
              alt="Synapse - Joker's Realm"
              fill
              sizes="(max-width: 768px) 80vh, 900px"
              className="object-contain rotate-90"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div ref={textRef} className="text-center mt-6 md:mt-8 px-6">
        {/* Joker's Realm */}
        <div ref={themeRef} className="mb-4">
          <h2 
            className="text-white text-xl md:text-3xl font-semibold tracking-wide"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Joker&apos;s Realm
          </h2>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="card-suit text-red-500 text-sm md:text-base">♠</span>
            <span className="card-suit text-red-400 text-sm md:text-base">♥</span>
            <span className="card-suit text-red-500 text-sm md:text-base">♦</span>
            <span className="card-suit text-red-400 text-sm md:text-base">♣</span>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-white text-4xl md:text-6xl font-black tracking-[0.15em] synapse-title"
        >
          SYNAPSE
        </h1>
        <p 
          ref={subtitleRef}
          className="text-red-500 text-xl md:text-2xl font-light mt-1 tracking-widest"
        >
          2026
        </p>
        
        {/* Progress bar */}
        <div className="mt-6 w-48 md:w-64 mx-auto">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-red-500 origin-left rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
