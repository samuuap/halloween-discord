// src/components/AdminBar.tsx
import React from "react";
import { isAdminActive, ensureAdmin, loginAdmin, logoutAdmin } from "@/lib/admin";

const AdminBar: React.FC = () => {
  const [active, setActive] = React.useState<boolean>(false);
  const [code, setCode] = React.useState<string>("");

  React.useEffect(() => {
    ensureAdmin().then(() => setActive(isAdminActive()));
  }, []);

  const handleLogin = async () => {
    if (!code) {
      alert("Introduce el codigo de admin");
      return;
    }
    const ok = await loginAdmin(code);
    if (!ok) {
      alert("Codigo incorrecto");
      return;
    }
    setCode("");
    setActive(true);
    location.replace(location.pathname);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setActive(false);
    alert("Admin desactivado");
    location.replace(location.pathname);
  };

  if (typeof window === "undefined") return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-gray-300 bg-white/90 px-3 py-2 shadow-md backdrop-blur"
      role="region"
      aria-label="Admin controls"
    >
      <span className="text-sm font-medium">
        {active ? "Admin activo" : "Admin inactivo"}
      </span>

      {active ? (
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 active:scale-95 transition"
        >
          Desactivar
        </button>
      ) : (
        <>
          <input
            type="password"
            placeholder="Codigo"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-28 rounded-lg border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2"
          />
          <button
            onClick={handleLogin}
            className="rounded-lg bg-black px-3 py-1 text-sm text-white hover:opacity-90 active:scale-95 transition"
          >
            Activar
          </button>
        </>
      )}
    </div>
  );
};

export default AdminBar;
