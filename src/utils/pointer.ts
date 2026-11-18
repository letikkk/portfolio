import type { PointerEvent as ReactPointerEvent } from 'react';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Updates CSS custom properties (--spot-x, --spot-y) for radial cursor spotlight cards.
 */
export function handleSpotlightMove(event: ReactPointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  el.style.setProperty('--spot-x', `${x}px`);
  el.style.setProperty('--spot-y', `${y}px`);
  el.style.setProperty('--spot-opacity', '1');
}

export function handleSpotlightLeave(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--spot-opacity', '0');
}

/**
 * Combines cursor spotlight tracking with a restrained 3D perspective tilt.
 */
export function handleTiltMove(
  event: ReactPointerEvent<HTMLElement>,
  maxTiltDeg = 2.2,
) {
  handleSpotlightMove(event);
  if (prefersReducedMotion()) {
    return;
  }
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }
  const nx = (event.clientX - rect.left) / rect.width - 0.5;
  const ny = (event.clientY - rect.top) / rect.height - 0.5;
  const rotateY = (nx * maxTiltDeg * 2).toFixed(2);
  const rotateX = (-ny * maxTiltDeg * 2).toFixed(2);

  el.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
}

export function handleTiltLeave(event: ReactPointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  el.style.setProperty('--spot-opacity', '0');
  el.style.transform = '';
}
