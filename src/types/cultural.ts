export type MediaType = "image" | "video" | "audio";

export type MediaAsset = {
  id: string;
  type: MediaType;
  title?: string;
  sourceUrl: string;
  publicUrl?: string;
  thumbnailUrl?: string;
  alt?: string;
  aspectRatio?: "9:16" | "16:9" | "4:3" | "1:1";
  provider?: "html5" | "instagram" | "drive";
  durationSeconds?: number;
  status: "pending" | "ready" | "unavailable";
};

export type CulturalProject = {
  id: string;
  slug: string;
  name: string;
  category: string | null;
  categoryNote?: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  leader: string | null;
  coverImage: string | null;
  media: MediaAsset[];
  featured: boolean;
  order: number;
  publicationStatus: "draft" | "published";
  gallerySource?: string | null;
  podcastStatus?: "pending" | "not_provided" | "ready";
  editorialHeadline?: string;
  contextualCta?: string;
  thematicGroup?: "sonido" | "territorio" | "movimiento";
};

export const CONFIRMED_CATEGORIES = [
  "Gestión cultural",
  "Artes escénicas",
  "Música",
  "Investigación",
  "Literatura",
  "Artes visuales y plásticas",
] as const;

export type ConfirmedCategory = (typeof CONFIRMED_CATEGORIES)[number];
