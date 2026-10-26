import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Film } from "lucide-react";
import type { MediaAsset } from "../types/cultural";

interface VideoPlayerProps {
  asset: MediaAsset;
  projectName?: string;
  projectSlug?: string;
  projectNumber?: string;
  category?: string | null;
  compact?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  asset,
  projectName,
  projectSlug,
  projectNumber,
  category,
  compact = false,
}) => {
  if (asset.status !== "ready") {
    return null;
  }

  const isVertical = (asset.aspectRatio ?? "9:16") === "9:16";
  const isInstagram =
    asset.provider === "instagram" || asset.sourceUrl.includes("instagram.com");
  const hasStreamableVideo = Boolean(asset.publicUrl);

  // 1. Real HTML5 video player when an authorized streaming-ready file is available
  if (hasStreamableVideo) {
    return (
      <div className="rounded-xl bg-[#211820] p-6 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 font-mono-meta text-xs text-[#A8B69C]">
            <Film className="w-4 h-4" aria-hidden="true" />
            <span>
              {projectNumber ? `${projectNumber} / 08 · ` : ""}Reel (9:16)
            </span>
          </div>
          {compact && category && (
            <span className="font-mono-meta text-xs text-[#D8CDC8]">
              {category}
            </span>
          )}
        </div>

        <div
          className={`relative mx-auto w-full ${
            isVertical ? "max-w-[304px] aspect-[9/16]" : "aspect-video"
          } rounded-lg overflow-hidden bg-[#161317] shadow-lg`}
        >
          <video
            controls
            playsInline
            preload={asset.thumbnailUrl ? "none" : "metadata"}
            poster={asset.thumbnailUrl}
            aria-label={asset.title ?? `Video de ${projectName ?? "iniciativa"}`}
            className="w-full h-full object-cover bg-[#161317]"
          >
            <source src={asset.publicUrl} type="video/mp4" />
            Tu navegador no admite reproducción directa de video HTML5.
          </video>
        </div>

        <div className="mt-6 pt-4 border-t border-[#433840]/60 flex flex-col gap-2">
          {projectName && compact && projectSlug && (
            <div className="flex items-center justify-between gap-2">
              <Link
                to={`/proyectos/${projectSlug}`}
                className="font-display font-semibold text-base sm:text-lg text-[#F5F0E7] hover:text-[#A8B69C] transition-colors"
              >
                {projectName}
              </Link>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            {isInstagram && (
              <a
                href={asset.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono-meta text-xs text-[#A8B69C] hover:text-[#F5F0E7] transition-colors"
              >
                <span>Ver reel en Instagram</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {projectSlug && compact && (
              <Link
                to={`/proyectos/${projectSlug}`}
                className="inline-flex items-center gap-1 font-medium text-sm text-[#F5F0E7] hover:text-[#A8B69C] transition-colors ml-auto"
              >
                <span>Ir a la ficha</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Authorized Vertical Reel Card when hosted on Instagram (no fake player controls)
  return (
    <div className="rounded-xl bg-[#211820] p-6 flex flex-col justify-between shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 font-mono-meta text-xs text-[#A8B69C]">
            <Film className="w-4 h-4" aria-hidden="true" />
            <span>
              {projectNumber ? `${projectNumber} / 08 · ` : ""}
              {isInstagram ? "Reel · Instagram" : "Reel"}
            </span>
          </div>
          {compact && category && (
            <span className="font-mono-meta text-xs text-[#D8CDC8]">
              {category}
            </span>
          )}
        </div>

        {/* 9:16 Vertical Frame with Authorized Thumbnail or Editorial Darkroom Poster */}
        <a
          href={asset.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver reel de ${projectName ?? asset.title} en ${
            isInstagram ? "Instagram" : "su fuente original"
          } (abre en nueva pestaña)`}
          className={`group block relative mx-auto w-full ${
            isVertical ? "max-w-[304px] aspect-[9/16]" : "aspect-video"
          } rounded-lg overflow-hidden bg-[#161317] transition-transform duration-300 hover:scale-[1.01]`}
        >
          {asset.thumbnailUrl ? (
            <>
              <img
                src={asset.thumbnailUrl}
                alt={
                  asset.alt ??
                  `Miniatura autorizada del reel de ${projectName ?? asset.title}`
                }
                width={540}
                height={960}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161317] via-[#161317]/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#161317] via-[#211820] to-[#482332]/85">
              <div className="flex items-center justify-between font-mono-meta text-xs text-[#A8B69C]">
                <span>Instagram</span>
                <span>Reel</span>
              </div>

              <div className="my-auto">
                <span
                  className="font-display font-extrabold text-5xl text-[#F5F0E7]/15 block leading-none"
                  aria-hidden="true"
                >
                  {projectNumber ?? "01"}
                </span>
                {compact && (
                  <span className="font-display font-semibold text-lg text-[#F5F0E7] mt-2 leading-tight block">
                    {projectName ?? asset.title}
                  </span>
                )}
              </div>

              <div className="pt-4 font-mono-meta text-xs text-[#D8CDC8]/75">
                Comuna 11
              </div>
            </div>
          )}

          {/* Bottom Callout inside 9:16 frame */}
          <div className="absolute bottom-4 inset-x-4">
            <span className="w-full inline-flex items-center justify-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#742940] group-hover:bg-[#8c324e] text-[#F5F0E7] text-sm font-medium shadow-lg transition-colors">
              <span>Ver reel en Instagram</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </div>
        </a>
      </div>

      {/* Footer Info (only when compact on the Home page) */}
      {compact && projectSlug && (
        <div className="mt-6 pt-4 border-t border-[#433840]/60 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/proyectos/${projectSlug}`}
              className="font-display font-semibold text-base text-[#F5F0E7] hover:text-[#A8B69C] transition-colors block truncate"
            >
              {projectName ?? asset.title}
            </Link>
          </div>

          <Link
            to={`/proyectos/${projectSlug}`}
            className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-[#A8B69C] hover:text-[#F5F0E7]"
          >
            <span>Ir a la ficha</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
