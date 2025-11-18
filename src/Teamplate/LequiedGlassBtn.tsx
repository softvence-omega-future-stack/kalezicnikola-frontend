import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const LiquidGlassButton: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, ] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 100;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.1;
          p.vy += (dy / dist) * force * 0.1;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     setMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
//     const touch = e.touches[0];
//     setMousePos({ x: touch.clientX, y: touch.clientY });
//   };

  const handleClick = () => {
    console.log('Start Now clicked!');
    // Add your button action here
  };

  return (
    <div className="relative  ">
      {/* <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="absolute top-0 left-0 w-full h-full"
      /> */}
      
    <button
  onClick={handleClick}
  className="relative z-10 px-12 py-5 text-xl font-semibold text-white bg-[#E6F7F9] rounded-full"
  style={{
    backgroundColor: 'rgba(255, 255, 255, 0.15)',  // light glass effect
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px) saturate(180%)',
    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    boxShadow: `
      inset 0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 2px 3px 0px -2px rgba(255, 255, 255, 0.9),
      inset -2px -2px 0px -2px rgba(255, 255, 255, 0.8),
      inset -3px -8px 1px -6px rgba(255, 255, 255, 0.6),
      inset -0.3px -1px 4px 0px rgba(0, 0, 0, 0.12),
      0px 4px 15px 0px rgba(0, 0, 0, 0.3)
    `,
  }}
>
  Start Now
</button>


      <style>{`
        .glass-button:hover {
          background-color: rgba(255, 255, 255, 0.25) !important;
          box-shadow: 
            inset 0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 2px 3px 0px -2px rgba(255, 255, 255, 1),
            inset -2px -2px 0px -2px rgba(255, 255, 255, 0.9),
            inset -3px -8px 1px -6px rgba(255, 255, 255, 0.7),
            inset -0.3px -1px 4px 0px rgba(0, 0, 0, 0.15),
            0px 6px 20px 0px rgba(0, 0, 0, 0.4) !important;
        }
        
        .glass-button:active {
          box-shadow: 
            inset 0 0 0 1px rgba(255, 255, 255, 0.12),
            inset 2px 3px 0px -2px rgba(255, 255, 255, 0.8),
            inset -2px -2px 0px -2px rgba(255, 255, 255, 0.7),
            inset -3px -8px 1px -6px rgba(255, 255, 255, 0.5),
            inset -0.3px -1px 4px 0px rgba(0, 0, 0, 0.2),
            0px 2px 10px 0px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default LiquidGlassButton;