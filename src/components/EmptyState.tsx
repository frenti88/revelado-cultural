import React from "react";
import { Link } from "react-router-dom";
import { RotateCcw, SearchX, Sparkles } from "lucide-react";

interface EmptyStateProps {
  query?: string;
  category?: string | null;
  onReset: () => void;
  onSuggestQuery?: (suggestion: string) => void;
}

const SUGGESTIONS = ["Ferales", "Teatro", "Viñetas", "Margarita Ortiz"];

export const EmptyState: React.FC<EmptyStateProps> = ({
  query,
  category,
  onReset,
  onSuggestQuery,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl bg-[#222222] border border-[#2E2E2E] p-8 sm:p-12 text-center max-w-xl mx-auto my-6 shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
    >
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#151515] border border-[#2E2E2E] text-[#FF5C38] mb-4"
        aria-hidden="true"
      >
        <SearchX className="w-6 h-6" />
      </span>

      <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block">
        Negativo aún sin revelar
      </span>
      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F2EFE8] mt-2">
        No encontramos iniciativas con ese criterio
      </h3>
      <p className="mt-4 text-base sm:text-lg font-normal text-[#A7A39D] mx-auto">
        {query && category
          ? `No hay proyectos en «${category}» que coincidan con «${query}».`
          : query
          ? `Ninguna de las ocho iniciativas coincide con «${query}».`
          : `No hay proyectos registrados bajo el filtro seleccionado.`}
      </p>

      {onSuggestQuery && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono-meta text-xs text-[#A7A39D]">
            Prueba buscar:
          </span>
          {SUGGESTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onSuggestQuery(term)}
              className="btn-press inline-flex items-center min-h-10 px-3.5 py-1.5 rounded-full bg-[#151515] border border-[#2E2E2E] hover:border-[#FF5C38] text-xs font-mono-meta text-[#F2EFE8] cursor-pointer transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#C9321B]text-white text-base font-semibold shadow-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Limpiar filtros</span>
        </button>

        <Link
          to="/proyectos/ferales"
          className="btn-press inline-flex items-center gap-2 min-h-12 px-5 py-3 rounded-full bg-[#151515] border border-[#2E2E2E] hover:border-[#FF5C38] text-[#F2EFE8] text-base font-medium transition-colors"
        >
          <Sparkles className="w-4 h-4 text-[#FF5C38]" aria-hidden="true" />
          <span>Sorpréndeme con una historia</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
