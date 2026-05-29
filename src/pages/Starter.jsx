import React, { useState } from "react";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Lightbulb, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const STARTER_KIT = [
  {
    id: "punzon",
    name: "Punzón",
    description: "Para perforar los cuadernillos antes de coser.",
    cost: "$0–1",
    diy: "Corcho de botella + clavo grueso. 10 minutos.",
    diyLink: null,
    essential: true,
  },
  {
    id: "aguja",
    name: "Aguja de encuadernación",
    description: "Aguja larga y resistente para coser los cuadernillos.",
    cost: "$1–3",
    diy: "Se compra en mercería o ferretería. No tiene sustituto casero confiable.",
    essential: true,
  },
  {
    id: "hilo",
    name: "Hilo encerado o hilo resistente",
    description: "Para coser los cuadernillos. Debe ser resistente y no elástico.",
    cost: "$2–5",
    diy: "Hilo de lino encerado es lo ideal. En su defecto, hilo de pescar fino (0.3mm) o hilo dental sin sabor.",
    essential: true,
  },
  {
    id: "regla",
    name: "Regla metálica",
    description: "Para medir y guiar cortes rectos.",
    cost: "$3–8",
    diy: "Imprescindible que sea metálica: el cúter daña las de plástico y el corte pierde precisión.",
    essential: true,
  },
  {
    id: "cuter",
    name: "Cúter de precisión",
    description: "Para cortar papeles, cartones y tapas.",
    cost: "$3–7",
    diy: "Un cúter estándar de 18mm sirve al principio. Las cuchillas deben estar siempre afiladas.",
    essential: true,
  },
  {
    id: "cutting_mat",
    name: "Base de corte (cutting mat)",
    description: "Protege la mesa y mantiene los cortes rectos.",
    cost: "$5–12",
    diy: "Alternativa económica: tablón de DM o una carpeta dura vieja. La base de corte verde marca las líneas de corte, lo que ayuda mucho al principiante.",
    essential: true,
  },
  {
    id: "cola",
    name: "Cola blanca (PVA)",
    description: "Adhesivo principal para tapas, lomos y guardas.",
    cost: "$2–4",
    diy: "Cola escolar (Pritt o similar) funciona al principio. El PVA da mejor flexibilidad cuando seca.",
    essential: true,
  },
  {
    id: "plegadera",
    name: "Plegadera",
    description: "Para marcar dobleces limpios en el papel.",
    cost: "$1–3",
    diy: "Un listón de madera dura lijado y encerado funciona igual que una plegadera comprada.",
    essential: true,
  },
  {
    id: "prensa",
    name: "Prensa improvisada",
    description: "Para prensar el libro mientras seca la cola.",
    cost: "$0–2",
    diy: "Dos tablones planos + 2 pinzas de carpintero o una pila de libros pesados. No necesitas comprar nada.",
    essential: true,
  },
  {
    id: "papel",
    name: "Papel para cuadernillos",
    description: "Hojas de texto del libro, dobladas en cuadernillos.",
    cost: "$1–5",
    diy: "Papel bond 75–90g es ideal para empezar. Evita papel muy fino (se transparenta) o muy grueso (no dobla bien).",
    essential: true,
  },
];

const NOT_NEEDED = [
  "Guillotina de palanca (los cortes con cúter y regla son suficientes para empezar)",
  "Prensa de libros construida (dos tablones + pinzas funcionan igual)",
  "Telar de costura (puedes sujetar las cintas con cinta adhesiva temporalmente)",
  "Cepillo de lomo (solo necesario en técnicas avanzadas)",
  "Set de separadores calibrados (puedes medir con regla al principio)",
];

export default function Starter() {
  const [checked, setChecked] = useState(new Set());
  const [showNotNeeded, setShowNotNeeded] = useState(false);

  const toggle = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const progress = Math.round((checked.size / STARTER_KIT.length) * 100);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Kit mínimo para empezar</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Si estás comenzando en encuadernación, <strong>no necesitas comprar mucho</strong>. 
          Esta lista tiene solo lo imprescindible, con alternativas caseras para casi todo. 
          Marca lo que ya tienes.
        </p>
      </div>

      {/* Progress */}
      <div className="p-4 rounded-xl bg-accent/40 border border-primary/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {checked.size} de {STARTER_KIT.length} elementos
          </span>
          <span className="text-sm font-semibold text-primary">{progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-xs text-primary font-medium mt-2">
            ¡Tienes todo lo necesario para hacer tu primer libro! 🎉
          </p>
        )}
      </div>

      {/* Checklist */}
      <div className="space-y-3" role="list" aria-label="Lista de herramientas mínimas">
        {STARTER_KIT.map((item) => {
          const done = checked.has(item.id);
          return (
            <button
              key={item.id}
              role="listitem"
              onClick={() => toggle(item.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                done
                  ? "bg-accent/50 border-primary/30"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-sm"
              }`}
              aria-pressed={done}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`font-semibold text-sm ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {item.name}
                    </span>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                      {item.cost}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
                  <p className="text-xs text-foreground/70 mt-1.5 leading-relaxed">
                    💡 {item.diy}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* What you DON'T need yet */}
      <div className="rounded-xl border border-border overflow-hidden">
        <button
          onClick={() => setShowNotNeeded((v) => !v)}
          className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Qué NO necesitas comprar aún</span>
          </div>
          {showNotNeeded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showNotNeeded && (
          <ul className="p-4 space-y-2">
            {NOT_NEEDED.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-destructive mt-0.5 flex-shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tip box */}
      <div className="p-4 rounded-xl bg-accent/40 border border-primary/10 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Consejo para empezar</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Haz tu primer libro con papel de impresora reciclado (el de un lado ya usado) y cartón de caja de zapatos para las tapas. 
            Así practicas sin gastar nada. Cuando domines la costura básica, ya sabrás qué herramientas realmente te hacen falta.
          </p>
        </div>
      </div>

      {/* Link to tools */}
      <div className="text-center pb-4">
        <p className="text-sm text-muted-foreground mb-3">¿Quieres construir tus propias herramientas?</p>
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Ver guías de construcción
        </Link>
      </div>
    </div>
  );
}