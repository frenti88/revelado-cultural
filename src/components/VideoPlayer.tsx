import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Film, Play } from "lucide-react";
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
      <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_32px_rgba(14,6,23,0.5)]">
        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 font-mono-meta text-xs text-[#F9C63C] font-bold">
              <Film className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
              <span>
                {projectNumber ? `${projectNumber} / 08 · ` : ""}Video documental
              </span>
            </div>
            {compact && category && (
              <span className="font-mono-meta text-[11px] text-[#B184D5] uppercase tracking-wider font-semibold">
                {category}
              </span>
            )}
          </div>

          <div
            className={`relative mx-auto w-full ${
              isVertical ? "max-w-[304px] aspect-[9/16]" : "aspect-video"
            } rounded-xl overflow-hidden bg-[#170B25] border border-[#3D2254] shadow-lg`}
          >
            <video
              controls
              playsInline
              preload={asset.thumbnailUrl ? "none" : "metadata"}
              poster={asset.thumbnailUrl}
              aria-label={asset.title ?? `Video de ${projectName ?? "iniciativa"}`}
              className="w-full h-full object-cover bg-[#170B25]"
            >
              <source src={asset.publicUrl} type="video/mp4" />
              Tu navegador no admite reproducción directa de video HTML5.
            </video>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-[#3D2254] flex flex-col gap-2">
          {projectName && compact && projectSlug && (
            <div className="flex items-center justify-between gap-2">
              <Link
                to={`/proyectos/${projectSlug}`}
                className="font-display font-black text-base text-[#FAF6FB] hover:text-[#F9C63C] transition-colors"
              >
                {projectName}
              </Link>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-meta">
            <span className="text-[#D1C6DA]">
              Reproducción interna
            </span>

            {projectSlug && compact && (
              <Link
                to={`/proyectos/${projectSlug}`}
                className="inline-flex items-center gap-1 font-bold text-sm text-[#FAF6FB] hover:text-[#F9C63C] transition-colors ml-auto"
              >
                <span>Ver historia</span>
                <ArrowUpRight className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Authorized Vertical Reel Card when hosted on Instagram
  return (
    <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-5 sm:p-6 flex flex-col justify-between shadow-[0_12px_32px_rgba(14,6,23,0.5)]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 font-mono-meta text-xs text-[#F9C63C] font-bold">
            <Film className="w-3.5 h-3.5 stroke-[2.2]" aria-hidden="true" />
            <span>
              {projectNumber ? `${projectNumber} / 08 · ` : ""}
              {isInstagram ? "Reel · Instagram" : "Reel documental"}
            </span>
          </div>
          {compact && category && (
            <span className="font-mono-meta text-[11px] text-[#B184D5] uppercase tracking-wider font-semibold">
              {category}
            </span>
          )}
        </div>

        {/* 9:16 Vertical Frame with Optical Viewfinder Corners */}
        <a
          href={asset.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver reel de ${projectName ?? asset.title} en ${
            isInstagram ? "Instagram" : "su fuente original"
          } (abre en nueva pestaña)`}
          className={`group block relative mx-auto w-full ${
            isVertical ? "max-w-[304px] aspect-[9/16]" : "aspect-video"
          } rounded-xl overflow-hidden bg-[#170B25] border border-[#3D2254] hover:border-[#F9C63C] transition-all duration-300 hover:scale-[1.015]`}
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
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#170B25]/95 via-[#170B25]/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-b from-[#170B25] via-[#29143B] to-[#3D2254]">
              <div className="flex items-center justify-between font-mono-meta text-xs text-[#D1C6DA]">
                <span>Instagram</span>
                <span>Reel</span>
              </div>

              <div className="my-auto">
                <span
                  className="font-display font-black text-5xl text-[#FAF6FB]/15 block leading-none"
                  aria-hidden="true"
                >
                  {projectNumber ?? "01"}
                </span>
                {compact && (
                  <span className="font-display font-bold text-lg text-[#FAF6FB] mt-2 leading-tight block">
                    {projectName ?? asset.title}
                  </span>
                )}
              </div>

              <div className="pt-4 font-mono-meta text-xs text-[#D1C6DA]">
                Comuna 11
              </div>
            </div>
          )}

          {/* Bottom Callout inside 9:16 frame */}
          <div className="absolute bottom-4 inset-x-4">
            <span className="w-full inline-flex items-center justify-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#F9C63C] text-[#170B25] text-sm font-bold shadow-lg transition-colors group-hover:bg-[#EAB428]">
              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>Ver reel en Instagram</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
            </span>
          </div>
        </a>
      </div>

      {/* Footer Info (only when compact on the Home page) */}
      {compact && projectSlug && (
        <div className="mt-5 pt-4 border-t border-[#3D2254] flex items-center justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/proyectos/${projectSlug}`}
              className="font-display font-bold text-base text-[#FAF6FB] hover:text-[#F9C63C] transition-colors block truncate"
            >
              {projectName ?? asset.title}
            </Link>
          </div>

          <Link
            to={`/proyectos/${projectSlug}`}
            className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-[#D1C6DA] hover:text-[#F9C63C] transition-colors"
          >
            <span>Ver historia</span>
            <ArrowUpRight className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
