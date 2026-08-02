import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ResumeButton from "./ResumeButton";

const CTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative w-full py-[clamp(6rem,15vw,10rem)] overflow-hidden flex items-center justify-center">
      {/* Very subtle background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-8"
      >
        <h2
          className="font-black leading-[1.05] text-[var(--text-primary)]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontFamily: "var(--font-heading)",
          }}
        >
          LET'S BUILD SOMETHING
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #f97316, #fb923c)",
            }}
          >
            AMAZING
          </span>
        </h2>

        <p className="text-[var(--text-secondary)] font-light text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
          Whether it's a product, startup,{"\n"}
          or ambitious idea—{"\n"}
          I'd love to help bring it to life.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:shadow-[0_0_30px_rgba(249,115,22,0.45)] active:scale-95 min-h-[50px] min-w-[180px] tracking-wide text-sm"
          >
            START A PROJECT
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <ResumeButton />
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
