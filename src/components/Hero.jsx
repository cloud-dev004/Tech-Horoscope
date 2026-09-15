import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import profileScrolledImg from "../assets/profile7.webp";

const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // 0 when container top hits viewport top, 1 when container bottom hits viewport top
  });

  // Scroll Transforms
  // Background
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  // Darken background gradient by reducing the opacity of the glow layers
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Portrait (Right) — only vertical translate on scroll, no zoom/fade/blur
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Text (Left)
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textBlur = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["blur(0px)", "blur(12px)"],
  );

  // Scroll Indicator


  return (
    <section
      ref={containerRef}
      className="relative h-[clamp(120vh,150vh,180vh)]"
    >
      {/* Sticky Inner Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[var(--bg)]">
        {/* Background glow (animated) */}
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div style={{ scale: bgScale, width: "100%", height: "100%" }}>
            <motion.div
              className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(197, 163, 255,0.12) 0%, transparent 65%)",
                opacity: glowOpacity,
              }}
            />
            <motion.div
              className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)",
                opacity: glowOpacity,
              }}
            />
            {/* subtle noise overlay */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
              }}
            ></div>
          </motion.div>
        </motion.div>

        {/* Hero layout */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center py-16">
          {/* Left Text */}
          <motion.div
            className="space-y-6 origin-left"
            style={{
              scale: textScale,
              y: textY,
              opacity: textOpacity,
              filter: textBlur,
            }}
          >
            <div className="space-y-4">
              <motion.p
                className="text-[var(--color-primary)] font-semibold tracking-widest uppercase"
                style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                Full-Stack Developer &amp; Cloud Enthusiast
              </motion.p>
              <motion.h1
                className="font-bold leading-[1.08]"
                style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.68, ease: "easeOut" }}
              >
                Learning{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                  Building
                </span>{" "}
                Shipping
              </motion.h1>
              <motion.p
                className="text-[var(--text-secondary)] max-w-lg leading-relaxed"
                style={{ fontSize: "clamp(0.95rem, 2vw, 1.125rem)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.76, ease: "easeOut" }}
              >
                Curious enough to keep learning. Crazy enough to keep building
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[#FFF9FA] px-7 py-3.5 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(197, 163, 255,0.35)] hover:shadow-[0_0_30px_rgba(197, 163, 255,0.55)] active:scale-95 min-h-[44px] min-w-[140px]"
              >
                View Projects
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[var(--surface)] hover:border-[var(--color-primary)] text-[var(--text-primary)] hover:text-[var(--color-primary)] px-7 py-3.5 rounded-full font-medium transition-all active:scale-95 min-h-[44px] min-w-[140px]"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Portrait */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring",
                stiffness: 60,
                damping: 15,
              }}
            >
              <motion.div
                className="relative w-[240px] aspect-[9/16] sm:w-[320px] lg:w-[400px] shrink-0 group"
                style={{ y: portraitY }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={profileScrolledImg}
                  alt="Profile with developer stats"
                  width={945}
                  height={1260}
                  className="relative w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
