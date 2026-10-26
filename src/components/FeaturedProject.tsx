import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Film, Image as ImageIcon, Sparkles } from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import {
  getProjectReadyImages,
  getProjectReadyVideos,
  getResponsiveImageSet,
} from "../data/catalog";
import PhotoFrame from "./PhotoFrame";
import { BrushSplatter } from "./BrushMotifs";

interface FeaturedProjectProps {
  project: CulturalProject;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  project,
}) => {
  const readyImages = getProjectReadyImages(project);
  const readyVideos = getProjectReadyVideos(project);

  const headline = project.editorialHeadline || "¿A qué suenan dos dibujos?";
  const ctaText = project.contextualCta || `Descubre a ${project.name}`;

  return (
    <div className="relative rounded-3xl bg-[#29143B] border border-[#3D2254] p-6 sm:p-8 md:p-10 shadow-[0_16px_44px_rgba(14,6,23,0.65)] overflow-hidden">
      {/* Decorative brush splatter accent */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-20 hidden md:block" aria-hidden="true">
        <BrushSplatter className="w-48 h-48" color="#B184D5" accentColor="#F9C63C" />
      </div>

      <div className="layout-grid-12 items-center relative z-10">
        {/* Left: Horizontal Cover Image with PhotoFrame (7 cols desktop) */}
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <Link
            to={`/proyectos/${project.slug}`}
            className="group block focus:outline-none"
            aria-label={`Ver historia destacada: ${project.name}. ${headline}`}
          >
            <PhotoFrame
              aspectRatio="aspect-[16/10]"
              showCorners={true}
              cornerSize="md"
              className="w-full bg-[#170B25]"
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#170B25]">
                  <span className="font-display font-black text-6xl text-[#3D2254]">
                    {project.id} / 08
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#170B25]/90 via-[#170B25]/20 to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#170B25]/90 border border-[#F9C63C] text-[#FAF6FB] font-mono-meta text-xs font-bold backdrop-blur-sm shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                  <span>Historia en foco · {project.id} / 08</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 pointer-events-none">
                {readyImages.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#170B25]/90 border border-[#3D2254] font-mono-meta text-xs text-[#FAF6FB]">
                    <ImageIcon className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                    <span>{readyImages.length} fotos</span>
                  </span>
                )}
                {readyVideos.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#902B90] text-[#FAF6FB] font-semibold">
                    <Film className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reel disponible</span>
                  </span>
                )}
              </div>
            </PhotoFrame>
          </Link>
        </div>

        {/* Right: Editorial Story Details (5 cols desktop) */}
        <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col justify-between mt-6 lg:mt-0 lg:pl-6">
          <div>
            <div className="flex items-center gap-2 font-mono-meta text-xs uppercase tracking-wider text-[#D1C6DA]">
              <span className="text-[#F9C63C] font-bold">
                {project.category ?? "Iniciativa cultural"}
              </span>
              <span>·</span>
              <span>Proyecto {project.id}</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#FAF6FB] mt-3 leading-tight">
              {headline}
            </h3>

            <p className="font-mono-meta text-xs uppercase text-[#D1C6DA] tracking-wider mt-2">
              Iniciativa: <strong className="text-[#FAF6FB] font-bold">{project.name}</strong>
            </p>

            {project.shortDescription && (
              <p className="mt-4 text-base sm:text-lg text-[#D1C6DA] leading-relaxed font-normal">
                {project.shortDescription}
              </p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-[#3D2254] flex flex-wrap items-center justify-between gap-4">
            <Link
              to={`/proyectos/${project.slug}`}
              className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-[0_4px_18px_rgba(249,198,60,0.3)] hover:bg-[#EAB428] transition-colors"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] icon-glide" aria-hidden="true" />
            </Link>

            {readyImages.length > 1 && (
              <div className="flex items-center -space-x-2" aria-hidden="true">
                {readyImages.slice(0, 3).map((img) => (
                  <img
                    key={img.id}
                    src={img.thumbnailUrl ?? img.publicUrl}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#29143B]"
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
