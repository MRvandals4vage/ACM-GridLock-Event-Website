"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";

interface NavbarComponentProps {
    onRegister: () => void;
}

export function NavbarComponent({ onRegister }: NavbarComponentProps) {
    const navItems = [
        {
            name: "Home",
            link: "#home",
        },
        {
            name: "Intel",
            link: "#intel",

        },
        {
            name: "Timeline",
            link: "#timeline",

        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
                <div className="flex items-center gap-4">
                    <a href="https://www.hackerrank.com/gridlock-round2" target="_blank" rel="noopener noreferrer">
                        <NavbarButton variant="secondary">
                            Round 2
                        </NavbarButton>
                    </a>
                    <NavbarButton variant="primary" onClick={onRegister}>
                        Register for Intel
                    </NavbarButton>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    <div className="flex flex-col items-center gap-8 py-4">
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-gray-300 hover:text-primary transition-colors font-display tracking-widest uppercase text-lg"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                    </div>
                    <div className="flex w-full flex-col gap-4">
                        <a href="https://www.hackerrank.com/gridlock-round2" target="_blank" rel="noopener noreferrer" className="w-full">
                            <NavbarButton variant="secondary" className="w-full">
                                Round 2
                            </NavbarButton>
                        </a>
                        <NavbarButton
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                onRegister();
                            }}
                            variant="primary"
                            className="w-full"
                        >
                            Register for Intel
                        </NavbarButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
