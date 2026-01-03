'use client';

import { useEffect } from "react";

export default function HallOfFame() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                        entry.target.classList.remove('opacity-0', 'translate-y-12');
                    }, index * 100);
                }
            });
        }, observerOptions);

        const galleryItems = document.querySelectorAll('[data-gallery-item]');
        galleryItems.forEach(item => {
            observer.observe(item);
        });

        return () => {
            galleryItems.forEach(item => {
                observer.unobserve(item);
            });
        };
    }, []);

    const galleryColumns = [
        [
            { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500', alt: 'Concert crowd' },
            { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500', alt: 'Stage lights' },
            { src: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500', alt: 'Festival vibes' },
        ],
        [
            { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500', alt: 'Festival friends' },
            { src: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500', alt: 'Live performance' },
            { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500', alt: 'Music fest' },
        ],
        [
            { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500', alt: 'Event crowd' },
            { src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500', alt: 'Celebration' },
            { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500', alt: 'Summer fest' },
        ],
        [
            { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500', alt: 'Dance crowd' },
            { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', alt: 'Festival lights' },
            { src: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=500', alt: 'Night fest' },
        ],
    ];

    return (
        <div className="relative w-full">
            <div
                className="h-screen w-full bg-cover bg-center flex items-end"
                style={{
                    backgroundImage: 'url(/HallOfFame.png)'
                }}
            />
            <div className="relative min-h-screen bg-black px-[10%] py-20 md:px-[5%] overflow-hidden">
                <div className="relative z-20">
                    <h1 className="text-6xl md:text-5.5xl font-black tracking-[15px] lowercase mb-2.5 bg-linear-to-br from-white to-white bg-clip-text text-transparent font-joker">
                        SYNAPSE
                    </h1>
                    <h2 className="font-joker text-5xl md:text-6xl font-black lowercase mb-5 tracking-[5px] bg-linear-to-br from-white via-gray-400 to-gray-300 bg-clip-text text-transparent text-shadow-lg">
                        Hall of Fame
                    </h2>
                    <p className="text-xl lg:text-right md:text-1.5xl text-gray-300 max-w-150 leading-relaxed mb-15 lg:ml-auto ">
                        The iconic moments from Synapse that left a mark on the fest,
                        captured and remembered as part of the Joker&apos;s Realm.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-15 pb-0 items-start">
                        {galleryColumns.map((column, colIndex) => (
                            <div
                                key={colIndex}
                                className={`flex flex-col gap-5 ${colIndex === 1 || colIndex === 3 ? 'md:mt-20' : ''
                                    }`}
                            >
                                {column.map((image, imgIndex) => (
                                    <div
                                        key={imgIndex}
                                        data-gallery-item
                                        className="rounded-2xl overflow-hidden relative h-96 opacity-0 translate-y-12 transition-all duration-600 ease-out hover:scale-[1.02] group"
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className="object-cover h-full transition-transform duration-400 ease-in-out group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}