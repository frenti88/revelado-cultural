import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import type { MediaAsset } from "../types/cultural";
import { getResponsiveImageSet } from "../data/catalog";

interface MediaGalleryProps {
  images: MediaAsset[];
  projectName: string;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  images,
  projectName,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const safeIndex = activeIndex < images.length ? activeIndex : 0;
  const currentImage = images[safeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightboxOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightboxOpen]);

  if (!images || images.length === 0 || !currentImage) {
    return null;
  }

  const openLightbox = (index: number, buttonEl: HTMLButtonElement | null) => {
    triggerRef.current = buttonEl;
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    triggerRef.current?.focus();
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || images.length <= 1) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 44 && deltaY < 64) {
      if (deltaX < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Featured Gallery Stage */}
      <div className="rounded-xl bg-[#211820] p-4 sm:p-6 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#161317] touch-pan-y"
        >
          <img
            key={currentImage.id}
            src={currentImage.publicUrl}
            srcSet={getResponsiveImageSet(currentImage.publicUrl)}
            sizes="(max-width: 1024px) 94vw, 65vw"
            alt={
              currentImage.alt ??
              `Fotografía ${safeIndex + 1} de ${projectName}`
            }
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover photo-reveal"
          />

          <button
            type="button"
            onClick={(e) => openLightbox(safeIndex, e.currentTarget)}
            aria-label={`Abrir en pantalla completa: ${
              currentImage.alt ?? projectName
            }`}
            className="btn-press absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full bg-[#161317]/90 hover:bg-[#742940] text-[#F5F0E7] text-xs font-medium cursor-pointer"
          >
            <Expand className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
            <span>Ampliar</span>
          </button>

          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Fotografía anterior"
                className="btn-press w-11 h-11 inline-flex items-center justify-center rounded-full bg-[#161317]/90 hover:bg-[#742940] text-[#F5F0E7] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Fotografía siguiente"
                className="btn-press w-11 h-11 inline-flex items-center justify-center rounded-full bg-[#161317]/90 hover:bg-[#742940] text-[#F5F0E7] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Counter Bar */}
        <motion.div
          key={currentImage.id}
          initial={shouldReduceMotion ? false : { y: 4 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          className="mt-4 flex items-center justify-between gap-2"
        >
          <span className="font-mono-meta text-xs text-[#A8B69C]">
            Fotografía 0{safeIndex + 1} / 0{images.length}
          </span>
        </motion.div>

        {/* Interactive Thumbnails Strip */}
        {images.length > 1 && (
          <div
            className="mt-4 pt-4 border-t border-[#433840]/60 grid grid-cols-4 gap-2 sm:gap-4"
            role="group"
            aria-label={`Miniaturas de la galería de ${projectName}`}
          >
            {images.map((img, idx) => {
              const isSelected = idx === safeIndex;
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={(e) => {
                    if (isSelected) {
                      openLightbox(idx, e.currentTarget);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  onDoubleClick={(e) => openLightbox(idx, e.currentTarget)}
                  aria-pressed={isSelected}
                  aria-label={`Seleccionar fotografía ${idx + 1}: ${
                    img.alt ?? projectName
                  }`}
                  className={`group relative aspect-[4/3] rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "opacity-100 scale-[1.02] shadow-lg"
                      : "opacity-55 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.thumbnailUrl ?? img.publicUrl}
                    alt=""
                    width={320}
                    height={240}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {isSelected && !shouldReduceMotion && (
                    <motion.span
                      layoutId="gallery-thumb-loupe"
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 rounded-md ring-2 ring-inset ring-[#A8B69C] pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`absolute bottom-1 right-1 px-2 py-0.5 rounded font-mono-meta text-[10px] font-semibold ${
                      isSelected
                        ? "bg-[#742940] text-[#F5F0E7]"
                        : "bg-[#161317]/85 text-[#F5F0E7]"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Accessible Lightbox Modal */}
      <dialog
        ref={dialogRef}
        aria-label={`Visor de fotografías de ${projectName}`}
        onCancel={(e) => {
          e.preventDefault();
          closeLightbox();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeLightbox();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goPrev();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goNext();
          } else if (e.key === "Escape") {
            e.preventDefault();
            closeLightbox();
          }
        }}
        className="editorial-lightbox fixed inset-0 z-50 m-auto w-[95vw] max-w-5xl max-h-[92dvh] overflow-y-auto rounded-2xl bg-[#161317] text-[#F5F0E7] p-4 sm:p-6 shadow-2xl"
      >
        {lightboxOpen && (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#433840]/60">
              <div>
                <span className="font-mono-meta text-xs text-[#A8B69C]">
                  0{safeIndex + 1} / 0{images.length}
                </span>
                <h4 className="font-display font-bold text-lg text-[#F5F0E7]">
                  {projectName}
                </h4>
              </div>
              <button
                type="button"
                autoFocus
                onClick={closeLightbox}
                aria-label="Cerrar visor de galería"
                className="btn-press inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#742940] text-[#F5F0E7] text-sm font-medium cursor-pointer"
              >
                <span>Cerrar</span>
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex items-center justify-center bg-[#0e0c0f] rounded-xl overflow-hidden min-h-[160px] sm:min-h-[264px] max-h-[58dvh] sm:max-h-[72dvh]">
              <img
                src={currentImage.publicUrl}
                alt={currentImage.alt ?? projectName}
                className="max-h-[56dvh] sm:max-h-[70dvh] w-auto object-contain"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Fotografía anterior"
                  className="btn-press inline-flex items-center gap-1 min-h-11 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#742940] text-sm font-medium cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Fotografía siguiente"
                  className="btn-press inline-flex items-center gap-1 min-h-11 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#742940] text-sm font-medium cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
};

export default MediaGallery;
