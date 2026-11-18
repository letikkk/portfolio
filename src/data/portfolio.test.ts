import { describe, expect, it, vi } from 'vitest';
import {
  COMMISSION_TERMS,
  DISCORD_BRIEF_TEMPLATE,
  PROFILE,
  PROJECTS,
  STACK_GROUPS,
  filterProjects,
} from './portfolio';
import { copyText } from '../utils/clipboard';

describe('portfolio data contract', () => {
  it('exposes exact verified profile metrics and contact details', () => {
    expect(PROFILE.name).toBe('Letik');
    expect(PROFILE.role).toBe('Full-Stack Roblox Scripter');
    expect(PROFILE.experienceYears).toBe(4);
    expect(PROFILE.visitsLabel).toBe('25M+');
    expect(PROFILE.timezone).toBe('GMT+3');
    expect(PROFILE.discordHandle).toBe('@letikgg');
    expect(PROFILE.commissionsOpen).toBe(true);
  });

  it('includes all five cropped local mp4 project showcases with relative paths', () => {
    expect(PROJECTS).toHaveLength(5);
    for (const project of PROJECTS) {
      expect(project.videoSrc).toMatch(/^\.\/videos\/[a-z0-9-]+\.mp4$/);
      expect(project.aspectRatio).toBeGreaterThan(1);
      expect(project.systems.length).toBeGreaterThanOrEqual(2);
      expect(project.tags.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('filters projects accurately by category and handles All', () => {
    expect(filterProjects(PROJECTS, 'All')).toHaveLength(5);
    const combat = filterProjects(PROJECTS, 'Gameplay & Combat');
    expect(combat.length).toBeGreaterThan(0);
    expect(combat.every((p) => p.category === 'Gameplay & Combat')).toBe(true);

    const ui = filterProjects(PROJECTS, 'Systems & UI');
    expect(ui.length).toBeGreaterThan(0);
    expect(ui.every((p) => p.category === 'Systems & UI')).toBe(true);

    const tech = filterProjects(PROJECTS, 'Tech Demos');
    expect(tech.length).toBeGreaterThan(0);
    expect(tech.every((p) => p.category === 'Tech Demos')).toBe(true);
  });

  it('contains curated technical stack and clear commission scope boundaries', () => {
    const allItems = STACK_GROUPS.flatMap((g) => g.items);
    expect(allItems).toContain('Luau');
    expect(allItems).toContain('Roblox-TS');
    expect(allItems).toContain('ProfileStore');
    expect(allItems).toContain('Rojo');
    expect(allItems).toContain('ECS');

    expect(COMMISSION_TERMS.acceptedCurrencies).toEqual(['USD', 'Robux']);
    expect(COMMISSION_TERMS.outOfScope).toContain('Vehicles');
    expect(COMMISSION_TERMS.outOfScope.some((item) => /gun/i.test(item))).toBe(true);
    expect(DISCORD_BRIEF_TEMPLATE).toContain('Scope:');
  });
});

describe('copyText helper', () => {
  it('uses navigator.clipboard when available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const ok = await copyText('@letikgg');
    expect(ok).toBe(true);
    expect(writeText).toHaveBeenCalledWith('@letikgg');
  });

  it('returns false gracefully when clipboard API fails', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const ok = await copyText('@letikgg');
    expect(ok).toBe(false);
  });
});
