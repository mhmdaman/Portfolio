import { useEffect, useRef } from "react";

const RainCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animFrameId;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const maxDrops = 150;
    const drops = [];

    class RainDrop {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height; // Start above viewport
        this.z = Math.random() * 1 + 0.2; // Depth multiplier (0.2 to 1.2)
        this.length = (Math.random() * 20 + 15) * this.z; // Closer drops are longer
        this.speed = (Math.random() * 15 + 10) * this.z; // Closer drops fall faster
        this.opacity = (Math.random() * 0.3 + 0.1) * this.z; // Closer drops are brighter
        this.angle = -0.1; // Slanted rain effect
      }

      update() {
        this.y += this.speed;
        this.x += this.angle * this.speed;

        // Reset drop when it goes off screen
        if (this.y > height || this.x < -20 || this.x > width + 20) {
          this.init();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.angle * this.length, this.y + this.length);
        ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
        ctx.lineWidth = 1.5 * this.z;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    // Populate drop array
    for (let i = 0; i < maxDrops; i++) {
      drops.push(new RainDrop());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drops.forEach((drop) => {
        drop.update();
        drop.draw();
      });
      animFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

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

export default RainCanvas;
