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
    accentColor: "#A8B69C",
    posterGradient: "from-[#161317] via-[#1d221c] to-[#482332]/85",
  },
  "Artes escénicas": {
    code: "Disciplina 02",
    subtitle: "Obras en tablas donde el público toma la palabra y cambia lo que pasa en escena.",
    accentColor: "#E49B7E",
    posterGradient: "from-[#161317] via-[#281b19] to-[#5e2730]/85",
  },
  Música: {
    code: "Disciplina 03",
    subtitle: "Canciones grabadas en el barrio que nacieron de dibujos llevados al estudio.",
    accentColor: "#E598B0",
    posterGradient: "from-[#161317] via-[#261822] to-[#63243b]/85",
  },
  Investigación: {
    code: "Disciplina 04",
    subtitle: "Caminatas para observar cómo han cambiado las casas y las calles con el paso de los años.",
    accentColor: "#E2C286",
    posterGradient: "from-[#161317] via-[#241f18] to-[#523428]/85",
  },
  Literatura: {
    code: "Disciplina 05",
    subtitle: "Dibujo sobre mesa de luz y relatos contados en viñetas.",
    accentColor: "#E8B486",
    posterGradient: "from-[#161317] via-[#261d17] to-[#592d25]/85",
  },
  "Artes visuales y plásticas": {
    code: "Disciplina 06",
    subtitle: "Trabajo con la imagen y el cuerpo en busca de lo propio.",
    accentColor: "#C8B5DC",
    posterGradient: "from-[#161317] via-[#201b27] to-[#482332]/85",
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
    accentColor: "#DDB09A",
    posterGradient: "from-[#161317] via-[#251b1d] to-[#482332]/80",
  };
}
