"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ContactFooter: React.FC = () => {
    return (
        <footer className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden">
            <style jsx>{`
        @media (max-width: 968px) {
          html, body {
            overflow: auto !important;
          }
        }
      `}</style>

            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                id="bgVideo"
            >
                <source src="/FooterFirework.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black/20 z-10" aria-hidden="true" />

            <div className="relative z-20 w-full min-h-screen flex flex-col">
                <div className="w-full">
                    <Image
                        src="/subtract.svg"
                        alt="Synapse Logo"
                        width={1920}
                        height={400}
                        className="w-full h-auto object-contain"
                        priority
                    />
                </div>

                <div className="px-4 md:px-[10%] pt-6 pb-4 md:pt-5 md:pb-2.5 flex flex-col flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-2.5">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-0">Contact us</h1>
                        <Image
                            src="/Logo_Synapse.png"
                            alt="Synapse Header Logo"
                            width={50}
                            height={50}
                            className="w-10 h-10 sm:w-12 sm:h-12"
                        />
                    </div>

                    <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-2.5">Reach Us Out At</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start mb-8 md:mb-7 text-sm sm:text-base md:text-lg">
                        <div className="space-y-2 sm:space-y-3 leading-relaxed sm:leading-loose">
                            <div>
                                <span className="font-semibold">Vivek Chaudhari:</span>
                                <Link href="tel:+916354042414" className="ml-1 hover:text-indigo-300 transition-colors duration-200">
                                    +91 6354 042 414
                                </Link>
                            </div>
                            <div>
                                <span className="font-semibold">Harshall Dharmik:</span>
                                <Link href="tel:+917600051765" className="ml-1 hover:text-indigo-300 transition-colors duration-200">
                                    +91 7600 051 765
                                </Link>
                            </div>
                            <div>
                                <span className="font-semibold">Kushal Desai:</span>
                                <Link href="tel:+919727055132" className="ml-1 hover:text-indigo-300 transition-colors duration-200">
                                    +91 9727 055 132
                                </Link>
                            </div>
                        </div>

                        <div className="text-left lg:text-right lg:pl-6 xl:pl-10 space-y-2 sm:space-y-3 leading-relaxed sm:leading-loose">
                            <div>DAIICT-campus, near, Reliance Cross Rd,</div>
                            <div>Gandhinagar, Gujarat 382007</div>
                            <div className="mt-4 md:mt-2.5 space-y-1">
                                <Link
                                    href="mailto:synapse.thefest@gmail.com"
                                    className="block hover:text-indigo-300 transition-colors duration-200"
                                >
                                    synapse.thefest@gmail.com
                                </Link>
                                <Link
                                    href="mailto:synapse@daiict.ac.in"
                                    className="block hover:text-indigo-300 transition-colors duration-200"
                                >
                                    synapse@daiict.ac.in
                                </Link>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-auto pb-6 sm:pb-4 md:pb-2.5">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white no-underline text-sm sm:text-base md:text-lg font-bold tracking-widest hover:text-[#667eea] hover:-translate-y-0.5 transition-all duration-300 ease-in-out px-2 py-1"
                        >
                            FACEBOOK
                        </Link>
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white no-underline text-sm sm:text-base md:text-lg font-bold tracking-widest hover:text-[#667eea] hover:-translate-y-0.5 transition-all duration-300 ease-in-out px-2 py-1"
                        >
                            INSTAGRAM
                        </Link>
                        <Link
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white no-underline text-sm sm:text-base md:text-lg font-bold tracking-widest hover:text-[#667eea] hover:-translate-y-0.5 transition-all duration-300 ease-in-out px-2 py-1"
                        >
                            YOUTUBE
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;