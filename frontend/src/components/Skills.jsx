import React from "react";
import { skills } from "../data/mock";

const Skills = () => {
  const allItems = skills.flatMap((s) => s.items);
  const marquee = [...allItems, ...allItems];

  return (
    <section id="skills" className="relative bg-neutral-950 text-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 reveal">
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-[0.25em] mb-4">02 — Toolkit</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl leading-[1.05]">
              The stack behind my side projects.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 reveal">
          {skills.map((cat, i) => (
            <div key={cat.category} className="bg-neutral-950 p-7 hover:bg-neutral-900 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono-alt text-xs text-neutral-500">0{i + 1}</span>
                <span className="font-mono-alt text-xs text-neutral-500">{cat.items.length} items</span>
              </div>
              <h3 className="font-display text-2xl mb-6">{cat.category}</h3>
              <ul className="space-y-3">
                {cat.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-sm text-neutral-300 group">
                    <span className="w-1 h-1 bg-neutral-600 group-hover:bg-white transition-colors" />
                    <span className="group-hover:text-white transition-colors">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee strip — two lanes, opposite directions */}
      <div className="mt-20 border-y border-neutral-800 overflow-hidden">
        <div className="py-6 overflow-hidden">
          <div className="marquee-track flex gap-10 whitespace-nowrap">
            {marquee.map((m, idx) => (
              <span
                key={`a-${idx}`}
                className="font-display text-3xl md:text-4xl text-neutral-600"
              >
                {m}
                <span className="mx-6 text-neutral-700">·</span>
              </span>
            ))}
          </div>
        </div>
        <div className="py-6 overflow-hidden border-t border-neutral-800/60">
          <div className="marquee-track-reverse flex gap-10 whitespace-nowrap">
            {["Muhammed Aman", "perfection > ship", "rubber-ducking", "Beaches", "Go to mountain", "siri open spotify", "`sudo make coffee`", "200 sleep ok", "commit often", "out into the world", "read the docs", "Muhammed Aman"].concat(["Muhammed Aman", "perfection>ship", "rubber-ducking", "`sudo make coffee`", "siri open spotify", "200 sleep ok", "commit often", "read the docs", "Muhammed Aman"]).map((m, idx) => (
              <span
                key={`b-${idx}`}
                className="font-mono-alt text-sm md:text-base text-neutral-500 uppercase tracking-[0.25em]"
              >
                {m}
                <span className="mx-6 text-neutral-700">—</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
