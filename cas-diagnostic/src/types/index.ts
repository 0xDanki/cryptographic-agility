export type Score = 0 | 1 | 2 | 3;
export type BandColor = 'green' | 'amber' | 'red';
export type Phase = 'intro' | 'questions' | 'results';

export interface Option {
  s: Score;
  label: string;
  text: string;
}

export interface Dimension {
  id: string;
  name: string;
  q: string;
  hint: string;
  opts: Option[];
  /** Index = score value (0–3). expl[score] gives the results-page explanation. */
  expl: [string, string, string, string];
}

export interface Band {
  min: number;
  max: number;
  label: string;
  color: BandColor;
  desc: string;
}

export interface ScoredDimension extends Dimension {
  score: Score;
}

export interface Results {
  total: number;
  band: Band;
  dims: ScoredDimension[];
}

export interface DiagnosisLine {
  k: string;
  v: string;
}
