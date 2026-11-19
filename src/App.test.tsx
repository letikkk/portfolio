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

    fireEvent.click(screen.getByRole('button', { name: /inspect melee combat & aoe vfx/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/custom weapon state machine/i);

    fireEvent.click(screen.getByRole('button', { name: /next project/i }));
    expect(dialog).toHaveTextContent(/tycoon progression engine/i);

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

  it('switches interactive canvas background modes', () => {
    render(<App />);

    const swarmBtn = screen.getByRole('button', { name: 'Swarm' });
    const vectorsBtn = screen.getByRole('button', { name: 'Vectors' });
    const orbitsBtn = screen.getByRole('button', { name: 'Orbits' });

    expect(swarmBtn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(vectorsBtn);
    expect(vectorsBtn).toHaveAttribute('aria-pressed', 'true');
    expect(swarmBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(orbitsBtn);
    expect(orbitsBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders verified Roblox studio groups and GitHub open-source links', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /tempest realm/i })).toHaveAttribute(
      'href',
      'https://www.roblox.com/communities/35291438/Tempest-Realm#!/about',
    );
    expect(screen.getByRole('link', { name: /ninty studios/i })).toHaveAttribute(
      'href',
      'https://www.roblox.com/communities/2703315/Ninty-Studios#!/about',
    );
    expect(screen.getByRole('link', { name: /soy games!/i })).toHaveAttribute(
      'href',
      'https://www.roblox.com/communities/452639438/Soy-Games#!/about',
    );
    const githubLinks = screen.getAllByRole('link', { name: /github\.com\/letikkk/i });
    expect(githubLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of githubLinks) {
      expect(link).toHaveAttribute('href', 'https://github.com/letikkk');
    }
  });

  it('scopes modal next/prev navigation to the active category filter', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Tech Demos' }));
    fireEvent.click(
      screen.getByRole('button', { name: /inspect real-time raycast pixel renderer/i }),
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent(/real-time raycast pixel renderer/i);

    fireEvent.click(screen.getByRole('button', { name: /next project/i }));
    expect(dialog).toHaveTextContent(/2d freehand drawing canvas/i);

    // Wraps back to Raycast instead of jumping outside Tech Demos
    fireEvent.click(screen.getByRole('button', { name: /next project/i }));
    expect(dialog).toHaveTextContent(/real-time raycast pixel renderer/i);
  });

  it('toggles mobile navigation menu and closes on Escape', () => {
    render(<App />);

    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);

    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument();
  });
});
