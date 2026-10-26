import React from "react";
import { Check, Layers } from "lucide-react";
import { CONFIRMED_CATEGORIES, DISCIPLINE_META } from "../data/catalog";

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
        className={`btn-press shrink-0 inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full text-sm sm:text-base font-medium cursor-pointer transition-colors ${
          isAllActive
            ? "bg-[#C9321B]text-white shadow-[0_4px_14px_rgba(235,68,42,0.35)]"
            : "bg-[#222222] hover:bg-[#2E2E2E] border border-[#2E2E2E] text-[#A7A39D] hover:text-[#F2EFE8]"
        }`}
      >
        {isAllActive ? (
          <Check className="w-4 h-4 text-[#F2EFE8] stroke-[2.5]" aria-hidden="true" />
        ) : (
          <Layers className="w-4 h-4 text-[#FF5C38]" aria-hidden="true" />
        )}
        <span>Todas las disciplinas</span>
        <span
          className={`px-2 py-0.5 rounded-full font-mono-meta text-xs leading-none ${
            isAllActive
              ? "bg-[#151515]/40 text-[#F2EFE8]"
              : "bg-[#151515] text-[#A7A39D]"
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
            className={`btn-press shrink-0 inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full text-sm sm:text-base font-medium cursor-pointer transition-colors ${
              isActive
                ? "bg-[#C9321B]text-white shadow-[0_4px_14px_rgba(235,68,42,0.35)]"
                : "bg-[#222222] hover:bg-[#2E2E2E] border border-[#2E2E2E] text-[#A7A39D] hover:text-[#F2EFE8]"
            }`}
          >
            {isActive ? (
              <Check
                className="w-4 h-4 stroke-[2.5] text-[#F2EFE8]"
                aria-hidden="true"
              />
            ) : (
              <span
                className="w-2 h-2 rounded-full shrink-0 bg-[#C9321B]"
                aria-hidden="true"
              />
            )}
            <span>{category}</span>
            {typeof count === "number" && (
              <span
                className="px-2 py-0.5 rounded-full font-mono-meta text-xs leading-none bg-[#151515]"
                style={{ color: isActive ? "#F2EFE8" : "#A7A39D" }}
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
