import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  Globe,
  Headphones,
  MapPin,
  Play,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { BrushStroke, BrushSplatter } from "../components/BrushMotifs";

export const AboutPage: React.FC = () => {
  const { publishedProjects } = useCatalog();

  useEffect(() => {
    document.title = "Revelado Cultural 2026 · Manifiesto y Presentación Oficial";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#170B25] text-[#FAF6FB]">
      {/* 01 — Hero Editorial: Manifiesto Revelado Cultural 2026 */}
      <section className="relative w-full border-b border-[#3D2254] py-14 sm:py-20 lg:py-24 overflow-hidden">
        <div
          className="absolute -top-10 right-8 pointer-events-none opacity-20 hidden md:block"
          aria-hidden="true"
        >
          <BrushSplatter
            className="w-56 h-56"
            color="#B184D5"
            accentColor="#F9C63C"
          />
        </div>

        <div className="layout-container relative z-10">
          <div className="max-w-4xl">
            {/* Meta location line */}
            <div className="font-mono-meta text-xs text-[#D1C6DA] mb-4">
              Comuna 11 · Laureles–Estadio · Medellín · Presupuesto Participativo
            </div>

            {/* Lockup Tipográfico REVELADO Cultural 2026 */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mt-2">
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight text-[#F9C63C] uppercase leading-none">
                REVELADO
              </h1>
              <span className="font-script text-4xl sm:text-6xl lg:text-7xl text-[#FAF6FB] italic -rotate-3 select-none">
                Cultural
              </span>
              <span className="font-mono-meta text-xl sm:text-3xl text-[#FAF6FB] font-bold bg-[#37105F] px-3.5 py-1 rounded-xl border border-[#B184D5]/40">
                2026
              </span>
            </div>

            <div className="mt-3 -ml-2" aria-hidden="true">
              <BrushStroke
                className="w-64 h-7 sm:w-80 sm:h-9 opacity-75"
                color="#B184D5"
                accentColor="#F9C63C"
              />
            </div>

            <h2 className="mt-6 font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FAF6FB] tracking-tight">
              «La cultura del barrio, al descubierto»
            </h2>

            <p className="mt-6 text-lg sm:text-xl font-normal text-[#D1C6DA] leading-relaxed max-w-3xl">
              Revelado Cultural es un proyecto que visibiliza las iniciativas culturales generadas en la Comuna 11 ganadoras de la convocatoria de Presupuesto Participativo. Son ocho iniciativas de danza, música, teatro, gestión cultural, literatura, patrimonio e investigación que demuestran la riqueza cultural de Laureles–Estadio.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#manifiesto"
                className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-[0_6px_24px_rgba(249,198,60,0.3)] hover:bg-[#EAB428] transition-colors"
              >
                <span>Leer el manifiesto</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </a>

              <Link
                to="/explorar"
                className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#29143B] hover:bg-[#37105F] text-[#FAF6FB] text-base font-medium border border-[#3D2254] hover:border-[#F9C63C] transition-colors shadow-sm"
              >
                <span>Explorar las 8 iniciativas</span>
                <ArrowUpRight className="w-4 h-4 text-[#B184D5] icon-glide" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — El Manifiesto: Objetivo General Oficial */}
      <section id="manifiesto" className="relative w-full border-b border-[#3D2254] py-16 sm:py-20 lg:py-24 bg-[#29143B]">
        <div className="layout-container">
          <div className="max-w-4xl mx-auto">
            {/* Monumental Manifesto Card */}
            <div className="relative rounded-3xl bg-[#170B25] border border-[#3D2254] p-8 sm:p-12 lg:p-16 shadow-[0_16px_48px_rgba(14,6,23,0.7)]">
              {/* Corner framing brackets */}
              <span
                className="absolute top-4 left-4 font-mono-meta text-sm text-[#F9C63C]/80 select-none"
                aria-hidden="true"
              >
                ┌
              </span>
              <span
                className="absolute top-4 right-4 font-mono-meta text-sm text-[#F9C63C]/80 select-none"
                aria-hidden="true"
              >
                ┐
              </span>
              <span
                className="absolute bottom-4 left-4 font-mono-meta text-sm text-[#F9C63C]/80 select-none"
                aria-hidden="true"
              >
                └
              </span>
              <span
                className="absolute bottom-4 right-4 font-mono-meta text-sm text-[#F9C63C]/80 select-none"
                aria-hidden="true"
              >
                ┘
              </span>

              <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[#3D2254]">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] tracking-tight">
                  Objetivo general del proyecto
                </h2>
                <span className="font-mono-meta text-xs text-[#B184D5]">
                  Documento Oficial 2026
                </span>
              </div>

              <blockquote className="font-display font-medium text-xl sm:text-2xl lg:text-3xl text-[#FAF6FB] leading-relaxed tracking-tight">
                «Visibilizar el impacto de los proyectos artísticos y culturales ganadores del Presupuesto Participativo 2026 de la Comuna 11 –Laureles Estadio–, mediante la producción y circulación de contenidos audiovisuales y fotográficos que fortalezcan su reconocimiento territorial y consoliden nuevos públicos.»
              </blockquote>

              {/* Contextual Territorial Badges */}
              <div className="mt-10 pt-8 border-t border-[#3D2254] grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#29143B] border border-[#3D2254]">
                  <div className="flex items-center gap-2 text-[#F9C63C] mb-2">
                    <Award className="w-4 h-4" aria-hidden="true" />
                    <span className="font-display font-bold text-sm text-[#FAF6FB]">
                      Convocatoria
                    </span>
                  </div>
                  <p className="font-mono-meta text-xs text-[#FAF6FB] font-semibold">
                    Presupuesto Participativo
                  </p>
                  <span className="font-mono-meta text-[11px] text-[#D1C6DA] block mt-0.5">
                    Alcaldía de Medellín · 2026
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#29143B] border border-[#3D2254]">
                  <div className="flex items-center gap-2 text-[#F9C63C] mb-2">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span className="font-display font-bold text-sm text-[#FAF6FB]">
                      Territorio
                    </span>
                  </div>
                  <p className="font-mono-meta text-xs text-[#FAF6FB] font-semibold">
                    Comuna 11 · Laureles–Estadio
                  </p>
                  <span className="font-mono-meta text-[11px] text-[#D1C6DA] block mt-0.5">
                    Medellín, Colombia
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#29143B] border border-[#3D2254]">
                  <div className="flex items-center gap-2 text-[#F9C63C] mb-2">
                    <Users className="w-4 h-4" aria-hidden="true" />
                    <span className="font-display font-bold text-sm text-[#FAF6FB]">
                      Alcance
                    </span>
                  </div>
                  <p className="font-mono-meta text-xs text-[#FAF6FB] font-semibold">
                    8 Iniciativas Comunitarias
                  </p>
                  <span className="font-mono-meta text-[11px] text-[#D1C6DA] block mt-0.5">
                    Nuevos públicos y memoria
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Objetivos Específicos: Typographic Manifesto Sequence */}
      <section className="w-full border-b border-[#3D2254] py-16 sm:py-20 lg:py-24 bg-[#170B25]">
        <div className="layout-container">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#FAF6FB] tracking-tight">
              Objetivos específicos
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#D1C6DA]">
              Tres acciones estratégicas articuladas para documentar, circular y conectar la cultura de la Comuna 11.
            </p>
          </div>

          <div className="divide-y divide-[#3D2254] border-y border-[#3D2254]">
            {/* Objetivo 1 */}
            <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-display font-black text-6xl sm:text-7xl text-[#F9C63C] leading-none select-none">
                  01
                </span>
                <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold lg:hidden">
                  Producción Documental
                </span>
              </div>
              <div className="lg:col-span-10">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mb-3">
                  Producción de contenidos audiovisuales y fotográficos
                </h3>
                <p className="text-base sm:text-lg text-[#D1C6DA] leading-relaxed max-w-4xl">
                  Producir contenidos audiovisuales y fotográficos —reels, entrevistas en formato falso podcast y series fotográficas— que documenten y narrativicen la ejecución de ocho (8) proyectos ganadores de PP 2026 de la Comuna 11.
                </p>
                <div className="mt-4 font-mono-meta text-xs text-[#F9C63C]">
                  Cobertura completa: 8 proyectos ganadores
                </div>
              </div>
            </div>

            {/* Objetivo 2 */}
            <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-display font-black text-6xl sm:text-7xl text-[#F9C63C] leading-none select-none">
                  02
                </span>
                <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold lg:hidden">
                  Circulación Libre
                </span>
              </div>
              <div className="lg:col-span-10">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mb-3">
                  Circulación y acceso ciudadano a la oferta cultural
                </h3>
                <p className="text-base sm:text-lg text-[#D1C6DA] leading-relaxed max-w-4xl">
                  Circular los contenidos producidos a través de canales digitales propios y de los proyectos beneficiados, garantizando el acceso ciudadano a la oferta cultural del territorio.
                </p>
                <div className="mt-4 font-mono-meta text-xs text-[#F9C63C]">
                  Canales abiertos: Acceso ciudadano garantizado
                </div>
              </div>
            </div>

            {/* Objetivo 3 */}
            <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-display font-black text-6xl sm:text-7xl text-[#F9C63C] leading-none select-none">
                  03
                </span>
                <span className="font-mono-meta text-xs text-[#B184D5] uppercase tracking-wider font-bold lg:hidden">
                  Articulación Territorial
                </span>
              </div>
              <div className="lg:col-span-10">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mb-3">
                  Encuentro comunitario de cierre y alianzas
                </h3>
                <p className="text-base sm:text-lg text-[#D1C6DA] leading-relaxed max-w-4xl">
                  Propiciar un encuentro comunitario de cierre que reúna a los agentes culturales de la comuna, los equipos de los proyectos cubiertos y la ciudadanía, socializando de forma colectiva los proyectos realizados y generando lazos y potenciales alianzas entre los diferentes actores culturales de la comuna 11.
                </p>
                <div className="mt-4 font-mono-meta text-xs text-[#F9C63C]">
                  Comunidad viva: Redes y alianzas territoriales
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Componentes del Proyecto: Ficha Técnica Oficial */}
      <section className="w-full border-b border-[#3D2254] py-16 sm:py-20 lg:py-24 bg-[#29143B]">
        <div className="layout-container">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#FAF6FB] tracking-tight">
              Componentes del proyecto
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#D1C6DA]">
              Cada iniciativa cuenta con productos de comunicación específicos para narrar su proceso y conectar con nuevos públicos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Componente 1: Reels */}
            <div className="rounded-2xl bg-[#170B25] border border-[#3D2254] p-6 shadow-sm flex flex-col justify-between hover:border-[#F9C63C]/60 transition-colors">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3 pb-3 border-b border-[#3D2254]">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#F9C63C] tracking-tight uppercase">
                    08 Reels
                  </span>
                  <span className="font-mono-meta text-[11px] text-[#B184D5] uppercase font-bold">
                    60 a 90 s
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-[#FAF6FB] mb-2">
                  Micro narrativa formato Reels
                </h3>
                <p className="text-sm text-[#D1C6DA] leading-relaxed">
                  Para cada proyecto cubierto se producirá un reel de entre 60 y 90 segundos que sintetice su propuesta, impacto y ejecución.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#3D2254] font-mono-meta text-xs text-[#D1C6DA] flex items-center justify-between">
                <span>Formato vertical</span>
                <span className="font-bold text-[#F9C63C]">1 por proceso</span>
              </div>
            </div>

            {/* Componente 2: Serie fotográfica */}
            <div className="rounded-2xl bg-[#170B25] border border-[#3D2254] p-6 shadow-sm flex flex-col justify-between hover:border-[#F9C63C]/60 transition-colors">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3 pb-3 border-b border-[#3D2254]">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#F9C63C] tracking-tight uppercase">
                    08 Series
                  </span>
                  <span className="font-mono-meta text-[11px] text-[#B184D5] uppercase font-bold">
                    ≥ 8 fotos
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-[#FAF6FB] mb-2">
                  Serie fotográfica documental
                </h3>
                <p className="text-sm text-[#D1C6DA] leading-relaxed">
                  Registro fotográfico de la ejecución de cada proyecto, con al menos 8 imágenes por proceso, trabajadas editorialmente para construir una narrativa visual coherente.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#3D2254] font-mono-meta text-xs text-[#D1C6DA] flex items-center justify-between">
                <span>Registro fotográfico</span>
                <span className="font-bold text-[#F9C63C]">Mín. 64 fotos</span>
              </div>
            </div>

            {/* Componente 3: Falso podcast */}
            <div className="rounded-2xl bg-[#170B25] border border-[#3D2254] p-6 shadow-sm flex flex-col justify-between hover:border-[#F9C63C]/60 transition-colors">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3 pb-3 border-b border-[#3D2254]">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#B184D5] tracking-tight uppercase">
                    08 Episodios
                  </span>
                  <span className="font-mono-meta text-[11px] text-[#F9C63C] uppercase font-bold">
                    5 a 8 min
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-[#FAF6FB] mb-2">
                  Entrevistas formato falso podcast
                </h3>
                <p className="text-sm text-[#D1C6DA] leading-relaxed">
                  Una entrevista por proyecto grabada en video de entre 5 y 8 minutos con el o los responsables del proceso.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#3D2254] font-mono-meta text-xs text-[#D1C6DA] flex items-center justify-between">
                <span>Grabación en video</span>
                <span className="font-bold text-[#B184D5]">8 entrevistas</span>
              </div>
            </div>

            {/* Componente 4: Web tipo blog */}
            <div className="rounded-2xl bg-[#170B25] border border-[#3D2254] p-6 shadow-sm flex flex-col justify-between hover:border-[#F9C63C]/60 transition-colors">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3 pb-3 border-b border-[#3D2254]">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#FAF6FB] tracking-tight uppercase">
                    01 Portal Web
                  </span>
                  <span className="font-mono-meta text-[11px] text-[#F9C63C] uppercase font-bold">
                    Libre
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-[#FAF6FB] mb-2">
                  Portal web tipo Blog
                </h3>
                <p className="text-sm text-[#D1C6DA] leading-relaxed">
                  Web tipo blog que permita recopilar todos los contenidos en un solo lugar, de acceso abierto y permanente para la ciudadanía.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#3D2254] font-mono-meta text-xs text-[#D1C6DA] flex items-center justify-between">
                <span>Plataforma digital</span>
                <span className="font-bold text-[#FAF6FB]">Memoria viva</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Las 8 Iniciativas Oficiales que Materializan el Manifiesto */}
      <section className="w-full border-b border-[#3D2254] py-16 sm:py-20 lg:py-24 bg-[#170B25]">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#FAF6FB] tracking-tight">
                Las ocho propuestas ganadoras
              </h2>
              <p className="mt-3 text-base text-[#D1C6DA] max-w-2xl">
                Procesos de danza, música, teatro, gestión cultural, literatura, patrimonio e investigación nacidos de la Comuna 11.
              </p>
            </div>

            <Link
              to="/explorar"
              className="btn-press inline-flex items-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-full bg-[#F9C63C] text-[#170B25] text-sm font-bold shadow-sm hover:bg-[#EAB428] transition-colors"
            >
              <span>Abrir catálogo interactivo</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {publishedProjects.map((proj) => (
              <div
                key={proj.id}
                className="group relative rounded-2xl bg-[#29143B] border border-[#3D2254] p-5 sm:p-6 hover:border-[#F9C63C] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-mono-meta text-xs font-black text-[#F9C63C] px-2.5 py-0.5 rounded-full bg-[#170B25] border border-[#3D2254]">
                      {proj.id} / 08
                    </span>
                    {proj.category && (
                      <span className="font-mono-meta text-[11px] text-[#B184D5] uppercase tracking-wider font-semibold">
                        {proj.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#FAF6FB] group-hover:text-[#F9C63C] transition-colors">
                    {proj.name}
                  </h3>

                  {proj.leader && (
                    <p className="font-mono-meta text-xs text-[#D1C6DA] mt-1">
                      Lidera: {proj.leader}
                    </p>
                  )}

                  <p className="mt-3 text-sm text-[#D1C6DA] line-clamp-3 leading-relaxed">
                    {proj.fullDescription || proj.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#3D2254] flex items-center justify-between gap-3">
                  <Link
                    to={`/proyectos/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9C63C] hover:text-[#FAF6FB] transition-colors"
                  >
                    <span>Ver ficha documental</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>

                  {proj.podcastUrl && (
                    <a
                      href={proj.podcastUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono-meta text-[#D1C6DA] hover:text-[#FAF6FB] transition-colors"
                    >
                      <Play className="w-3 h-3 text-[#F9C63C]" aria-hidden="true" />
                      <span>Ver podcast</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
