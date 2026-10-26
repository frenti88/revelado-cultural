import rawProjects from "./projects.json";
import {
  CONFIRMED_CATEGORIES,
  type ConfirmedCategory,
  type CulturalProject,
  type MediaAsset,
} from "../types/cultural";

export const initialProjects: CulturalProject[] = (
  rawProjects as CulturalProject[]
).sort((a, b) => a.order - b.order);

export { CONFIRMED_CATEGORIES, type ConfirmedCategory };

export function getResponsiveImageSet(url: string | null | undefined) {
  if (!url) return undefined;
  if (url.endsWith("-1200.webp")) {
    const small = url.replace("-1200.webp", "-480.webp");
    return `${small} 480w, ${url} 1200w`;
  }
  return undefined;
}

export function getProjectReadyImages(project: CulturalProject): MediaAsset[] {
  return project.media.filter(
    (m) => m.type === "image" && m.status === "ready" && Boolean(m.publicUrl)
  );
}

export function getProjectReadyVideos(project: CulturalProject): MediaAsset[] {
  return project.media.filter(
    (m) => m.type === "video" && m.status === "ready" && Boolean(m.sourceUrl || m.publicUrl)
  );
}

export function getProjectReadyAudios(project: CulturalProject): MediaAsset[] {
  return project.media.filter(
    (m) => m.type === "audio" && m.status === "ready" && Boolean(m.publicUrl)
  );
}

export const DISCIPLINE_META: Record<
  ConfirmedCategory,
  {
    code: string;
    subtitle: string;
    accentColor: string;
    posterGradient: string;
  }
> = {
  "Gestión cultural": {
    code: "Disciplina 01",
    subtitle: "Festivales de movimiento y sesiones abiertas de creación en vivo entre artistas del sector.",
    accentColor: "#BCE3AB",
    posterGradient: "from-[#170B25] via-[#201d36] to-[#37105F]",
  },
  "Artes escénicas": {
    code: "Disciplina 02",
    subtitle: "Obras en tablas donde el público toma la palabra y cambia lo que pasa en escena.",
    accentColor: "#F4BA9D",
    posterGradient: "from-[#170B25] via-[#2b1836] to-[#37105F]",
  },
  Música: {
    code: "Disciplina 03",
    subtitle: "Canciones grabadas en el barrio que nacieron de dibujos llevados al estudio.",
    accentColor: "#F5B0C8",
    posterGradient: "from-[#170B25] via-[#2e153b] to-[#5a1b55]",
  },
  Investigación: {
    code: "Disciplina 04",
    subtitle: "Caminatas para observar cómo han cambiado las casas y las calles con el paso de los años.",
    accentColor: "#F9E2A8",
    posterGradient: "from-[#170B25] via-[#291e36] to-[#37105F]",
  },
  Literatura: {
    code: "Disciplina 05",
    subtitle: "Dibujo sobre mesa de luz y relatos contados en viñetas.",
    accentColor: "#F7C69E",
    posterGradient: "from-[#170B25] via-[#2a1a36] to-[#37105F]",
  },
  "Artes visuales y plásticas": {
    code: "Disciplina 06",
    subtitle: "Trabajo con la imagen y el cuerpo en busca de lo propio.",
    accentColor: "#D9C2F5",
    posterGradient: "from-[#170B25] via-[#26153d] to-[#4c1c6e]",
  },
};

export function getDisciplineColor(category: string | null | undefined): {
  accentColor: string;
  posterGradient: string;
} {
  if (category && category in DISCIPLINE_META) {
    const meta = DISCIPLINE_META[category as ConfirmedCategory];
    return {
      accentColor: meta.accentColor,
      posterGradient: meta.posterGradient,
    };
  }
  return {
    accentColor: "#F9C63C",
    posterGradient: "from-[#170B25] via-[#29143B] to-[#37105F]",
  };
}
