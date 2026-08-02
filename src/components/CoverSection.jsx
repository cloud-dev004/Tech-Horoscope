import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import profileEntryImg from "../assets/profile3.png";

const TypewriterHeading = ({ text, startDelay }) => {
  let charIndex = 0;
  return (
    <>
      {text.split("\n").map((line, lineIdx, arr) => (
        <span key={lineIdx}>
          {line.split("").map((char, i) => {
            const delay = startDelay + charIndex * 0.08;
            charIndex++;
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0, delay }}
              >
                {char}
              </motion.span>
            );
          })}
          {lineIdx < arr.length - 1 && <br />}
        </span>
      ))}
    </>
  );
};

/**
 * CoverSection — Fullscreen cinematic splash that sits ABOVE the Hero.
 * On first scroll/touch/key-press it scrolls itself out of view,
 * revealing the navbar and hero below.
 * Only shown on the homepage (/) on first visit.
 */
const CoverSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // On any scroll/swipe/key — smoothly scroll section out
    const dismiss = () => {
      if (window.scrollY > 10) return; // already scrolled past it
      const heroStart = section.offsetHeight;
      window.scrollTo({ top: heroStart, behavior: "smooth" });
      cleanup();
    };

    const onKey = (e) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) dismiss();
    };

    const cleanup = () => {
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
      window.removeEventListener("keydown", onKey);
    };

    window.addEventListener("wheel", dismiss, { passive: true, once: true });
    window.addEventListener("touchmove", dismiss, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", onKey);

    return cleanup;
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[var(--bg)] flex items-center justify-center"
      style={{ minHeight: "100dvh" }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[clamp(350px,60vw,700px)] h-[clamp(350px,60vw,700px)]"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 62%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Cinematic thin lines */}
      <div className="absolute top-[12%] left-0 right-0 h-px bg-white/[0.04] pointer-events-none" />
      <div className="absolute bottom-[12%] left-0 right-0 h-px bg-white/[0.04] pointer-events-none" />

      {/* Layout Container */}
      <div className="relative h-full w-full flex flex-col xl:grid xl:grid-cols-3 items-center justify-center gap-8 xl:gap-6 max-w-7xl mx-auto px-[clamp(16px,5vw,80px)] py-[clamp(24px,5vh,80px)] z-10">
        {/* LEFT CONTAINER (WANT TO DISCOVER? & Explore text) */}
        <div className="max-[1279px]:contents xl:block xl:space-y-4 xl:text-right">
          {/* Left Heading */}
          <h2
            className="order-1 xl:order-none max-[1279px]:text-[clamp(2.4rem,8vw,6rem)] xl:text-5xl font-black uppercase leading-tight text-white text-center xl:text-right w-full"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.01em",
            }}
          >
            <TypewriterHeading text={"WANT TO\nDISCOVER?"} startDelay={0.8} />
          </h2>

          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="order-4 xl:order-none flex flex-col items-center xl:items-end w-full max-[1279px]:max-w-[320px] text-center xl:text-right"
          >
            <div className="w-10 h-px bg-[var(--color-primary)]/60 mb-4 xl:mb-4 max-[1279px]:mt-6" />
            <p className="text-[clamp(.9rem,2vw,1.1rem)] text-white/40 font-light leading-relaxed">
              Explore my works
              <br />
              and projects
            </p>
          </motion.div>
        </div>

        {/* CENTER — profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 xl:order-none flex items-center justify-center py-4 xl:py-10 w-full"
        >
          <img
            src={profileEntryImg}
            alt="Profile"
            className="w-[clamp(180px,35vw,420px)] xl:w-auto xl:max-h-[80vh] object-contain select-none pointer-events-none"
            style={{
              filter:
                "drop-shadow(0 0 40px rgba(249,115,22,0.55)) drop-shadow(0 0 80px rgba(249,115,22,0.18))",
            }}
          />
        </motion.div>

        {/* RIGHT CONTAINER (WHO AM I? & Scroll text) */}
        <div className="max-[1279px]:contents xl:block xl:space-y-4 xl:text-left">
          {/* Right Heading */}
          <h2
            className="order-3 xl:order-none max-[1279px]:text-[clamp(2.4rem,8vw,6rem)] xl:text-5xl font-black uppercase leading-tight text-white text-center xl:text-left w-full"
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.01em",
            }}
          >
            <TypewriterHeading text={"WHO\nAM I?"} startDelay={2.4} />
          </h2>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.4 }}
            className="order-5 xl:order-none flex flex-col items-center xl:items-start w-full max-[1279px]:max-w-[320px] text-center xl:text-left"
          >
            <div className="w-10 h-px bg-[var(--color-primary)]/60 mb-4 xl:mb-4" />
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-[clamp(0.6rem,1.5vw,0.75rem)] tracking-[0.3em] uppercase text-white/35"
            >
              Scroll to explore ↓
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoverSection;
