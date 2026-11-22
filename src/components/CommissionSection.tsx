import { ArrowUpRight, Check, Copy, FileText, Minus, X } from 'lucide-react';
import { COMMISSION_TERMS, PROFILE } from '../data/portfolio';
import { handleSpotlightLeave, handleSpotlightMove } from '../utils/pointer';
import { GitHubIcon } from './Icons';
import { Magnetic } from './Magnetic';
import { Reveal } from './Reveal';

interface CommissionSectionProps {
  copiedHandle: boolean;
  copiedTemplate: boolean;
  onCopyHandle: () => void;
  onCopyTemplate: () => void;
}

export function CommissionSection({
  copiedHandle,
  copiedTemplate,
  onCopyHandle,
  onCopyTemplate,
}: CommissionSectionProps) {
  return (
    <section id="commissions" className="relative scroll-mt-16">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="mb-8">
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#38BDF8] uppercase">
              04 / Availability &amp; Terms
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delayMs={40}>
            <div
              onPointerMove={handleSpotlightMove}
              onPointerLeave={handleSpotlightLeave}
              className="spotlight-card h-full rounded-xl border border-[#1D212B] bg-[#0D0F13]/85 p-6 backdrop-blur-md hover:border-[#2E3545]"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#F3F5F8]">
                Commissions &amp; scope
              </h2>
              <p className="mt-2 text-sm text-[#9CA3B2]">
                Available for standalone feature commissions, game systems, and UI scripting.
              </p>

              <div className="mt-6 space-y-5 text-sm">
                <div>
                  <h3 className="font-mono text-xs text-[#858FA3]">Payment terms</h3>
                  <ul className="mt-2 space-y-2 text-[#9CA3B2]">
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" aria-hidden="true" />
                      <span>
                        Accepted currencies:{' '}
                        <strong className="font-medium text-[#F3F5F8]">
                          {COMMISSION_TERMS.acceptedCurrencies.join(' / ')}
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 text-[#38BDF8]" aria-hidden="true" />
                      <span>{COMMISSION_TERMS.percentagePolicy}</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#1D212B] pt-5">
                  <h3 className="font-mono text-xs text-[#858FA3]">Out of scope</h3>
                  <ul className="mt-2 space-y-2 text-[#9CA3B2]">
                    {COMMISSION_TERMS.outOfScope.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-[#858FA3]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div
              onPointerMove={handleSpotlightMove}
              onPointerLeave={handleSpotlightLeave}
              className="spotlight-card flex h-full flex-col justify-between rounded-xl border border-[#1D212B] bg-[#0D0F13]/85 p-6 backdrop-blur-md hover:border-[#2E3545]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#F3F5F8]">
                    Start a commission
                  </h2>
                  <span className="rounded border border-[#1D212B] bg-[#07080A] px-2.5 py-1 font-mono text-xs text-[#38BDF8]">
                    {PROFILE.timezone}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#9CA3B2]">
                  Reach out directly on Discord with a concise brief:
                </p>

                <ul className="mt-4 space-y-2 text-sm text-[#9CA3B2]">
                  {COMMISSION_TERMS.briefChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#38BDF8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 rounded-md border border-[#1D212B] bg-[#07080A]/90 px-3.5 py-2.5 text-xs text-[#9CA3B2]">
                  {COMMISSION_TERMS.noBareGreetingsNote}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    onClick={onCopyHandle}
                    className="btn-sheen relative inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#F3F5F8] px-4 py-2.5 text-sm font-medium text-[#07080A] shadow-[0_0_24px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-[#38BDF8] hover:shadow-[0_0_24px_rgba(56,189,248,0.32)] active:scale-[0.97]"
                  >
                    {copiedHandle ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>Copied {PROFILE.discordHandle}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>Copy Discord ({PROFILE.discordHandle})</span>
                      </>
                    )}
                  </button>
                </Magnetic>

                <Magnetic strength={0.16}>
                  <button
                    type="button"
                    onClick={onCopyTemplate}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#2E3545] bg-[#13161D]/90 px-4 py-2.5 text-sm font-medium text-[#F3F5F8] transition-all duration-200 hover:border-[#38BDF8]/60 hover:bg-[#171C26] active:scale-[0.97]"
                  >
                    {copiedTemplate ? (
                      <>
                        <Check className="h-4 w-4 text-[#22C55E]" aria-hidden="true" />
                        <span>Brief template copied</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 text-[#9CA3B2]" aria-hidden="true" />
                        <span>Copy brief template</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="border-t border-[#1D212B]/80 bg-[#07080A]/65 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-[#858FA3] sm:flex-row sm:items-center sm:px-8">
          <span className="font-mono">
            {PROFILE.name} — {PROFILE.role}
          </span>
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#9CA3B2] transition-colors hover:text-[#38BDF8]"
            >
              <GitHubIcon className="h-3.5 w-3.5" />
              <span>github.com/{PROFILE.githubHandle}</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.boostyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#9CA3B2] transition-colors hover:text-[#38BDF8]"
            >
              <span>boosty.to/{PROFILE.boostyHandle}</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <span>
              Discord: {PROFILE.discordHandle} · {PROFILE.timezone}
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}
