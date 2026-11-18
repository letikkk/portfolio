import {
  PROJECT_CATEGORIES,
  PROJECTS,
  filterProjects,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolio';
import { VideoCard } from './VideoCard';

interface ProjectShowcaseProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  modalOpen: boolean;
  onInspectProject: (project: ProjectItem) => void;
}

export function ProjectShowcase({
  selectedCategory,
  onSelectCategory,
  modalOpen,
  onInspectProject,
}: ProjectShowcaseProps) {
  const visibleProjects = filterProjects(PROJECTS, selectedCategory);

  return (
    <section id="work" className="border-b border-[#1D212B]">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#F3F5F8] sm:text-3xl">
              Selected work
            </h2>
            <p className="mt-2 max-w-[58ch] text-sm text-[#9CA3B2]">
              Viewport recordings of implemented systems. Click Inspect on any demo for full
              playback and system architecture notes.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter projects">
            {PROJECT_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSelectCategory(category)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? 'border-[#38BDF8] bg-[#38BDF8]/12 text-[#F3F5F8]'
                      : 'border-[#1D212B] bg-[#0D0F13] text-[#9CA3B2] hover:border-[#2E3545] hover:text-[#F3F5F8]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <VideoCard
              key={project.id}
              project={project}
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
