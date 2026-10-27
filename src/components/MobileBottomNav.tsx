import React from "react";
import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Compass, Home, Info } from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const destinations = [
    { to: "/", label: "Inicio", icon: Home, end: true },
    { to: "/explorar", label: "Explorar", icon: Compass, end: false },
    { to: "/revelado-cultural", label: "Revelado Cultural", icon: Info, end: false },
  ];

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#170B25]/96 backdrop-blur-lg border-t border-[#3D2254] bottom-safe-bar"
    >
      <ul className="grid grid-cols-3 max-w-md mx-auto px-4 h-16 items-center gap-2">
        {destinations.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex justify-center">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative flex flex-col items-center justify-center w-full min-h-12 py-1 rounded-xl transition-colors active:scale-95 ${
                    isActive
                      ? "text-[#FAF6FB] font-bold"
                      : "text-[#D1C6DA] hover:text-[#FAF6FB] font-medium"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative flex items-center justify-center px-4 py-1 rounded-full">
                      {isActive && (
                        <motion.span
                          layoutId={
                            shouldReduceMotion ? undefined : "mobile-nav-pill"
                          }
                          transition={{
                            duration: 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="absolute inset-0 rounded-full bg-[#37105F] border border-[#F9C63C]/60"
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className={`relative z-10 w-4 h-4 stroke-[2.2] ${
                          isActive ? "text-[#F9C63C]" : "text-[#D1C6DA]"
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-[10px] sm:text-xs tracking-tight mt-0.5 leading-tight text-center font-mono-meta flex items-center justify-center gap-1 whitespace-nowrap">
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#F9C63C] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
