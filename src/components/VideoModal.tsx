import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface VideoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function VideoModal({ project, onClose, onPrev, onNext }: VideoModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onPrev();
      } else if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080A]/85 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#2E3545] bg-[#0D0F13] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#1D212B] px-5 py-3.5">
          <div>
            <h3 id="modal-project-title" className="text-base font-semibold text-[#F3F5F8]">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-[#636B7D]">
              {project.subtitle} · {project.category} · {project.duration}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="rounded-md border border-[#1D212B] bg-[#13161D] p-1.5 text-[#9CA3B2] transition-colors hover:border-[#2E3545] hover:text-[#F3F5F8]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="rounded-md border border-[#1D212B] bg-[#13161D] p-1.5 text-[#9CA3B2] transition-colors hover:border-[#2E3545] hover:text-[#F3F5F8]"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="ml-1 rounded-md border border-[#1D212B] bg-[#13161D] p-1.5 text-[#9CA3B2] transition-colors hover:border-[#2E3545] hover:text-[#F3F5F8]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto">
          <div className="flex max-h-[55vh] w-full items-center justify-center border-b border-[#1D212B] bg-[#050608]">
            <video
              key={project.id}
              src={project.videoSrc}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[55vh] w-full object-contain"
            />
          </div>

          <div className="grid gap-6 p-5 sm:grid-cols-3 sm:p-6">
            <div className="sm:col-span-2">
              <p className="text-sm leading-relaxed text-[#9CA3B2]">{project.summary}</p>
              <h4 className="mt-4 text-xs font-medium text-[#F3F5F8]">Implemented systems</h4>
              <ul className="mt-2 space-y-1.5 text-sm text-[#9CA3B2]">
                {project.systems.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium text-[#F3F5F8]">Stack & tags</h4>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-[#1D212B] bg-[#07080A] px-2.5 py-1 font-mono text-xs text-[#9CA3B2]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
