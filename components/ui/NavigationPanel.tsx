"use client";
import React, { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarLogo,
    MobileAnimatedMenuItem
} from "@/components/ui/Resizable-navbar";


const navItems = [
    { name: "Home", link: "/" },
    { name: "Events", link: "/events" },
    { name: "Contact Us", link: "#contact", isContact: true },
    { name: "Timeline", link: "/timeline" },
    { name: "Terms And Conditions", link: "/terms-and-conditions" },
];

export default function NavigationPanel() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleContactClick = (e: any) => {
        e.preventDefault();
        setMobileMenuOpen(false);

        const footer = document.getElementById("contact");
        if (!footer) return;

        footer.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };
    return (
        <>
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                >
                    {navItems.map((item, idx) => (
                        <MobileAnimatedMenuItem
                            key={idx}
                            name={item.name}
                            link={item.link}
                            onClick={(e) => {
                                if (item.isContact) {
                                    handleContactClick(e);
                                } else {
                                    setMobileMenuOpen(false);
                                }
                            }}
                        />
                    ))}
                </MobileNavMenu>
            </MobileNav>
        </>
    )
}
