"use client";
import { cn } from "@/lib/utils";
import { IconMenu3, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface AnimatedMenuItemProps {
  name: string;
  link: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Navbar = ({
  children,
  className,
  visible = false
}: NavbarProps & { visible?: boolean }) => {
  return (
    <motion.div
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -80,
        pointerEvents: visible ? "auto" : "none"
      }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};


export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "blur(4px)",
        boxShadow: visible
          ? "0 4px 30px rgba(235, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          : "none",
        width: visible ? "80%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[150] mx-auto hidden w-full max-w-[95vw] flex-row items-center justify-between self-start rounded-full bg-black/40 px-6 py-3 lg:flex border border-white/10",
        visible && "bg-black/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-white/90 transition duration-200 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-white/80 hover:text-white transition-colors duration-200"
          key={`link-${idx}`}
          href={item.link}
          scroll={false}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[#EB0000]/20 border border-[#EB0000]/40"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        boxShadow: visible
          ? "0 4px 30px rgba(235, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          : "none",
        width: visible ? "100%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-black px-4 py-3 ",
        visible,
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileAnimatedMenuItem = ({
  name,
  link,
  onClick,
}: AnimatedMenuItemProps) => {
  return (
    <Link
      href={link}
      onClick={(e) => onClick?.(e)}
      className="
        group w-full
        grid grid-cols-[1fr_auto] items-center
        cursor-pointer select-none
        text-white
      "
    >
      {/* TEXT */}
      <div className="relative overflow-hidden h-[clamp(32px,7vw,64px)]">
        {/* DEFAULT */}
        <span
          className="
            absolute inset-0
            translate-y-0
            transition-transform duration-500 ease-out
            group-hover:-translate-y-full
            text-[clamp(18px,4.5vw,42px)]
            leading-[clamp(32px,7vw,64px)]
            group-hover:text-[#EB0000]
          "
        >
          {name}
        </span>

        {/* HOVER */}
        <span
          className="
            absolute inset-0
            translate-y-full
            transition-transform duration-500 ease-out
            group-hover:translate-y-0
            text-[clamp(18px,4.5vw,42px)]
            leading-[clamp(32px,7vw,64px)]
            group-hover:text-[#EB0000]
          "
        >
          {name}
        </span>
      </div>

      {/* ARROW */}
      <span
        className="
          ml-[clamp(8px,1.5vw,16px)]
          text-[clamp(20px,5vw,48px)]
          transition-all duration-300 ease-out
          group-hover:translate-x-1.5
          group-hover:text-[#EB0000]
        "
      >
        ↗
      </span>
    </Link>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full px-9 flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-[95%] flex-col left-1/2 -translate-x-1/2 items-start justify-start gap-4 rounded-lg bg-black/95 px-4 py-8 border border-white/10 shadow-[0_4px_30px_rgba(235,0,0,0.15)]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white cursor-pointer hover:text-[#EB0000] transition-colors" onClick={onClick} />
  ) : (
    <IconMenu3 size={32} className="text-white cursor-pointer hover:text-[#EB0000] transition-colors" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white"
    >
      <Image
        src="/Synapse Logo.png"
        alt="Synapse Logo"
        width={35}
        height={35}
        className="w-auto h-[35px]"
        priority
      />
    </Link>
  );
};

type NavbarButtonProps<T extends React.ElementType> = {
  as?: T;
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "register";
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

export const NavbarButton = <T extends React.ElementType = "a">({
  href,
  as,
  children,
  className,
  variant = "primary",
  ...props
}: NavbarButtonProps<T>) => {
  const Tag = as || "a";

  const baseStyles =
    "px-6 py-2 rounded-[10px] text-sm font-bold relative cursor-pointer transition-all duration-300 inline-block text-center font-['Roboto',sans-serif]";

  const variantStyles = {
    primary:
      "bg-transparent text-white border-2 border-white shadow-[6px_6px_0px_#EB0000] hover:bg-[#EB0000] hover:text-black hover:border-black hover:shadow-[6px_6px_0px_rgba(255,255,255,0.7)] hover:-translate-y-0.5",
    secondary: "bg-transparent text-white/80 hover:text-white border-0",
    dark:
      "bg-black text-white border-2 border-white shadow-[6px_6px_0px_#EB0000] hover:bg-[#EB0000] hover:text-black hover:border-black",
    gradient:
      "bg-transparent text-white border-2 border-white shadow-[6px_6px_0px_#EB0000] hover:bg-[#EB0000] hover:text-black hover:border-black hover:shadow-[6px_6px_0px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 hover:scale-105",
    register:
      "text-[clamp(1.25rem,4vw,1.875rem)] border-[5px] border-white rounded-[10px] bg-transparent text-white shadow-[10px_10px_0px_#EB0000] hover:bg-[#EB0000] hover:text-black hover:border-black hover:scale-105 hover:shadow-[10px_10px_0px_rgba(255,255,255,0.7)] font-normal font-jqka",
  };

  return React.createElement(
    Tag,
    {
      ...(href ? { href } : {}),
      className: cn(baseStyles, variantStyles[variant], className),
      ...props,
    },
    children
  );
};