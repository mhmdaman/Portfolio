import React, { useState } from "react";
import { Send, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "../data/mock";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Missing details", description: "Please fill in your name, email and message." });
      return;
    }
    setSubmitting(true);
    
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });
      
      if (response.ok) {
        toast({ title: "Message sent", description: "Thanks for reaching out — I'll get back within a day or two." });
        setForm({ name: "", email: "", message: "" });
      } else {
        toast({ title: "Failed to send", description: "There was an issue sending your message. Please try again later." });
      }
    } catch (error) {
      toast({ title: "Network Error", description: "Could not reach the server. Make sure the backend is running." });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-transparent py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 reveal">
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-[0.25em] mb-4">05 — Contact</div>
            <h2 className="font-display text-4xl md:text-7xl tracking-tight text-white max-w-4xl leading-[1.02]">
              Got an idea? <br className="hidden md:block" />
              <span className="text-neutral-600">Let&apos;s ship it.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5 space-y-10 reveal">
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

          <form onSubmit={onSubmit} className="md:col-span-7 reveal">
            <div className="border border-neutral-900 bg-neutral-950/20 p-6 md:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono-alt text-xs text-neutral-600 uppercase tracking-widest mb-2">Name</label>
                  <input name="name" value={form.name} onChange={onChange} placeholder="Your name"
                         className="w-full bg-transparent border-b border-neutral-800 focus:border-white outline-none py-2 text-white placeholder:text-neutral-700 transition-colors" />
                </div>
                <div>
                  <label className="block font-mono-alt text-xs text-neutral-600 uppercase tracking-widest mb-2">Email</label>
                  <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@domain.com"
                         className="w-full bg-transparent border-b border-neutral-800 focus:border-white outline-none py-2 text-white placeholder:text-neutral-700 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block font-mono-alt text-xs text-neutral-600 uppercase tracking-widest mb-2">Message</label>
                <textarea name="message" rows={6} value={form.message} onChange={onChange}
                          placeholder="Tell me a little about your project or idea…"
                          className="w-full bg-transparent border-b border-neutral-800 focus:border-white outline-none py-2 text-white placeholder:text-neutral-700 resize-none transition-colors" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono-alt text-xs text-neutral-600">Replies within ~24h</span>
                <button type="submit" disabled={submitting}
                        className="btn-primary inline-flex items-center gap-3 bg-white text-neutral-950 px-6 py-3 text-sm border border-white hover:bg-transparent hover:text-white disabled:opacity-60">
                  {submitting ? "Sending…" : "Send message"}
                  <Send size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
