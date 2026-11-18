import { useEffect, useRef } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';
import { handleTiltLeave, handleTiltMove } from '../utils/pointer';

interface VideoCardProps {
  project: ProjectItem;
  featured?: boolean;
  index?: number;
  modalOpen: boolean;
  onInspect: (project: ProjectItem) => void;
}

export function VideoCard({
  project,
  featured = false,
  index = 0,
  modalOpen,
  onInspect,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) {
      return;
    }

    if (modalOpen) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => {
              // Ignore autoplay rejections in constrained headless browsers.
            });
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [modalOpen]);

  return (
    <article
      ref={containerRef}
      onPointerMove={(e) => handleTiltMove(e, featured ? 1.5 : 2.1)}
      onPointerLeave={handleTiltLeave}
      style={{ animationDelay: `${index * 70}ms` }}
      className={`spotlight-card animate-card-reveal group flex flex-col overflow-hidden rounded-xl border bg-[#0D0F13]/85 backdrop-blur-md hover:border-[#2E3545] hover:shadow-[0_22px_55px_-20px_rgba(0,0,0,0.9),0_0_28px_-8px_rgba(56,189,248,0.14)] ${
        featured
          ? 'border-[#38BDF8]/30 md:col-span-2'
          : 'border-[#1D212B]'
      }`}
    >
      <div
        className="relative flex w-full items-center justify-center overflow-hidden border-b border-[#1D212B] bg-[#050608]"
        style={{
          aspectRatio: featured ? String(project.aspectRatio) : '2.05',
        }}
      >
        <video
          ref={videoRef}
          src={project.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.title} gameplay recording`}
          className="h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]"
        />

        {/* Subtle HUD corner brackets */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-white/0 transition-all duration-300 group-hover:top-2 group-hover:left-2 group-hover:border-white/45"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-white/0 transition-all duration-300 group-hover:top-2 group-hover:right-2 group-hover:border-white/45"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-white/0 transition-all duration-300 group-hover:bottom-2 group-hover:left-2 group-hover:border-white/45"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 bottom-2.5 h-3 w-3 border-r border-b border-white/0 transition-all duration-300 group-hover:right-2 group-hover:bottom-2 group-hover:border-white/45"
        />

        {featured && (
          <span className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-[#38BDF8]/40 bg-[#07080A]/85 px-2.5 py-0.5 font-mono text-[11px] text-[#38BDF8] backdrop-blur-md">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            <span>Featured</span>
          </span>
        )}

        <span className="pointer-events-none absolute top-3 right-3 rounded border border-[#1D212B] bg-[#07080A]/85 px-2 py-0.5 font-mono text-[11px] text-[#F3F5F8] backdrop-blur-sm transition-colors duration-200 group-hover:border-[#2E3545]">
          {project.duration}
        </span>

        <button
          type="button"
          onClick={() => onInspect(project)}
          aria-label={`Inspect ${project.title}`}
          className="btn-sheen absolute right-3 bottom-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-[#2E3545] bg-[#07080A]/90 px-2.5 py-1.5 text-xs font-medium text-[#F3F5F8] backdrop-blur-md transition-all duration-200 hover:border-[#38BDF8] hover:bg-[#0D131C] hover:text-[#38BDF8] active:scale-[0.96]"
        >
          <Maximize2
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          />
          <span>Inspect</span>
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-[#F3F5F8] transition-colors duration-200 group-hover:text-white">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-[#636B7D] transition-colors duration-200 group-hover:text-[#9CA3B2]">
              {project.subtitle} · {project.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#9CA3B2]">{project.summary}</p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-[#1D212B] bg-[#07080A]/80 px-2 py-0.5 font-mono text-[11px] text-[#9CA3B2] transition-colors duration-200 group-hover:border-[#2E3545] group-hover:text-[#F3F5F8]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
