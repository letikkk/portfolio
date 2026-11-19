import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { GitHubIcon } from './Icons';

interface NavbarProps {
  copiedHandle: boolean;
  onCopyHandle: () => void;
}

const NAV_LINKS = [
  { href: '#studios', id: 'studios', label: 'Studios' },
  { href: '#work', id: 'work', label: 'Work' },
  { href: '#stack', id: 'stack', label: 'Stack' },
  { href: '#commissions', id: 'commissions', label: 'Commissions' },
] as const;

export function Navbar({ copiedHandle, onCopyHandle }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
      setScrollProgress(progress);

      const viewportMid = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= viewportMid) {
          current = NAV_LINKS[i].id;
          break;
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-[#1D212B]/90 bg-[#07080A]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <a
          href="#top"
          className="group inline-flex min-h-[36px] items-center gap-2.5 text-[15px] font-semibold tracking-tight text-[#F3F5F8] transition-colors hover:text-[#38BDF8]"
        >
          <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
            <span className="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-60" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-[#38BDF8]" />
          </span>
          <span className="font-mono transition-transform duration-300 group-hover:translate-x-0.5">
            letik
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 text-sm text-[#9CA3B2] sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative rounded-md px-3 py-1.5 transition-colors duration-200 hover:text-[#F3F5F8] ${
                  isActive ? 'text-[#F3F5F8]' : 'text-[#9CA3B2]'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute right-3 bottom-0.5 left-3 h-[1.5px] rounded-full bg-[#38BDF8] transition-all duration-300 ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub profile (@${PROFILE.githubHandle})`}
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-[#2E3545] bg-[#0D0F13]/90 text-[#9CA3B2] transition-all duration-200 hover:border-[#38BDF8]/70 hover:bg-[#13161D] hover:text-[#F3F5F8] active:scale-[0.97] sm:inline-flex"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={onCopyHandle}
            aria-label={`Copy ${PROFILE.discordHandle}`}
            className="btn-sheen relative inline-flex min-h-[38px] items-center gap-2 rounded-md border border-[#2E3545] bg-[#0D0F13]/90 px-3 py-1.5 font-mono text-xs font-medium text-[#F3F5F8] transition-all duration-200 hover:border-[#38BDF8]/70 hover:bg-[#13161D] active:scale-[0.97]"
          >
            {copiedHandle ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#22C55E]" aria-hidden="true" />
                <span>Copied {PROFILE.discordHandle}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#9CA3B2]" aria-hidden="true" />
                <span>Copy {PROFILE.discordHandle}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#2E3545] bg-[#0D0F13]/90 text-[#F3F5F8] transition-colors hover:border-[#38BDF8]/70 sm:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-[#1D212B] bg-[#07080A]/95 px-5 py-3 backdrop-blur-xl sm:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex min-h-[44px] items-center justify-between rounded-md px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#38BDF8]/12 text-[#F3F5F8]'
                        : 'text-[#9CA3B2] hover:bg-[#0D0F13] hover:text-[#F3F5F8]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                    )}
                  </a>
                </li>
              );
            })}
            <li className="mt-1 border-t border-[#1D212B] pt-2">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center justify-between rounded-md px-3 font-mono text-xs text-[#9CA3B2] transition-colors hover:bg-[#0D0F13] hover:text-[#F3F5F8]"
              >
                <span className="inline-flex items-center gap-2">
                  <GitHubIcon className="h-4 w-4 text-[#F3F5F8]" />
                  <span>GitHub (@{PROFILE.githubHandle})</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}

      <div aria-hidden="true" className="pointer-events-none h-[1.5px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#38BDF8]/70 via-white/90 to-[#38BDF8] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress.toFixed(1)}%` }}
        />
      </div>
    </header>
  );
}
