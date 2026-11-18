import { useCallback, useEffect, useState } from 'react';
import { CommissionSection } from './components/CommissionSection';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProjectShowcase } from './components/ProjectShowcase';
import { StackSection } from './components/StackSection';
import { VideoModal } from './components/VideoModal';
import {
  DISCORD_BRIEF_TEMPLATE,
  PROFILE,
  PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from './data/portfolio';
import { copyText } from './utils/clipboard';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

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
      if (!activeProject) {
        return;
      }
      const index = PROJECTS.findIndex((p) => p.id === activeProject.id);
      if (index === -1) {
        return;
      }
      const nextIndex = (index + delta + PROJECTS.length) % PROJECTS.length;
      setActiveProject(PROJECTS[nextIndex]);
    },
    [activeProject],
  );

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F5F8]">
      <Navbar copiedHandle={copiedHandle} onCopyHandle={handleCopyDiscord} />
      <main>
        <Hero copiedHandle={copiedHandle} onCopyHandle={handleCopyDiscord} />
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
      <VideoModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onPrev={() => stepModalProject(-1)}
        onNext={() => stepModalProject(1)}
      />
    </div>
  );
}

export default App;
