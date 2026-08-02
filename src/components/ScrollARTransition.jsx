import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollARTransition — Premium Parallax 3D Perspective Bridge
 * Creates a smooth, immersive scroll-triggered spatial transition between Hero and About.
 * Includes:
 * 1. 3D Grid floor tilting in perspective as scroll progress changes.
 * 2. Radial sonar coordinate rings that expand outwards.
 * 3. Parallax glowing holographic coordinate nodes.
 * 4. Parallax color orbs that move in opposite directions.
 */
const ScrollARTransition = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax glow orbs moving in opposite directions
  const orangeY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const cyanY = useTransform(scrollYProgress, [0, 1], ["-60px", "60px"]);
  const orangeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.2, 0.9],
  );
  const cyanScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.9, 1.15, 0.8],
  );

  // 3D Perspective Grid transforms
  const gridRotateX = useTransform(scrollYProgress, [0, 1], [70, 78]);
  const gridTranslateZ = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const gridOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.85],
    [0, 0.15, 0],
  );

  // Expandable sonar ripples (Scale expands as user scrolls through)
  const sonarScale1 = useTransform(scrollYProgress, [0.15, 0.85], [0.5, 2.3]);
  const sonarOpacity1 = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    [0, 0.28, 0],
  );

  const sonarScale2 = useTransform(scrollYProgress, [0.3, 0.9], [0.4, 1.9]);
  const sonarOpacity2 = useTransform(
    scrollYProgress,
    [0.3, 0.6, 0.9],
    [0, 0.22, 0],
  );

  // Parallax drifting coord nodes (plus signs)
  const node1Y = useTransform(scrollYProgress, [0, 1], ["40px", "-100px"]);
  const node2Y = useTransform(scrollYProgress, [0, 1], ["-80px", "60px"]);
  const node3Y = useTransform(scrollYProgress, [0, 1], ["100px", "-60px"]);
  const nodeOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    [0, 0.45, 0],
  );

  // Scanning laser beam line sweeping across the vertical height
  const beamY = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const beamOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.65, 0.8],
    [0, 0.6, 0.6, 0],
  );

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden pointer-events-none select-none flex items-center justify-center"
      style={{ height: "180px" }}
      aria-hidden="true"
    >
      {/* ── Parallax Glow Orb — Orange ── */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[15%] w-[400px] h-[400px] rounded-full"
        style={{
          y: orangeY,
          scale: orangeScale,
          background:
            "radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── Parallax Glow Orb — Cyan ── */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[12%] w-[350px] h-[350px] rounded-full"
        style={{
          y: cyanY,
          scale: cyanScale,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.11) 0%, transparent 70%)",
          filter: "blur(26px)",
        }}
      />

      {/* ── 3D Grid Perspective Projection ── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}
      >
        <motion.div
          style={{
            rotateX: gridRotateX,
            z: gridTranslateZ,
            opacity: gridOpacity,
          }}
          className="w-[200%] h-[200%] absolute"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="ar-grid-3d"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-white/10 dark:text-white/5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ar-grid-3d)" />
          </svg>
        </motion.div>
      </div>

      {/* ── Sonar Ripples (Expanding Circles) ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ scale: sonarScale1, opacity: sonarOpacity1 }}
          className="w-[240px] h-[240px] rounded-full border border-dashed border-[#f97316]/30 flex items-center justify-center"
        >
          <div className="w-[85%] h-[85%] rounded-full border border-dotted border-[#06b6d4]/20" />
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ scale: sonarScale2, opacity: sonarOpacity2 }}
          className="w-[200px] h-[200px] rounded-full border border-[#06b6d4]/25 flex items-center justify-center"
        >
          <div className="w-[80%] h-[80%] rounded-full border border-[#f97316]/15" />
        </motion.div>
      </div>

      {/* ── Parallax Floating Coordinate Nodes (+) ── */}
      <motion.div
        style={{ y: node1Y, opacity: nodeOpacity }}
        className="absolute left-[30%] text-[14px] text-[#f97316]/40 font-mono"
      >
        +
      </motion.div>
      <motion.div
        style={{ y: node2Y, opacity: nodeOpacity }}
        className="absolute right-[28%] text-[16px] text-[#06b6d4]/45 font-mono"
      >
        +
      </motion.div>
      <motion.div
        style={{ y: node3Y, opacity: nodeOpacity }}
        className="absolute left-[45%] text-[13px] text-white/20 font-mono"
      >
        +
      </motion.div>

      {/* ── Vertical Scanning Laser Beam ── */}
      <motion.div
        className="absolute left-0 right-0 h-[1.5px] pointer-events-none z-10"
        style={{
          top: beamY,
          opacity: beamOpacity,
          background:
            "linear-gradient(to right, transparent, rgba(6,182,212,0.4), rgba(249,115,22,0.4), transparent)",
          boxShadow: "0 0 10px rgba(6,182,212,0.3)",
        }}
      />

      {/* ── Top & Bottom Fade Gradients ── */}
      <div
        className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--bg), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </div>
  );
};

export default ScrollARTransition;
