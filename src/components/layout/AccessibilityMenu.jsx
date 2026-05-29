import React, { useState, useEffect, useRef } from "react";
import { Accessibility, X, Type, AlignJustify, ZapOff, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "encuataller-a11y";

const defaults = {
  fontSize: 0,       // -1, 0, +1, +2
  lineHeight: false, // espaciado ampliado
  reduceMotion: false,
  highContrast: false,
};

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
    } catch {
      return defaults;
    }
  });
  const menuRef = useRef(null);

  // Apply settings to <html>
  useEffect(() => {
    const root = document.documentElement;
    const sizes = { "-1": "14px", "0": "16px", "1": "18px", "2": "21px" };
    root.style.fontSize = sizes[settings.fontSize] || "16px";
    root.classList.toggle("leading-loose", settings.lineHeight);
    root.classList.toggle("motion-reduce", settings.reduceMotion);
    root.classList.toggle("high-contrast", settings.highContrast);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const set = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));
  const reset = () => setSettings(defaults);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Opciones de accesibilidad"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="rounded-lg w-9 h-9"
      >
        <Accessibility className="w-4 h-4" aria-hidden="true" />
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Ajustes de accesibilidad"
          className="absolute right-0 top-12 w-72 bg-card border border-border rounded-xl shadow-xl z-50 p-4 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm text-foreground">Accesibilidad</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Font size */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" aria-hidden="true" /> Tamaño de texto
            </p>
            <div className="flex gap-1" role="group" aria-label="Tamaño de texto">
              {[
                { val: -1, label: "A−", aria: "Pequeño" },
                { val: 0, label: "A", aria: "Normal" },
                { val: 1, label: "A+", aria: "Grande" },
                { val: 2, label: "A++", aria: "Muy grande" },
              ].map(({ val, label, aria }) => (
                <button
                  key={val}
                  onClick={() => set("fontSize", val)}
                  aria-label={aria}
                  aria-pressed={settings.fontSize === val}
                  className={`flex-1 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    settings.fontSize === val
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-transparent hover:bg-accent"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Line height */}
          <ToggleRow
            icon={AlignJustify}
            label="Espaciado ampliado"
            description="Mayor espacio entre líneas"
            checked={settings.lineHeight}
            onChange={(v) => set("lineHeight", v)}
          />

          {/* Reduce motion */}
          <ToggleRow
            icon={ZapOff}
            label="Reducir movimiento"
            description="Desactiva animaciones"
            checked={settings.reduceMotion}
            onChange={(v) => set("reduceMotion", v)}
          />

          {/* High contrast */}
          <ToggleRow
            icon={Contrast}
            label="Alto contraste"
            description="Mayor contraste de colores"
            checked={settings.highContrast}
            onChange={(v) => set("highContrast", v)}
          />

          {/* Reset */}
          <button
            onClick={reset}
            className="w-full text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 pt-1"
          >
            Restablecer valores predeterminados
          </button>
        </div>
      )}
    </div>
  );
}

function ToggleRow({ icon: Icon, label, description, checked, onChange }) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-start gap-2">
        <Icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium text-foreground leading-tight">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors ${
          checked ? "bg-primary" : "bg-muted border border-border"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}