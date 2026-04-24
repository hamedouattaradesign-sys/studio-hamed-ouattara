"use client";

import { useEffect, useRef, useState } from "react";

// ─── Scroll-reveal ────────────────────────────────────────────────────────────
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

// ─── Types & data ─────────────────────────────────────────────────────────────
type Category = "Institutions" | "Press" | "Exhibitions" | "Awards";

type PressItem = {
  category:    Category;
  year:        string;
  source:      string;
  location:    string;
  title:       string;
  description: string;
  href?:       string;
};

// Category → visual colour token
const CAT_STYLES: Record<Category, { tag: string; dot: string }> = {
  Institutions: { tag: "bg-gold/15 text-gold border border-gold/30",       dot: "bg-gold"          },
  Press:        { tag: "bg-blue-500/10 text-blue-400 border border-blue-400/25", dot: "bg-blue-400" },
  Exhibitions:  { tag: "bg-emerald-500/10 text-emerald-400 border border-emerald-400/25", dot: "bg-emerald-400" },
  Awards:       { tag: "bg-orange-400/10 text-orange-400 border border-orange-400/25",    dot: "bg-orange-400" },
};

const items: PressItem[] = [
  // ── Institutions ──────────────────────────────────────────────────────────
  {
    category:    "Institutions",
    year:        "2026",
    source:      "Homo Faber",
    location:    "Venice, Italy",
    title:       "Homo Faber 2026 — Selected Maker",
    description: "Ouattara selected as a featured maker for the biennial Homo Faber event at the Fondazione Giorgio Cini, Venice — Europe's foremost celebration of exceptional craftsmanship and design.",
    href:        "https://homofaber.com",
  },
  {
    category:    "Institutions",
    year:        "2023",
    source:      "Brooklyn Museum",
    location:    "New York, USA",
    title:       "Permanent Collection Acquisition",
    description: "The Brooklyn Museum acquired a major work by Ouattara for its permanent collection (Accession No. 2023.66), marking one of the first acquisitions of West African design in the museum's contemporary holdings.",
    href:        "https://www.brooklynmuseum.org/exhibitions/breaking_the_mold",
  },
  {
    category:    "Institutions",
    year:        "2023",
    source:      "Denver Art Museum",
    location:    "Denver, USA",
    title:       "Permanent Collection Acquisition",
    description: "The Denver Art Museum acquired a work from the Bolibana series for its permanent collection, affirming the international institutional standing of Ouattara's practice.",
    href:        "https://www.denverartmuseum.org/en/object/2023.204",
  },

  // ── Press ─────────────────────────────────────────────────────────────────
  {
    category:    "Press",
    year:        "2026",
    source:      "Art Daily",
    location:    "International",
    title:       "Hamed Ouattara: Turning Oil Drums into Cultural Memory",
    description: "A feature on Ouattara's practice and the forthcoming COME BACK exhibition at the Musée National du Burkina Faso, tracing his method of material reclamation and its political dimensions.",
    href:        "https://artdaily.com",
  },
  {
    category:    "Press",
    year:        "2023",
    source:      "Studio International",
    location:    "UK",
    title:       "Bolibana: Objects of Sovereign Making",
    description: "A critical essay on the Bolibana exhibition at Friedman Benda Gallery, situating Ouattara's work within contemporary debates about Afrofuturism, decolonial design, and material culture.",
  },
  {
    category:    "Press",
    year:        "2023",
    source:      "Design Milk",
    location:    "USA",
    title:       "Inside the Studio of Hamed Ouattara",
    description: "A studio visit to Bobo-Dioulasso examining the compagnonnage model, the in-house tool fabrication process, and the formal sources of the Bolibana cabinet series.",
    href:        "https://design-milk.com",
  },
  {
    category:    "Press",
    year:        "2023",
    source:      "Architectural Digest",
    location:    "USA",
    title:       "The Designers Redefining African Craft",
    description: "Ouattara featured among a cohort of designers whose work challenges received narratives about African craft — foregrounding the conceptual rigour and formal sophistication of his oil drum furniture.",
    href:        "https://architecturaldigest.com",
  },
  {
    category:    "Press",
    year:        "2023",
    source:      "Creative Review",
    location:    "UK",
    title:       "Hamed Ouattara — Material as Manifesto",
    description: "A profile of Ouattara's practice for Creative Review, focusing on the relationship between material choice, geopolitical critique, and the aesthetics of reclamation.",
  },

  // ── Exhibitions ───────────────────────────────────────────────────────────
  {
    category:    "Exhibitions",
    year:        "2023",
    source:      "Friedman Benda Gallery",
    location:    "New York, USA",
    title:       "Bolibana — Solo Exhibition",
    description: "Ouattara's inaugural solo exhibition in New York, presenting the complete Bolibana series of sculptural cabinets to critical and institutional acclaim. Accompanied by a catalogue text by Glenn Adamson.",
    href:        "https://friedmanbenda.com/artists/hamed-ouattara/",
  },
  {
    category:    "Exhibitions",
    year:        "2021",
    source:      "Art Curial",
    location:    "Paris, France",
    title:       "Exceptions d'Afrique",
    description: "Ouattara's work presented alongside a curated selection of African design and applied art at the Art Curial auction house, Paris — a group exhibition affirming the market and critical standing of contemporary African makers.",
  },
  {
    category:    "Exhibitions",
    year:        "2019",
    source:      "AKAA — Also Known As Africa",
    location:    "Paris, France",
    title:       "AKAA Paris 2019",
    description: "Participation in the leading European fair dedicated to African contemporary art and design, with works from the Bolibana series and early furniture editions.",
    href:        "https://www.akaa-paris.com",
  },
  {
    category:    "Exhibitions",
    year:        "2015",
    source:      "Design Miami / Basel",
    location:    "Basel, Switzerland",
    title:       "Design Miami / Basel 2015",
    description: "Ouattara's work presented at Design Miami / Basel, the world's most prominent fair for collectible design — an early moment of international validation for the studio's furniture practice.",
    href:        "https://www.designmiami.com",
  },
  {
    category:    "Exhibitions",
    year:        "2014",
    source:      "Maison & Objet",
    location:    "Paris, France",
    title:       "Maison & Objet Paris 2014",
    description: "Group exhibition presenting Studio SHO's early furniture editions, marking the studio's first significant European platform and the beginning of sustained international interest.",
  },

  // ── Awards ────────────────────────────────────────────────────────────────
  {
    category:    "Awards",
    year:        "2014",
    source:      "Africa Design Award",
    location:    "Johannesburg, South Africa",
    title:       "Africa Design Award — Winner",
    description: "Ouattara received the Africa Design Award in Johannesburg — the continent's leading prize for design excellence — in recognition of the formal and conceptual achievement of the Bolibana series.",
  },
  {
    category:    "Awards",
    year:        "2014",
    source:      "Gouvernement du Burkina Faso",
    location:    "Ouagadougou, Burkina Faso",
    title:       "Chevalier de l'Ordre du mérite des Arts",
    description: "Decorated by the Burkinabé state with the Chevalier de l'Ordre du mérite des Arts, the country's highest cultural honour, in recognition of Ouattara's contribution to the prestige of Burkinabé art on the international stage.",
  },
];

const FILTERS = ["All", "Institutions", "Press", "Exhibitions", "Awards"] as const;
type Filter = (typeof FILTERS)[number];

const TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 6v36M6 24h36' stroke='%23C8973A' stroke-width='0.4' opacity='0.12'/%3E%3Crect x='16' y='16' width='16' height='16' fill='none' stroke='%23C8973A' stroke-width='0.3' opacity='0.07'/%3E%3C/svg%3E")`;

// ─── Press Card ───────────────────────────────────────────────────────────────
function PressCard({ item, index }: { item: PressItem; index: number }) {
  const styles = CAT_STYLES[item.category];
  return (
    <Reveal delay={(index % 3) * 70}>
      <article className="group flex h-full flex-col border border-black/8 bg-white-warm p-7 transition-all duration-300 hover:border-gold hover:shadow-[0_4px_24px_-6px_rgba(200,151,58,0.12)]">
        {/* Header row */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 font-body text-[9px] tracking-[0.18em] uppercase ${styles.tag}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {item.category}
          </span>
          <span className="font-body text-[11px] text-mid/50">{item.year}</span>
        </div>

        {/* Source + location */}
        <p className="mb-1 font-body text-[10px] tracking-[0.2em] text-gold uppercase">
          {item.source}
        </p>
        <p className="mb-4 font-body text-[10px] text-mid/55">{item.location}</p>

        {/* Title */}
        <h3 className="mb-3 font-display text-[1.05rem] font-semibold leading-snug text-black transition-colors duration-200 group-hover:text-gold">
          {item.title}
        </h3>

        {/* Description */}
        <p className="flex-1 font-body text-[12.5px] leading-[1.8] text-mid/80">
          {item.description}
        </p>

        {/* Read more */}
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.18em] text-gold uppercase transition-opacity duration-200 hover:opacity-70"
          >
            Read more ↗
          </a>
        )}
      </article>
    </Reveal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PressPage() {
  const [active, setActive] = useState<Filter>("All");
  const [visible, setVisible] = useState(items);

  useEffect(() => {
    if (active === "All") {
      setVisible(items);
    } else {
      setVisible(items.filter((it) => it.category === active));
    }
  }, [active]);

  // Category counts for filter labels
  const counts = FILTERS.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === "All" ? items.length : items.filter((it) => it.category === f).length;
    return acc;
  }, {});

  return (
    <>
      {/* ════════════════════════════ PAGE HEADER */}
      <header
        className="relative overflow-hidden bg-black px-6 pb-20 pt-[calc(72px+4rem)] md:px-14"
        style={{ backgroundImage: TEXTURE, backgroundSize: "48px 48px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/50" />
        <div className="relative z-10 max-w-3xl">
          <Reveal>
            <p className="mb-10 font-body text-[10px] tracking-[0.32em] text-gold/60 uppercase">
              Studio Hamed Ouattara · Press
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="mb-7 font-display leading-[1.0]">
              <span
                className="block font-bold text-white-warm"
                style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
              >
                Press &amp;
              </span>
              <span
                className="block italic font-medium text-gold"
                style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
              >
                Recognition
              </span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="font-body text-[14px] leading-[1.85] text-white-warm/50">
              Publications, institutional acquisitions, exhibitions and awards — a record
              of international recognition spanning two decades of practice rooted in
              Ouagadougou, Burkina Faso.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ════════════════════════════ FILTER BAR */}
      <div className="sticky top-[72px] z-40 border-b border-black/8 bg-cream">
        <div className="flex overflow-x-auto px-6 md:px-14">
          {FILTERS.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={[
                  "flex shrink-0 items-center gap-2 border-b-[1.5px] px-1 py-4 mr-7 font-body text-[11px] tracking-[0.15em] uppercase transition-colors duration-200",
                  isActive
                    ? "border-gold text-gold"
                    : "border-transparent text-mid/60 hover:text-black",
                ].join(" ")}
              >
                {f}
                <span
                  className={[
                    "flex h-5 w-5 items-center justify-center rounded-full text-[9px] transition-colors duration-200",
                    isActive ? "bg-gold text-black" : "bg-black/8 text-mid/60",
                  ].join(" ")}
                >
                  {counts[f]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════ PRESS GRID */}
      <section className="bg-cream px-6 py-20 md:px-14">
        {/* Count + active filter label */}
        <Reveal className="mb-10">
          <p className="font-body text-[11px] tracking-[0.2em] text-mid/50">
            Showing{" "}
            <span className="text-gold">{visible.length}</span>{" "}
            {active === "All" ? "records" : active.toLowerCase()}
          </p>
        </Reveal>

        <div
          key={active} // remount grid on filter change to re-trigger reveals
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {visible.map((item, i) => (
            <PressCard key={`${item.source}-${item.year}`} item={item} index={i} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-body text-[13px] text-mid/50">No records in this category.</p>
          </div>
        )}
      </section>

      {/* ════════════════════════════ PRESS KIT */}
      <section
        className="relative bg-black px-6 py-24 md:px-14"
        style={{ backgroundImage: TEXTURE, backgroundSize: "48px 48px" }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-start">

          {/* Left — title + description */}
          <Reveal>
            <p className="mb-5 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
              Media Resources
            </p>
            <h2 className="mb-6 font-display leading-tight">
              <span
                className="block font-bold text-white-warm"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              >
                Press Kit &amp;
              </span>
              <span
                className="block italic text-gold"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              >
                Media Assets
              </span>
            </h2>
            <p className="mb-4 font-body text-[14px] leading-[1.85] text-white-warm/55">
              High-resolution imagery, artist biography, exhibition texts, and institutional
              documentation are available for accredited press and curators on request.
            </p>
            <p className="font-body text-[14px] leading-[1.85] text-white-warm/55">
              For press inquiries, reproduction rights, or interview requests, contact
              the studio directly or reach out via Friedman Benda Gallery, New York.
            </p>
          </Reveal>

          {/* Right — action buttons */}
          <Reveal delay={120}>
            <div className="flex flex-col gap-4">

              {/* Press Inquiry */}
              <a
                href="mailto:studiohamedouattarabf@gmail.com"
                className="group flex items-center justify-between border border-gold/40 bg-white-warm/5 px-7 py-5 transition-colors duration-200 hover:border-gold hover:bg-white-warm/10"
              >
                <div>
                  <p className="mb-1 font-body text-[10px] tracking-[0.2em] text-gold uppercase">
                    Press Inquiry
                  </p>
                  <p className="font-body text-[13px] text-white-warm/70">
                    studiohamedouattarabf@gmail.com
                  </p>
                </div>
                <span className="text-gold/50 transition-colors duration-200 group-hover:text-gold">
                  ↗
                </span>
              </a>

              {/* Friedman Benda */}
              <a
                href="https://www.friedmanbenda.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-white-warm/10 bg-white-warm/5 px-7 py-5 transition-colors duration-200 hover:border-gold hover:bg-white-warm/10"
              >
                <div>
                  <p className="mb-1 font-body text-[10px] tracking-[0.2em] text-gold uppercase">
                    Gallery Representation
                  </p>
                  <p className="font-body text-[13px] text-white-warm/70">
                    Friedman Benda Gallery, New York
                  </p>
                </div>
                <span className="text-gold/50 transition-colors duration-200 group-hover:text-gold">
                  ↗
                </span>
              </a>

              {/* Media page */}
              <a
                href="https://studiohamedouattara.com/pages/press"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-white-warm/10 bg-white-warm/5 px-7 py-5 transition-colors duration-200 hover:border-gold hover:bg-white-warm/10"
              >
                <div>
                  <p className="mb-1 font-body text-[10px] tracking-[0.2em] text-gold uppercase">
                    Media Page
                  </p>
                  <p className="font-body text-[13px] text-white-warm/70">
                    studiohamedouattara.com/pages/press
                  </p>
                </div>
                <span className="text-gold/50 transition-colors duration-200 group-hover:text-gold">
                  ↗
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
