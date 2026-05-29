import React from "react";
import { Scissors, Columns2, Pen, ArrowDownToLine, Droplets, Ruler, Sparkles, BookOpen } from "lucide-react";

const categoryMap = {
  cutting: { icon: Scissors, label: "Corte" },
  folding: { icon: Columns2, label: "Plegado" },
  sewing: { icon: Pen, label: "Costura" },
  pressing: { icon: ArrowDownToLine, label: "Prensado" },
  gluing: { icon: Droplets, label: "Pegado" },
  measuring: { icon: Ruler, label: "Medición" },
  finishing: { icon: Sparkles, label: "Acabado" },

};

export default function CategoryIcon({ category, showLabel = false, size = "md" }) {
  const config = categoryMap[category] || categoryMap.cutting;
  const Icon = config.icon;
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";

  return (
    <span className="inline-flex items-center gap-1.5" aria-label={config.label}>
      <Icon className={`${sizeClass} text-primary`} aria-hidden="true" />
      {showLabel && <span className="text-sm text-muted-foreground">{config.label}</span>}
    </span>
  );
}

export { categoryMap };