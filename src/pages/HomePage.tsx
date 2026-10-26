import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import {
  getProjectReadyAudios,
  getProjectReadyVideos,
} from "../data/catalog";
import EditorialHero from "../components/EditorialHero";
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
      {/* 1. Hero Principal ("Qué es" + vista previa fotográfica) */}
      <EditorialHero projects={publishedProjects} />

      {/* 2. Las 8 Iniciativas del documento */}
      <EditorialSection
        id="catalogo"
        title="Las 8 iniciativas"
        variant="dark"
        action={
          <Link
            to="/explorar"
            className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#211820] hover:bg-[#742940] text-[#F5F0E7] text-base font-medium"
          >
            <span>Abrir buscador y filtros</span>
            <ArrowUpRight className="w-4 h-4 text-[#A8B69C] icon-glide" aria-hidden="true" />
          </Link>
        }
      >
        <ProjectGrid projects={publishedProjects} columns={4} aspect="square" />
      </EditorialSection>

      {/* 3. Reels incluidos en el documento */}
      {reelEntries.length > 0 && (
        <EditorialSection
          id="audiovisuales"
          title="Reels de las iniciativas"
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

      {/* 4. Audio (únicamente si hay audios publicados) */}
      {audioEntries.length > 0 && (
        <EditorialSection
          id="voces-del-territorio"
          title="Voces del territorio"
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
    </div>
  );
};

export default HomePage;
