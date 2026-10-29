import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Play,
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import {
  getProjectReadyAudios,
  getProjectReadyVideos,
} from "../data/catalog";
import EditorialHero from "../components/EditorialHero";
import FeaturedProject from "../components/FeaturedProject";
import EditorialSection from "../components/EditorialSection";
import ProjectGrid from "../components/ProjectGrid";
import VideoPlayer from "../components/VideoPlayer";
import AudioPlayer from "../components/AudioPlayer";
import { BrushSplatter } from "../components/BrushMotifs";

export const HomePage: React.FC = () => {
  const { publishedProjects } = useCatalog();

  useEffect(() => {
    document.title =
      "Revelado Cultural: La cultura del barrio, al descubierto · Comuna 11";
  }, []);

  const featuredStory =
    publishedProjects.find((p) => p.featured) ||
    publishedProjects.find((p) => p.id === "03") ||
    publishedProjects[0];

  const reelEntries = publishedProjects.flatMap((project) =>
    getProjectReadyVideos(project).map((video) => ({
      project,
      video,
    }))
  );

  const audioEntries = publishedProjects.flatMap((project) =>
    getProjectReadyAudios(project).map((audio) => ({
      project,
      audio,
    }))
  );

  const podcastEntries = publishedProjects.filter((p) => Boolean(p.podcastUrl));

  return (
    <div className="bg-[#170B25] text-[#FAF6FB]">
      {/* Sección 1 — Hero editorial inmersivo: Dark Cultural Motion */}
      <EditorialHero projects={publishedProjects} />

      {/* Sección 2 — Una historia que merece ser contada */}
      {featuredStory && (
        <EditorialSection
          id="historia-destacada"
          title="Una historia que merece ser contada"
          subtitle="Cada proceso cultural nace de una chispa particular. En esta edición destacamos cómo dos obras gráficas se convirtieron en un disco de rock y en una propuesta sonora con identidad de barrio."
          variant="secondary"
        >
          <FeaturedProject project={featuredStory} />
        </EditorialSection>
      )}

      {/* Sección 3 — Catálogo de las ocho iniciativas */}
      <EditorialSection
        id="catalogo"
        title="Ocho historias en movimiento"
        subtitle="Un recorrido documental por la música, danza, teatro, gestión cultural, investigación y artes de Laureles–Estadio."
        variant="dark"
        action={
          <Link
            to="/explorar"
            className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-[0_6px_20px_rgba(249,198,60,0.25)] hover:bg-[#EAB428] transition-colors"
          >
            <span>Ver con filtros</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          </Link>
        }
      >
        <ProjectGrid
          projects={publishedProjects}
          columns={4}
          aspect="square"
          variant="editorial-rhythm"
        />
      </EditorialSection>

      {/* Sección 4 — Registros audiovisuales y reels */}
      {reelEntries.length > 0 && (
        <EditorialSection
          id="audiovisuales"
          title="Mira, escucha y descubre"
          subtitle="Registros documentales, ensayos y puestas en escena capturadas en video y reels por las iniciativas."
          variant="secondary"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reelEntries.map(({ project, video }) => (
              <VideoPlayer
                key={video.id}
                asset={video}
                projectName={project.name}
                projectSlug={project.slug}
                projectNumber={project.id}
                category={project.category}
                compact
              />
            ))}
          </div>
        </EditorialSection>
      )}

      {/* Sección 5 — Entrevistas y conversaciones (YouTube) */}
      {podcastEntries.length > 0 && (
        <EditorialSection
          id="entrevistas-podcast"
          title="Entrevistas y conversaciones"
          subtitle="Conversaciones en video con los responsables de las iniciativas ganadoras de Presupuesto Participativo de la Comuna 11."
          variant="dark"
          action={
            <a
              href="https://www.youtube.com/playlist?list=PLNSEJl5L7Jwc"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-sm font-bold shadow-md hover:bg-[#EAB428] transition-colors"
            >
              <span>Ver lista completa en YouTube</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </a>
          }
        >
          {/* Asymmetric Podcast Stage: Featured Spotlight + Broadcast Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Featured Interview (First item) */}
            {podcastEntries[0] && (
              <div className="lg:col-span-5 rounded-2xl bg-[#170B25] border border-[#3D2254] p-6 sm:p-7 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono-meta text-xs text-[#F9C63C] font-bold px-2.5 py-0.5 rounded-full bg-[#29143B] border border-[#583178]">
                      {podcastEntries[0].id} / 08 · Destacado
                    </span>
                    {podcastEntries[0].category && (
                      <span className="font-mono-meta text-[11px] text-[#B184D5] font-semibold uppercase">
                        {podcastEntries[0].category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] leading-tight mb-2">
                    {podcastEntries[0].name}
                  </h3>

                  {podcastEntries[0].leader && (
                    <p className="font-mono-meta text-xs text-[#D1C6DA] mb-4">
                      Lidera: {podcastEntries[0].leader}
                    </p>
                  )}

                  <p className="text-sm text-[#D1C6DA] leading-relaxed line-clamp-4">
                    {podcastEntries[0].shortDescription}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#3D2254] flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={podcastEntries[0].podcastUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-[#F9C63C] text-[#170B25] text-sm font-bold shadow-md hover:bg-[#EAB428] transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Reproducir entrevista</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  </a>

                  <Link
                    to={`/proyectos/${podcastEntries[0].slug}`}
                    className="text-xs font-mono-meta text-[#D1C6DA] hover:text-[#FAF6FB] transition-colors"
                  >
                    Ver ficha documental →
                  </Link>
                </div>
              </div>
            )}

            {/* Broadcast Queue (Remaining items) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {podcastEntries.slice(1).map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-[#170B25] border border-[#3D2254] p-5 flex flex-col justify-between shadow-sm hover:border-[#F9C63C] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono-meta text-xs text-[#F9C63C] font-bold">
                        {project.id} / 08
                      </span>
                      {project.category && (
                        <span className="font-mono-meta text-[11px] text-[#B184D5] font-semibold uppercase truncate">
                          {project.category}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#FAF6FB] leading-tight mb-1.5">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[#D1C6DA] line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#3D2254] flex items-center justify-between gap-2">
                    <a
                      href={project.podcastUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9C63C] hover:text-[#FAF6FB] transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                      <span>Ver video</span>
                      <ArrowUpRight className="w-3 h-3 stroke-[2.2]" aria-hidden="true" />
                    </a>

                    <Link
                      to={`/proyectos/${project.slug}`}
                      className="text-[11px] font-mono-meta text-[#D1C6DA] hover:text-[#FAF6FB] transition-colors"
                    >
                      Ficha →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </EditorialSection>
      )}

      {/* Sección 5.2 — Voces del territorio (únicamente si existen audios) */}
      {audioEntries.length > 0 && (
        <EditorialSection
          id="voces-del-territorio"
          title="Voces del territorio"
          subtitle="Testimonios sonoros y conversaciones con los protagonistas de las iniciativas culturales."
          variant="secondary"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {audioEntries.map(({ project, audio }) => (
              <AudioPlayer
                key={audio.id}
                asset={audio}
                projectName={project.name}
                leader={project.leader}
              />
            ))}
          </div>
        </EditorialSection>
      )}

      {/* Sección 6 — Puente Editorial: Sobre Revelado Cultural 2026 */}
      <section id="manifiesto-resumen" className="relative w-full bg-[#170B25] border-t border-[#3D2254] py-16 sm:py-20 lg:py-24">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#29143B] border border-[#3D2254] p-8 sm:p-12 lg:p-14 shadow-[0_16px_48px_rgba(14,6,23,0.7)] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#583178]/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#3D2254]">
                <span className="font-mono-meta text-xs uppercase tracking-wider text-[#F9C63C] font-bold">
                  Sobre Revelado Cultural 2026
                </span>
                <span className="font-mono-meta text-xs text-[#D1C6DA]">
                  Comuna 11 · Laureles–Estadio
                </span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#FAF6FB] leading-tight">
                Una estrategia multiformato de memoria, producción y circulación ciudadana
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#D1C6DA] leading-relaxed">
                Revelado Cultural documenta y visibiliza las ocho iniciativas culturales ganadoras del Presupuesto Participativo de la Comuna 11, articulando registros audiovisuales, series fotográficas de autor, entrevistas a fondo y esta plataforma web libre.
              </p>

              {/* 4 Pillars Summary */}
              <div className="mt-8 pt-6 border-t border-[#3D2254] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-[#170B25] border border-[#3D2254]">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#F9C63C] block">08</span>
                  <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-1">Reels documentales</span>
                </div>
                <div className="p-4 rounded-xl bg-[#170B25] border border-[#3D2254]">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#F9C63C] block">≥ 64</span>
                  <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-1">Fotos de autor</span>
                </div>
                <div className="p-4 rounded-xl bg-[#170B25] border border-[#3D2254]">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#F9C63C] block">08</span>
                  <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-1">Entrevistas en video</span>
                </div>
                <div className="p-4 rounded-xl bg-[#170B25] border border-[#3D2254]">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#F9C63C] block">01</span>
                  <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-1">Plataforma web libre</span>
                </div>
              </div>

              <div className="mt-8 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs font-mono-meta text-[#D1C6DA]">
                  Documento oficial: Objetivos, componentes y memorias de la Comuna 11.
                </p>
                <Link
                  to="/revelado-cultural"
                  className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-md hover:bg-[#EAB428] transition-colors shrink-0"
                >
                  <span>Conocer el manifiesto y presentación oficial</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 7 — La cultura continúa */}
      <section className="relative w-full bg-[#170B25] border-t border-[#3D2254] py-16 sm:py-24 overflow-hidden">
        {/* Decorative brush splatter */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-20" aria-hidden="true">
          <BrushSplatter className="w-64 h-64" color="#B184D5" accentColor="#F9C63C" />
        </div>

        <div className="layout-container text-center max-w-3xl mx-auto relative z-10">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#FAF6FB] leading-tight">
            La cultura del barrio continúa con tu curiosidad.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#D1C6DA] leading-relaxed">
            Explora las ocho fichas de proyectos, conoce a las personas y colectivos que las hacen posibles y descubre cómo cada iniciativa transforma la Comuna 11.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explorar"
              className="btn-press inline-flex items-center gap-2 min-h-12 px-7 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-[0_6px_24px_rgba(249,198,60,0.3)] hover:bg-[#EAB428] transition-colors"
            >
              <span>Explorar las 8 iniciativas</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </Link>
            <Link
              to="/revelado-cultural"
              className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#29143B] hover:bg-[#37105F] text-[#FAF6FB] text-base font-medium border border-[#3D2254] hover:border-[#F9C63C] transition-colors shadow-sm"
            >
              <span>Revelado Cultural</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
