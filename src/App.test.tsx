import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('Letik Portfolio App', () => {
  it('renders hero metrics, commission status, and all 5 projects initially', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /letik/i })).toBeInTheDocument();
    expect(screen.getAllByText(/full-stack roblox scripter/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('4 Years')).toBeInTheDocument();
    expect(screen.getByText('25M+')).toBeInTheDocument();
    expect(screen.getByText(/commissions open/i)).toBeInTheDocument();
    expect(screen.getByText(/tycoon progression engine/i)).toBeInTheDocument();
    expect(screen.getByText(/melee combat & aoe vfx/i)).toBeInTheDocument();
    expect(screen.getByText(/simulator economy & shop ui/i)).toBeInTheDocument();
    expect(screen.getByText(/real-time raycast pixel renderer/i)).toBeInTheDocument();
    expect(screen.getByText(/2d freehand drawing canvas/i)).toBeInTheDocument();
  });

  it('filters visible work cards by category', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Tech Demos' }));
    expect(screen.getByText(/real-time raycast pixel renderer/i)).toBeInTheDocument();
    expect(screen.getByText(/2d freehand drawing canvas/i)).toBeInTheDocument();
    expect(screen.queryByText(/melee combat & aoe vfx/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText(/melee combat & aoe vfx/i)).toBeInTheDocument();
  });

  it('opens the Theater Modal on project selection, navigates next, and closes on Escape', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /inspect tycoon progression engine/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/dynamic cash\/sec multiplier scaling/i);

    fireEvent.click(screen.getByRole('button', { name: /next project/i }));
    expect(dialog).toHaveTextContent(/melee combat & aoe vfx/i);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('copies Discord handle and updates button feedback', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<App />);
    const copyBtn = screen.getAllByRole('button', { name: /copy @letikgg/i })[0];
    fireEvent.click(copyBtn);

    expect(writeText).toHaveBeenCalledWith('@letikgg');
    const copiedBadges = await screen.findAllByText(/copied @letikgg/i);
    expect(copiedBadges.length).toBeGreaterThanOrEqual(1);

    fireEvent.click(screen.getByRole('button', { name: /copy brief template/i }));
    expect(await screen.findByText(/brief template copied/i)).toBeInTheDocument();
  });
});
