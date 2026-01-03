"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ContactFooter: React.FC = () => {
    return (
        <footer id="contact" className="relative w-full h-full bg-black text-white font-sans overflow-hidden">
            <style jsx>{`
        @media (max-width: 968px) {
          html, body {
            overflow: auto !important;
          }
        }
      `}</style>

            <video
                className="absolute inset-0 w-full object-cover"
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

            <div className="relative z-20 w-full min-h-[cal(100vh - 40px)] flex flex-col">
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

                <div className="px-4 md:px-[20px] pt-6 pb-4 md:pt-5 md:pb-2.5 flex flex-col flex-1">
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
                                <span className="font-semibold">Namra Sanandiya:</span>
                                <Link href="tel:+918799048240" className="ml-1 hover:text-indigo-300 transition-colors duration-200">
                                    +91 87990 48240
                                </Link><br />
                                <pre>(Public Relation Head)</pre>
                            </div>
                            <div>
                                <span className="font-semibold">Rujal Jiyani:</span>
                                <Link href="tel:+919499549977" className="ml-1 hover:text-indigo-300 transition-colors duration-200">
                                    +91 94995 49977
                                </Link><br/>
                                <pre>(Events Head)</pre>
                            </div>

                        </div>

                        <div className="text-left lg:text-right lg:pl-6 xl:pl-10 space-y-2 sm:space-y-3 leading-relaxed sm:leading-loose">
                            <div>DAU-campus (formerly DA-IICT), near, Reliance Cross Rd,</div>
                            <div>Gandhinagar, Gujarat 382007, India</div>
                            <div className="flex flex-row lg:justify-self-end gap-[10px] mt-4 md:mt-2.5 space-y-1">
                                <span>Email:</span>
                                <Link
                                    href="mailto:synapse.thefest@gmail.com"
                                    className="block hover:text-indigo-300 transition-colors duration-200"
                                >
                                    synapse.thefest@dau.ac.in
                                </Link>
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-auto pb-6 sm:pb-4 md:pb-2.5">
                        <Link
                            href="https://www.instagram.com/synapsedaiict?igsh=MXUwYzc5ZGE4N2NhZA=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white no-underline text-sm sm:text-base md:text-lg font-bold tracking-widest hover:text-[#667eea] hover:-translate-y-0.5 transition-all duration-300 ease-in-out px-2 py-1"
                        >
                            INSTAGRAM
                        </Link>
                        <Link
                            href="http://www.youtube.com/@SynapseDAIICT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white no-underline text-sm sm:text-base md:text-lg font-bold tracking-widest hover:text-[#667eea] hover:-translate-y-0.5 transition-all duration-300 ease-in-out px-2 py-1"
                        >
                            YOUTUBE
                        </Link>
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white no-underline text-sm sm:text-base md:text-lg font-bold tracking-widest hover:text-[#667eea] hover:-translate-y-0.5 transition-all duration-300 ease-in-out px-2 py-1"
                        >
                            FACEBOOK
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;
