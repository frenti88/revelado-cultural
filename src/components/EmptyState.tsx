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
      className="rounded-xl bg-[#211820] p-8 sm:p-12 text-center max-w-xl mx-auto my-6 shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
    >
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#161317] text-[#A8B69C] mb-4"
        aria-hidden="true"
      >
        <SearchX className="w-6 h-6" />
      </span>

      <span className="font-display font-medium text-sm text-[#A8B69C] block">
        Negativo aún sin revelar
      </span>
      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F0E7] mt-2">
        No encontramos iniciativas con ese criterio
      </h3>
      <p className="mt-4 text-base sm:text-lg font-normal text-[#D8CDC8] mx-auto">
        {query && category
          ? `No hay proyectos en «${category}» que coincidan con «${query}».`
          : query
          ? `Ninguna de las ocho iniciativas coincide con «${query}».`
          : `No hay proyectos registrados bajo el filtro seleccionado.`}
      </p>

      {onSuggestQuery && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono-meta text-xs text-[#D8CDC8]">
            Prueba buscar:
          </span>
          {SUGGESTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onSuggestQuery(term)}
              className="btn-press inline-flex items-center min-h-11 px-4 py-2 rounded-full bg-[#161317] hover:bg-[#482332] text-xs font-medium text-[#A8B69C] hover:text-[#F5F0E7] cursor-pointer"
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
          className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-base font-medium cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Limpiar filtros</span>
        </button>

        <Link
          to="/proyectos/ferales"
          className="btn-press inline-flex items-center gap-2 min-h-12 px-5 py-3 rounded-full bg-[#161317] hover:bg-[#2c202a] text-[#F5F0E7] text-base font-medium"
        >
          <Sparkles className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
          <span>Sorpréndeme con una historia</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
