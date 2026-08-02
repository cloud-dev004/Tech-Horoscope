import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";

const projectData = {
  "ecommerce-platform": {
    title: "E-Commerce Platform",
    category: "Full-stack",
    year: "2025",
    role: "Lead Developer",
    description:
      "A comprehensive full-stack e-commerce solution built to handle high volume traffic with seamless checkout flows.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "The client needed a scalable architecture that could handle flash sales without downtime while maintaining a sub-second initial load time.",
    solution:
      "Implemented a headless architecture using Next.js with ISR (Incremental Static Regeneration). Integrated Stripe for payment processing and a custom Node.js microservice for inventory management during high-demand periods.",
    outcome:
      "Achieved a 99 Lighthouse performance score. Conversion rates increased by 40% in the first quarter post-launch.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "Node.js",
      "Redis",
    ],
    demoUrl: "#",
    githubUrl: "#",
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();

  // In a real app, you would fetch data from backend based on slug
  // Using dummy data for the first project as an example
  const project = projectData[slug] || projectData["ecommerce-platform"];

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
          <div className="flex gap-4 pt-2">
            <a
              href={project.demoUrl}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
            <a
              href={project.githubUrl}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-white/10 rounded-full text-sm hover:border-[var(--text-secondary)] transition-colors"
            >
              <Code size={16} /> Code
            </a>
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
