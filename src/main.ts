import "./styles.css";
import { SUBJECTS, GRADE_ORDER, type GradeMap, type SubjectDef } from "./data/subjects";
import { PROGRAMMES } from "./data/programmes";
import { best7Aggregate, gradeCount, meanGrade, scoreProgramme } from "./compute";

const STORAGE_KEY = "mwendo.kuccps.grades.v1";
const grades: GradeMap = loadGrades();

const subjectGridEl = document.getElementById("subject-grid")!;
const programmeListEl = document.getElementById("programme-list")!;
const summaryEl = document.getElementById("summary")!;
const filterInput = document.getElementById("filter") as HTMLInputElement;
const resetBtn = document.getElementById("btn-reset")!;

let filter = "";

function loadGrades(): GradeMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const m: GradeMap = {};
  for (const s of SUBJECTS) m[s.id] = "";
  return m;
}

function persistGrades() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grades));
  } catch { /* ignore */ }
}

function groupLabel(g: SubjectDef["group"]): string {
  switch (g) {
    case "core": return "core";
    case "sciences": return "sciences";
    case "humanities": return "humanities";
    case "applied": return "applied and technical";
    case "languages": return "languages";
    case "creative": return "creative";
  }
}

function renderGrid() {
  subjectGridEl.innerHTML = "";
  const groups = ["core", "sciences", "humanities", "applied", "languages", "creative"] as const;
  for (const g of groups) {
    const subs = SUBJECTS.filter((s) => s.group === g);
    if (!subs.length) continue;
    const col = document.createElement("div");
    col.className = "subject-group";
    col.innerHTML = `<h3>${groupLabel(g)}</h3>`;
    for (const s of subs) {
      const row = document.createElement("div");
      row.className = "subject-row";
      row.innerHTML = `
        <label for="g-${s.id}">${s.name}</label>
        <select id="g-${s.id}" data-id="${s.id}" ${grades[s.id] ? "data-graded" : ""}>
          ${GRADE_ORDER.map((gr) => `<option value="${gr}" ${grades[s.id] === gr ? "selected" : ""}>${gr || "-"}</option>`).join("")}
        </select>
      `;
      col.appendChild(row);
    }
    subjectGridEl.appendChild(col);
  }
  subjectGridEl.addEventListener("change", (e) => {
    const tgt = e.target as HTMLSelectElement;
    if (!tgt.dataset.id) return;
    grades[tgt.dataset.id] = tgt.value;
    if (tgt.value) tgt.setAttribute("data-graded", "");
    else tgt.removeAttribute("data-graded");
    persistGrades();
    renderSummary();
    renderProgrammes();
  });
}

function renderSummary() {
  const n = gradeCount(grades);
  const aggregate = best7Aggregate(grades);
  const mean = meanGrade(aggregate);
  summaryEl.innerHTML = `
    <div class="summary-tile">
      <div class="summary-label">subjects entered</div>
      <div class="summary-value">${n} / 7 min</div>
      <div class="summary-hint">KCSE uses the best 7</div>
    </div>
    <div class="summary-tile">
      <div class="summary-label">best 7 aggregate</div>
      <div class="summary-value">${aggregate} / 84</div>
      <div class="summary-hint">raw grade points, summed</div>
    </div>
    <div class="summary-tile">
      <div class="summary-label">mean grade</div>
      <div class="summary-value">${mean.letter}</div>
      <div class="summary-hint">${mean.points}/12 points</div>
    </div>
    <div class="summary-tile">
      <div class="summary-label">ceiling</div>
      <div class="summary-value">48.000</div>
      <div class="summary-hint">max weighted cluster points</div>
    </div>
  `;
}

function renderProgrammes() {
  programmeListEl.innerHTML = "";
  const n = gradeCount(grades);
  if (n === 0) {
    programmeListEl.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-dim); font-family: var(--mono); font-size: 12px;">
        enter at least a few grades above to see programme fits
      </div>
    `;
    return;
  }

  const scored = PROGRAMMES.map((p) => scoreProgramme(p, grades));
  const filtered = scored.filter((s) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return (
      s.programme.name.toLowerCase().includes(f) ||
      s.programme.university.toLowerCase().includes(f) ||
      s.programme.cluster.toLowerCase().includes(f) ||
      s.programme.code.includes(f)
    );
  });

  // Sort: complete first by cluster points desc, then incomplete
  filtered.sort((a, b) => {
    if (a.complete !== b.complete) return a.complete ? -1 : 1;
    return b.clusterPoints - a.clusterPoints;
  });

  for (const s of filtered) {
    const row = document.createElement("div");
    const statusClass = s.competitiveness;
    row.className = `prog ${statusClass}`;
    const scoreStr = s.complete ? s.clusterPoints.toFixed(3) : "-";
    const statusLabel =
      statusClass === "competitive" ? "likely competitive"
      : statusClass === "close" ? "within range"
      : statusClass === "below" ? "below cutoff"
      : "missing subjects";
    row.innerHTML = `
      <div class="prog-head">
        <div class="prog-name">${escapeHtml(s.programme.name)}</div>
        <div class="prog-uni">${escapeHtml(s.programme.university)}<span class="cluster">· ${escapeHtml(s.programme.code)} · Cluster ${escapeHtml(s.programme.cluster)}</span></div>
      </div>
      <div class="prog-score">${scoreStr}<span class="unit"> / 48</span></div>
      <div class="prog-cutoff">cutoff ${s.programme.cutoff2023.toFixed(3)}</div>
      <div class="prog-status ${statusClass}">${statusLabel}</div>
    `;
    programmeListEl.appendChild(row);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

filterInput.addEventListener("input", () => {
  filter = filterInput.value.trim();
  renderProgrammes();
});

resetBtn.addEventListener("click", () => {
  if (!confirm("Clear all grades?")) return;
  for (const s of SUBJECTS) grades[s.id] = "";
  persistGrades();
  renderGrid();
  renderSummary();
  renderProgrammes();
});

renderGrid();
renderSummary();
renderProgrammes();
