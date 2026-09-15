import { useEffect } from "react";
import { X, ExternalLink, GitBranch } from "lucide-react";

const ProjectModal = ({ project, onClose }) => {
  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Prevent body scroll while open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="ps-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — project details`}
    >
      <div className="ps-modal">
        {/* Close */}
        <button
          className="ps-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="ps-modal__image"
          loading="lazy"
        />

        {/* Body */}
        <div className="ps-modal__body">
          <h2 className="ps-modal__title">{project.title}</h2>
          <p className="ps-modal__desc">{project.description}</p>

          {/* Tags */}
          <div className="ps-modal__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="ps-modal__tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="ps-modal__actions">
            <a
              href={project.liveUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="ps-card__btn ps-card__btn--primary"
            >
              <ExternalLink size={13} />
              View Project
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ps-card__btn ps-card__btn--ghost"
              >
                <GitBranch size={13} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
