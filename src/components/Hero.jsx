import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import profileScrolledImg from "../assets/profile7.webp";

const Hero = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll Transforms
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textBlur = useTransform(
    scrollYProgress,
    [0, 0.85],
    ["blur(0px)", "blur(12px)"],
  );

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-start"
    >
      <div className="relative w-full flex items-start bg-transparent pt-1 sm:pt-2 lg:pt-3 pb-2 sm:pb-4 lg:pb-6">
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6 lg:gap-10 items-center py-1 lg:py-2">
          {/* Left Text */}
          <motion.div
            className="space-y-4 sm:space-y-6 origin-left"
            style={{
              scale: textScale,
              y: textY,
              opacity: textOpacity,
              filter: textBlur,
            }}
          >
            <div className="space-y-2 sm:space-y-4">
              <motion.p
                className="text-[var(--color-primary)] font-semibold tracking-widest uppercase text-xs sm:text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                Full-Stack Developer &amp; Cloud Enthusiast
              </motion.p>
              <motion.h1
                className="font-bold leading-[1.08] text-3xl sm:text-5xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
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
                className="text-[var(--text-secondary)] max-w-lg leading-relaxed text-sm sm:text-base lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.76, ease: "easeOut" }}
              >
                Curious enough to keep learning. Crazy enough to keep building
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 pt-1 sm:pt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[#FFF9FA] px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(197,163,255,0.35)] hover:shadow-[0_0_30px_rgba(197,163,255,0.55)] active:scale-95 text-sm sm:text-base min-h-[44px] min-w-[140px]"
              >
                View Projects
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-[var(--surface)] hover:border-[var(--color-primary)] text-[var(--text-primary)] hover:text-[var(--color-primary)] px-6 py-3 sm:px-7 sm:py-3.5 rounded-full font-medium transition-all active:scale-95 text-sm sm:text-base min-h-[44px] min-w-[140px]"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Portrait */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
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
                className="relative w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] aspect-[3/4] sm:aspect-[9/16] shrink-0 group mx-auto"
                style={{ y: portraitY }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Ambient Glowing Aura — Smooth Radial Fade to prevent hard edge clipping */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(197,163,255,0.25) 0%, rgba(6,182,212,0.18) 45%, transparent 70%)"
                  }}
                  aria-hidden="true"
                />

                <img
                  src={profileScrolledImg}
                  alt="Profile with developer stats"
                  width={945}
                  height={1260}
                  className="relative w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(197,163,255,0.4)] drop-shadow-[0_0_40px_rgba(6,182,212,0.25)] transition-all duration-300"
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
