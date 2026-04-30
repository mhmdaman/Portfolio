import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "../data/mock";

const asciiDuckBig = `     ____
 __(⌐■_■)>
 \\ <_.  )
  \`-- - '`;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-neutral-950 text-neutral-300 overflow-hidden grain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Massive name */}
        <div className="relative">
          <h3 className="font-display text-[18vw] md:text-[14vw] leading-[0.85] tracking-[-0.04em] text-neutral-100 select-none opacity-20">
            MUHAMMED AMAN
          </h3>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center gap-2 text-xs font-mono-alt text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </div>

        {/* Grumpyduck stamp row */}
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-y border-neutral-800 py-8">
          <div className="flex items-end gap-6">
            <pre className="font-mono-alt text-[10px] md:text-xs leading-tight text-neutral-500 select-none">
              {asciiDuckBig}
            </pre>
            <div>
              <div className="font-mono-alt text-[10px] text-neutral-500 uppercase tracking-[0.3em]">
                identity
              </div>
              <div className="font-display text-3xl md:text-5xl text-white leading-none mt-1 uppercase">
                grumpyduck<span className="text-neutral-600">™</span>
              </div>
              <div className="font-mono-alt text-[11px] text-neutral-500 mt-2">
                est. 2024 · prefers offline mode · craving to live in mountains
              </div>
            </div>
          </div>
          <div className="font-mono-alt text-[10px] text-neutral-500 uppercase tracking-[0.3em] md:text-right">
            not grumpy <br className="hidden md:block" /> just curious
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-10 border-b border-neutral-800 pb-10">
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-widest mb-3">Contact</div>
            <a href={profile.socials.email} className="text-white text-lg link-hover">
              {profile.email}
            </a>
          </div>
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-widest mb-3">Elsewhere</div>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: profile.socials.github, label: "GitHub" },
                { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
                { icon: Mail, href: profile.socials.email, label: "Email" }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2.5 border border-neutral-800 hover:border-white hover:text-white text-neutral-400 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono-alt text-neutral-500">
          <span>&copy; {year} Muhammed Aman &mdash; all rights reserved.</span>
          <span>last updated {new Date().toLocaleDateString("en-GB")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
