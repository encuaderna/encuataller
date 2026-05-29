import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft } from "lucide-react";
import ToolCard from "./ToolCard";

// IDs de las herramientas físicas de costura
const PUNZON_ID = "6a190e6b667d75b90ebacce1";
const TELAR_ID = "6a190e6b667d75b90ebacce3";

export default function SewingView({ tools }) {
  const [showTemplates, setShowTemplates] = useState(false);

  const punzon = tools.find((t) => t.id === PUNZON_ID);
  const telar = tools.find((t) => t.id === TELAR_ID);
  const templates = tools.filter(
    (t) => t.id !== PUNZON_ID && t.id !== TELAR_ID
  );

  if (showTemplates) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTemplates(false)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a Costura
        </Button>
        <h2 className="text-lg font-semibold text-foreground">Plantillas de costura</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Plantillas de costura">
          {templates.map((tool) => (
            <div key={tool.id} role="listitem">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-label="Herramientas de costura">
        {punzon && (
          <div role="listitem">
            <ToolCard tool={punzon} />
          </div>
        )}
        {telar && (
          <div role="listitem">
            <ToolCard tool={telar} />
          </div>
        )}
      </div>

      {templates.length > 0 && (
        <button
          onClick={() => setShowTemplates(true)}
          className="w-full flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 group"
          aria-label="Ver plantillas de costura"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Plantillas de costura</p>
              <p className="text-xs text-muted-foreground">{templates.length} patrones disponibles</p>
            </div>
          </div>
          <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180 group-hover:text-primary transition-colors" />
        </button>
      )}
    </div>
  );
}