import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import ToolCard from "@/components/tools/ToolCard";
import CategoryFilter from "@/components/tools/CategoryFilter";
import CurrencySelector from "@/components/tools/CurrencySelector";
import SewingView from "@/components/tools/SewingView";
import OrdenView from "@/components/tools/OrdenView";

export default function ToolsList() {
  const [category, setCategory] = useState("all");

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ["tools"],
    queryFn: () => base44.entities.Tool.list(),
  });

  const filtered = category === "all"
    ? tools
    : tools.filter((t) => t.category === category);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Herramientas</h1>
          <p className="text-sm text-muted-foreground">
            {tools.length} herramientas disponibles para construir
          </p>
        </div>
        <CurrencySelector />
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
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay herramientas en esta categoría aún.</p>
        </div>
      ) : category === "orden" ? (
        <OrdenView />
      ) : category === "sewing" ? (
        <SewingView tools={filtered} />
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