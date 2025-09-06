import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "@/components/Calendar";
import Countdown from "@/components/Countdown";
import { CONFIG } from "@/data/config";
import DayPage from "@/pages/DayPage";

function HalloweenShell({ children }: { children: React.ReactNode }) {
  return (
    // data-theme activa el tema "halloween" de daisyUI
    <div data-theme="halloween" className="relative min-h-screen bg-bg text-ink overflow-x-hidden isolate">
      {/* Capa de bruma súper ligera */}
      <div
        className="pointer-events-none fixed inset-0 opacity-90 blur-[18px] saturate-105"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 0%, rgba(255,255,255,.06), transparent 60%)," +
            "radial-gradient(50% 40% at 80% 10%, rgba(255,255,255,.05), transparent 60%)"
        }}
        aria-hidden="true"
      />
      <main className="relative z-[1]">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HalloweenShell>
              <div className="max-w-grid mx-auto px-4 pt-6">
                <div className="flex justify-end">
                  <div className="inline-block px-2 py-1 rounded-lg bg-accent/10 border border-accent/40 text-white shadow-[0_0_0_2px_rgba(255,107,0,.3),0_0_28px_rgba(255,107,0,.22)]">
                    <Countdown year={CONFIG.year} monthIndex0={CONFIG.month} />
                  </div>
                </div>
              </div>
              <Calendar />
            </HalloweenShell>
          }
        />
        <Route
          path="/day/:day"
          element={
            <HalloweenShell>
              <DayPage />
            </HalloweenShell>
          }
        />
        <Route
          path="*"
          element={
            <HalloweenShell>
              <div className="max-w-grid mx-auto px-4 py-10">
                {/* Aplicamos la fuente temática aquí */}
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-accent2 drop-shadow-[0_0_18px_rgba(167,139,250,.25)]">
                  Página no encontrada
                </h1>
                <a
                  className="inline-block mt-4 px-3 py-2 rounded-xl border border-white/15 hover:shadow-ring bg-accent/10 text-white"
                  href="/"
                >
                  ← Volver al calendario
                </a>
              </div>
            </HalloweenShell>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
