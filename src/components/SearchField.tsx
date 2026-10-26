import React, { useEffect, useId, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = "Buscar por nombre del proyecto, descripción o responsable…",
}) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        Buscar iniciativas culturales por nombre, descripción o responsable
      </label>
      <div className="relative flex items-center">
        <Search
          className="absolute left-4 w-4 h-4 text-[#FF5C38] pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full min-h-12 pl-12 pr-14 py-3 rounded-xl bg-[#222222] border border-[#2E2E2E] focus:border-[#FF5C38] text-[#F2EFE8] placeholder:text-[#A7A39D]/60 text-base font-normal transition-colors"
        />
        {value.trim().length > 0 ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            aria-label="Limpiar texto de búsqueda"
            className="absolute right-2 w-11 h-11 inline-flex items-center justify-center rounded-lg text-[#A7A39D] hover:text-[#F2EFE8] hover:bg-[#2E2E2E] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : (
          <kbd
            aria-hidden="true"
            title="Pulsa / para buscar rápidamente"
            className="hidden sm:inline-flex items-center justify-center absolute right-4 px-2 py-0.5 rounded bg-[#151515] border border-[#2E2E2E] font-mono-meta text-xs text-[#A7A39D] pointer-events-none"
          >
            /
          </kbd>
        )}
      </div>
    </div>
  );
};

export default SearchField;
