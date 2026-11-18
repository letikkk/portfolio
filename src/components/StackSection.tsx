import { STACK_GROUPS } from '../data/portfolio';
import { handleSpotlightLeave, handleSpotlightMove } from '../utils/pointer';
import { Reveal } from './Reveal';

export function StackSection() {
  return (
    <section id="stack" className="relative border-b border-[#1D212B]/80">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#38BDF8] uppercase">
            02 / Architecture & Tooling
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
                  <span className="font-mono text-xs text-[#636B7D]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#636B7D]">{group.subtitle}</p>
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
      </div>
    </section>
  );
}
