'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Artist {
    name: string;
    date: string;
    image: string;
}

export default function ArtistsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [artists] = useState<Artist[]>([
        { name: "Concert Artist 1", date: "11 Jan 2026", image: "https://picsum.photos/1800/1500?1" },
        { name: "ARJIT SINGH", date: "11 Jan 2026", image: "https://picsum.photos/1800/1500?2" },
        { name: "Concert Artist 4", date: "12 Jan 2026", image: "https://picsum.photos/1800/1500?3" },
        { name: "Concert Artist 5", date: "13 Jan 2026", image: "https://picsum.photos/1800/1500?4" },
        { name: "Concert Artist 6", date: "14 Jan 2026", image: "https://picsum.photos/3840/2160?5" },
        { name: "Concert Artist 7", date: "15 Jan 2026", image: "https://picsum.photos/3840/2160?6" }
    ]);

    const artistSectionRef = useRef<HTMLDivElement>(null);
    const artistSvgRef = useRef<SVGSVGElement>(null);
    const artistPathRef = useRef<SVGPathElement>(null);
    const artistDotRef = useRef<HTMLDivElement>(null);
    const imagesContainerRef = useRef<HTMLDivElement>(null);
    const carouselTimerRef = useRef<NodeJS.Timeout | null>(null);

    const generateViewportPath = useCallback(() => {
        if (typeof window === 'undefined') return '';
        const w = window.innerWidth;
        const h = window.innerHeight;
        const sx = 1000 / w;
        const sy = 1000 / h;
        const startX = (w / 2) * sx;
        const startY = 0;
        const endX = (w / 2) * sx;
        const endY = 1000;
        const c1x = (w * 0.15) * sx;
        const c1y = (h * 0.35) * sy;
        const c2x = (w * 0.85) * sx;
        const c2y = (h * 0.65) * sy;

        return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
    }, []);

    const animateCarousel = useCallback(() => {
        if (!imagesContainerRef.current) return;

        const items = imagesContainerRef.current.querySelectorAll(".carousel-item");
        const spacing = Math.min(window.innerWidth * 0.7, 600);

        items.forEach((item, i) => {
            const element = item as HTMLElement;
            let diff = i - currentIndex;
            const total = items.length;

            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const offset = diff * spacing;
            const absOffset = Math.abs(offset);

            let opacity = 1;
            let scale = 1;
            let zIndex = 5;

            if (diff === 0) {
                element.classList.add("center");
                zIndex = 10;
                opacity = 1;
            } else {
                element.classList.remove("center");

                if (absOffset > spacing) {
                    opacity = Math.max(0.3, 1 - (absOffset - spacing) / (spacing * 2));
                    scale = 0.8;
                }

                zIndex = 5 - Math.abs(diff);
            }

            element.style.transform = `translateX(${offset}px) scale(${scale})`;
            element.style.opacity = `${opacity}`;
            element.style.zIndex = `${zIndex}`;
        });
    }, [currentIndex]);

    const startCarouselTimer = useCallback(() => {
        if (carouselTimerRef.current) {
            clearInterval(carouselTimerRef.current);
        }

        carouselTimerRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % artists.length);
        }, 5000);
    }, [artists.length]);

    const resetCarouselTimer = useCallback(() => {
        startCarouselTimer();
    }, [startCarouselTimer]);

    const nextArtist = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % artists.length);
        resetCarouselTimer();
    }, [artists.length, resetCarouselTimer]);

    const prevArtist = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + artists.length) % artists.length);
        resetCarouselTimer();
    }, [artists.length, resetCarouselTimer]);

    useEffect(() => {
        startCarouselTimer();

        return () => {
            if (carouselTimerRef.current) {
                clearInterval(carouselTimerRef.current);
            }
        };
    }, [startCarouselTimer]);

    useEffect(() => {
        if (artistSvgRef.current && artistPathRef.current && artistDotRef.current) {
            const artistSvg = artistSvgRef.current;
            const artistPath = artistPathRef.current;
            const artistDot = artistDotRef.current;

            const jokerDot = document.getElementById("jokerPathDot");

            const path = generateViewportPath();
            artistPath.setAttribute("d", path);
            const artistPathLength = artistPath.getTotalLength();

            const scrollTrigger = ScrollTrigger.create({
                trigger: artistSectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onEnter: () => {
                    if (jokerDot) jokerDot.style.opacity = "0";
                    if (artistDot) artistDot.style.opacity = "1";
                },
                onLeave: () => {
                    if (jokerDot) jokerDot.style.opacity = "0";
                    if (artistDot) artistDot.style.opacity = "0";
                },
                onEnterBack: () => {
                    if (jokerDot) jokerDot.style.opacity = "0";
                    if (artistDot) artistDot.style.opacity = "1";
                },
                onUpdate: (self) => {
                    const progress = self.progress;
                    const point = artistPath.getPointAtLength(progress * artistPathLength);
                    const rect = artistSvg.getBoundingClientRect();

                    const x = rect.left + (point.x / 1000) * rect.width;
                    const y = rect.top + (point.y / 1000) * rect.height;

                    artistDot.style.left = `${x}px`;
                    artistDot.style.top = `${y}px`;
                }
            });

            const handleResize = () => {
                const newPath = generateViewportPath();
                artistPath.setAttribute("d", newPath);
                animateCarousel();
                scrollTrigger.refresh();
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                scrollTrigger.kill();
            };
        }
    }, [generateViewportPath, animateCarousel]);

    useEffect(() => {
        animateCarousel();
    }, [currentIndex, animateCarousel]);

    return (
        <div
            className="artists-section relative bg-white h-screen"
            id="artistsSection"
            ref={artistSectionRef}
        >
            <div className="artists-content relative top-0 h-screen flex flex-col">
                <svg
                    id="artistPath"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 pointer-events-none z-1"
                    ref={artistSvgRef}
                >
                    <path
                        id="artistSvgPath"
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.3"
                        ref={artistPathRef}
                    />
                </svg>

                <h1
                    id="artistsTitle"
                    className="font-joker text-[clamp(3rem,12vw,7.5rem)] px-8 leading-none text-black lowercase text-center pt-8"
                >
                    ARTISTS
                </h1>

                <div className="carousel relative flex-1 overflow-hidden flex items-center justify-center">
                    <div className="black-line absolute left-0 right-0 top-1/2 h-1 bg-black -translate-y-1/2 z-0"></div>

                    <div
                        id="artistPathDot"
                        className="fixed w-22.5 h-22.5 bg-[#ff3c3c] rounded-full blur-[30px] pointer-events-none z-5 opacity-0 -translate-x-1/2 -translate-y-1/2"
                        ref={artistDotRef}
                    ></div>

                    <div
                        className="images-container relative w-full h-full flex items-center justify-center"
                        id="imagesContainer"
                        ref={imagesContainerRef}
                    >
                        {artists.map((artist, i) => (
                            <div
                                key={i}
                                className={`carousel-item absolute transition-all duration-600 ease-in-out ? 'center' : ''
                                    }`}
                                onClick={() => {
                                    setCurrentIndex(i);
                                    resetCarouselTimer();
                                }}
                            >
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="block object-cover z-10 transition-transform duration-300 md:hover:scale-110"
                                    style={{
                                        width: i === currentIndex
                                            ? 'clamp(240px, 42vw, 500px)'
                                            : 'clamp(160px, 28vw, 350px)',
                                        height: i === currentIndex
                                            ? 'clamp(160px, 30vw, 350px)'
                                            : 'clamp(110px, 20vw, 240px)'
                                    }}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="info absolute bottom-15 left-1/2 -translate-x-1/2 border-t-2 border-b-2 border-black py-2 md:py-4 bg-white text-center text-black z-11"
                        style={{
                            width: 'clamp(200px, 50vw, 500px)',
                        }}
                    >
                        <h2 id="artistName" className="text-lg md:text-2xl font-bold uppercase">
                            {artists[currentIndex].name}
                        </h2>
                        <p id="artistDate" className="text-xs md:text-sm">
                            {artists[currentIndex].date}
                        </p>
                    </div>

                    <button
                        className="absolute top-1/2 -translate-y-1/2
             w-15.5 h-13.5 bg-red-600
             flex items-center justify-center
             hover:opacity-85 transition z-20 cursor-pointer"
                        onClick={prevArtist}
                        style={{
                            width: 'clamp(36px, 6vw, 62px)',
                            height: 'clamp(32px, 5vw, 54px)',
                            left: 'calc(50% - clamp(120px, 27vw, 270px))'
                        }}
                    >
                        <div
                            className="w-8.25 h-5.5 bg-black rotate-270"
                            style={{
                                width: 'clamp(18px, 2.5vw, 33px)',
                                height: 'clamp(12px, 1.8vw, 22px)',
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                            }}
                        />
                    </button>

                    <button
                        className="absolute top-1/2 -translate-y-1/2
             w-15.5 h-13.5 bg-red-600
             flex items-center justify-center
             hover:opacity-85 transition z-20 cursor-pointer"
                        onClick={nextArtist}
                        style={{
                            width: 'clamp(36px, 6vw, 62px)',
                            height: 'clamp(32px, 5vw, 54px)',
                            right: 'calc(50% - clamp(120px, 27vw, 270px))'
                        }}
                    >
                        <div
                            className="w-8.25 h-5.5 bg-black -rotate-270"
                            style={{
                                width: 'clamp(18px, 2.5vw, 33px)',
                                height: 'clamp(12px, 1.8vw, 22px)',
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                            }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}