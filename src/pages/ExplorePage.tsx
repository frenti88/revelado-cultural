import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { CONFIRMED_CATEGORIES } from "../data/catalog";
import SearchField from "../components/SearchField";
import CategoryFilters from "../components/CategoryFilters";
import ProjectGrid from "../components/ProjectGrid";
import EmptyState from "../components/EmptyState";

function normalizeText(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export const ExplorePage: React.FC = () => {
  const { publishedProjects } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get("categoria");
  const selectedCategory =
    rawCategory &&
    (CONFIRMED_CATEGORIES as readonly string[]).includes(rawCategory)
      ? rawCategory
      : null;
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    document.title = selectedCategory
      ? `Explorar ${selectedCategory} · Revelado Cultural`
      : "Explorar las 8 iniciativas · Revelado Cultural";
  }, [selectedCategory]);

  const countsByCategory = useMemo(() => {
    return CONFIRMED_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = publishedProjects.filter((p) => p.category === cat).length;
      return acc;
    }, {});
  }, [publishedProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    return publishedProjects.filter((project) => {
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack = [
        project.name,
        project.shortDescription,
        project.fullDescription,
        project.leader,
        project.category,
        project.id,
      ]
        .map(normalizeText)
        .join(" ");

      return haystack.includes(normalizedQuery);
    });
  }, [publishedProjects, selectedCategory, query]);

  const updateFilters = (nextCategory: string | null, nextQuery: string) => {
    const next = new URLSearchParams();
    if (nextCategory) {
      next.set("categoria", nextCategory);
    }
    if (nextQuery.trim()) {
      next.set("q", nextQuery);
    }
    setSearchParams(next, { replace: true });
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters = Boolean(selectedCategory || query.trim());

  return (
    <div className="w-full min-h-[75vh] bg-[#161317] section-macro">
      <div className="layout-container">
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-[#433840]/60">
          <h1 className="font-display font-bold text-heading-fluid text-[#F5F0E7]">
            Encuentra lo que te mueve
          </h1>
          <p className="mt-4 text-base sm:text-lg font-normal text-[#D8CDC8] max-w-2xl">
            Busca entre las ocho propuestas por disciplina, nombre o persona a
            cargo.
          </p>
        </div>

        {/* Search & Filters Controls */}
        <div className="space-y-6 mb-12">
          <div className="layout-grid-12 items-center">
            <div className="col-span-4 md:col-span-5 lg:col-span-8">
              <SearchField
                value={query}
                onChange={(nextQuery) =>
                  updateFilters(selectedCategory, nextQuery)
                }
              />
            </div>

            {/* Live Result Counter + Clear Filters */}
            <div className="col-span-4 md:col-span-3 lg:col-span-4 flex items-center justify-between lg:justify-end gap-4">
              <p
                role="status"
                aria-live="polite"
                className="font-mono-meta text-sm font-medium text-[#A8B69C]"
              >
                Mostrando {filteredProjects.length} de{" "}
                {publishedProjects.length}{" "}
                {filteredProjects.length === 1 ? "iniciativa" : "iniciativas"}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#742940] text-[#F5F0E7] text-sm font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                  <span>Limpiar filtros</span>
                </button>
              )}
            </div>
          </div>

          <CategoryFilters
            selectedCategory={selectedCategory}
            onSelectCategory={(nextCategory) =>
              updateFilters(nextCategory, query)
            }
            countsByCategory={countsByCategory}
            totalCount={publishedProjects.length}
          />
        </div>

        {/* Results Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <ProjectGrid
            projects={filteredProjects}
            columns={4}
            aspect="square"
          />
        ) : (
          <EmptyState
            query={query}
            category={selectedCategory}
            onReset={resetAllFilters}
            onSuggestQuery={(suggestion) => updateFilters(null, suggestion)}
          />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
