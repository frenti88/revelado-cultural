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
      {/* "Todas" Chip: Element-first sizing (min-h-11 = 44px touch target) + tactile press */}
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        aria-pressed={isAllActive}
        className={`btn-press shrink-0 inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full text-sm sm:text-base font-medium cursor-pointer ${
          isAllActive
            ? "bg-[#742940] text-[#F5F0E7] shadow-[0_4px_14px_rgba(116,41,64,0.45)]"
            : "bg-[#211820] hover:bg-[#2c202a] text-[#D8CDC8] hover:text-[#F5F0E7]"
        }`}
      >
        {isAllActive ? (
          <Check className="w-4 h-4 text-[#A8B69C] stroke-[2.5]" aria-hidden="true" />
        ) : (
          <Layers className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
        )}
        <span>Todas las disciplinas</span>
        <span
          className={`px-2 py-1 rounded-full font-mono-meta text-xs leading-none ${
            isAllActive
              ? "bg-[#161317]/60 text-[#A8B69C]"
              : "bg-[#161317] text-[#D8CDC8]"
          }`}
        >
          {totalCount}
        </span>
      </button>

      {/* Confirmed Discipline Chips with Chromatic Category Dots (/colorize) */}
      {CONFIRMED_CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;
        const count = countsByCategory ? countsByCategory[category] ?? 0 : undefined;
        const accentColor = DISCIPLINE_META[category].accentColor;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(isActive ? null : category)}
            aria-pressed={isActive}
            className={`btn-press shrink-0 inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full text-sm sm:text-base font-medium cursor-pointer ${
              isActive
                ? "bg-[#742940] text-[#F5F0E7] shadow-[0_4px_14px_rgba(116,41,64,0.45)]"
                : "bg-[#211820] hover:bg-[#2c202a] text-[#D8CDC8] hover:text-[#F5F0E7]"
            }`}
          >
            {isActive ? (
              <Check
                className="w-4 h-4 stroke-[2.5]"
                style={{ color: accentColor }}
                aria-hidden="true"
              />
            ) : (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
            )}
            <span>{category}</span>
            {typeof count === "number" && (
              <span
                className="px-2 py-1 rounded-full font-mono-meta text-xs leading-none bg-[#161317]"
                style={{ color: isActive ? accentColor : "#D8CDC8" }}
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
