import { useCallback, useEffect, useMemo, useState } from 'react';
import { CommissionSection } from './components/CommissionSection';
import { CursorFollower } from './components/CursorFollower';
import { Hero } from './components/Hero';
import { InteractiveBackground, type BackgroundMode } from './components/InteractiveBackground';
import { Navbar } from './components/Navbar';
import { ProjectShowcase } from './components/ProjectShowcase';
import { StackSection } from './components/StackSection';
import { StudiosSection } from './components/StudiosSection';
import { VideoModal } from './components/VideoModal';
import {
  DISCORD_BRIEF_TEMPLATE,
  PROFILE,
  PROJECTS,
  filterProjects,
  type ProjectCategory,
  type ProjectItem,
} from './data/portfolio';
import { copyText } from './utils/clipboard';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [bgMode, setBgMode] = useState<BackgroundMode>('swarm');

  const visibleProjects = useMemo(
    () => filterProjects(PROJECTS, selectedCategory),
    [selectedCategory],
  );

  useEffect(() => {
    if (!copiedHandle) {
      return;
    }
    const timer = window.setTimeout(() => setCopiedHandle(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedHandle]);

  useEffect(() => {
    if (!copiedTemplate) {
      return;
    }
    const timer = window.setTimeout(() => setCopiedTemplate(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedTemplate]);

  const handleCopyDiscord = useCallback(async () => {
    const ok = await copyText(PROFILE.discordHandle);
    if (ok) {
      setCopiedHandle(true);
    }
  }, []);

  const handleCopyTemplate = useCallback(async () => {
    const ok = await copyText(DISCORD_BRIEF_TEMPLATE);
    if (ok) {
      setCopiedTemplate(true);
    }
  }, []);

  const stepModalProject = useCallback(
    (delta: number) => {
      if (!activeProject || visibleProjects.length <= 1) {
        return;
      }
      const index = visibleProjects.findIndex((p) => p.id === activeProject.id);
      if (index === -1) {
        return;
      }
      const nextIndex = (index + delta + visibleProjects.length) % visibleProjects.length;
      setActiveProject(visibleProjects[nextIndex]);
    },
    [activeProject, visibleProjects],
  );

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#07080A] text-[#F3F5F8]">
      <InteractiveBackground mode={bgMode} />
      <CursorFollower />

      <div className="relative z-10">
        <Navbar copiedHandle={copiedHandle} onCopyHandle={handleCopyDiscord} />
        <main>
          <Hero
            copiedHandle={copiedHandle}
            onCopyHandle={handleCopyDiscord}
            bgMode={bgMode}
            onChangeBgMode={setBgMode}
          />
          <StudiosSection />
          <ProjectShowcase
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            modalOpen={activeProject !== null}
            onInspectProject={setActiveProject}
          />
          <StackSection />
          <CommissionSection
            copiedHandle={copiedHandle}
            copiedTemplate={copiedTemplate}
            onCopyHandle={handleCopyDiscord}
            onCopyTemplate={handleCopyTemplate}
          />
        </main>
      </div>

      <VideoModal
        project={activeProject}
        hasMultiple={visibleProjects.length > 1}
        onClose={() => setActiveProject(null)}
        onPrev={() => stepModalProject(-1)}
        onNext={() => stepModalProject(1)}
      />
    </div>
  );
}

export default App;
