import React from "react";
import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/mock";
import CursorParticles from "./CursorParticles";

const asciiDuck = `     __
   <(o )___
    ( ._> /   GrumpyDuck
     \`---'`;

const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen bg-transparent text-neutral-100 overflow-hidden">
      {/* Background image - keeping it local as it's specific to hero */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `url(${profile.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          filter: "grayscale(100%) contrast(1.05)"
        }}
      />
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Meta row */}
        <div className="flex items-center justify-between text-xs font-mono-alt text-neutral-400 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            {/*<span>Working @ mybuilspace.com</span>*/}
          </div>
          <div className="hidden sm:block">{profile.location} — GMT+5:30</div>
        </div>

        {/* Headline */}
        <div className="max-w-5xl">
          <h1 className="font-display font-medium text-[11vw] leading-[0.95] tracking-[-0.035em] sm:text-7xl md:text-8xl lg:text-[9.5rem]">
            <span className="shimmer-text">Muhammed</span>
            <br />
            <span className="shimmer-text">Aman</span>
            <span className="caret text-neutral-300 ml-2">_</span>
          </h1>

          <p className="mt-10 max-w-2xl text-lg md:text-xl text-neutral-300 leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary group inline-flex items-center gap-3 bg-white text-neutral-950 px-6 py-4 text-sm font-medium border border-white hover:bg-transparent hover:text-white"
          >
            View selected work
            <ArrowDownRight size={18} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary inline-flex items-center gap-3 px-6 py-4 text-sm font-medium border border-neutral-700 text-neutral-100 hover:border-white"
          >
            Get in touch
          </a>

          <div className="ml-auto hidden lg:flex items-center gap-1 border border-neutral-800">
            {[
              { icon: Github, href: profile.socials.github, label: "GitHub" },
              { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
              { icon: Mail, href: profile.socials.email, label: "Email" }
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="p-3 text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom meta */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-neutral-800 pt-8">
          {[
            ["Focus", "Full-stack dev"],
            ["Studying", "B.Tech CSE-CY (2nd year)"],
            ["Status", "Open to work"],
            ["Alias", "grumpyduck"]
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-wider">{k}</div>
              <div className="mt-2 text-neutral-100 text-sm md:text-base">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ASCII duck — sits in the bottom right as a "signature" */}
      <pre className="hidden md:block absolute bottom-10 right-10 font-mono-alt text-[11px] leading-tight text-neutral-500 float-slow select-none pointer-events-none">
        {asciiDuck}
      </pre>

      {/* Side rails */}
      <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono-alt text-[10px] tracking-[0.3em] text-neutral-500 uppercase pointer-events-none">
        Scroll — to explore
      </div>
    </section>
  );
};

export default Hero;
