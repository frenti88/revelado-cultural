import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Aperture } from "lucide-react";

export const SiteHeader: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();

  const catalogReturnState = location.pathname.startsWith("/explorar")
    ? `${location.pathname}${location.search}`
    : "/explorar";

  const navItems = [
    { to: "/", label: "Inicio", end: true },
    { to: "/explorar", label: "Explorar", end: false },
    { to: "/acerca-de", label: "Acerca de", end: false },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#161317]/92 backdrop-blur-md border-b border-[#433840]/60">
      {/* Skip link for keyboard accessibility */}
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#A8B69C] focus:text-[#161317] focus:font-bold"
      >
        Saltar al contenido principal
      </a>

      <div className="layout-container h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Identity */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 sm:gap-4 rounded-lg py-1 min-w-0 focus:outline-none"
          aria-label="Revelado Cultural: Ir al inicio"
        >
          <span
            className="relative shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#211820] text-[#F5F0E7] group-hover:bg-[#2c202a] transition-colors"
            aria-hidden="true"
          >
            <Aperture className="w-4 h-4 text-[#A8B69C] transition-transform duration-300 group-hover:rotate-45" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#742940]" />
          </span>

          <div className="flex flex-col min-w-0">
            <span className="font-display font-bold text-sm sm:text-lg tracking-tight text-[#F5F0E7] leading-none truncate">
              Revelado Cultural
            </span>
            <span className="font-mono-meta text-xs text-[#D8CDC8] mt-1 leading-none truncate">
              Comuna 11 · Laureles y Estadio
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation with Shared Layout Underline */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative py-2 text-base transition-colors ${
                  isActive
                    ? "text-[#F5F0E7] font-medium"
                    : "text-[#D8CDC8] hover:text-[#F5F0E7] font-normal"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full bg-[#A8B69C]"
                      aria-hidden="true"
                    />
                  )}
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId={
                        shouldReduceMotion ? undefined : "desktop-nav-underline"
                      }
                      transition={{
                        duration: 0.26,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A8B69C] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Pill CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <Link
            to={catalogReturnState}
            className="btn-press inline-flex items-center gap-1.5 sm:gap-2 min-h-10 sm:min-h-11 px-3.5 sm:px-6 py-2 rounded-full bg-[#742940] hover:bg-[#89314c] text-[#F5F0E7] text-sm font-medium shadow-[0_4px_16px_rgba(116,41,64,0.35)]"
          >
            <span className="hidden sm:inline">Explorar proyectos</span>
            <span className="sm:hidden">Explorar</span>
            <ArrowUpRight
              className="w-4 h-4 stroke-[2.2] icon-glide"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
