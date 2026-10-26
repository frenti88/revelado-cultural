import React from "react";
import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Compass, Home, Info } from "lucide-react";

export const MobileBottomNav: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const destinations = [
    { to: "/", label: "Inicio", icon: Home, end: true },
    { to: "/explorar", label: "Explorar", icon: Compass, end: false },
    { to: "/acerca-de", label: "Acerca de", icon: Info, end: false },
  ];

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#151515]/95 backdrop-blur-lg border-t border-[#2E2E2E] bottom-safe-bar"
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
                      ? "text-[#F2EFE8] font-bold"
                      : "text-[#A7A39D] hover:text-[#F2EFE8] font-medium"
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
                          className="absolute inset-0 rounded-full bg-[#C9321B]/20 border border-[#FF5C38]/40"
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className="relative z-10 w-4 h-4 stroke-[2.2]"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-xs tracking-wide mt-1 leading-tight flex items-center gap-1 font-mono-meta">
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="w-1 h-1 rounded-full bg-[#C9321B]"
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
