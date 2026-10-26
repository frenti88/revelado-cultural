import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import ProjectGrid from "./ProjectGrid";

interface RelatedProjectsProps {
  currentProject: CulturalProject;
  allProjects: CulturalProject[];
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  currentProject,
  allProjects,
}) => {
  const related = allProjects
    .filter((p) => p.id !== currentProject.id)
    .sort((a, b) => {
      // Prioritize same thematic group or category
      const aSameGroup =
        Boolean(currentProject.thematicGroup) &&
        a.thematicGroup === currentProject.thematicGroup;
      const bSameGroup =
        Boolean(currentProject.thematicGroup) &&
        b.thematicGroup === currentProject.thematicGroup;
      if (aSameGroup !== bSameGroup) {
        return aSameGroup ? -1 : 1;
      }
      return a.order - b.order;
    })
    .slice(0, 2);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-projects-heading"
      className="w-full section-macro border-t border-[#3D2254] bg-[#170B25]"
    >
      <div className="layout-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 lg:mb-12 border-b border-[#3D2254]">
          <div>
            <span className="font-mono-meta text-xs uppercase tracking-widest text-[#F9C63C] font-bold block mb-2">
              06 — Sigue descubriendo
            </span>
            <h2
              id="related-projects-heading"
              className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#FAF6FB]"
            >
              Historias que también transforman el barrio
            </h2>
          </div>

          <Link
            to="/explorar"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F9C63C] hover:underline"
          >
            <span>Ver las 8 iniciativas</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.4]" aria-hidden="true" />
          </Link>
        </div>

        <ProjectGrid projects={related} columns={2} aspect="square" />
      </div>
    </section>
  );
};

export default RelatedProjects;
