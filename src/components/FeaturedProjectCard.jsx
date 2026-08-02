import { ExternalLink } from "lucide-react";
import { Github } from "./icons/SocialIcons";
import { memo } from "react";

const FeaturedProjectCard = memo(
  ({ project, index, total, isActive, offset }) => {
    const formattedIndex = String(index + 1).padStart(2, "0");

    // Compute styles based on position offset from center
    const absOffset = Math.abs(offset);
    const scale = isActive ? 1 : absOffset === 1 ? 0.8 : 0.65;
    const opacity = isActive ? 1 : absOffset === 1 ? 0.4 : 0.15;
    const blur = isActive ? 0 : absOffset === 1 ? 6 : 12;
    const zIndex = isActive ? 30 : absOffset === 1 ? 20 : 10;
    const translateX = offset * 105; // percent shift

    return (
      <div
        className="absolute top-1/2 left-1/2 aspect-square w-[38vh] sm:w-[42vh] md:w-[46vh] pointer-events-auto"
        style={{
          transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale})`,
          opacity,
          filter: `blur(${blur}px)`,
          zIndex,
          transition:
            "transform 0.65s cubic-bezier(0.77,0,0.175,1), opacity 0.65s cubic-bezier(0.77,0,0.175,1), filter 0.65s cubic-bezier(0.77,0,0.175,1)",
          willChange: "transform, opacity, filter",
          pointerEvents: isActive ? "auto" : "none",
        }}
      >
        <div
          className="card-inner w-full h-full rounded-[2rem] overflow-hidden relative group border-2 shadow-2xl bg-black"
          style={{
            borderColor: isActive
              ? "rgba(249,115,22,0.7)"
              : "rgba(255,255,255,0.05)",
            boxShadow: isActive
              ? "0 0 60px rgba(249,115,22,0.25), 0 30px 80px rgba(0,0,0,0.8)"
              : "0 20px 50px rgba(0,0,0,0.6)",
            transition: "border-color 0.65s ease, box-shadow 0.65s ease",
          }}
        >
          {/* Active orange glow pulse border */}
          {isActive && (
            <div
              className="absolute inset-0 rounded-[2rem] pointer-events-none z-0"
              style={{
                boxShadow: "0 0 0 2px rgba(249,115,22,0.4)",
                animation: "pulse-glow 2.5s ease-in-out infinite",
              }}
            />
          )}

          {/* Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              style={{ opacity: isActive ? 0.75 : 0.5 }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            {/* Orange tint when active */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent" />
            )}
          </div>

          {/* Content */}
          <div className="relative z-20 w-full h-full p-5 md:p-7 flex flex-col">
            {/* Top bar */}
            <div className="flex justify-between items-center">
              <span
                className="font-bold tracking-widest text-xs px-3 py-1 rounded-full backdrop-blur-md border"
                style={{
                  color: isActive ? "var(--color-primary)" : "#999",
                  background: "rgba(0,0,0,0.5)",
                  borderColor: isActive
                    ? "rgba(249,115,22,0.4)"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                {formattedIndex} / {String(total).padStart(2, "0")}
              </span>

              {isActive && (
                <div className="flex gap-2">
                  <a
                    href={project.liveUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <ExternalLink size={15} />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-[#22C55E]/50 flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-black hover:scale-110 transition-all"
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1" />

            {/* Bottom info */}
            <div>
              <h3
                className="font-heading font-bold text-white mb-2 tracking-wide"
                style={{ fontSize: "clamp(1.1rem, 3vh, 1.8rem)" }}
              >
                {project.title}
              </h3>

              {isActive && (
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-3 line-clamp-2 transition-all duration-500">
                  {project.description}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, isActive ? 4 : 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full backdrop-blur-md border"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      color: isActive ? "white" : "#888",
                      borderColor: isActive
                        ? "rgba(249,115,22,0.3)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

FeaturedProjectCard.displayName = "FeaturedProjectCard";
export default FeaturedProjectCard;
