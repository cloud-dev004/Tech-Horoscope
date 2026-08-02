import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */
// Using jsdelivr devicon SVGs as basic placeholders for the tech stack logos
const TECHNOLOGIES = [
  {
    id: "html",
    name: "HTML",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    id: "css",
    name: "CSS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    id: "javascript",
    name: "JavaScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    id: "react",
    name: "React",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    id: "nodejs",
    name: "Node.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    id: "express",
    name: "Express",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    id: "docker",
    name: "Docker",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
  {
    id: "git",
    name: "Git",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    id: "aws",
    name: "AWS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    id: "python",
    name: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    id: "c",
    name: "C",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  },
];

/* ─────────────────────────── CARD COMPONENT ─────────────────────────── */
const TechCard = ({
  tech,
  index,
  activeIndex,
  smoothIndex,
  total,
  screenType,
}) => {
  const normalizedActive = ((activeIndex % total) + total) % total;
  const isActive = index === normalizedActive;

  const prefersReducedMotion = useReducedMotion();

  // Continuous offset - circular
  const offset = useTransform(smoothIndex, (v) => {
    let normalizedV = ((v % total) + total) % total;
    let diff = index - normalizedV;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  });

  // Responsive intensity scaling
  const isMobile = screenType === "mobile";
  const isTablet = screenType === "tablet";

  const rotMax = isMobile ? 25 : isTablet ? 34 : 42;
  const zMax = isMobile ? -60 : isTablet ? -90 : -120;
  const zFront = isMobile ? 40 : isTablet ? 60 : 80;

  // Dynamic values
  const rotateY = useTransform(
    offset,
    [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    [
      rotMax,
      rotMax,
      rotMax * 0.7,
      rotMax * 0.4,
      0,
      -rotMax * 0.4,
      -rotMax * 0.7,
      -rotMax,
      -rotMax,
    ],
  );
  const z = useTransform(
    offset,
    [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    [
      zMax,
      zMax * 0.8,
      zMax * 0.5,
      zMax * 0.2,
      zFront,
      zMax * 0.2,
      zMax * 0.5,
      zMax * 0.8,
      zMax,
    ],
  );
  const scale = useTransform(
    offset,
    [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    [0.5, 0.65, 0.78, 0.9, 1, 0.9, 0.78, 0.65, 0.5],
  );
  const opacity = useTransform(
    offset,
    [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    [0, 0.2, 0.45, 0.75, 1, 0.75, 0.45, 0.2, 0],
  );

  const blurVal = useTransform(
    offset,
    [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    prefersReducedMotion || isMobile
      ? [0, 0, 0, 0, 0, 0, 0, 0, 0]
      : [5, 3, 1.5, 0.5, 0, 0.5, 1.5, 3, 5],
  );
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  // Z-index calculation (using Math.round to make it an integer for zIndex)
  const zIndex = useTransform(offset, (v) => Math.round(20 - Math.abs(v)));

  // Overlap -40px to -60px for width 220px -> spacing around 160px
  const x = useTransform(offset, (v) => `calc(-50% + ${v * 160}px)`);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 220,
        height: 260,
        x,
        y: "-50%",
        rotateY,
        z,
        scale,
        opacity,
        filter,
        zIndex,
        pointerEvents: isActive ? "auto" : "none",
        borderRadius: 24,
        background: "rgba(18, 18, 18, 0.7)",
        backdropFilter: "blur(12px)",
        border: isActive
          ? "1px solid rgba(255, 140, 0, 0.4)"
          : "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: isActive ? undefined : "0 10px 30px rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformStyle: "preserve-3d",
      }}
      className={`group ${isActive ? "breathing-glow" : ""}`}
    >
      {/* Active Card Hover / Inner Glow */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 30px rgba(255, 140, 0, 0.2)",
            border: "1px solid rgba(255, 140, 0, 0.7)",
          }}
        />
      )}

      {/* Floating Logo Animation for Active Card */}
      <motion.div
        animate={
          isActive && !prefersReducedMotion && !isMobile
            ? { y: [-3, 3, -3] }
            : { y: 0 }
        }
        transition={
          isActive && !prefersReducedMotion && !isMobile
            ? { repeat: Infinity, duration: 5, ease: "easeInOut" }
            : {}
        }
        style={{
          width: 90,
          height: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.4s ease",
        }}
        className={isActive ? "group-hover:scale-110" : ""}
      >
        <img
          src={tech.url}
          alt={tech.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: isActive
              ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.1))"
              : "grayscale(30%)",
            transition: "all 0.5s ease",
          }}
          className={
            isActive
              ? "group-hover:drop-shadow-[0_0_15px_rgba(255,140,0,0.4)]"
              : ""
          }
        />
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────── SECTION COMPONENT ─────────────────────────── */
const TechStack = () => {
  // Initialize at the visual center of the array to give illusion of infinity
  const [active, setActive] = useState(Math.floor(TECHNOLOGIES.length / 2));

  // Continuous scroll index for Framer Motion
  const scrollIndex = useMotionValue(0);
  const smoothIndex = useSpring(scrollIndex, { damping: 20, stiffness: 100 });

  useEffect(() => {
    scrollIndex.set(active);
  }, [active, scrollIndex]);

  const navigating = useRef(false);
  const sectionRef = useRef(null);
  const cardAreaRef = useRef(null);
  const wheelAcc = useRef(0);
  const dragX = useRef(null);
  const total = TECHNOLOGIES.length;

  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setScreenType("mobile");
      else if (window.innerWidth < 1024) setScreenType("tablet");
      else setScreenType("desktop");
    };
    handleResize(); // init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigate with lock
  const go = useCallback(
    (dir) => {
      if (navigating.current) return;
      const next = active + dir;
      navigating.current = true;
      setActive(next);
      setTimeout(() => {
        navigating.current = false;
      }, 400); // Faster transition for tech stack compared to projects
    },
    [active],
  );

  const goTo = useCallback(
    (idx) => {
      if (navigating.current) return;
      const currentNormalized = ((active % total) + total) % total;
      if (idx === currentNormalized) return;

      let diff = idx - currentNormalized;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      navigating.current = true;
      setActive(active + diff);
      setTimeout(() => {
        navigating.current = false;
      }, 400);
    },
    [active, total],
  );

  /* ── Wheel Capture Logic ── */
  useEffect(() => {
    const el = cardAreaRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const delta = e.deltaY + e.deltaX;

      // Infinite loop means we never reach the "end",
      // wheel is always captured inside the carousel.

      e.preventDefault();
      e.stopPropagation();

      wheelAcc.current += delta;
      if (Math.abs(wheelAcc.current) >= 60) {
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
      aria-label="My Tech Stack"
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "clamp(4rem, 10vw, 8rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        background: "#090909",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Background subtle radial glow ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(255,140,0,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

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
          paddingBottom: "3rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              height: 1,
              width: "clamp(18px, 3vw, 48px)",
              background: "rgba(255,140,0,0.5)",
            }}
          />
          <span
            style={{
              color: "var(--text-label)",
              fontWeight: 300,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontSize: "0.68rem",
            }}
          >
            Featured Technologies
          </span>
          <div
            style={{
              height: 1,
              width: "clamp(18px, 3vw, 48px)",
              background: "rgba(255,140,0,0.5)",
            }}
          />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-heading, serif)",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          MY TECH STACK
        </h2>

        <p
          style={{
            margin: 0,
            color: "var(--text-secondary)",
            fontWeight: 300,
            fontSize: "clamp(0.72rem, 1.2vw, 0.95rem)",
            maxWidth: "400px",
          }}
        >
          The technologies I use to transform ideas into high-performance
          digital products.
        </p>
      </div>

      {/* ── Cards Carousel Stage ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "340px", // Increased height to accommodate Cover Flow rotations
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1500px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Project cards container */}
        <div
          ref={cardAreaRef}
          style={{
            position: "absolute",
            inset: 0,
            cursor: "grab",
          }}
          onMouseDown={(e) => {
            dragX.current = e.clientX;
          }}
          onMouseUp={(e) => {
            if (dragX.current === null) return;
            const d = dragX.current - e.clientX;
            if (Math.abs(d) > 40) go(d > 0 ? 1 : -1);
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
            if (Math.abs(d) > 40) go(d > 0 ? 1 : -1);
            dragX.current = null;
          }}
        >
          {TECHNOLOGIES.map((tech, i) => (
            <TechCard
              key={tech.id}
              tech={tech}
              index={i}
              activeIndex={active}
              smoothIndex={smoothIndex}
              total={total}
              screenType={screenType}
            />
          ))}
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
          gap: "1rem",
          paddingTop: "2rem",
        }}
      >
        {/* Navigation Arrows */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <button
            onClick={() => go(-1)}
            aria-label="Previous tech"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
            className="hover:scale-105 active:scale-95 hover:border-[rgba(255,140,0,0.5)]"
          >
            <ChevronLeft size={20} />
          </button>

          <div style={{ display: "flex", gap: "6px" }}>
            {/* Show a window of dots if too many */}
            {TECHNOLOGIES.map((_, i) => {
              const currentNormalized = ((active % total) + total) % total;

              let diff = i - currentNormalized;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              // Only render dots around the active one or first/last
              const isVisible =
                Math.abs(diff) <= 3 || i === 0 || i === total - 1;
              if (!isVisible) {
                if (i === 1 || i === total - 2) {
                  return (
                    <span
                      key={i}
                      style={{
                        color: "rgba(255,255,255,0.2)",
                        fontSize: "10px",
                        lineHeight: "4px",
                      }}
                    >
                      ...
                    </span>
                  );
                }
                return null;
              }

              const isDotActive = i === currentNormalized;

              return (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: isDotActive ? 24 : 6,
                    height: 6,
                    borderRadius: 999,
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background: isDotActive
                      ? "rgba(255,140,0,1)"
                      : "rgba(255,255,255,0.2)",
                    boxShadow: isDotActive
                      ? "0 0 10px rgba(255,140,0,0.5)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                  aria-label={`Go to ${TECHNOLOGIES[i].name}`}
                />
              );
            })}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next tech"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
            className="hover:scale-105 active:scale-95 hover:border-[rgba(255,140,0,0.5)]"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Hint */}
      </div>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes breathing-glow {
            0%, 100% { 
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 140, 0, 0.15), inset 0 0 20px rgba(255, 140, 0, 0.05); 
            }
            50% { 
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 46px rgba(255, 140, 0, 0.1725), inset 0 0 23px rgba(255, 140, 0, 0.0575); 
            }
          }
          .breathing-glow {
            animation: breathing-glow 6s ease-in-out infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default TechStack;
