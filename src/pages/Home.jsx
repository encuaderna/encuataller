import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, BookOpen, Eye, Heart } from "lucide-react";

const features = [
  {
    icon: Wrench,
    title: "Bajo presupuesto",
    description: "Todas las herramientas usan materiales económicos y fáciles de encontrar.",
  },
  {
    icon: BookOpen,
    title: "Paso a paso",
    description: "Instrucciones claras y detalladas. Marca tu progreso en cada paso.",
  },
  {
    icon: Eye,
    title: "Accesible",
    description: "Diseñada para todos: alto contraste, iconos + texto, y navegación simple.",
  },
  {
    icon: Heart,
    title: "Sin complicaciones",
    description: "Interfaz tranquila, sin distracciones. Ve a tu ritmo.",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-8 sm:py-12">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-8 h-8 text-primary-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
          Construye tus herramientas<br />de encuadernación
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Guías sencillas para fabricar herramientas de encuadernación con materiales económicos. 
          Para principiantes, a tu ritmo.
        </p>
        <Link to="/tools">
          <Button size="lg" className="rounded-full px-8 text-base">
            <Wrench className="w-5 h-5 mr-2" aria-hidden="true" />
            Ver herramientas
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">Características</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 px-6 rounded-2xl bg-accent/50 border border-primary/10">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          ¿Listo para empezar?
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Elige una herramienta fácil y sigue las instrucciones paso a paso.
        </p>
        <Link to="/tools">
          <Button variant="outline" className="rounded-full">
            Explorar herramientas
          </Button>
        </Link>
      </section>
    </div>
  );
}