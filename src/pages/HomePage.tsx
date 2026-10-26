import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Compass, MapPin, Sparkles } from "lucide-react";
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

  return (
    <div>
      {/* Sección 1 — Hero editorial inmersivo */}
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

      {/* Sección 3 — Ocho formas de vivir la cultura */}
      <EditorialSection
        id="catalogo"
        title="Ocho formas de vivir la cultura"
        subtitle="Música, improvisación teatral, danza, memoria barrial, relatos en viñetas y laboratorios visuales nacidos en las calles de Laureles y Estadio."
        variant="dark"
        action={
          <Link
            to="/explorar"
            className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#222222] hover:bg-[#2E2E2E] text-[#F2EFE8] text-base font-semibold border border-[#2E2E2E] hover:border-[#FF5C38] transition-colors"
          >
            <span>Explorar con filtros</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF5C38] icon-glide" aria-hidden="true" />
          </Link>
        }
      >
        <ProjectGrid projects={publishedProjects} columns={4} aspect="square" />
      </EditorialSection>

      {/* Sección 4 — Mira, escucha y descubre */}
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

      {/* Sección 4.1 — Voces del territorio (únicamente si existen audios disponibles) */}
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

      {/* Sección 5 — El barrio también cuenta historias */}
      <EditorialSection
        id="el-barrio"
        title="El barrio también cuenta historias"
        subtitle="Comuna 11, Laureles–Estadio: un territorio donde la creación artística convive con la memoria de sus calles, parques y comunidades."
        variant="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#151515] border border-[#2E2E2E] flex items-center justify-center text-[#FF5C38] mb-4">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F2EFE8]">
                Territorio de encuentro
              </h3>
              <p className="mt-3 text-sm text-[#A7A39D] leading-relaxed">
                Laureles–Estadio reúne una vibrante mezcla de teatros independientes, salas de ensayo, colectivos comunitarios y espacios urbanos que acogen la creación colectiva en Medellín.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2E2E2E] font-mono-meta text-xs text-[#FF5C38]">
              Comuna 11 · Medellín
            </div>
          </div>

          <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#151515] border border-[#2E2E2E] flex items-center justify-center text-[#FF5C38] mb-4">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F2EFE8]">
                Presupuesto Participativo
              </h3>
              <p className="mt-3 text-sm text-[#A7A39D] leading-relaxed">
                Las ocho iniciativas nacieron y se fortalecieron gracias al voto y la decisión ciudadana, canalizando recursos públicos hacia propuestas culturales concebidas desde el territorio.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2E2E2E] font-mono-meta text-xs text-[#FF5C38]">
              Convocatoria ciudadana
            </div>
          </div>

          <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#151515] border border-[#2E2E2E] flex items-center justify-center text-[#FF5C38] mb-4">
                <Compass className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F2EFE8]">
                Memoria y presente
              </h3>
              <p className="mt-3 text-sm text-[#A7A39D] leading-relaxed">
                Desde la investigación documental del patrimonio hasta la improvisación escénica contemporánea, cada proyecto aporta una capa viva a la historia cultural de la ciudad.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2E2E2E] font-mono-meta text-xs text-[#FF5C38]">
              Archivo vivo
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* Sección 6 — La cultura continúa */}
      <section className="w-full bg-[#151515] border-b border-[#2E2E2E] py-16 sm:py-24">
        <div className="layout-container text-center max-w-3xl mx-auto">
          <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-3">
            08 historias · Un solo territorio
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2EFE8] leading-tight">
            La cultura del barrio continúa con tu curiosidad.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#A7A39D] leading-relaxed">
            Explora las ocho fichas de proyectos, conoce a las personas y colectivos que las hacen posibles y descubre cómo cada iniciativa transforma la Comuna 11.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/explorar"
              className="btn-press inline-flex items-center gap-2 min-h-12 px-7 py-3 rounded-full bg-[#C9321B]text-white text-base font-semibold shadow-[0_6px_24px_rgba(235,68,42,0.35)] transition-colors"
            >
              <span>Explorar las 8 iniciativas</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2] icon-glide" aria-hidden="true" />
            </Link>
            <Link
              to="/acerca-de"
              className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#222222] hover:bg-[#2E2E2E] text-[#F2EFE8] text-base font-medium border border-[#2E2E2E] hover:border-[#FF5C38] transition-colors"
            >
              <span>Acerca de Revelado Cultural</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;