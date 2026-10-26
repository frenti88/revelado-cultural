import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Film,
  Headphones,
  Image as ImageIcon,
  User,
} from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import {
  getDisciplineColor,
  getProjectReadyAudios,
  getProjectReadyImages,
  getProjectReadyVideos,
  getResponsiveImageSet,
} from "../data/catalog";

interface ProjectCardProps {
  project: CulturalProject;
  index?: number;
  aspect?: "square" | "editorial";
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({
  project,
  index = 0,
  aspect = "square",
}) => {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const fromCatalog = location.pathname.startsWith("/explorar")
    ? `${location.pathname}${location.search}`
    : "/explorar";

  const readyImages = getProjectReadyImages(project);
  const readyVideos = getProjectReadyVideos(project);
  const readyAudios = getProjectReadyAudios(project);
  const { accentColor, posterGradient } = getDisciplineColor(project.category);

  const aspectClass =
    aspect === "square" ? "aspect-square" : "aspect-[4/3]";

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col justify-between rounded-[12px] bg-[#211820] hover:bg-[#281d27] hover:-translate-y-0.5 transition-[background-color,transform] duration-200 overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
    >
      <Link
        to={`/proyectos/${project.slug}`}
        state={{ fromCatalog }}
        className="flex flex-col justify-between h-full p-6 focus:outline-none"
        aria-label={`${project.id} de 08: ${project.name}${
          project.category ? `, disciplina ${project.category}` : ""
        }${project.leader ? `, responsable ${project.leader}` : ""}${
          project.shortDescription ? `. ${project.shortDescription}` : ""
        }. Conoce esta historia.`}
      >
        <div>
          {/* Top Metadata Header with Strategic Discipline Chromatic Dot (/colorize) */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 font-mono-meta text-xs min-w-0">
              <span className="text-[#A8B69C] font-semibold shrink-0 whitespace-nowrap">
                {project.id} / 08
              </span>
              {project.category && (
                <>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-medium truncate"
                    style={{ color: accentColor }}
                  >
                    {project.category}
                  </span>
                </>
              )}
            </div>

            <span
              className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#161317] text-[#D8CDC8] group-hover:bg-[#742940] group-hover:text-[#F5F0E7] transition-all"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          {/* Visual Cover (Square for Catalog as requested in Section 05) */}
          <div
            className={`relative w-full ${aspectClass} rounded-lg overflow-hidden bg-[#161317] mb-4`}
          >
            {project.coverImage ? (
              <>
                <img
                  src={project.coverImage}
                  srcSet={getResponsiveImageSet(project.coverImage)}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  alt={
                    readyImages[0]?.alt ??
                    `Fotografía documental de ${project.name}`
                  }
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover photo-reveal transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161317]/80 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              /* Editorial Darkroom Typographic Poster tinted by discipline (/colorize) */
              <div
                className={`w-full h-full flex flex-col justify-between p-4 sm:p-5 pb-14 bg-gradient-to-br ${posterGradient} relative overflow-hidden`}
              >
                <div
                  className="flex items-center justify-between font-mono-meta text-xs"
                  style={{ color: accentColor }}
                >
                  <span>Comuna 11</span>
                  <span>Proyecto {project.id}</span>
                </div>

                <div className="my-auto">
                  <span
                    className="font-display font-extrabold text-5xl sm:text-6xl block leading-none select-none opacity-25"
                    style={{ color: accentColor }}
                    aria-hidden="true"
                  >
                    {project.id}
                  </span>
                </div>
              </div>
            )}

            {/* Format Badges inside Cover Bottom-Left */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
              {readyImages.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#161317]/90 font-mono-meta text-xs text-[#F5F0E7]">
                  <ImageIcon className="w-3 h-3 text-[#A8B69C]" aria-hidden="true" />
                  <span>Fotos ({readyImages.length})</span>
                </span>
              )}
              {readyVideos.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#742940]/95 font-mono-meta text-xs text-[#F5F0E7]">
                  <Film className="w-3 h-3 text-[#A8B69C]" aria-hidden="true" />
                  <span>Reel</span>
                </span>
              )}
              {readyAudios.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#161317]/90 font-mono-meta text-xs text-[#A8B69C]">
                  <Headphones className="w-3 h-3" aria-hidden="true" />
                  <span>Audio</span>
                </span>
              )}
            </div>
          </div>

          {/* Project Title & Editorial Content */}
          <div>
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#F5F0E7] leading-snug group-hover:text-[#A8B69C] transition-colors">
              {project.name}
            </h3>

            {project.leader && (
              <p className="mt-2 flex items-center gap-2 text-base font-medium text-[#A8B69C]">
                <User className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Lidera: {project.leader}</span>
              </p>
            )}

            {project.shortDescription && (
              <p className="mt-4 text-base font-normal text-[#D8CDC8] line-clamp-3 leading-relaxed">
                {project.shortDescription}
              </p>
            )}
          </div>
        </div>

        {/* Card Footer Action: Una sola llamada clara a la acción */}
        <div className="mt-6 pt-4 border-t border-[#433840]/60 flex items-center justify-between gap-2 text-sm font-medium text-[#F5F0E7] group-hover:text-[#A8B69C] transition-colors">
          <span>Conoce esta historia</span>
          <ArrowUpRight className="w-4 h-4 text-[#A8B69C] shrink-0" aria-hidden="true" />
        </div>
      </Link>
    </motion.article>
  );
});

export default ProjectCard;
