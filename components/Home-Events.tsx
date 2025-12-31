"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
    title: string;
    description: string;
    image: string;
    category: string;
    link: string;
    index: number;
}

export function EventCard({
    title,
    description,
    image,
    category,
    link,
    index,
}: EventCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Category color mapping
    const categoryColors: Record<string, string> = {
        Tech: "from-purple-500/80 to-purple-700/80",
        Cultural: "from-pink-500/80 to-pink-700/80",
        Gaming: "from-red-500/80 to-red-700/80",
        Workshop: "from-yellow-500/80 to-yellow-700/80",
        Art: "from-blue-500/80 to-blue-700/80",
    };

    const gradientClass = categoryColors[category] || "from-purple-500/80 to-purple-700/80";

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="event-card group"
        >
            <Link href={link} className="block">
                <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 ease-out group-hover:border-white/20 group-hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] group-hover:-translate-y-2 group-hover:scale-[1.02]">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        {/* Placeholder gradient if no image */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
                                {category}
                            </span>
                        </div>

                        {/* Hover arrow indicator */}
                        <div className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2">
                            {description}
                        </p>

                        {/* CTA Text */}
                        <div className="mt-4 flex items-center text-sm font-medium">
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
                                }}
                            >
                                View Event
                            </span>
                            <span className="ml-2 text-purple-400 group-hover:translate-x-1 transition-transform duration-300">
                                →
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
