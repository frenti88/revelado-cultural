import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import type { CulturalProject } from "../types/cultural";
import { getDisciplineColor, getResponsiveImageSet } from "../data/catalog";

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
      className="relative w-full overflow-hidden border-b border-[#433840] bg-darkroom-grain pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24"
    >
      <div className="layout-container">
        {/* Main Asymmetric 12-Column Editorial Grid (7 cols focal narrative / 5 cols visual frame) */}
        <div className="layout-grid-12 items-center">
          {/* Left Column: High-Impact Headline, Narrative & CTAs */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col justify-between">
            <div>
              <motion.h1
                id="hero-main-title"
                initial={shouldReduceMotion ? false : { y: 14 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-hero-fluid text-[#F5F0E7]"
              >
                <span className="block">La cultura</span>
                <span className="block text-[#A8B69C]">del barrio,</span>
                <span className="block">al descubierto.</span>
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? false : { y: 12 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 text-lg sm:text-xl text-[#F5F0E7] font-normal max-w-2xl leading-relaxed"
              >
                Revelado Cultural es un proyecto que visibiliza las iniciativas
                culturales generadas en la Comuna 11 ganadoras de la
                convocatoria de Presupuesto Participativo. Son 8 iniciativas de
                áreas de danza, música, teatro, gestión cultural, literatura,
                patrimonio, entre otras, que demuestran la riqueza cultural de
                Laureles - Estadio. ¡Conócelas!
              </motion.p>
            </div>

            {/* CTAs: Element-first sizing (min-h-12 = 48px touch target) + tactile micro-interactions */}
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
              <Link
                to="/explorar"
                className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-base font-medium shadow-[0_6px_24px_rgba(116,41,64,0.45)]"
              >
                <span>Explorar proyectos</span>
                <ArrowUpRight
                  className="w-4 h-4 stroke-[2.2] icon-glide"
                  aria-hidden="true"
                />
              </Link>

              {activeProject && (
                <Link
                  to={`/proyectos/${activeProject.slug}`}
                  className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#211820] hover:bg-[#2d212b] text-[#F5F0E7] text-base font-medium"
                >
                  <span>Conoce esta historia</span>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#A8B69C] icon-glide"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right Column: Featured Documentary Photograph Frame + Darkroom Contact Switcher */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            {activeProject && (
              <div className="rounded-xl bg-[#211820] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                {/* Top Frame Bar */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 font-mono-meta text-xs min-w-0">
                    <span className="px-2 py-1 rounded bg-[#742940] text-[#F5F0E7] font-semibold shrink-0">
                      {activeProject.id} / 08
                    </span>
                    {activeProject.category && (
                      <>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            backgroundColor: getDisciplineColor(
                              activeProject.category
                            ).accentColor,
                          }}
                          aria-hidden="true"
                        />
                        <span
                          className="truncate max-w-[200px] font-medium"
                          style={{
                            color: getDisciplineColor(activeProject.category)
                              .accentColor,
                          }}
                        >
                          {activeProject.category}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="font-mono-meta text-xs text-[#D8CDC8] flex items-center gap-1">
                    <ImageIcon className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                    <span>Revelado</span>
                  </span>
                </div>

                {/* Main Hero Photograph (Supports horizontal swipe on touch devices) */}
                <Link
                  to={`/proyectos/${activeProject.slug}`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group block relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-lg overflow-hidden bg-[#161317] touch-pan-y"
                  aria-label={`Abrir ficha de ${activeProject.name}`}
                >
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161317] via-[#161317]/20 to-transparent" />

                  {/* Bottom Caption inside photo with smooth darkroom slide */}
                  <motion.div
                    key={activeProject.id}
                    initial={shouldReduceMotion ? false : { y: 8 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-4"
                  >
                    <div>
                      <span className="font-display font-bold text-lg sm:text-xl text-[#F5F0E7] block">
                        {activeProject.name}
                      </span>
                    </div>
                    <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#742940] text-[#F5F0E7] group-hover:bg-[#A8B69C] group-hover:text-[#161317] transition-colors">
                      <ArrowUpRight className="w-4 h-4 icon-glide" aria-hidden="true" />
                    </span>
                  </motion.div>
                </Link>

                {/* Contact Sheet Selector Strip for the 5 Visual Projects */}
                {visualProjects.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-[#433840]/60">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono-meta text-xs text-[#D8CDC8] truncate">
                        Hoja de contacto ·{" "}
                        <strong className="font-medium text-[#F5F0E7]">
                          {inspectedProject?.name}
                        </strong>
                      </span>
                      <span className="font-mono-meta text-xs text-[#A8B69C] shrink-0">
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
                            className={`relative aspect-[4/3] rounded-md overflow-hidden transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "opacity-100 scale-[1.03] shadow-lg"
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
                            {isSelected && !shouldReduceMotion && (
                              <motion.span
                                layoutId="hero-contact-loupe"
                                transition={{
                                  duration: 0.25,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute inset-0 rounded-md ring-2 ring-inset ring-[#A8B69C] pointer-events-none"
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className={`absolute bottom-1 right-1 px-1 rounded font-mono-meta text-[10px] font-semibold transition-colors ${
                                isSelected
                                  ? "bg-[#A8B69C] text-[#161317]"
                                  : "bg-[#161317]/85 text-[#F5F0E7]"
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
