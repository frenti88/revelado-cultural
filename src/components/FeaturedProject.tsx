import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Film, Image as ImageIcon, Sparkles } from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import {
  getDisciplineColor,
  getProjectReadyImages,
  getProjectReadyVideos,
  getResponsiveImageSet,
} from "../data/catalog";

interface FeaturedProjectProps {
  project: CulturalProject;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
}) => {
  const readyImages = getProjectReadyImages(project);
  const readyVideos = getProjectReadyVideos(project);
  const { accentColor } = getDisciplineColor(project.category);

  return (
    <div className="rounded-xl bg-[#211820] p-6 sm:p-8 shadow-[0_16px_44px_rgba(0,0,0,0.5)]">
      <div className="layout-grid-12 items-center">
        {/* Left: Horizontal Cover Image (7 cols desktop) */}
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <Link
            to={`/proyectos/${project.slug}`}
            className="group block relative aspect-[16/10] rounded-lg overflow-hidden bg-[#161317]"
            aria-label={`Ver proyecto destacado: ${project.name}`}
          >
            {project.coverImage ? (
              <img
                src={project.coverImage}
                srcSet={getResponsiveImageSet(project.coverImage)}
                sizes="(max-width: 1024px) 92vw, 55vw"
                alt={
                  readyImages[0]?.alt ??
                  `Fotografía destacada del proyecto ${project.name}`
                }
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#161317]">
                <span className="font-display text-6xl text-[#F5F0E7]/20">
                  {project.id} / 08
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#161317]/85 via-transparent to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#742940] text-[#F5F0E7] font-mono-meta text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-[#A8B69C]" aria-hidden="true" />
                <span>Destacado editorial · {project.id} / 08</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
              {readyImages.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#161317]/90 font-mono-meta text-xs text-[#F5F0E7]">
                  <ImageIcon className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                  <span>Galería ({readyImages.length} fotos)</span>
                </span>
              )}
              {readyVideos.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#161317]/90 font-mono-meta text-xs text-[#F5F0E7]">
                  <Film className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                  <span>Reel disponible</span>
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Right: Editorial Story Details (5 cols desktop) */}
        <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-display font-medium text-sm">
              <span className="text-[#A8B69C]">Historia en foco</span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
              <span style={{ color: accentColor }}>
                {project.category ?? "Teatro (por confirmar)"}
              </span>
            </div>

            <h3 className="font-display font-bold text-project-fluid text-[#F5F0E7] mt-2">
              {project.name}
            </h3>

            {project.shortDescription && (
              <p className="mt-4 text-lg sm:text-xl font-medium text-[#A8B69C] leading-snug">
                «{project.shortDescription}»
              </p>
            )}

            {project.fullDescription && (
              <p className="mt-4 text-base sm:text-lg font-normal text-[#D8CDC8] leading-relaxed">
                {project.fullDescription}
              </p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#433840]/60 flex flex-wrap items-center gap-4">
            <Link
              to={`/proyectos/${project.slug}`}
              className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-base font-medium"
            >
              <span>Conoce esta historia</span>
              <ArrowUpRight className="w-4 h-4 icon-glide" aria-hidden="true" />
            </Link>

            {readyImages.length > 1 && (
              <div className="flex items-center -space-x-2 ml-auto">
                {readyImages.slice(0, 3).map((img) => (
                  <img
                    key={img.id}
                    src={img.thumbnailUrl ?? img.publicUrl}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
