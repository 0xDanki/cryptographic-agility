import type { DiagnosisLine } from '../../types';

interface Props {
  lines: DiagnosisLine[];
}

export default function SystemDiagnosis({ lines }: Props) {
  return (
    <div className="card p-6 mb-8">
      <p className="text-slate-300 text-sm font-semibold mb-6">System Diagnosis</p>
      <div className="space-y-4">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-5">
            <span className="mono text-slate-600 text-xs pt-0.5 flex-shrink-0 w-44 leading-relaxed">
              {line.k}
            </span>
            <span className="text-slate-300 text-sm leading-snug">{line.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
