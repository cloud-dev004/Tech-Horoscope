import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[var(--surface)] rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--color-primary)]/30 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(139,92,246,0.1)]"
    >
      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden bg-[var(--bg)]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-heading group-hover:text-[var(--color-primary)] transition-colors">
              {project.title}
            </h3>
            <p className="text-[var(--text-secondary)] line-clamp-2">
              {project.description}
            </p>
          </div>
          <Link
            to={`/projects/${project.slug}`}
            className="p-3 bg-[var(--bg)] rounded-full text-[var(--text-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-[var(--bg)] text-[var(--text-tech)] border border-[var(--text-tech)]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
