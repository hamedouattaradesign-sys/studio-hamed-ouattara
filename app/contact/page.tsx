"use client";

import { useEffect, useRef, useState } from "react";

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

// ─── Assets ───────────────────────────────────────────────────────────────────
const TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M24 6v36M6 24h36' stroke='%23C8973A' stroke-width='0.4' opacity='0.12'/%3E%3Crect x='16' y='16' width='16' height='16' fill='none' stroke='%23C8973A' stroke-width='0.3' opacity='0.07'/%3E%3C/svg%3E")`;

const INQUIRY_TOPICS = [
  "Acquisition",
  "Institutional collaboration",
  "Press & media",
  "Commission",
  "Exhibition",
];

const SUBJECT_OPTIONS = [
  "Acquisition inquiry",
  "Institutional collaboration",
  "Press & media request",
  "Commission inquiry",
  "Exhibition proposal",
  "General inquiry",
];

const SOCIAL = [
  {
    label: "Instagram",
    href:  "https://www.instagram.com/studiohamedouattara",
    icon:  (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href:  "https://www.facebook.com/studiohamedouattara",
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href:  "https://www.youtube.com/@studiohamedouattara",
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href:  "https://wa.me/22666306363",
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.11 1.523 5.836L0 24l6.336-1.5A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.78 9.78 0 0 1-5.017-1.38l-.36-.214-3.732.883.936-3.617-.236-.374A9.78 9.78 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
      </svg>
    ),
  },
];

// ─── Form ─────────────────────────────────────────────────────────────────────
type FormState = {
  firstName: string;
  lastName:  string;
  email:     string;
  subject:   string;
  message:   string;
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = "Required";
  if (!f.lastName.trim())  e.lastName  = "Required";
  if (!f.email.trim())     e.email     = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Invalid email";
  if (!f.subject)          e.subject   = "Please select a subject";
  if (!f.message.trim())   e.message   = "Required";
  else if (f.message.trim().length < 20) e.message = "Please write at least 20 characters";
  return e;
}

function ContactForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName:  "",
    email:     "",
    subject:   "",
    message:   "",
  });
  const [errors, setErrors]   = useState<Errors>({});
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [touched, setTouched] = useState<Set<keyof FormState>>(new Set());

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setTouched((t) => new Set(t).add(k));
  };

  // Live-validate touched fields
  useEffect(() => {
    const errs = validate(form);
    const filtered: Errors = {};
    touched.forEach((k) => { if (errs[k]) filtered[k] = errs[k]; });
    setErrors(filtered);
  }, [form, touched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched(new Set(Object.keys(form) as (keyof FormState)[]));
      return;
    }
    setStatus("sending");
    // Build a mailto fallback — graceful without a backend
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    );
    const mailto = `mailto:studiohamedouattarabf@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${body}`;
    window.location.href = mailto;
    // Optimistically mark as sent
    setTimeout(() => setStatus("sent"), 500);
  };

  const field = (
    id: keyof FormState,
    label: string,
    el: React.ReactNode
  ) => (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-body text-[10px] tracking-[0.2em] text-mid/70 uppercase"
      >
        {label}
      </label>
      {el}
      {errors[id] && (
        <p className="mt-1 font-body text-[10px] text-red-500">{errors[id]}</p>
      )}
    </div>
  );

  const inputCls = (id: keyof FormState) =>
    `w-full border px-4 py-3 font-body text-[13px] text-black placeholder:text-mid/35 outline-none transition-colors duration-200 bg-white focus:border-gold ${
      errors[id] ? "border-red-400" : "border-black/15"
    }`;

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="mb-5 block font-display text-4xl text-gold">&checkmark;</span>
        <h3 className="mb-3 font-display text-xl font-semibold text-black">Message sent</h3>
        <p className="font-body text-[13px] text-mid">
          Your mail client has opened with the pre-filled message. We aim to respond within 48 hours.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ firstName:"",lastName:"",email:"",subject:"",message:"" }); setTouched(new Set()); }}
          className="mt-8 border border-gold px-6 py-2.5 font-body text-[11px] tracking-[0.18em] text-gold transition-colors duration-200 hover:bg-gold hover:text-black"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        {field("firstName", "First name",
          <input id="firstName" type="text" placeholder="Hamed" value={form.firstName}
            onChange={set("firstName")} className={inputCls("firstName")} />
        )}
        {field("lastName", "Last name",
          <input id="lastName" type="text" placeholder="Ouattara" value={form.lastName}
            onChange={set("lastName")} className={inputCls("lastName")} />
        )}
      </div>

      {field("email", "Email address",
        <input id="email" type="email" placeholder="you@example.com" value={form.email}
          onChange={set("email")} className={inputCls("email")} />
      )}

      {field("subject", "Subject",
        <select id="subject" value={form.subject} onChange={set("subject")}
          className={`${inputCls("subject")} appearance-none`}>
          <option value="">Select a subject…</option>
          {SUBJECT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      )}

      {field("message", "Message",
        <textarea id="message" rows={6} placeholder="Describe your inquiry…" value={form.message}
          onChange={set("message")}
          className={`${inputCls("message")} resize-none leading-relaxed`} />
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold py-4 font-body text-[11px] tracking-[0.25em] text-black uppercase transition-colors duration-200 hover:bg-gold-lt disabled:opacity-60"
      >
        {status === "sending" ? "Opening mail client…" : "Send Message"}
      </button>

      <p className="font-body text-[10px] text-mid/45 text-center">
        Sends via your mail client to studiohamedouattarabf@gmail.com
      </p>
    </form>
  );
}

// ─── Location card ────────────────────────────────────────────────────────────
function LocationCard({
  flag, city, lines, note,
}: {
  flag:  string;
  city:  string;
  lines: string[];
  note?: string;
}) {
  return (
    <div className="border border-black/10 bg-white-warm p-8 transition-colors duration-300 hover:border-gold">
      <p className="mb-2 font-body text-[10px] tracking-[0.25em] text-gold uppercase">{flag}</p>
      <h3 className="mb-5 font-display text-xl font-semibold text-black">{city}</h3>
      <ul className="space-y-2">
        {lines.map((l, i) => (
          <li key={i} className="font-body text-[13px] leading-relaxed text-mid">{l}</li>
        ))}
      </ul>
      {note && (
        <p className="mt-4 font-body text-[11px] italic text-mid/50">{note}</p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      {/* ════════════════════════════ HERO */}
      <section className="flex min-h-screen flex-col pt-[72px] md:grid md:grid-cols-[1fr_440px]">

        {/* Left — dark + texture */}
        <div
          className="relative flex flex-col justify-center bg-black px-8 py-20 md:px-16 md:py-28"
          style={{ backgroundImage: TEXTURE, backgroundSize: "48px 48px" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10">
            <Reveal>
              <p className="mb-10 font-body text-[10px] tracking-[0.32em] text-gold/60 uppercase">
                Studio Hamed Ouattara · Contact
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mb-8 font-display leading-[1.0]">
                <span className="block font-bold text-white-warm"
                  style={{ fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}>
                  Get in
                </span>
                <span className="block italic font-medium text-gold"
                  style={{ fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}>
                  Touch
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mb-12 max-w-md font-body text-[14px] leading-[1.85] text-white-warm/55">
                For acquisition inquiries, institutional collaborations, press requests,
                or any question about the work — the studio team is available from
                Ouagadougou and Atlanta.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="border-t border-gold/20 pt-8">
                <p className="mb-4 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
                  Response time
                </p>
                <p className="font-body text-[13px] text-white-warm/50">
                  We respond to all inquiries within 48 hours.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right — cream contact blocks */}
        <div className="flex flex-col justify-center bg-cream px-8 py-16 md:px-10 md:py-20">

          {/* Studio Ouagadougou */}
          <Reveal className="mb-8">
            <div className="border-b border-black/10 pb-8">
              <p className="mb-4 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
                Studio · Ouagadougou
              </p>
              <a href="tel:+22666306363"
                className="mb-1.5 block font-body text-[13px] text-black transition-colors hover:text-gold">
                +226 66 30 63 63
              </a>
              <a href="tel:+22666490505"
                className="block font-body text-[13px] text-black transition-colors hover:text-gold">
                +226 66 49 05 05
              </a>
            </div>
          </Reveal>

          {/* Atlanta */}
          <Reveal className="mb-8" delay={60}>
            <div className="border-b border-black/10 pb-8">
              <p className="mb-4 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
                Atlanta · USA
              </p>
              <a href="tel:+16463936511"
                className="block font-body text-[13px] text-black transition-colors hover:text-gold">
                +1 646 393 6511
              </a>
            </div>
          </Reveal>

          {/* Email */}
          <Reveal className="mb-8" delay={120}>
            <div className="border-b border-black/10 pb-8">
              <p className="mb-4 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
                Email
              </p>
              <a href="mailto:studiohamedouattarabf@gmail.com"
                className="font-body text-[13px] text-black transition-colors hover:text-gold break-all">
                studiohamedouattarabf@gmail.com
              </a>
            </div>
          </Reveal>

          {/* Gallery */}
          <Reveal className="mb-8" delay={180}>
            <div className="border-b border-black/10 pb-8">
              <p className="mb-4 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
                Gallery Representation
              </p>
              <a href="https://www.friedmanbenda.com" target="_blank" rel="noopener noreferrer"
                className="block font-body text-[13px] text-black transition-colors hover:text-gold">
                Friedman Benda Gallery
              </a>
              <p className="mt-1 font-body text-[11px] text-mid/55">
                New York · Exclusively represented
              </p>
            </div>
          </Reveal>

          {/* Social */}
          <Reveal delay={240}>
            <p className="mb-4 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
              Social
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-black/15 px-4 py-2.5 font-body text-[11px] text-mid transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════ FORM SECTION */}
      <section className="grid md:grid-cols-2">

        {/* Left — dark intro */}
        <div className="flex flex-col justify-center bg-black px-8 py-20 md:px-16 md:py-24">
          <Reveal>
            <p className="mb-5 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
              Contact Form
            </p>
            <h2 className="mb-8 font-display leading-[1.05]">
              <span className="block font-bold text-white-warm"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                Let's start a
              </span>
              <span className="block italic text-gold"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                conversation
              </span>
            </h2>
            <p className="mb-10 font-body text-[13px] leading-[1.8] text-white-warm/50">
              We aim to respond to all inquiries within 48 hours. For urgent matters,
              please call the studio directly.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="border-t border-gold/20 pt-8">
              <p className="mb-5 font-body text-[10px] tracking-[0.22em] text-gold uppercase">
                Topics we handle
              </p>
              <ul className="space-y-3">
                {INQUIRY_TOPICS.map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="text-gold text-xs">✦</span>
                    <span className="font-body text-[13px] text-white-warm/65">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <div className="bg-white px-8 py-20 md:px-14 md:py-24">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════ LOCATIONS */}
      <section className="bg-cream px-6 py-24 md:px-14">
        <Reveal className="mb-14">
          <p className="mb-3 font-body text-[10px] tracking-[0.28em] text-gold uppercase">
            Where to find us
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-black">
            Locations
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal delay={0}>
            <LocationCard
              flag="Burkina Faso 🇧🇫"
              city="Ouagadougou"
              lines={[
                "Studio SHO",
                "Secteur 49, Ouagadougou",
                "+226 66 30 63 63",
                "+226 66 49 05 05",
              ]}
              note="Primary studio and production atelier"
            />
          </Reveal>
          <Reveal delay={80}>
            <LocationCard
              flag="United States 🇺🇸"
              city="Atlanta, Georgia"
              lines={[
                "Studio Hamed Ouattara — USA",
                "3535 South Fulton Avenue",
                "Studio 101, Hapeville",
                "Georgia 30354, Atlanta USA",
                "+1 646 393 6511",
                "Available by appointment",
              ]}
              note="North American contact point for collector meetings"
            />
          </Reveal>
          <Reveal delay={160}>
            <LocationCard
              flag="United States 🇺🇸"
              city="New York"
              lines={[
                "Friedman Benda Gallery",
                "515 West 26th Street",
                "New York, NY 10001",
              ]}
              note="Exclusively represented — contact the gallery for acquisitions and collector inquiries"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
