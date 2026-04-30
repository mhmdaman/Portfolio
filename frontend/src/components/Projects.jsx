import React from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/mock";

const Projects = () => {
  return (
    <section id="work" className="relative bg-transparent py-24 md:py-32 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 reveal">
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-[0.25em] mb-4">03 — Selected Work</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white max-w-3xl leading-[1.05]">
              Things I&apos;ve built, <span className="text-neutral-600">recently.</span>
            </h2>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="hidden md:inline-flex items-center gap-2 text-sm text-neutral-500 link-hover"
          >
            Request full case studies <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="border-t border-neutral-900">
          {projects.map((p) => (
            <a key={p.id} href={p.href} className="project-card group block border-b border-neutral-900 py-8 md:py-10 hover:bg-white hover:text-black">
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 px-2 items-start">
                <div className="col-span-12 md:col-span-1 font-mono-alt text-xs text-neutral-600 group-hover:text-neutral-400 pt-2">{p.accent}</div>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05]">{p.title}</h3>
                  <div className="mt-3 font-mono-alt text-xs text-neutral-500 group-hover:text-neutral-600 flex items-center gap-3">
                    <span>{p.year}</span>
                    <span className="w-1 h-1 bg-current" />
                    <span>{p.category}</span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5 text-neutral-400 group-hover:text-neutral-700 text-base md:text-lg leading-relaxed">
                  {p.description}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="font-mono-alt text-[11px] px-2 py-1 border border-neutral-800 group-hover:border-neutral-300 text-neutral-500 group-hover:text-neutral-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-1 flex md:justify-end pt-2">
                  <ArrowUpRight className="arrow" size={22} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
