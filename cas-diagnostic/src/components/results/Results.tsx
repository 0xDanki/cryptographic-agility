import { useState } from 'react';
import type { Results as ResultsType } from '../../types';
import { computeDiagnosis, buildCopyText } from '../../lib/scoring';
import ScoreRing from './ScoreRing';
import DimBreakdown from './DimBreakdown';
import SystemDiagnosis from './SystemDiagnosis';

interface Props {
  results: ResultsType;
  protocolName: string;
  onRestart: () => void;
}

export default function Results({ results, protocolName, onRestart }: Props) {
  const [copied, setCopied] = useState(false);
  const { total, band, dims } = results;
  const diagnosis = computeDiagnosis(results);
  const label = protocolName ? `"${protocolName}"` : 'Evaluated System';

  const handleCopy = () => {
    const text = buildCopyText(results, protocolName);
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => {
        fallbackCopy(text);
        done();
      });
    } else {
      fallbackCopy(text);
      done();
    }
  };

  return (
    <div className="fade min-h-screen px-6 py-12">
      <div className="max-w-xl mx-auto">

        <p className="mono text-slate-700 text-xs mb-8">CAS Diagnostic — Results</p>

        {/* ── Score card ── */}
        <div className="card p-8 mb-4">
          <div className="flex items-center gap-7 mb-6">
            <ScoreRing total={total} color={band.color} />
            <div>
              <p className="text-slate-500 text-xs mb-1">{label}</p>
              <p className={`mono font-bold text-[2.4rem] leading-none mb-3 band-${band.color}-score`}>
                {total}
                <span className="text-slate-600 text-xl">/27</span>
              </p>
              <span className={`inline-flex rounded-sm px-3 py-0.5 text-xs font-medium band-${band.color}-badge`}>
                {band.label}
              </span>
            </div>
          </div>
          <p
            className="text-slate-400 text-sm leading-relaxed border-t pt-5"
            style={{ borderColor: 'var(--border)' }}
          >
            {band.desc}
          </p>
        </div>

        <DimBreakdown dims={dims} />
        <SystemDiagnosis lines={diagnosis} />

        {/* ── Actions ── */}
        <div className="flex gap-3 mb-8">
          <button className="btn-ghost flex-1 py-3 text-sm" onClick={onRestart}>
            Start Over
          </button>
          <button className="btn-ghost flex-1 py-3 text-sm" onClick={handleCopy}>
            {copied ? 'Copied ✓' : 'Copy Results'}
          </button>
        </div>

        <p className="mono text-slate-700 text-xs text-center leading-relaxed">
          Based on: Erispe (2026) · A Framework for Evaluating Cryptographic Agility in Deployed Systems
        </p>
      </div>
    </div>
  );
}

function fallbackCopy(text: string) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
