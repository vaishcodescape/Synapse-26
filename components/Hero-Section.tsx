'use client';

import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CountdownTimer } from './CountdownTimer';
import {
    Navbar,
    NavbarButton
} from "@/components/ui/Resizable-navbar";
import NavigationPanel from '@/components/ui/NavigationPanel';

gsap.registerPlugin(ScrollTrigger);

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const NUMBERS = "0123456789";
const FIRST_PHASE_TIME = 4000;

type HeroSectionProps = {
    onEnter: () => void;
};

let check = false;

export default function HeroSection({ onEnter }: HeroSectionProps) {
    const INTRO_KEY = "synapse_has_entered";

    const [isLoading, setIsLoading] = useState(() => {
        if (typeof window === "undefined") return true;
        return sessionStorage.getItem(INTRO_KEY) !== "true";
    });

    const [showEnter, setShowEnter] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showNavbar, setShowNavbar] = useState(false);
    const [part3Active, setPart3Active] = useState(false);

    const hasRunMaskRef = useRef(false);
    const enterTriggeredRef = useRef(false);
    const scrollHintRef = useRef<HTMLDivElement>(null);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLDivElement>(null);
    const enterBtnRef = useRef<HTMLButtonElement>(null);
    const cardRef = useRef<HTMLImageElement>(null);
    const coloredImageRef = useRef<HTMLImageElement>(null);
    const maskLayerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const part3Ref = useRef<HTMLDivElement>(null);
    const part3_2Ref = useRef<HTMLDivElement>(null);
    const screenContainerRef = useRef<HTMLDivElement>(null);
    const frontScreenRef = useRef<HTMLDivElement>(null);
    const flipCardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null)
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollFillRef = useRef<HTMLDivElement>(null);
    const prevOverflow = useRef<{ html: string; body: string }>({
        html: "",
        body: "",
    });

    const assetsRef = useRef({
        paths: [] as SVGPathElement[],
        loaded: 0,
        total: 0,
        finished: false,
        finishing: false,
        strokeProgress: 0,
        strokeStartTime: 0,
        assetProgress: 0,
        pending: new Set<string>(),
        resolved: new Set<string>()
    });
    const PRELOAD_ASSETS = [
        // Hero visuals
        "/images_home/RedHand2.jpeg",
        "/images_home/redcard4.png",
        "/images_home/card_center.png",
        "/Synapse_Music.mp3",
        "/images_home/inkReveal2.gif",

        // About section
        "/images_home/Group_9.png",
    ];

    const updateProgressText = useCallback((progress: number) => {
        if (progressTextRef.current) {
            progressTextRef.current.textContent = `Loading ${Math.round(progress * 100)}%`;
        }

        setLoadingProgress(Math.round(progress * 100));
    }, []);

    const scrambleTween = useCallback((element: HTMLElement, finalText: string) => {
        const chars = finalText.split("");

        return gsap.to({}, {
            duration: 0.6,
            onUpdate: function () {
                const p = (this as any).progress();
                let out = "";

                chars.forEach((ch, i) => {
                    if (i < p * chars.length) {
                        out += ch;
                    } else if (/[A-Za-z]/.test(ch)) {
                        out += LETTERS[Math.floor(Math.random() * LETTERS.length)];
                    } else if (/[0-9]/.test(ch)) {
                        out += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
                    } else {
                        out += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
                    }
                });

                element.textContent = out;
            },
            onComplete: () => {
                element.textContent = finalText;
            },
            onReverseComplete: () => {
                element.textContent = "";
            }
        });
    }, []);

    const loadSVG = useCallback(async () => {
        try {
            const res = await fetch("/images_home/uncolored2.svg");
            if (!res.ok) throw new Error();
            const svgText = await res.text();
            if (svgContainerRef.current) {
                svgContainerRef.current.innerHTML = svgText;
            }
        } catch {
            if (svgContainerRef.current) {
                svgContainerRef.current.innerHTML = `
                    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 100h600v400H100z" />
                        <circle cx="400" cy="300" r="120" />
                    </svg>
                `;
            }
        }

        const svg = svgContainerRef.current?.querySelector("svg");
        if (svg) {
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "100%");
            svg.style.width = "100%";
            svg.style.height = "100%";
            svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
            const pathsArray = Array.from(svg.querySelectorAll("path, circle")) as SVGPathElement[];
            assetsRef.current.paths = pathsArray;

            pathsArray.forEach(p => {
                p.style.fillOpacity = "0";
                p.style.stroke = "#ffffff";
                p.style.strokeWidth = "1.6";

                const len = p.getTotalLength();
                p.style.strokeDasharray = `${len}`;
                p.style.strokeDashoffset = `${len}`;
                (p as any).dataset.len = len;
            });

        }
    }, []);
    async function decodeImages(urls: string[]) {
        const imageUrls = urls.filter(src =>
            /\.(png|jpg|jpeg|gif|webp)$/i.test(src)
        );

        await Promise.all(
            imageUrls.map(async (src) => {
                const res = await fetch(src);
                const blob = await res.blob();

                // Forces decode + rasterization
                await createImageBitmap(blob);
            })
        );
    }

    const revealFill = useCallback(() => {
        updateProgressText(1);
        if (progressTextRef.current) {
            progressTextRef.current.style.opacity = "0";
        }

        setTimeout(() => {
            if (enterBtnRef.current) {
                setShowEnter(true);
            }
        }, 600);
    }, []);

    const FINISH_EASE = 0.25;
    const FINISH_THRESHOLD = 0.99;

    const drawStroke = useCallback(() => {
        const now = Date.now();
        const elapsed = now - assetsRef.current.strokeStartTime;

        const timeProgress = Math.min(1, elapsed / FIRST_PHASE_TIME);
        const combinedProgress =
            0.5 * timeProgress +
            0.5 * assetsRef.current.assetProgress;

        const target = assetsRef.current.finishing
            ? 1
            : combinedProgress;

        const ease = assetsRef.current.finishing
            ? FINISH_EASE
            : 0.12;

        assetsRef.current.strokeProgress +=
            (target - assetsRef.current.strokeProgress) * ease;

        assetsRef.current.paths.forEach(p => {
            p.style.strokeDashoffset =
                `${Number((p as any).dataset.len) * (1 - assetsRef.current.strokeProgress)}`;
        });

        updateProgressText(assetsRef.current.strokeProgress);

        const timeDone = elapsed >= FIRST_PHASE_TIME;
        const assetsDone = assetsRef.current.assetProgress >= 0.9;

        // 🔑 enter finishing phase (once)
        if (timeDone && assetsDone && !assetsRef.current.finishing) {
            assetsRef.current.finishing = true;
        }

        // ✅ final snap & completion
        if (
            assetsRef.current.finishing &&
            assetsRef.current.strokeProgress >= FINISH_THRESHOLD
        ) {
            assetsRef.current.strokeProgress = 1;

            assetsRef.current.paths.forEach(p => {
                p.style.strokeDashoffset = "0";
            });

            updateProgressText(0.99);
            assetsRef.current.finished = true;
            revealFill();
            return;
        }

        requestAnimationFrame(drawStroke);
    }, [updateProgressText, revealFill]);

    const loadAssets = useCallback(async () => {
        // Reset loader state
        assetsRef.current.loaded = 0;
        assetsRef.current.total = PRELOAD_ASSETS.length;
        assetsRef.current.assetProgress = 0;
        assetsRef.current.finished = false;

        // 1️⃣ Start SVG loader immediately
        loadSVG().then(() => {
            assetsRef.current.strokeStartTime = Date.now();
            drawStroke();
        });

        // 2️⃣ REAL preload (decode + bitmap)
        try {
            await decodeImages(PRELOAD_ASSETS);
        } catch (e) {
            console.warn("Image decode preload failed", e);
        }

        const markLoaded = () => {
            assetsRef.current.loaded += 1;
            assetsRef.current.assetProgress = Math.min(
                1,
                assetsRef.current.loaded / assetsRef.current.total
            );
        };

        PRELOAD_ASSETS.forEach(src => {
            if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(src)) {
                const img = new Image();
                img.src = src;
                img.complete ? markLoaded() : (img.onload = img.onerror = markLoaded);
                return;
            }

            if (/\.(mp3|wav|ogg|mp4|webm)$/i.test(src)) {
                const media = document.createElement("audio");
                media.src = src;
                media.preload = "auto";

                media.readyState >= 3
                    ? markLoaded()
                    : media.addEventListener("canplaythrough", markLoaded, { once: true });
            }
        });
    }, [loadSVG, drawStroke]);

    const lockScroll = useCallback(() => {
        prevOverflow.current.html = document.documentElement.style.overflow;
        prevOverflow.current.body = document.body.style.overflow;

        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    }, []);

    const unlockScroll = useCallback(() => {
        document.documentElement.style.overflow = prevOverflow.current.html;
        document.body.style.overflow = prevOverflow.current.body;

        ScrollTrigger.refresh(true);
    }, []);

    const enterSilently = useCallback(() => {
        if (enterTriggeredRef.current) return;
        enterTriggeredRef.current = true;

        sessionStorage.setItem(INTRO_KEY, "true");
        setIsLoading(false);
        onEnter();
    }, [onEnter]);

    const handleEnterClick = useCallback(() => {
        if (enterTriggeredRef.current) return;
        enterTriggeredRef.current = true;
        check = true;

        sessionStorage.setItem(INTRO_KEY, "true");
        setIsLoading(false);
        onEnter();
    }, [onEnter]);

    const initScrollAnimations = useCallback(() => {
        if (!screenContainerRef.current || !part3_2Ref.current || !flipCardRef.current ||
            !part3Ref.current || !titleRef.current) return;

        // Pin the hero
        gsap.set(screenContainerRef.current, {
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
        });

        gsap.set(part3_2Ref.current, {
            rotateY: 180,
            transformOrigin: "center center",
            backfaceVisibility: "hidden"
        });

        // Master timeline for all animations
        const masterTL = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=300%",
                scrub: 2.5,
                pin: true,
                pinSpacing: false,
                anticipatePin: 1.2,
                onUpdate: (self) => {
                    // Enable pointer-events when we're in the part3 visible range (~35-55% of scroll)
                    if (self.progress > 0.35 && self.progress < 0.5) {
                        setPart3Active(true);
                    } else {
                        setPart3Active(false);
                    }
                }
            }
        });

        masterTL.set("#part3_2", {
            scale: 0.2,
            rotation: 180
        })
        masterTL.to(scrollHintRef.current, {
            opacity: 0,
            ease: "none",
            onStart: () => {
                gsap.getById("scrollHintIdle")?.kill();
            },
        }, 0.05)

            .to("#redCard", {
                rotation: 180,
                scale: 0.5,
                duration: 2,
                ease: "none"
            }, 0)
            .to(
                frontScreenRef.current,
                {
                    borderColor: "rgba(250,235,215,0.8)",
                    duration: 0.6,
                    ease: "power2.out"
                },
                0.3 // shortly after flip starts
            )
            .to(flipCardRef.current, {
                rotationY: 90,
                duration: 2,
                ease: "none"
            }, 0)
            .to(
                frontScreenRef.current,
                {
                    borderColor: "rgba(250,235,215,0)",
                    duration: 0.6,
                    ease: "power2.in"
                },
                3.3 // near end of flip
            )
            .to(flipCardRef.current, {
                rotationY: 180,
                duration: 2,
                ease: "none"
            }, 2)
            .to("#part3_2", {
                rotation: 360,
                duration: 2,
                scale: 1,
                ease: "none"
            }, 2)
            .addLabel("part3Reveal")
            .set("#part3", { opacity: 1 }, "part3Reveal")
            .from(
                "#part3 .register-btn",
                {
                    x: 100,
                    opacity: 0,
                    ease: "power3.out",
                    stagger: 0.2
                },
                "part3Reveal+=0.4"
            )
            .from(
                "#part3 .countdown",
                {
                    x: -100,
                    opacity: 0,
                    ease: "power3.out",
                    stagger: 0.15
                },
                "part3Reveal+=0.4"
            )
            .from(
                "#part3 .title-wrapper",
                { opacity: 0 },
                "part3Reveal"
            )
            .add(
                scrambleTween(titleRef.current, "synapse'26"),
                "part3Reveal+=0.2"
            ).add(() => {
                setShowNavbar(true);
            }, "part3Reveal")
            .to(".screen-container", { duration: 0.5, ease: "power2.inOut" })
            .add(() => {
                setShowNavbar(false);
            }, "part3Reveal-=0.01")
            .to(".screen-container", { duration: 0.5, ease: "power2.inOut" })
            .addLabel("part3Hide")
            .to(
                [
                    "#part3 .register-btn"
                ],
                {
                    x: 100,
                    opacity: 0,
                    ease: "power3.out",
                    stagger: 0.2
                },
                "part3Hide+=0.2"
            )
            .to(
                [
                    "#part3 .countdown"
                ],
                {
                    x: -100,
                    opacity: 0,
                    ease: "power3.out",
                    stagger: 0.15
                },
                "part3Hide+=0.2"
            )
            .to(
                "#part3 .title-wrapper",
                { opacity: 0 },
                "part3Hide+=0.15"
            ).addLabel("together")
            .to(
                frontScreenRef.current,
                {
                    borderColor: "rgba(250,235,215,0.8)",
                    duration: 0.6,
                    ease: "power2.out"
                },
                "together-=0.1" // shortly after flip starts
            )
            .to(".screen-container", { rotationZ: 185, duration: 1.5, scale: 0.25, ease: "none" }, "together")
            .to(".screen-container", { rotationY: 90, duration: 1.5, ease: "none" }, "together")
            .addLabel("together2")
            .to(".screen-container", { rotationY: 180, duration: 1.5, ease: "none" }, "together2")
            .to(".screen-container", { rotationZ: 420, duration: 2, scale: 0.15, ease: "none" }, "together2")
            .to(".screen-container", { duration: 2, ease: "none" });

    }, [scrambleTween]);

    const initScrollProgress = useCallback(() => {
        ScrollTrigger.create({
            start: 0,
            end: () =>
                document.documentElement.scrollHeight - window.innerHeight,
            onUpdate: (self) => {
                const progress = self.progress;

                if (scrollFillRef.current) {
                    scrollFillRef.current.style.height = `${(progress) * 100}%`;
                }
            }
        });
    }, []);

    useEffect(() => {
        if (isLoading) {
            lockScroll();
            return;
        }
        if (!scrollHintRef.current) return;

        gsap.fromTo(
            scrollHintRef.current,
            { y: 0 },
            {
                y: 20,
                duration: 1.4,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
                overwrite: false,
                id: "scrollHintIdle",
            }
        );

        return () => {
            gsap.getById("scrollHintIdle")?.kill();
        };
    }, [isLoading]);

    useEffect(() => {
        const clearIntroOnReload = () => {
            sessionStorage.removeItem(INTRO_KEY);
        };

        window.addEventListener("beforeunload", clearIntroOnReload);

        requestAnimationFrame(() => {
            loadAssets();
        });

        if (!isLoading) {
            enterSilently();
        }

        return () => {
            window.removeEventListener("beforeunload", clearIntroOnReload);
        };
    }, []);

    useLayoutEffect(() => {
        if (isLoading) return;
        if (!maskLayerRef.current) return;
        if (hasRunMaskRef.current) return;

        hasRunMaskRef.current = true;
        gsap.to(maskLayerRef.current, {
            duration: check ? 4 : 0.1,
            ease: "expo.out",
            webkitMaskSize: "cover",
            maskSize: "cover",
            onStart: () => {
                requestAnimationFrame(() => {
                    const audio = audioRef.current;
                    if (!check || !audio) return;
                    
                    audio.muted = false;
                    audio.volume = 0;
                    audio.play().catch(() => { });
                    gsap.to(audio, {
                        volume: 1,
                        duration: 5,
                        ease: "power2.out",
                    });
                });
            },
            onComplete: () => {
                if (svgContainerRef.current) {
                    svgContainerRef.current.style.display = "none";
                }

                initScrollAnimations();

                unlockScroll();
                ScrollTrigger.refresh(true);

                initScrollProgress();
                check = false;
            }
        });
    }, [isLoading, initScrollAnimations, unlockScroll]);

    return (
        <div>
            <div id="svgContainer" className="fixed inset-0 z-10 transition-opacity duration-2400" ref={svgContainerRef} />

            {isLoading ? (
                <>
                    <div id="progress" ref={progressTextRef} className="fixed bottom-[5%] right-[2%] text-white text-[clamp(20px,5vw,40px)] tracking-[2px] z-11 transition-opacity duration-600 font-jqka">
                        Loading {loadingProgress}%
                    </div>
                    <button id="enterBtn" ref={enterBtnRef} onClick={handleEnterClick} className={`fixed left-1/2 -translate-x-1/2 bottom-[10%] scale-90 px-[clamp(20px,5vw,40px)] py-[8px] text-[clamp(24px,5vw,40px)] text-white bg-transparent border-[3px] md:border-[5px] border-white rounded-[10px] cursor-pointer opacity-0 z-40 shadow-[5px_5px_0px_#ff0000] md:shadow-[10px_10px_0px_#ff0000] transition-all duration-200 font-jqka pointer-events-auto hover:bg-[#EB0000] hover:text-black hover:border-black hover:shadow-[5px_5px_0px_#ffffff] md:hover:shadow-[10px_10px_0px_#ffffff] ${showEnter
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-90 pointer-events-none"}`}>
                        Enter
                    </button>
                </>
            ) : (
                <>
                    <Navbar visible={showNavbar}>
                        <NavigationPanel />
                    </Navbar>

                    <div className="hero relative inset-0 h-screen z-25" ref={heroRef}>
                        <div id="maskLayer" className="absolute inset-0 opacity-100 " ref={maskLayerRef} style={{
                            WebkitMaskImage: 'url("/images_home/inkReveal2.gif")',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            WebkitMaskSize: '0% 0%',
                            maskImage: 'url("/images_home/inkReveal2.gif")',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            maskSize: '0% 0%',
                        }}>
                            <img id="coloredImage" src="/images_home/RedHand2.jpeg" alt="Red Hand" ref={coloredImageRef} className="absolute inset-0 h-full w-full object-cover pointer-events-none" />

                            <div id="flipCard" className="absolute inset-0 transform-3d" ref={flipCardRef}>
                                <img id="redCard" className="absolute inset-0 w-full h-full object-cover pointer-events-none backface-hidden" src="/images_home/redcard4.png" alt="Red Card" ref={cardRef} />

                                <div id="part3_2" ref={part3_2Ref} style={{
                                    backgroundImage:
                                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.75) 85%, #000 100%), url(/images_home/image_part3_2.jpg)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }} className=" absolute inset-0 flex flex-col items-center justify-center opacity-100 will-change-transform backface-hidden transform-[rotateY(180deg)]">
                                    <div className="screen-container relative w-screen h-screen flex items-center justify-center perspective-[1000px] transform-3d" ref={screenContainerRef}>
                                        <div ref={frontScreenRef} className="screen-front absolute inset-0 bg-black bg-[url('/images_home/part3-image.png')] bg-no-repeat bg-center bg-contain z-2 backface-hidden border-4 border-solid rounded " style={{ borderColor: "rgba(250,235,215,0)" }}></div>
                                        <div className="center-joker-container absolute inset-0 flex items-center justify-center transform-[rotateY(180deg)] backface-hidden z-1">
                                            <img src="/images_home/card_center.png" className="center-joker w-full h-auto rotate-[-64deg] object-contain" alt="Joker Card" />
                                        </div>
                                    </div>
                                </div>

                                <div id="part3" ref={part3Ref} className={`absolute inset-0 w-full h-screen transform-[rotateY(180deg)] backface-hidden ${part3Active ? "pointer-events-auto" : "pointer-events-none"}`}>
                                    <div className="register-btn absolute bottom-[50px] right-[50px]">
                                        <NavbarButton href="/register" variant="register">
                                            Register
                                        </NavbarButton>
                                    </div>

                                    <div className="title-wrapper flex justify-center pt-[60px] md:pt-[120px] h-[calc(100vh-120px)] md:h-[calc(100vh-200px)]">
                                        <h1 className="title text-[clamp(48px,15vw,140px)] font-joker leading-none text-center px-4" ref={titleRef}>unleash?2_</h1>
                                    </div>

                                    <CountdownTimer targetDate={new Date("2026-02-26 00:00:00")} />

                                </div>
                            </div>
                            <div className='absolute font-jqka flex flex-col z-100 h-[120px] w-[60px] text-xs text-center items-center justify-center gap-[5px] left-1/2 -translate-x-1/2 border-amber-50 bottom-[10px] border-solid border rounded-full px-0.5' ref={scrollHintRef}>
                                Scroll To Explore <br /><p className="text-3xl text-center">↓</p>
                            </div>
                        </div>
                    </div>
                </>
            )
            }

            <audio
                ref={audioRef}
                id="bgMusic"
                src="/Synapse_Music.mp3"
                preload="auto"
            />

            <div
                ref={scrollTrackRef}
                className="fixed right-[24px] top-1/2 -translate-y-1/2 z-[9999]
               h-[300px] w-[10px] rounded-full border border-solid border-gray-700
               bg-gray-200 pointer-events-none transition duration-500"
                style={{
                    opacity: showNavbar ? 1 : 0
                }}
            >
                <div
                    ref={scrollFillRef}
                    className="absolute top-0 left-0 w-full h-0 z-[9999]
                   bg-red-600 rounded-full"
                />
            </div>
        </div >
    );
}