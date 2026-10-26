import React from "react";
import { Check, Layers } from "lucide-react";
import { CONFIRMED_CATEGORIES } from "../data/catalog";

interface CategoryFiltersProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  countsByCategory?: Record<string, number>;
  totalCount?: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  countsByCategory,
  totalCount = 8,
}) => {
  const isAllActive = !selectedCategory;

  return (
    <div
      role="group"
      aria-label="Filtrar iniciativas por disciplina cultural"
      className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
    >
      {/* "Todas" Chip */}
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        aria-pressed={isAllActive}
        className={`btn-press shrink-0 inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full text-sm sm:text-base font-semibold cursor-pointer transition-colors ${
          isAllActive
            ? "bg-[#F9C63C] text-[#170B25] shadow-[0_4px_14px_rgba(249,198,60,0.3)]"
            : "bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] text-[#D1C6DA] hover:text-[#FAF6FB]"
        }`}
      >
        {isAllActive ? (
          <Check className="w-4 h-4 text-[#170B25] stroke-[2.8]" aria-hidden="true" />
        ) : (
          <Layers className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
        )}
        <span>Todas las disciplinas</span>
        <span
          className={`px-2 py-0.5 rounded-full font-mono-meta text-xs leading-none ${
            isAllActive
              ? "bg-[#170B25] text-[#F9C63C] font-bold"
              : "bg-[#170B25] text-[#D1C6DA]"
          }`}
        >
          {totalCount}
        </span>
      </button>

      {/* Confirmed Discipline Chips */}
      {CONFIRMED_CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;
        const count = countsByCategory ? countsByCategory[category] ?? 0 : undefined;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(isActive ? null : category)}
            aria-pressed={isActive}
            className={`btn-press shrink-0 inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full text-sm sm:text-base font-semibold cursor-pointer transition-colors ${
              isActive
                ? "bg-[#F9C63C] text-[#170B25] shadow-[0_4px_14px_rgba(249,198,60,0.3)]"
                : "bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] text-[#D1C6DA] hover:text-[#FAF6FB]"
            }`}
          >
            {isActive ? (
              <Check
                className="w-4 h-4 stroke-[2.8] text-[#170B25]"
                aria-hidden="true"
              />
            ) : (
              <span
                className="w-2 h-2 rounded-full shrink-0 bg-[#B184D5]"
                aria-hidden="true"
              />
            )}
            <span>{category}</span>
            {typeof count === "number" && (
              <span
                className={`px-2 py-0.5 rounded-full font-mono-meta text-xs leading-none ${
                  isActive
                    ? "bg-[#170B25] text-[#F9C63C] font-bold"
                    : "bg-[#170B25] text-[#D1C6DA]"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilters;
