import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import ProjectDetail from "../components/ProjectDetail";

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { publishedProjects, allProjects } = useCatalog();

  const project =
    publishedProjects.find((p) => p.slug === slug) ??
    allProjects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.name} (${project.id}/08) · Revelado Cultural`;
    } else {
      document.title = "Proyecto no encontrado · Revelado Cultural";
    }
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
        <span className="font-mono-meta text-xs font-medium text-[#A8B69C]">
          Archivo no encontrado
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F0E7] mt-2">
          Esta historia no está disponible en esa dirección
        </h1>
        <p className="mt-4 text-base font-normal text-[#D8CDC8]">
          Recorre el catálogo con las ocho iniciativas culturales de Laureles y
          Estadio.
        </p>
        <div className="mt-6">
          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a explorar</span>
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectDetail project={project} allProjects={publishedProjects} />;
};

export default ProjectDetailPage;
