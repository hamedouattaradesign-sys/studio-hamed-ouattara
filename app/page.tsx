"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bebas_Neue } from "next/font/google";
import { useLanguage } from "@/app/context/LanguageContext";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

// ─── Scroll-reveal ────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const BASE = "https://studiohamedouattara.com";

const museums = [
  { name: "V&A Museum",          city: "London"        },
  { name: "Centre Pompidou",     city: "Paris"         },
  { name: "Vitra Design Museum", city: "Weil am Rhein" },
  { name: "Brooklyn Museum",     city: "New York"      },
  { name: "Denver Art Museum",   city: "Denver"        },
];

const stats = [
  { value: "5+",             label: "Collections"  },
  { value: "20+",            label: "Years"         },
  { value: "15",             label: "Artisans"      },
  { value: "Friedman Benda", label: "New York"      },
];

const marqueeItems = [
  "V&A Museum London",
  "Centre Pompidou Paris",
  "Vitra Design Museum",
  "Brooklyn Museum",
  "Friedman Benda Gallery",
  "Denver Art Museum",
  "Homo Faber 2026",
];

const works = [
  {
    collection: "Dioulassoba",
    title:      "Dioula's Town",
    medium:     "Upcycled oil drums, powder-coated steel",
    price:      "$38,000",
    image:      `${BASE}/cdn/shop/files/Ouattara_Dioulassoba_Dioula_s_Town_02_sm.jpg`,
    badge:      "Brooklyn Museum",
    href:       "https://studiohamedouattara.com/products/dioulassoba-cabinet-bolibana-hamed-ouattara",
  },
  {
    collection: "Ancestors",
    title:      "Ancestor",
    medium:     "Upcycled oil drums, steel",
    price:      "$45,000",
    image:      `${BASE}/cdn/shop/files/Ouattara_Ancestors_01_sm.jpg`,
    badge:      "Homo Faber 2026",
    href:       "https://studiohamedouattara.com/products/ancestor-cabinet-bolibana-hamed-ouattara",
  },
  {
    collection: "Budu",
    title:      "Budu Ethnicity",
    medium:     "Upcycled oil drums, steel",
    price:      "$32,000",
    image:      `${BASE}/cdn/shop/files/Ouattara_Budu_Ethnicity_01_sm.jpg`,
    badge:      null,
    href:       "https://studiohamedouattara.com/products/budu-cabinet-bolibana-hamed-ouattara",
  },
  {
    collection: "Urban Rituals",
    title:      "Cohesion",
    medium:     "Mixed media, upcycled oil drums",
    price:      "$6,500",
    image:      `${BASE}/cdn/shop/files/cohesion150x150cm.jpg`,
    badge:      null,
    href:       "https://studiohamedouattara.com/products/urban-rituals",
  },
  {
    collection: "Mariama",
    title:      "Mariama",
    medium:     "Upcycled oil drums, steel, mixed media",
    price:      "$15,500",
    image:      `${BASE}/cdn/shop/files/8DB5823B-6FAF-4395-AD85-E066082E3880.png`,
    badge:      null,
    href:       "https://studiohamedouattara.com/products/mariama-storage-cabinet",
  },
];

const pressItems = [
  { name: "Brooklyn Museum",        role: "Museum Collection",      location: "New York, USA"          },
  { name: "Friedman Benda Gallery", role: "Gallery Representation", location: "New York, USA"          },
  { name: "Homo Faber 2026",        role: "Exhibition Feature",     location: "Venice, Italy"          },
  { name: "Art Daily",              role: "Press Coverage",         location: "International"          },
  { name: "Denver Art Museum",      role: "Museum Collection",      location: "Denver, USA"            },
  { name: "Vitra Design Museum",    role: "Design Collection",      location: "Weil am Rhein, Germany" },
];

// ─── Work card ────────────────────────────────────────────────────────────────
function WorkCard({ work }: { work: (typeof works)[0] }) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{ aspectRatio: "4/3", backgroundColor: "#F5EFE3", display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={work.image}
        alt={work.title}
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", transition: "transform 0.7s ease" }}
        className="group-hover:scale-[1.03]"
      />

      {work.badge && (
        <span className="absolute top-4 left-4 z-10 bg-gold px-3 py-1 font-body text-[10px] tracking-[0.18em] text-black uppercase">
          {work.badge}
        </span>
      )}

      {/* Gradient + overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Info panel */}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <p className="mb-1 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
          {work.collection}
        </p>
        <h3 className="mb-0.5 font-display text-[1.2rem] font-semibold leading-tight text-white-warm">
          {work.title}
        </h3>
        <p className="mb-4 font-body text-[11px] text-white-warm/50">{work.medium}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg text-white-warm">{work.price}</span>
          <a
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold px-5 py-2 font-body text-[11px] tracking-[0.18em] text-black transition-colors duration-200 hover:bg-gold-lt"
          >
            Acquire
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useLanguage();
  return (
    <>
      {/* ════════════════════════════════════════ HERO */}
      <section className="flex min-h-screen flex-col pt-[72px] md:grid md:grid-cols-[1fr_380px]">

        {/* ── Left: dark ── */}
        <div className="flex flex-col justify-center bg-black px-8 py-20 md:px-16 md:py-28">

          <Reveal>
            <p className="mb-8 font-body text-[11px] tracking-[0.3em] text-gold uppercase">
              {t.heroEyebrow}
            </p>
          </Reveal>

          {/* Heading: bold white "Hamed" + italic gold "Ouattara" */}
          <Reveal delay={70}>
            <h1 className="mb-8 font-display leading-[1.0]">
              <span
                className="block font-bold text-white-warm"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)" }}
              >
                Hamed
              </span>
              <span
                className="block italic font-medium text-gold"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)" }}
              >
                Ouattara
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-body text-[11px] tracking-[0.22em] text-white-warm/50 uppercase">
              {t.heroRole}
            </p>
            {/* Divider */}
            <div className="my-8 w-14 border-t border-gold/40" />
          </Reveal>

          <Reveal delay={210}>
            <p className="mb-12 max-w-[460px] font-body text-[14.5px] leading-[1.85] text-white-warm/60">
              {t.heroDesc}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/works"
                className="inline-flex items-center bg-gold px-8 py-3.5 font-body text-[11px] tracking-[0.22em] text-black transition-colors duration-200 hover:bg-gold-lt"
              >
                {t.discoverWorks}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center border border-white-warm/20 px-8 py-3.5 font-body text-[11px] tracking-[0.22em] text-white-warm/70 transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                {t.about}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Right: cream ── */}
        <div className="flex flex-col justify-between bg-cream px-8 py-20 md:px-10 md:py-28">

          <Reveal>
            <p className="mb-7 font-body text-[10px] tracking-[0.25em] text-mid/70 uppercase">
              {t.collectionsLabel}
            </p>
            <ul className="space-y-5">
              {museums.map(({ name, city }) => (
                <li key={name} className="flex items-baseline gap-3">
                  <span className="mt-0.5 shrink-0 text-gold text-sm">✦</span>
                  <span>
                    <span className="font-body text-[13px] text-black">{name}</span>
                    <span className="ml-2 font-body text-[11px] text-mid/60">{city}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-6">
              {stats.map(({ value, label }) => (
                <div key={label} className="border-t border-gold/30 pt-4">
                  <p className="font-display text-[1.4rem] font-semibold text-black leading-tight">
                    {value}
                  </p>
                  <p className="mt-1.5 font-body text-[10px] tracking-[0.18em] text-mid/70 uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════ MARQUEE */}
      <div className="overflow-hidden border-y border-gold/15 bg-black py-[14px]">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span className="font-body text-[10px] tracking-[0.3em] text-white-warm/50 uppercase">
                {item}
              </span>
              <span className="text-gold text-[11px]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════ WORKS */}
      <section className="bg-white-warm px-6 py-24 md:px-14">

        <Reveal className="mb-14">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-body text-[10px] tracking-[0.25em] text-gold uppercase">
                {t.portfolioLabel}
              </p>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight text-black">
                {t.worksTitle}
              </h2>
              <p className="mt-3 font-body text-[13px] tracking-wide text-mid">
                {t.worksSubtitle}
              </p>
            </div>
            <Link
              href="/works"
              className="hidden md:inline-flex items-center gap-2 border border-black/12 px-6 py-2.5 font-body text-[11px] tracking-[0.18em] text-mid transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              {t.viewAllWorks}
            </Link>
          </div>
        </Reveal>

        {/* Grid: row 1 = wide (2/3) + normal (1/3); row 2 = three equal */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <WorkCard work={works[0]} />
          </Reveal>
          <Reveal delay={90}>
            <WorkCard work={works[1]} />
          </Reveal>

          <Reveal>
            <WorkCard work={works[2]} />
          </Reveal>
          <Reveal delay={70}>
            <WorkCard work={works[3]} />
          </Reveal>
          <Reveal delay={140}>
            <WorkCard work={works[4]} />
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════ EXHIBITION BANNER */}
      <Reveal>
        <section className="bg-gold px-6 py-20 text-center md:px-14">
          <p className="mb-5 font-body text-[10px] tracking-[0.35em] text-black/50 uppercase">
            {t.currentExhibition}
          </p>
          <h2
            className={`${bebas.className} leading-none tracking-wide text-black`}
            style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
          >
            Come Back
          </h2>
          <div className="mx-auto mt-7 w-12 border-t border-black/20" />
          <p className="mt-7 font-body text-[11px] tracking-[0.2em] text-black/60 uppercase">
            Musée National du Burkina Faso &nbsp;·&nbsp; Ouagadougou
            &nbsp;·&nbsp; Until May 15, 2026
          </p>
          <a
            href="https://web.facebook.com/share/p/1JPbdBrXka/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border border-black/30 px-8 py-3 font-body text-[11px] tracking-[0.2em] text-black uppercase transition-colors duration-200 hover:bg-black hover:text-gold"
          >
            {t.learnMore}
          </a>
        </section>
      </Reveal>

      {/* ════════════════════════════════════════ ABOUT STRIP */}
      <section className="bg-black px-6 py-24 md:px-20">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:items-start">

          {/* Quote */}
          <Reveal>
            <blockquote>
              <span className="mb-6 block font-display text-[3.5rem] leading-none text-gold">
                &ldquo;
              </span>
              <p className="font-display text-[1.2rem] italic leading-[1.7] text-white-warm md:text-[1.35rem]">
                What interests me is the relationship between material and memory.
                The oil drum comes from somewhere, carries history. I transform it
                into something that belongs to us — that speaks of Bobo-Dioulasso,
                of the architecture of our ancestors, of a future we are building
                together.
              </p>
              <footer className="mt-8 border-t border-gold/15 pt-6">
                <p className="font-body text-[10px] tracking-[0.25em] text-gold uppercase">
                  Hamed Ouattara
                </p>
                <p className="mt-1 font-body text-[11px] text-white-warm/30">
                  Published by Friedman Benda, New York
                </p>
              </footer>
            </blockquote>
          </Reveal>

          {/* Bio */}
          <Reveal delay={160}>
            <div className="border-l border-gold/20 pl-10 md:pt-2">
              <p className="mb-7 font-body text-[10px] tracking-[0.25em] text-gold uppercase">
                {t.biographyLabel}
              </p>
              <p className="mb-5 font-body text-[14px] leading-[1.85] text-white-warm/60">
                Hamed Ouattara (b. 1971, Ouagadougou, Burkina Faso) transforms
                discarded oil drums into sculptural furniture that bridges
                Afrofuturist aesthetics with the geometric vocabulary of
                Sudano-Sahelian architecture.
              </p>
              <p className="mb-10 font-body text-[14px] leading-[1.85] text-white-warm/60">
                Working with a team of fifteen artisans in Ouagadougou, his
                pieces have entered the collections of the Brooklyn Museum, Vitra
                Design Museum, Denver Art Museum, and the Centre Pompidou Paris.
                He is represented internationally by Friedman Benda, New York.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-b border-gold/25 pb-px font-body text-[11px] tracking-[0.22em] text-gold uppercase transition-colors duration-200 hover:border-gold"
              >
                {t.fullBio}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════ PRESS GRID */}
      <section className="bg-cream px-6 py-24 md:px-14">

        <Reveal className="mb-14">
          <div className="text-center">
            <p className="mb-3 font-body text-[10px] tracking-[0.25em] text-gold uppercase">
              {t.recognitionLabel}
            </p>
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-bold text-black">
              {t.pressAndInstitutions}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {pressItems.map(({ name, role, location }, i) => (
            <Reveal key={name} delay={i * 65}>
              <div className="group border border-black/10 bg-white-warm p-8 transition-all duration-300 hover:border-gold">
                <p className="mb-4 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
                  {role}
                </p>
                <h3 className="mb-2 font-display text-[1.15rem] font-semibold leading-snug text-black transition-colors duration-200 group-hover:text-gold">
                  {name}
                </h3>
                <p className="font-body text-[11px] text-mid/70">{location}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
