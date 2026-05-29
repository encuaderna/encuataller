import React from "react";
import { useCurrency } from "@/hooks/useCurrency";

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD — Dólar" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "ARS", symbol: "$", label: "ARS — Peso argentino" },
  { code: "CLP", symbol: "$", label: "CLP — Peso chileno" },
  { code: "MXN", symbol: "$", label: "MXN — Peso mexicano" },
  { code: "COP", symbol: "$", label: "COP — Peso colombiano" },
  { code: "PEN", symbol: "S/", label: "PEN — Sol peruano" },
  { code: "BRL", symbol: "R$", label: "BRL — Real brasileño" },
  { code: "BOB", symbol: "Bs.", label: "BOB — Boliviano" },
  { code: "UYU", symbol: "$", label: "UYU — Peso uruguayo" },
  { code: "PYG", symbol: "₲", label: "PYG — Guaraní paraguayo" },
  { code: "VES", symbol: "Bs.", label: "VES — Bolívar venezolano" },
  { code: "GBP", symbol: "£", label: "GBP — Libra esterlina" },
];

export { CURRENCIES };

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency-select" className="text-xs text-muted-foreground whitespace-nowrap">
        Moneda:
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="text-xs rounded-md border border-border bg-background text-foreground px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Seleccionar moneda"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>{c.label}</option>
        ))}
      </select>
    </div>
  );
}