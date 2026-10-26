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
        <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-2">
          Archivo no encontrado
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#F2EFE8] mt-2">
          Esta historia no está disponible en esa dirección
        </h1>
        <p className="mt-4 text-base font-normal text-[#A7A39D]">
          Recorre el catálogo con las ocho iniciativas culturales de Laureles y
          Estadio.
        </p>
        <div className="mt-8">
          <Link
            to="/explorar"
            className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#C9321B]text-white text-base font-semibold shadow-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver al explorador</span>
          </Link>
        </div>
      </div>
    );
  }

  return <ProjectDetail project={project} allProjects={publishedProjects} />;
};

export default ProjectDetailPage;
