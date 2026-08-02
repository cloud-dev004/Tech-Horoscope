import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";

const allProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    category: "Full-stack",
    description:
      "A full-stack e-commerce solution with Next.js, Stripe, and a headless CMS. Achieved 99 Lighthouse score.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
  },
  {
    id: 2,
    title: "FinTech Dashboard",
    slug: "fintech-dashboard",
    category: "Frontend",
    description:
      "Real-time financial dashboard with complex data visualizations, websocket integrations, and secure auth.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "D3.js", "Node.js", "Socket.io"],
  },
  {
    id: 3,
    title: "AI Image Generator",
    slug: "ai-image-generator",
    category: "Full-stack",
    description:
      "An application leveraging OpenAI API to generate, modify, and store images in a user gallery.",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "Express", "MongoDB", "OpenAI API"],
  },
  {
    id: 4,
    title: "Interactive 3D Portfolio",
    slug: "3d-portfolio",
    category: "3D",
    description:
      "A stunning portfolio featuring interactive 3D elements and scroll-based animations.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    tags: ["React Three Fiber", "GSAP", "Tailwind"],
  },
];

const categories = ["All", "Frontend", "Full-stack", "3D"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = allProjects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter,
  );

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Selected <span className="text-[var(--color-primary)]">Works</span>
        </h1>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div layout className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--text-secondary)]">
            No projects found in this category.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;
