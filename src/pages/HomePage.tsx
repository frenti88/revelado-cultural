import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Camera,
  Film,
  Globe,
  Headphones,
  Play,
  Share2,
  Users,
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

      {/* Sección 4 — Los cuatro componentes de Revelado Cultural (Documento Oficial) */}
      <EditorialSection
        id="componentes"
        title="Los cuatro componentes del proyecto"
        subtitle="Estrategia multiformato de producción y circulación para visibilizar el talento y las historias de la Comuna 11."
        variant="secondary"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Componente 1: Reels */}
          <div className="relative rounded-2xl bg-[#170B25] border border-[#3D2254] p-7 sm:p-8 flex flex-col justify-between shadow-md hover:border-[#F9C63C]/60 transition-colors">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-[#3D2254]">
                <span className="font-display font-black text-4xl sm:text-5xl text-[#F9C63C] tracking-tight uppercase">
                  08 Reels
                </span>
                <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold">
                  60 a 90 segundos
                </span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#FAF6FB] mb-3">
                Micro narrativa formato Reels
              </h3>
              <p className="text-base text-[#D1C6DA] leading-relaxed">
                Para cada proyecto cubierto se produce un reel de entre 60 y 90 segundos que sintetice su propuesta, impacto y ejecución.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3D2254] flex items-center justify-between text-xs font-mono-meta text-[#D1C6DA]">
              <span>Formato vertical audiovisual</span>
              <span className="text-[#F9C63C] font-semibold">1 por proceso</span>
            </div>
          </div>

          {/* Componente 2: Fotografía */}
          <div className="relative rounded-2xl bg-[#170B25] border border-[#3D2254] p-7 sm:p-8 flex flex-col justify-between shadow-md hover:border-[#F9C63C]/60 transition-colors">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-[#3D2254]">
                <span className="font-display font-black text-4xl sm:text-5xl text-[#F9C63C] tracking-tight uppercase">
                  08 Series
                </span>
                <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold">
                  ≥ 8 fotos por proceso
                </span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#FAF6FB] mb-3">
                Serie fotográfica documental
              </h3>
              <p className="text-base text-[#D1C6DA] leading-relaxed">
                Registro fotográfico de la ejecución de cada proyecto, con al menos 8 imágenes por proceso, trabajadas editorialmente para construir una narrativa visual coherente.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3D2254] flex items-center justify-between text-xs font-mono-meta text-[#D1C6DA]">
              <span>Narrativa visual de autor</span>
              <span className="text-[#F9C63C] font-semibold">Mínimo 64 fotografías</span>
            </div>
          </div>

          {/* Componente 3: Podcasts */}
          <div className="relative rounded-2xl bg-[#170B25] border border-[#3D2254] p-7 sm:p-8 flex flex-col justify-between shadow-md hover:border-[#F9C63C]/60 transition-colors">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-[#3D2254]">
                <span className="font-display font-black text-4xl sm:text-5xl text-[#B184D5] tracking-tight uppercase">
                  08 Episodios
                </span>
                <span className="font-mono-meta text-xs text-[#F9C63C] uppercase tracking-wider font-bold">
                  5 a 8 minutos
                </span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#FAF6FB] mb-3">
                Entrevistas en formato falso podcast
              </h3>
              <p className="text-base text-[#D1C6DA] leading-relaxed">
                Una entrevista por proyecto grabada en video de entre 5 y 8 minutos con el o los responsables del proceso.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3D2254] flex items-center justify-between text-xs font-mono-meta text-[#D1C6DA]">
              <span>Grabación oficial en video</span>
              <span className="text-[#B184D5] font-semibold">Conversaciones a fondo</span>
            </div>
          </div>

          {/* Componente 4: Web */}
          <div className="relative rounded-2xl bg-[#170B25] border border-[#3D2254] p-7 sm:p-8 flex flex-col justify-between shadow-md hover:border-[#F9C63C]/60 transition-colors">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b border-[#3D2254]">
                <span className="font-display font-black text-4xl sm:text-5xl text-[#FAF6FB] tracking-tight uppercase">
                  01 Portal Web
                </span>
                <span className="font-mono-meta text-xs text-[#F9C63C] uppercase tracking-wider font-bold">
                  Acceso libre
                </span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#FAF6FB] mb-3">
                Portal web tipo Blog
              </h3>
              <p className="text-base text-[#D1C6DA] leading-relaxed">
                Web tipo blog que permite recopilar todos los contenidos, registros y memorias culturales en un solo lugar accesible.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#3D2254] flex items-center justify-between text-xs font-mono-meta text-[#D1C6DA]">
              <span>Plataforma digital abierta</span>
              <span className="text-[#FAF6FB] font-semibold">Memoria permanente</span>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* Sección 5 — Mira, escucha y descubre */}
      {reelEntries.length > 0 && (
        <EditorialSection
          id="audiovisuales"
          title="Mira, escucha y descubre"
          subtitle="Registros documentales, ensayos y puestas en escena capturadas en video y reels por las iniciativas."
          variant="dark"
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

      {/* Sección 5.1 — Entrevistas en video y podcasts oficiales (YouTube) */}
      {podcastEntries.length > 0 && (
        <EditorialSection
          id="entrevistas-podcast"
          title="Entrevistas en formato falso podcast"
          subtitle="Conversaciones en video de entre 5 y 8 minutos con los responsables de las iniciativas ganadoras de Presupuesto Participativo."
          variant="secondary"
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

      {/* Sección 5.2 — Voces del territorio (únicamente si existen audios locales) */}
      {audioEntries.length > 0 && (
        <EditorialSection
          id="voces-del-territorio"
          title="Voces del territorio"
          subtitle="Testimonios sonoros y conversaciones con los protagonistas de las iniciativas culturales."
          variant="dark"
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

      {/* Sección 6 — Objetivos y propósito de Revelado Cultural (Documento Oficial) */}
      <EditorialSection
        id="objetivos"
        title="Objetivos del proyecto"
        subtitle="Propósito institucional y metas específicas de Revelado Cultural en la Comuna 11, Laureles–Estadio."
        variant="dark"
      >
        {/* Typographic Manifesto Wall: 3 High-Impact Editorial Rows */}
        <div className="divide-y divide-[#3D2254] border-y border-[#3D2254]">
          {/* Objetivo 1 */}
          <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-2 flex items-baseline gap-3">
              <span className="font-display font-black text-6xl sm:text-7xl text-[#F9C63C] leading-none select-none">
                01
              </span>
              <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold lg:hidden">
                Producción documental
              </span>
            </div>
            <div className="lg:col-span-10">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mb-3">
                Producción de contenidos audiovisuales y fotográficos
              </h3>
              <p className="text-base sm:text-lg text-[#D1C6DA] leading-relaxed max-w-4xl">
                Producir contenidos audiovisuales y fotográficos —reels, entrevistas en formato falso podcast y series fotográficas— que documenten y narrativicen la ejecución de ocho (8) proyectos ganadores de PP 2026 de la Comuna 11.
              </p>
              <div className="mt-4 flex items-center gap-3 font-mono-meta text-xs text-[#F9C63C]">
                <span>Cobertura: 8 iniciativas de Presupuesto Participativo</span>
              </div>
            </div>
          </div>

          {/* Objetivo 2 */}
          <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-2 flex items-baseline gap-3">
              <span className="font-display font-black text-6xl sm:text-7xl text-[#F9C63C] leading-none select-none">
                02
              </span>
              <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold lg:hidden">
                Circulación comunitaria
              </span>
            </div>
            <div className="lg:col-span-10">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mb-3">
                Circulación digital y acceso ciudadano abierto
              </h3>
              <p className="text-base sm:text-lg text-[#D1C6DA] leading-relaxed max-w-4xl">
                Circular los contenidos producidos a través de canales digitales propios y de los proyectos beneficiados, garantizando el acceso ciudadano a la oferta cultural del territorio.
              </p>
              <div className="mt-4 flex items-center gap-3 font-mono-meta text-xs text-[#F9C63C]">
                <span>Canales propios y comunitarios · Acceso libre permanente</span>
              </div>
            </div>
          </div>

          {/* Objetivo 3 */}
          <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-2 flex items-baseline gap-3">
              <span className="font-display font-black text-6xl sm:text-7xl text-[#F9C63C] leading-none select-none">
                03
              </span>
              <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold lg:hidden">
                Encuentro comunitario
              </span>
            </div>
            <div className="lg:col-span-10">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mb-3">
                Encuentro comunitario de cierre y alianzas
              </h3>
              <p className="text-base sm:text-lg text-[#D1C6DA] leading-relaxed max-w-4xl">
                Propiciar un encuentro comunitario de cierre que reúna a los agentes culturales de la comuna, los equipos de los proyectos cubiertos y la ciudadanía, socializando de forma colectiva los proyectos realizados y generando lazos y potenciales alianzas entre los diferentes actores culturales de la comuna 11.
              </p>
              <div className="mt-4 flex items-center gap-3 font-mono-meta text-xs text-[#F9C63C]">
                <span>Articulación territorial · Lazos y trabajo en red</span>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* Sección 7 — La cultura continúa */}
      <section className="relative w-full bg-[#170B25] border-b border-[#3D2254] py-16 sm:py-24 overflow-hidden">
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
