import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import "./ProjectShowcase.css";
import Uyir from "../../assets/Uyir.webp";
import stocksense from "../../assets/stocksense.webp";
import MockVoice from "../../assets/Mockvoice.svg"


/* ─────────────────────────── DATA ─────────────────────────── */
const PROJECTS = [
  
  {
  id: 1,
  title: "Mockvoice",
  description: "AI-powered mock interview platform designed to help candidates practice speaking, analyze their responses, and improve interview performance.",
  image: MockVoice,
  imgWidth: 1534,
  imgHeight: 897,
  tags: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "FastAPI",
    "Faster-Whisper",
    "AI"
  ],
  liveUrl: "#",
  githubUrl: "YOUR_GITHUB_URL",
},
{
    id: 2,
    title: "StockSense",
    description: "Cloud-Based Smart Inventory Management System",
    image: stocksense,
    imgWidth: 1534,
    imgHeight: 897,
    tags: ["React", "Flask", "MySQL", "AWS", "REST API", "AWS RDS"],
    liveUrl: "#",
    githubUrl: "https://github.com/cloud-dev004/Stocksense",
  },
  {
    id: 3,
    title: "Uyir",
    description:
      "Connecting communities to rescue, track, and care for animals through one digital platform.",
    image: Uyir,
    imgWidth: 1897,
    imgHeight: 900,
    tags: ["React.js", "MongoDB", "Express.js", "Node.js"],
    liveUrl: "https://uyir-animal-rescue-platform.netlify.app/",
    githubUrl: "https://github.com/cloud-dev004/uyir-animal-rescue-system",
  },
  {
    id: 4,
    title: "LocalLens",
    description:
      "Helping users discover nearby businesses and essential services through a location-aware digital platform.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
    imgWidth: 1400,
    imgHeight: 933,
    tags: ["JS", "HTML", "CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/cloud-dev004/locallens",
  },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */
const ProjectShowcase = () => {
  const [active, setActive] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigating = useRef(false);
  const cardAreaRef = useRef(null);
  const wheelAcc = useRef(0);
  const dragX = useRef(null);
  const total = PROJECTS.length;

  /* Detect mobile */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* Throttled navigate */
  const go = useCallback(
    (dir) => {
      if (navigating.current) return;
      const next = active + dir;
      if (next < 0 || next >= total) return;
      navigating.current = true;
      setActive(next);
      setTimeout(() => {
        navigating.current = false;
      }, 600);
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
      }, 600);
    },
    [active],
  );

  /* ── Wheel / Mouse Scroll on Cards Area ── */
  useEffect(() => {
    const el = cardAreaRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const goingRight = delta > 0;
      const goingLeft = delta < 0;

      const atStart = active === 0 && goingLeft;
      const atEnd = active === total - 1 && goingRight;

      if (!atStart && !atEnd) {
        // Strictly prevent default to avoid vertical scroll jumping
        e.preventDefault();
        e.stopPropagation();
      } else {
        wheelAcc.current = 0;
        return;
      }

      wheelAcc.current += delta;
      if (Math.abs(wheelAcc.current) >= 60) {
        go(wheelAcc.current > 0 ? 1 : -1);
        wheelAcc.current = 0;
      }
    };

    const onTouchMove = (e) => {
      // Prevent vertical scrolling while interacting with the cards area
      e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [go, active, total]);

  /* Keyboard navigation — scoped to section focus */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); go(-1); }
    },
    [go],
  );

  const openModal = useCallback((project) => setModalProject(project), []);
  const closeModal = useCallback(() => setModalProject(null), []);

  return (
    <>
      <section
        className="ps-section py-12"
        tabIndex={0}
        role="region"
        aria-label="Project showcase"
        onKeyDown={handleKeyDown}
      >
        {/* Ambient glow */}
        <div className="ps-ambient" aria-hidden="true" />

        {/* ── Top Header & Carousel Container ── */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          {/* ── Header ── */}
          <div className="w-full flex flex-col items-center text-center gap-3 mb-12">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  height: 1,
                  width: 32,
                  background: "rgba(197, 163, 255,0.5)",
                }}
              />
              <span
                style={{
                  color: "var(--color-primary)",
                  fontWeight: 300,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                }}
              >
                Featured Projects
              </span>
              <div
                style={{
                  height: 1,
                  width: 32,
                  background: "rgba(197, 163, 255,0.5)",
                }}
              />
            </div>

            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              MY RECENT WORK
            </h2>

            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontWeight: 300,
                fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                lineHeight: 1.6,
                maxWidth: "600px",
              }}
            >
              A selection of projects I've built using modern technologies.
            </p>
          </div>

          {/* ── Project Carousel ── */}
          <div className="w-full flex flex-col items-center min-w-0">
            {/* ── Cards Stage ── */}
            <div
              className="ps-stage"
              style={{ minHeight: "480px", width: "100%" }}
            >
              {/* Left nav arrow */}
              <button
                className="ps-nav-btn ps-nav-btn--prev"
                onClick={() => go(-1)}
                disabled={active === 0}
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Perspective & Card Container with Drag & Wheel handlers */}
              <div
                ref={cardAreaRef}
                className="ps-perspective"
                style={{ cursor: "grab" }}
                onMouseDown={(e) => {
                  dragX.current = e.clientX;
                }}
                onMouseUp={(e) => {
                  if (dragX.current === null) return;
                  const delta = dragX.current - e.clientX;
                  if (Math.abs(delta) > 40) go(delta > 0 ? 1 : -1);
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
                  const delta = dragX.current - e.changedTouches[0].clientX;
                  if (Math.abs(delta) > 40) go(delta > 0 ? 1 : -1);
                  dragX.current = null;
                }}
              >
                {PROJECTS.map((project, i) => {
                  const offset = i - active;
                  if (Math.abs(offset) > 2) return null;
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      offset={offset}
                      isMobile={isMobile}
                      onOpenModal={openModal}
                    />
                  );
                })}
              </div>

              {/* Right nav arrow */}
              <button
                className="ps-nav-btn ps-nav-btn--next"
                onClick={() => go(1)}
                disabled={active === total - 1}
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* ── Bottom dots ── */}
            <div className="ps-controls mt-2">
              <div
                className="ps-dots"
                role="tablist"
                aria-label="Project navigation"
              >
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    className={`ps-dot${i === active ? " ps-dot--active" : " ps-dot--inactive"}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    aria-selected={i === active}
                    role="tab"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {modalProject && (
        <ProjectModal project={modalProject} onClose={closeModal} />
      )}
    </>
  );
};

export default ProjectShowcase;
