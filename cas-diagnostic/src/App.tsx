import { useState, useCallback } from 'react';
import type { Phase, Score } from './types';
import { DIMENSIONS } from './data/dimensions';
import { computeResults } from './lib/scoring';
import Intro    from './components/Intro';
import Question from './components/Question';
import Results  from './components/results/Results';

interface State {
  phase:        Phase;
  protocolName: string;
  currentDim:   number;
  answers:      (Score | null)[];
  selectedIdx:  number | null;
}

const INITIAL: State = {
  phase:        'intro',
  protocolName: '',
  currentDim:   0,
  answers:      Array(DIMENSIONS.length).fill(null),
  selectedIdx:  null,
};

/** Given a saved score value, find its option index in a dimension's opts array. */
function restoreIdx(dimIndex: number, score: Score | null): number | null {
  if (score === null) return null;
  return DIMENSIONS[dimIndex].opts.findIndex(o => o.s === score);
}

export default function App() {
  const [s, setS] = useState<State>(INITIAL);

  /* ── Intro → Questions ── */
  const handleStart = useCallback((name: string) => {
    setS(prev => ({
      ...prev,
      phase:        'questions',
      protocolName: name,
      currentDim:   0,
      selectedIdx:  restoreIdx(0, prev.answers[0]),
    }));
  }, []);

  /* ── Select an option ── */
  const handleSelect = useCallback((idx: number, score: Score) => {
    setS(prev => {
      const answers = [...prev.answers] as (Score | null)[];
      answers[prev.currentDim] = score;
      return { ...prev, answers, selectedIdx: idx };
    });
  }, []);

  /* ── Advance to next dim or results ── */
  const handleNext = useCallback(() => {
    setS(prev => {
      if (prev.currentDim === DIMENSIONS.length - 1) {
        return { ...prev, phase: 'results' };
      }
      const next = prev.currentDim + 1;
      return {
        ...prev,
        currentDim:  next,
        selectedIdx: restoreIdx(next, prev.answers[next]),
      };
    });
  }, []);

  /* ── Go back one dimension ── */
  const handleBack = useCallback(() => {
    setS(prev => {
      const prev2 = prev.currentDim - 1;
      return {
        ...prev,
        currentDim:  prev2,
        selectedIdx: restoreIdx(prev2, prev.answers[prev2]),
      };
    });
  }, []);

  /* ── Full reset ── */
  const handleRestart = useCallback(() => {
    setS(INITIAL);
  }, []);

  /* ── Scroll to top on phase change (handled in children via key prop) ── */

  if (s.phase === 'intro') {
    return (
      <Intro
        protocolName={s.protocolName}
        onStart={handleStart}
      />
    );
  }

  if (s.phase === 'questions') {
    return (
      <Question
        key={s.currentDim}        /* remount triggers fade + resets keyboard listener */
        dim={DIMENSIONS[s.currentDim]}
        dimIndex={s.currentDim}
        totalDims={DIMENSIONS.length}
        selectedIdx={s.selectedIdx}
        onSelect={handleSelect}
        onNext={handleNext}
        onBack={handleBack}
      />
    );
  }

  // results
  const results = computeResults(s.answers);
  return (
    <Results
      results={results}
      protocolName={s.protocolName}
      onRestart={handleRestart}
    />
  );
}
