import React from "react";
import { profile, stats, interests } from "../data/mock";

const About = () => {
  const [query, setQuery] = React.useState("");
  const [revealedRows, setRevealedRows] = React.useState(0);
  const fullQuery = "desc Aman;";

  const tableLines = [
    "+-------------+-----------------------+",
    "| Item        | Reality               |",
    "+-------------+-----------------------+",
    ...interests.map(i => `| ${i.Item.padEnd(11)} | ${i.Reality.padEnd(21)} |`),
    "+-------------+-----------------------+"
  ];

  React.useEffect(() => {
    let typeInterval;
    let rowInterval;

    const startAnimation = () => {
      let charIndex = 0;
      typeInterval = setInterval(() => {
        charIndex++;
        setQuery(fullQuery.slice(0, charIndex));

        if (charIndex >= fullQuery.length) {
          clearInterval(typeInterval);

          // Wait 1 second before starting the table reveal
          setTimeout(() => {
            let rowIndex = 0;
            rowInterval = setInterval(() => {
              rowIndex++;
              setRevealedRows(rowIndex);

              if (rowIndex >= tableLines.length) {
                clearInterval(rowInterval);
              }
            }, 500); // Super slow row-by-row reveal
          }, 1000);
        }
      }, 200); // Slower typing speed
    };

    startAnimation();

    return () => {
      clearInterval(typeInterval);
      clearInterval(rowInterval);
    };
  }, []);


  return (
    <section id="about" className="relative bg-transparent py-24 md:py-32 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-16 reveal">
          <div>
            <div className="font-mono-alt text-xs text-neutral-500 uppercase tracking-[0.25em] mb-4">01 — About</div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-white max-w-3xl leading-[1.05]">
              A student who&apos;d rather <em className="not-italic text-neutral-600">build</em> than <em className="not-italic text-neutral-600">break</em>.
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono-alt text-xs text-neutral-500">— est. 2023</div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7 space-y-8 reveal">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-48 md:w-40 md:h-64 flex-shrink-0 border border-neutral-800 p-2 grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
                <img src="/profile.png" alt="Muhammed Aman" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <div className="space-y-6 text-neutral-400 leading-relaxed text-lg">
                {profile.longBio.split("\n\n").map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>
            <div className="font-mono-alt text-[10px] md:text-sm text-neutral-500 bg-neutral-900/40 p-4 md:p-6 border border-neutral-800/50 rounded-sm overflow-x-auto min-h-[240px]">
              <div className="flex gap-2 mb-2">
                <span className="text-emerald-500">mysql&gt;</span>
                <span className="text-neutral-100 italic">{query}</span>
                {query.length < fullQuery.length && <span className="w-2 h-4 bg-emerald-500 animate-pulse" />}
              </div>

              {query === fullQuery && (
                <div className="mt-2">
                  <div className="text-neutral-400 whitespace-pre leading-tight overflow-hidden">
                    {tableLines.slice(0, revealedRows).map((line, idx) => (
                      <div
                        key={idx}
                        className="opacity-0 animate-[fade-in_200ms_ease-out_forwards]"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  {revealedRows >= tableLines.length && (
                    <div className="opacity-0 animate-[fade-in_500ms_ease-out_forwards] delay-300">
                      <div className="mt-1 text-neutral-600">5 rows in set (0.02 sec)</div>
                      <div className="mt-4 flex gap-2">
                        <span className="text-emerald-500">mysql&gt;</span>
                        <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5 reveal">
            <div className="grid grid-cols-2 gap-px bg-neutral-900 border border-neutral-900">
              {stats.map((s) => (
                <div key={s.label} className="bg-neutral-950 p-6 md:p-8">
                  <div className="font-display text-4xl md:text-5xl text-white tracking-tight">{s.value}</div>
                  <div className="mt-3 font-mono-alt text-xs uppercase tracking-widest text-neutral-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 border border-neutral-900 p-6 bg-neutral-950/40">
              <div className="font-mono-alt text-xs text-neutral-600 uppercase tracking-widest mb-3">Now</div>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex gap-3"><span className="text-neutral-600">—</span> Building a an app helps to know what is happening in your laptop via phone</li>
                <li className="flex gap-3"><span className="text-neutral-600">—</span> designing a vs code pet (elelphant)</li>
                <li className="flex gap-3"><span className="text-neutral-600">—</span> Prepping for the next ICPC contest</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
