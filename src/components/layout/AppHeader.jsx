import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Wrench, Info } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function AppHeader() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Inicio", icon: Home },
    { to: "/tools", label: "Herramientas", icon: Wrench },
    { to: "/about", label: "Acerca de", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Ir al inicio">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-semibold text-lg text-foreground hidden sm:inline">
            EncuaTaller
          </span>
        </Link>

        <div className="flex items-center gap-1">
        <ThemeToggle />
        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-1" role="list">
            {links.map((link) => {
              const isActive = location.pathname === link.to || 
                (link.to !== "/" && location.pathname.startsWith(link.to));
              const Icon = link.icon;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </div>
      </div>
    </header>
  );
}