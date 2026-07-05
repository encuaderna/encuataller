import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import ToolCard from "@/components/tools/ToolCard";
import ToolListRow from "@/components/tools/ToolListRow";
import CategoryFilter from "@/components/tools/CategoryFilter";
import CurrencySelector from "@/components/tools/CurrencySelector";
import SewingView from "@/components/tools/SewingView";
import OrdenView from "@/components/tools/OrdenView";
import { LayoutGrid, List, Search } from "lucide-react";

export default function ToolsList() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState(() => localStorage.getItem("tools_view") || "grid");

  const setView = (mode) => {
    localStorage.setItem("tools_view", mode);
    setViewMode(mode);
  };

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ["tools"],
    queryFn: () => base44.entities.Tool.list(),
  });

  const filtered = tools
    .filter((t) => category === "all" || t.category === category)
    .filter((t) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        t.name?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q)
      );
    });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Herramientas</h1>
          <p className="text-sm text-muted-foreground">
            {tools.length} herramientas disponibles para construir
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CurrencySelector />
          {/* View toggle */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
              aria-label="Vista cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
              aria-label="Vista lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Buscar herramienta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <CategoryFilter selected={category} onSelect={setCategory} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="p-5 rounded-xl border border-border">
              <Skeleton className="h-10 w-10 rounded-lg mb-3" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : category === "orden" ? (
        <OrdenView />
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron herramientas.</p>
        </div>
      ) : category === "sewing" ? (
        <SewingView tools={filtered} />
      ) : viewMode === "list" ? (
        <div className="flex flex-col gap-2" role="list" aria-label="Lista de herramientas">
          {/* Header row */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <div className="w-5" />
            <div className="flex-1">Nombre</div>
            <div className="w-24">Dificultad</div>
            <div className="hidden md:block w-24 text-right">Costo</div>
            <div className="hidden lg:block w-24 text-right">Tiempo</div>
            <div className="w-4" />
          </div>
          {filtered.map((tool) => (
            <div key={tool.id} role="listitem">
              <ToolListRow tool={tool} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Lista de herramientas">
          {filtered.map((tool) => (
            <div key={tool.id} role="listitem">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}