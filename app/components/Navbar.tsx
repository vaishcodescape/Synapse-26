"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/app/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Separator } from "@/app/components/ui/separator";

function MenuIcon({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-1.5">
        <span className="block w-8 h-0.5 bg-white"></span>
        <span className="block w-8 h-0.5 bg-white"></span>
        <span className="block w-6 h-0.5 bg-white ml-auto"></span>
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="/" className="relative z-50 hover:scale-105 transition-transform">
                <Image
                  src="/synapse-logo.png"
                  alt="Synapse Logo"
                  width={56}
                  height={56}
                  priority
                  className="w-12 h-12 md:w-14 md:h-14"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black/90 text-white border-white/10">
              <p>SYNAPSE&apos;26</p>
            </TooltipContent>
          </Tooltip>

          {/* Desktop Navigation - Hidden on mobile */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink
                    href={link.href}
                    className="px-4 py-2 text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors"
                  >
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent lg:hidden"
              >
                <MenuIcon className="cursor-pointer" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] bg-black/95 border-l border-white/10 backdrop-blur-xl"
            >
              <SheetHeader>
                <SheetTitle className="text-white font-bold text-2xl tracking-wider">
                  SYNAPSE&apos;26
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-6 bg-white/10" />
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-white/80 hover:text-white text-2xl font-light tracking-wide transition-all hover:translate-x-2 transform duration-300 py-2"
                    >
                      {link.label}
                    </a>
                    {index < navLinks.length - 1 && (
                      <Separator className="mt-4 bg-white/5" />
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    </TooltipProvider>
  );
}
