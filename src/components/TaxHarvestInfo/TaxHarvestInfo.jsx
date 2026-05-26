import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

export default function TaxHarvestInfo() {
  const [open, setOpen] = useState(false);

  const notes = [
    "Tax harvesting does not apply to derivatives or futures.",
    "Price and market values are fetched from CoinGecko and may differ slightly from exchange values.",
    "Some countries do not have short-term and long-term bifurcation.",
    "Only realised losses are considered for harvesting.",
    "Please consult your tax advisor before investment decisions.",
  ];

  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      border-blue-200
      shadow-sm
      overflow-hidden
      mb-6
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
        w-full
        flex
        justify-between
        items-center
        px-5
        py-4
        hover:bg-blue-50
        transition
        "
      >
        <div className="flex items-center gap-2">
          <Info
            size={18}
            className="
            text-blue-600
            "
          />

          <span
            className="
            font-semibold
            text-slate-700
            "
          >
            Important Notes & Disclaimers
          </span>
        </div>

        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && (
        <div
          className="
          px-6
          pb-5
          text-sm
          text-slate-600
          "
        >
          <ul
            className="
            list-disc
            pl-5
            space-y-2
            "
          >
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
