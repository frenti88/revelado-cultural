import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Image as ImageIcon,
  User,
} from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import {
  getDisciplineColor,
  getProjectReadyAudios,
  getProjectReadyImages,
  getProjectReadyVideos,
} from "../data/catalog";
import MediaGallery from "./MediaGallery";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";

interface ProjectDetailProps {
  project: CulturalProject;
  allProjects: CulturalProject[];
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  allProjects,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const fromCatalog =
    typeof location.state?.fromCatalog === "string" &&
    location.state.fromCatalog.startsWith("/explorar")
      ? location.state.fromCatalog
      : "/explorar";

  const readyImages = getProjectReadyImages(project);
  const readyVideos = getProjectReadyVideos(project);
  const readyAudios = getProjectReadyAudios(project);
  const { accentColor } = getDisciplineColor(project.category);

  // Previous / Next initiative navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0
      ? allProjects[currentIndex - 1]
      : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  const paragraphs = project.fullDescription
    ? project.fullDescription.split("\n\n").filter(Boolean)
    : [];

  const hasVideos = readyVideos.length > 0;
  const hasImages = readyImages.length > 0;

  return (
    <article className="w-full bg-[#161317] text-[#F5F0E7]">
      <div className="layout-container py-8 sm:py-12">
        {/* Barra superior de navegación y metadatos */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#433840]/60">
          <Link
            to={fromCatalog}
            className="btn-press inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#742940] text-[#F5F0E7] text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
            <span>Volver a explorar</span>
          </Link>

          <div className="flex items-center gap-2 font-mono-meta text-xs">
            <span className="px-3 py-1 rounded-md bg-[#742940] text-[#F5F0E7] font-semibold">
              Proyecto {project.id} / 08
            </span>
            {project.category && (
              <Link
                to={`/explorar?categoria=${encodeURIComponent(
                  project.category
                )}`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#211820] hover:bg-[#2c202a] font-medium transition-colors"
                style={{ color: accentColor }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: accentColor }}
                  aria-hidden="true"
                />
                <span>{project.category}</span>
              </Link>
            )}
          </div>
        </div>

        {/* 
          Distribución de Layout adaptada al contenido de la iniciativa:
          Caso A: Proyectos con Reel (Arché, No entres Ahí, Ferales, Reflejos, Tres Tristes Tigres, Habitar el Barrio)
          -> Grid 12 columnas: 7 cols narrativa / 5 cols Reel player en paralelo, sin bloques vacíos.
        */}
        {hasVideos ? (
          <div className="space-y-16">
            <div className="layout-grid-12 items-start gap-8 lg:gap-12">
              {/* Columna Izquierda: Información Editorial (7 columnas) */}
              <div className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col justify-between">
                <div>
                  <motion.h1
                    initial={shouldReduceMotion ? false : { y: 12 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="font-display font-extrabold text-hero-fluid text-[#F5F0E7]"
                  >
                    {project.name}
                  </motion.h1>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {project.leader && (
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211820] text-sm font-medium text-[#F5F0E7]">
                        <User className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                        <span>Lidera: {project.leader}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211820] font-mono-meta text-xs text-[#D8CDC8]">
                      <span>Comuna 11 · Laureles - Estadio</span>
                    </span>
                  </div>

                  {paragraphs.length > 0 && (
                    <div className="mt-8 space-y-6 text-base sm:text-lg font-normal text-[#F5F0E7]/92 leading-relaxed">
                      {paragraphs.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? "text-lead-fluid text-[#F5F0E7]"
                              : "text-base sm:text-lg font-normal text-[#D8CDC8]"
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Acciones directas integradas si hay fotos */}
                {hasImages && (
                  <div className="mt-8 pt-6 border-t border-[#433840]/60 flex flex-wrap items-center gap-4">
                    <a
                      href="#galeria-fotografica"
                      className="btn-press inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-[#742940] hover:bg-[#8c324e] text-sm font-medium text-[#F5F0E7]"
                    >
                      <ImageIcon className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                      <span>Ver {readyImages.length} fotos documentales</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Columna Derecha: Reel documental (5 columnas) */}
              <div className="col-span-4 md:col-span-8 lg:col-span-5">
                <div className="lg:sticky lg:top-24 space-y-4">
                  {readyVideos.map((videoAsset) => (
                    <VideoPlayer
                      key={videoAsset.id}
                      asset={videoAsset}
                      projectName={project.name}
                      projectNumber={project.id}
                      category={project.category}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Galería fotográfica completa (si la iniciativa tiene fotografías) */}
            {hasImages && (
              <section
                id="galeria-fotografica"
                aria-labelledby="galeria-heading"
                className="pt-12 border-t border-[#433840]/60 scroll-mt-24"
              >
                <div className="flex items-baseline justify-between gap-4 mb-6">
                  <div>
                    <h2
                      id="galeria-heading"
                      className="font-display font-bold text-2xl sm:text-3xl text-[#F5F0E7]"
                    >
                      Fotos
                    </h2>
                    <p className="font-mono-meta text-xs text-[#D8CDC8] mt-1">
                      Comuna 11 · Presupuesto Participativo
                    </p>
                  </div>
                  <span className="font-mono-meta text-xs text-[#A8B69C]">
                    {readyImages.length}{" "}
                    {readyImages.length === 1 ? "fotografía" : "fotografías"}
                  </span>
                </div>

                <MediaGallery
                  images={readyImages}
                  projectName={project.name}
                />
              </section>
            )}
          </div>
        ) : (
          /* 
            Caso B: Proyectos sin Reel y con Fotografías (Narrar la realidad desde las viñetas, Se busca una Raíz)
            -> Grid 12 columnas: 5 cols datos de ficha e identificación / 7 cols Galería fotográfica interactiva.
            Aprovecha todo el ancho de pantalla desde el primer scroll, eliminando espacios vacíos.
          */
          <div className="layout-grid-12 items-start gap-8 lg:gap-12">
            {/* Columna Izquierda: Identificación y Ficha (5 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-5 space-y-6">
              <div>
                <motion.h1
                  initial={shouldReduceMotion ? false : { y: 12 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-display font-extrabold text-hero-fluid text-[#F5F0E7]"
                >
                  {project.name}
                </motion.h1>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {project.leader && (
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211820] text-sm font-medium text-[#F5F0E7]">
                      <User className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                      <span>Lidera: {project.leader}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#211820] font-mono-meta text-xs text-[#D8CDC8]">
                    <span>Comuna 11 · Laureles - Estadio</span>
                  </span>
                </div>
              </div>

              {/* Ficha documental compacta */}
              <div className="rounded-xl bg-[#211820] p-6 space-y-4 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between pb-3 border-b border-[#433840]/60 font-mono-meta text-xs">
                  <span className="text-[#A8B69C] font-semibold">
                    Iniciativa {project.id} / 08
                  </span>
                  <span className="text-[#D8CDC8]">Presupuesto Participativo</span>
                </div>

                <dl className="space-y-3 text-sm">
                  {project.category && (
                    <div>
                      <dt className="font-mono-meta text-xs text-[#D8CDC8]">Área</dt>
                      <dd className="font-medium text-[#F5F0E7] mt-0.5">
                        {project.category}
                      </dd>
                    </div>
                  )}
                  {project.leader && (
                    <div>
                      <dt className="font-mono-meta text-xs text-[#D8CDC8]">Lidera</dt>
                      <dd className="font-medium text-[#A8B69C] mt-0.5">
                        {project.leader}
                      </dd>
                    </div>
                  )}
                  {hasImages && (
                    <div>
                      <dt className="font-mono-meta text-xs text-[#D8CDC8]">
                        Contenido visual
                      </dt>
                      <dd className="text-[#F5F0E7] mt-0.5">
                        {readyImages.length} fotografías documentales
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            {/* Columna Derecha: Galería Fotográfica (7 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              {hasImages && (
                <MediaGallery
                  images={readyImages}
                  projectName={project.name}
                />
              )}
            </div>
          </div>
        )}

        {/* Audio (únicamente si existe y está publicado) */}
        {readyAudios.length > 0 && (
          <section
            id="voces-del-territorio"
            aria-labelledby="audio-heading"
            className="mt-16 pt-12 border-t border-[#433840]/60 scroll-mt-24"
          >
            <div className="mb-6">
              <h2
                id="audio-heading"
                className="font-display font-bold text-2xl sm:text-3xl text-[#F5F0E7]"
              >
                Audio
              </h2>
            </div>

            <div className="space-y-4">
              {readyAudios.map((audioAsset) => (
                <AudioPlayer
                  key={audioAsset.id}
                  asset={audioAsset}
                  projectName={project.name}
                  leader={project.leader}
                />
              ))}
            </div>
          </section>
        )}

        {/* Navegación entre proyectos: Anterior / Siguiente */}
        <nav
          aria-label="Navegación entre historias culturales"
          className="mt-16 pt-8 border-t border-[#433840]/60 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prevProject && (
            <Link
              to={`/proyectos/${prevProject.slug}`}
              state={{ fromCatalog }}
              className="group rounded-xl bg-[#211820] hover:bg-[#2b1f29] p-4 flex items-center gap-4 transition-colors"
            >
              <ArrowLeft
                className="w-5 h-5 text-[#A8B69C] shrink-0 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <span className="font-mono-meta text-xs text-[#D8CDC8] block">
                  Proyecto anterior · {prevProject.id} / 08
                </span>
                <span className="font-display font-semibold text-base text-[#F5F0E7] truncate block mt-1">
                  {prevProject.name}
                </span>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/proyectos/${nextProject.slug}`}
              state={{ fromCatalog }}
              className="group rounded-xl bg-[#211820] hover:bg-[#2b1f29] p-4 flex items-center justify-end gap-4 text-right transition-colors"
            >
              <div className="min-w-0">
                <span className="font-mono-meta text-xs text-[#D8CDC8] block">
                  Siguiente proyecto · {nextProject.id} / 08
                </span>
                <span className="font-display font-semibold text-base text-[#F5F0E7] truncate block mt-1">
                  {nextProject.name}
                </span>
              </div>
              <ArrowRight
                className="w-5 h-5 text-[#A8B69C] shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
};

export default ProjectDetail;
