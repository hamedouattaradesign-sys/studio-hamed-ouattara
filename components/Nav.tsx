"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { label: "Home",           href: "/" },
  { label: "Selected Works", href: "/works" },
  { label: "About",          href: "/about" },
  { label: "Press",          href: "/press" },
  { label: "Contact",        href: "/contact" },
];

const langs = ["EN", "FR", "ZH"] as const;
type Lang = (typeof langs)[number];

export default function Nav() {
  const pathname  = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang]         = useState<Lang>("EN");
  const [toast, setToast]       = useState<string | null>(null);

  // Auto-dismiss toast after 2.5 s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const handleLang = (l: Lang) => {
    if (l === "EN") { setLang("EN"); return; }
    setToast(l === "FR" ? "Version française — bientôt disponible" : "中文版本即将推出");
  };

  return (
    <>
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
                    pathname === href ? "text-gold" : "text-mid hover:text-black",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right cluster: lang switcher + Shop */}
          <div className="hidden md:flex items-center gap-4">

            {/* Language switcher */}
            <div className="flex items-center gap-0 border border-black/10 divide-x divide-black/10">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLang(l)}
                  className={[
                    "px-2.5 py-1.5 font-body text-[10px] tracking-[0.18em] transition-colors duration-200",
                    lang === l && l === "EN"
                      ? "bg-gold text-black"
                      : "text-mid hover:text-black",
                  ].join(" ")}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Shop */}
            <a
              href="https://studiohamedouattara.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border border-gold px-5 py-2 font-body text-sm tracking-widest text-gold transition-colors duration-200 hover:bg-gold hover:text-white-warm"
            >
              Shop
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
              <div className="flex items-center border border-black/10 divide-x divide-black/10">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLang(l)}
                    className={[
                      "px-2.5 py-1.5 font-body text-[10px] tracking-[0.18em] transition-colors duration-200",
                      lang === l && l === "EN" ? "bg-gold text-black" : "text-mid hover:text-black",
                    ].join(" ")}
                  >
                    {l}
                  </button>
                ))}
              </div>
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

      {/* Toast notification */}
      <div
        className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 bg-black/90 px-5 py-3 backdrop-blur-sm">
          <span className="text-gold text-xs">✦</span>
          <p className="font-body text-[12px] tracking-wide text-white-warm whitespace-nowrap">
            {toast}
          </p>
        </div>
      </div>
    </>
  );
}
