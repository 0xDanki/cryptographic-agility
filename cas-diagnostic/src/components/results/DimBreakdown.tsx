import type { ScoredDimension } from '../../types';

const BAR_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#22c55e'] as const;

interface Props {
  dims: ScoredDimension[];
}

function DimBar({ score }: { score: 0 | 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-px rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <div
          className="h-px dim-fill rounded-full"
          style={{
            width: `${(score / 3) * 100}%`,
            background: BAR_COLORS[score],
          }}
        />
      </div>
      <span className="mono text-xs text-slate-600 w-6 text-right">{score}/3</span>
    </div>
  );
}

export default function DimBreakdown({ dims }: Props) {
  return (
    <div className="card p-6 mb-4">
      <p className="text-slate-300 text-sm font-semibold mb-6">Dimension Breakdown</p>
      <div className="space-y-6">
        {dims.map(d => (
          <div key={d.id}>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="mono text-slate-600 text-xs">{d.id}</span>
              <span className="text-slate-300 text-sm">{d.name}</span>
            </div>
            <DimBar score={d.score} />
            <p className="text-slate-600 text-xs mt-2 leading-relaxed">{d.expl[d.score]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
