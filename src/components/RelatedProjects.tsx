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
      const aSameCategory =
        Boolean(currentProject.category) &&
        a.category === currentProject.category;
      const bSameCategory =
        Boolean(currentProject.category) &&
        b.category === currentProject.category;
      if (aSameCategory !== bSameCategory) {
        return aSameCategory ? -1 : 1;
      }
      return a.order - b.order;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-projects-heading"
      className="w-full section-macro border-t border-[#433840] bg-[#161317]"
    >
      <div className="layout-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 lg:mb-12 border-b border-[#433840]">
          <div>
            <h2
              id="related-projects-heading"
              className="font-display font-bold text-heading-fluid text-[#F5F0E7]"
            >
              Otras historias del territorio
            </h2>
          </div>

          <Link
            to="/explorar"
            className="inline-flex items-center gap-2 text-base font-medium text-[#A8B69C] hover:text-[#F5F0E7] transition-colors"
          >
            <span>Ver las 8 iniciativas</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <ProjectGrid projects={related} columns={3} aspect="square" />
      </div>
    </section>
  );
};

export default RelatedProjects;
