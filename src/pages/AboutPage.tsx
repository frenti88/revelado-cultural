import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Award, Compass, HeartHandshake, MapPin } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { BrushStroke, BrushSplatter } from "../components/BrushMotifs";

export const AboutPage: React.FC = () => {
  const { publishedProjects } = useCatalog();

  useEffect(() => {
    document.title = "Acerca de Revelado Cultural · Comuna 11, Medellín";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#170B25] text-[#FAF6FB]">
      <section className="relative w-full border-b border-[#3D2254] py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Subtle decorative brush */}
        <div className="absolute top-8 right-12 pointer-events-none opacity-20 hidden md:block" aria-hidden="true">
          <BrushSplatter className="w-44 h-44" color="#B184D5" accentColor="#F9C63C" />
        </div>

        <div className="layout-container relative z-10">
          <div className="layout-grid-12 items-start gap-8 lg:gap-12">
            {/* Columna Izquierda: Qué es + Convocatoria y Territorio (6 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="font-mono-meta text-xs uppercase tracking-widest text-[#F9C63C] font-bold block mb-3">
                  Comuna 11 · Laureles–Estadio
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#FAF6FB] leading-tight">
                  La cultura del barrio, al descubierto
                </h1>

                <div className="mt-2 -ml-2" aria-hidden="true">
                  <BrushStroke className="w-52 h-6 sm:w-64 sm:h-8 opacity-65" color="#B184D5" accentColor="#F9C63C" />
                </div>

                <p className="mt-6 text-lg sm:text-xl font-normal text-[#D1C6DA] leading-relaxed">
                  Revelado Cultural es una plataforma editorial y archivo documental que visibiliza ocho iniciativas culturales de la Comuna 11, ganadoras de la convocatoria de Presupuesto Participativo de Medellín.
                </p>
                <p className="mt-4 text-base font-normal text-[#D1C6DA] leading-relaxed">
                  A través de música, teatro, danza, investigación territorial, literatura gráfica y artes visuales, estas propuestas demuestran la fuerza creadora que habita en las calles y barrios de Laureles y Estadio.
                </p>
              </div>

              {/* Fichas territoriales con datos del documento */}
              <div className="mt-8 pt-8 border-t border-[#3D2254] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-5 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-[#170B25] border border-[#583178] flex items-center justify-center text-[#F9C63C] mb-3">
                    <Award className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <span className="font-mono-meta text-xs text-[#F9C63C] block font-bold">
                    Convocatoria
                  </span>
                  <span className="font-display font-bold text-lg text-[#FAF6FB] mt-1 block">
                    Presupuesto Participativo
                  </span>
                  <p className="font-mono-meta text-xs text-[#D1C6DA] mt-1">
                    Cultura ciudadana Medellín
                  </p>
                </div>

                <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-5 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-[#170B25] border border-[#583178] flex items-center justify-center text-[#F9C63C] mb-3">
                    <MapPin className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  </div>
                  <span className="font-mono-meta text-xs text-[#F9C63C] block font-bold">
                    Territorio
                  </span>
                  <span className="font-display font-bold text-lg text-[#FAF6FB] mt-1 block">
                    Laureles–Estadio
                  </span>
                  <p className="font-mono-meta text-xs text-[#D1C6DA] mt-1">
                    Comuna 11 · Medellín
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/explorar"
                  className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-[0_6px_24px_rgba(249,198,60,0.3)] hover:bg-[#EAB428] transition-colors"
                >
                  <span>Explorar las 8 iniciativas</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] icon-glide" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Directorio de las 8 iniciativas (6 columnas) */}
            <div className="col-span-4 md:col-span-8 lg:col-span-6 rounded-2xl bg-[#29143B] border border-[#3D2254] p-6 sm:p-8 shadow-[0_12px_32px_rgba(14,6,23,0.5)]">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#3D2254]">
                <h2 className="font-display font-black text-xl text-[#FAF6FB]">
                  Las 8 iniciativas oficiales
                </h2>
                <span className="font-mono-meta text-xs text-[#F9C63C] font-bold">
                  08 historias
                </span>
              </div>

              <div className="divide-y divide-[#3D2254]">
                {publishedProjects.map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/proyectos/${proj.slug}`}
                    className="group py-3.5 flex items-center justify-between gap-4 hover:bg-[#170B25] px-3 -mx-3 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono-meta text-xs font-black text-[#F9C63C] shrink-0">
                        {proj.id}
                      </span>
                      <div className="min-w-0">
                        <span className="font-display font-bold text-base text-[#FAF6FB] truncate block group-hover:text-[#F9C63C] transition-colors">
                          {proj.name}
                        </span>
                        <span className="font-mono-meta text-[11px] text-[#D1C6DA] truncate block">
                          {proj.leader ? proj.leader : proj.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {proj.category && (
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#170B25] border border-[#3D2254] font-mono-meta text-[10px] text-[#B184D5] uppercase tracking-wider font-semibold">
                          {proj.category}
                        </span>
                      )}
                      <ArrowUpRight className="w-4 h-4 text-[#D1C6DA] group-hover:text-[#F9C63C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true" />
                    </div>
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
