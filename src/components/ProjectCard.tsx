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
import PhotoFrame from "./PhotoFrame";

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

  const headline = project.editorialHeadline || project.name;
  const ctaText = project.contextualCta || `Descubre a ${project.name}`;

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
      className="group relative flex flex-col justify-between rounded-2xl bg-[#29143B] border border-[#3D2254] hover:border-[#F9C63C] hover:-translate-y-1 transition-[background-color,border-color,transform] duration-250 overflow-hidden shadow-[0_12px_32px_rgba(14,6,23,0.5)]"
    >
      <Link
        to={`/proyectos/${project.slug}`}
        state={{ fromCatalog }}
        className="flex flex-col justify-between h-full p-5 sm:p-6 focus:outline-none"
        aria-label={`${project.id} de 08: ${project.name}. ${headline}${
          project.category ? `, disciplina ${project.category}` : ""
        }${project.leader ? `, responsable ${project.leader}` : ""}${
          project.shortDescription ? `. ${project.shortDescription}` : ""
        }. ${ctaText}.`}
      >
        <div>
          {/* Top Metadata Header with Editorial Numbering & Category */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2 font-mono-meta text-xs min-w-0">
              <span className="text-[#F9C63C] font-black shrink-0 whitespace-nowrap">
                {project.id} / 08
              </span>
              {project.category && (
                <>
                  <span className="text-[#583178]" aria-hidden="true">·</span>
                  <span
                    className="font-semibold truncate text-[#B184D5] uppercase tracking-wider text-[11px]"
                  >
                    {project.category}
                  </span>
                </>
              )}
            </div>

            <span
              className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#170B25] border border-[#3D2254] text-[#FAF6FB] group-hover:bg-[#F9C63C] group-hover:text-[#170B25] group-hover:border-[#F9C63C] transition-all shadow-sm"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          {/* Visual Cover with Optical Framing Corners */}
          <div className="mb-4">
            <PhotoFrame
              aspectRatio={aspectClass}
              showCorners={true}
              cornerSize="sm"
              className="w-full bg-[#170B25]"
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
                    className="w-full h-full object-cover photo-reveal transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#170B25]/90 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                /* Poster for initiatives without image */
                <div
                  className={`w-full h-full flex flex-col justify-between p-4 sm:p-5 pb-14 bg-gradient-to-br ${posterGradient} relative overflow-hidden`}
                >
                  <div
                    className="flex items-center justify-between font-mono-meta text-xs"
                    style={{ color: accentColor }}
                  >
                    <span>Comuna 11</span>
                    <span>Rollo {project.id}</span>
                  </div>

                  <div className="my-auto text-center">
                    <span
                      className="font-display font-black text-5xl sm:text-6xl block leading-none select-none opacity-30 text-[#FAF6FB]"
                      aria-hidden="true"
                    >
                      {project.id}
                    </span>
                  </div>
                </div>
              )}

              {/* Format Badges inside Cover Bottom-Left */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap items-center gap-1.5 pointer-events-none">
                {readyImages.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#170B25]/90 border border-[#3D2254] font-mono-meta text-[11px] text-[#FAF6FB]">
                    <ImageIcon className="w-3 h-3 text-[#F9C63C]" aria-hidden="true" />
                    <span>Fotos ({readyImages.length})</span>
                  </span>
                )}
                {readyVideos.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#902B90] text-[#FAF6FB] font-semibold">
                    <Film className="w-3 h-3" aria-hidden="true" />
                    <span>Reel</span>
                  </span>
                )}
                {readyAudios.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#170B25]/90 border border-[#3D2254] font-mono-meta text-[11px] text-[#D1C6DA]">
                    <Headphones className="w-3 h-3 text-[#B184D5]" aria-hidden="true" />
                    <span>Audio</span>
                  </span>
                )}
              </div>
            </PhotoFrame>
          </div>

          {/* Project Title & Editorial Content */}
          <div>
            {project.editorialHeadline && (
              <span className="font-mono-meta text-xs text-[#F9C63C] font-bold block mb-1.5 tracking-wide">
                {project.editorialHeadline}
              </span>
            )}

            <h3 className="font-display font-black text-xl sm:text-2xl text-[#FAF6FB] leading-tight group-hover:text-[#F9C63C] transition-colors">
              {project.name}
            </h3>

            {project.leader && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-mono-meta text-[#D1C6DA]">
                <User className="w-3.5 h-3.5 text-[#B184D5] shrink-0" aria-hidden="true" />
                <span>{project.leader}</span>
              </p>
            )}

            {project.shortDescription && (
              <p className="mt-3 text-sm font-normal text-[#D1C6DA] line-clamp-3 leading-relaxed">
                {project.shortDescription}
              </p>
            )}
          </div>
        </div>

        {/* Card Footer Action: Contextual unique CTA */}
        <div className="mt-5 pt-3.5 border-t border-[#3D2254] flex items-center justify-between gap-2 text-sm font-semibold text-[#FAF6FB] group-hover:text-[#F9C63C] transition-colors">
          <span>{ctaText}</span>
          <ArrowUpRight className="w-4 h-4 text-[#F9C63C] shrink-0" aria-hidden="true" />
        </div>
      </Link>
    </motion.article>
  );
});

export default ProjectCard;
