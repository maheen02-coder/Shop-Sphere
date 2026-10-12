"use client";
import React, { useState } from "react";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Our Story", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#B89542]/20 bg-[#100D11]/95 text-[#F1E8EB] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-11.5 sm:px-8 lg:px-12">
        <a href="/" className="group flex shrink-0 flex-col">
          <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-[#E8C96A] transition duration-300 group-hover:text-[#F5DFA0] sm:text-3xl">
            VELVETY
          </span>
          <span className="mt-1 text-center text-[9px] tracking-[0.55em] text-[#D9B8C0]">
            THORNS
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-2 text-sm tracking-wide text-[#D8CDD1] transition duration-300 hover:text-[#E8C96A] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#B89542] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            aria-label="Search"
            className="hidden text-[#D9B8C0] transition duration-300 hover:scale-110 hover:text-[#E8C96A] sm:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                d="m16 16 4 4"
              />
            </svg>
          </button>
          <a
            href="/cart"
            aria-label="Shopping bag"
            className="relative text-[#D9B8C0] transition duration-300 hover:scale-110 hover:text-[#E8C96A]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 8h14l1 12H4L5 8Z"
              />
              <path
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M9 9V6a3 3 0 0 1 6 0v3"
              />
            </svg>
          </a>
          <a
            href="/shop"
            className="hidden border border-[#B89542] px-5 py-2.5 text-xs tracking-[0.15em] text-[#E8C96A] transition duration-300 hover:bg-[#B89542] hover:text-[#100D11] sm:block"
          >
            EXPLORE
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center border border-[#B89542]/30 text-[#E8C96A] transition duration-300 hover:border-[#B89542] lg:hidden"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m6 6 12 12M18 6 6 18"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden border-t border-[#B89542]/10 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-3">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#B89542]/10 py-4 text-sm tracking-wider text-[#D8CDD1] transition duration-300 hover:pl-2 hover:text-[#E8C96A]"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="mt-4 border border-[#B89542] px-5 py-3 text-center text-xs tracking-[0.2em] text-[#E8C96A] transition duration-300 hover:bg-[#B89542] hover:text-[#100D11]"
          >
            EXPLORE COLLECTION
          </a>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;