import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Compass, Image as ImageIcon, Sparkles } from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import { getResponsiveImageSet } from "../data/catalog";
import {
  BrushSpiral,
  BrushStroke,
  BrushSplatter,
} from "./BrushMotifs";

interface EditorialHeroProps {
  projects: CulturalProject[];
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ projects }) => {
  const shouldReduceMotion = useReducedMotion();

  const visualProjects = projects.filter((p) => Boolean(p.coverImage));
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const activeProject =
    visualProjects[activeIndex] ??
    projects.find((p) => p.featured) ??
    projects[0];
  const inspectedProject =
    hoveredIndex !== null ? visualProjects[hoveredIndex] : activeProject;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || visualProjects.length <= 1) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 44 && deltaY < 64) {
      if (deltaX < 0) {
        setActiveIndex((prev) => (prev + 1) % visualProjects.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + visualProjects.length) % visualProjects.length
        );
      }
    }
  };

  return (
    <section
      aria-labelledby="hero-main-title"
      className="relative w-full overflow-hidden border-b border-[#3D2254] bg-[#170B25] bg-motion-atmospheric pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Background Graphic Motion Motifs */}
      <div className="absolute top-4 left-2 sm:left-12 opacity-30 pointer-events-none" aria-hidden="true">
        <BrushSpiral className="w-28 h-28 sm:w-40 sm:h-40" color="#B184D5" accentColor="#F9C63C" />
      </div>
      <div className="absolute top-24 right-4 sm:right-24 opacity-25 pointer-events-none hidden md:block" aria-hidden="true">
        <BrushSplatter className="w-36 h-36" color="#B184D5" accentColor="#F9C63C" />
      </div>

      <div className="layout-container relative z-10">
        {/* Main Asymmetric 12-Column Editorial Grid (7 cols narrative / 5 cols visual frame) */}
        <div className="layout-grid-12 items-center gap-y-10">
          {/* Left Column: High-Impact Typography & Narrative */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Badge: Comuna 11 · Presupuesto Participativo */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#29143B] border border-[#583178] font-mono-meta text-xs text-[#D1C6DA] mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#F9C63C]" aria-hidden="true" />
                <span className="font-semibold text-[#FAF6FB]">Comuna 11</span>
                <span>·</span>
                <span>Presupuesto Participativo</span>
              </div>

              {/* Master Headline: REVELADO (Amarillo condensado) + Cultural (Caligrafía lila/morada superpuesta) */}
              <motion.h1
                id="hero-main-title"
                aria-label="Revelado Cultural — La cultura del barrio, al descubierto"
                initial={shouldReduceMotion ? false : { y: 16 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="relative inline-block pb-3 sm:pb-4">
                  <span className="block font-display font-black text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-[#F9C63C] uppercase leading-[0.85] select-none">
                    REVELADO
                  </span>
                  <span
                    className="absolute -bottom-3 sm:-bottom-5 right-2 sm:right-6 font-script text-5xl sm:text-7xl lg:text-8xl text-[#B184D5] select-none drop-shadow-[0_4px_24px_rgba(23,11,37,0.95)] rotate-[-5deg] pointer-events-none"
                    aria-hidden="true"
                  >
                    Cultural
                  </span>
                </div>

                <span className="block font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#FAF6FB] tracking-tight uppercase mt-4 sm:mt-6 leading-tight">
                  La cultura del barrio, al descubierto.
                </span>
              </motion.h1>

              {/* Trazo expresivo decorativo */}
              <div className="mt-3 -ml-2 pointer-events-none" aria-hidden="true">
                <BrushStroke className="w-56 h-8 sm:w-72 sm:h-10 opacity-70" color="#B184D5" accentColor="#F9C63C" />
              </div>

              {/* Frase rectora & bajada editorial */}
              <motion.div
                initial={shouldReduceMotion ? false : { y: 12 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4 max-w-2xl"
              >
                <p className="font-display font-bold text-xl sm:text-2xl text-[#FAF6FB] leading-snug">
                  Hay una cultura que se mueve cerca de ti.
                </p>
                <p className="mt-2 text-base sm:text-lg text-[#D1C6DA] font-normal leading-relaxed">
                  Descubre ocho iniciativas que hacen visible el talento, las historias y las expresiones culturales de Laureles–Estadio.
                </p>
              </motion.div>
            </div>

            {/* CTAs solicitados: Explorar iniciativas (Amarillo/Oscuro) & Conoce Revelado (Lila/Claro) */}
            <motion.div
              initial={shouldReduceMotion ? false : { y: 10 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#catalogo"
                className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-[0_6px_24px_rgba(249,198,60,0.3)] hover:bg-[#EAB428] transition-colors"
              >
                <span>Explorar iniciativas</span>
                <ArrowUpRight
                  className="w-4 h-4 stroke-[2.5] icon-glide"
                  aria-hidden="true"
                />
              </a>

              <Link
                to="/acerca-de"
                className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#29143B] hover:bg-[#37105F] text-[#FAF6FB] text-base font-medium border border-[#B184D5]/40 hover:border-[#F9C63C] transition-colors shadow-sm"
              >
                <span>Conoce Revelado</span>
                <ArrowUpRight
                  className="w-4 h-4 text-[#B184D5] icon-glide"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Featured Documentary Photograph Frame + Dark Cultural Motion Switcher */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            {activeProject && (
              <div className="relative rounded-2xl bg-[#29143B] border border-[#3D2254] p-4 sm:p-6 shadow-[0_20px_50px_rgba(14,6,23,0.7)]">
                {/* Decorative subtle brush highlight */}
                <div className="absolute -top-6 -right-6 pointer-events-none opacity-40 hidden sm:block" aria-hidden="true">
                  <BrushSplatter className="w-24 h-24" color="#F9C63C" accentColor="#B184D5" />
                </div>

                {/* Top Frame Bar */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 font-mono-meta text-xs min-w-0">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#170B25] border border-[#583178] text-[#F9C63C] font-bold shrink-0">
                      {activeProject.id} / 08
                    </span>
                    {activeProject.category && (
                      <span className="truncate max-w-[200px] text-[#D1C6DA] font-semibold text-[11px] uppercase tracking-wider">
                        {activeProject.category}
                      </span>
                    )}
                  </div>
                  <span className="font-mono-meta text-xs text-[#D1C6DA] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                    <span className="text-[#B184D5] font-semibold">En movimiento</span>
                  </span>
                </div>

                {/* Main Hero Photograph with Optical Framing Corners */}
                <Link
                  to={`/proyectos/${activeProject.slug}`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group block relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-xl overflow-hidden bg-[#170B25] touch-pan-y viewfinder-frame"
                  aria-label={`Abrir ficha de ${activeProject.name}`}
                >
                  {/* Esquinas de encuadre en amarillo y lavanda */}
                  <span className="viewfinder-corner viewfinder-corner-tl border-t-2 border-l-2 border-[#F9C63C] w-3.5 h-3.5" aria-hidden="true" />
                  <span className="viewfinder-corner viewfinder-corner-tr border-t-2 border-r-2 border-[#B184D5] w-3.5 h-3.5" aria-hidden="true" />
                  <span className="viewfinder-corner viewfinder-corner-bl border-b-2 border-l-2 border-[#B184D5] w-3.5 h-3.5" aria-hidden="true" />
                  <span className="viewfinder-corner viewfinder-corner-br border-b-2 border-r-2 border-[#F9C63C] w-3.5 h-3.5" aria-hidden="true" />

                  {activeProject.coverImage && (
                    <img
                      key={activeProject.coverImage}
                      src={activeProject.coverImage}
                      srcSet={getResponsiveImageSet(activeProject.coverImage)}
                      sizes="(max-width: 1024px) 92vw, 42vw"
                      alt={`Fotografía documental del proyecto ${activeProject.name}`}
                      width={1200}
                      height={825}
                      fetchPriority="high"
                      className="w-full h-full object-cover photo-reveal transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#170B25] via-[#170B25]/25 to-transparent pointer-events-none" />

                  {/* Bottom Caption inside photo with smooth slide */}
                  <motion.div
                    key={activeProject.id}
                    initial={shouldReduceMotion ? false : { y: 8 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-4"
                  >
                    <div>
                      {activeProject.editorialHeadline && (
                        <span className="font-mono-meta text-xs text-[#F9C63C] font-bold block mb-1">
                          {activeProject.editorialHeadline}
                        </span>
                      )}
                      <span className="font-display font-black text-xl sm:text-2xl text-[#FAF6FB] block leading-tight">
                        {activeProject.name}
                      </span>
                    </div>
                    <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F9C63C] text-[#170B25] group-hover:bg-[#EAB428] transition-colors shadow-md">
                      <ArrowUpRight className="w-5 h-5 stroke-[2.5] icon-glide" aria-hidden="true" />
                    </span>
                  </motion.div>
                </Link>

                {/* Contact Sheet Selector Strip for Visual Projects */}
                {visualProjects.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-[#3D2254]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono-meta text-xs text-[#D1C6DA] truncate">
                        Hoja de contacto ·{" "}
                        <strong className="font-semibold text-[#FAF6FB]">
                          {inspectedProject?.name}
                        </strong>
                      </span>
                      <span className="font-mono-meta text-xs text-[#F9C63C] shrink-0 font-bold">
                        0{(hoveredIndex ?? activeIndex) + 1} / 0
                        {visualProjects.length}
                      </span>
                    </div>
                    <div
                      className="grid grid-cols-5 gap-2"
                      role="group"
                      aria-label="Seleccionar fotografía de portada"
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {visualProjects.map((proj, idx) => {
                        const isSelected = idx === activeIndex;
                        return (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onFocus={() => setHoveredIndex(idx)}
                            onBlur={() => setHoveredIndex(null)}
                            title={`${proj.id} / 08 · ${proj.name}`}
                            aria-pressed={isSelected}
                            aria-label={`Ver portada de ${proj.name} (${proj.id} de 08)`}
                            className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "opacity-100 scale-[1.04] ring-2 ring-[#F9C63C] shadow-lg"
                                : "opacity-55 hover:opacity-95"
                            }`}
                          >
                            {proj.coverImage && (
                              <img
                                src={proj.coverImage.replace("-1200.webp", "-480.webp")}
                                alt=""
                                width={160}
                                height={120}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            )}
                            <span
                              className={`absolute bottom-1 right-1 px-1.5 py-0.5 rounded font-mono-meta text-[11px] font-bold transition-colors ${
                                isSelected
                                  ? "bg-[#170B25] text-[#F9C63C] ring-1 ring-[#F9C63C]"
                                  : "bg-[#170B25]/90 text-[#FAF6FB]"
                              }`}
                            >
                              {proj.id}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
