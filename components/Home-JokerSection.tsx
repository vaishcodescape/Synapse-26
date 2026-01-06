'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JokerSection() {
    const jokerSectionRef = useRef<HTMLDivElement>(null);
    const jokerSvgRef = useRef<SVGSVGElement>(null);
    const jokerPathRef = useRef<SVGPathElement>(null);
    const jokerDotRef = useRef<HTMLDivElement>(null);
    const leftDoorRef = useRef<HTMLDivElement>(null);
    const rightDoorRef = useRef<HTMLDivElement>(null);
    const leftTitleRef = useRef<HTMLDivElement>(null);
    const rightTitleRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollHintRef = useRef<HTMLDivElement>(null);
    const exploreTitleRef = useRef<HTMLHeadingElement>(null);
    const fullImageRef = useRef<HTMLDivElement>(null);

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

    const setupPaths = useCallback(() => {
        if (jokerPathRef.current) {
            const path = generateViewportPath();
            jokerPathRef.current.setAttribute("d", path);
        }
    }, [generateViewportPath]);

    const setupCardHoverAnimations = useCallback(() => {
        const cards = document.querySelectorAll('.card-container');
        const cardState = new WeakMap();

        cards.forEach(card => {
            const inner = card.querySelector('.card-inner') as HTMLElement;
            if (!inner) return;

            let hoverDidFlip = false;
            let preHoverRotation = 0;
            let hoverLockedUntilLeave = false;

            card.addEventListener('mouseenter', () => {
                if (hoverLockedUntilLeave) return;

                const currentRotation = gsap.getProperty(inner, "rotateY") as number;
                const normalized = ((currentRotation % 360) + 360) % 360;
                const isFullyBack = Math.abs(normalized - 180) < 5;

                if (isFullyBack) {
                    hoverDidFlip = false;
                    return;
                }

                hoverDidFlip = true;
                preHoverRotation = currentRotation;

                gsap.to(inner, {
                    rotateY: 180,
                    duration: 0.3,
                    ease: "power2.inOut",
                    overwrite: "auto"
                });
            });

            card.addEventListener('mouseleave', () => {
                hoverLockedUntilLeave = false;

                if (!hoverDidFlip) return;

                gsap.to(inner, {
                    rotateY: preHoverRotation,
                    duration: 0.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                hoverDidFlip = false;
            });

            ScrollTrigger.addEventListener("scrollStart", () => {
                if (!hoverDidFlip) return;

                hoverLockedUntilLeave = true;
                hoverDidFlip = false;

                gsap.to(inner, {
                    rotateY: preHoverRotation,
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            cardState.set(inner, {
                hovering: false,
                lastScrollRotation: 0
            });
        });

        ScrollTrigger.addEventListener("scrollEnd", () => {
            document.querySelectorAll('.card-inner').forEach(inner => {
                const state = cardState.get(inner);
                if (!state || !state.hovering) return;
                state.lastScrollRotation = gsap.getProperty(inner, "rotateY") as number;
            });
        });
    }, []);

    useEffect(() => {
        if (jokerSvgRef.current && jokerPathRef.current && jokerDotRef.current &&
            leftDoorRef.current && rightDoorRef.current && leftTitleRef.current && rightTitleRef.current) {

            const jokerSvg = jokerSvgRef.current;
            const jokerPath = jokerPathRef.current;
            const jokerDot = jokerDotRef.current;
            const leftDoor = leftDoorRef.current;
            const rightDoor = rightDoorRef.current;
            const leftTitle = leftTitleRef.current;
            const rightTitle = rightTitleRef.current;

            const path = generateViewportPath();
            jokerPath.setAttribute("d", path);

            const jokerPathLength = jokerPath.getTotalLength();

            const jokerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: jokerSectionRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 3,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        if (fullImageRef.current) {
                            fullImageRef.current.style.display =
                                progress < 0.05 ? "block" : "none";
                        }
                        const point = jokerPath.getPointAtLength(jokerPathLength * progress);
                        const rect = jokerSvg.getBoundingClientRect();

                        const x = rect.left + (point.x / 1000) * rect.width;
                        const y = rect.top + (point.y / 1000) * rect.height;

                        jokerDot.style.left = `${x}px`; // Centered by subtracting half width
                        jokerDot.style.top = `${y}px`; // Centered by subtracting half height
                    },
                    onEnter: () => {
                        jokerDot.style.opacity = "1";
                        const artistDot = document.getElementById("artistPathDot");
                        if (artistDot) artistDot.style.opacity = "0";
                    },
                    onLeave: () => {
                        jokerDot.style.opacity = "0";
                        const artistDot = document.getElementById("artistPathDot");
                        if (artistDot) artistDot.style.opacity = "1";
                    },
                    onEnterBack: () => {
                        jokerDot.style.opacity = "1";
                        const artistDot = document.getElementById("artistPathDot");
                        if (artistDot) artistDot.style.opacity = "0";
                    }
                }
            });
            jokerTl.set(scrollHintRef.current, { opacity: 1 });
            jokerTl.to({}, { duration: 0.5 });
            jokerTl.to(scrollHintRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, 0);

            jokerTl.to(leftTitle, {
                y: -40,
                duration: 2,
                ease: "power2.out"
            }, ">")
                .to(rightTitle, {
                    y: 40,
                    duration: 2,
                    ease: "power2.out"
                }, "<");

            jokerTl.to(leftDoor, {
                x: "-100%",
                duration: 4,
                ease: "power2.inOut"
            }, "<")
                .to(rightDoor, {
                    x: "100%",
                    duration: 4,
                    ease: "power2.inOut"
                }, "<");
            gsap.set(exploreTitleRef.current, {
                opacity: 0,
                y: 80,
                scale: 1.1,
                color: "#9ca3af" // gray-400
            });
            jokerTl.to(exploreTitleRef.current, {
                opacity: 1,
                y: 40,
                duration: 1.2,
                ease: "power2.out"
            }, "<+0.3");

            jokerTl.to(exploreTitleRef.current, {
                y: -window.innerHeight * 0.25,
                scale: 1,
                color: "#ffffff",
                duration: 2.5,
                ease: "power1.out"
            }, ">+0.8");
            jokerTl.to(exploreTitleRef.current, {
                top: "6%",
                y: -10,
                duration: 1.8,
                ease: "power2.inOut"
            }, ">");

            const getCardX = (i: number) => {
                const vw = window.innerWidth;
                const spread = Math.min(vw * 0.35, 420);
                return (i - 1.5) * (spread / 1.5);
            };

            const getCardY = (i: number) => {
                const vh = window.innerHeight;
                return [0.1, -0.03, 0.11, -0.02][i] * vh;
            };

            const getCardR = (i: number) => [-12, 6, -6, 12][i];

            jokerTl.to("#c2", {
                opacity: 1,
                scale: 1,
                x: getCardX(1),
                y: getCardY(1),
                rotation: getCardR(1),
                duration: 2,
                ease: "expo.out"
            }, ">+0.5")
                .to("#c3", {
                    opacity: 1,
                    scale: 1,
                    x: getCardX(2),
                    y: getCardY(2),
                    rotation: getCardR(2),
                    duration: 2,
                    ease: "expo.out"
                }, "<+0.3")
                .to(["#c1", "#c4"], {
                    opacity: 1,
                    scale: 1,
                    x: (i: number) => i ? getCardX(3) : getCardX(0),
                    y: (i: number) => i ? getCardY(3) : getCardY(0),
                    rotation: (i: number) => i ? getCardR(3) : getCardR(0),
                    duration: 2,
                    ease: "expo.out"
                }, "<+0.3");

            const cardInners = gsap.utils.toArray(".card-inner");
            const shuffledCards = cardInners.sort(() => Math.random() - 0.5);

            jokerTl.to(shuffledCards, {
                rotateY: 180,
                duration: 1,
                stagger: 2,
                ease: "power1.inOut"
            }, "+=0.5")
                .to(shuffledCards, {
                    duration: 1,
                    ease: "none",
                });

            setupCardHoverAnimations();

            const handleResize = () => {
                const newPath = generateViewportPath();
                jokerPath.setAttribute("d", newPath);

                jokerTl.scrollTrigger?.refresh();

            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                jokerTl.scrollTrigger?.kill();
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.trigger === jokerSectionRef.current) {
                        trigger.kill();
                    }
                });
            };
        }
    }, [generateViewportPath, setupCardHoverAnimations]);

    useEffect(() => {
        setupPaths();
    }, [setupPaths]);

    useEffect(() => {
        // subtle breathing animation (idle)
        if (scrollHintRef.current) {
            gsap.fromTo(
                scrollHintRef.current,
                { y: 0 },
                {
                    y: 10,
                    duration: 1,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true,
                }
            );
        }
    })
    const cards = [
        { id: 'c1', name: 'Ace of Heart', image: '/images_home/Ace_Heart.png', day: 'Day 1', isRed: true },
        { id: 'c2', name: 'Ace of Clubs', image: '/images_home/Ace_Clubs.png', day: 'Day 2' },
        { id: 'c3', name: 'Ace of Diamond', image: '/images_home/Ace_Diamond.png', day: 'Day 3', isRed: true },
        { id: 'c4', name: 'Ace of Spades', image: '/images_home/Ace_Spades.png', day: 'Day 4' },
    ];

    return (
        <div
            className="joker-section relative h-screen overflow-hidden"
            id="jokerSection"
            ref={jokerSectionRef}
        >
            <div className="joker-content relative top-0 h-screen overflow-hidden">
                <div className="viewport-wrapper absolute inset-0 flex overflow-hidden z-10">

                    <div
                        className="door door-left absolute top-0 w-1/2 h-full bg-white z-100"
                        id="leftDoor"
                        ref={leftDoorRef}
                        style={{
                            background: "white url('/images_home/left.png') no-repeat right center",
                            backgroundSize: 'contain'
                        }}
                    >
                        <div
                            className="door-title left-title absolute bottom-8
             right-0
             font-joker
             text-[clamp(3.5rem,8vw,7rem)]
             tracking-[0.12em]
             text-black
             pointer-events-none
             will-change-transform
             text-right
             pr-12"
                            ref={leftTitleRef}
                        >
                            joker&apos;s
                        </div>
                    </div>

                    <div
                        className="door door-right absolute top-0 right-0 w-1/2 h-full bg-white z-100"
                        id="rightDoor"
                        ref={rightDoorRef}
                        style={{
                            background: "white url('/images_home/right.png') no-repeat left center",
                            backgroundSize: 'contain'
                        }}
                    >
                        <div
                            className="door-title right-title absolute bottom-8
             left-0
             font-joker
             text-[clamp(3.5rem,8vw,7rem)]
             tracking-[0.12em]
             text-black
             pointer-events-none
             will-change-transform
             text-left
             pl-12"
                            ref={rightTitleRef}
                        >
                            realm
                        </div>
                    </div>

                    <div className="main-content absolute inset-0 flex flex-col items-center justify-center bg-black z-5">
                        <h1
                            ref={exploreTitleRef}
                            className="font-joker text-center
    text-[clamp(3rem,8vw,8rem)]
    w-11/12
    z-2
    absolute
    top-1/2
    -translate-y-1/2
    text-gray-500
    will-change-transform
    origin-center"
                        >
                            explore events
                        </h1>

                        {/* <div className="watermark-container absolute flex flex-col leading-[0.8] select-none z-1">
                            <span className="watermark-text font-italic uppercase text-[clamp(4rem,12vw,10rem)] text-[rgba(128,128,128,0.12)]">Explore</span>
                            <span className="watermark-text font-italic uppercase text-[clamp(4rem,12vw,10rem)] text-[rgba(128,128,128,0.12)]">Events</span>
                        </div> */}

                        <svg
                            id="jokerPath"
                            width="100%"
                            height="100%"
                            viewBox="0 0 1000 1000"
                            preserveAspectRatio="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 pointer-events-none z-5"
                            ref={jokerSvgRef}
                        >
                            <path
                                id="jokerSvgPath"
                                stroke="white"
                                strokeWidth="2"
                                fill="none"
                                ref={jokerPathRef}
                            />
                        </svg>

                        <div
                            id="jokerPathDot"
                            className="fixed w-22.5 h-22.5 bg-[#cf0000] rounded-full blur-[30px] pointer-events-none z-5 opacity-0 -translate-x-1/2 -translate-y-1/2"
                            ref={jokerDotRef}
                        ></div>

                        <div className="burst-zone relative w-full h-[70vh] pointer-events-auto flex justify-center items-center z-10">
                            {cards.map((card, index) => (
                                <div
                                    key={card.id}
                                    className="card-container absolute"
                                    style={{
                                        width: 'clamp(100px, 22vw, 220px)',
                                        height: 'clamp(140px, 30vw, 310px)',
                                        transform: 'translateY(120vh) scale(0)',
                                    }}
                                    id={card.id}
                                    ref={el => { cardRefs.current[index] = el }}
                                >
                                    <div
                                        className="card-inner w-full h-full transform-style-preserve-3d rounded transition-transform duration-100 ease-in-out"
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <div
                                            className="card-front absolute inset-0 backface-hidden lowercase rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.6)] font-joker"
                                            style={{
                                                background: `url(${card.image}) no-repeat center center`,
                                                backgroundSize: 'contain',
                                                backfaceVisibility: 'hidden'
                                            }}
                                        >
                                        </div>
                                        <div
                                            className="card-back absolute inset-0 backface-hidden rounded-lg lowercase shadow-[0_15px_35px_rgba(0,0,0,0.6)] font-joker flex flex-col gap-4 items-center justify-center p-8 text-center"
                                            style={{
                                                background: "url('/images_home/card_back.png') no-repeat center center",
                                                backgroundSize: 'contain',
                                                backfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)'
                                            }}
                                        >
                                            <h2 className="text-black text-3xl font-bold">{card.day}</h2>
                                            <h2 className={card.isRed ? 'text-[#cf0000] font-jqka text-4xl font-bold' : 'text-black text-4xl font-jqka font-bold'}>{card.name}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    ref={scrollHintRef}
                    className="scroll-hint fixed bottom-8 left-1/2 -translate-x-1/2 z-50
               text-black rotate-90 text-[clamp(20px,4vw,36px)]
               tracking-[-0.3rem] opacity-0 select-none pointer-events-none"
                >
                    &gt;&gt;&gt;&gt;
                </div>
            </div>
        </div>
    );
}






// Yash Bhaiya This is your code : Recheck all and please confirm
// 'use client';

// import { useEffect, useRef, useCallback } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Tilt from "react-parallax-tilt";
// // import { Icon } from "@iconify/react";

// gsap.registerPlugin(ScrollTrigger);

// export default function JokerSection() {
//     const jokerSectionRef = useRef<HTMLDivElement>(null);
//     const jokerSvgRef = useRef<SVGSVGElement>(null);
//     const jokerPathRef = useRef<SVGPathElement>(null);
//     const jokerDotRef = useRef<HTMLDivElement>(null);
//     const leftDoorRef = useRef<HTMLDivElement>(null);
//     const rightDoorRef = useRef<HTMLDivElement>(null);
//     const leftTitleRef = useRef<HTMLDivElement>(null);
//     const rightTitleRef = useRef<HTMLDivElement>(null);
//     const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//     const exploreTitleRef = useRef<HTMLHeadingElement>(null);
//     const exploreWordRef = useRef<HTMLSpanElement>(null);
//     const fullImageRef = useRef<HTMLDivElement>(null);
//     const eventsWordRef = useRef<HTMLSpanElement>(null);



//     const generateViewportPath = useCallback(() => {
//         if (typeof window === 'undefined') return '';
//         const w = window.innerWidth;
//         const h = window.innerHeight;
//         const sx = 1000 / w;
//         const sy = 1000 / h;
//         const startX = (w / 2) * sx;
//         const startY = 0;
//         const endX = (w / 2) * sx;
//         const endY = 1000;
//         const c1x = (w * 0.15) * sx;
//         const c1y = (h * 0.35) * sy;
//         const c2x = (w * 0.85) * sx;
//         const c2y = (h * 0.65) * sy;

//         return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
//     }, []);

//     const setupPaths = useCallback(() => {
//         if (jokerPathRef.current) {
//             const path = generateViewportPath();
//             jokerPathRef.current.setAttribute("d", path);
//         }
//     }, [generateViewportPath]);

//     const setupCardHoverAnimations = useCallback(() => {
//         const cards = document.querySelectorAll('.card-container');
//         const cardState = new WeakMap();

//         cards.forEach(card => {
//             const inner = card.querySelector('.card-inner') as HTMLElement;
//             if (!inner) return;

//             let hoverDidFlip = false;
//             let preHoverRotation = 0;
//             let hoverLockedUntilLeave = false;

//             card.addEventListener('mouseenter', () => {
//                 if (hoverLockedUntilLeave) return;

//                 const currentRotation = gsap.getProperty(inner, "rotateY") as number;
//                 const normalized = ((currentRotation % 360) + 360) % 360;
//                 const isFullyBack = Math.abs(normalized - 180) < 5;

//                 if (isFullyBack) {
//                     hoverDidFlip = false;
//                     return;
//                 }

//                 hoverDidFlip = true;
//                 preHoverRotation = currentRotation;

//                 gsap.to(inner, {
//                     rotateY: 180,
//                     duration: 0.3,
//                     ease: "power2.inOut",
//                     overwrite: "auto"
//                 });
//             });

//             card.addEventListener('mouseleave', () => {
//                 hoverLockedUntilLeave = false;

//                 if (!hoverDidFlip) return;

//                 gsap.to(inner, {
//                     rotateY: preHoverRotation,
//                     duration: 0.5,
//                     ease: "power2.out",
//                     overwrite: "auto"
//                 });

//                 hoverDidFlip = false;
//             });

//             ScrollTrigger.addEventListener("scrollStart", () => {
//                 if (!hoverDidFlip) return;

//                 hoverLockedUntilLeave = true;
//                 hoverDidFlip = false;

//                 gsap.to(inner, {
//                     rotateY: preHoverRotation,
//                     duration: 0.4,
//                     ease: "power2.out",
//                     overwrite: "auto"
//                 });
//             });

//             cardState.set(inner, {
//                 hovering: false,
//                 lastScrollRotation: 0
//             });
//         });

//         ScrollTrigger.addEventListener("scrollEnd", () => {
//             document.querySelectorAll('.card-inner').forEach(inner => {
//                 const state = cardState.get(inner);
//                 if (!state || !state.hovering) return;
//                 state.lastScrollRotation = gsap.getProperty(inner, "rotateY") as number;
//             });
//         });
//     }, []);

//     useEffect(() => {
//         if (jokerSvgRef.current && jokerPathRef.current && jokerDotRef.current &&
//             leftDoorRef.current && rightDoorRef.current && leftTitleRef.current && rightTitleRef.current) {

//             const jokerSvg = jokerSvgRef.current;
//             const jokerPath = jokerPathRef.current;
//             const jokerDot = jokerDotRef.current;
//             const leftDoor = leftDoorRef.current;
//             const rightDoor = rightDoorRef.current;
//             const leftTitle = leftTitleRef.current;
//             const rightTitle = rightTitleRef.current;

//             const path = generateViewportPath();
//             jokerPath.setAttribute("d", path);

//             const jokerPathLength = jokerPath.getTotalLength();

//             const jokerTl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: jokerSectionRef.current,
//                     start: "top top",
//                     end: "+=300%",
//                     scrub: 3,
//                     pin: true,
//                     pinSpacing: true,
//                     anticipatePin: 1,
//                     invalidateOnRefresh: true,

//                     onUpdate: (self) => {
//                         const progress = self.progress;

//                         /* FULL IMAGE VISIBILITY */
//                         if (fullImageRef.current) {
//                             fullImageRef.current.style.display =
//                                 progress < 0.05 ? "block" : "none";
//                         }

//                         /* EXISTING JOKER DOT LOGIC */
//                         const point = jokerPath.getPointAtLength(jokerPathLength * progress);
//                         const rect = jokerSvg.getBoundingClientRect();

//                         const x = rect.left + (point.x / 1000) * rect.width;
//                         const y = rect.top + (point.y / 1000) * rect.height;

//                         jokerDot.style.left = `${x}px`;
//                         jokerDot.style.top = `${y}px`;
//                     },
//                     onEnter: () => {
//                         jokerDot.style.opacity = "1";
//                         const artistDot = document.getElementById("artistPathDot");
//                         if (artistDot) artistDot.style.opacity = "0";
//                     },
//                     onLeave: () => {
//                         jokerDot.style.opacity = "0";
//                         const artistDot = document.getElementById("artistPathDot");
//                         if (artistDot) artistDot.style.opacity = "1";
//                     },
//                     onEnterBack: () => {
//                         jokerDot.style.opacity = "1";
//                         const artistDot = document.getElementById("artistPathDot");
//                         if (artistDot) artistDot.style.opacity = "0";
//                     }
//                 }
//             });

//             jokerTl.to({}, { duration: 0.5 });

//             jokerTl.to(leftTitle, {
//                 y: -40,
//                 duration: 1,
//                 ease: "power2.out"
//             }, ">")
//                 .to(rightTitle, {
//                     y: 40,
//                     duration: 1,
//                     ease: "power2.out"
//                 }, "<");

//             jokerTl.to(leftDoor, {
//                 x: "-100%",
//                 duration: 2.5,
//                 ease: "power2.inOut"
//             }, "<")
//                 .to(rightDoor, {
//                     x: "100%",
//                     duration: 2.5,
//                     ease: "power2.inOut"
//                 }, "<");

//             gsap.set(exploreTitleRef.current, {
//                 opacity: 0,
//                 y: 80,
//                 scale: 1.1,
//                 color: "#9ca3af" // gray-400
//             });
//             jokerTl.to(exploreTitleRef.current, {
//                 opacity: 1,
//                 y: 40,
//                 duration: 1.2,
//                 ease: "power2.out"
//             }, "<+0.3");

//             jokerTl.to(exploreTitleRef.current, {
//                 y: -window.innerHeight * 0.25,
//                 scale: 1,
//                 color: "#ffffff",
//                 duration: 2.5,
//                 ease: "power1.out"
//             }, ">+0.8");
//             jokerTl.to(exploreTitleRef.current, {
//                 top: "6%",
//                 y: 0,
//                 duration: 1.8,
//                 ease: "power2.inOut"
//             }, ">");

//             // if (exploreTitleRef.current) {
//             //   gsap.set(exploreTitleRef.current, {
//             //   opacity: 0,
//             //   y: 120,        // thoda aur niche (depth)
//             //   x: "-2%",
//             //   scale: 0.85,   // 👈 small start (KEY)
//             //   filter: "blur(6px)", // 👈 depth illusion
//             //   color: "#9ca3af",
//             // });


//             //   jokerTl.to(
//             //   exploreTitleRef.current,
//             //   {
//             //     opacity: 1,
//             //     y: 40,
//             //     scale: 1.18,        // 👈 dheere dheere bada
//             //     filter: "blur(0px)",
//             //     duration: 1.6,
//             //     ease: "power3.out", // 👈 smooth cinematic ease
//             //   },
//             //   "<+0.4" // doors thoda open hone ke baad
//             // );

//             //   // move up + turn white
//             //   jokerTl.to(exploreTitleRef.current, {
//             //   y: -window.innerHeight * 0.22,
//             //   scale: 1.05,
//             //   color: "#ffffff",
//             //   duration: 2.4,
//             //   ease: "power1.out",
//             // }, ">+0.6");


//             //   // lock at top, slightly smaller
//             //   jokerTl.to(exploreTitleRef.current, {
//             //   top: "8rem",
//             //   y: 0,
//             //   x: "-2%",
//             //   fontSize: "clamp(3.6rem, 6.5vw, 5.6rem)", // 👈 bigger than before
//             //   whiteSpace: "nowrap",                    // 👈 wrap OFF
//             //   lineHeight: "1",                         // 👈 tight single line
//             //   duration: 1.8,
//             //   ease: "power2.inOut",
//             // });

//             // }




//             const getCardX = (i: number) => {
//                 const vw = window.innerWidth;
//                 const spread = Math.min(vw * 0.35, 420);
//                 return (i - 1.5) * (spread / 1.5);
//             };

//             const getCardY = (i: number) => {
//                 const vh = window.innerHeight;
//                 return [-0.01, -0.05, 0, -0.06][i] * vh;
//             };


//             const getCardR = (i: number) => [-12, 6, -6, 12][i];

//             jokerTl.to("#c2", {
//                 opacity: 1,
//                 scale: 1,
//                 x: getCardX(1),
//                 y: getCardY(1),
//                 rotation: getCardR(1),
//                 duration: 2,
//                 ease: "expo.out"
//             }, ">+0.5")
//                 .to("#c3", {
//                     opacity: 1,
//                     scale: 1,
//                     x: getCardX(2),
//                     y: getCardY(2),
//                     rotation: getCardR(2),
//                     duration: 2,
//                     ease: "expo.out"
//                 }, "<+0.3")
//                 .to(["#c1", "#c4"], {
//                     opacity: 1,
//                     scale: 1,
//                     x: (i: number) => i ? getCardX(3) : getCardX(0),
//                     y: (i: number) => i ? getCardY(3) : getCardY(0),
//                     rotation: (i: number) => i ? getCardR(3) : getCardR(0),
//                     duration: 2,
//                     ease: "expo.out"
//                 }, "<+0.3");

//             const cardInners = gsap.utils.toArray(".card-inner");
//             const shuffledCards = cardInners.sort(() => Math.random() - 0.5);

//             jokerTl.to(shuffledCards, {
//                 rotateY: 180,
//                 duration: 1,
//                 stagger: 2,
//                 ease: "power1.inOut"
//             }, "+=0.5");

//             setupCardHoverAnimations();

//             const handleResize = () => {
//                 const newPath = generateViewportPath();
//                 jokerPath.setAttribute("d", newPath);

//                 jokerTl.scrollTrigger?.refresh();

//             };

//             window.addEventListener("resize", handleResize);

//             return () => {
//                 window.removeEventListener("resize", handleResize);
//                 jokerTl.scrollTrigger?.kill();
//                 ScrollTrigger.getAll().forEach(trigger => {
//                     if (trigger.trigger === jokerSectionRef.current) {
//                         trigger.kill();
//                     }
//                 });
//             };
//         }
//     }, [generateViewportPath, setupCardHoverAnimations]);

//     useEffect(() => {
//         setupPaths();
//     }, [setupPaths]);

//     const cards = [
//         { id: 'c1', name: 'Ace of Heart', image: '/images_home/Ace_Heart.png', day: 'Day 1', isRed: true },
//         { id: 'c2', name: 'Ace of Clubs', image: '/images_home/Ace_Clubs.png', day: 'Day 2' },
//         { id: 'c3', name: 'Ace of Diamond', image: '/images_home/Ace_Diamond.png', day: 'Day 3', isRed: true },
//         { id: 'c4', name: 'Ace of Spades', image: '/images_home/Ace_Spades.png', day: 'Day 4' },
//     ];

//     return (
//         <div
//             className="joker-section relative h-screen overflow-hidden"
//             id="jokerSection"
//             ref={jokerSectionRef}
//         >
//             <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20">
//                 <div className="flex flex-col items-center">
//                     <span className="rotate-90 text-1xl text-black -mb-2">❯</span>
//                     <span className="rotate-90 text-1xl text-black -mb-2">❯</span>
//                     <span className="rotate-90 text-1xl text-black -mb-2">❯</span>
//                     <span className="rotate-90 text-1xl text-black">❯</span>
//                 </div>
//             </div>

//             <div className="joker-content relative top-0 h-screen overflow-hidden">
//                 <div className="viewport-wrapper absolute inset-0 flex overflow-hidden z-10">
//                     {/* FULL IMAGE OVERLAY (INITIAL ONLY) */}
//                     {/* <div
//                         ref={fullImageRef}
//                         className="absolute inset-0 z-[101]"
//                         style={{
//                             background: "white url('/full1.png') no-repeat center center",
//                             backgroundSize: "contain",
//                         }}
//                     > */}
//                     {/* <div
//   ref={fullImageRef}
//   className="fixed inset-0 z-[101] flex items-center justify-center bg-white"
// >
//   <img
//     src="/images_home/fullsvg.svg"
//     alt="Full SVG"
//     className="w-[60%] max-w-[600px] h-auto object-contain translate-y-[140px] translate-x-[450px]"
//   /> */}
// {/* </div> */}
// <div
//   ref={fullImageRef}
//   className="fixed inset-0 z-[101] flex items-center justify-center bg-white"
// >
//   {/* Glow wrapper */}
//   <div
//     className="relative"
//     style={{
//       filter: "drop-shadow(0 0 80px rgba(120,120,120,0.65))",
// transition: "filter 0.4s ease",
//     }}
//   >
//     <Tilt
//       tiltMaxAngleX={6}
//       tiltMaxAngleY={6}
//       perspective={1200}
//       scale={1.03}
//       transitionSpeed={1500}
//       glareEnable={false}
//     >
//       <img
//         src="/images_home/fullsvg.svg"
//         alt="Full SVG"
//         className="
//           w-[60%]
//           max-w-[600px]
//           h-auto
//           object-contain
//           translate-y-[140px]
//           translate-x-[450px]
//         "
//       />
//     </Tilt>
//   </div>

// <div
//   className="
//     absolute
//     top-32
//     right-8
//     z-[110]
//     font-jqka
//     text-[clamp(0.8rem,1.5vw,1.5rem)]
//     tracking-[0.35em]
//     text-gray-500
//     pointer-events-none
//     opacity-80
//   "
// >
//   move your cursor
// </div>


//                         <div className="absolute bottom-[8%] w-full text-center font-joker
//                   text-[clamp(3.5rem,8vw,7rem)]
//                   tracking-[0.35em] text-black">
//                             <span className="inline-block joker-word">joker&apos;s</span>
//                             <span className="inline-block realm-word">realm</span>
//                         </div>
//                     </div>
//                     <div
//                         className="door door-left absolute top-0 w-1/2 h-full bg-white z-100"
//                         id="leftDoor"
//                         ref={leftDoorRef}
//                         style={{
//                             background: "white url('/images_home/left.png') no-repeat right center",
//                             backgroundSize: 'contain'
//                         }}
//                     >
//                         <div
//                             className="door-title left-title absolute bottom-8
//              right-0
//              font-joker
//              text-[clamp(3.5rem,8vw,7rem)]
//              tracking-[0.12em]
//              text-black
//              pointer-events-none
//              will-change-transform
//              text-right
//              pr-12"
//                             ref={leftTitleRef}
//                         >
//                             joker&apos;s
//                         </div>


//                     </div>

//                     <div
//                         className="door door-right absolute top-0 right-0 w-1/2 h-full bg-white z-100"
//                         id="rightDoor"
//                         ref={rightDoorRef}
//                         style={{
//                             background: "white url('/images_home/right.png') no-repeat left center",
//                             backgroundSize: 'contain'
//                         }}
//                     >
//                         <div
//                             className="door-title right-title absolute bottom-8
//              left-0
//              font-joker
//              text-[clamp(3.5rem,8vw,7rem)]
//              tracking-[0.12em]
//              text-black
//              pointer-events-none
//              will-change-transform
//              text-left
//              pl-12"
//                             ref={rightTitleRef}
//                         >
//                             realm
//                         </div>


//                     </div>



//                     <div className="main-content absolute inset-0 flex flex-col items-center justify-center bg-black z-5">
//                         <h1
//                             ref={exploreTitleRef}
//                             className="font-joker text-center
//     text-[clamp(3rem,8vw,8rem)]
//     w-11/12
//     z-2
//     absolute
//     top-1/2
//     -translate-y-1/2
//     text-gray-500
//     will-change-transform
//     origin-center"
//                         >
//                             explore events
//                         </h1>
//                         {/* <h1
//   ref={exploreTitleRef}
//   className="
//     font-joker
//     absolute
//     top-1/2
//     -translate-y-1/2
//     z-2
//     w-full
//     text-center
//     text-gray-500
//     leading-[0.9]
//     will-change-transform
//   "
// >
//   <span className="block text-[clamp(4rem,10vw,9rem)]">
//     explore
//   </span>
//   <span className="block text-[clamp(4rem,10vw,9rem)]">
//     events
//   </span>
// </h1> */}

//                         {/* <h1
//   ref={exploreTitleRef}
//   className="
//     font-joker
//     absolute
//     top-1/2
//     left-1/2
//     -translate-x-1/2
//     -translate-y-1/2
//     z-20
//     text-center
//     leading-[0.95]
//     text-[clamp(4.5rem,12vw,10rem)]
//     max-w-[90vw]
//     text-gray-400
//     will-change-transform
//     origin-center
//   "
// >
//   explore events
// </h1> */}





//                         {/* <div className="watermark-container absolute flex flex-col leading-[0.8] select-none z-1">
//                             <span className="watermark-text font-italic uppercase text-[clamp(4rem,12vw,10rem)] text-[rgba(128,128,128,0.12)]">Explore</span>
//                             <span className="watermark-text font-italic uppercase text-[clamp(4rem,12vw,10rem)] text-[rgba(128,128,128,0.12)]">Events</span>
//                         </div> */}

//                         <svg
//                             id="jokerPath"
//                             width="100%"
//                             height="100%"
//                             viewBox="0 0 1000 1000"
//                             preserveAspectRatio="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="absolute inset-0 pointer-events-none z-5"
//                             ref={jokerSvgRef}
//                         >
//                             <path
//                                 id="jokerSvgPath"
//                                 stroke="white"
//                                 strokeWidth="2"
//                                 fill="none"
//                                 ref={jokerPathRef}
//                             />
//                         </svg>

//                         <div
//                             id="jokerPathDot"
//                             className="fixed w-22.5 h-22.5 bg-[#CF0000] rounded-full blur-[30px] pointer-events-none z-5 opacity-0 -translate-x-1/2 -translate-y-1/2"
//                             ref={jokerDotRef}
//                         ></div>

//                         <div className="burst-zone relative w-full h-[70vh] pointer-events-auto flex justify-center items-center z-10">
//                             {cards.map((card, index) => (
//                                 <div
//                                     key={card.id}
//                                     className="card-container absolute"
//                                     style={{
//                                         width: 'clamp(100px, 22vw, 220px)',
//                                         height: 'clamp(140px, 30vw, 310px)',
//                                         transform: 'translateY(120vh) scale(0)',
//                                     }}
//                                     id={card.id}
//                                     ref={el => { cardRefs.current[index] = el }}
//                                 >
//                                     <div
//                                         className="card-inner w-full h-full transform-style-preserve-3d rounded transition-transform duration-100 ease-in-out"
//                                         style={{ transformStyle: 'preserve-3d' }}
//                                     >
//                                         <div
//                                             className="card-front absolute inset-0 backface-hidden lowercase rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.6)] font-joker"
//                                             style={{
//                                                 background: `url(${card.image}) no-repeat center center`,
//                                                 backgroundSize: 'contain',
//                                                 backfaceVisibility: 'hidden'
//                                             }}
//                                         >
//                                         </div>
//                                         <div
//                                             className="card-back absolute inset-0 backface-hidden rounded-lg lowercase shadow-[0_15px_35px_rgba(0,0,0,0.6)] font-joker flex flex-col gap-4 items-center justify-center p-8 text-center"
//                                             style={{
//                                                 background: "url('/images_home/card_back.png') no-repeat center center",
//                                                 backgroundSize: 'contain',
//                                                 backfaceVisibility: 'hidden',
//                                                 transform: 'rotateY(180deg)'
//                                             }}
//                                         >
//                                             <h2 className="text-black text-2xl font-bold">{card.day}</h2>
//                                             <h2 className={card.isRed ? 'text-[#CF0000] text-2xl font-bold' : 'text-black text-2xl font-bold'}>{card.name}</h2>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
