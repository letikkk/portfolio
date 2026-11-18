import { Check, Copy, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface HeroProps {
  copiedHandle: boolean;
  onCopyHandle: () => void;
}

export function Hero({ copiedHandle, onCopyHandle }: HeroProps) {
  return (
    <section id="top" className="border-b border-[#1D212B]">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1D212B] bg-[#0D0F13] px-3 py-1 text-xs text-[#9CA3B2]">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" aria-hidden="true" />
          <span>Commissions Open</span>
          <span className="text-[#2E3545]" aria-hidden="true">
            /
          </span>
          <span className="font-mono text-[#F3F5F8]">{PROFILE.timezone}</span>
        </div>

        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#F3F5F8] sm:text-5xl">
            {PROFILE.name}
            <span className="block text-[#9CA3B2]">{PROFILE.role}</span>
          </h1>
          <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-[#9CA3B2] sm:text-[17px]">
            {PROFILE.bio}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCopyHandle}
            className="inline-flex items-center gap-2 rounded-md bg-[#F3F5F8] px-4 py-2.5 text-sm font-medium text-[#07080A] transition-colors hover:bg-[#38BDF8]"
          >
            {copiedHandle ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Discord {PROFILE.discordHandle} copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Message on Discord ({PROFILE.discordHandle})</span>
              </>
            )}
          </button>

          <a
            href="#work"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#1D212B] bg-[#0D0F13] px-4 py-2.5 text-sm font-medium text-[#F3F5F8] transition-colors hover:border-[#2E3545] hover:bg-[#13161D]"
          >
            <span>Browse showcase</span>
            <ArrowUpRight className="h-4 w-4 text-[#9CA3B2]" aria-hidden="true" />
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#1D212B] bg-[#1D212B] sm:grid-cols-4">
          <div className="bg-[#0D0F13] px-5 py-4">
            <dt className="text-xs text-[#636B7D]">Experience</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#F3F5F8]">
              {PROFILE.experienceYears} Years
            </dd>
          </div>
          <div className="bg-[#0D0F13] px-5 py-4">
            <dt className="text-xs text-[#636B7D]">Contributed places</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#38BDF8]">
              {PROFILE.visitsLabel}
            </dd>
          </div>
          <div className="bg-[#0D0F13] px-5 py-4">
            <dt className="text-xs text-[#636B7D]">Rates accepted</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#F3F5F8]">USD / Robux</dd>
          </div>
          <div className="bg-[#0D0F13] px-5 py-4">
            <dt className="text-xs text-[#636B7D]">Code workflow</dt>
            <dd className="mt-1 font-mono text-xl font-medium text-[#F3F5F8]">Rojo + Wally</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
