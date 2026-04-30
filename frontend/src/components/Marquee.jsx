import React from "react";

/**
 * Reusable marquee strip. direction = "left" | "right".
 * Children should be a single line element — we duplicate for seamless loop.
 */
const Marquee = ({ children, direction = "left", speed = 40, className = "" }) => {
  const animClass = direction === "right" ? "marquee-track-reverse" : "marquee-track";
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`${animClass} flex gap-10 whitespace-nowrap`} style={{ animationDuration: `${speed}s` }}>
        <div className="flex gap-10 shrink-0">{children}</div>
        <div className="flex gap-10 shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
