import React, { useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp, Wrench } from "lucide-react";

export default function CommonErrors({ errors }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!errors || errors.length === 0) return null;

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div>
      <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-primary" aria-hidden="true" />
        Errores frecuentes
      </h3>
      <ul className="space-y-2" aria-label="Lista de errores frecuentes">
        {errors.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full text-left flex items-center justify-between gap-3 px-4 py-3"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    !
                  </span>
                  <span className="text-sm font-medium text-foreground">{item.error}</span>
                </div>
                {isOpen
                  ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                  : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                }
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-border bg-accent/30">
                  <div className="flex items-start gap-2.5">
                    <Wrench className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="font-medium text-foreground">Solución: </span>
                      {item.solution}
                    </p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}