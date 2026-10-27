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
  columns = 4,
  aspect = "square",
  variant = "standard",
}) => {
  const isRhythm = variant === "editorial-rhythm" && projects.length === 8;

  const gridColsClass = isRhythm
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    : columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid ${gridColsClass} gap-6 lg:gap-8 items-stretch`}>
      {projects.map((project, idx) => {
        let spanClass = "";
        let isFeatured = false;

        if (isRhythm) {
          if (idx === 0) {
            // Card 01 — Arché: Apertura con gran presencia cinematográfica
            spanClass = "sm:col-span-2 lg:col-span-2";
            isFeatured = true;
          } else if (idx === 5) {
            // Card 06 — Pensar, narrar y habitar: Ancla visual derecha
            spanClass = "sm:col-span-2 lg:col-span-2";
            isFeatured = true;
          } else if (idx === 6 || idx === 7) {
            // Cards 07 y 08: Base editorial equilibrada
            spanClass = "sm:col-span-1 lg:col-span-2";
          }
        }

        return (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            aspect={aspect}
            featured={isFeatured}
            className={spanClass}
          />
        );
      })}
    </div>
  );
};

export default ProjectGrid;
