import React from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "../data/mock";

const Contact = () => {
  return (
    <section id="contact" className="relative bg-transparent py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 reveal">
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-[0.25em] mb-4">05 — Contact</div>
            <h2 className="font-display text-4xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.02]">
              Got an idea <br className="hidden md:block" />
              <span className="text-neutral-600">Let&apos;s ship it.</span>
            </h2>
          </div>
        </div>

        <div className="max-w-3xl space-y-10 reveal">
          <p className="text-lg text-neutral-400 leading-relaxed">
            I'm open to internships, freelance projects, or just a good chat about security &amp; side projects. The quickest way to reach me is email — I usually reply within 24 hours.
          </p>

          <div className="space-y-5">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: profile.socials.email },
              { icon: MapPin, label: "Location", value: profile.location + " · GMT+5:30" },
              { icon: Github, label: "GitHub", value: "@mhmdaman", href: profile.socials.github },
              { icon: Linkedin, label: "LinkedIn", value: "muhammed-aman", href: profile.socials.linkedin }
            ].map(({ icon: Icon, label, value, href }) => {
              const Tag = href ? "a" : "div";
              return (
                <Tag key={label} href={href} target={href ? "_blank" : undefined} rel="noreferrer"
                     className="flex items-center gap-4 border-b border-neutral-900 pb-4 group">
                  <div className="p-3 border border-neutral-800 group-hover:border-white transition-colors">
                    <Icon size={18} className="text-neutral-500 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="font-mono-alt text-xs text-neutral-600 uppercase tracking-widest">{label}</div>
                    <div className="text-neutral-300 text-sm md:text-base group-hover:text-white">{value}</div>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

