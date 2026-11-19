import { ArrowUpRight } from 'lucide-react';
import { OPEN_SOURCE_REPOS, PROFILE, STACK_GROUPS } from '../data/portfolio';
import { handleSpotlightLeave, handleSpotlightMove } from '../utils/pointer';
import { GitHubIcon } from './Icons';
import { Reveal } from './Reveal';

export function StackSection() {
  return (
    <section id="stack" className="relative scroll-mt-16 border-b border-[#1D212B]/80">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#38BDF8] uppercase">
            03 / Architecture &amp; Tooling
          </span>
          <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-[#F3F5F8] sm:text-3xl">
            Technical stack
          </h2>
          <p className="mt-2 max-w-[60ch] text-sm text-[#9CA3B2]">
            Production tooling, state libraries, and external-editor workflow used across client
            commissions.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STACK_GROUPS.map((group, idx) => (
            <Reveal key={group.title} delayMs={idx * 90} className="h-full">
              <div
                onPointerMove={handleSpotlightMove}
                onPointerLeave={handleSpotlightLeave}
                className="spotlight-card h-full rounded-xl border border-[#1D212B] bg-[#0D0F13]/85 p-5 backdrop-blur-md hover:-translate-y-0.5 hover:border-[#2E3545]"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-[#F3F5F8]">{group.title}</h3>
                  <span className="font-mono text-xs text-[#858FA3]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#858FA3]">{group.subtitle}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-[#1D212B] bg-[#07080A]/90 px-2.5 py-1 font-mono text-xs text-[#F3F5F8] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#38BDF8]/60 hover:bg-[#0D141F] hover:text-white hover:shadow-[0_6px_18px_-6px_rgba(56,189,248,0.4)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={260}>
          <div
            onPointerMove={handleSpotlightMove}
            onPointerLeave={handleSpotlightLeave}
            className="spotlight-card mt-5 rounded-xl border border-[#1D212B] bg-[#0D0F13]/85 p-5 backdrop-blur-md hover:border-[#2E3545]"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2E3545] bg-[#07080A] text-[#F3F5F8]">
                  <GitHubIcon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#F3F5F8]">
                    Open-source Luau modules
                  </h3>
                  <p className="mt-0.5 text-xs text-[#9CA3B2]">
                    Public Roblox utilities and code samples available to inspect on GitHub.
                  </p>
                </div>
              </div>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[40px] w-fit items-center gap-1.5 rounded-md border border-[#2E3545] bg-[#07080A]/90 px-3.5 py-2 font-mono text-xs font-medium text-[#F3F5F8] transition-all duration-200 hover:border-[#38BDF8]/70 hover:bg-[#13161D] hover:text-[#38BDF8]"
              >
                <span>github.com/{PROFILE.githubHandle}</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-[#858FA3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-[#1D212B] pt-4 sm:grid-cols-3">
              {OPEN_SOURCE_REPOS.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-lg border border-[#1D212B] bg-[#07080A]/80 px-3.5 py-3 transition-all duration-200 hover:border-[#38BDF8]/50 hover:bg-[#0D141F]/60"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-[#F3F5F8] group-hover:text-[#38BDF8]">
                      {repo.label}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 text-[#858FA3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#858FA3]">{repo.description}</p>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
