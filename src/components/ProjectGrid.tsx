import React from "react";
import type { CulturalProject } from "../types/cultural";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: CulturalProject[];
  columns?: 2 | 3 | 4;
  aspect?: "square" | "editorial";
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  columns = 4,
  aspect = "square",
}) => {
  const gridColsClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid ${gridColsClass} gap-6 lg:gap-8 items-stretch`}>
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={idx}
          aspect={aspect}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
