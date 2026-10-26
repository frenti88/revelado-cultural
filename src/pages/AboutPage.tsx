import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Award, Compass, HeartHandshake, MapPin } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";

export const AboutPage: React.FC = () => {
  const { publishedProjects } = useCatalog();

  useEffect(() => {
    document.title = "Acerca de Revelado Cultural · Comuna 11, Medellín";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#151515] text-[#F2EFE8]">
      <section className="w-full border-b border-[#2E2E2E] py-12 sm:py-16 lg:py-20">
        <div className="layout-container">
          <div className="layout-grid-12 items-start gap-8 lg:gap-12">
            {/* Columna Izquierda: Qué es + Convocatoria y Territorio (6 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-3">
                  Comuna 11 · Laureles–Estadio
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2EFE8] leading-tight">
                  La cultura del barrio, al descubierto
                </h1>
                <p className="mt-6 text-lg sm:text-xl font-normal text-[#A7A39D] leading-relaxed">
                  Revelado Cultural es una plataforma editorial y archivo documental que visibiliza ocho iniciativas culturales de la Comuna 11, ganadoras de la convocatoria de Presupuesto Participativo de Medellín.
                </p>
                <p className="mt-4 text-base font-normal text-[#A7A39D] leading-relaxed">
                  A través de música, teatro, danza, investigación territorial, literatura gráfica y artes visuales, estas propuestas demuestran la fuerza creadora que habita en las calles y barrios de Laureles y Estadio.
                </p>
              </div>

              {/* Fichas territoriales con datos del documento */}
              <div className="mt-8 pt-8 border-t border-[#2E2E2E] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-5">
                  <div className="w-8 h-8 rounded-lg bg-[#151515] border border-[#2E2E2E] flex items-center justify-center text-[#FF5C38] mb-3">
                    <Award className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="font-mono-meta text-xs text-[#FF5C38] block font-semibold">
                    Convocatoria
                  </span>
                  <span className="font-display font-bold text-lg text-[#F2EFE8] mt-1 block">
                    Presupuesto Participativo
                  </span>
                  <p className="font-mono-meta text-xs text-[#A7A39D] mt-1">
                    Cultura ciudadana Medellín
                  </p>
                </div>

                <div className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-5">
                  <div className="w-8 h-8 rounded-lg bg-[#151515] border border-[#2E2E2E] flex items-center justify-center text-[#FF5C38] mb-3">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="font-mono-meta text-xs text-[#FF5C38] block font-semibold">
                    Territorio
                  </span>
                  <span className="font-display font-bold text-lg text-[#F2EFE8] mt-1 block">
                    Laureles–Estadio
                  </span>
                  <p className="font-mono-meta text-xs text-[#A7A39D] mt-1">
                    Comuna 11 · Medellín
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/explorar"
                  className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#C9321B]text-white text-base font-semibold shadow-[0_6px_24px_rgba(235,68,42,0.35)] transition-colors"
                >
                  <span>Explorar las 8 iniciativas</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2] icon-glide" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Directorio de las 8 iniciativas (6 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6 rounded-xl bg-[#222222] border border-[#2E2E2E] p-6 sm:p-8 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2E2E2E]">
                <h2 className="font-display font-bold text-lg text-[#F2EFE8]">
                  Las 8 iniciativas oficiales
                </h2>
                <span className="font-mono-meta text-xs text-[#FF5C38] font-semibold">
                  08 historias
                </span>
              </div>

              <div className="divide-y divide-[#2E2E2E]">
                {publishedProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/proyectos/${proj.slug}`}
                    className="group py-3.5 flex items-center justify-between gap-4 hover:bg-[#151515] px-3 -mx-3 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-meta text-xs font-bold text-[#FF5C38] shrink-0">
                        {proj.id}
                      </span>
                      <div className="min-w-0">
                        <span className="font-display font-bold text-base text-[#F2EFE8] group-hover:text-[#FF5C38] transition-colors block truncate">
                          {proj.name}
                        </span>
                        {proj.category && (
                          <span className="font-mono-meta text-xs text-[#A7A39D] block mt-0.5 truncate">
                            {proj.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowUpRight
                      className="w-4 h-4 text-[#A7A39D] group-hover:text-[#FF5C38] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;