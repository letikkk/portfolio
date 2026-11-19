import { useEffect, useRef } from 'react';

export type BackgroundMode = 'swarm' | 'vectors' | 'orbits';

interface InteractiveBackgroundProps {
  mode: BackgroundMode;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  radius: number;
  alpha: number;
  phase: number;
  orbitRadius: number;
  orbitDir: number;
  accent: boolean;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface VectorCell {
  x: number;
  y: number;
  angle: number;
  energy: number;
}

function createParticles(width: number, height: number): Particle[] {
  const area = width * height;
  const count = Math.max(75, Math.min(165, Math.floor(area / 10500)));
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const homeX = Math.random() * width;
    const homeY = Math.random() * height;
    particles.push({
      x: homeX,
      y: homeY,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      homeX,
      homeY,
      radius: 0.9 + Math.random() * 1.5,
      alpha: 0.24 + Math.random() * 0.46,
      phase: Math.random() * Math.PI * 2,
      orbitRadius: 16 + Math.random() * 72,
      orbitDir: Math.random() > 0.5 ? 1 : -1,
      accent: i % 7 === 0,
    });
  }
  return particles;
}

function createVectorCells(width: number, height: number): VectorCell[] {
  const spacing = 48;
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const cells: VectorCell[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        x: c * spacing,
        y: r * spacing,
        angle: 0,
        energy: 0,
      });
    }
  }
  return cells;
}

export function InteractiveBackground({ mode }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef<BackgroundMode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const reducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles = createParticles(width, height);
    let vectorCells = createVectorCells(width, height);
    const shockwaves: Shockwave[] = [];

    const pointer = {
      x: width * 0.58,
      y: height * 0.34,
      smoothX: width * 0.58,
      smoothY: height * 0.34,
      active: false,
      lastMoveAt: 0,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
      vectorCells = createVectorCells(width, height);
    };

    resize();

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.lastMoveAt = performance.now();
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.lastMoveAt = performance.now();

      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 260,
        alpha: 0.72,
      });

      // Radial impulse on nearby particles
      for (const p of particles) {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist > 0.01 && dist < 240) {
          const impulse = ((240 - dist) / 240) * 6.5;
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
        }
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    let rafId = 0;
    let prevTime = performance.now();

    const drawBackdropPattern = (t: number, focusX: number, focusY: number) => {
      // Ambient moving aurora glow
      const driftX = width * 0.74 + Math.cos(t * 0.22) * 85;
      const driftY = height * 0.22 + Math.sin(t * 0.18) * 65;

      const ambientGlow = ctx.createRadialGradient(
        driftX,
        driftY,
        0,
        driftX,
        driftY,
        Math.max(width, height) * 0.48,
      );
      ambientGlow.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
      ambientGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.025)');
      ambientGlow.addColorStop(1, 'rgba(7, 8, 10, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Soft cursor illumination halo
      const cursorGlow = ctx.createRadialGradient(focusX, focusY, 0, focusX, focusY, 290);
      cursorGlow.addColorStop(0, 'rgba(255, 255, 255, 0.055)');
      cursorGlow.addColorStop(0.38, 'rgba(56, 189, 248, 0.045)');
      cursorGlow.addColorStop(1, 'rgba(7, 8, 10, 0)');
      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // Architectural dot lattice illuminated near cursor
      const step = 46;
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);
      for (let r = 0; r <= rows; r++) {
        const y = r * step;
        for (let c = 0; c <= cols; c++) {
          const x = c * step;
          const dist = Math.hypot(x - focusX, y - focusY);
          if (dist < 210) {
            const k = 1 - dist / 210;
            const alpha = 0.045 + k * k * 0.24;
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(x, y, 0.9 + k * 0.95, 0, Math.PI * 2);
            ctx.fill();
          } else if ((r + c) % 2 === 0) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
          }
        }
      }
    };

    const drawSwarm = (dtNorm: number, t: number, focusX: number, focusY: number) => {
      const attractRadius = pointer.active ? 340 : 230;
      const activeCluster: Particle[] = [];

      for (const p of particles) {
        // Gentle curl / wave drift
        const flowAngle =
          Math.sin(p.homeX * 0.004 + t * 0.42 + p.phase) +
          Math.cos(p.homeY * 0.004 - t * 0.36);

        p.vx += Math.cos(flowAngle) * 0.018 * dtNorm;
        p.vy += Math.sin(flowAngle) * 0.018 * dtNorm;

        // Weak elastic tether to home coordinates so screen stays balanced
        p.vx += (p.homeX - p.x) * 0.0011 * dtNorm;
        p.vy += (p.homeY - p.y) * 0.0011 * dtNorm;

        // Magnetic cursor clustering + orbital swirl
        const dx = focusX - p.x;
        const dy = focusY - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < attractRadius && dist > 1) {
          const strength = Math.pow(1 - dist / attractRadius, 1.35);
          const nx = dx / dist;
          const ny = dy / dist;

          // Pull toward unique personal orbit ring around cursor
          const radialDelta = dist - p.orbitRadius;
          const pull = Math.max(-0.35, Math.min(0.65, radialDelta * 0.012)) * strength;

          p.vx += nx * pull * dtNorm;
          p.vy += ny * pull * dtNorm;

          // Smooth tangential swirl around the pointer
          const swirl = 0.14 * strength * p.orbitDir;
          p.vx += -ny * swirl * dtNorm;
          p.vy += nx * swirl * dtNorm;
        }

        // Viscous damping
        const damping = Math.pow(0.935, dtNorm);
        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx * dtNorm;
        p.y += p.vy * dtNorm;

        const proximity = dist < 240 ? 1 - dist / 240 : 0;
        if (dist < 195) {
          activeCluster.push(p);
        }

        const r = p.radius + proximity * 1.15;
        const a = Math.min(0.95, p.alpha + proximity * 0.52);

        if (p.accent && proximity > 0.25) {
          ctx.fillStyle = `rgba(56, 189, 248, ${a.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(248, 250, 252, ${a.toFixed(3)})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Crisp subtle halo on nearest bright particles
        if (proximity > 0.55) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(proximity * 0.12).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw crisp constellation connections among clustered particles
      const maxConnDist = 112;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < activeCluster.length; i++) {
        const a = activeCluster[i];
        const daFocus = Math.hypot(a.x - focusX, a.y - focusY);

        // Faint link to pointer center for closest dots
        if (daFocus < 96) {
          const lineAlpha = (1 - daFocus / 96) * 0.22;
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(focusX, focusY);
          ctx.stroke();
        }

        for (let j = i + 1; j < activeCluster.length; j++) {
          const b = activeCluster[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxConnDist) {
            const lineAlpha = (1 - d / maxConnDist) * 0.22;
            ctx.strokeStyle =
              a.accent || b.accent
                ? `rgba(56, 189, 248, ${(lineAlpha * 1.15).toFixed(3)})`
                : `rgba(255, 255, 255, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawVectors = (dtNorm: number, t: number, focusX: number, focusY: number) => {
      ctx.lineCap = 'round';
      for (const cell of vectorCells) {
        const dx = focusX - cell.x;
        const dy = focusY - cell.y;
        const dist = Math.hypot(dx, dy);
        const waveAngle =
          Math.sin(cell.x * 0.008 + t * 0.9) * 0.75 +
          Math.cos(cell.y * 0.008 - t * 0.7) * 0.75;

        const influence = dist < 260 ? Math.pow(1 - dist / 260, 1.4) : 0;
        const targetAngle =
          influence > 0.05
            ? Math.atan2(dy, dx) + (1 - influence) * waveAngle * 0.35
            : waveAngle;

        // Shortest angular interpolation
        let diff = targetAngle - cell.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        cell.angle += diff * Math.min(1, 0.14 * dtNorm);
        cell.energy += (influence - cell.energy) * Math.min(1, 0.16 * dtNorm);

        const len = 5.5 + cell.energy * 10;
        const cos = Math.cos(cell.angle);
        const sin = Math.sin(cell.angle);

        const alpha = 0.1 + cell.energy * 0.65;
        ctx.strokeStyle =
          cell.energy > 0.35
            ? `rgba(56, 189, 248, ${alpha.toFixed(3)})`
            : `rgba(248, 250, 252, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1 + cell.energy * 0.9;

        ctx.beginPath();
        ctx.moveTo(cell.x - cos * len * 0.5, cell.y - sin * len * 0.5);
        ctx.lineTo(cell.x + cos * len * 0.5, cell.y + sin * len * 0.5);
        ctx.stroke();

        if (cell.energy > 0.25) {
          ctx.fillStyle = `rgba(255, 255, 255, ${(cell.energy * 0.85).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cell.x + cos * len * 0.5, cell.y + sin * len * 0.5, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawOrbits = (t: number, focusX: number, focusY: number) => {
      const rings = [58, 108, 168, 238];
      ctx.save();
      ctx.translate(focusX, focusY);

      rings.forEach((radius, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        const speed = (0.28 - idx * 0.045) * dir;
        ctx.save();
        ctx.rotate(t * speed);

        ctx.setLineDash(idx % 2 === 0 ? [5, 8] : [2, 10]);
        ctx.strokeStyle =
          idx === 1
            ? 'rgba(56, 189, 248, 0.22)'
            : `rgba(255, 255, 255, ${(0.18 - idx * 0.03).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Orbiting white satellite nodes
        ctx.setLineDash([]);
        const nodeCount = idx + 2;
        for (let n = 0; n < nodeCount; n++) {
          const a = (n / nodeCount) * Math.PI * 2;
          const nx = Math.cos(a) * radius;
          const ny = Math.sin(a) * radius;
          ctx.fillStyle = idx === 1 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(255, 255, 255, 0.72)';
          ctx.beginPath();
          ctx.arc(nx, ny, idx === 0 ? 2 : 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Subtle crosshair ticks
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1;
      const tick = 10;
      ctx.beginPath();
      ctx.moveTo(-tick, 0);
      ctx.lineTo(tick, 0);
      ctx.moveTo(0, -tick);
      ctx.lineTo(0, tick);
      ctx.stroke();

      ctx.restore();
    };

    const drawShockwaves = (dtNorm: number) => {
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const wave = shockwaves[i];
        wave.radius += 5.4 * dtNorm;
        wave.alpha *= Math.pow(0.94, dtNorm);

        if (wave.radius >= wave.maxRadius || wave.alpha < 0.015) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${(wave.alpha * 0.45).toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(56, 189, 248, ${(wave.alpha * 0.35).toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, Math.max(2, wave.radius * 0.72), 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const renderFrame = (now: number) => {
      const dt = Math.min(0.05, (now - prevTime) / 1000);
      prevTime = now;
      const dtNorm = dt * 60;
      const t = now * 0.001;

      ctx.clearRect(0, 0, width, height);

      // Gentle autonomous idle figure-eight orbit if user hasn't moved mouse yet
      const idleTargetX = width * 0.56 + Math.cos(t * 0.55) * 140;
      const idleTargetY = height * 0.34 + Math.sin(t * 0.75) * 65;

      const targetX = pointer.active ? pointer.x : idleTargetX;
      const targetY = pointer.active ? pointer.y : idleTargetY;

      pointer.smoothX += (targetX - pointer.smoothX) * Math.min(1, 0.14 * dtNorm);
      pointer.smoothY += (targetY - pointer.smoothY) * Math.min(1, 0.14 * dtNorm);

      drawBackdropPattern(t, pointer.smoothX, pointer.smoothY);

      const currentMode = modeRef.current;
      if (currentMode === 'swarm') {
        drawSwarm(dtNorm, t, pointer.smoothX, pointer.smoothY);
      } else if (currentMode === 'vectors') {
        drawVectors(dtNorm, t, pointer.smoothX, pointer.smoothY);
      } else {
        drawSwarm(dtNorm * 0.55, t, pointer.smoothX, pointer.smoothY);
        drawOrbits(t, pointer.smoothX, pointer.smoothY);
      }

      drawShockwaves(dtNorm);

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    if (reducedMotion) {
      renderFrame(performance.now());
    } else {
      rafId = window.requestAnimationFrame(renderFrame);
    }

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-45 sm:opacity-100"
    />
  );
}
