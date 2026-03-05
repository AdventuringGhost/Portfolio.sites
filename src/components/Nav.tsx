"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

interface NavProps {
  navItems: NavItem[];
}

export const Nav = ({ navItems = [] }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Effect to close the mobile menu on window resize. Runs once on mount.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to handle body scroll lock and click-outside-to-close when the mobile menu is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 overflow-visible"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo with dropdown */}
          <div className="relative">
            <button
              type="button"
              className="flex items-center text-2xl font-bold text-[#59D5E0] focus:outline-none"
              onClick={() => setDropdownOpen((o) => !o)}
            >
              AdventuringGhost
              <ChevronDown className="w-5 h-5 ml-1" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50">
                <a
                  href="/"
                  className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/#contact"
                  className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="/#projects"
                  className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Projects
                </a>
              </div>
            )}
          </div>

          {/* Desktop Navigation (dropdown handles links) */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {/* no inline links; use logo dropdown */}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#59D5E0] focus:outline-none focus:ring-2 focus:ring-[#59D5E0]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`absolute top-full left-0 w-full bg-white border-b border-gray-100 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-gray-600 hover:text-[#59D5E0] hover:bg-gray-50`}
                    onClick={() => setIsOpen(false)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
