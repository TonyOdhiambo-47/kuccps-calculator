# KUCCPS Calculator

> Know your weighted cluster points before results day.

Enter the KCSE grades you expect (or already got). See, in real time, which Kenyan university degree programmes you are competitive for, using the **2023 placement cutoffs** published by KUCCPS.

Live: https://kuccps-calculator.vercel.app

## Why this exists

Every January, Kenyan students who sat KCSE in November refresh the KUCCPS portal hoping to find a clear answer to one question: "Given my grades, can I get into the course I want?" The official KUCCPS portal answers that question **after** results are released. Blogs and news sites describe the cluster-point system with contradicting formulas. This tool takes the most widely-used approximation, runs it against the officially published cutoffs, and makes the math transparent. Nothing is hidden.

It is an **estimate**, not a placement. See the disclaimer below.

## What it actually computes

```
C = sqrt((r / R) * (t / T)) * 48
```

- `r` = sum of the raw points for the 4 cluster subjects (or alternatives) that the programme requires
- `R` = 48 (max = 12 per subject × 4 subjects)
- `t` = aggregate of the student's best 7 raw grade points
- `T` = 84 (max = 12 × 7)
- Output: a weighted cluster point on the 0-48 scale

Each KCSE grade maps to raw points using the standard KNEC mapping:

```
A=12, A-=11, B+=10, B=9, B-=8, C+=7, C=6, C-=5, D+=4, D=3, D-=2, E=1
```

For a programme whose subject slot accepts "Physics or Chemistry or Biology", the calculator picks the grade that gives the highest score, without double-using a subject across slots.

## Where the cutoffs come from

Every cutoff is copied directly from the official KUCCPS **"2024/2025 Degree Programme Cutoffs"** PDF (150 pages, dated June 2024), 2023 placement column. Primary source:

https://statics.kuccps.net/uploads/globalFiles/DEGREE_CUTOFFS_04-06-2024.pdf

Cluster subject mappings come from the KUCCPS **"Degree Cluster Document 2024"**:

https://statics.kuccps.net/uploads/globalFiles/DEGREE_CLUSTER_DOCUMENT_11_2_2024.pdf

The tool currently encodes **~45 of the most-applied-for programmes** across medicine, engineering, law, architecture, computing, business, education, agriculture, and humanities. More can be added by opening `src/data/programmes.ts` and adding a row.

## Honest caveats

KUCCPS's own FAQ explicitly warns against self-calculating cluster points:

> "You are advised not to attempt to calculate your cluster points as doing so would result in incorrect points."

The reason is that the official formula uses a confidential **Performance Index** computed by KNEC that weights individual student performance against the distribution of the KCSE cohort that year. The simplified formula above is the one taught in Kenyan schools and published on sites like kenyaeducationguide.com, courses.co.ke, tuko.co.ke, and educationnewshub.co.ke. It is a reasonable approximation, usually within 1 to 2 points of the official KUCCPS value, but it **is not the official number**.

**Use this tool to plan. Confirm on the KUCCPS portal before applying.**

## Features

- Enter grades for all standard KCSE subjects (groups: core, sciences, humanities, applied, languages, creative)
- Live calculation: as you enter grades, your mean grade, best-7 aggregate, and programme fits update instantly
- Sortable, filterable programme list with competitive / close / below labels
- Auto-saves your grades to localStorage so you don't lose them on refresh
- Works offline after first load

## Running it locally

```bash
git clone https://github.com/TonyOdhiambo-47/kuccps-calculator.git
cd kuccps-calculator
npm install
npm run dev
```

Open http://localhost:5173.

## Deploying to Vercel

```bash
vercel --prod
```

or push to GitHub and import in the Vercel dashboard. The `vercel.json` is already set up.

## Contributing

**Two rules:**

1. If you add a programme or change a cutoff, cite the page number in the KUCCPS PDF you sourced it from. We do not guess.
2. If you update the formula, show a primary source (a KUCCPS document or a Kenyan academic paper). The comment in `src/compute.ts` must reflect the source.

## Licence

MIT. Built by [Mwendo](https://mwendo.co). Part of the Mwendo open education toolkit.
