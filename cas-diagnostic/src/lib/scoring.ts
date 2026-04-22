import { DIMENSIONS } from '../data/dimensions';
import { BANDS } from '../data/bands';
import type { Score, Results, ScoredDimension, DiagnosisLine } from '../types';

export function computeResults(answers: (Score | null)[]): Results {
  const total = answers.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  const band = BANDS.find(b => total >= b.min && total <= b.max)!;
  const dims: ScoredDimension[] = DIMENSIONS.map((d, i) => ({
    ...d,
    score: (answers[i] ?? 0) as Score,
  }));
  return { total, band, dims };
}

export function computeDiagnosis(r: Results): DiagnosisLine[] {
  const { total, dims } = r;
  const sorted = [...dims].sort((a, b) => a.score - b.score);
  const primary = sorted[0];
  const zeros = dims.filter(d => d.score === 0);
  const lines: DiagnosisLine[] = [];

  lines.push({ k: 'Primary constraint', v: `${primary.id} — ${primary.name}` });

  if (zeros.length > 0) {
    lines.push({
      k: `Critical dimension${zeros.length > 1 ? 's' : ''} (0\u202f/\u202f3)`,
      v: zeros.map(d => `${d.id} ${d.name}`).join(' · '),
    });
  }

  let diff: string;
  if      (total <=  5) diff = 'Requires fundamental architectural redesign before migration is viable';
  else if (total <=  9) diff = 'Requires design-level intervention — operational improvements alone are insufficient';
  else if (total <= 14) diff = 'Feasible with significant coordinated effort across multiple engineering phases';
  else if (total <= 18) diff = 'Manageable with dedicated engineering focus; bottlenecks are identifiable and bounded';
  else                  diff = 'Operationally straightforward; primary costs are logistical, not architectural';
  lines.push({ k: 'Migration difficulty', v: diff });

  if (dims[8].score === 0)
    lines.push({ k: 'Identity risk',
      v: 'Migration destroys existing identity associations — requires coordinated system-wide re-derivation with no atomic execution guarantee' });
  if (dims[6].score === 0)
    lines.push({ k: 'Transition mode',
      v: 'No protocol-level negotiation — all migration is necessarily offline and batch; emergency response cadence is structurally poor' });
  if (dims[7].score === 0)
    lines.push({ k: 'Dependency audit required',
      v: 'Primitive dependencies are pervasive and undocumented — a full system audit is required before any migration attempt; blast radius is unknown' });
  if (dims[4].score === 0)
    lines.push({ k: 'Active attack surface',
      v: 'Negotiation layer is actively exploitable — downgrade attacks are possible in the current deployed state' });
  if (dims[2].score === 0)
    lines.push({ k: 'State continuity risk',
      v: 'Pre-migration artifacts become invalid on upgrade — a continuity protocol must be designed before migration begins, not during it' });

  return lines;
}

export function buildCopyText(r: Results, protocolName: string): string {
  const sys = protocolName ? `System: ${protocolName}\n` : '';
  const rows = r.dims
    .map(d => `  ${d.id}  ${d.name.padEnd(28)} ${d.score}/3  ${d.expl[d.score]}`)
    .join('\n');
  return `CAS Diagnostic — Cryptographic Agility Score
${sys}Score: ${r.total}/27 — ${r.band.label}

Dimension Scores:
${rows}

Tool based on: Erispe (2026), "A Framework for Evaluating Cryptographic Agility in Deployed Systems"`;
}
