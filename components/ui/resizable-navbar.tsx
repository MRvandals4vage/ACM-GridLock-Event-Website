"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const Navbar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <nav className={cn("fixed top-0 left-0 right-0 z-[100]", className)}>
            {children}
        </nav>
    );
};

export const NavBody = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={cn(
                "hidden md:flex items-center justify-between px-8 py-4 mt-6 rounded-[2rem] transition-all duration-700 ease-[0.16, 1, 0.3, 1]",
                "bg-black/60 backdrop-blur-xl border border-white/10",
                "shadow-[0_8px_32px_0_rgba(0,229,255,0.1)]",
                isScrolled ? "mx-4 md:mx-12 lg:mx-[15vw] py-2 px-8 mt-2" : "mx-4 py-4 px-8 mt-6",
                className
            )}
        >
            {children}
        </div>
    );
};

export const NavItems = ({ items, className }: { items: { name: string; link: string }[]; className?: string }) => {
    return (
        <div className={cn("flex items-center gap-8", className)}>
            {items.map((item, idx) => (
                <a
                    key={`nav-item-${idx}`}
                    href={item.link}
                    className="relative text-sm font-display tracking-widest text-gray-300 hover:text-primary transition-colors duration-300 uppercase group"
                >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
        </div>
    );
};

export const NavbarLogo = ({ className }: { className?: string }) => {
    return (
        <a href="#home" className={cn("flex items-center gap-3 group", className)}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                <img
                    src="/assets/acm-logo.png"
                    alt="ACM SIGCHI SRM"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,229,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.5)] transition-all duration-300"
                />
            </div>
            <span className="font-display text-sm md:text-lg font-bold tracking-wider text-white group-hover:text-primary transition-colors">
                ACM SIGCHI
            </span>
        </a>
    );
};

export const NavbarButton = ({
    children,
    variant = "primary",
    className,
    onClick,
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
}) => {
    const baseStyles = "px-6 py-2.5 font-display font-bold uppercase tracking-widest text-sm transition-all duration-300";
    const variants = {
        primary: "bg-primary/90 hover:bg-primary text-background-dark border border-primary hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]",
        secondary: "bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-primary",
    };

    return (
        <button onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
            {children}
        </button>
    );
};

// Mobile Navigation Components
export const MobileNav = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn("md:hidden", className)}>{children}</div>;
};

export const MobileNavHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between px-6 py-4 mx-4 mt-4 rounded-3xl",
                "bg-black/40 backdrop-blur-xl border border-white/10",
                "shadow-[0_8px_32px_0_rgba(0,229,255,0.15)]",
                className
            )}
        >
            {children}
        </div>
    );
};

export const MobileNavToggle = ({
    isOpen,
    onClick,
    className,
}: {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}) => {
    return (
        <button
            onClick={onClick}
            className={cn("flex flex-col gap-1.5 p-2 transition-all duration-300", className)}
            aria-label="Toggle menu"
        >
            <span
                className={cn(
                    "w-6 h-0.5 bg-primary transition-all duration-300",
                    isOpen && "rotate-45 translate-y-2"
                )}
            ></span>
            <span
                className={cn(
                    "w-6 h-0.5 bg-primary transition-all duration-300",
                    isOpen && "opacity-0"
                )}
            ></span>
            <span
                className={cn(
                    "w-6 h-0.5 bg-primary transition-all duration-300",
                    isOpen && "-rotate-45 -translate-y-2"
                )}
            ></span>
        </button>
    );
};

export const MobileNavMenu = ({
    children,
    isOpen,
    onClose,
    className,
}: {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}) => {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Menu */}
            <div
                className={cn(
                    "fixed top-24 left-4 right-4 rounded-3xl overflow-hidden transition-all duration-500 z-50",
                    "bg-black/80 backdrop-blur-2xl border border-white/10",
                    "shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(0,229,255,0.1)]",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none",
                    className
                )}
            >
                <div className="flex flex-col gap-6 p-6">
                    {children}
                </div>
            </div>
        </>
    );
};
