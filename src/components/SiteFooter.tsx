import React from "react";
import { Link } from "react-router-dom";
import { Aperture } from "lucide-react";
import { CONFIRMED_CATEGORIES } from "../data/catalog";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#161317] border-t border-[#433840]/60 pt-12 pb-24 md:pb-12">
      <div className="layout-container">
        <div className="layout-grid-12 pb-8 border-b border-[#433840]/60">
          {/* Brand Column */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <div className="flex items-center gap-4">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#211820]"
                aria-hidden="true"
              >
                <Aperture className="w-4 h-4 text-[#A8B69C]" />
              </span>
              <span className="font-display font-bold text-lg text-[#F5F0E7]">
                Revelado Cultural
              </span>
            </div>
            <p className="mt-4 text-base font-normal text-[#D8CDC8] max-w-sm leading-relaxed">
              Iniciativas culturales generadas en la Comuna 11 ganadoras de la
              convocatoria de Presupuesto Participativo en Laureles - Estadio.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <h3 className="font-display font-semibold text-base text-[#A8B69C] mb-4">
              Secciones
            </h3>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/"
                  className="text-[#D8CDC8] hover:text-[#F5F0E7] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/explorar"
                  className="text-[#D8CDC8] hover:text-[#F5F0E7] transition-colors"
                >
                  Explorar proyectos
                </Link>
              </li>
              <li>
                <Link
                  to="/acerca-de"
                  className="text-[#D8CDC8] hover:text-[#F5F0E7] transition-colors"
                >
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas Column */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <h3 className="font-display font-semibold text-base text-[#A8B69C] mb-4">
              Áreas
            </h3>
            <div className="flex flex-wrap gap-2">
              {CONFIRMED_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  to={`/explorar?categoria=${encodeURIComponent(category)}`}
                  className="btn-press inline-flex items-center min-h-10 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#482332] text-sm font-medium text-[#F5F0E7]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-base text-[#D8CDC8]">
          <p className="text-base font-normal text-[#D8CDC8]">
            Revelado Cultural · Comuna 11, Laureles - Estadio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
