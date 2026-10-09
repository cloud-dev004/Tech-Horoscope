import { useRef, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Layers, User } from "lucide-react";

/* ─────────────────────────────────────────────────────────── */
/*  DATA                                                       */
/* ─────────────────────────────────────────────────────────── */

const cards = [
  {
    id: "who",
    tag: "SYS.PROFILE",
    icon: User,
    iconColor: "#C5A3FF",
    title: "Who I Am",
    body: "I'm someone who learns best by getting hands-on — experimenting, building, breaking things, and figuring out how to make them work",
    accentFrom: "#C5A3FF",
    accentTo: "#DCCBFF",
  },
  {
    id: "what",
    tag: "SYS.MISSION",
    icon: Layers,
    iconColor: "#06b6d4",
    title: "What I Do",
    body: "I turn ideas into working applications by building the frontend, backend, database, and everything in between.",
    accentFrom: "#06b6d4",
    accentTo: "#22d3ee",
  },
];

/* ─────────────────────────────────────────────────────────── */
/*  GLASS CARD                                                 */
/* ─────────────────────────────────────────────────────────── */

const GlassCard = ({ card }) => {
  const Icon = card.icon;
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    // 0 = card top hits viewport bottom, 1 = card centre hits viewport centre
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [40, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
        background: `linear-gradient(135deg, ${card.accentFrom}33, ${card.accentTo}22, transparent 60%)`,
      }}
      className="relative group rounded-2xl p-[1px] overflow-hidden"
    >
      {/* Hover scan-line overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden z-10"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-0 right-0 h-full"
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)",
          }}
        />
      </div>

      {/* Card inner */}
      <div
        className="relative rounded-2xl p-6 h-full flex flex-col gap-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Icon + Title */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `${card.accentFrom}18`,
              boxShadow: `0 0 14px ${card.accentFrom}30`,
            }}
          >
            <Icon size={20} style={{ color: card.accentFrom }} />
          </div>
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {card.title}
          </h3>
        </div>

        {/* Body text or stack tags */}
        {card.body ? (
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {card.body}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 mt-1">
            {card.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] rounded-lg font-mono"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-tech)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${card.accentFrom}60, ${card.accentTo}60, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                             */
/* ─────────────────────────────────────────────────────────── */

const HomeAbout = () => {
  const sectionRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (location.state?.scrollToAbout || location.hash === "#about-preview") {
      const el = document.getElementById("about-preview");
      if (el) {
        // Scroll synchronously before the browser paints to eliminate visual flash
        el.scrollIntoView({ behavior: "auto" });
      }
      // Clear hash and state in the React Router state history so refreshing starts at the top (Hero)
      navigate("/", { replace: true, state: {} });
    }
  }, [location, navigate]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // 0 = section top crosses viewport bottom (enters screen)
    // 1 = section centre aligns with viewport centre
    offset: ["start end", "center center"],
  });

  const prefersReducedMotion = useReducedMotion();

  // Scroll-driven entrance for narrative header
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const textY = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReducedMotion ? [0, 0] : [24, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="about-preview"
      className="relative w-full pt-8 pb-[clamp(4rem,10vw,8rem)] overflow-hidden"
    >
      {/* ── Section background glows ── */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(197, 163, 255,0.06) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)",
            filter: "blur(35px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* ── TOP: Developer Statement & Story Link ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-white/5 text-xs text-[var(--color-primary)] font-medium">
            About Mani
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[var(--text-primary)]">
            Turning ideas into scalable, real-world software.
          </h2>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
            I like taking an idea, breaking it down, writing the code, and seeing it become something real. Whether architecting backend services, provisioning cloud databases, or building responsive web applications, my focus is always on reliability and clean execution.
          </p>

          <div className="pt-2">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 font-medium text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors py-2 min-h-[44px]"
            >
              <span>Read My Full Story</span>
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </Link>
          </div>
        </motion.div>

        {/* ── GLASS CARDS GRID ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <GlassCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
