"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// ─── Constants ────────────────────────────────────────────────────────────────
const BASE = "https://studiohamedouattara.com/cdn/shop/files";
const SHOP = "https://studiohamedouattara.com";

// ─── Types ────────────────────────────────────────────────────────────────────
type Work = {
  title: string;
  collection: string;
  medium: string;
  reference: string;
  price: string;
  image: string;
  images?: string[];
  badge?: string;
  href: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const bolibana: Work[] = [
  {
    title:      "Dioulassoba",
    collection: "Bolibana Collection",
    medium:     "Reclaimed oil drum sheets, powder-coated steel",
    reference:  "Brooklyn Museum · Acc. 2023.66",
    price:      "$38,000",
    image:      `${BASE}/Ouattara_Dioulassoba_Dioula_s_Town_02_sm.jpg`,
    images:     [`${BASE}/Ouattara_Dioulassoba_Dioula_s_Town_01.jpg`, `${BASE}/Ouattara_Dioulassoba_Dioula_s_Town_04.jpg`],
    badge:      "Brooklyn Museum · 2023.66",
    href:       "https://studiohamedouattara.com/products/dioulassoba-cabinet-bolibana-hamed-ouattara",
  },
  {
    title:      "Ancestor",
    collection: "Bolibana Collection",
    medium:     "Reclaimed oil drum sheets, steel frame",
    reference:  "Homo Faber 2026, Venice",
    price:      "$45,000",
    image:      `${BASE}/Ouattara_Ancestors_01_sm.jpg`,
    images:     [`${BASE}/Ouattara_Ancestors_02_sm.jpg`],
    badge:      "Homo Faber 2026",
    href:       "https://studiohamedouattara.com/products/ancestor-cabinet-bolibana-hamed-ouattara",
  },
  {
    title:      "Budu",
    collection: "Bolibana Collection",
    medium:     "Reclaimed oil drum sheets, powder-coated steel",
    reference:  "Bolibana Series, 2022",
    price:      "$32,000",
    image:      `${BASE}/Ouattara_Budu_Ethnicity_01_sm.jpg`,
    images:     [`${BASE}/Ouattara_Budu_Ethnicity_02_sm.jpg`],
    href:       "https://studiohamedouattara.com/products/budu-cabinet-bolibana-hamed-ouattara",
  },
  {
    title:      "Balan",
    collection: "Bolibana Collection",
    medium:     "Reclaimed oil drum sheets, steel, balafon reference",
    reference:  "Bolibana Series, 2022",
    price:      "$35,000",
    image:      `${BASE}/Ouattara_Balan_African_Piano_Balafon_01_sm.jpg`,
    href:       "https://studiohamedouattara.com/products/balan-sideboard-bolibana-hamed-ouattara",
  },
  {
    title:      "Dugu",
    collection: "Bolibana Collection",
    medium:     "Reclaimed oil drum sheets, powder-coated steel",
    reference:  "Bolibana Series, 2023",
    price:      "$35,000",
    image:      `${BASE}/6B82881B-822B-4F90-8A94-B5F5FF4CE85D.jpg`,
    href:       "https://studiohamedouattara.com/products/dugu-cabinet-bolibana-hamed-ouattara",
  },
  {
    title:      "Jimena",
    collection: "Bolibana Collection",
    medium:     "Reclaimed oil drum sheets, steel frame",
    reference:  "Bolibana Series, 2023",
    price:      "$22,000",
    image:      `${BASE}/JIMENA85X40X130cm.jpg`,
    href:       "https://studiohamedouattara.com/products/jimena-cabinet-bolibana-hamed-ouattara",
  },
];

const furniture: Work[] = [
  {
    title:      "Mariama",
    collection: "Furniture & Sculptures",
    medium:     "Upcycled oil drums, steel, mixed media",
    reference:  "Studio Edition, 2024",
    price:      "$15,500",
    image:      `${BASE}/8DB5823B-6FAF-4395-AD85-E066082E3880.png`,
    href:       "https://studiohamedouattara.com/products/mariama-storage-cabinet",
  },
  {
    title:      "Luxe TV",
    collection: "Furniture & Sculptures",
    medium:     "Upcycled oil drums, powder-coated steel",
    reference:  "Studio Edition, 2024",
    price:      "$12,000",
    image:      `${BASE}/2A1B931F-6941-4E0C-A1F9-36F89073948F_1.png`,
    href:       "https://studiohamedouattara.com/products/luxe-tv-sculptural-storage-console-in-recycled-oil-drum-metal",
  },
  {
    title:      "Cabinet Ouaga",
    collection: "Furniture & Sculptures",
    medium:     "Upcycled oil drums, reclaimed steel",
    reference:  "Studio Edition, 2023",
    price:      "$9,500",
    image:      `${BASE}/31BA693E-28AB-4093-BE9B-A01003F2F9162.png`,
    href:       "https://studiohamedouattara.com/products/cabinet-ouaga",
  },
  {
    title:      "Dlani Red / Yellow",
    collection: "Furniture & Sculptures",
    medium:     "Powder-coated steel, upcycled materials",
    reference:  "Dlani Series, 2024",
    price:      "$2,200",
    image:      `${BASE}/IMG_2647.jpg`,
    href:       "https://studiohamedouattara.com/products/dlani-upcycled-barrel-storage",
  },
  {
    title:      "Dlani Blue / Green",
    collection: "Furniture & Sculptures",
    medium:     "Powder-coated steel, upcycled materials",
    reference:  "Dlani Series, 2024",
    price:      "$2,200",
    image:      `${BASE}/IMG_2650.jpg`,
    href:       "https://studiohamedouattara.com/products/dlani",
  },
];

const canvas: Work[] = [
  {
    title:      "Urban Rituals",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas, 150 × 150 cm",
    reference:  "Urban Series, 2023",
    price:      "$6,500",
    image:      `${BASE}/cohesion150x150cm.jpg`,
    href:       "https://studiohamedouattara.com/products/urban-rituals",
  },
  {
    title:      "Whispers from the Sky",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas",
    reference:  "Sky Series, 2023",
    price:      "$6,500",
    image:      `${BASE}/IMG_2205_SnapseedCopy.jpg`,
    href:       "https://studiohamedouattara.com/products/whispers-from-the-sky",
  },
  {
    title:      "Ghost Archive",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas",
    reference:  "Archive Series, 2023",
    price:      "$6,500",
    image:      `${BASE}/IMG_9586.jpg`,
    href:       "https://studiohamedouattara.com/products/ghost-archive",
  },
  {
    title:      "Council of Faces",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas, 35 × 70 in",
    reference:  "Council Series, 2022",
    price:      "$5,500",
    image:      `${BASE}/35x70inc.jpg`,
    href:       "https://studiohamedouattara.com/products/council-of-faces",
  },
  {
    title:      "Bobo Dioulasso",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas, 60 × 45 in",
    reference:  "City Series, 2022",
    price:      "$5,500",
    image:      `${BASE}/BOBO60X45IN.jpg`,
    href:       "https://studiohamedouattara.com/products/bobo-dioulasso",
  },
  {
    title:      "Sacred Patterns",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas, 100 × 100 cm",
    reference:  "Pattern Series, 2022",
    price:      "$4,500",
    image:      `${BASE}/100x100cm.jpg`,
    href:       "https://studiohamedouattara.com/products/sacred-patterns",
  },
  {
    title:      "Backwards Future",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas",
    reference:  "Future Series, 2023",
    price:      "$4,500",
    image:      `${BASE}/IMG_2236_SnapseedCopy.jpg`,
    href:       "https://studiohamedouattara.com/products/backwards-future",
  },
  {
    title:      "Flame of the Ancestors",
    collection: "Works on Canvas",
    medium:     "Mixed media on canvas",
    reference:  "Ancestors Series, 2021",
    price:      "$2,500",
    image:      `${BASE}/IMG_2070.png`,
    href:       "https://studiohamedouattara.com/products/flame-of-the-ancestors",
  },
];

const sections = [
  {
    id:          "bolibana",
    label:       "Bolibana Collection",
    count:       6,
    works:       bolibana,
    description: "Ouattara's most celebrated body of work — sculptural cabinets handcrafted from reclaimed oil drum sheets. Presented at Friedman Benda Gallery, New York, 2023.",
  },
  {
    id:          "furniture",
    label:       "Furniture & Sculptures",
    count:       5,
    works:       furniture,
    description: "Functional sculptures for interior spaces — chairs, cabinets, and objects constructed from upcycled oil drums and reclaimed steel.",
  },
  {
    id:          "canvas",
    label:       "Works on Canvas",
    count:       8,
    works:       canvas,
    description: "Large-format paintings exploring the intersection of Afrofuturism, urban memory, and the symbolic geometry of the Sahel.",
  },
];

// Ideogram texture: grid + inner square inspired by Sudano-Sahelian motifs
const TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 6v36M6 24h36' stroke='%23C8973A' stroke-width='0.4' opacity='0.12'/%3E%3Crect x='16' y='16' width='16' height='16' fill='none' stroke='%23C8973A' stroke-width='0.3' opacity='0.07'/%3E%3C/svg%3E")`;

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.08) {
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Work card ────────────────────────────────────────────────────────────────
function WorkCard({ work, index }: { work: Work; index: number }) {
  const [lightbox, setLightbox]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const allImages = [work.image, ...(work.images ?? [])];

  const open  = (i = 0) => { setActiveIdx(i); setLightbox(true); };
  const close = ()      => setLightbox(false);
  const prev  = ()      => setActiveIdx((i) => (i - 1 + allImages.length) % allImages.length);
  const next  = ()      => setActiveIdx((i) => (i + 1) % allImages.length);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <Reveal delay={(index % 3) * 80}>
      <article className="group flex flex-col">

        {/* Image container */}
        <div
          className="relative aspect-[4/3] cursor-zoom-in overflow-hidden"
          style={{ background: "#F5EFE3" }}
          onClick={() => open(0)}
        >
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {work.badge && (
            <span className="absolute top-3 left-3 z-10 bg-gold px-3 py-1 font-body text-[9px] tracking-[0.2em] text-black uppercase">
              {work.badge}
            </span>
          )}
          <span className="absolute bottom-3 right-3 z-10 bg-black/55 px-2.5 py-1 font-body text-[9px] tracking-[0.18em] text-white-warm uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            View
          </span>
          {allImages.length > 1 && (
            <span className="absolute bottom-3 left-3 z-10 bg-black/55 px-2 py-1 font-body text-[9px] text-white-warm">
              1 / {allImages.length}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 px-0.5">
          <p className="mb-1 font-body text-[9px] tracking-[0.25em] text-gold uppercase">
            {work.collection}
          </p>
          <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-black transition-colors duration-200 group-hover:text-gold">
            {work.title}
          </h3>
          <p className="mt-1 font-body text-[11px] leading-relaxed text-mid">{work.medium}</p>
          <p className="mt-0.5 font-body text-[10px] text-mid/55">{work.reference}</p>
          <div className="mt-4 flex items-center justify-between border-t border-black/8 pt-4">
            <span className="font-display text-[1.05rem] font-semibold text-black">{work.price}</span>
            <a
              href={work.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold px-4 py-1.5 font-body text-[10px] tracking-[0.18em] text-black transition-colors duration-200 hover:bg-gold-lt"
            >
              Acquire
            </a>
          </div>
        </div>
      </article>

      {/* ── Lightbox — portal into document.body so z-index is never trapped ── */}
      {lightbox && createPortal(
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(8,7,6,0.94)" }}
          onClick={close}
        >
          {/* X — fixed top-right, always visible */}
          <button
            onClick={close}
            aria-label="Close"
            style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10000 }}
            className="flex h-11 w-11 items-center justify-center bg-white/10 text-white text-2xl leading-none transition-colors hover:bg-white/25"
          >
            ✕
          </button>

          {/* Inner content — clicks here don't bubble to overlay */}
          <div
            className="flex h-full flex-col items-center justify-center gap-4 px-6 py-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            <p className="font-body text-[10px] tracking-[0.28em] text-white/40 uppercase">
              {activeIdx + 1} / {allImages.length}
            </p>

            {/* Image row with arrows */}
            <div className="relative flex w-full max-w-3xl items-center gap-3">
              {/* Prev */}
              {allImages.length > 1 && (
                <button
                  onClick={prev}
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/10 text-white text-lg transition-colors hover:bg-white/20"
                  aria-label="Previous image"
                >
                  ←
                </button>
              )}

              {/* Main image */}
              <div
                className="relative flex-1"
                style={{ height: "58vh", background: "#F5EFE3" }}
              >
                <Image
                  src={allImages[activeIdx]}
                  alt={`${work.title} — view ${activeIdx + 1}`}
                  fill
                  sizes="80vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Next */}
              {allImages.length > 1 && (
                <button
                  onClick={next}
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/10 text-white text-lg transition-colors hover:bg-white/20"
                  aria-label="Next image"
                >
                  →
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    style={{ background: "#F5EFE3" }}
                    className={`relative h-14 w-14 overflow-hidden border-2 transition-colors duration-200 ${
                      i === activeIdx ? "border-[#C8973A]" : "border-white/15 hover:border-white/40"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill sizes="56px" className="object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Caption */}
            <div className="text-center">
              <p className="font-display text-xl font-semibold text-white">{work.title}</p>
              <p className="mt-1 font-body text-[11px] text-white/40">{work.medium}</p>
              <p className="mt-2 font-display text-base text-[#C8973A]">{work.price}</p>
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center bg-[#C8973A] px-8 py-2.5 font-body text-[11px] tracking-[0.2em] text-black transition-colors hover:bg-[#E0B96A]"
              >
                Acquire
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorksPage() {
  const [active, setActive] = useState("bolibana");

  // Update active tab as user scrolls through sections
  useEffect(() => {
    const ios = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => ios.forEach((io) => io?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    // account for fixed nav (72px) + sticky section nav (~52px)
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72 - 52;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      {/* ════════════════════════════ PAGE HEADER */}
      <header
        className="relative overflow-hidden bg-black px-6 pb-20 pt-[calc(72px+4rem)] md:px-14"
        style={{ backgroundImage: TEXTURE, backgroundSize: "48px 48px" }}
      >
        {/* Vignette so text reads clearly over the texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/40" />

        <div className="relative z-10">
          <Reveal>
            <p className="mb-10 font-body text-[10px] tracking-[0.32em] text-gold/60 uppercase">
              Studio Hamed Ouattara &nbsp;·&nbsp; Works
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="font-display leading-[1.0]">
              <span
                className="block font-bold text-white-warm"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)" }}
              >
                Selected
              </span>
              <span
                className="block italic font-medium text-gold"
                style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)" }}
              >
                Works
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-10 bg-gold/40" />
              <p className="font-body text-[12px] tracking-[0.15em] text-white-warm/40">
                19 works across 3 collections
              </p>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ════════════════════════════ STICKY COLLECTION NAV */}
      <div className="sticky top-[72px] z-40 border-b border-gold/15 bg-black/96 backdrop-blur-sm">
        <div className="flex overflow-x-auto px-6 md:px-14">
          {sections.map(({ id, label, count }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => { setActive(id); scrollTo(id); }}
                className={[
                  "flex shrink-0 items-center gap-2 border-b-[1.5px] px-1 py-4 mr-8 font-body text-[11px] tracking-[0.15em] uppercase transition-colors duration-200",
                  isActive
                    ? "border-gold text-gold"
                    : "border-transparent text-white-warm/40 hover:text-white-warm/70",
                ].join(" ")}
              >
                {label}
                <span
                  className={[
                    "flex h-5 w-5 items-center justify-center rounded-full text-[9px] transition-colors duration-200",
                    isActive ? "bg-gold text-black" : "bg-white-warm/10 text-white-warm/40",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════ WORK SECTIONS */}
      {sections.map(({ id, label, count, works, description }) => (
        <section
          key={id}
          id={id}
          className="bg-white-warm px-6 py-20 md:px-14"
        >
          {/* Section header */}
          <Reveal className="mb-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
                  {count} Works
                </p>
                <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight text-black">
                  {label}
                </h2>
                <p className="mt-3 max-w-xl font-body text-[13px] leading-[1.75] text-mid">
                  {description}
                </p>
              </div>
              {/* Gold rule accent */}
              <div className="hidden h-px w-24 bg-gold/30 md:block" />
            </div>
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
            {works.map((work, i) => (
              <WorkCard key={work.title} work={work} index={i} />
            ))}
          </div>

          {/* Section divider */}
          <div className="mt-20 border-t border-black/8" />
        </section>
      ))}

      {/* ════════════════════════════ FOOTER CTA */}
      <div className="bg-black px-6 py-16 text-center md:px-14">
        <p className="mb-3 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
          Enquiries
        </p>
        <p className="mb-8 font-body text-[13px] leading-relaxed text-white-warm/50">
          For acquisition, institutional loans, or studio visits, please get in touch.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center border border-gold px-8 py-3 font-body text-[11px] tracking-[0.2em] text-gold transition-colors duration-200 hover:bg-gold hover:text-black"
        >
          Contact the Studio
        </a>
      </div>
    </>
  );
}
