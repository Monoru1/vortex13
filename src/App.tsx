import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";

/* Code splitting par route : seule la page d'accueil est dans le bundle initial. */
const Collections = lazy(() => import("@/pages/Collections"));
const VehicleDetail = lazy(() => import("@/pages/VehicleDetail"));
const Exhibitions = lazy(() => import("@/pages/Exhibitions"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const History = lazy(() => import("@/pages/History"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** État d'attente minimal pendant le chargement d'une route. */
function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center" role="status" aria-label="Chargement">
      <div className="h-px w-24 overflow-hidden bg-white/10">
        <div className="h-full w-1/2 animate-[slide_1s_ease-in-out_infinite] bg-vortex" />
      </div>
      <style>{`@keyframes slide { from { transform: translateX(-100%); } to { transform: translateX(300%); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="collections"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Collections />
            </Suspense>
          }
        />
        <Route
          path="vehicules/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <VehicleDetail />
            </Suspense>
          }
        />
        <Route
          path="expositions"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Exhibitions />
            </Suspense>
          }
        />
        <Route
          path="galerie"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Gallery />
            </Suspense>
          }
        />
        <Route
          path="histoire"
          element={
            <Suspense fallback={<RouteFallback />}>
              <History />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
