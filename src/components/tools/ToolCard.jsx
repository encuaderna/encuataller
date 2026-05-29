import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, ChevronRight } from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";
import CategoryIcon, { categoryMap } from "./CategoryIcon";
import { useCurrency, convertCost } from "@/hooks/useCurrency";

export default function ToolCard({ tool }) {
  const categoryLabel = categoryMap[tool.category]?.label || tool.category;
  const { currency } = useCurrency();
  const convertedCost = convertCost(tool.estimated_cost, currency);

  return (
    <Link
      to={`/tools/${tool.id}`}
      className="block group focus-visible:outline-none"
      aria-label={`Ver instrucciones para: ${tool.name}`}
    >
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/30 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <CategoryIcon category={tool.category} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground leading-tight">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{categoryLabel}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" aria-hidden="true" />
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <DifficultyBadge difficulty={tool.difficulty} />
            {convertedCost && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground" aria-label={`Coste estimado: ${convertedCost}`}>
                <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                {convertedCost}
              </span>
            )}
            {tool.build_time && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground" aria-label={`Tiempo de construcción: ${tool.build_time}`}>
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {tool.build_time}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}