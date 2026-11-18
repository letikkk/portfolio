import { Check, Copy } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface NavbarProps {
  copiedHandle: boolean;
  onCopyHandle: () => void;
}

export function Navbar({ copiedHandle, onCopyHandle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1D212B] bg-[#07080A]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-[#F3F5F8] transition-colors hover:text-[#38BDF8]"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#38BDF8]" aria-hidden="true" />
          <span className="font-mono">letik</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-[#9CA3B2] sm:flex">
          <a href="#work" className="transition-colors hover:text-[#F3F5F8]">
            Work
          </a>
          <a href="#stack" className="transition-colors hover:text-[#F3F5F8]">
            Stack
          </a>
          <a href="#commissions" className="transition-colors hover:text-[#F3F5F8]">
            Commissions
          </a>
        </nav>

        <button
          type="button"
          onClick={onCopyHandle}
          aria-label={`Copy ${PROFILE.discordHandle}`}
          className="inline-flex items-center gap-2 rounded-md border border-[#2E3545] bg-[#0D0F13] px-3 py-1.5 font-mono text-xs font-medium text-[#F3F5F8] transition-colors hover:border-[#38BDF8]/60 hover:bg-[#13161D]"
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
      </div>
    </header>
  );
}
