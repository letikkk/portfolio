import { useEffect, useRef, useState } from 'react';
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  filterProjects,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolio';
import { Reveal } from './Reveal';
import { VideoCard } from './VideoCard';

interface ProjectShowcaseProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  modalOpen: boolean;
  onInspectProject: (project: ProjectItem) => void;
}

interface PillRect {
  left: number;
  top: number;
  width: number;
  height: number;
  ready: boolean;
}

export function ProjectShowcase({
  selectedCategory,
  onSelectCategory,
  modalOpen,
  onInspectProject,
}: ProjectShowcaseProps) {
  const visibleProjects = filterProjects(PROJECTS, selectedCategory);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState<PillRect>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  useEffect(() => {
    const updatePill = () => {
      const container = groupRef.current;
      const activeBtn = buttonRefs.current[selectedCategory];
      if (!container || !activeBtn || !activeBtn.offsetWidth || !activeBtn.offsetHeight) {
        return;
      }
      setPillStyle({
        left: activeBtn.offsetLeft,
        top: activeBtn.offsetTop,
        width: activeBtn.offsetWidth,
        height: activeBtn.offsetHeight,
        ready: true,
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && groupRef.current) {
      observer = new ResizeObserver(updatePill);
      observer.observe(groupRef.current);
    }

    return () => {
      window.removeEventListener('resize', updatePill);
      observer?.disconnect();
    };
  }, [selectedCategory]);

  return (
    <section id="work" className="relative scroll-mt-16 border-b border-[#1D212B]/80">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-[11px] tracking-[0.14em] text-[#38BDF8] uppercase">
                02 / Production Showcase
              </span>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-[#F3F5F8] sm:text-3xl">
                Selected work
              </h2>
              <p className="mt-2 max-w-[58ch] text-sm text-[#9CA3B2]">
                Viewport recordings of implemented systems. Click any demo to open full playback
                and system architecture notes.
              </p>
            </div>

            <div
              ref={groupRef}
              className="relative inline-flex flex-wrap gap-1 rounded-lg border border-[#1D212B] bg-[#0D0F13]/85 p-1 backdrop-blur-md"
              role="group"
              aria-label="Filter projects"
            >
              {pillStyle.ready && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute rounded-md border border-[#38BDF8]/60 bg-[#38BDF8]/15 shadow-[0_0_16px_rgba(56,189,248,0.16)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    left: `${pillStyle.left}px`,
                    top: `${pillStyle.top}px`,
                    width: `${pillStyle.width}px`,
                    height: `${pillStyle.height}px`,
                  }}
                />
              )}

              {PROJECT_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    ref={(el) => {
                      buttonRefs.current[category] = el;
                    }}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onSelectCategory(category)}
                    className={`relative z-10 min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 sm:min-h-0 ${
                      active
                        ? 'text-[#F3F5F8]'
                        : 'text-[#9CA3B2] hover:text-[#F3F5F8]'
                    } ${!pillStyle.ready && active ? 'bg-[#38BDF8]/15 ring-1 ring-[#38BDF8]/60' : ''}`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {visibleProjects.map((project, idx) => (
            <VideoCard
              key={`${selectedCategory}-${project.id}`}
              project={project}
              index={idx}
              featured={selectedCategory === 'All' && Boolean(project.featured)}
              modalOpen={modalOpen}
              onInspect={onInspectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
