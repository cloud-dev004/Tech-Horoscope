import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  const experience = [
    {
      role: "Master of Computer Applications (MCA)",
      company: "Postgraduate Studies",
      period: "Present",
      description:
        "Strengthening theoretical foundations while applying them to real-world full-stack software development and scalable architectures.",
    },
    {
      role: "Full Stack & Cloud Intern",
      company: "MIST Solutions",
      period: "Recent",
      description:
        "Gained hands-on experience building full-stack applications while working with modern cloud technologies in a professional environment.",
    },
    {
      role: "Self-Taught Developer",
      company: "Personal Projects",
      period: "Earlier",
      description:
        "Wrote my first lines of code, discovered a passion for building, and launched my first full applications.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-24">
      {/* Experience Timeline */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          Professional{" "}
          <span className="text-[var(--color-orange)]">Journey</span>
        </motion.h2>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--surface)] before:to-transparent">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--bg)] bg-[var(--color-primary)] text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[var(--surface)] p-6 rounded-2xl border border-white/5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="font-bold text-xl">{exp.role}</h3>
                  <span className="text-sm font-medium text-[var(--color-primary)]">
                    {exp.period}
                  </span>
                </div>
                <h4 className="font-medium text-[var(--text-secondary)] mb-4">
                  {exp.company}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Redirect button to Home page's about section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <Link
            to="/"
            state={{ scrollToAbout: true }}
            className="group inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_30px_rgba(249,115,22,0.55)]"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
