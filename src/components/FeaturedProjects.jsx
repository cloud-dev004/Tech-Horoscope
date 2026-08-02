import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Uyir from "../assets/Uyir.png";
import stocksense from "../assets/stocksense.png";
/* ─────────────────────────── DATA ─────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: "StockSense",
    description: "Cloud-Based Smart Inventory Management System",
    image: stocksense,
    tags: ["React", "Flask", "MySQL", "AWS", "REST API", "AWS RDS"],
    liveUrl: "#",
    githubUrl: "https://github.com/cloud-dev004/Stocksense",
  },
  {
    id: 2,
    title: "Uyir",
    description:
      "Connecting communities to rescue, track, and care for animals through one digital platform.",
    image: Uyir,
    tags: ["React.js", "MongoDB", "Express.js", "Node.js"],
    liveUrl: "https://uyir-animal-rescue-platform.netlify.app/",
    githubUrl: "https://github.com/cloud-dev004/uyir-animal-rescue-system",
  },
  {
    id: 3,
    title: "LocalLens",
    description:
      "Helping users discover nearby businesses and essential services through a location-aware digital platform.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
    tags: ["JS", "HTML", "CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/cloud-dev004/locallens",
  },
];

/* ─────────────────────────── CARD ─────────────────────────── */
const Card = ({ project, index, total, offset }) => {
  const isActive = offset === 0;
  const absOff = Math.abs(offset);

  const scale = isActive ? 1 : 0.82;
  const opacity = isActive ? 1 : absOff === 1 ? 0.38 : 0;
  const blur = isActive ? 0 : 8;
  // translateX: move side cards so they peek from the edges
  const tx = `calc(-50% + ${offset * 60}vw)`;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "clamp(300px, 63vw, 860px)",
        height: "clamp(200px, 50vh, 440px)",
        transform: `translate(${tx}, -50%) scale(${scale})`,
        opacity,
        filter: blur ? `blur(${blur}px)` : "none",
        zIndex: isActive ? 20 : 10,
        transition:
          "transform 0.65s cubic-bezier(0.77,0,0.175,1), opacity 0.65s ease, filter 0.65s ease, box-shadow 0.65s ease",
        willChange: "transform, opacity, filter",
        pointerEvents: isActive ? "auto" : "none",
        borderRadius: 28,
        overflow: "hidden",
        background: "var(--surface)",
        border: isActive
          ? "2px solid rgba(249,115,22,0.75)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: isActive
          ? "0 0 0 1px rgba(249,115,22,0.15), 0 0 70px rgba(249,115,22,0.22), 0 28px 80px rgba(0,0,0,0.75)"
          : "0 16px 48px rgba(0,0,0,0.55)",
        display: "flex",
      }}
    >
      {/* ── LEFT: screenshot ── */}
      <div
        style={{
          width: "52%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* Fade right edge into card bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 55%, var(--surface) 100%)",
          }}
        />
        {/* Dark overlay top/bottom */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 30%, transparent 70%, rgba(0,0,0,0.35))",
          }}
        />
      </div>

      {/* ── RIGHT: info ── */}
      <div
        style={{
          flex: 1,
          padding:
            "clamp(1rem, 3vh, 2rem) clamp(1rem, 2.5vw, 2rem) clamp(1rem, 3vh, 2rem) clamp(0.5rem, 1.5vw, 1.25rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "clamp(0.5rem, 1.5vh, 1rem)",
          overflow: "hidden",
        }}
      >
        {/* Number */}
        <div
          style={{
            color: "var(--color-primary)",
            fontWeight: 700,
            letterSpacing: "0.15em",
            fontSize: "0.78rem",
          }}
        >
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>

        {/* Title */}
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(1.3rem, 3vw, 2.4rem)",
            color: "var(--text-primary)",
            lineHeight: 1.05,
          }}
        >
          {project.title}
        </h3>

        {/* Orange divider */}
        <div
          style={{
            width: 44,
            height: 2,
            borderRadius: 2,
            background: "var(--color-primary)",
            flexShrink: 0,
          }}
        />

        {/* Description */}
        <p
          style={{
            margin: 0,
            color: "var(--text-secondary)",
            fontSize: "clamp(0.72rem, 1.1vw, 0.9rem)",
            lineHeight: 1.65,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div>
          <p
            style={{
              margin: "0 0 6px",
              color: "var(--text-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Tech Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 10px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  color: "var(--text-tech)",
                  fontSize: "clamp(0.62rem, 0.8vw, 0.75rem)",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}
        >
          <a
            href={project.liveUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 active:scale-95 hover:shadow-[0_0_22px_rgba(249,115,22,0.5)]"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "10px 20px",
              minHeight: 44,
              borderRadius: 999,
              background: "var(--color-primary)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textDecoration: "none",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
          >
            VIEW PROJECT <ArrowRight size={14} />
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 active:scale-95 hover:bg-[rgba(34,197,94,0.1)]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "10px 20px",
                minHeight: 44,
                borderRadius: 999,
                background: "transparent",
                color: "#22C55E",
                border: "1px solid rgba(34,197,94,0.45)",
                fontWeight: 700,
                fontSize: "0.75rem",
                textDecoration: "none",
                transition: "background 0.25s, transform 0.25s",
              }}
            >
              <GitBranch size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── SECTION ─────────────────────────── */
const FeaturedProjects = () => {
  const [active, setActive] = useState(0);
  const navigating = useRef(false);
  const sectionRef = useRef(null);
  const cardAreaRef = useRef(null);
  const wheelAcc = useRef(0);
  const dragX = useRef(null);
  const total = PROJECTS.length;

  /* navigate with lock to prevent rapid-fire */
  const go = useCallback(
    (dir) => {
      if (navigating.current) return;
      const next = active + dir;
      if (next < 0 || next >= total) return;
      navigating.current = true;
      setActive(next);
      setTimeout(() => {
        navigating.current = false;
      }, 680);
    },
    [active, total],
  );

  const goTo = useCallback(
    (idx) => {
      if (navigating.current || idx === active) return;
      navigating.current = true;
      setActive(idx);
      setTimeout(() => {
        navigating.current = false;
      }, 680);
    },
    [active],
  );

  /* ── Wheel: only trap scroll inside the marked card area ── */
  useEffect(() => {
    const el = cardAreaRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const delta = e.deltaY + e.deltaX;
      const goingRight = delta > 0;
      const goingLeft = delta < 0;

      // At first card scrolling left, or last card scrolling right → let page scroll
      const atStart = active === 0 && goingLeft;
      const atEnd = active === total - 1 && goingRight;

      if (atStart || atEnd) {
        wheelAcc.current = 0;
        return; // don't preventDefault — allow page to scroll
      }

      e.preventDefault();
      e.stopPropagation();

      wheelAcc.current += delta;
      if (Math.abs(wheelAcc.current) >= 70) {
        go(wheelAcc.current > 0 ? 1 : -1);
        wheelAcc.current = 0;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, active, total]);

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      aria-label="Featured Projects"
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100dvh - 4rem)",
        minHeight: "calc(100svh - 4rem)",
        overflow: "hidden",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      {/* ── Background radial glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "65vw",
            height: "65vw",
            background:
              "radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 68%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* ── Header ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "0.4rem",
          paddingTop: "clamp(20px, 4vh, 40px)",
          paddingBottom: "clamp(5px, 1vh, 12px)",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              height: 1,
              width: "clamp(18px, 3vw, 48px)",
              background: "rgba(249,115,22,0.5)",
            }}
          />
          <span
            style={{
              color: "var(--color-primary)",
              fontWeight: 300,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontSize: "0.68rem",
            }}
          >
            Featured Projects
          </span>
          <div
            style={{
              height: 1,
              width: "clamp(18px, 3vw, 48px)",
              background: "rgba(249,115,22,0.5)",
            }}
          />
        </div>

        {/* Main heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          MY RECENT WORK
        </h2>

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
            color: "var(--text-secondary)",
            fontWeight: 300,
            fontSize: "clamp(0.72rem, 1.2vw, 0.95rem)",
          }}
        >
          A selection of projects I've built using modern technologies.
        </p>
      </div>

      {/* ── Cards Stage ── */}
      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Prev button */}
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous project"
          style={{
            position: "absolute",
            left: "clamp(8px, 2vw, 28px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(10px)",
            color: active === 0 ? "rgba(255,255,255,0.2)" : "white",
            cursor: active === 0 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            if (active !== 0)
              e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next button */}
        <button
          onClick={() => go(1)}
          disabled={active === total - 1}
          aria-label="Next project"
          style={{
            position: "absolute",
            right: "clamp(8px, 2vw, 28px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(10px)",
            color: active === total - 1 ? "rgba(255,255,255,0.2)" : "white",
            cursor: active === total - 1 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            if (active !== total - 1)
              e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Project cards container — wheel & drag listeners scoped here to match marked area */}
        <div
          ref={cardAreaRef}
          style={{
            position: "relative",
            width: "clamp(300px, 70vw, 920px)",
            height: "100%",
            margin: "0 auto",
            cursor: "grab",
          }}
          onMouseDown={(e) => {
            dragX.current = e.clientX;
          }}
          onMouseUp={(e) => {
            if (dragX.current === null) return;
            const d = dragX.current - e.clientX;
            if (Math.abs(d) > 55) go(d > 0 ? 1 : -1);
            dragX.current = null;
          }}
          onMouseLeave={() => {
            dragX.current = null;
          }}
          onTouchStart={(e) => {
            dragX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (dragX.current === null) return;
            const d = dragX.current - e.changedTouches[0].clientX;
            if (Math.abs(d) > 55) go(d > 0 ? 1 : -1);
            dragX.current = null;
          }}
        >
          {PROJECTS.map((project, i) => {
            const offset = i - active;
            if (Math.abs(offset) > 2) return null;
            return (
              <Card
                key={project.id}
                project={project}
                index={i}
                total={total}
                offset={offset}
              />
            );
          })}
        </div>
      </div>

      {/* ── Bottom controls ── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.55rem",
          paddingBottom: "clamp(8px, 2vh, 18px)",
        }}
      >
        {/* Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                height: 8,
                width: i === active ? 36 : 8,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background:
                  i === active
                    ? "var(--color-primary)"
                    : "rgba(255,255,255,0.2)",
                boxShadow:
                  i === active ? "0 0 10px rgba(249,115,22,0.55)" : "none",
                transition: "all 0.45s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Orange border pulse keyframes */}
      <style>{`
        @keyframes fp-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects;
