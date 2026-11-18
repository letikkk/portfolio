import { useEffect, useRef } from 'react';
import { Maximize2 } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface VideoCardProps {
  project: ProjectItem;
  featured?: boolean;
  modalOpen: boolean;
  onInspect: (project: ProjectItem) => void;
}

export function VideoCard({ project, featured = false, modalOpen, onInspect }: VideoCardProps) {
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
      className={`group flex flex-col overflow-hidden rounded-lg border border-[#1D212B] bg-[#0D0F13] transition-colors hover:border-[#2E3545] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className="relative flex w-full items-center justify-center overflow-hidden border-b border-[#1D212B] bg-[#050608]"
        style={{
          aspectRatio: featured ? '1.71' : '2.35',
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
          className="h-full w-full object-contain"
        />

        <span className="pointer-events-none absolute top-3 right-3 rounded border border-[#1D212B] bg-[#07080A]/85 px-2 py-0.5 font-mono text-[11px] text-[#F3F5F8] backdrop-blur-sm">
          {project.duration}
        </span>

        <button
          type="button"
          onClick={() => onInspect(project)}
          aria-label={`Inspect ${project.title}`}
          className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-[#2E3545] bg-[#07080A]/90 px-2.5 py-1.5 text-xs font-medium text-[#F3F5F8] backdrop-blur-sm transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]"
        >
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Inspect</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-[#F3F5F8]">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-[#636B7D]">
              {project.subtitle} · {project.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#9CA3B2]">{project.summary}</p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-[#1D212B] bg-[#07080A] px-2 py-0.5 font-mono text-[11px] text-[#9CA3B2]"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
