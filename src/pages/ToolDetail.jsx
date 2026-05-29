import React from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, DollarSign, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DifficultyBadge from "@/components/tools/DifficultyBadge";
import CategoryIcon, { categoryMap } from "@/components/tools/CategoryIcon";
import MaterialsList from "@/components/tools/MaterialsList";
import StepList from "@/components/tools/StepList";
import CommonErrors from "@/components/tools/CommonErrors";
import CurrencySelector from "@/components/tools/CurrencySelector";
import { useCurrency, convertCost } from "@/hooks/useCurrency";

export default function ToolDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname;
  const toolId = path.split("/").pop();

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ["tool", toolId],
    queryFn: () => base44.entities.Tool.filter({ id: toolId }),
  });

  const tool = tools[0];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-4">No se encontró la herramienta.</p>
        <Link to="/tools">
          <Button variant="outline">Volver a herramientas</Button>
        </Link>
      </div>
    );
  }

  const { currency } = useCurrency();
  const categoryLabel = categoryMap[tool.category]?.label || tool.category;
  const convertedCost = convertCost(tool?.estimated_cost, currency);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link to="/tools" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Volver a herramientas
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CategoryIcon category={tool.category} showLabel />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          {tool.name}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-4 flex-wrap">
          <DifficultyBadge difficulty={tool.difficulty} />
          {convertedCost && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" aria-hidden="true" />
              <span aria-label={`Coste estimado: ${convertedCost}`}>{convertedCost}</span>
            </span>
          )}
          {tool.build_time && (
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span aria-label={`Tiempo estimado: ${tool.build_time}`}>{tool.build_time}</span>
            </span>
          )}
          <CurrencySelector />
        </div>
      </div>

      <hr className="border-border" />

      {/* Materials */}
      <MaterialsList materials={tool.materials} />

      <hr className="border-border" />

      {/* Steps */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">
          Instrucciones de construcción
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Pulsa cada paso para marcarlo como completado. Ve a tu ritmo.
        </p>
        <StepList steps={tool.steps} />
      </div>

      {/* Common errors */}
      {tool.common_errors && tool.common_errors.length > 0 && (
        <>
          <hr className="border-border" />
          <CommonErrors errors={tool.common_errors} />
        </>
      )}

      {/* Tips */}
      {tool.tips && (
        <>
          <hr className="border-border" />
          <div className="p-5 rounded-xl bg-accent/50 border border-primary/10">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Consejos adicionales</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.tips}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}