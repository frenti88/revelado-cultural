import React from "react";
import { Link } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";
import { CONFIRMED_CATEGORIES } from "../data/catalog";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#151515] border-t border-[#2E2E2E] pt-14 pb-24 md:pb-14">
      <div className="layout-container">
        <div className="layout-grid-12 pb-10 border-b border-[#2E2E2E]">
          {/* Brand Column */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5 flex flex-col justify-between">
            <div>
              <BrandLogo />
              <p className="mt-5 text-base font-normal text-[#A7A39D] max-w-sm leading-relaxed">
                Plataforma editorial que visibiliza ocho iniciativas culturales de
                la Comuna 11, Laureles–Estadio, ganadoras de la convocatoria de
                Presupuesto Participativo de Medellín.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono-meta text-xs text-[#A7A39D]">
              <span className="w-2 h-2 rounded-full bg-[#C9321B]" aria-hidden="true" />
              <span>La cultura del barrio, al descubierto</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <h3 className="font-display font-semibold text-base text-[#F2EFE8] mb-4">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-base">
              <li>
                <Link
                  to="/"
                  className="text-[#A7A39D] hover:text-[#FF5C38] transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/explorar"
                  className="text-[#A7A39D] hover:text-[#FF5C38] transition-colors"
                >
                  Explorar iniciativas
                </Link>
              </li>
              <li>
                <Link
                  to="/acerca-de"
                  className="text-[#A7A39D] hover:text-[#FF5C38] transition-colors"
                >
                  Acerca de Revelado Cultural
                </Link>
              </li>
            </ul>
          </div>

          {/* Disciplines Column */}
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
            <h3 className="font-display font-semibold text-base text-[#F2EFE8] mb-4">
              Disciplinas
            </h3>
            <div className="flex flex-wrap gap-2">
              {CONFIRMED_CATEGORIES.map((category) => (
                <Link
                  key={category}
                  to={`/explorar?categoria=${encodeURIComponent(category)}`}
                  className="btn-press inline-flex items-center min-h-9 px-3.5 py-1.5 rounded-full bg-[#222222] hover:bg-[#2E2E2E] text-xs font-mono-meta text-[#F2EFE8] border border-[#2E2E2E] hover:border-[#FF5C38] transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-meta text-[#A7A39D]">
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
