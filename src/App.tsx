import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "@/components/Calendar";
import Countdown from "@/components/Countdown";
import { CONFIG } from "@/data/config";
import DayPage from "@/pages/DayPage";

export default function App() {
  return (
    <BrowserRouter>
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
        <Route
          path="*"
          element={
            <div className="max-w-grid mx-auto px-4 py-10">
              <h1 className="text-2xl font-extrabold">Página no encontrada</h1>
              <a className="inline-block mt-4 px-3 py-2 rounded-xl border border-white/15 hover:shadow-ring" href="/">← Volver al calendario</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
