import React from "react";
import { Eye, Brain, Heart, Accessibility } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Daltonismo",
    description: "No dependemos solo del color para comunicar información. Usamos iconos, formas y texto junto a los colores.",
  },
  {
    icon: Brain,
    title: "TDAH y TEA",
    description: "Diseño limpio sin distracciones. Pasos numerados y progreso visual para mantener el foco. Sin animaciones excesivas.",
  },
  {
    icon: Accessibility,
    title: "Navegación por teclado",
    description: "Toda la app se puede usar con teclado. Indicadores de foco visibles y etiquetas accesibles en cada elemento.",
  },
  {
    icon: Heart,
    title: "A tu ritmo",
    description: "No hay temporizadores ni presión. Marca tu progreso y retoma cuando quieras. Cada paso se puede completar independientemente.",
  },
];

export default function About() {
  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Acerca de EncuaTaller</h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          EncuaTaller es una guía gratuita para construir herramientas de encuadernación caseras con bajo presupuesto. 
          Está diseñada pensando en la accesibilidad universal, para que cualquier persona pueda aprender a su ritmo.
        </p>
      </div>

      <section aria-labelledby="principles-title">
        <h2 id="principles-title" className="text-lg font-semibold text-foreground mb-4">
          Principios de accesibilidad
        </h2>
        <div className="space-y-4">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">¿Cómo usar esta app?</h2>
        <ol className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
            <span className="pt-1">Explora las herramientas en la sección <strong className="text-foreground">Herramientas</strong>. Puedes filtrar por categoría.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
            <span className="pt-1">Elige una herramienta que te interese y revisa los <strong className="text-foreground">materiales</strong> necesarios.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            <span className="pt-1">Sigue los pasos uno a uno. <strong className="text-foreground">Pulsa cada paso</strong> para marcarlo como completado.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
            <span className="pt-1">Lee los <strong className="text-foreground">consejos</strong> adicionales para mejores resultados.</span>
          </li>
        </ol>
      </section>
    </div>
  );
}