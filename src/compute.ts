import { GRADE_POINTS, type GradeMap, pointsFor } from "./data/subjects";
import type { Programme, SubjectAlt } from "./data/programmes";

// KUCCPS weighted cluster point formula (commonly-circulated approximation).
// IMPORTANT: KUCCPS itself warns that self-calculated WCP will differ from the
// official value because KUCCPS uses a confidential Performance Index per
// KNEC, not the raw grade points. Always label the output ESTIMATE.
// Formula: C = sqrt((r/R) * (t/T)) * 48
// where r = sum of cluster-subject raw points (max 48 = 12 * 4),
//       t = aggregate of best 7 raw points (max 84 = 12 * 7),
//       R = 48, T = 84, output is scaled out of 48.

export interface ProgrammeScore {
  programme: Programme;
  clusterPoints: number;       // out of 48
  raw: number;                 // r
  aggregate: number;           // t
  usedSubjects: { id: string; grade: string; points: number }[];
  complete: boolean;           // whether all 4 cluster subjects are present
  competitiveness: "competitive" | "close" | "below" | "n/a";
}

export function bestGradeForAlt(alt: SubjectAlt, grades: GradeMap): { id: string | null; points: number } {
  if (typeof alt === "string") {
    const g = grades[alt] ?? "";
    return { id: g ? alt : null, points: pointsFor(g) };
  }
  let best: { id: string | null; points: number } = { id: null, points: 0 };
  for (const id of alt) {
    const g = grades[id] ?? "";
    const p = pointsFor(g);
    if (g && p > best.points) best = { id, points: p };
  }
  return best;
}

export function scoreProgramme(programme: Programme, grades: GradeMap): ProgrammeScore {
  const usedSubjects: { id: string; grade: string; points: number }[] = [];
  let complete = true;
  const usedIds = new Set<string>();

  for (const slot of programme.subjects) {
    const best = bestGradeForAlt(slot, grades);
    // Avoid double-using the same subject across two cluster slots:
    if (best.id && !usedIds.has(best.id)) {
      usedIds.add(best.id);
      usedSubjects.push({ id: best.id, grade: grades[best.id], points: best.points });
    } else if (Array.isArray(slot)) {
      // Try to pick an unused alternative
      let chosen: { id: string | null; points: number } = { id: null, points: 0 };
      for (const id of slot) {
        if (usedIds.has(id)) continue;
        const g = grades[id] ?? "";
        if (!g) continue;
        const p = pointsFor(g);
        if (p > chosen.points) chosen = { id, points: p };
      }
      if (chosen.id) {
        usedIds.add(chosen.id);
        usedSubjects.push({ id: chosen.id, grade: grades[chosen.id], points: chosen.points });
      } else {
        complete = false;
      }
    } else {
      complete = false;
    }
  }

  const raw = usedSubjects.reduce((s, x) => s + x.points, 0);
  const aggregate = best7Aggregate(grades);
  const hasSeven = gradedSubjectCount(grades) >= 7;
  const clusterPoints = complete && hasSeven
    ? Math.sqrt((raw / 48) * (aggregate / 84)) * 48
    : 0;

  let competitiveness: ProgrammeScore["competitiveness"];
  if (!complete || !hasSeven) {
    competitiveness = "n/a";
  } else if (clusterPoints >= programme.cutoff2023) {
    competitiveness = "competitive";
  } else if (clusterPoints >= programme.cutoff2023 - 2.5) {
    competitiveness = "close";
  } else {
    competitiveness = "below";
  }

  return { programme, clusterPoints, raw, aggregate, usedSubjects, complete, competitiveness };
}

export function best7Aggregate(grades: GradeMap): number {
  const points = Object.values(grades)
    .map((g) => pointsFor(g))
    .filter((p) => p > 0)
    .sort((a, b) => b - a);
  return points.slice(0, 7).reduce((s, v) => s + v, 0);
}

export function meanGrade(aggregate: number): { letter: string; points: number } {
  // Map aggregate (1-84) back to a letter grade, using standard KNEC bands.
  if (aggregate >= 78) return { letter: "A", points: 12 };
  if (aggregate >= 71) return { letter: "A-", points: 11 };
  if (aggregate >= 64) return { letter: "B+", points: 10 };
  if (aggregate >= 57) return { letter: "B", points: 9 };
  if (aggregate >= 50) return { letter: "B-", points: 8 };
  if (aggregate >= 43) return { letter: "C+", points: 7 };
  if (aggregate >= 36) return { letter: "C", points: 6 };
  if (aggregate >= 29) return { letter: "C-", points: 5 };
  if (aggregate >= 22) return { letter: "D+", points: 4 };
  if (aggregate >= 15) return { letter: "D", points: 3 };
  if (aggregate >= 8) return { letter: "D-", points: 2 };
  if (aggregate >= 1) return { letter: "E", points: 1 };
  return { letter: "-", points: 0 };
}

export function gradeCount(grades: GradeMap): number {
  return Object.values(grades).filter((g) => g && GRADE_POINTS[g] > 0).length;
}

function gradedSubjectCount(grades: GradeMap): number {
  return Object.values(grades).filter((g) => g && GRADE_POINTS[g] > 0).length;
}
