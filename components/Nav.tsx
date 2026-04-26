"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage, type Lang } from "@/app/context/LanguageContext";

const langs = ["EN", "FR", "ZH"] as const;

export default function Nav() {
  const pathname          = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t }    = useLanguage();

  const links = [
    { label: t.home,    href: "/" },
    { label: t.works,   href: "/works" },
    { label: t.about,   href: "/about" },
    { label: t.press,   href: "/press" },
    { label: t.contact, href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gold bg-white-warm/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="font-display text-lg font-semibold tracking-wide text-black">
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
                  pathname === href ? "text-gold" : "text-mid hover:text-black",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right: lang switcher + Shop */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language switcher */}
          <div className="flex items-center divide-x divide-black/10 border border-black/10">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as Lang)}
                className={[
                  "px-2.5 py-1.5 font-body text-[10px] tracking-[0.18em] transition-colors duration-200",
                  lang === l ? "bg-gold text-black" : "text-mid hover:text-black",
                ].join(" ")}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Collection */}
          <a
            href="/works"
            className="inline-flex items-center gap-1 border border-gold px-5 py-2 font-body text-sm tracking-widest text-gold transition-colors duration-200 hover:bg-gold hover:text-white-warm"
          >
            Works
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`block h-px w-6 bg-black transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-black transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-gold/30 bg-white-warm transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-5 px-6 py-4">
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

          {/* Mobile lang + Shop */}
          <li className="flex items-center gap-4 pt-2">
            <div className="flex items-center divide-x divide-black/10 border border-black/10">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l as Lang)}
                  className={[
                    "px-2.5 py-1.5 font-body text-[10px] tracking-[0.18em] transition-colors duration-200",
                    lang === l ? "bg-gold text-black" : "text-mid hover:text-black",
                  ].join(" ")}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href="/works"
              className="inline-flex items-center border border-gold px-5 py-2 font-body text-sm tracking-widest text-gold hover:bg-gold hover:text-white-warm transition-colors duration-200"
            >
              Works
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
