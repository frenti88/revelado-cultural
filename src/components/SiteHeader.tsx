import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

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
    <header className="sticky top-0 z-40 w-full bg-[#151515]/92 backdrop-blur-md border-b border-[#2E2E2E]">
      {/* Skip link for keyboard accessibility */}
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#C9321B]text-white focus:font-bold"
      >
        Saltar al contenido principal
      </a>

      <div className="layout-container h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Identity */}
        <BrandLogo />

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
                    ? "text-[#F2EFE8] font-semibold"
                    : "text-[#A7A39D] hover:text-[#F2EFE8] font-normal"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#C9321B]"
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
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9321B] rounded-full"
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
            className="btn-press inline-flex items-center gap-1.5 sm:gap-2 min-h-10 sm:min-h-11 px-3.5 sm:px-5 py-2 rounded-full bg-[#C9321B]text-white text-sm font-semibold shadow-[0_4px_16px_rgba(235,68,42,0.3)] transition-colors"
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
