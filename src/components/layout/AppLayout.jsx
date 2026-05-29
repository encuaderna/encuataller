import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-border mt-12 py-8 text-center text-sm text-muted-foreground">
        <p className="mb-4">EncuaTaller — Herramientas de encuadernación accesibles para todos</p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="text-xs text-muted-foreground/60 self-center">Más apps:</span>
          <a
            href="https://bind-calm-create.base44.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:text-primary transition-colors"
          >
            Encuaderna
          </a>
        </div>
      </footer>
    </div>
  );
}