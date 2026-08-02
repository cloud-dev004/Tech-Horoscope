import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Code, Rocket, Server, Star, Map } from "lucide-react";

const timelineEvents = [
  {
    id: 0,
    title: "Started Learning",
    desc: "Wrote my first lines of code and discovered a passion for building.",
    icon: Code,
  },
  {
    id: 1,
    title: "MCA",
    desc: "Strengthening theoretical foundations while applying them to real-world full-stack software development.",
    icon: Map,
  },
  {
    id: 2,
    title: "Built First Project",
    desc: "Launched a full application.",
    icon: Rocket,
  },
  {
    id: 3,
    title: "Focused on Scalable Systems & Cloud",
    desc: "Designing scalable architectures that deliver reliable, high-performance applications.",
    icon: Server,
  },
  {
    id: 4,
    title: "Full Stack & Cloud Intern MIST Solutions",
    desc: "Gained hands-on experience building full-stack applications while working with modern cloud technologies in a professional environment.",
    icon: Star,
  },
  {
    id: 5,
    title: "Today",
    desc: "Building Better Experiences for real users.",
    icon: Star,
  },
  {
    id: 6,
    title: "Future",
    desc: "Always Learning. The journey never stops.",
    icon: Map,
  },
];

const TimelineNode = ({ event, index }) => {
  const nodeRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start end", "center center"],
  });

  const isEven = index % 2 === 0; // Even = Left, Odd = Right

  // Animations
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  // Slide from left for even, right for odd
  const x = useTransform(
    scrollYProgress,
    [0.2, 0.7],
    prefersReducedMotion ? [0, 0] : [isEven ? -40 : 40, 0],
  );

  const Icon = event.icon;

  return (
    <div
      ref={nodeRef}
      className={`relative flex items-center justify-center w-full mb-16 last:mb-0 ${isEven ? "md:flex-row-reverse" : "md:flex-row"} flex-col`}
    >
      {/* Center Node (Icon) */}
      <motion.div
        style={{ opacity }}
        className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[var(--bg)] flex items-center justify-center z-20 shadow-[0_0_20px_rgba(249,115,22,0.4)]"
        // Ensure the node sits perfectly on top of the line
        initial={{ background: "var(--surface)" }}
        whileInView={{ background: "var(--color-primary)" }}
        viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={18} className="text-white" />
      </motion.div>

      {/* Spacer for symmetry on Desktop */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card Content */}
      <motion.div
        style={{ opacity, x }}
        className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end md:pr-16" : "md:justify-start md:pl-16"} justify-center mt-12 md:mt-0`}
      >
        <div
          className="relative group rounded-2xl p-6 sm:p-8 w-full max-w-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Subtle Hover Glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: "inset 0 0 20px rgba(249,115,22,0.1)",
            }}
          />
          <h3
            className="text-xl font-bold text-[var(--text-primary)] mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {event.title}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            {event.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-[clamp(4rem,10vw,8rem)] overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex flex-col items-center text-center gap-[0.4rem]">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-[clamp(18px,3vw,48px)] bg-[rgba(249,115,22,0.5)]" />
            <span className="text-[var(--text-label)] font-light tracking-[0.3em] uppercase text-[0.68rem]">
              Experience Timeline
            </span>
            <div className="h-[1px] w-[clamp(18px,3vw,48px)] bg-[rgba(249,115,22,0.5)]" />
          </div>

          <h2
            className="font-black leading-[1.08] text-[var(--text-primary)] mb-4"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontFamily: "var(--font-heading)",
            }}
          >
            MY JOURNEY
          </h2>

          <p className="text-[var(--text-secondary)] font-light text-[clamp(0.85rem,1.5vw,1.05rem)] max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            Every project taught something.{"\n"}
            Every milestone shaped the developer I am today.
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Center Line Background (Dim) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.05)] z-0 hidden md:block" />

        {/* Animated Glow Line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-[var(--color-primary)] z-10 hidden md:block shadow-[0_0_15px_rgba(249,115,22,0.8)]"
          style={{ height: lineHeight, originY: 0 }}
        />

        {/* Mobile Line Background */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.05)] z-0 md:hidden" />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-[var(--color-primary)] z-10 md:hidden shadow-[0_0_15px_rgba(249,115,22,0.8)]"
          style={{ height: lineHeight, originY: 0 }}
        />

        <div className="relative z-20">
          {timelineEvents.map((ev, i) => (
            <TimelineNode key={ev.id} event={ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
