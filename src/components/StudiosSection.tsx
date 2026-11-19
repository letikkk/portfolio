import { ArrowUpRight, Users } from 'lucide-react';
import { PROFILE, ROBLOX_GROUPS, STUDIO_ARCHIVE_NOTE } from '../data/portfolio';
import { handleSpotlightLeave, handleSpotlightMove } from '../utils/pointer';
import { Reveal } from './Reveal';

/** Displays verified Roblox studios, team roles, and combined community reach. */
export function StudiosSection() {
  return (
    <section id="studios" className="relative scroll-mt-16 border-b border-[#1D212B]/80">
      <div className="mx-auto max-w-[1120px] px-5 py-14 sm:px-8 sm:py-16">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-[11px] tracking-[0.14em] text-[#38BDF8] uppercase">
                01 / Verified Studios
              </span>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-[#F3F5F8] sm:text-3xl">
                Roblox teams &amp; roles
              </h2>
              <p className="mt-2 max-w-[64ch] text-sm text-[#9CA3B2]">
                Verified Contributor, Developer, and Lead Dev roles across Roblox studio
                communities totaling{' '}
                <span className="font-mono text-[#F3F5F8]">{PROFILE.studioMembersLabel}</span>{' '}
                members.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1D212B] bg-[#0D0F13]/85 px-3 py-1 font-mono text-xs text-[#9CA3B2] backdrop-blur-md">
              <Users className="h-3.5 w-3.5 text-[#38BDF8]" aria-hidden="true" />
              <span>{PROFILE.studioMembersLabel} combined members</span>
            </span>
          </div>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ROBLOX_GROUPS.map((group, idx) => (
            <Reveal key={group.id} delayMs={idx * 80} className="h-full">
              <a
                href={group.url}
                target="_blank"
                rel="noopener noreferrer"
                onPointerMove={handleSpotlightMove}
                onPointerLeave={handleSpotlightLeave}
                className="spotlight-card group flex h-full flex-col justify-between rounded-xl border border-[#1D212B] bg-[#0D0F13]/85 p-5 backdrop-blur-md hover:-translate-y-0.5 hover:border-[#38BDF8]/50 hover:shadow-[0_18px_45px_-20px_rgba(0,0,0,0.85),0_0_24px_-10px_rgba(56,189,248,0.18)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#2E3545] bg-[#07080A] font-mono text-xs font-semibold tracking-wider text-[#38BDF8] transition-colors duration-200 group-hover:border-[#38BDF8]/60 group-hover:bg-[#0D141F]"
                    >
                      {group.initials}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-[#F3F5F8] transition-colors duration-200 group-hover:text-white">
                        {group.name}
                      </h3>
                      <span className="mt-0.5 inline-flex items-center rounded border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-2 py-0.5 font-mono text-[11px] text-[#38BDF8]">
                        {group.role}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[#858FA3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between border-t border-[#1D212B] pt-3.5">
                  <div>
                    <div className="font-mono text-lg font-medium text-[#F3F5F8]">
                      {group.membersLabel}
                    </div>
                    <div className="text-xs text-[#858FA3]">Community members</div>
                  </div>
                  <span className="font-mono text-[11px] text-[#858FA3] transition-colors duration-200 group-hover:text-[#F3F5F8]">
                    View group
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={220}>
          <p className="mt-4 font-mono text-xs text-[#858FA3]">{STUDIO_ARCHIVE_NOTE}</p>
        </Reveal>
      </div>
    </section>
  );
}
