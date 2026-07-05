import React from "react";
import { Link } from "react-router-dom";
import DifficultyBadge from "@/components/tools/DifficultyBadge";
import CategoryIcon from "@/components/tools/CategoryIcon";
import { useCurrency, convertCost } from "@/hooks/useCurrency";
import { Clock, ChevronRight } from "lucide-react";

export default function ToolListRow({ tool }) {
  const { currency } = useCurrency();
  const convertedCost = convertCost(tool.estimated_cost, currency);

  return (
    <Link
      to={`/tools/${tool.id}`}
      className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all duration-150 group"
    >
      {/* Category icon */}
      <div className="flex-shrink-0">
        <CategoryIcon category={tool.category} />
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate block">
          {tool.name}
        </span>
      </div>

      {/* Difficulty */}
      <div className="hidden sm:block flex-shrink-0 w-24">
        <DifficultyBadge difficulty={tool.difficulty} />
      </div>

      {/* Cost */}
      <div className="hidden md:block flex-shrink-0 w-24 text-xs text-muted-foreground text-right">
        {convertedCost || "—"}
      </div>

      {/* Time */}
      <div className="hidden lg:flex items-center gap-1 flex-shrink-0 w-24 text-xs text-muted-foreground justify-end">
        {tool.build_time ? (
          <>
            <Clock className="w-3 h-3" />
            {tool.build_time}
          </>
        ) : "—"}
      </div>

      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
    </Link>
  );
}