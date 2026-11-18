import { useEffect, useRef } from 'react';

export function CursorFollower() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ring = ringRef.current;
    if (!ring) {
      return;
    }

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        visible = true;
        ring.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [role="button"]');
      targetScale = interactive ? 1.55 : 1;
    };

    const onDown = () => {
      scale = 0.78;
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = '0';
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      scale += (targetScale - scale) * 0.2;

      ring.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0) scale(${scale.toFixed(3)})`;
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 h-7 w-7 rounded-full border border-white/30 bg-white/[0.02] opacity-0 transition-opacity duration-200"
      style={{ boxShadow: '0 0 18px rgba(56, 189, 248, 0.14)' }}
    />
  );
}
