import React, { useState } from "react";
import { Check, Lightbulb } from "lucide-react";

export default function StepList({ steps }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const sortedSteps = [...(steps || [])].sort((a, b) => a.order - b.order);

  const toggleStep = (order) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(order)) {
        next.delete(order);
      } else {
        next.add(order);
      }
      return next;
    });
  };

  const progress = sortedSteps.length > 0
    ? Math.round((completedSteps.size / sortedSteps.length) * 100)
    : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Progreso: {completedSteps.size} de {sortedSteps.length} pasos
          </span>
          <span className="text-sm font-semibold text-primary" aria-live="polite">
            {progress}%
          </span>
        </div>
        <div
          className="w-full h-3 bg-muted rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progreso de construcción: ${progress}%`}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <ol className="space-y-4" aria-label="Pasos de construcción">
        {sortedSteps.map((step) => {
          const isComplete = completedSteps.has(step.order);
          return (
            <li key={step.order}>
              <button
                onClick={() => toggleStep(step.order)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isComplete
                    ? "border-primary/40 bg-accent"
                    : "border-border bg-card hover:border-primary/20"
                }`}
                aria-label={`Paso ${step.order}: ${step.title}. ${isComplete ? "Completado" : "Sin completar"}. Pulsa para cambiar.`}
              >
                <div className="flex items-start gap-3">
                  {/* Step number / check */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-colors ${
                      isComplete
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                    aria-hidden="true"
                  >
                    {isComplete ? <Check className="w-4 h-4" /> : step.order}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-sm mb-1 ${isComplete ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.instruction}
                    </p>
                    {step.tip && (
                      <div className="mt-2 flex items-start gap-2 text-xs text-primary bg-accent/50 rounded-lg p-2.5">
                        <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span><strong>Consejo:</strong> {step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}