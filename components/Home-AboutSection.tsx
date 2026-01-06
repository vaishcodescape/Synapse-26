'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GRADIENT = { angle: 195, stop: 0.6, offsetRatio: -0.4 };

export default function AboutSection() {
    const aboutSectionRef = useRef<HTMLDivElement>(null);
    const singleCardRef = useRef<HTMLImageElement>(null);
    const hasSplitRef = useRef(false);
    const themeContentRef = useRef<HTMLDivElement>(null);

    /* ---------------- TEXT SPLIT (UNCHANGED) ---------------- */
    const splitTextToWords = useCallback((element: HTMLElement) => {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    return node.nodeValue?.trim()
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes: Node[] = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach(textNode => {
            const words = (textNode.nodeValue || '').split(/(\s+)/);
            const fragment = document.createDocumentFragment();

            words.forEach(word => {
                if (!word.trim()) fragment.appendChild(document.createTextNode(word));
                else {
                    const span = document.createElement('span');
                    span.className = 'word inline-block whitespace-pre';
                    span.textContent = word;
                    fragment.appendChild(span);
                }
            });
            textNode.parentNode?.replaceChild(fragment, textNode);
        });
    }, []);

    /* ---------------- IMAGE POSITIONING (UNCHANGED) ---------------- */
    const positionImageFromGradientCenter = useCallback(() => {
        const section = aboutSectionRef.current;
        const image = singleCardRef.current;
        if (!section || !image) return;

        const rect = section.getBoundingClientRect();
        const angle = (GRADIENT.angle * Math.PI) / 180;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        const L = Math.hypot(rect.width, rect.height);
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const t = GRADIENT.stop * L - L / 2;

        const midX = cx + dx * t;
        const midY = cy + dy * t;
        const x1 = midX - dx * L;
        const y1 = midY - dy * L;
        const x2 = midX + dx * L;
        const y2 = midY + dy * L;
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;

        const imageXPercent = 80;
        const imageX = rect.width * (imageXPercent / 100);
        const yOnLine = m * imageX + b;
        const offsetPx = image.offsetHeight * GRADIENT.offsetRatio;

        image.style.left = `${imageXPercent}%`;
        image.style.top = `${yOnLine + offsetPx}px`;
    }, []);

    const splitTitleToLetters = (el: HTMLElement) => {
        const text = el.textContent || "";
        el.textContent = "";

        const words = text.trim().split(/\s+/);

        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.className = "title-letter inline-block";
            span.textContent = word;

            el.appendChild(span);
            el.appendChild(document.createTextNode(" "));
        });
    };

    /* ---------------- GSAP ---------------- */
    useEffect(() => {
        const section = themeContentRef.current;
        const image = singleCardRef.current;
        const titleEl = document.querySelector(".doittitle") as HTMLElement;
        if (!section || !image || !titleEl) return;

        if (!hasSplitRef.current) {
            splitTextToWords(section);
            splitTitleToLetters(titleEl);
            hasSplitRef.current = true;
        }

        gsap.set('.Theme_content .word', { opacity: 0, y: 20 });
        gsap.set('.doittitle .title-letter', { opacity: 0, y: 20 });

        gsap.to('.doittitle .title-letter', {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power2.out',
            stagger: { each: 0.1 },
            scrollTrigger: {
                trigger: '.part3_end',
                start: 'top center',
                end: 'top center-=10%',
                scrub: 1,
                onRefresh: positionImageFromGradientCenter
            }
        });
        gsap.to('.Theme_content .word', {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            stagger: { each: 0.04 },
            scrollTrigger: {
                trigger: '.part3_end',
                start: 'top center-=11%',
                end: 'bottom bottom',
                scrub: 1,
                onRefresh: positionImageFromGradientCenter
            }
        });

        Promise.all([
            document.fonts?.ready ?? Promise.resolve(),
            image.complete ? Promise.resolve() : image.decode()
        ]).then(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    ScrollTrigger.refresh(true);
                    positionImageFromGradientCenter();
                });
            });
        });

        const ro = new ResizeObserver(positionImageFromGradientCenter);
        ro.observe(section);
        window.addEventListener('resize', positionImageFromGradientCenter);

        return () => {
            ro.disconnect();
            window.removeEventListener('resize', positionImageFromGradientCenter);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [splitTextToWords, positionImageFromGradientCenter]);

    return (
        <section
            ref={aboutSectionRef}
            className="part3_end relative min-h-screen w-full
                    flex flex-col
                    px-[clamp(1.5rem,4vw,3.75rem)]
                    py-[clamp(1.2rem,5vh,5rem)]
                    overflow-hidden justify-evenly"
            style={{
                background: `linear-gradient(
                              195deg,
                              #000000 0%,
                              #000000 60%,
                              #ffffff 60%,
                              #ffffff 100%
                            )`,
            }}
        >
            <div className="doittitle mb-6 text-white text-[clamp(3rem,15vw,5rem)] font-joker tracking-wide leading-relaxed">
                about synapse
            </div>

            <div ref={themeContentRef} className="Theme max-w-full md:max-w-[60%]">
                <div className="Theme_content text-white text-[clamp(1.15rem,1.5vw,2.1rem)] font-jqka mix-blend-difference leading-relaxed">
                    Synapse is more than a college fest — it&apos;s an experience. A convergence of creativity,
                    competition, culture, and chaos, Synapse brings together minds that dare to think,
                    perform, and challenge the ordinary . 
                    <br /><br />
                    This year, Synapse&apos;26 invites you into The Joker&apos;s Realm — a world where every
                    choice is a move, every event is a game, and nothing is ever as simple as it seems . 
                    <br /><br />
                    From high-energy concert nights and intense competitions to immersive events spread
                    across four action-packed days, Synapse&apos;26 transforms the campus into a playground
                    of possibilities . 
                    <br /><br />
                    Step in, choose your game, and remember — in the Joker&apos;s Realm, the game is always watching . 
                </div>
            </div>

            <img
                ref={singleCardRef}
                src="/images_home/Group_9.png"
                alt="Single Card"
                className="hidden md:block absolute pointer-events-none object-contain -translate-x-1/2 md:max-w-[60%] min-w-70 max-h-125 rounded-[10px] will-change-[top,left] w-[clamp(300px,30vw,380px)]"
            />
        </section>
    );
}
