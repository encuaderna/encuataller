import React from "react";
import { Badge } from "@/components/ui/badge";
import { Circle, Triangle, Star } from "lucide-react";

const difficultyConfig = {
  easy: {
    label: "Fácil",
    icon: Circle,
    className: "bg-accent text-accent-foreground border border-primary/30",
    pattern: "●",
  },
  medium: {
    label: "Intermedio",
    icon: Triangle,
    className: "bg-secondary text-secondary-foreground border border-border",
    pattern: "▲",
  },
  hard: {
    label: "Avanzado",
    icon: Star,
    className: "bg-muted text-muted-foreground border border-border",
    pattern: "★",
  },
};

export default function DifficultyBadge({ difficulty }) {
  const config = difficultyConfig[difficulty] || difficultyConfig.easy;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={`${config.className} flex items-center gap-1.5 text-xs font-medium px-2.5 py-1`}
    >
      <Icon className="w-3 h-3" aria-hidden="true" />
      <span>{config.label}</span>
    </Badge>
  );
}