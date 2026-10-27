import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Headphones,
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
import { BrushStroke } from "./BrushMotifs";

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
    <article className="w-full bg-[#170B25] text-[#FAF6FB] pb-16">
      {/* 01 — Portada & Barra Superior */}
      <div className="border-b border-[#3D2254] bg-[#170B25] py-6 sm:py-8">
        <div className="layout-container">
          {/* Breadcrumb y Volver */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#3D2254]">
            <Link
              to={fromCatalog}
              className="btn-press inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] hover:border-[#F9C63C] text-[#FAF6FB] text-xs font-mono-meta transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
              <span>Volver a explorar</span>
            </Link>

            <div className="flex items-center gap-2 font-mono-meta text-xs">
              <span className="px-3 py-1 rounded-full bg-[#29143B] border border-[#583178] text-[#F9C63C] font-bold">
                0{project.id} / 08
              </span>
              {project.category && (
                <Link
                  to={`/explorar?categoria=${encodeURIComponent(project.category)}`}
                  className="px-3 py-1 rounded-full bg-[#29143B] border border-[#3D2254] text-[#D1C6DA] hover:text-[#FAF6FB] hover:border-[#F9C63C] transition-colors"
                >
                  {project.category}
                </Link>
              )}
            </div>
          </div>

          {/* Header Editorial Hero */}
          <div className="max-w-4xl">
            <motion.h1
              initial={shouldReduceMotion ? false : { y: 12 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FAF6FB] leading-tight"
            >
              {project.name}
            </motion.h1>

            <p className="mt-4 text-xl sm:text-2xl text-[#F9C63C] font-display font-bold leading-snug">
              «{headline}»
            </p>

            <div className="mt-3 -ml-2" aria-hidden="true">
              <BrushStroke className="w-48 h-6 sm:w-64 sm:h-8 opacity-60" color="#B184D5" accentColor="#F9C63C" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono-meta text-xs text-[#D1C6DA]">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#29143B] border border-[#3D2254]">
                <MapPin className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                <span>Comuna 11 · Laureles–Estadio</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#29143B] border border-[#3D2254]">
                <Sparkles className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                <span>Presupuesto Participativo</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 02 — La historia & 04 — La experiencia */}
      <div className="layout-container py-12 lg:py-16">
        <div className="layout-grid-12 items-start gap-8 lg:gap-12">
          {/* Columna Izquierda: 02 — La historia */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 space-y-10">
            <section aria-labelledby="historia-heading">
              <h2
                id="historia-heading"
                className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mb-6"
              >
                Qué propone esta iniciativa
              </h2>

              {paragraphs.length > 0 ? (
                <div className="space-y-6 text-base sm:text-lg font-normal text-[#D1C6DA] leading-relaxed">
                  {paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "text-lead-fluid text-[#FAF6FB] font-medium border-l-2 border-[#F9C63C] pl-4 sm:pl-6 py-1"
                          : "text-[#D1C6DA]"
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-base text-[#D1C6DA] leading-relaxed">
                  Esta iniciativa cultural forma parte de las ocho ganadoras de la convocatoria de Presupuesto Participativo en la Comuna 11, aportando a la vida cultural y comunitaria de Medellín.
                </p>
              )}
            </section>

            {/* Las personas detrás */}
            <section aria-labelledby="personas-heading" className="pt-8 border-t border-[#3D2254]">
              <h2
                id="personas-heading"
                className="font-display font-black text-xl sm:text-2xl text-[#FAF6FB] mb-4"
              >
                Quiénes impulsan el proyecto
              </h2>

              <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#170B25] border border-[#583178] flex items-center justify-center text-[#F9C63C] shrink-0">
                    <User className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-[#FAF6FB]">
                      {project.leader ? project.leader : `Equipo de ${project.name}`}
                    </h3>
                    <p className="font-mono-meta text-xs text-[#D1C6DA] mt-0.5">
                      {project.leader ? "Liderazgo y gestión del proyecto" : "Colectivo creador · Comuna 11"}
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono-meta text-[#F9C63C] bg-[#170B25] border border-[#3D2254] px-3.5 py-1.5 rounded-full shrink-0 font-bold">
                  Laureles–Estadio
                </div>
              </div>
            </section>

            {/* Su aporte cultural */}
            <section aria-labelledby="aporte-heading" className="pt-8 border-t border-[#3D2254]">
              <h2
                id="aporte-heading"
                className="font-display font-black text-xl sm:text-2xl text-[#FAF6FB] mb-4"
              >
                Impacto en la comunidad y el territorio
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="border-l-2 border-[#F9C63C] pl-4">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#FAF6FB]">
                    Apropiación social
                  </h3>
                  <p className="mt-1.5 text-sm text-[#D1C6DA] leading-relaxed">
                    Fomenta el encuentro ciudadano en espacios públicos y salas culturales del barrio, fortaleciendo el tejido comunitario.
                  </p>
                </div>

                <div className="border-l-2 border-[#B184D5] pl-4">
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#FAF6FB]">
                    Creación viva
                  </h3>
                  <p className="mt-1.5 text-sm text-[#D1C6DA] leading-relaxed">
                    Aporta obra artística original, registros documentales y metodologías participativas a la memoria de Medellín.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Columna Derecha: 04 — La experiencia (Video principal / Reel) */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
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
                <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-4 sm:p-5 shadow-lg">
                  <PhotoFrame
                    aspectRatio="aspect-[4/3]"
                    showCorners={true}
                    cornerSize="md"
                    className="w-full bg-[#170B25]"
                  >
                    <img
                      src={project.coverImage}
                      alt={`Registro visual de ${project.name}`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover photo-reveal"
                    />
                  </PhotoFrame>
                  <p className="font-mono-meta text-xs text-[#D1C6DA] mt-3">
                    Registro fotográfico oficial · Comuna 11
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-8 text-center">
                  <span className="font-mono-meta text-xs text-[#D1C6DA]">
                    Iniciativa de Presupuesto Participativo · Rollo {project.id}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Galería Documental Completa */}
        {readyImages.length > 0 && (
          <section
            id="galeria-fotografica"
            aria-labelledby="galeria-heading"
            className="mt-16 pt-12 border-t border-[#3D2254] scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
              <div>
                <h2
                  id="galeria-heading"
                  className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB]"
                >
                  Galería fotográfica
                </h2>
              </div>
              <span className="font-mono-meta text-xs text-[#F9C63C] font-bold">
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
            className="mt-16 pt-12 border-t border-[#3D2254] scroll-mt-24"
          >
            <div className="mb-6">
              <h2
                id="audio-heading"
                className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB]"
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

        {/* Entrevista en formato falso podcast (del Documento Oficial) */}
        {project.podcastUrl && (
          <section
            id="podcast-documental"
            aria-labelledby="podcast-heading"
            className="mt-16 pt-12 border-t border-[#3D2254] scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
              <div>
                <h2
                  id="podcast-heading"
                  className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB]"
                >
                  Entrevista en formato falso podcast
                </h2>
              </div>
              <span className="font-mono-meta text-xs text-[#B184D5] font-semibold">
                Grabación oficial en video · 5 a 8 minutos
              </span>
            </div>

            <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#170B25] border border-[#583178] flex items-center justify-center text-[#F9C63C] shrink-0 shadow-sm">
                  <Headphones className="w-7 h-7 stroke-[2.2]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-[#FAF6FB]">
                    Entrevista: {project.name}
                  </h3>
                  <p className="font-mono-meta text-xs text-[#F9C63C] font-semibold mt-1">
                    Conversación con {project.leader ? project.leader : `el equipo de ${project.name}`}
                  </p>
                  <p className="mt-2 text-sm text-[#D1C6DA] max-w-xl">
                    Entrevista grabada en video que documenta y narrativiza la ejecución del proyecto ganador de Presupuesto Participativo.
                  </p>
                </div>
              </div>

              <a
                href={project.podcastUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press shrink-0 inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] font-bold text-base shadow-md hover:bg-[#EAB428] transition-colors"
              >
                <span>Ver entrevista en YouTube</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </a>
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
          className="mt-16 pt-8 border-t border-[#3D2254] grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prevProject && (
            <Link
              to={`/proyectos/${prevProject.slug}`}
              state={{ fromCatalog }}
              className="group rounded-2xl bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] hover:border-[#F9C63C] p-4 sm:p-5 flex items-center gap-4 transition-all shadow-sm"
            >
              <ArrowLeft
                className="w-5 h-5 text-[#F9C63C] shrink-0 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <span className="font-mono-meta text-xs text-[#D1C6DA] block">
                  Historia anterior · 0{prevProject.id} / 08
                </span>
                <span className="font-display font-bold text-base text-[#FAF6FB] truncate block mt-1 group-hover:text-[#F9C63C] transition-colors">
                  {prevProject.name}
                </span>
              </div>
            </Link>
          )}

          {nextProject && (
            <Link
              to={`/proyectos/${nextProject.slug}`}
              state={{ fromCatalog }}
              className="group rounded-2xl bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] hover:border-[#F9C63C] p-4 sm:p-5 flex items-center justify-end gap-4 text-right transition-all shadow-sm"
            >
              <div className="min-w-0">
                <span className="font-mono-meta text-xs text-[#D1C6DA] block">
                  Siguiente historia · 0{nextProject.id} / 08
                </span>
                <span className="font-display font-bold text-base text-[#FAF6FB] truncate block mt-1 group-hover:text-[#F9C63C] transition-colors">
                  {nextProject.name}
                </span>
              </div>
              <ArrowRight
                className="w-5 h-5 text-[#F9C63C] shrink-0 transition-transform group-hover:translate-x-1"
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
