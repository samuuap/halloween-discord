// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CONFIG } from "@/data/config";

// Carga bajo demanda (code-splitting)
const Calendar = lazy(() => import("@/components/Calendar"));
const Countdown = lazy(() => import("@/components/Countdown"));
const DayPage = lazy(() => import("@/pages/DayPage")); // ✅ antes: "@/pages/DayPage"

function Fallback() {
  return (
    <div
      className="min-h-screen grid place-items-center px-4 text-white/80"
      role="status"
      aria-live="polite"
    >
      <div className="animate-pulse text-center">
        <div className="text-2xl font-bold mb-2">Cargando…</div>
        <div className="text-sm text-white/60">
          Preparando el calendario de Halloween 🎃
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-grid mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold">Página no encontrada</h1>
      <a
        className="inline-block mt-4 px-3 py-2 rounded-xl border border-white/15 hover:shadow-ring"
        href="/"
      >
        ← Volver al calendario
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="max-w-grid mx-auto px-4 pt-6">
                  <div className="flex justify-end">
                    <Countdown year={CONFIG.year} monthIndex0={CONFIG.month} />
                  </div>
                </div>
                <Calendar />
              </div>
            }
          />
          <Route path="/day/:day" element={<DayPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
