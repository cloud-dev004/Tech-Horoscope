import { useRef, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Layers, User } from "lucide-react";
import profileScrolledImg from "../assets/profile4png.png";

/* ─────────────────────────────────────────────────────────── */
/*  DATA                                                       */
/* ─────────────────────────────────────────────────────────── */

const cards = [
  {
    id: "who",
    tag: "SYS.PROFILE",
    icon: User,
    iconColor: "#f97316",
    title: "Who I Am",
    body: "A passionate Full-Stack Developer & Cloud Engineer from India, crafting high-performance digital experiences that merge elegant design with robust engineering.",
    accentFrom: "#f97316",
    accentTo: "#fb923c",
  },
  {
    id: "what",
    tag: "SYS.MISSION",
    icon: Layers,
    iconColor: "#06b6d4",
    title: "What I Do",
    body: "I architect and build end-to-end web applications — from pixel-perfect UIs to scalable cloud infrastructure — delivering premium products that solve real problems.",
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

  // Parallax on profile image (uses its own full range)
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-4%", "4%"],
  );

  // Scroll-driven entrance — portrait slides in from the left
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const portraitX = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReducedMotion ? [0, 0] : [-40, 0],
  );

  // Scroll-driven entrance — text slides in from the right, slightly delayed
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.75], [0, 1]);
  const textX = useTransform(
    scrollYProgress,
    [0.1, 0.75],
    prefersReducedMotion ? [0, 0] : [40, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="about-preview"
      className="relative w-full py-[clamp(4rem,10vw,8rem)] overflow-hidden"
    >
      {/* ── Section background glows ── */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 65%)",
            filter: "blur(35px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-[clamp(3rem,8vw,6rem)]">
        {/* ── TOP: Portrait (left) + Text (right) ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — Profile Image (scroll-driven) */}
          <motion.div
            style={{ opacity: portraitOpacity, x: portraitX }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-80 sm:w-96 md:w-[26rem]">
              {/* Image with parallax */}
              <motion.div
                style={{ y: imgY }}
                className="relative rounded-3xl overflow-hidden"
              >
                <img
                  src={profileScrolledImg}
                  alt="Peratchi Manikandan — Full-Stack Developer"
                  className="w-full rounded-3xl object-cover"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Text (scroll-driven) */}
          <motion.div
            style={{ opacity: textOpacity, x: textX }}
            className="space-y-6"
          >
            <h2
              className="font-black leading-[1.08]"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              Hello, I'm{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f97316, #fb923c)",
                }}
              >
                Peratchi
              </span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #06b6d4, #22d3ee)",
                }}
              >
                Manikandan
              </span>
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] max-w-lg">
              A Full-Stack Developer &amp; Cloud Engineer who transforms complex
              ideas into premium digital experiences. Specializing in the MERN
              stack with a passion for performance, design, and cloud-native
              architecture.
            </p>

            {/* CTA */}
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 font-medium transition-all active:scale-95 py-2 min-h-[44px]"
              style={{ color: "#f97316" }}
            >
              <span>Read My Full Story</span>
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

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
