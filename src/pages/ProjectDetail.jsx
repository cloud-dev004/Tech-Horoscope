import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";

import { projectMap, projects } from "../data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectMap[slug] || projects[0];

  return (
    <div className="py-8">
      {/* Back button */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        Back to all projects
      </Link>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full aspect-[21/9] md:aspect-[24/9] rounded-3xl overflow-hidden mb-12 bg-[var(--surface)] border border-white/5"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Header Info */}
      <div className="grid md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-[var(--surface)]">
        <div className="md:col-span-2 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-heading"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--text-secondary)]"
          >
            {project.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 bg-[var(--surface)] p-6 rounded-2xl border border-white/5"
        >
          <div>
            <h4 className="text-sm text-[var(--text-label)] mb-1">Role</h4>
            <p className="font-medium">{project.role}</p>
          </div>
          <div>
            <h4 className="text-sm text-[var(--text-label)] mb-1">Year</h4>
            <p className="font-medium">{project.year}</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {project.demoUrl && project.demoUrl !== "#" ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[#FFF9FA] rounded-full text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] text-[var(--text-secondary)] border border-white/5 rounded-full text-sm cursor-not-allowed opacity-75">
                <ExternalLink size={16} /> In Development
              </span>
            )}
            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-white/10 rounded-full text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <Code size={16} /> Source Code
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Case Study Content */}
      <div className="max-w-3xl mx-auto space-y-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold font-heading">The Challenge</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
            {project.challenge}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold font-heading">The Solution</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
            {project.solution}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold font-heading">Outcome</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
            {project.outcome}
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 pt-8 border-t border-[var(--surface)]"
        >
          <h2 className="text-2xl font-bold font-heading">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-[var(--surface)] border border-white/5 text-[var(--text-tech)] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProjectDetail;
