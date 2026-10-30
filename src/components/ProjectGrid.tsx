import React from "react";
import type { CulturalProject } from "../types/cultural";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: CulturalProject[];
  columns?: 2 | 3 | 4;
  aspect?: "square" | "editorial" | "wide";
  variant?: "standard" | "editorial-rhythm";
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  columns = 3,
  aspect = "square",
}) => {
  // 3 cards per row on desktop and tablet, exact same width for all cards
  const gridColsClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-6 lg:gap-8 items-stretch`}>
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={idx}
          aspect={aspect}
          featured={false}
          className="h-full"
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
