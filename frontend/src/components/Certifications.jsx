import React from "react";
import { ShieldCheck } from "lucide-react";
import { certifications } from "../data/mock";

const Certifications = () => {
  return (
    <section id="certs" className="relative bg-transparent py-24 md:py-32 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 reveal">
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-[0.25em] mb-4">01 — Certification</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white max-w-3xl leading-[1.05]">
              Proof of the hours put in.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800 reveal">
          {certifications.map((c) => (
            <div key={c.id} className="bg-neutral-950 p-7 md:p-8 flex items-start gap-5 group hover:bg-white hover:text-neutral-950 transition-colors">
              <div className="p-3 border border-neutral-800 group-hover:border-neutral-300">
                <ShieldCheck size={20} className="text-neutral-500 group-hover:text-neutral-950" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-mono-alt text-xs text-neutral-600 group-hover:text-neutral-500">{c.year}</span>
                  <span className="font-mono-alt text-[10px] text-neutral-700 group-hover:text-neutral-800">{c.credentialId}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl leading-snug tracking-tight">{c.title}</h3>
                <div className="mt-2 text-sm text-neutral-500 group-hover:text-neutral-700">{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
