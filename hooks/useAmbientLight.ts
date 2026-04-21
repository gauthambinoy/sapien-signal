"use client";

import { useEffect, useState, useCallback } from "react";

export type TimePhase = "dawn" | "morning" | "afternoon" | "sunset" | "evening" | "night";

interface AmbientColors {
  accent: string;
  accentGlow: string;
  auroraFrom: string;
  auroraTo: string;
  ambientOverlay: string;
  phase: TimePhase;
}

const PHASES: Record<TimePhase, AmbientColors> = {
  dawn: {
    accent: "#F59E0B",
    accentGlow: "rgba(245, 158, 11, 0.15)",
    auroraFrom: "#FDE68A",
    auroraTo: "#F59E0B",
    ambientOverlay: "rgba(245, 158, 11, 0.03)",
    phase: "dawn",
  },
  morning: {
    accent: "#C96442",
    accentGlow: "rgba(201, 100, 66, 0.15)",
    auroraFrom: "#C96442",
    auroraTo: "#D9A574",
    ambientOverlay: "rgba(201, 100, 66, 0.02)",
    phase: "morning",
  },
  afternoon: {
    accent: "#B8A88A",
    accentGlow: "rgba(184, 168, 138, 0.15)",
    auroraFrom: "#B8A88A",
    auroraTo: "#818CF8",
    ambientOverlay: "rgba(184, 168, 138, 0.02)",
    phase: "afternoon",
  },
  sunset: {
    accent: "#FB923C",
    accentGlow: "rgba(251, 146, 60, 0.15)",
    auroraFrom: "#FB923C",
    auroraTo: "#B87B6A",
    ambientOverlay: "rgba(251, 146, 60, 0.03)",
    phase: "sunset",
  },
  evening: {
    accent: "#C49C8A",
    accentGlow: "rgba(196, 156, 138, 0.15)",
    auroraFrom: "#C49C8A",
    auroraTo: "#818CF8",
    ambientOverlay: "rgba(196, 156, 138, 0.03)",
    phase: "evening",
  },
  night: {
    accent: "#D9A574",
    accentGlow: "rgba(217, 165, 116, 0.15)",
    auroraFrom: "#D9A574",
    auroraTo: "#6366F1",
    ambientOverlay: "rgba(217, 165, 116, 0.02)",
    phase: "night",
  },
};

function getPhase(hour: number): TimePhase {
  if (hour >= 5 && hour < 7) return "dawn";
  if (hour >= 7 && hour < 12) return "morning";
  if (hour >= 12 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 19) return "sunset";
  if (hour >= 19 && hour < 22) return "evening";
  return "night";
}

export function useAmbientLight() {
  const [colors, setColors] = useState<AmbientColors>(PHASES.night);

  const update = useCallback(() => {
    const hour = new Date().getHours();
    setColors(PHASES[getPhase(hour)]);
  }, []);

  useEffect(() => {
    update();
    const interval = setInterval(update, 60_000); // check every minute
    return () => clearInterval(interval);
  }, [update]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--ambient-accent", colors.accent);
    root.style.setProperty("--ambient-glow", colors.accentGlow);
    root.style.setProperty("--ambient-from", colors.auroraFrom);
    root.style.setProperty("--ambient-to", colors.auroraTo);
    root.style.setProperty("--ambient-overlay", colors.ambientOverlay);
  }, [colors]);

  return colors;
}
