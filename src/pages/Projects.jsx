import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";

import { projects as allProjects } from "../data/projects";

const categories = ["All", "Full-stack", "Cloud", "Frontend"];

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
                  ? "bg-[var(--color-primary)] text-[#FFF9FA]"
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
