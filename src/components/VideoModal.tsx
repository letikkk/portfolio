import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface VideoModalProps {
  project: ProjectItem | null;
  hasMultiple?: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function VideoModal({
  project,
  hasMultiple = true,
  onClose,
  onPrev,
  onNext,
}: VideoModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) {
      return;
    }

    if (!previousFocusRef.current && document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the close button on initial open so keyboard users immediately enter the dialog.
    if (panelRef.current && !panelRef.current.contains(document.activeElement)) {
      closeBtnRef.current?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && hasMultiple) {
        onPrev();
      } else if (event.key === 'ArrowRight' && hasMultiple) {
        onNext();
      } else if (event.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (focusables.length === 0) {
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, hasMultiple, onClose, onPrev, onNext]);

  // Restore focus to the button that opened the modal once it closes.
  useEffect(() => {
    if (project !== null) {
      return;
    }
    const target = previousFocusRef.current;
    previousFocusRef.current = null;
    if (target && document.contains(target)) {
      target.focus();
    }
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="animate-modal-fade fixed inset-0 z-50 flex items-center justify-center bg-[#07080A]/85 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="animate-modal-pop flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[#2E3545] bg-[#0D0F13]/95 shadow-[0_32px_90px_rgba(0,0,0,0.85)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#1D212B] px-5 py-3.5">
          <div>
            <h3 id="modal-project-title" className="text-base font-semibold text-[#F3F5F8]">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-[#858FA3]">
              {project.subtitle} · {project.category} · {project.duration}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="mr-2 hidden font-mono text-[11px] text-[#858FA3] sm:inline">
              {hasMultiple ? '← / → switch · ESC close' : 'ESC close'}
            </span>
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous project"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1D212B] bg-[#13161D] text-[#9CA3B2] transition-all duration-150 hover:border-[#38BDF8]/60 hover:text-[#F3F5F8] active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1D212B] bg-[#13161D] text-[#9CA3B2] transition-all duration-150 hover:border-[#38BDF8]/60 hover:text-[#F3F5F8] active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </>
            )}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#1D212B] bg-[#13161D] text-[#9CA3B2] transition-all duration-150 hover:border-[#38BDF8]/60 hover:text-[#F3F5F8] active:scale-95"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div key={project.id} className="animate-modal-fade overflow-y-auto">
          <div className="flex max-h-[55vh] w-full items-center justify-center border-b border-[#1D212B] bg-[#050608]">
            <video
              key={project.id}
              src={project.videoSrc}
              poster={project.posterSrc}
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
              <h4 className="text-xs font-medium text-[#F3F5F8]">Stack &amp; tags</h4>
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
