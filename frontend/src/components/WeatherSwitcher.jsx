import { useState } from "react";

const WEATHERS = [
  { id: "rain",   label: "Rain"   },
  { id: "snow",   label: "Snow"   },
  { id: "storm",  label: "Storm"  },
  { id: "autumn", label: "Autumn" },
  { id: "clear",  label: "Clear"  },
];

const WeatherSwitcher = ({ current, onChange, scrolled }) => {
  const [open, setOpen] = useState(false);
  const active = WEATHERS.find((w) => w.id === current) || WEATHERS[0];
  const idx = WEATHERS.findIndex((w) => w.id === current);

  return (
    <div className="relative">
      {/* Toggle — matches nav link style */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`link-hover text-sm font-body transition-colors flex items-center gap-1.5 ${
          scrolled
            ? "text-neutral-700 hover:text-neutral-950"
            : "text-neutral-300 hover:text-white"
        }`}
        aria-label="Switch weather"
      >
        <span className={`font-mono-alt ${scrolled ? "text-neutral-400" : "text-neutral-500"}`}>
          0{idx + 1}
        </span>
        {active.label}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Invisible overlay to close on outside click */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div
            className={`absolute right-0 top-full mt-3 z-50 flex flex-col py-2 min-w-[120px] border ${
              scrolled
                ? "bg-white border-neutral-200"
                : "bg-neutral-950 border-neutral-800"
            }`}
            style={{ animation: "ws-drop 0.15s ease" }}
          >
            {WEATHERS.map((w, i) => (
              <button
                key={w.id}
                onClick={() => {
                  onChange(w.id);
                  setOpen(false);
                }}
                className={`text-left px-4 py-2 text-sm font-body flex items-center gap-2 transition-colors ${
                  scrolled
                    ? current === w.id
                      ? "text-neutral-950"
                      : "text-neutral-500 hover:text-neutral-950"
                    : current === w.id
                      ? "text-white"
                      : "text-neutral-500 hover:text-white"
                }`}
              >
                <span className={`font-mono-alt text-xs ${scrolled ? "text-neutral-400" : "text-neutral-600"}`}>
                  0{i + 1}
                </span>
                {w.label}
                {current === w.id && (
                  <span className="ml-auto w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <style>{`
        @keyframes ws-drop {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default WeatherSwitcher;
