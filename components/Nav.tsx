"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "Home",           href: "/" },
  { label: "Selected Works", href: "/works" },
  { label: "About",          href: "/about" },
  { label: "Press",          href: "/press" },
  { label: "Contact",        href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gold bg-white-warm/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-wide text-black"
        >
          Studio <span className="text-gold">H</span>amed Ouattara
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  "font-body text-sm tracking-wide transition-colors duration-200",
                  pathname === href
                    ? "text-gold"
                    : "text-mid hover:text-black",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Shop CTA */}
        <a
          href="https://studiohamedouattara.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 border border-gold px-5 py-2 font-body text-sm tracking-widest text-gold transition-colors duration-200 hover:bg-gold hover:text-white-warm"
        >
          Shop
        </a>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-black transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-black transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gold/30 bg-white-warm transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-5">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "font-body text-sm tracking-wide transition-colors duration-200",
                  pathname === href ? "text-gold" : "text-mid hover:text-black",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="https://studiohamedouattara.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-gold px-5 py-2 font-body text-sm tracking-widest text-gold hover:bg-gold hover:text-white-warm transition-colors duration-200"
            >
              Shop
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
