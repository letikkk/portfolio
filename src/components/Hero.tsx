import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Sparkles } from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { handleSpotlightLeave, handleSpotlightMove } from '../utils/pointer';
import { GitHubIcon } from './Icons';
import type { BackgroundMode } from './InteractiveBackground';
import { Magnetic } from './Magnetic';

interface HeroProps {
  copiedHandle: boolean;
  onCopyHandle: () => void;
  bgMode: BackgroundMode;
  onChangeBgMode: (mode: BackgroundMode) => void;
}

const BG_MODES: { id: BackgroundMode; label: string }[] = [
  { id: 'swarm', label: 'Swarm' },
  { id: 'vectors', label: 'Vectors' },
  { id: 'orbits', label: 'Orbits' },
];

function shouldAnimateCounter(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nativeObserver =
    'IntersectionObserver' in window &&
    String(window.IntersectionObserver).includes('[native code]');
  return !reduced && nativeObserver;
}

export function Hero({ copiedHandle, onCopyHandle, bgMode, onChangeBgMode }: HeroProps) {
  const [yearsCount, setYearsCount] = useState<number>(() =>
    shouldAnimateCounter() ? 0 : PROFILE.experienceYears,
  );
  const [visitsCount, setVisitsCount] = useState<number>(() =>
    shouldAnimateCounter() ? 0 : 25,
  );

  useEffect(() => {
    if (!shouldAnimateCounter()) {
      return;
    }

    const durationMs = 520;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setYearsCount(Math.max(1, Math.round(eased * PROFILE.experienceYears)));
      setVisitsCount(Math.max(1, Math.round(eased * 25)));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="top" className="relative border-b border-[#1D212B]/80">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
        <div
          className="animate-hero-rise flex flex-wrap items-center justify-between gap-3"
          style={{ animationDelay: '0ms' }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#1D212B] bg-[#0D0F13]/85 px-3.5 py-1.5 text-xs text-[#9CA3B2] backdrop-blur-md">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E]" />
              <span className="relative h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            <span>Commissions Open</span>
            <span className="text-[#2E3545]" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-[#F3F5F8]">{PROFILE.timezone}</span>
          </div>

          <div
            className="inline-flex items-center gap-1 rounded-full border border-[#1D212B] bg-[#0D0F13]/80 p-1 text-xs backdrop-blur-md"
            role="group"
            aria-label="Interactive canvas mode"
          >
            <span className="hidden items-center gap-1 pl-2 pr-1 font-mono text-[11px] text-[#858FA3] sm:inline-flex">
              <Sparkles className="h-3 w-3 text-[#38BDF8]" aria-hidden="true" />
              <span>Field</span>
            </span>
            {BG_MODES.map((item) => {
              const active = bgMode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onChangeBgMode(item.id)}
                  className={`min-h-[32px] rounded-full px-3 py-1 font-mono text-[11px] transition-all duration-200 sm:min-h-0 sm:py-0.5 ${
                    active
                      ? 'bg-white/12 text-[#F3F5F8] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]'
                      : 'text-[#858FA3] hover:text-[#F3F5F8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="animate-hero-rise mt-7 max-w-3xl"
          style={{ animationDelay: '90ms' }}
        >
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[#F3F5F8] sm:text-6xl sm:leading-[1.05]">
            <span className="inline-block">{PROFILE.name}</span>
            <span className="animate-text-shimmer mt-1 block bg-gradient-to-r from-[#F3F5F8] via-[#9CA3B2] to-[#38BDF8] bg-clip-text text-transparent">
              {PROFILE.role}
            </span>
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-[#9CA3B2] sm:text-[17px]">
            {PROFILE.bio}
          </p>
        </div>

        <div
          className="animate-hero-rise mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '180ms' }}
        >
          <Magnetic strength={0.22}>
            <button
              type="button"
              onClick={onCopyHandle}
              className="btn-sheen relative inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#F3F5F8] px-4 py-2.5 text-sm font-medium text-[#07080A] shadow-[0_0_24px_rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-[#38BDF8] hover:shadow-[0_0_28px_rgba(56,189,248,0.35)] active:scale-[0.97]"
            >
              {copiedHandle ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Copied {PROFILE.discordHandle}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>Copy Discord ({PROFILE.discordHandle})</span>
                </>
              )}
            </button>
          </Magnetic>

          <Magnetic strength={0.18}>
            <a
              href="#work"
              className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#1D212B] bg-[#0D0F13]/85 px-4 py-2.5 text-sm font-medium text-[#F3F5F8] backdrop-blur-md transition-all duration-200 hover:border-[#38BDF8]/50 hover:bg-[#13161D] active:scale-[0.97]"
            >
              <span>Browse showcase</span>
              <ArrowUpRight
                className="h-4 w-4 text-[#9CA3B2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]"
                aria-hidden="true"
              />
            </a>
          </Magnetic>

          <Magnetic strength={0.16}>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#1D212B] bg-[#0D0F13]/85 px-4 py-2.5 text-sm font-medium text-[#F3F5F8] backdrop-blur-md transition-all duration-200 hover:border-[#38BDF8]/50 hover:bg-[#13161D] active:scale-[0.97]"
            >
              <GitHubIcon className="h-4 w-4 text-[#9CA3B2] transition-colors group-hover:text-[#F3F5F8]" />
              <span>GitHub</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-[#858FA3] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]"
                aria-hidden="true"
              />
            </a>
          </Magnetic>

          <Magnetic strength={0.16}>
            <a
              href={PROFILE.boostyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[#1D212B] bg-[#0D0F13]/85 px-4 py-2.5 text-sm font-medium text-[#F3F5F8] backdrop-blur-md transition-all duration-200 hover:border-[#38BDF8]/50 hover:bg-[#13161D] active:scale-[0.97]"
            >
              <span>Boosty</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-[#858FA3] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]"
                aria-hidden="true"
              />
            </a>
          </Magnetic>

          <span className="ml-1 hidden font-mono text-[11px] text-[#858FA3] lg:inline-block">
            Move cursor · Click anywhere to pulse
          </span>
        </div>

        <dl
          className="animate-hero-rise mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ animationDelay: '270ms' }}
        >
          <div
            onPointerMove={handleSpotlightMove}
            onPointerLeave={handleSpotlightLeave}
            className="spotlight-card rounded-lg border border-[#1D212B] bg-[#0D0F13]/80 px-5 py-4 backdrop-blur-md hover:-translate-y-0.5"
          >
            <dt className="text-xs text-[#858FA3]">Experience</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#F3F5F8]">
              {yearsCount} Years
            </dd>
          </div>
          <div
            onPointerMove={handleSpotlightMove}
            onPointerLeave={handleSpotlightLeave}
            className="spotlight-card rounded-lg border border-[#1D212B] bg-[#0D0F13]/80 px-5 py-4 backdrop-blur-md hover:-translate-y-0.5"
          >
            <dt className="text-xs text-[#858FA3]">Contributed places</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#38BDF8]">
              {visitsCount}M+
            </dd>
          </div>
          <div
            onPointerMove={handleSpotlightMove}
            onPointerLeave={handleSpotlightLeave}
            className="spotlight-card rounded-lg border border-[#1D212B] bg-[#0D0F13]/80 px-5 py-4 backdrop-blur-md hover:-translate-y-0.5"
          >
            <dt className="text-xs text-[#858FA3]">Rates accepted</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#F3F5F8]">USD / Robux</dd>
          </div>
          <div
            onPointerMove={handleSpotlightMove}
            onPointerLeave={handleSpotlightLeave}
            className="spotlight-card rounded-lg border border-[#1D212B] bg-[#0D0F13]/80 px-5 py-4 backdrop-blur-md hover:-translate-y-0.5"
          >
            <dt className="text-xs text-[#858FA3]">Code workflow</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#F3F5F8]">Rojo + Wally</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
