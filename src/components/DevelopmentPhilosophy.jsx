import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Zap,
  Hexagon,
  UserCircle,
  Accessibility,
  TrendingUp,
} from "lucide-react";

const philosophies = [
  {
    id: "01",
    title: "Performance First",
    desc: "Build for speed before features.",
    icon: Zap,
  },
  {
    id: "02",
    title: "Clean Architecture",
    desc: "Create maintainable and scalable systems.",
    icon: Hexagon,
  },
  {
    id: "03",
    title: "User-Centered Thinking",
    desc: "Every interaction should solve a real problem.",
    icon: UserCircle,
  },
  {
    id: "04",
    title: "Accessibility Matters",
    desc: "Products should work for everyone.",
    icon: Accessibility,
  },
  {
    id: "05",
    title: "Continuous Growth",
    desc: "Always learning.\nAlways improving.",
    icon: TrendingUp,
  },
];

const PhilosophyCard = ({ item }) => {
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReducedMotion ? [0, 0] : [40, 0],
  );

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y }}
      className="relative group rounded-2xl p-[1px] overflow-hidden transition-transform duration-300 ease-out hover:scale-[1.02] h-full"
    >
      {/* Background and Border Illumination */}
      <div
        className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.4) 0%, rgba(6,182,212,0.2) 50%, transparent 100%)",
        }}
      />

      <div
        className="relative rounded-2xl h-full flex flex-col p-5 sm:p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(6,182,212,0.04) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex justify-between items-start mb-6">
          <motion.div
            animate={prefersReducedMotion ? { y: 0 } : { y: [-3, 3, -3] }}
            transition={
              prefersReducedMotion
                ? {}
                : { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }
            className="w-12 h-12 rounded-xl flex items-center justify-center relative z-10"
            style={{
              background: "rgba(249,115,22,0.15)",
              boxShadow: "0 0 15px rgba(249,115,22,0.2)",
            }}
          >
            <Icon size={24} style={{ color: "#f97316" }} />
          </motion.div>
          <span className="font-mono text-sm tracking-widest text-[var(--text-secondary)] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
            {item.id}
          </span>
        </div>

        <h3
          className="text-xl font-bold text-[var(--text-primary)] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {item.title}
        </h3>

        <p className="text-sm md:text-base leading-relaxed text-[var(--text-secondary)] whitespace-pre-line">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
};

const DevelopmentPhilosophy = () => {
  return (
    <section className="relative w-full py-[clamp(4rem,10vw,8rem)] overflow-hidden">
      {/* Background glows */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-[clamp(3rem,8vw,5rem)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-[0.4rem]">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-[clamp(18px,3vw,48px)] bg-[rgba(249,115,22,0.5)]" />
            <span className="text-[var(--text-label)] font-light tracking-[0.3em] uppercase text-[0.68rem]">
              Development Philosophy
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
            HOW I BUILD
          </h2>

          <p className="text-[var(--text-secondary)] font-light text-[clamp(0.85rem,1.5vw,1.05rem)] max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            Great software is more than code.{"\n"}
            It is thoughtful engineering, beautiful design,{"\n"}
            and meaningful user experiences.
          </p>
        </div>

        {/* Grid: 5 items. Let's do 3 columns on lg, 2 on sm. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 justify-center max-w-5xl mx-auto">
          {philosophies.map((item, idx) => (
            <div
              key={item.id}
              className={`h-full ${idx === 3 ? "lg:col-start-1" : ""}`}
            >
              <PhilosophyCard item={item} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentPhilosophy;
