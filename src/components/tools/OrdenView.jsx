import React, { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

const TIPS = [
  {
    icon: "🎨",
    title: "Un color, una función",
    desc: "Usa cinta de color o marca tus herramientas con un color por tarea: azul para cortar, verde para coser, naranja para pegar. Al buscar algo, solo piensa en el color."
  },
  {
    icon: "👁️",
    title: "Todo a la vista",
    desc: "Guarda las herramientas en recipientes abiertos o en una tira de tela colgada en la pared. Si no se ve, se olvida. Evita cajones cerrados para lo que usas seguido."
  },
  {
    icon: "📍",
    title: "Cada cosa tiene su lugar marcado",
    desc: "Dibuja o pega la silueta de cada herramienta en la superficie donde va. Así sabes al instante si falta algo y dónde volver a ponerla."
  },
  {
    icon: "🧺",
    title: "Una canasta de \"ahora\"",
    desc: "Ten una canasta o bandeja especial para el proyecto en curso. Solo ahí van las cosas que estás usando hoy. El resto, guardado en su lugar."
  },
  {
    icon: "⏱️",
    title: "Regla de los 2 minutos al terminar",
    desc: "Al acabar de trabajar, pon un temporizador de 2 minutos y devuelve todo a su lugar. No más, no menos. Es fácil cumplirlo y evita el caos acumulado."
  },
  {
    icon: "📦",
    title: "Agrupa por proyecto, no por tipo",
    desc: "En vez de guardar \"todos los cuchillos juntos\", guarda juntas todas las herramientas que usas para hacer un cuadernillo tipo coptic. Un proyecto = una caja o bolsa."
  },
  {
    icon: "🔢",
    title: "Menos es más",
    desc: "Tener pocas herramientas ordenadas es mejor que muchas en desorden. Si algo no usaste en los últimos 3 meses, guárdalo en otro lugar o préstalo."
  },
  {
    icon: "🌟",
    title: "El kit de inicio siempre listo",
    desc: "Arma una pequeña cajita con las 5-6 herramientas que usas en casi todos los proyectos. Siempre lista para empezar sin tener que buscar nada."
  },
];

export default function OrdenView() {
  const [checked, setChecked] = useState({});

  const toggle = (i) => setChecked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="space-y-4">
      <div className="bg-accent/40 rounded-xl p-4 border border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Un espacio ordenado hace que sea más fácil arrancar, más fácil terminar, y más fácil disfrutar. Estos tips funcionan incluso si tienes poco espacio o poco tiempo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIPS.map((tip, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`text-left p-4 rounded-xl border transition-all duration-200 ${
              checked[i]
                ? "border-primary/40 bg-accent/30"
                : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
            }`}
            aria-pressed={!!checked[i]}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none mt-0.5">{tip.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-foreground">{tip.title}</p>
                  {checked[i]
                    ? <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    : <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                  }
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground/60 pt-2">
        Toca cada tip para marcarlo como aplicado ✓
      </p>
    </div>
  );
}