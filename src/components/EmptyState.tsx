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
      className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-8 sm:p-12 text-center max-w-xl mx-auto my-6 shadow-[0_12px_32px_rgba(14,6,23,0.5)]"
    >
      <span
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#170B25] border border-[#583178] text-[#F9C63C] mb-4 shadow-sm"
        aria-hidden="true"
      >
        <SearchX className="w-6 h-6 stroke-[2.2]" />
      </span>

      <span className="font-mono-meta text-xs uppercase tracking-widest text-[#F9C63C] font-bold block">
        Sin resultados coincidentes
      </span>
      <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] mt-2">
        No encontramos iniciativas con ese criterio
      </h3>
      <p className="mt-4 text-base sm:text-lg font-normal text-[#D1C6DA] mx-auto">
        {query && category
          ? `No hay proyectos en «${category}» que coincidan con «${query}».`
          : query
          ? `Ninguna de las ocho iniciativas coincide con «${query}».`
          : `No hay proyectos registrados bajo el filtro seleccionado.`}
      </p>

      {onSuggestQuery && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono-meta text-xs text-[#D1C6DA]">
            Prueba buscar:
          </span>
          {SUGGESTIONS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onSuggestQuery(term)}
              className="btn-press inline-flex items-center min-h-10 px-3.5 py-1.5 rounded-full bg-[#170B25] border border-[#3D2254] hover:border-[#F9C63C] text-xs font-mono-meta text-[#FAF6FB] cursor-pointer transition-colors shadow-sm"
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
          className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-base font-bold shadow-lg transition-colors cursor-pointer hover:bg-[#EAB428]"
        >
          <RotateCcw className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
          <span>Limpiar filtros</span>
        </button>

        <Link
          to="/proyectos/ferales"
          className="btn-press inline-flex items-center gap-2 min-h-12 px-5 py-3 rounded-full bg-[#170B25] border border-[#3D2254] hover:border-[#F9C63C] text-[#FAF6FB] text-base font-medium transition-colors shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
          <span>Sorpréndeme con una historia</span>
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
