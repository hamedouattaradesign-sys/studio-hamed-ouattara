"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

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
const marqueeItems = [
  "V&A Museum London",
  "Centre Pompidou Paris",
  "Vitra Design Museum",
  "Brooklyn Museum",
  "Friedman Benda Gallery",
  "Denver Art Museum",
  "Homo Faber 2026",
];

const collections = [
  { name: "Brooklyn Museum",        city: "New York, USA"          },
  { name: "Denver Art Museum",      city: "Denver, USA"            },
  { name: "Vitra Design Museum",    city: "Weil am Rhein, Germany" },
  { name: "Centre Pompidou",        city: "Paris, France"          },
  { name: "V&A Museum",             city: "London, UK"             },
];

const timeline = [
  { year: "1971", event: "Born in Ouagadougou, Burkina Faso" },
  { year: "2002", event: "Founded Studio SHO in Ouagadougou" },
  { year: "2003", event: "Diploma, ENSCI – Les Ateliers, Paris" },
  { year: "2014", event: "Africa Design Award, Johannesburg" },
  { year: "2014", event: "Chevalier de l'Ordre du mérite des Arts, Burkina Faso" },
  { year: "2023", event: "Acquisition, Denver Art Museum" },
  { year: "2023", event: "Acquisition, Brooklyn Museum (Acc. 2023.66)" },
  { year: "2023", event: "Bolibana — Friedman Benda Gallery, New York" },
  { year: "2026", event: "COME BACK — Musée National du Burkina Faso, Ouagadougou" },
  { year: "2026", event: "Homo Faber — Fondazione Giorgio Cini, Venice" },
];

const studioStats = [
  { value: "15+",  label: "Artisans"          },
  { value: "20+",  label: "Years"             },
  { value: "5",    label: "Museum Collections"},
  { value: "100+", label: "Works Created"     },
];

const bioParas = [
  `Hamed Ouattara (b. 1971, Ouagadougou, Burkina Faso) is a multidisciplinary artist and designer whose practice centres on the transformation of discarded industrial oil drums into sculptural furniture of singular formal intelligence. Trained at ENSCI – Les Ateliers, Paris (diploma 2003), Ouattara returned to West Africa to found Studio SHO in Ouagadougou in 2002, establishing a production model rooted in the compagnonnage tradition — a collective apprenticeship through which knowledge is transmitted from master to practitioner across generations.`,
  `His objects draw explicitly from the geometric vocabulary of Sudano-Sahelian architecture: the flat-roofed mud-brick compounds, the tapering buttresses, the repeating triangular corbels of mosques from Djenné to Bobo-Dioulasso. Ouattara reads the oil drum — ubiquitous throughout sub-Saharan Africa as a vessel of petroleum dependency — as a material charged with geopolitical meaning. By reworking it into furniture that occupies museums and private collections, he proposes an act of reclamation: turning the emblem of extraction into an object of cultural sovereignty.`,
  `The formal language Ouattara deploys has been described as Afrofuturist, though he resists easy categorisation. His cabinets, chairs and stools operate simultaneously as sculpture, as functional object, and as archive — each surface pattern referencing a specific cultural or architectural source, each title anchoring the work to a specific place, community or memory within Burkina Faso.`,
  `Ouattara's work is held in the permanent collections of the Brooklyn Museum (New York), the Denver Art Museum, the Vitra Design Museum (Weil am Rhein), the Centre Pompidou (Paris), and the V&A Museum (London). He is exclusively represented internationally by Friedman Benda Gallery, New York, where his solo exhibition Bolibana was presented in 2023.`,
];

const siraParas = [
  `Sira Arta is the long-horizon vision of Hamed Ouattara and Studio SHO: a 17-hectare cultural campus on the Route de Bobo-Dioulasso, conceived as a living infrastructure for design, craft, education, and artistic production in Burkina Faso.`,
  `The project is developed in partnership with ROUN-SA and Harouna Kanazoé, with architecture conceived by the practice Moyésoa, led by William Tailly of ESA Paris. The campus will integrate residential studios, production workshops, exhibition space, a resource library, and accommodation for artists in residence — all designed in dialogue with vernacular Sahelian construction methods.`,
  `At its core, Sira Arta is a bet on sovereignty: the conviction that world-class artistic production can originate from Burkina Faso on its own terms, without migrating to European capitals. It extends the compagnonnage model of Studio SHO to a continental scale, offering a dedicated infrastructure to the next generation of West African designers and craftspeople.`,
];

// Ideogram texture (same as works page — cross + inner square)
const TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 6v36M6 24h36' stroke='%23C8973A' stroke-width='0.4' opacity='0.12'/%3E%3Crect x='16' y='16' width='16' height='16' fill='none' stroke='%23C8973A' stroke-width='0.3' opacity='0.07'/%3E%3C/svg%3E")`;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      {/* ════════════════════════════ HERO */}
      <section className="flex flex-col pt-[72px] md:grid md:min-h-screen md:grid-cols-[1fr_480px]">

        {/* Left — dark (below portrait on mobile, left column on desktop) */}
        <div className="order-2 md:order-none flex flex-col justify-center bg-black px-8 py-16 md:px-16 md:py-28">
          <Reveal>
            <p className="mb-8 font-body text-[10px] tracking-[0.32em] text-gold/70 uppercase">
              Artist &amp; Designer · Studio SHO
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mb-6 font-display leading-[1.0]">
              <span
                className="block font-bold text-white-warm"
                style={{ fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}
              >
                Hamed
              </span>
              <span
                className="block italic font-medium text-gold"
                style={{ fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}
              >
                Ouattara
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mb-10 font-body text-[11px] tracking-[0.22em] text-white-warm/45 uppercase">
              Multidisciplinary Artist &amp; Designer · Burkina Faso
            </p>
          </Reveal>

          {/* Border-left pull quote */}
          <Reveal delay={210}>
            <blockquote className="border-l-2 border-gold pl-6">
              <p className="font-display text-[1.05rem] italic leading-[1.7] text-white-warm/80">
                "This material reflects the economic dependency of the country
                and its relationship with the rest of the world. By integrating
                it into my creations, I elevate it — give it a more noble life."
              </p>
              <footer className="mt-4 font-body text-[10px] tracking-[0.2em] text-gold uppercase">
                Hamed Ouattara
              </footer>
            </blockquote>
          </Reveal>
        </div>

        {/* Right — portrait (top on mobile, right column on desktop) */}
        <div className="order-1 md:order-none relative h-[65vh] bg-[#111] md:h-auto md:min-h-0">
          <Image
            src="/images/hamed_portrait.jpg"
            alt="Hamed Ouattara"
            fill
            priority
            className="object-cover object-top"
            style={{ filter: "grayscale(100%) brightness(1.4) contrast(0.95)" }}
          />
          {/* Caption */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-6 pt-12">
            <p className="font-body text-[10px] tracking-[0.2em] text-white-warm/60 uppercase">
              Hamed Ouattara · Studio SHO · Ouagadougou
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════ MARQUEE */}
      <div className="overflow-hidden border-y border-gold/15 bg-black py-[14px]">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span className="font-body text-[10px] tracking-[0.3em] text-white-warm/50 uppercase">
                {item}
              </span>
              <span className="text-[11px] text-gold">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════ BIOGRAPHY */}
      <section className="bg-white-warm px-6 py-24 md:px-14">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[360px_1fr]">

          {/* Left — sticky pull quote + collections */}
          <div className="md:sticky md:top-[140px] md:self-start">
            <Reveal>
              <p className="mb-5 font-body text-[10px] tracking-[0.25em] text-gold uppercase">
                {t.permanentCollections}
              </p>
              <ul className="space-y-4">
                {collections.map(({ name, city }) => (
                  <li key={name} className="flex items-baseline gap-3">
                    <span className="shrink-0 text-gold">✦</span>
                    <span>
                      <span className="font-body text-[13px] text-black">{name}</span>
                      <span className="ml-2 font-body text-[11px] text-mid/55">{city}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right — bio paragraphs */}
          <div className="space-y-7">
            {bioParas.map((para, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="font-body text-[14.5px] leading-[1.9] text-mid">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ TIMELINE */}
      <section className="bg-black px-6 py-24 md:px-14">
        <Reveal className="mb-16">
          <p className="mb-3 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
            {t.chronologyLabel}
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-white-warm">
            {t.timelineTitle}
          </h2>
        </Reveal>

        <div className="mx-auto max-w-3xl">
          {timeline.map(({ year, event }, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="group relative flex gap-8 pb-10 last:pb-0">
                {/* Vertical line */}
                <div className="relative flex flex-col items-center">
                  <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full border border-gold bg-black transition-colors duration-300 group-hover:bg-gold" />
                  {i < timeline.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-gold/15" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-2">
                  <p className="mb-1 font-display text-[1.05rem] font-semibold text-gold">
                    {year}
                  </p>
                  <p className="font-body text-[13.5px] leading-relaxed text-white-warm/65">
                    {event}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════ STUDIO SHO */}
      <section className="bg-cream px-6 py-24 md:px-14">
        <Reveal className="mb-16">
          <p className="mb-3 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
            {t.atelierLabel}
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-black">
            {t.studioTitle}
          </h2>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">

          {/* Left — description */}
          <div className="space-y-6">
            {[
              `Studio SHO operates on a compagnonnage model — a form of craft transmission rooted in the French guild tradition — adapted to the context of Ouagadougou. Each of the fifteen artisans who make up the studio is both practitioner and student, mastering the full production chain of an object from raw material to finished piece.`,
              `All tools used in the studio are fabricated in-house, reinforcing a philosophy of sovereign production: the studio does not depend on imported equipment, industrial supply chains, or external finishing processes. Every decision, from the sourcing of reclaimed oil drums to the final application of powder coat, remains within the control of the collective.`,
              `This model produces objects of extraordinary precision and consistency — but also ensures that knowledge remains embedded in Ouagadougou, building technical capacity that outlasts any single commission or exhibition cycle.`,
            ].map((para, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className="font-body text-[14px] leading-[1.9] text-mid">{para}</p>
              </Reveal>
            ))}
          </div>

          {/* Right — stats */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-6 md:self-start">
              {studioStats.map(({ value, label }) => (
                <div
                  key={label}
                  className="border border-gold/20 bg-white-warm p-8"
                >
                  <p className="font-display text-[2.2rem] font-bold text-black leading-tight">
                    {value}
                  </p>
                  <p className="mt-2 font-body text-[10px] tracking-[0.2em] text-mid/70 uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════ SIRA ARTA */}
      <section
        className="bg-black px-6 py-24 md:px-14"
        style={{ backgroundImage: TEXTURE, backgroundSize: "48px 48px" }}
      >
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-black/50" />

        <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-start">

          {/* Left — title + details */}
          <Reveal>
            <p className="mb-5 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
              {t.futureVisionLabel}
            </p>
            <h2
              className="font-display font-bold leading-[1.0] text-white-warm"
              style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
            >
              SIRA
              <br />
              <span className="italic text-gold">ARTA</span>
            </h2>

            <div className="mt-10 space-y-3 border-l border-gold/25 pl-6">
              {[
                ["Site",          "17 hectares, Route de Bobo-Dioulasso"],
                ["Partnership",   "ROUN-SA / Harouna Kanazoé"],
                ["Architecture",  "Moyésoa — William Tailly, ESA Paris"],
                ["Programme",     "Studios, workshops, residencies, gallery"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="font-body text-[10px] tracking-[0.2em] text-gold uppercase">
                    {label}&nbsp;&nbsp;
                  </span>
                  <span className="font-body text-[12px] text-white-warm/60">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://studiohamedouattara.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center border border-gold px-8 py-3 font-body text-[11px] tracking-[0.2em] text-gold transition-colors duration-200 hover:bg-gold hover:text-black"
            >
              {t.discoverVision}
            </a>
          </Reveal>

          {/* Right — description paragraphs */}
          <div className="space-y-6">
            {siraParas.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="font-body text-[14px] leading-[1.9] text-white-warm/60">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
