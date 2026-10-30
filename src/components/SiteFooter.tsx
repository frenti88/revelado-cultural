import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { CONFIRMED_CATEGORIES } from "../data/catalog";
import { BrushDivider } from "./BrushMotifs";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#170B25] border-t border-[#3D2254] pt-14 pb-24 md:pb-14 overflow-hidden">
      {/* Dynamic top brush stroke divider */}
      <div className="absolute top-0 inset-x-0 opacity-40">
        <BrushDivider className="w-full h-4" />
      </div>

      <div className="layout-container relative z-10">
        <div className="layout-grid-12 pb-10 border-b border-[#3D2254]">
          {/* Brand Column */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col justify-between">
            <div>
              <BrandLogo />
              <p className="mt-5 text-base font-normal text-[#D1C6DA] max-w-sm leading-relaxed">
                Plataforma editorial de descubrimiento cultural que visibiliza ocho iniciativas de
                la Comuna 11, Laureles–Estadio, ganadoras de la convocatoria de
                Presupuesto Participativo de Medellín.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono-meta text-xs text-[#D1C6DA]">
              <span className="w-2 h-2 rounded-full bg-[#F9C63C]" aria-hidden="true" />
              <span>La cultura del barrio, al descubierto</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <h3 className="font-display font-bold text-lg text-[#FAF6FB] mb-4 uppercase tracking-wide">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-base">
              <li>
                <Link
                  to="/"
                  className="text-[#D1C6DA] hover:text-[#F9C63C] transition-colors font-medium"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/explorar"
                  className="text-[#D1C6DA] hover:text-[#F9C63C] transition-colors font-medium"
                >
                  Explorar iniciativas
                </Link>
              </li>
              <li>
                <Link
                  to="/otros-proyectos"
                  className="text-[#D1C6DA] hover:text-[#F9C63C] transition-colors font-medium"
                >
                  Otros proyectos culturales (Mapa)
                </Link>
              </li>
              <li>
                <Link
                  to="/revelado-cultural"
                  className="text-[#D1C6DA] hover:text-[#F9C63C] transition-colors font-medium"
                >
                  Revelado Cultural
                </Link>
              </li>
              <li>
                <a
                  href="/docs/mapa-cartografia-cultural-comuna-11.pdf"
                  download
                  className="text-[#D1C6DA] hover:text-[#F9C63C] transition-colors font-medium inline-flex items-center gap-1"
                >
                  <span>Descargar Mapa PDF</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/playlist?list=PLNSEJl5L7Jwc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D1C6DA] hover:text-[#F9C63C] transition-colors font-medium inline-flex items-center gap-1"
                >
                  <span>Pódcasts en YouTube</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/drive/u/0/folders/1h76zT9pI1cBzQwbnEiIZaN-VDUuvCnVn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D1C6DA] hover:text-[#F9C63C] transition-colors font-medium inline-flex items-center gap-1"
                >
                  <span>Reels en Drive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Disciplines Column */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <h3 className="font-display font-bold text-lg text-[#FAF6FB] mb-4 uppercase tracking-wide">
              Disciplinas
            </h3>
            <div className="flex flex-wrap gap-2">
              {CONFIRMED_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  to={`/explorar?categoria=${encodeURIComponent(category)}`}
                  className="btn-press inline-flex items-center min-h-9 px-3.5 py-1.5 rounded-full bg-[#29143B] hover:bg-[#37105F] text-xs font-mono-meta text-[#FAF6FB] border border-[#3D2254] hover:border-[#F9C63C] transition-colors shadow-sm"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-meta text-[#D1C6DA]">
          <p>
            Revelado Cultural · Comuna 11, Laureles–Estadio · Medellín, Colombia
          </p>
          <p>
            Presupuesto Participativo · Cultura Ciudadana
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
