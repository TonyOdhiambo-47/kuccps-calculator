// KCSE grade -> raw points mapping.
// Source: KNEC KCSE grading scale 2024, verified against KUCCPS 2024/2025
// Students Application Guide portal screenshots (ADP ceiling = 84 = 12 x 7).
export const GRADE_POINTS: Record<string, number> = {
  A: 12,
  "A-": 11,
  "B+": 10,
  B: 9,
  "B-": 8,
  "C+": 7,
  C: 6,
  "C-": 5,
  "D+": 4,
  D: 3,
  "D-": 2,
  E: 1,
  "": 0, // "not taken" or empty
};

export const GRADE_ORDER = [
  "",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "E",
] as const;

export interface SubjectDef {
  id: string;
  name: string;
  group: "core" | "sciences" | "humanities" | "applied" | "languages" | "creative";
}

// Standard KCSE subject list.
export const SUBJECTS: SubjectDef[] = [
  { id: "ENG", name: "English", group: "core" },
  { id: "KIS", name: "Kiswahili", group: "core" },
  { id: "MAT", name: "Mathematics (Alt. A)", group: "core" },
  { id: "MATB", name: "Mathematics (Alt. B)", group: "core" },

  { id: "BIO", name: "Biology", group: "sciences" },
  { id: "PHY", name: "Physics", group: "sciences" },
  { id: "CHE", name: "Chemistry", group: "sciences" },
  { id: "GSC", name: "General Science", group: "sciences" },

  { id: "HAG", name: "History and Government", group: "humanities" },
  { id: "GEO", name: "Geography", group: "humanities" },
  { id: "CRE", name: "Christian Religious Education", group: "humanities" },
  { id: "IRE", name: "Islamic Religious Education", group: "humanities" },
  { id: "HRE", name: "Hindu Religious Education", group: "humanities" },

  { id: "AGR", name: "Agriculture", group: "applied" },
  { id: "BST", name: "Business Studies", group: "applied" },
  { id: "CST", name: "Computer Studies", group: "applied" },
  { id: "HSC", name: "Home Science", group: "applied" },

  { id: "FRE", name: "French", group: "languages" },
  { id: "GER", name: "German", group: "languages" },
  { id: "ARB", name: "Arabic", group: "languages" },
  { id: "MAN", name: "Mandarin", group: "languages" },

  { id: "MUS", name: "Music", group: "creative" },
  { id: "ARD", name: "Art and Design", group: "creative" },

  { id: "AVI", name: "Aviation Technology", group: "applied" },
  { id: "BLD", name: "Building Construction", group: "applied" },
  { id: "ELT", name: "Electricity", group: "applied" },
  { id: "PMT", name: "Power Mechanics", group: "applied" },
  { id: "WWD", name: "Woodwork", group: "applied" },
  { id: "MET", name: "Metalwork", group: "applied" },
  { id: "DWD", name: "Drawing and Design", group: "applied" },
];

export type GradeMap = Record<string, string>;

export function pointsFor(grade: string): number {
  return GRADE_POINTS[grade] ?? 0;
}
