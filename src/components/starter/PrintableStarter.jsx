import React from "react";

const STARTER_KIT = [
  { id: "punzon", name: "Punzón", cost: "$0–1", description: "Para perforar los cuadernillos antes de coser.", diy: "Corcho de botella + clavo grueso. 10 minutos." },
  { id: "aguja", name: "Aguja de encuadernación", cost: "$1–3", description: "Aguja larga y resistente para coser los cuadernillos.", diy: "Se compra en mercería o ferretería. No tiene sustituto casero confiable." },
  { id: "hilo", name: "Hilo encerado o hilo resistente", cost: "$2–5", description: "Para coser los cuadernillos. Debe ser resistente y no elástico.", diy: "Hilo de lino encerado es lo ideal. En su defecto, hilo de pescar fino (0.3mm) o hilo dental sin sabor." },
  { id: "regla", name: "Regla metálica", cost: "$3–8", description: "Para medir y guiar cortes rectos.", diy: "Imprescindible que sea metálica: el cúter daña las de plástico." },
  { id: "cuter", name: "Cúter de precisión", cost: "$3–7", description: "Para cortar papeles, cartones y tapas.", diy: "Un cúter estándar de 18mm sirve al principio. Cuchillas siempre afiladas." },
  { id: "cutting_mat", name: "Base de corte (cutting mat)", cost: "$5–12", description: "Protege la mesa y mantiene los cortes rectos.", diy: "Alternativa: tablón de DM o una carpeta dura vieja." },
  { id: "cola", name: "Cola blanca (PVA)", cost: "$2–4", description: "Adhesivo principal para tapas, lomos y guardas.", diy: "Cola escolar funciona al principio. El PVA da mejor flexibilidad." },
  { id: "plegadera", name: "Plegadera", cost: "$1–3", description: "Para marcar dobleces limpios en el papel.", diy: "Un listón de madera dura lijado y encerado funciona igual." },
  { id: "prensa", name: "Prensa improvisada", cost: "$0–2", description: "Para prensar el libro mientras seca la cola.", diy: "Dos tablones planos + 2 pinzas de carpintero, o una pila de libros pesados." },
  { id: "papel", name: "Papel para cuadernillos", cost: "$1–5", description: "Hojas de texto del libro, dobladas en cuadernillos.", diy: "Papel bond 75–90g es ideal para empezar." },
];

const NOT_NEEDED = [
  "Guillotina de palanca (los cortes con cúter y regla son suficientes)",
  "Prensa de libros construida (dos tablones + pinzas funcionan igual)",
  "Telar de costura (puedes sujetar las cintas con cinta adhesiva temporalmente)",
  "Cepillo de lomo (solo necesario en técnicas avanzadas)",
  "Set de separadores calibrados (puedes medir con regla al principio)",
];

export default function PrintableStarter({ onClose }) {
  const handlePrint = () => window.print();

  return (
    <>
      {/* Overlay — visible on screen, hidden when printing */}
      <div className="print:hidden fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Modal wrapper — screen only */}
      <div className="print:hidden fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <p className="text-sm text-gray-500">Vista previa del resumen imprimible</p>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                🖨️ Imprimir
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
          {/* Printable content preview */}
          <div className="p-6">
            <PrintContent />
          </div>
        </div>
      </div>

      {/* Printable content — only visible when printing */}
      <div className="hidden print:block print-content">
        <PrintContent />
      </div>

      <style>{`
        @media print {
          body > * { display: none !important; }
          .print-content { display: block !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>
    </>
  );
}

function PrintContent() {
  return (
    <div className="font-sans text-gray-900 text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 mb-1">EncuaTaller — Kit mínimo para empezar</h1>
        <p className="text-xs text-gray-500">encuataller.base44.app · Imprimible para principiantes</p>
      </div>

      {/* Intro */}
      <p className="text-xs text-gray-600 mb-5 italic">
        Si estás comenzando en encuadernación, no necesitas comprar mucho. Esta lista tiene solo lo imprescindible, con alternativas caseras para casi todo.
      </p>

      {/* Tools table */}
      <table className="w-full mb-6 border-collapse text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border border-gray-300 w-6">#</th>
            <th className="text-left p-2 border border-gray-300 w-28">Herramienta</th>
            <th className="text-left p-2 border border-gray-300 w-14">Costo</th>
            <th className="text-left p-2 border border-gray-300">Para qué sirve</th>
            <th className="text-left p-2 border border-gray-300">Alternativa casera</th>
            <th className="text-center p-2 border border-gray-300 w-12">¿Lo tengo?</th>
          </tr>
        </thead>
        <tbody>
          {STARTER_KIT.map((item, i) => (
            <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-2 border border-gray-300 text-gray-400 text-center">{i + 1}</td>
              <td className="p-2 border border-gray-300 font-semibold">{item.name}</td>
              <td className="p-2 border border-gray-300 text-center text-gray-600">{item.cost}</td>
              <td className="p-2 border border-gray-300 text-gray-700">{item.description}</td>
              <td className="p-2 border border-gray-300 text-gray-600 italic">{item.diy}</td>
              <td className="p-2 border border-gray-300 text-center text-gray-300">☐</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Not needed */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 mb-2">✗ Qué NO necesitas comprar aún</h2>
        <ul className="space-y-1">
          {NOT_NEEDED.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-red-400 font-bold mt-0.5">✗</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tip */}
      <div className="border border-gray-300 rounded p-3 bg-gray-50">
        <p className="text-xs font-semibold text-gray-800 mb-1">💡 Consejo para empezar</p>
        <p className="text-xs text-gray-600">
          Haz tu primer libro con papel de impresora reciclado y cartón de caja de zapatos para las tapas. Así practicas sin gastar nada. Cuando domines la costura básica, ya sabrás qué herramientas realmente te hacen falta.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-3 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-400">encuataller.base44.app — Guías gratuitas para encuadernación artesanal</p>
      </div>
    </div>
  );
}