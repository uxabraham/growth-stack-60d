"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

const NAV = [
  { href: "/admin", label: "Resumen", icon: "▦" },
  { href: "/admin/contenido", label: "Contenido", icon: "✎" },
  { href: "/admin/analitica", label: "Analítica", icon: "▲" },
  { href: "/admin/cuenta", label: "Cuenta", icon: "◍" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-empirika-orange via-amber-400 to-empirika-orange" />

      <div className="flex min-h-[calc(100vh-4px)]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-white/10 bg-[#0c0c0c] transition-transform duration-200 lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center gap-2 px-6">
            <span className="text-sm font-bold tracking-[0.1em]">
              EMPIRIKA<span className="text-empirika-orange">.</span>ADMIN
            </span>
          </div>

          <nav className="mt-4 flex flex-col gap-1 px-3">
            {NAV.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <span className="text-xs opacity-70">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 border-t border-white/10 p-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white/80"
            >
              <span className="text-xs opacity-70">↗</span>
              Ver la web
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/50 transition-colors hover:bg-white/5 hover:text-white/80 disabled:opacity-50"
            >
              <span className="text-xs opacity-70">⏻</span>
              {loggingOut ? "Saliendo…" : "Salir"}
            </button>
          </div>
        </aside>

        {mobileOpen && (
          <button
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          />
        )}

        {/* Main */}
        <div className="flex-1 lg:pl-0">
          <div className="flex h-16 items-center gap-4 border-b border-white/10 px-4 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm"
            >
              ☰ Menú
            </button>
            <span className="text-sm font-bold tracking-[0.1em]">
              EMPIRIKA<span className="text-empirika-orange">.</span>ADMIN
            </span>
          </div>

          <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
