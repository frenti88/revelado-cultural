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
    <header className="sticky top-0 z-40 w-full bg-[#170B25]/94 backdrop-blur-md border-b border-[#3D2254]">
      {/* Skip link for keyboard accessibility */}
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#F9C63C] focus:text-[#170B25] focus:font-bold shadow-lg"
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
                    ? "text-[#FAF6FB] font-bold"
                    : "text-[#D1C6DA] hover:text-[#FAF6FB] font-medium"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#F9C63C]"
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
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F9C63C] rounded-full"
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
            className="btn-press inline-flex items-center gap-1.5 sm:gap-2 min-h-10 sm:min-h-11 px-4 sm:px-5 py-2 rounded-full bg-[#F9C63C] text-[#170B25] text-sm font-bold shadow-[0_4px_16px_rgba(249,198,60,0.25)] hover:bg-[#EAB428] transition-colors"
          >
            <span className="hidden sm:inline">Explorar iniciativas</span>
            <span className="sm:hidden">Explorar</span>
            <ArrowUpRight
              className="w-4 h-4 stroke-[2.4] icon-glide"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
