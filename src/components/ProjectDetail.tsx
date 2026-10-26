import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  User,
} from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import {
  getProjectReadyAudios,
  getProjectReadyImages,
  getProjectReadyVideos,
} from "../data/catalog";
import PhotoFrame from "./PhotoFrame";
import MediaGallery from "./MediaGallery";
import VideoPlayer from "./VideoPlayer";
import AudioPlayer from "./AudioPlayer";
import RelatedProjects from "./RelatedProjects";

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

  useEffect(() => {
    document.title = `${project.name} · Revelado Cultural Comuna 11`;
    window.scrollTo(0, 0);
  }, [project.slug, project.name]);

  const readyImages = getProjectReadyImages(project);
  const readyVideos = getProjectReadyVideos(project);
  const readyAudios = getProjectReadyAudios(project);

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
    : project.shortDescription
    ? [project.shortDescription]
    : [];

  const headline = project.editorialHeadline || "¿Qué historia guarda este proyecto?";

  return (
    <article className="w-full bg-[#151515] text-[#F2EFE8] pb-16">
      {/* 01 — Portada & Barra Superior */}
      <div className="border-b border-[#2E2E2E] bg-[#151515] py-6 sm:py-8">
        <div className="layout-container">
          {/* Breadcrumb y Volver */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#2E2E2E]">
            <Link
              to={fromCatalog}
              className="btn-press inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#222222] hover:bg-[#2E2E2E] border border-[#2E2E2E] hover:border-[#FF5C38] text-[#F2EFE8] text-xs font-mono-meta transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#FF5C38]" aria-hidden="true" />
              <span>Volver a explorar</span>
            </Link>

            <div className="flex items-center gap-2 font-mono-meta text-xs">
              <span className="px-3 py-1 rounded bg-[#222222] border border-[#2E2E2E] text-[#FF5C38] font-bold">
                0{project.id} / 08
              </span>
              {project.category && (
                <Link
                  to={`/explorar?categoria=${encodeURIComponent(project.category)}`}
                  className="px-3 py-1 rounded bg-[#222222] border border-[#2E2E2E] text-[#A7A39D] hover:text-[#F2EFE8] hover:border-[#FF5C38] transition-colors"
                >
                  {project.category}
                </Link>
              )}
            </div>
          </div>

          {/* Header Editorial Hero */}
          <div className="max-w-4xl">
            <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-2">
              01 — Portada
            </span>
            <motion.h1
              initial={shouldReduceMotion ? false : { y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F2EFE8] leading-tight"
            >
              {project.name}
            </motion.h1>

            <p className="mt-4 text-xl sm:text-2xl text-[#FF5C38] font-display font-medium leading-snug">
              «{headline}»
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono-meta text-xs text-[#A7A39D]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222222] border border-[#2E2E2E]">
                <MapPin className="w-3.5 h-3.5 text-[#FF5C38]" aria-hidden="true" />
                <span>Comuna 11 · Laureles–Estadio</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222222] border border-[#2E2E2E]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5C38]" aria-hidden="true" />
                <span>Presupuesto Participativo</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 02 — La historia & 04 — La experiencia (Audiovisual en paralelo para máxima inmersión) */}
      <div className="layout-container py-12 lg:py-16">
        <div className="layout-grid-12 items-start gap-8 lg:gap-12">
          {/* Columna Izquierda: 02 — La historia */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 space-y-10">
            <section aria-labelledby="historia-heading">
              <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-2">
                02 — La historia
              </span>
              <h2
                id="historia-heading"
                className="font-display font-bold text-2xl sm:text-3xl text-[#F2EFE8] mb-6"
              >
                Qué propone esta iniciativa
              </h2>

              {paragraphs.length > 0 ? (
                <div className="space-y-6 text-base sm:text-lg font-normal text-[#D4D0C7] leading-relaxed">
                  {paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "text-lead-fluid text-[#F2EFE8] font-medium border-l-2 border-[#FF5C38] pl-4 sm:pl-6 py-1"
                          : "text-[#A7A39D]"
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-base text-[#A7A39D] leading-relaxed">
                  Esta iniciativa cultural forma parte de las ocho ganadoras de la convocatoria de Presupuesto Participativo en la Comuna 11, aportando a la vida cultural y comunitaria de Medellín.
                </p>
              )}
            </section>

            {/* 03 — Las personas detrás */}
            <section aria-labelledby="personas-heading" className="pt-8 border-t border-[#2E2E2E]">
              <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-2">
                03 — Las personas detrás
              </span>
              <h2
                id="personas-heading"
                className="font-display font-bold text-xl sm:text-2xl text-[#F2EFE8] mb-4"
              >
                Quiénes impulsan el proyecto
              </h2>

              <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#151515] border border-[#2E2E2E] flex items-center justify-center text-[#FF5C38] shrink-0">
                    <User className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#F2EFE8]">
                      {project.leader ? project.leader : `Equipo de ${project.name}`}
                    </h3>
                    <p className="font-mono-meta text-xs text-[#A7A39D] mt-0.5">
                      {project.leader ? "Liderazgo y gestión del proyecto" : "Colectivo creador · Comuna 11"}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono-meta text-[#FF5C38] bg-[#151515] border border-[#2E2E2E] px-3 py-1.5 rounded-full shrink-0">
                  Laureles–Estadio
                </div>
              </div>
            </section>

            {/* 05 — Su aporte cultural */}
            <section aria-labelledby="aporte-heading" className="pt-8 border-t border-[#2E2E2E]">
              <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-2">
                05 — Su aporte cultural
              </span>
              <h2
                id="aporte-heading"
                className="font-display font-bold text-xl sm:text-2xl text-[#F2EFE8] mb-4"
              >
                Impacto en la comunidad y el territorio
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-5">
                  <div className="text-[#FF5C38] mb-2">
                    <HeartHandshake className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-base text-[#F2EFE8]">
                    Apropiación social
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#A7A39D] leading-relaxed">
                    Fomenta el encuentro ciudadano en espacios públicos y salas culturales del barrio, fortaleciendo el tejido comunitario.
                  </p>
                </div>

                <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-5">
                  <div className="text-[#FF5C38] mb-2">
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h4 className="font-display font-semibold text-base text-[#F2EFE8]">
                    Creación viva
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#A7A39D] leading-relaxed">
                    Aporta obra artística original, registros documentales y metodologías participativas a la memoria de Medellín.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Columna Derecha: 04 — La experiencia (Video principal / Reel) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block">
                04 — La experiencia audiovisual
              </span>

              {readyVideos.length > 0 ? (
                readyVideos.map((videoAsset) => (
                  <VideoPlayer
                    key={videoAsset.id}
                    asset={videoAsset}
                    projectName={project.name}
                    projectSlug={project.slug}
                    projectNumber={project.id}
                    category={project.category}
                  />
                ))
              ) : project.coverImage ? (
                <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-4 sm:p-5 shadow-lg">
                  <PhotoFrame
                    aspectRatio="aspect-[4/3]"
                    showCorners={true}
                    cornerSize="md"
                    className="w-full bg-[#151515]"
                  >
                    <img
                      src={project.coverImage}
                      alt={`Registro visual de ${project.name}`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover photo-reveal"
                    />
                  </PhotoFrame>
                  <p className="font-mono-meta text-xs text-[#A7A39D] mt-3">
                    Registro fotográfico oficial · Comuna 11
                  </p>
                </div>
              ) : (
                <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-8 text-center">
                  <span className="font-mono-meta text-xs text-[#A7A39D]">
                    Iniciativa de Presupuesto Participativo · Rollo {project.id}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Galería Documental Completa (si tiene fotografías) */}
        {readyImages.length > 0 && (
          <section
            id="galeria-fotografica"
            aria-labelledby="galeria-heading"
            className="mt-16 pt-12 border-t border-[#2E2E2E] scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
              <div>
                <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-1">
                  Registros documentales
                </span>
                <h2
                  id="galeria-heading"
                  className="font-display font-bold text-2xl sm:text-3xl text-[#F2EFE8]"
                >
                  Galería fotográfica
                </h2>
              </div>
              <span className="font-mono-meta text-xs text-[#FF5C38] font-semibold">
                {readyImages.length} {readyImages.length === 1 ? "fotografía" : "fotografías"}
              </span>
            </div>

            <MediaGallery images={readyImages} projectName={project.name} />
          </section>
        )}

        {/* Audio Player (si tiene audios preparados) */}
        {readyAudios.length > 0 && (
          <section
            id="audio-documental"
            aria-labelledby="audio-heading"
            className="mt-16 pt-12 border-t border-[#2E2E2E] scroll-mt-24"
          >
            <div className="mb-6">
              <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-1">
                Registro sonoro
              </span>
              <h2
                id="audio-heading"
                className="font-display font-bold text-2xl sm:text-3xl text-[#F2EFE8]"
              >
                Pódcast y voces del proyecto
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

        {/* 06 — Sigue descubriendo (Proyectos relacionados) */}
        <div className="mt-16">
          <RelatedProjects currentProject={project} allProjects={allProjects} />
        </div>

        {/* Navegación entre proyectos: Anterior / Siguiente */}
        <nav
          aria-label="Navegación entre historias culturales"
          className="mt-16 pt-8 border-t border-[#2E2E2E] grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prevProject && (
            <Link
              to={`/proyectos/${prevProject.slug}`}
              state={{ fromCatalog }}
              className="group rounded-xl bg-[#222222] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#FF5C38] p-4 sm:p-5 flex items-center gap-4 transition-all"
            >
              <ArrowLeft
                className="w-5 h-5 text-[#FF5C38] shrink-0 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <span className="font-mono-meta text-xs text-[#A7A39D] block">
                  Historia anterior · 0{prevProject.id} / 08
                </span>
                <span className="font-display font-bold text-base text-[#F2EFE8] truncate block mt-1 group-hover:text-[#FF5C38] transition-colors">
                  {prevProject.name}
                </span>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/proyectos/${nextProject.slug}`}
              state={{ fromCatalog }}
              className="group rounded-xl bg-[#222222] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#FF5C38] p-4 sm:p-5 flex items-center justify-end gap-4 text-right transition-all"
            >
              <div className="min-w-0">
                <span className="font-mono-meta text-xs text-[#A7A39D] block">
                  Siguiente historia · 0{nextProject.id} / 08
                </span>
                <span className="font-display font-bold text-base text-[#F2EFE8] truncate block mt-1 group-hover:text-[#FF5C38] transition-colors">
                  {nextProject.name}
                </span>
              </div>
              <ArrowRight
                className="w-5 h-5 text-[#FF5C38] shrink-0 transition-transform group-hover:translate-x-1"
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