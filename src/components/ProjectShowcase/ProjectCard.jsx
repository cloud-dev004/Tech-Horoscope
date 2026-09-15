import { memo, useState } from "react";
import { ExternalLink, GitBranch, Play } from "lucide-react";

/**
 * 3D fan position lookup.
 * offset = cardIndex - activeIndex
 */
function getCardStyle(offset, isMobile) {
  const abs = Math.abs(offset);
  const sign = offset > 0 ? 1 : -1;

  if (abs === 0) {
    return {
      translateX: 0,
      translateZ: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      zIndex: 30,
      pointerEvents: "auto",
    };
  }
  if (abs === 1) {
    return {
      translateX: isMobile ? sign * 160 : sign * 220,
      translateZ: -80,
      rotateY: sign * -18,
      scale: isMobile ? 0.8 : 0.85,
      opacity: isMobile ? 0.4 : 0.65,
      zIndex: 20,
      pointerEvents: "none",
    };
  }
  if (abs === 2) {
    return {
      translateX: isMobile ? sign * 260 : sign * 380,
      translateZ: -160,
      rotateY: sign * -32,
      scale: 0.72,
      opacity: isMobile ? 0 : 0.38,
      zIndex: 10,
      pointerEvents: "none",
    };
  }
  // ±3 or beyond — invisible
  return {
    translateX: offset > 0 ? 500 : -500,
    translateZ: -220,
    rotateY: sign * -45,
    scale: 0.6,
    opacity: 0,
    zIndex: 0,
    pointerEvents: "none",
  };
}

const ProjectCard = memo(
  ({ project, offset, isMobile, onOpenModal }) => {
    const isActive = offset === 0;
    const {
      translateX,
      translateZ,
      rotateY,
      scale,
      opacity,
      zIndex,
      pointerEvents,
    } = getCardStyle(offset, isMobile);

    const transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

    return (
      <div
        className={`ps-card${isActive ? " ps-card--active" : ""}`}
        style={{
          transform,
          opacity,
          zIndex,
          pointerEvents,
        }}
        aria-label={`${project.title} — project card`}
        aria-current={isActive ? "true" : undefined}
      >
        {/* ── Image Area ── */}
        <div className="ps-card__image">
          <img
            src={project.image}
            alt={project.title}
            className="ps-card__img"
            loading="lazy"
            width={project.imgWidth}
            height={project.imgHeight}
          />
          <div className="ps-card__img-inset" />
          <div className="ps-card__image-overlay" />

          {/* Preview button — only visible on hover of active card */}
          {isActive && (
            <button
              className="ps-card__preview-btn"
              onClick={() => onOpenModal(project)}
              aria-label={`Open ${project.title} details`}
            >
              <Play size={20} fill="currentColor" />
            </button>
          )}
        </div>

        {/* ── Info Bar ── */}
        <div className="ps-card__info">
          <div className="ps-card__info-top">
            <div className="ps-card__info-left">
              <h3 className="ps-card__title">{project.title}</h3>
              <p className="ps-card__desc">{project.description}</p>
            </div>

            {isActive && (
              <div className="ps-card__actions">
                <a
                  href={project.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ps-card__btn ps-card__btn--primary"
                  aria-label={`View ${project.title} live`}
                >
                  <ExternalLink size={11} />
                  Live
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ps-card__btn ps-card__btn--ghost"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <GitBranch size={11} />
                    Code
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="ps-card__tags">
            {project.tags.slice(0, isActive ? 6 : 3).map((tag) => (
              <span key={tag} className="ps-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
export default ProjectCard;
