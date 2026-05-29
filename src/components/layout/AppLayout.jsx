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
      <footer className="border-t border-border mt-12 py-6 text-center text-sm text-muted-foreground">
        <p>EncuaTaller — Herramientas de encuadernación accesibles para todos</p>
      </footer>
    </div>
  );
}