import React from "react";
import { Package } from "lucide-react";

export default function MaterialsList({ materials }) {
  if (!materials || materials.length === 0) return null;

  return (
    <div>
      <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
        <Package className="w-5 h-5 text-primary" aria-hidden="true" />
        Materiales necesarios
      </h3>
      <ul className="space-y-2" aria-label="Lista de materiales">
        {materials.map((mat, i) => (
          <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-medium text-sm text-foreground">{mat.name}</span>
                {mat.quantity && (
                  <span className="text-xs text-primary font-medium bg-accent px-2 py-0.5 rounded-full">
                    {mat.quantity}
                  </span>
                )}
              </div>
              {mat.notes && (
                <p className="text-xs text-muted-foreground mt-0.5">{mat.notes}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}