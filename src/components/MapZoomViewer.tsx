import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Maximize2,
  Crosshair,
  Hand,
  Sparkles,
} from "lucide-react";

interface MapZoomViewerProps {
  imageSrc: string;
  highResSrc: string;
  alt: string;
  onOpenFullscreen?: () => void;
  isFullscreen?: boolean;
}

export const MapZoomViewer: React.FC<MapZoomViewerProps> = ({
  imageSrc,
  highResSrc,
  alt,
  onOpenFullscreen,
  isFullscreen = false,
}) => {
  // Modes: "pan" (drag & zoom whole map) or "loupe" (magnifying glass lens)
  const [mode, setMode] = useState<"pan" | "loupe">("pan");

  // Pan & Zoom state
  const [scale, setScale] = useState<number>(1);
  const [translate, setTranslate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const translateStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Loupe (Magnifier Lens) state
  const [isLoupeHovered, setIsLoupeHovered] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [loupeBg, setLoupeBg] = useState<{ sizeX: number; sizeY: number; posX: number; posY: number }>({
    sizeX: 0,
    sizeY: 0,
    posX: 0,
    posY: 0,
  });
  const [loupeZoom, setLoupeZoom] = useState<number>(2.8); // 2.8x magnification

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Loupe dimensions
  const LOUPE_SIZE = 220; // 220px diameter circle

  // Reset Pan/Zoom
  const handleReset = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // Clamp translation so image doesn't get dragged away completely
  const clampTranslate = useCallback(
    (x: number, y: number, currentScale: number) => {
      if (!containerRef.current || !imageRef.current || currentScale <= 1) {
        return { x: 0, y: 0 };
      }
      const container = containerRef.current.getBoundingClientRect();
      const img = imageRef.current.getBoundingClientRect();

      // Maximum bounds with generous padding
      const maxDragX = (img.width * currentScale - container.width) / 2 + 60;
      const maxDragY = (img.height * currentScale - container.height) / 2 + 60;

      const clampedX = Math.max(-maxDragX, Math.min(maxDragX, x));
      const clampedY = Math.max(-maxDragY, Math.min(maxDragY, y));

      return { x: clampedX, y: clampedY };
    },
    []
  );

  // Zoom in / out controls
  const handleZoom = useCallback(
    (delta: number) => {
      setScale((prevScale) => {
        const nextScale = Math.min(4.5, Math.max(1, +(prevScale + delta).toFixed(2)));
        if (nextScale === 1) {
          setTranslate({ x: 0, y: 0 });
        } else {
          setTranslate((prevTrans) => clampTranslate(prevTrans.x, prevTrans.y, nextScale));
        }
        return nextScale;
      });
    },
    [clampTranslate]
  );

  // Mouse wheel zoom (Pan mode) or Magnifier zoom (Loupe mode)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (mode === "loupe") {
      // Adjust loupe magnification power
      const zoomDelta = e.deltaY < 0 ? 0.3 : -0.3;
      setLoupeZoom((prev) => Math.min(5.0, Math.max(1.8, +(prev + zoomDelta).toFixed(1))));
      return;
    }

    // Pan mode: zoom in / out towards mouse pointer
    const zoomFactor = e.deltaY < 0 ? 0.25 : -0.25;
    handleZoom(zoomFactor);
  };

  // Dragging start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === "loupe") return;
    if (scale <= 1) return; // Only drag when zoomed in

    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    translateStartRef.current = { ...translate };
  };

  // Dragging move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mode === "loupe") {
      setIsLoupeHovered(true);
      setLoupePos({ x: mouseX, y: mouseY });

      // Precise pixel alignment for the magnifying lens
      if (imageRef.current) {
        const imgRect = imageRef.current.getBoundingClientRect();
        const imgX = e.clientX - imgRect.left;
        const imgY = e.clientY - imgRect.top;

        const bgWidth = imgRect.width * loupeZoom;
        const bgHeight = imgRect.height * loupeZoom;
        const bgPosX = -(imgX * loupeZoom - LOUPE_SIZE / 2);
        const bgPosY = -(imgY * loupeZoom - LOUPE_SIZE / 2);

        setLoupeBg({
          sizeX: Math.round(bgWidth),
          sizeY: Math.round(bgHeight),
          posX: Math.round(bgPosX),
          posY: Math.round(bgPosY),
        });
      }
      return;
    }

    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const targetX = translateStartRef.current.x + dx;
    const targetY = translateStartRef.current.y + dy;

    setTranslate(clampTranslate(targetX, targetY, scale));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsLoupeHovered(false);
  };

  // Double click to toggle quick zoom
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === "loupe") return;
    if (scale > 1) {
      handleReset();
    } else {
      setScale(2.2);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const offsetX = (centerX - clickX) * 1.2;
        const offsetY = (centerY - clickY) * 1.2;
        setTranslate(clampTranslate(offsetX, offsetY, 2.2));
      }
    }
  };

  // Touch Support (for mobile & tablets)
  const touchStartRef = useRef<{ x: number; y: number; dist?: number }>({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (mode === "loupe" && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsLoupeHovered(true);
        // Position loupe slightly above touch point so finger doesn't block the lens
        setLoupePos({ x: touch.clientX - rect.left, y: touch.clientY - rect.top - 60 });

        if (imageRef.current) {
          const imgRect = imageRef.current.getBoundingClientRect();
          const imgX = touch.clientX - imgRect.left;
          const imgY = touch.clientY - imgRect.top;

          const bgWidth = imgRect.width * loupeZoom;
          const bgHeight = imgRect.height * loupeZoom;
          const bgPosX = -(imgX * loupeZoom - LOUPE_SIZE / 2);
          const bgPosY = -(imgY * loupeZoom - LOUPE_SIZE / 2);

          setLoupeBg({
            sizeX: Math.round(bgWidth),
            sizeY: Math.round(bgHeight),
            posX: Math.round(bgPosX),
            posY: Math.round(bgPosY),
          });
        }
      } else if (scale > 1) {
        setIsDragging(true);
        dragStartRef.current = { x: touch.clientX, y: touch.clientY };
        translateStartRef.current = { ...translate };
      }
    } else if (e.touches.length === 2 && mode === "pan") {
      // Pinch to zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        dist,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (mode === "loupe" && e.touches.length === 1 && containerRef.current) {
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      // Position loupe slightly above finger
      setLoupePos({ x: touchX, y: touchY - 60 });

      if (imageRef.current) {
        const imgRect = imageRef.current.getBoundingClientRect();
        const imgX = touch.clientX - imgRect.left;
        const imgY = touch.clientY - imgRect.top;

        const bgWidth = imgRect.width * loupeZoom;
        const bgHeight = imgRect.height * loupeZoom;
        const bgPosX = -(imgX * loupeZoom - LOUPE_SIZE / 2);
        const bgPosY = -(imgY * loupeZoom - LOUPE_SIZE / 2);

        setLoupeBg({
          sizeX: Math.round(bgWidth),
          sizeY: Math.round(bgHeight),
          posX: Math.round(bgPosX),
          posY: Math.round(bgPosY),
        });
      }
      return;
    }

    if (mode === "pan" && e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const dx = touch.clientX - dragStartRef.current.x;
      const dy = touch.clientY - dragStartRef.current.y;
      setTranslate(clampTranslate(translateStartRef.current.x + dx, translateStartRef.current.y + dy, scale));
      return;
    }

    if (mode === "pan" && e.touches.length === 2 && touchStartRef.current.dist) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / touchStartRef.current.dist;
      const newScale = Math.min(4.5, Math.max(1, +(scale * ratio).toFixed(2)));
      setScale(newScale);
      touchStartRef.current.dist = dist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (mode === "loupe") {
      setIsLoupeHovered(false);
    }
  };

  // Keyboard navigation (+, -, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "+" || e.key === "=") handleZoom(0.3);
      if (e.key === "-" || e.key === "_") handleZoom(-0.3);
      if (e.key === "0" || e.key === "Escape") handleReset();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleZoom, handleReset]);

  return (
    <div className="relative w-full flex flex-col rounded-2xl bg-[#170B25] border border-[#3D2254] overflow-hidden shadow-2xl">
      {/* 1. Header Toolbar with Controls */}
      <div className="px-4 py-3 bg-[#211033] border-b border-[#3D2254] flex flex-wrap items-center justify-between gap-3 z-20">
        {/* Left: Mode Switcher (Pan / Lupa) */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#170B25] border border-[#3D2254]">
          <button
            type="button"
            onClick={() => {
              setMode("pan");
              setIsLoupeHovered(false);
            }}
            className={`btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-meta font-semibold transition-all ${
              mode === "pan"
                ? "bg-[#F9C63C] text-[#170B25] shadow-sm font-bold"
                : "text-[#D1C6DA] hover:text-[#FAF6FB]"
            }`}
            title="Modo exploración: acerca y arrastra todo el mapa"
          >
            <Hand className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Explorar y Mover</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("loupe");
              handleReset(); // Reset whole map fit when entering loupe
            }}
            className={`btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-meta font-semibold transition-all ${
              mode === "loupe"
                ? "bg-[#F9C63C] text-[#170B25] shadow-sm font-bold"
                : "text-[#D1C6DA] hover:text-[#FAF6FB]"
            }`}
            title="Modo lupa: magnifica zonas específicas con lente de aumento"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Modo Lupa</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] rounded bg-[#37105F] text-[#F9C63C] border border-[#583178]">
              {loupeZoom}x
            </span>
          </button>
        </div>

        {/* Right: Zoom Level Controls & Fullscreen */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {mode === "pan" ? (
            <>
              <div className="flex items-center bg-[#170B25] border border-[#3D2254] rounded-xl p-1 gap-1">
                <button
                  type="button"
                  onClick={() => handleZoom(-0.4)}
                  disabled={scale <= 1}
                  className="btn-press p-1.5 rounded-lg text-[#FAF6FB] hover:bg-[#29143B] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  aria-label="Alejar mapa"
                  title="Alejar (-)"
                >
                  <ZoomOut className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
                </button>

                <span className="font-mono-meta text-xs text-[#FAF6FB] font-bold px-2.5 min-w-[56px] text-center">
                  {Math.round(scale * 100)}%
                </span>

                <button
                  type="button"
                  onClick={() => handleZoom(0.4)}
                  disabled={scale >= 4.5}
                  className="btn-press p-1.5 rounded-lg text-[#FAF6FB] hover:bg-[#29143B] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  aria-label="Acercar mapa"
                  title="Acercar (+)"
                >
                  <ZoomIn className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                disabled={scale === 1 && translate.x === 0 && translate.y === 0}
                className="btn-press p-2 rounded-xl bg-[#170B25] border border-[#3D2254] hover:border-[#F9C63C] text-[#FAF6FB] disabled:opacity-40 disabled:pointer-events-none text-xs font-mono-meta flex items-center gap-1.5 transition-colors"
                title="Restablecer vista (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            </>
          ) : (
            /* Loupe Magnifier Zoom Stepper */
            <div className="flex items-center bg-[#170B25] border border-[#3D2254] rounded-xl p-1 gap-1.5 text-xs font-mono-meta">
              <span className="text-[#A697B3] px-1 text-[11px] hidden sm:inline">Aumento:</span>
              {[2.0, 2.8, 3.8].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setLoupeZoom(z)}
                  className={`btn-press px-2 py-1 rounded-lg transition-all ${
                    loupeZoom === z
                      ? "bg-[#F9C63C] text-[#170B25] font-bold"
                      : "text-[#D1C6DA] hover:text-[#FAF6FB] bg-[#29143B]"
                  }`}
                >
                  {z}x
                </button>
              ))}
            </div>
          )}

          {/* Fullscreen Button */}
          {onOpenFullscreen && !isFullscreen && (
            <button
              type="button"
              onClick={onOpenFullscreen}
              className="btn-press p-2 rounded-xl bg-[#170B25] border border-[#3D2254] hover:border-[#F9C63C] text-[#FAF6FB] transition-colors"
              title="Ampliar afiche en pantalla completa"
              aria-label="Pantalla completa"
            >
              <Maximize2 className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Interactive Map Stage Container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full ${
          isFullscreen ? "h-[74vh]" : "h-[540px] sm:h-[680px] lg:h-[780px]"
        } overflow-hidden bg-[#12081C] select-none flex items-center justify-center ${
          mode === "loupe"
            ? "cursor-crosshair"
            : scale > 1
            ? isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-zoom-in"
        }`}
      >
        {/* The Map Image */}
        <div
          style={{
            transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.18s cubic-bezier(0.2, 0.9, 0.4, 1)",
            transformOrigin: "center center",
            willChange: "transform",
          }}
          className="relative max-w-full max-h-full flex items-center justify-center pointer-events-none"
        >
          <img
            ref={imageRef}
            src={scale > 1.4 ? highResSrc : imageSrc}
            alt={alt}
            draggable={false}
            className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-2xl"
          />
        </div>

        {/* 3. Floating Magnifier Glass (Lupa) when in Loupe mode */}
        {mode === "loupe" && isLoupeHovered && (
          <div
            style={{
              position: "absolute",
              left: `${loupePos.x - LOUPE_SIZE / 2}px`,
              top: `${loupePos.y - LOUPE_SIZE / 2}px`,
              width: `${LOUPE_SIZE}px`,
              height: `${LOUPE_SIZE}px`,
              pointerEvents: "none",
              borderRadius: "50%",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.9), 0 0 0 3px #F9C63C, 0 0 28px rgba(249,198,60,0.5)",
              backgroundImage: `url(${highResSrc})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: `${loupeBg.posX}px ${loupeBg.posY}px`,
              backgroundSize: `${loupeBg.sizeX}px ${loupeBg.sizeY}px`,
              zIndex: 30,
            }}
            className="animate-in fade-in duration-150 overflow-hidden"
          >
            {/* Subtle reticle / crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-full h-[1px] bg-[#F9C63C]" />
              <div className="absolute h-full w-[1px] bg-[#F9C63C]" />
              <div className="absolute w-6 h-6 rounded-full border border-[#F9C63C]" />
            </div>

            {/* Lens Reflection highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />

            {/* Loupe label pill */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#170B25]/90 border border-[#F9C63C]/60 text-[10px] font-mono-meta font-bold text-[#F9C63C] shadow-md">
              Lupa {loupeZoom}x
            </div>
          </div>
        )}

        {/* 4. Mini-map Navigation Thumbnail (visible when zoomed in > 130%) */}
        {mode === "pan" && scale > 1.3 && (
          <div
            onClick={handleReset}
            className="absolute bottom-4 right-4 z-20 w-20 sm:w-24 aspect-[900/1170] rounded-lg bg-[#170B25]/90 border border-[#F9C63C]/60 p-1 shadow-xl cursor-pointer hover:border-[#F9C63C] transition-all"
            title="Mini-mapa: clic para restablecer vista"
          >
            <div className="relative w-full h-full overflow-hidden rounded bg-[#29143B]">
              <img
                src={imageSrc}
                alt="Mini mapa indicador"
                className="w-full h-full object-cover opacity-60"
              />
              {/* Highlight viewport box indicating current view position */}
              <div
                style={{
                  position: "absolute",
                  left: `${Math.max(0, Math.min(60, 50 - (translate.x / scale / 15)))}%`,
                  top: `${Math.max(0, Math.min(60, 50 - (translate.y / scale / 18)))}%`,
                  width: `${Math.max(25, 100 / scale)}%`,
                  height: `${Math.max(25, 100 / scale)}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="border-2 border-[#F9C63C] bg-[#F9C63C]/20 rounded-sm pointer-events-none"
              />
            </div>
            <div className="text-[9px] font-mono-meta text-center text-[#F9C63C] mt-0.5">
              100% ↺
            </div>
          </div>
        )}

        {/* 5. Bottom Instructions Pill */}
        <div className="absolute bottom-3 left-4 z-10 pointer-events-none max-w-[80%] sm:max-w-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#170B25]/85 backdrop-blur-md border border-[#3D2254] text-xs font-mono-meta text-[#D1C6DA] shadow-lg">
            {mode === "loupe" ? (
              <>
                <Search className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                <span className="hidden sm:inline">
                  Mueve el cursor para explorar con la lupa · Usa la rueda del ratón para regular el aumento ({loupeZoom}x)
                </span>
                <span className="sm:hidden">Arrastra para explorar con la lupa ({loupeZoom}x)</span>
              </>
            ) : (
              <>
                <Hand className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                {scale > 1 ? (
                  <>
                    <span className="hidden sm:inline">
                      Arrastra para mover el mapa ({Math.round(scale * 100)}%) · Rueda o doble clic para ajustar
                    </span>
                    <span className="sm:hidden">Arrastra para recorrer el mapa</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      Haz doble clic o usa la rueda del ratón para acercar · O cambia a <strong>Modo Lupa</strong>
                    </span>
                    <span className="sm:hidden">Pellizca para zoom o usa Modo Lupa</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapZoomViewer;
