import { useEffect, useRef } from "react";

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let nebulas = [];
    let width = 0;
    let height = 0;
    let isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Listen for reduced motion changes
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e) => {
      isReducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      initStars();
      initNebulas();
    };

    const initStars = () => {
      stars = [];
      const density = Math.floor((width * height) / 6000);
      const starCount = Math.min(Math.max(150, density), 400);

      for (let i = 0; i < starCount; i++) {
        // Size distribution: 80% 1px, 15% 2px, 5% 3px
        const rand = Math.random();
        const size = rand > 0.95 ? 3 : rand > 0.8 ? 2 : 1;
        
        const isTwinkling = Math.random() < 0.2;
        
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseOpacity: 0.3 + Math.random() * 0.6, // 0.3 to 0.9
          vx: -(20 + Math.random() * 25) / 60, // 20-45px per second leftward
          vy: (8 + Math.random() * 12) / 60, // downward speed
          isTwinkling,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: (Math.PI * 2) / (45 + Math.random() * 45), // Faster 0.75-1.5s twinkle cycle
        });
      }
    };

    const initNebulas = () => {
      nebulas = [
        {
          x: width * 0.25,
          y: height * 0.25,
          radius: Math.max(width, height) * 0.5,
          color: "rgba(197, 163, 255, 0.04)", // Lavender Mist
          angle: 0,
          speed: 0.004,
          orbitRadius: 60,
          baseX: width * 0.25,
          baseY: height * 0.25,
        },
        {
          x: width * 0.75,
          y: height * 0.75,
          radius: Math.max(width, height) * 0.5,
          color: "rgba(6, 182, 212, 0.035)", // Cyan
          angle: Math.PI,
          speed: 0.0035,
          orbitRadius: 80,
          baseX: width * 0.75,
          baseY: height * 0.75,
        },
        {
          x: width * 0.5,
          y: height * 0.5,
          radius: Math.max(width, height) * 0.6,
          color: "rgba(197, 163, 255, 0.03)", 
          angle: Math.PI / 2,
          speed: 0.0025,
          orbitRadius: 110,
          baseX: width * 0.5,
          baseY: height * 0.5,
        }
      ];
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Nebulas
      nebulas.forEach((n) => {
        if (!isReducedMotion) {
          n.angle += n.speed;
          n.x = n.baseX + Math.cos(n.angle) * n.orbitRadius;
          n.y = n.baseY + Math.sin(n.angle) * n.orbitRadius;
        }

        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Stars
      ctx.fillStyle = "#FFF9FA";
      stars.forEach((star) => {
        if (!isReducedMotion) {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < 0) star.x = width;
          if (star.y > height) star.y = 0;
          if (star.x > width) star.x = 0; // fallback
          if (star.y < 0) star.y = height; // fallback

          if (star.isTwinkling) {
            star.twinklePhase += star.twinkleSpeed;
          }
        }

        let currentOpacity = star.baseOpacity;
        if (star.isTwinkling && !isReducedMotion) {
          const sine = Math.sin(star.twinklePhase);
          currentOpacity = Math.max(0.1, Math.min(1, star.baseOpacity + sine * 0.3));
        }

        ctx.globalAlpha = currentOpacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    initCanvas();
    render();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initCanvas();
      }, 200);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cancelAnimationFrame(animationFrameId);
      } else {
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default StarfieldBackground;
