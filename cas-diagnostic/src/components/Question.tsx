import { useEffect } from 'react';
import type { Dimension, Score } from '../types';

interface Props {
  dim: Dimension;
  dimIndex: number;
  totalDims: number;
  selectedIdx: number | null;
  onSelect: (idx: number, score: Score) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Question({
  dim, dimIndex, totalDims, selectedIdx, onSelect, onNext, onBack,
}: Props) {
  const canNext = selectedIdx !== null;
  const isLast  = dimIndex === totalDims - 1;
  const progress = (dimIndex / totalDims) * 100;

  // Keyboard shortcuts: 1–4 select, Enter advances
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const i = Number(e.key) - 1;
        if (i < dim.opts.length) onSelect(i, dim.opts[i].s);
      }
      if (e.key === 'Enter' && canNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dim, canNext, onSelect, onNext]);

  return (
    <div className="fade flex flex-col min-h-screen">

      {/* ── Top bar ── */}
      <div
        className="sticky top-0 z-10 px-6 py-4 border-b"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-xl mx-auto flex justify-between mb-3">
          <span className="mono text-slate-600 text-xs">CAS Diagnostic</span>
          <span className="mono text-slate-600 text-xs">{dimIndex + 1} / {totalDims}</span>
        </div>
        <div
          className="max-w-xl mx-auto h-px rounded-full overflow-hidden"
          style={{ background: 'var(--border)' }}
        >
          <div className="h-px bg-blue-500 prog-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* ── Question body ── */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-xl mx-auto">
          <p className="mono text-blue-500 text-xs tracking-widest uppercase mb-3">
            {dim.id} — {dim.name}
          </p>
          <h2 className="text-xl font-semibold text-white leading-snug mb-2">{dim.q}</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-10">{dim.hint}</p>

          <div className="space-y-3">
            {dim.opts.map((opt, i) => (
              <div
                key={i}
                className={`opt p-5 ${selectedIdx === i ? 'active' : ''}`}
                onClick={() => onSelect(i, opt.s)}
              >
                <div className="flex gap-4 items-start">
                  {/* Radio indicator */}
                  <div
                    className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${selectedIdx === i ? 'border-blue-500' : 'border-slate-700'}`}
                  >
                    {selectedIdx === i && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-slate-100 text-sm font-medium mb-1">{opt.label}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{opt.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mono text-slate-700 text-xs text-center mt-8">
            press 1–4 to select · enter to advance
          </p>
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div
        className="sticky bottom-0 px-6 py-5 border-t"
        style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <button
            className="text-slate-600 hover:text-slate-400 text-sm transition-colors"
            style={{ visibility: dimIndex === 0 ? 'hidden' : 'visible' }}
            onClick={onBack}
          >
            ← Back
          </button>
          <button
            className="btn-primary px-8 py-3 text-sm"
            disabled={!canNext}
            onClick={onNext}
          >
            {isLast ? 'View Results →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
