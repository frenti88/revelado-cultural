import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { getDisciplineColor } from "../data/catalog";

export const AboutPage: React.FC = () => {
  const { publishedProjects } = useCatalog();

  useEffect(() => {
    document.title =
      "Acerca de Revelado Cultural · Comuna 11, Medellín";
  }, []);

  return (
    <div className="w-full bg-[#161317] text-[#F5F0E7]">
      <section className="w-full border-b border-[#433840]/60 bg-darkroom-grain py-12 sm:py-16 lg:py-20">
        <div className="layout-container">
          <div className="layout-grid-12 items-start gap-8 lg:gap-12">
            {/* Columna Izquierda: Qué es + Convocatoria y Territorio (6 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-mono-meta text-xs text-[#A8B69C] block mb-3">
                  Comuna 11 · Laureles - Estadio
                </span>
                <h1 className="font-display font-extrabold text-hero-fluid text-[#F5F0E7]">
                  Qué es Revelado Cultural
                </h1>
                <p className="mt-6 text-lg sm:text-xl font-normal text-[#F5F0E7] leading-relaxed">
                  Revelado Cultural es un proyecto que visibiliza las iniciativas
                  culturales generadas en la Comuna 11 ganadoras de la
                  convocatoria de Presupuesto Participativo. Son 8 iniciativas de
                  áreas de danza, música, teatro, gestión cultural, literatura,
                  patrimonio, entre otras, que demuestran la riqueza cultural de
                  Laureles - Estadio. ¡Conócelas!
                </p>
              </div>

              {/* Fichas territoriales con datos del documento */}
              <div className="mt-8 pt-8 border-t border-[#433840]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#211820] p-5 shadow-sm">
                  <span className="font-mono-meta text-xs text-[#A8B69C] block">
                    Convocatoria
                  </span>
                  <span className="font-display font-semibold text-lg text-[#F5F0E7] mt-1 block">
                    Presupuesto Participativo
                  </span>
                  <p className="font-mono-meta text-xs text-[#D8CDC8] mt-1">
                    Recursos de cultura local
                  </p>
                </div>
                <div className="rounded-xl bg-[#211820] p-5 shadow-sm">
                  <span className="font-mono-meta text-xs text-[#A8B69C] block">
                    Territorio
                  </span>
                  <span className="font-display font-semibold text-lg text-[#F5F0E7] mt-1 block">
                    Laureles - Estadio
                  </span>
                  <p className="font-mono-meta text-xs text-[#D8CDC8] mt-1">
                    Comuna 11 · Medellín
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/explorar"
                  className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-base font-medium shadow-[0_6px_24px_rgba(116,41,64,0.4)]"
                >
                  <span>Explorar las 8 iniciativas</span>
                  <ArrowUpRight className="w-4 h-4 icon-glide" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Directorio de las 8 iniciativas (6 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6 rounded-xl bg-[#211820] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#433840]/60">
                <h2 className="font-display font-bold text-lg text-[#F5F0E7]">
                  Las 8 iniciativas ganadoras
                </h2>
                <span className="font-mono-meta text-xs text-[#A8B69C]">
                  08 proyectos
                </span>
              </div>

              <div className="divide-y divide-[#433840]/40">
                {publishedProjects.map((proj) => {
                  const { accentColor } = getDisciplineColor(proj.category);
                  return (
                    <Link
                      key={proj.id}
                      to={`/proyectos/${proj.slug}`}
                      className="group py-3.5 flex items-center justify-between gap-4 hover:bg-[#161317]/50 px-3 -mx-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono-meta text-xs font-semibold text-[#A8B69C] shrink-0">
                          {proj.id}
                        </span>
                        <div className="min-w-0">
                          <span className="font-display font-medium text-base text-[#F5F0E7] group-hover:text-[#A8B69C] transition-colors block truncate">
                            {proj.name}
                          </span>
                          {proj.category && (
                            <span
                              className="font-mono-meta text-xs block mt-0.5 truncate"
                              style={{ color: accentColor }}
                            >
                              {proj.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowUpRight
                        className="w-4 h-4 text-[#A8B69C] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
