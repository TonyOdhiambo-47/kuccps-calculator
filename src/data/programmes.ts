// Programmes with their official cluster and the specific subjects they need.
// Cutoff values come from the official KUCCPS "2024/2025 Degree Programme Cutoffs"
// document (150 pages, dated June 2024), column labelled 2023 which is the most
// recent placement cycle KUCCPS has published at the time of this build.
// PDF source: https://statics.kuccps.net/uploads/globalFiles/DEGREE_CUTOFFS_04-06-2024.pdf
// Cluster subject mapping follows the KUCCPS 2024 Degree Cluster Document:
// https://statics.kuccps.net/uploads/globalFiles/DEGREE_CLUSTER_DOCUMENT_11_2_2024.pdf

export type SubjectAlt = string | string[]; // "MAT" or alternatives ["BIO","GEO"]

export interface Programme {
  code: string;              // canonical code used by KUCCPS
  name: string;
  university: string;
  cluster: string;           // e.g. "13A", "5A"
  subjects: SubjectAlt[];    // length 4 - each slot is a subject id or a list of alternatives
  cutoff2023: number;        // weighted cluster point out of 48
  minMeanGrade?: string;     // typical mean grade floor (informational)
}

export const PROGRAMMES: Programme[] = [
  // Medicine, Pharmacy, Dentistry - Cluster 13
  { code: "1263131", name: "Medicine and Surgery", university: "University of Nairobi",  cluster: "13A", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 45.584, minMeanGrade: "B+" },
  { code: "1253131", name: "Medicine and Surgery", university: "Moi University",          cluster: "13A", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 45.087, minMeanGrade: "B+" },
  { code: "1111131", name: "Medicine and Surgery", university: "Kenyatta University",     cluster: "13A", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 45.433, minMeanGrade: "B+" },
  { code: "1057131", name: "Medicine and Surgery", university: "Egerton University",      cluster: "13A", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 44.563, minMeanGrade: "B+" },
  { code: "1249131", name: "Medicine and Surgery", university: "JKUAT",                    cluster: "13A", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 45.048, minMeanGrade: "B+" },
  { code: "1263129", name: "Pharmacy",             university: "University of Nairobi",  cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 44.452, minMeanGrade: "B+" },
  { code: "1111129", name: "Pharmacy",             university: "Kenyatta University",     cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 44.010, minMeanGrade: "B+" },
  { code: "1249129", name: "Pharmacy",             university: "JKUAT",                    cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 43.872, minMeanGrade: "B+" },
  { code: "1263128", name: "Dental Surgery",       university: "University of Nairobi",  cluster: "13A", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 44.750, minMeanGrade: "B+" },
  { code: "1253128", name: "Dental Surgery",       university: "Moi University",          cluster: "13A", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 44.502, minMeanGrade: "B+" },
  { code: "1263132", name: "Nursing",              university: "University of Nairobi",  cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 43.676, minMeanGrade: "C+" },
  { code: "1111132", name: "Nursing and Public Health", university: "Kenyatta University", cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 43.051, minMeanGrade: "C+" },
  { code: "1249132", name: "Nursing",              university: "JKUAT",                    cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 42.950, minMeanGrade: "C+" },
  { code: "1249560", name: "Clinical Medicine",    university: "JKUAT",                    cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 42.847, minMeanGrade: "C+" },
  { code: "1057560", name: "Clinical Medicine",    university: "Egerton University",      cluster: "13B", subjects: ["BIO", "CHE", ["MAT", "PHY"], ["ENG", "KIS"]], cutoff2023: 42.215, minMeanGrade: "C+" },
  { code: "1263130", name: "Veterinary Medicine",  university: "University of Nairobi",  cluster: "13D", subjects: ["BIO", "CHE", ["MAT", "PHY", "AGR"], ["ENG", "KIS"]], cutoff2023: 37.747, minMeanGrade: "C+" },
  { code: "1057130", name: "Veterinary Medicine",  university: "Egerton University",      cluster: "13D", subjects: ["BIO", "CHE", ["MAT", "PHY", "AGR"], ["ENG", "KIS"]], cutoff2023: 38.317, minMeanGrade: "C+" },

  // Engineering - Cluster 5A
  { code: "1263117", name: "Electrical and Electronic Engineering", university: "University of Nairobi", cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 43.003, minMeanGrade: "C+" },
  { code: "1249117", name: "Electrical and Electronic Engineering", university: "JKUAT",                  cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 42.434, minMeanGrade: "C+" },
  { code: "1263116", name: "Civil Engineering",                    university: "University of Nairobi", cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 43.463, minMeanGrade: "C+" },
  { code: "1249116", name: "Civil Engineering",                    university: "JKUAT",                  cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 42.618, minMeanGrade: "C+" },
  { code: "1111116", name: "Civil Engineering",                    university: "Kenyatta University",   cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 42.574, minMeanGrade: "C+" },
  { code: "1263118", name: "Mechanical Engineering",                university: "University of Nairobi", cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 41.835, minMeanGrade: "C+" },
  { code: "1249118", name: "Mechanical Engineering",                university: "JKUAT",                  cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 41.450, minMeanGrade: "C+" },
  { code: "1249240", name: "Mechatronic Engineering",               university: "JKUAT",                  cluster: "5A", subjects: ["MAT", "PHY", "CHE", ["ENG", "KIS"]], cutoff2023: 43.232, minMeanGrade: "C+" },

  // Architecture, Quantity Surveying - Cluster 6A
  { code: "1263102", name: "Architecture",                          university: "University of Nairobi", cluster: "6A", subjects: ["MAT", "PHY", ["GEO", "HAG", "CRE", "IRE", "BST", "AGR"], ["ENG", "KIS"]], cutoff2023: 42.990, minMeanGrade: "C+" },
  { code: "1249564", name: "Architecture",                          university: "JKUAT",                  cluster: "6A", subjects: ["MAT", "PHY", ["GEO", "HAG", "CRE", "IRE", "BST", "AGR"], ["ENG", "KIS"]], cutoff2023: 41.803, minMeanGrade: "C+" },

  // Computing & IT - Cluster 7
  { code: "1263115", name: "Computer Science",                      university: "University of Nairobi", cluster: "7A", subjects: ["MAT", "PHY", ["CHE", "BIO", "GEO", "BST", "AGR", "CST"], ["ENG", "KIS"]], cutoff2023: 44.825, minMeanGrade: "C+" },
  { code: "1249115", name: "Computer Science",                      university: "JKUAT",                  cluster: "7A", subjects: ["MAT", "PHY", ["CHE", "BIO", "GEO", "BST", "AGR", "CST"], ["ENG", "KIS"]], cutoff2023: 44.101, minMeanGrade: "C+" },
  { code: "1111115", name: "Computer Science",                      university: "Kenyatta University",   cluster: "7A", subjects: ["MAT", "PHY", ["CHE", "BIO", "GEO", "BST", "AGR", "CST"], ["ENG", "KIS"]], cutoff2023: 43.497, minMeanGrade: "C+" },
  { code: "1164542", name: "Software Engineering",                  university: "Multimedia University", cluster: "7A", subjects: ["MAT", "PHY", ["CHE", "BIO", "GEO", "BST", "AGR", "CST"], ["ENG", "KIS"]], cutoff2023: 41.368, minMeanGrade: "C+" },
  { code: "1112232", name: "Information Technology",                university: "Technical University of Kenya", cluster: "7C", subjects: ["MAT", "PHY", ["CHE", "BIO", "GEO", "BST", "AGR", "CST"], ["ENG", "KIS"]], cutoff2023: 36.399, minMeanGrade: "C" },

  // Actuarial Science & Mathematics - Cluster 10
  { code: "1263107", name: "Actuarial Science",                     university: "University of Nairobi", cluster: "10C", subjects: ["MAT", ["PHY", "CHE", "BIO"], ["ENG", "KIS"], ["GEO", "HAG", "CRE", "BST", "CST"]], cutoff2023: 39.531, minMeanGrade: "C+" },
  { code: "1111107", name: "Actuarial Science",                     university: "Kenyatta University",   cluster: "10C", subjects: ["MAT", ["PHY", "CHE", "BIO"], ["ENG", "KIS"], ["GEO", "HAG", "CRE", "BST", "CST"]], cutoff2023: 34.474, minMeanGrade: "C+" },

  // Law - Cluster 1A
  { code: "1263134", name: "Bachelor of Laws (LLB)",                university: "University of Nairobi", cluster: "1A", subjects: [["ENG", "KIS"], ["MAT", "MATB"], ["HAG", "GEO", "CRE", "IRE"], ["BIO", "PHY", "CHE", "BST", "CST", "FRE", "GER", "ARB"]], cutoff2023: 42.014, minMeanGrade: "B" },
  { code: "1111134", name: "Bachelor of Laws (LLB)",                university: "Kenyatta University",   cluster: "1A", subjects: [["ENG", "KIS"], ["MAT", "MATB"], ["HAG", "GEO", "CRE", "IRE"], ["BIO", "PHY", "CHE", "BST", "CST", "FRE", "GER", "ARB"]], cutoff2023: 41.643, minMeanGrade: "B" },
  { code: "1249134", name: "Bachelor of Laws (LLB)",                university: "JKUAT",                  cluster: "1A", subjects: [["ENG", "KIS"], ["MAT", "MATB"], ["HAG", "GEO", "CRE", "IRE"], ["BIO", "PHY", "CHE", "BST", "CST", "FRE", "GER", "ARB"]], cutoff2023: 41.184, minMeanGrade: "B" },
  { code: "1253134", name: "Bachelor of Laws (LLB)",                university: "Moi University",          cluster: "1A", subjects: [["ENG", "KIS"], ["MAT", "MATB"], ["HAG", "GEO", "CRE", "IRE"], ["BIO", "PHY", "CHE", "BST", "CST", "FRE", "GER", "ARB"]], cutoff2023: 40.225, minMeanGrade: "B" },

  // Commerce, Business, Economics - Cluster 2 / 10
  { code: "1111133", name: "Bachelor of Commerce",                  university: "Kenyatta University",   cluster: "2A", subjects: [["ENG", "KIS"], ["MAT", "MATB"], ["BIO", "PHY", "CHE"], ["GEO", "HAG", "CRE", "IRE", "BST", "CST", "AGR"]], cutoff2023: 32.613, minMeanGrade: "C+" },
  { code: "1263146", name: "Economics",                             university: "University of Nairobi", cluster: "10B", subjects: ["MAT", ["ENG", "KIS"], ["BIO", "PHY", "CHE"], ["GEO", "HAG", "CRE", "BST", "CST"]], cutoff2023: 26.096, minMeanGrade: "C+" },
  { code: "1111146", name: "Economics",                             university: "Kenyatta University",   cluster: "10B", subjects: ["MAT", ["ENG", "KIS"], ["BIO", "PHY", "CHE"], ["GEO", "HAG", "CRE", "BST", "CST"]], cutoff2023: 26.413, minMeanGrade: "C+" },

  // Agriculture, Food Science - Cluster 15
  { code: "1249122", name: "Bachelor of Science (Agriculture)",     university: "JKUAT",                  cluster: "15G", subjects: ["BIO", "CHE", ["MAT", "PHY", "GEO"], ["ENG", "KIS"]], cutoff2023: 29.064, minMeanGrade: "C+" },
  { code: "1249124", name: "Food Science and Technology",           university: "JKUAT",                  cluster: "15E", subjects: ["BIO", "CHE", ["MAT", "PHY", "GEO"], ["ENG", "KIS"]], cutoff2023: 30.855, minMeanGrade: "C+" },

  // Education - Cluster 19
  { code: "1111135", name: "Bachelor of Education (Arts)",          university: "Kenyatta University",   cluster: "19B", subjects: ["ENG", "KIS", ["HAG", "GEO", "CRE", "IRE"], ["MAT", "BST", "BIO", "PHY", "CHE"]], cutoff2023: 33.556, minMeanGrade: "C+" },
  { code: "1263135", name: "Bachelor of Education (Arts)",          university: "University of Nairobi", cluster: "19B", subjects: ["ENG", "KIS", ["HAG", "GEO", "CRE", "IRE"], ["MAT", "BST", "BIO", "PHY", "CHE"]], cutoff2023: 32.421, minMeanGrade: "C+" },
  { code: "1111137", name: "Bachelor of Education (Science)",       university: "Kenyatta University",   cluster: "19A", subjects: ["ENG", ["MAT", "PHY", "CHE", "BIO"], ["MAT", "PHY", "CHE", "BIO"], ["KIS", "GEO", "AGR"]], cutoff2023: 37.208, minMeanGrade: "C+" },
  { code: "1263137", name: "Bachelor of Education (Science)",       university: "University of Nairobi", cluster: "19A", subjects: ["ENG", ["MAT", "PHY", "CHE", "BIO"], ["MAT", "PHY", "CHE", "BIO"], ["KIS", "GEO", "AGR"]], cutoff2023: 36.127, minMeanGrade: "C+" },

  // Journalism, Psychology - Cluster 3
  { code: "1263181", name: "Journalism and Mass Communication",     university: "University of Nairobi", cluster: "3A", subjects: [["ENG", "KIS"], ["MAT", "MATB"], ["HAG", "GEO", "CRE", "IRE"], ["BIO", "PHY", "CHE", "BST", "CST"]], cutoff2023: 29.254, minMeanGrade: "C+" },
  { code: "1057238", name: "Bachelor of Psychology",                university: "Egerton University",    cluster: "3D", subjects: [["ENG", "KIS"], ["MAT", "MATB"], ["BIO", "PHY", "CHE"], ["HAG", "GEO", "CRE", "IRE"]], cutoff2023: 27.232, minMeanGrade: "C+" },
];
