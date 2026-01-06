"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Resizable-navbar";
import NavigationPanel from "@/components/ui/NavigationPanel";
import Footer from "@/components/ui/Footer";
import Link from 'next/link';

const TERMS_CONTENT = [
    {
        title: "No Refund Policy",
        points: [
            "Tickets purchased for CEP/OAT events and concerts are strictly non-refundable.",
            "In cases of mistaken double payments, refunds will only be considered after the completion of the fest.",
            "Proper documentation and proof of the double transaction will be required for processing.",
        ],
    },
    {
        title: "Behavioral Expectations",
        points: [
            "Synapse’26 is a safe and inclusive space for everyone.",
            "Any form of nuisance, harassment, or vandalism will not be tolerated.",
            "Attendees may face immediate removal and legal consequences.",
        ],
    },
    {
        title: "Entry and Identification",
        points: [
            "Entry to events requires a valid pass and government-issued photo ID. Attendees are responsible for safeguarding their passes and IDs throughout the festival.",
        ],
    },
    {
        title: "Cancellation Policy",
        points: [
            "If the number of participants registered does not meet the required criteria, the event will be cancelled and charges will be fully refunded.",
        ],
    },
    {
        title: "Payment Policy",
        points: [
            "All payments for Synapse'26 events will be processed through the Razorpay payment gateway.",
            "Payments can be made using UPI, Debit Card, Credit Card, or Internet Banking.",
        ],
    },
    {
        title: "Liability",
        points: [
            "The Synapse Committee is not responsible for loss or damage to personal belongings. Attendees are advised to keep valuables secure.",
        ],
    },
];

const styles = {
    h3: "text-base sm:text-lg lg:text-[25px] mt-10 mb-8 font-medium",
    ul: "max-w-[1000px] ml-4 sm:ml-5 mb-4 list-disc list-inside",
    li: "text-sm sm:text-base lg:text-[25px] leading-relaxed text-[#dddddd] mb-2",
};

export default function Terms() {

    return (
        <div className="relative w-screen min-h-screen overflow-x-hidden text-white">
            <Navbar visible ={true}>
                <NavigationPanel />
            </Navbar>

            <div
                className="fixed inset-0 z-0 bg-center bg-contain bg-no-repeat"
                style={{ backgroundImage: "url('/termsbg.png')" }}
            />
            <div className="fixed inset-0 z-0 bg-black/60" />

            <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pt-28 pb-20 sm:px-6 lg:px-[120px] lg:pt-36">
                <h1 className="mb-12 sm:mb-16 lg:mb-20 text-3xl sm:text-5xl lg:text-[90px] text-center tracking-wide font-joker lowercase">
                    Terms & Conditions
                </h1>

                <p className="mb-10 sm:mb-14 lg:mb-16 max-w-[1000px] text-sm sm:text-base lg:text-[26px] leading-relaxed text-[#e6e6e6] font-poppins">
                    Welcome to Synapse’26! To ensure an enjoyable and hassle-free experience
                    for all attendees, please carefully read and adhere to the following
                    terms and conditions:
                </p>

                {TERMS_CONTENT.map((section, index) => (
                    <div key={index}>
                        <h3 className={styles.h3}>
                            {index + 1}. {section.title}
                        </h3>

                        <ul className={styles.ul}>
                            {section.points.map((point, i) => (
                                <li key={i} className={styles.li}>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <p className="mb-10 mt-10 sm:mb-14 lg:mb-16 sm:mt-14 lg:mt-16 max-w-[1000px] text-sm sm:text-base lg:text-[25px] leading-relaxed text-[#e6e6e6]">
                    By attending Synapse'26, you agree to abide by these terms and conditions. Failure to comply may result in removal from the festival premises without any refund. We appreciate your cooperation in making Synapse'26 a memorable and magical experience for everyone!</p>
            </div>
            <Footer />
        </div>
    );
}
