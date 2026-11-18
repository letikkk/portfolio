import { STACK_GROUPS } from '../data/portfolio';

export function StackSection() {
  return (
    <section id="stack" className="border-b border-[#1D212B]">
      <div className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#F3F5F8] sm:text-3xl">
          Technical stack
        </h2>
        <p className="mt-2 max-w-[60ch] text-sm text-[#9CA3B2]">
          Production tooling, state libraries, and external-editor workflow used across client
          commissions.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STACK_GROUPS.map((group) => (
            <div
              key={group.title}
              className="rounded-lg border border-[#1D212B] bg-[#0D0F13] p-5"
            >
              <h3 className="text-base font-semibold text-[#F3F5F8]">{group.title}</h3>
              <p className="mt-1 text-xs text-[#636B7D]">{group.subtitle}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-[#1D212B] bg-[#07080A] px-2.5 py-1 font-mono text-xs text-[#F3F5F8]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
