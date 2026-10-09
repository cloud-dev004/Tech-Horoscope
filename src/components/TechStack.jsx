import React from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const TECHNOLOGIES = [
  {
    id: "html",
    name: "HTML",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    id: "css",
    name: "CSS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    id: "javascript",
    name: "JavaScript",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    id: "react",
    name: "React",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    id: "nodejs",
    name: "Node.js",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    id: "express",
    name: "Express",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    id: "aws",
    name: "AWS",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    id: "python",
    name: "Python",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    id: "c",
    name: "C",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  },
];

const TechStack = () => {
  return (
    <section
      aria-label="My Tech Stack"
      className="relative w-full pt-[clamp(4rem,10vw,8rem)] pb-[clamp(3rem,6vw,5rem)] bg-transparent flex flex-col overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
        
        {/* Left Side Wording */}
        <div className="w-full md:w-[30%] flex flex-col items-start text-left gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-6 bg-[rgba(197,163,255,0.5)]" />
            <span className="font-medium text-[var(--color-primary)] text-xs">
              Featured Tech
            </span>
          </div>

          <h2 className="m-0 font-heading font-bold text-[clamp(1.8rem,3.2vw,2.8rem)] text-[#FFF9FA] leading-[1.05]">
            My Tech Stack
          </h2>

          <p className="m-0 text-[var(--text-secondary)] font-light text-[clamp(0.75rem,1vw,0.88rem)] leading-[1.55]">
            The technologies I use to transform ideas into high-performance digital products.
          </p>
        </div>

        {/* Right Side Grid */}
        <div className="w-full md:w-[70%] flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 min-w-0">
          {TECHNOLOGIES.map((tech) => (
            <div
              key={tech.id}
              className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(197,163,255,0.4)] hover:bg-[rgba(197,163,255,0.05)] transition-all duration-300 group"
            >
              <img
                src={tech.url}
                alt={tech.name}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
