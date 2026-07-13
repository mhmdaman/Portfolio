import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   Leaf image paths (placed in public/leaves/)
───────────────────────────────────────────────────────── */
const LEAF_SRCS = [
  "/leaves/leaf1.png",
  "/leaves/leaf2.png",
  "/leaves/leaf3.png",
  "/leaves/leaf4.png",
  "/leaves/leaf5.png",
];

/* ─────────────────────────────────────────────────────────
   Particle factories — one per weather mode
───────────────────────────────────────────────────────── */

function makeRainDrop(width, height) {
  const z = Math.random() * 1 + 0.2;
  return {
    x: Math.random() * width,
    y: Math.random() * -height,
    z,
    length: (Math.random() * 20 + 15) * z,
    speed: (Math.random() * 15 + 10) * z,
    opacity: (Math.random() * 0.35 + 0.1) * z,
    angle: -0.1,
  };
}

function makeSnowFlake(width, height) {
  const r = Math.random() * 8 + 6; // Radius between 6 and 14 (diameter 12px to 28px)
  return {
    x: Math.random() * width,
    y: Math.random() * -height,
    r,
    style: Math.floor(Math.random() * 4), // 4 distinct geometric styles
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.015, // Slow peaceful rotation
    speed: Math.random() * 1.0 + 0.5, // Gentle falling speed
    drift: (Math.random() - 0.5) * 0.2, // Small horizontal wind drift
    opacity: Math.random() * 0.5 + 0.35, // Soft white transparency
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.015 + 0.005,
    // Settle physics properties
    settled: false,
    settleFade: 1,
    settleTimer: 0,
  };
}

function makeLeaf(width, height, leafImages) {
  const size = Math.random() * 28 + 18; // 18–46px
  return {
    x: Math.random() * width,
    y: Math.random() * -height * 0.6 - 60,
    imgIdx: Math.floor(Math.random() * leafImages.length),
    size,
    // Physics
    vy: 0,                                    // vertical velocity
    vx: (Math.random() - 0.5) * 0.6,          // horizontal velocity
    gravity: 0.015 + Math.random() * 0.015,    // gravity pull
    drag: 0.995 + Math.random() * 0.003,       // air drag
    terminalVel: 1.2 + Math.random() * 0.8,    // max fall speed
    // Rotation & tumble
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.04,
    tiltAngle: (Math.random() - 0.5) * 0.3,    // 3D-ish tilt
    // Sway (wind gusts)
    swayPhase: Math.random() * Math.PI * 2,
    swayFreq: 0.008 + Math.random() * 0.012,
    swayAmp: 0.3 + Math.random() * 0.7,
    // Opacity
    opacity: 0.7 + Math.random() * 0.3,
    // Settled state
    settled: false,
    settledY: 0,
    settledRotation: 0,
    settleFade: 1,
    settleTimer: 0,
  };
}

function makeStormDrop(width, height) {
  const z = Math.random() * 1.2 + 0.4;
  return {
    x: Math.random() * width,
    y: Math.random() * -height,
    z,
    length: (Math.random() * 30 + 20) * z,
    speed: (Math.random() * 20 + 18) * z,
    opacity: (Math.random() * 0.5 + 0.2) * z,
    angle: -0.2,
  };
}

function makeStar(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.7 + 0.1,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
  };
}

/* ─────────────────────────────────────────────────────────
   Draw functions
───────────────────────────────────────────────────────── */

function drawRainDrop(ctx, p) {
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x + p.angle * p.length, p.y + p.length);
  ctx.strokeStyle = `rgba(174, 194, 224, ${p.opacity})`;
  ctx.lineWidth = 1.5 * p.z;
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawSnowFlake(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  
  // Clean off-white strokes with dynamic opacity
  ctx.strokeStyle = "rgb(235, 245, 255)";
  ctx.lineWidth = Math.max(0.7, p.r * 0.09);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = p.opacity * p.settleFade;

  // Draw 6-sided symmetry branches
  for (let i = 0; i < 6; i++) {
    ctx.rotate(Math.PI / 3);

    if (p.style === 0) {
      // Style 0: Classic dendritic branch with dual-level prongs
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -p.r);
      ctx.stroke();

      // Lower prongs
      ctx.beginPath();
      ctx.moveTo(0, -p.r * 0.45);
      ctx.lineTo(-p.r * 0.25, -p.r * 0.65);
      ctx.moveTo(0, -p.r * 0.45);
      ctx.lineTo(p.r * 0.25, -p.r * 0.65);
      ctx.stroke();

      // Upper prongs
      ctx.beginPath();
      ctx.moveTo(0, -p.r * 0.75);
      ctx.lineTo(-p.r * 0.18, -p.r * 0.9);
      ctx.moveTo(0, -p.r * 0.75);
      ctx.lineTo(p.r * 0.18, -p.r * 0.9);
      ctx.stroke();

    } else if (p.style === 1) {
      // Style 1: Loop/diamond style branch
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -p.r);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -p.r * 0.5);
      ctx.lineTo(-p.r * 0.2, -p.r * 0.65);
      ctx.lineTo(0, -p.r * 0.85);
      ctx.lineTo(p.r * 0.2, -p.r * 0.65);
      ctx.closePath();
      ctx.stroke();

    } else if (p.style === 2) {
      // Style 2: Dense multi-feathered dendritic branch
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -p.r);
      ctx.stroke();

      // Level 1 prongs
      ctx.beginPath();
      ctx.moveTo(0, -p.r * 0.3);
      ctx.lineTo(-p.r * 0.2, -p.r * 0.42);
      ctx.moveTo(0, -p.r * 0.3);
      ctx.lineTo(p.r * 0.2, -p.r * 0.42);
      ctx.stroke();

      // Level 2 prongs
      ctx.beginPath();
      ctx.moveTo(0, -p.r * 0.6);
      ctx.lineTo(-p.r * 0.2, -p.r * 0.72);
      ctx.moveTo(0, -p.r * 0.6);
      ctx.lineTo(p.r * 0.2, -p.r * 0.72);
      ctx.stroke();

      // Tiny crossbars
      ctx.beginPath();
      ctx.moveTo(-p.r * 0.1, -p.r * 0.66);
      ctx.lineTo(-p.r * 0.18, -p.r * 0.62);
      ctx.moveTo(p.r * 0.1, -p.r * 0.66);
      ctx.lineTo(p.r * 0.18, -p.r * 0.62);
      ctx.stroke();

    } else if (p.style === 3) {
      // Style 3: Stellar crystal with triangular/broad plates
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -p.r);
      ctx.stroke();

      // Thick plates
      ctx.beginPath();
      ctx.moveTo(0, -p.r * 0.2);
      ctx.lineTo(-p.r * 0.15, -p.r * 0.35);
      ctx.lineTo(-p.r * 0.15, -p.r * 0.65);
      ctx.lineTo(0, -p.r * 0.8);
      ctx.lineTo(p.r * 0.15, -p.r * 0.65);
      ctx.lineTo(p.r * 0.15, -p.r * 0.35);
      ctx.closePath();
      ctx.fillStyle = "rgba(235, 245, 255, 0.15)";
      ctx.fill();
      ctx.stroke();
    }
  }

  // Draw central hub
  if (p.style === 0 || p.style === 2) {
    ctx.beginPath();
    ctx.arc(0, 0, p.r * 0.15, 0, Math.PI * 2);
    ctx.stroke();
  } else if (p.style === 1) {
    ctx.beginPath();
    ctx.arc(0, 0, p.r * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(235, 245, 255)";
    ctx.fill();
  } else if (p.style === 3) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const hx = Math.cos(angle) * p.r * 0.2;
      const hy = Math.sin(angle) * p.r * 0.2;
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
    ctx.stroke();
  }

  ctx.restore();
}

function drawLeafImage(ctx, p, leafImages) {
  const img = leafImages[p.imgIdx];
  if (!img || !img.complete) return;

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  // Fake 3D tilt via horizontal scale
  ctx.scale(Math.cos(p.tiltAngle), 1);
  ctx.globalAlpha = p.opacity * p.settleFade;
  const half = p.size / 2;
  ctx.drawImage(img, -half, -half, p.size, p.size);
  ctx.restore();
}

function drawStormDrop(ctx, p) {
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(p.x + p.angle * p.length, p.y + p.length);
  ctx.strokeStyle = `rgba(160, 185, 220, ${p.opacity})`;
  ctx.lineWidth = 1.8 * p.z;
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawStar(ctx, p, t) {
  const op =
    p.opacity * (0.6 + 0.4 * Math.sin(t * p.twinkleSpeed + p.twinkleOffset));
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(200, 220, 255, ${op})`;
  ctx.fill();
}

/* ─────────────────────────────────────────────────────────
   Update functions
───────────────────────────────────────────────────────── */

function updateRain(p, width, height) {
  p.y += p.speed;
  p.x += p.angle * p.speed;
  if (p.y > height || p.x < -20 || p.x > width + 20) {
    Object.assign(p, makeRainDrop(width, height));
    p.y = Math.random() * -50;
  }
}

function updateSnow(p, width, height) {
  if (p.settled) {
    p.settleTimer++;
    if (p.settleTimer > 180) { // Linger for ~3 seconds
      p.settleFade -= 0.008; // Fade out
    }
    if (p.settleFade <= 0) {
      Object.assign(p, makeSnowFlake(width, height));
      p.y = -p.r * 2;
    }
    return;
  }

  p.wobble += p.wobbleSpeed;
  p.y += p.speed;
  p.x += p.drift + Math.sin(p.wobble) * 0.4;
  p.rotation += p.rotSpeed; // Spin slowly

  // Settle at the bottom of the screen (simulating ground accumulation)
  const groundY = height - 5 - Math.random() * 20;
  if (p.y >= groundY) {
    p.y = groundY;
    p.settled = true;
    p.settleTimer = 0;
    p.settleFade = 1;
    p.speed = 0;
    p.drift = 0;
  }

  if (p.y > height + p.r * 2 || p.x < -p.r * 2 || p.x > width + p.r * 2) {
    Object.assign(p, makeSnowFlake(width, height));
    p.y = -p.r * 2;
  }
}

function updateLeafPhysics(p, width, height, leafImages) {
  if (p.settled) {
    // Settled leaves fade out then respawn
    p.settleTimer++;
    if (p.settleTimer > 180) {
      p.settleFade -= 0.008;
    }
    if (p.settleFade <= 0) {
      Object.assign(p, makeLeaf(width, height, leafImages));
    }
    return;
  }

  // Gravity with terminal velocity
  p.vy += p.gravity;
  if (p.vy > p.terminalVel) p.vy = p.terminalVel;

  // Air drag
  p.vy *= p.drag;
  p.vx *= p.drag;

  // Wind sway (sinusoidal gusts)
  p.swayPhase += p.swayFreq;
  const sway = Math.sin(p.swayPhase) * p.swayAmp;
  p.vx += sway * 0.01;

  // Apply velocity
  p.y += p.vy;
  p.x += p.vx + sway * 0.15;

  // Tumble rotation (faster when falling faster)
  p.rotation += p.rotSpeed * (1 + p.vy * 0.5);

  // Gentle tilt oscillation
  p.tiltAngle = Math.sin(p.swayPhase * 1.7) * 0.4;

  // Hit the "ground" — settle at bottom
  const groundY = height - 10 - Math.random() * 30;
  if (p.y >= groundY) {
    p.y = groundY;
    p.settled = true;
    p.settledRotation = p.rotation;
    p.settleTimer = 0;
    p.settleFade = 1;
    // A tiny final rotation to look natural
    p.rotation += (Math.random() - 0.5) * 0.3;
    p.vy = 0;
    p.vx = 0;
  }

  // Off-screen horizontally → respawn
  if (p.x < -60 || p.x > width + 60) {
    Object.assign(p, makeLeaf(width, height, leafImages));
  }
}

function updateStorm(p, width, height) {
  p.y += p.speed;
  p.x += p.angle * p.speed;
  if (p.y > height || p.x < -20 || p.x > width + 20) {
    Object.assign(p, makeStormDrop(width, height));
    p.y = Math.random() * -50;
  }
}

/* ─────────────────────────────────────────────────────────
   WeatherCanvas Component
───────────────────────────────────────────────────────── */

const WeatherCanvas = ({ weather = "clear" }) => {
  const canvasRef = useRef(null);
  const weatherRef = useRef(weather);
  const particlesRef = useRef([]);
  const lightningRef = useRef({ active: false, opacity: 0, timer: 0 });
  const leafImagesRef = useRef([]);

  // Keep weatherRef in sync
  useEffect(() => {
    weatherRef.current = weather;
  }, [weather]);

  // Pre-load leaf images & strip white backgrounds
  useEffect(() => {
    function removeWhiteBg(img) {
      return new Promise((resolve) => {
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cx = c.getContext("2d");
          cx.drawImage(img, 0, 0);
          const id = cx.getImageData(0, 0, c.width, c.height);
          const d = id.data;
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i], g = d[i + 1], b = d[i + 2];
            const brightness = (r + g + b) / 3;
            const maxC = Math.max(r, g, b);
            const minC = Math.min(r, g, b);
            const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;
            // Aggressively remove white, off-white, and light gray pixels
            if (brightness > 200 && saturation < 0.18) {
              d[i + 3] = 0; // fully transparent
            } else if (brightness > 180 && saturation < 0.22) {
              // Feathered edge for smooth blending
              const fade = Math.max(0, (brightness - 180) / 20);
              d[i + 3] = Math.floor(d[i + 3] * (1 - fade));
            }
          }
          cx.putImageData(id, 0, 0);
          // Create a new image from the processed canvas
          const cleaned = new Image();
          cleaned.src = c.toDataURL("image/png");
          cleaned.onload = () => resolve(cleaned);
        };
        if (img.complete) {
          // Already cached — trigger manually
          img.onload();
        }
      });
    }

    const rawImgs = LEAF_SRCS.map((src) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      return img;
    });

    Promise.all(rawImgs.map(removeWhiteBg)).then((cleaned) => {
      leafImagesRef.current = cleaned;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animFrameId;
    let t = 0;
    let currentWeather = null;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const CONFIGS = {
      rain:   { count: 150 },
      snow:   { count: 40 }, // Reduced count for a more elegant, subtle snowfall
      autumn: { count: 40  },
      storm:  { count: 220 },
      clear:  { count: 0 },
    };

    function buildParticles(mode) {
      const cfg = CONFIGS[mode];
      if (!cfg) return [];
      const leafImgs = leafImagesRef.current;
      switch (mode) {
        case "rain":   return Array.from({ length: cfg.count }, () => makeRainDrop(width, height));
        case "snow":   return Array.from({ length: cfg.count }, () => makeSnowFlake(width, height));
        case "autumn": return Array.from({ length: cfg.count }, () => makeLeaf(width, height, leafImgs));
        case "storm":  return Array.from({ length: cfg.count }, () => makeStormDrop(width, height));
        case "clear":  return Array.from({ length: cfg.count }, () => makeStar(width, height));
        default:       return [];
      }
    }

    function animate() {
      t++;
      const mode = weatherRef.current;

      // Re-build particles if weather changed
      if (mode !== currentWeather) {
        currentWeather = mode;
        particlesRef.current = buildParticles(mode);
        lightningRef.current = { active: false, opacity: 0, timer: 0 };
      }

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const leafImgs = leafImagesRef.current;

      // Storm lightning
      if (mode === "storm") {
        const l = lightningRef.current;
        if (!l.active && Math.random() < 0.003) {
          l.active = true;
          l.opacity = 0.25;
          l.timer = 0;
        }
        if (l.active) {
          ctx.fillStyle = `rgba(180, 200, 255, ${l.opacity})`;
          ctx.fillRect(0, 0, width, height);
          l.opacity *= 0.75;
          l.timer++;
          if (l.opacity < 0.01) l.active = false;
        }
      }

      particles.forEach((p) => {
        switch (mode) {
          case "rain":
            updateRain(p, width, height);
            drawRainDrop(ctx, p);
            break;
          case "snow":
            updateSnow(p, width, height);
            drawSnowFlake(ctx, p);
            break;
          case "autumn":
            updateLeafPhysics(p, width, height, leafImgs);
            drawLeafImage(ctx, p, leafImgs);
            break;
          case "storm":
            updateStorm(p, width, height);
            drawStormDrop(ctx, p);
            break;
          case "clear":
            drawStar(ctx, p, t);
            break;
          default:
            break;
        }
      });

      animFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []); // runs once; weather changes handled via ref

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default WeatherCanvas;
