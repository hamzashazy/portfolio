"use client";

<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Technologies", href: "#technologies" },
  { label: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
<<<<<<< HEAD
=======
  const [activeSection, setActiveSection] = useState<string>("");
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

<<<<<<< HEAD
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-bold tracking-widest text-pink-400 select-none">
          {/* Logo or Site Name */}
          Hamza Shahzad
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
=======
  // Optional: Active link highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(href);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-slate-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl md:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 select-none">
          Hamza Shahzad
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href} className="group relative">
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors duration-200 ${
                  activeSection === link.href
                    ? "text-orange-400"
                    : "text-slate-100 group-hover:text-pink-400"
                }`}
              >
                {link.label}
              </a>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ${
                  activeSection === link.href ? "bg-orange-400 scale-x-100" : "bg-pink-400"
                }`}
              />
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-black/90 border-t border-slate-700 px-6`}
      >
        <ul className="flex flex-col gap-4 py-4">
          {navLinks.map((link) => (
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
<<<<<<< HEAD
                className="hover:text-orange-400 transition-colors duration-200 cursor-pointer"
=======
                className={`block py-2 px-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href
                    ? "text-orange-400"
                    : "text-slate-100 hover:text-pink-400"
                }`}
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
<<<<<<< HEAD
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-slate-800 px-4 pb-4">
          <ul className="flex flex-col gap-4 mt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-2 px-2 rounded hover:bg-pink-500/10 hover:text-orange-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
=======
      </div>
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
    </nav>
  );
};

<<<<<<< HEAD
export default NavBar; 
=======
export default NavBar;
>>>>>>> fd00a94e9ab12ecd0508d51673c0b021721be371
