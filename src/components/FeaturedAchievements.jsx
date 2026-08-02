import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Briefcase, Cpu, GitCommit, Heart } from "lucide-react";

const achievements = [
  {
    id: 1,
    label: "Projects Completed",
    value: 5,
    suffix: "+",
    icon: Briefcase,
  },
  { id: 2, label: "Technologies", value: 6, suffix: "+", icon: Cpu },

  { id: 4, label: "Repositories", value: 10, suffix: "+", icon: GitCommit },
  { id: 5, label: "Dedication", value: 100, suffix: "%", icon: Heart },
];

const Counter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, to, from, duration]);

  return (
    <span ref={nodeRef}>
      {count}
      {suffix}
    </span>
  );
};

const AchievementCard = ({ item, index }) => {
  const Icon = item.icon;
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-10%" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.08, ease: "easeOut" },
        },
      }}
      className="relative group rounded-2xl p-[1px] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 h-full w-full"
    >
      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.5) 0%, transparent 100%)",
        }}
      />

      <div
        className="relative h-full flex flex-col items-center text-center p-8 rounded-2xl bg-[var(--surface)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[rgba(249,115,22,0.1)] mb-4 text-[var(--color-primary)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
          <Icon size={24} />
        </div>

        <h3
          className="text-4xl sm:text-5xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <Counter to={item.value} suffix={item.suffix} />
        </h3>

        <p className="text-[var(--text-label)] text-sm tracking-widest uppercase mt-2 font-mono">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
};

const FeaturedAchievements = () => {
  return (
    <section className="relative w-full py-[clamp(4rem,10vw,8rem)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-[clamp(3rem,8vw,5rem)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-[0.4rem]">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-[clamp(18px,3vw,48px)] bg-[rgba(249,115,22,0.5)]" />
            <span className="text-[var(--text-label)] font-light tracking-[0.3em] uppercase text-[0.68rem]">
              Featured Achievements
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
            BY THE NUMBERS
          </h2>

          <p className="text-[var(--text-secondary)] font-light text-[clamp(0.85rem,1.5vw,1.05rem)] max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
            A few numbers that reflect my passion{"\n"}
            for building modern digital experiences.
          </p>
        </div>

        {/* Flex container to ensure any number of cards center perfectly */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {achievements.map((item, idx) => (
            <div
              key={item.id}
              className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)] min-w-[140px] max-w-[280px]"
            >
              <AchievementCard item={item} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAchievements;
