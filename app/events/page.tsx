"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/ui/Footer";
import NavigationPanel from "@/components/ui/NavigationPanel";
import { Navbar } from "@/components/ui/Resizable-navbar";

type EventItem = {
    slug: string;
    title: string;
    cover: string;
};

const EVENTS: EventItem[] = [
    { slug: "dance", title: "DANCE EVENT", cover: "/images_events/dance.png" },
    { slug: "fashion", title: "Fashion Show", cover: "/images_events/fashionshow.png" },
    { slug: "music", title: "MUSIC EVENT", cover: "/images_events/music.png" },
    { slug: "theatre", title: "THEATRE SHOW", cover: "/images_events/theatre.png" },
    { slug: "gaming", title: "GAMING EVENT", cover: "/images_events/gaming.png" },
];

export default function EventsPage() {
    const router = useRouter();
    const [revealed, setRevealed] = useState<Record<string, boolean>>({});
    const [revealAll, setRevealAll] = useState(false);

    const handleCardClick = (slug: string) => {
        if (!revealed[slug]) {
            setRevealed((p) => ({ ...p, [slug]: true }));
            return;
        }
        router.push(`/events/${slug}`);
    };

    const toggleRevealAll = () => {
        const next = !revealAll;
        setRevealAll(next);

        if (next) {
            const map: Record<string, boolean> = {};
            EVENTS.forEach((e) => (map[e.slug] = true));
            setRevealed(map);
        } else {
            setRevealed({});
        }
    };

    return (
        <>
            <Navbar visible={true}>
                <NavigationPanel />
            </Navbar>
            <main className="bg-black text-white overflow-x-hidden">
                {/* HERO */}
                <section className="relative h-[45vh] w-full">
                    <Image
                        src="/top.jpg"
                        alt="Events"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover grayscale object-[50%_85%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black" />
                </section>

                {/* TITLE */}
                <section className="relative py-10">
                    <h1 className="text-center text-8xl tracking-[0.3em] lowercase font-joker">
                        events
                    </h1>

                    <button
                        onClick={toggleRevealAll}
                        className="absolute right-10 top-1/2 -translate-y-1/2
                     text-xs opacity-80 text-right leading-relaxed select-none font-joker"
                    >
                        <div>👁 Reveal / Unreveal all</div>
                        <div>* Tap on card to reveal</div>
                    </button>
                </section>

                {/* CARDS — CROSS PATTERN */}
                <section className="px-24 py-40">
                    <div className="grid grid-cols-3 auto-rows-[600px]">
                        {EVENTS.map((event, index) => {
                            const isFlipped = revealAll || revealed[event.slug];

                            return (
                                < React.Fragment key={event.slug} >
                                    <div className="flex justify-center">
                                        <div
                                            onClick={() => handleCardClick(event.slug)}
                                            className={`relative w-[700px] h-[600px] cursor-pointer ${isFlipped ? "group" : ""
                                                }`}
                                            style={{ perspective: "1500px" }}
                                        >
                                            <div
                                                className="relative w-full h-full transition-transform ease-in-out"
                                                style={{
                                                    transformStyle: "preserve-3d",
                                                    transitionDuration: "900ms",
                                                    transform: isFlipped
                                                        ? "rotateY(180deg)"
                                                        : "rotateY(0deg)",
                                                }}
                                            >
                                                {/* FRONT */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ backfaceVisibility: "hidden" }}
                                                >
                                                    <Image
                                                        src="/images_events/card.png"
                                                        alt=""
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 700px"
                                                        className="object-cover rounded-md"
                                                    />
                                                </div>

                                                {/* BACK */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        backfaceVisibility: "hidden",
                                                        transform: "rotateY(180deg)",
                                                    }}
                                                >
                                                    <Image
                                                        src={event.cover}
                                                        alt={event.title}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 700px"
                                                        className="object-cover rounded-md"
                                                    />

                                                    {/* DARK OVERLAY */}
                                                    <div
                                                        className="absolute inset-0
                                     bg-gradient-to-t
                                     from-black/70 via-black/0 to-transparent
                                     opacity-0 transition-opacity duration-300
                                     group-hover:opacity-100"
                                                    />

                                                    {/* TEXT */}
                                                    <div
                                                        className="absolute bottom-8 left-1/2 -translate-x-1/2
                                     font-card text-[40px] leading-none
                                     text-white text-center
                                     opacity-0 transition-opacity duration-300
                                     pointer-events-none
                                     group-hover:opacity-100
                                     whitespace-nowrap"
                                                    >
                                                        {event.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* EMPTY COLUMN — creates cross pattern */}
                                    {index !== EVENTS.length - 1 && <div />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </section>
                <Footer />
            </main >
        </>
    );
}
