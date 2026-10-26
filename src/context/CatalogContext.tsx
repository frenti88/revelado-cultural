import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { initialProjects } from "../data/catalog";
import type { CulturalProject } from "../types/cultural";

const STORAGE_KEY = "revelado_cultural_catalog_v5";
const AUTH_STORAGE_KEY = "revelado_cultural_curator_session";

function persistProjects(projects: CulturalProject[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // ignore storage errors
  }
}

interface CatalogContextValue {
  allProjects: CulturalProject[];
  publishedProjects: CulturalProject[];
  isAuthenticated: boolean;
  loginCurator: (passcode: string) => boolean;
  logoutCurator: () => void;
  updateProject: (updated: CulturalProject) => void;
  createProject: (project: CulturalProject) => void;
  reorderProjects: (id: string, direction: "up" | "down") => void;
  resetCatalog: () => void;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allProjects, setAllProjects] = useState<CulturalProject[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.sort((a: CulturalProject, b: CulturalProject) => a.order - b.order);
        }
      }
    } catch {
      // fallback to initialProjects
    }
    return initialProjects;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === "authorized";
    } catch {
      return false;
    }
  });

  const publishedProjects = useMemo(
    () =>
      allProjects
        .filter((p) => p.publicationStatus === "published")
        .sort((a, b) => a.order - b.order),
    [allProjects]
  );

  const loginCurator = useCallback((passcode: string) => {
    // Local editorial verification code for MVP demo without private credentials
    if (passcode.trim().toUpperCase() === "COMUNA11-PP") {
      setIsAuthenticated(true);
      try {
        window.sessionStorage.setItem(AUTH_STORAGE_KEY, "authorized");
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  }, []);

  const logoutCurator = useCallback(() => {
    setIsAuthenticated(false);
    try {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const updateProject = useCallback((updated: CulturalProject) => {
    setAllProjects((prev) => {
      const next = prev.map((p) => {
        if (p.id === updated.id) return updated;
        if (updated.featured && p.featured) return { ...p, featured: false };
        return p;
      });
      const sorted = [...next].sort((a, b) => a.order - b.order);
      persistProjects(sorted);
      return sorted;
    });
  }, []);

  const createProject = useCallback((project: CulturalProject) => {
    setAllProjects((prev) => {
      const sorted = [...prev, project].sort((a, b) => a.order - b.order);
      persistProjects(sorted);
      return sorted;
    });
  }, []);

  const reorderProjects = useCallback((id: string, direction: "up" | "down") => {
    setAllProjects((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((p) => p.id === id);
      if (index === -1) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;
      const swapped = [...sorted];
      const tempOrder = swapped[index].order;
      swapped[index] = { ...swapped[index], order: swapped[targetIndex].order };
      swapped[targetIndex] = { ...swapped[targetIndex], order: tempOrder };
      const finalSorted = swapped.sort((a, b) => a.order - b.order);
      persistProjects(finalSorted);
      return finalSorted;
    });
  }, []);

  const resetCatalog = useCallback(() => {
    setAllProjects(initialProjects);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      allProjects,
      publishedProjects,
      isAuthenticated,
      loginCurator,
      logoutCurator,
      updateProject,
      createProject,
      reorderProjects,
      resetCatalog,
    }),
    [
      allProjects,
      publishedProjects,
      isAuthenticated,
      loginCurator,
      logoutCurator,
      updateProject,
      createProject,
      reorderProjects,
      resetCatalog,
    ]
  );

  return (
    <CatalogContext.Provider value={contextValue}>
      {children}
    </CatalogContext.Provider>
  );
};

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return ctx;
}
