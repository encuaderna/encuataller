import React from "react";
import { Button } from "@/components/ui/button";
import { categoryMap } from "./CategoryIcon";

const allCategories = [
  { key: "all", label: "Todas" },
  ...Object.entries(categoryMap).map(([key, val]) => ({ key, label: val.label })),
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Filtrar por categoría">
      {allCategories.map((cat) => {
        const isActive = selected === cat.key;
        return (
          <Button
            key={cat.key}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(cat.key)}
            role="radio"
            aria-checked={isActive}
            className={`text-sm rounded-full px-4 ${
              isActive ? "" : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {cat.label}
          </Button>
        );
      })}
    </div>
  );
}