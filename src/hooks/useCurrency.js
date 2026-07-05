import { useState, useEffect } from "react";

// Approximate exchange rates relative to USD (updated manually)
const RATES = {
  USD: 1,
  EUR: 0.92,
  ARS: 1200,
  CLP: 950,
  MXN: 17.5,
  COP: 4100,
  PEN: 3.75,
  BRL: 5.1,
  BOB: 6.9,
  UYU: 39,
  PYG: 7600,
  VES: 46,
  GBP: 0.79,
};

export const CURRENCY_SYMBOLS = {
  USD: "$", EUR: "€", ARS: "$", CLP: "$", MXN: "$",
  COP: "$", PEN: "S/", BRL: "R$", BOB: "Bs.", UYU: "$",
  PYG: "₲", VES: "Bs.", GBP: "£",
};

export function convertCost(rangeStr, targetCurrency) {
  if (!rangeStr) return null;
  // Extract numbers from strings like "$5-10" or "$8-15"
  const nums = rangeStr.match(/[\d.]+/g);
  if (!nums) return null;

  const rate = RATES[targetCurrency] || 1;
  const symbol = CURRENCY_SYMBOLS[targetCurrency] || "$";

  const converted = nums.map((n) => {
    const val = parseFloat(n) * rate;
    // Format: no decimals for large numbers, 2 decimals for small
    return val >= 100
      ? Math.round(val).toLocaleString("es")
      : val.toFixed(2);
  });

  return `${symbol}${converted.join(" – ")}`;
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem("preferred_currency") || "USD";
  });

  const setCurrency = (code) => {
    localStorage.setItem("preferred_currency", code);
    setCurrencyState(code);
  };

  return { currency, setCurrency };
}