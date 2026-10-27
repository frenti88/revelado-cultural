import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { CatalogProvider } from "./context/CatalogContext";
import SiteHeader from "./components/SiteHeader";
import MobileBottomNav from "./components/MobileBottomNav";
import SiteFooter from "./components/SiteFooter";
import HomePage from "./pages/HomePage";

const loadExplorePage = () => import("./pages/ExplorePage");
const loadProjectDetailPage = () => import("./pages/ProjectDetailPage");
const loadAboutPage = () => import("./pages/AboutPage");
const loadAdminPage = () => import("./pages/AdminPage");

const ExplorePage = lazy(loadExplorePage);
const ProjectDetailPage = lazy(loadProjectDetailPage);
const AboutPage = lazy(loadAboutPage);
const AdminPage = lazy(loadAdminPage);

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  useEffect(() => {
    // Prefetch secondary routes during browser idle time after initial paint
    const prefetchRoutes = () => {
      void loadExplorePage();
      void loadProjectDetailPage();
      void loadAboutPage();
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetchRoutes, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = globalThis.setTimeout(prefetchRoutes, 350);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return (
    <CatalogProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#161317] text-[#F5F0E7]">
          <SiteHeader />

          <main id="contenido-principal" className="flex-1">
            <Suspense
              fallback={
                <div className="layout-container py-16 text-base font-medium text-[#A8B69C]">
                  Cargando contenido…
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explorar" element={<ExplorePage />} />
                <Route
                  path="/proyectos/:slug"
                  element={<ProjectDetailPage />}
                />
                <Route path="/acerca-de" element={<AboutPage />} />
                <Route path="/revelado-cultural" element={<AboutPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route
                  path="*"
                  element={
                    <div className="layout-container py-20 text-center max-w-xl mx-auto">
                      <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F0E7]">
                        No encontramos esa página
                      </h1>
                      <p className="mt-4 text-base sm:text-lg text-[#D8CDC8] mx-auto">
                        Es posible que el enlace haya cambiado. Puedes buscar
                        cualquiera de las ocho iniciativas culturales en el
                        catálogo o volver al inicio.
                      </p>
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                          to="/explorar"
                          className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-base font-medium"
                        >
                          Ir al catálogo de proyectos
                        </Link>
                        <Link
                          to="/"
                          className="btn-press inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-full bg-[#211820] hover:bg-[#2d212b] text-[#F5F0E7] text-base font-medium"
                        >
                          Volver al inicio
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          <SiteFooter />
          <MobileBottomNav />
        </div>
      </BrowserRouter>
    </CatalogProvider>
  );
};

export default App;
