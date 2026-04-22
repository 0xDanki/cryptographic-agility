interface Props {
  protocolName: string;
  onStart: (name: string) => void;
}

export default function Intro({ protocolName, onStart }: Props) {
  let inputValue = protocolName;

  const handleStart = () => onStart(inputValue.trim());

  return (
    <div className="grid-bg fade min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-10">
          <p className="mono text-blue-500 text-xs tracking-widest uppercase mb-5">
            Security Diagnostic · CAS v1.0
          </p>
          <h1 className="text-[2.6rem] font-bold text-white leading-[1.15] tracking-tight mb-4">
            Cryptographic<br />Agility Score
          </h1>
          <div className="w-8 h-0.5 bg-blue-500 mb-6" />
          <p className="text-slate-400 leading-relaxed text-sm">
            The CAS framework evaluates a system's structural capacity to migrate cryptographic
            primitives. Answer 9 structured questions to receive a composite score from 0 to 27
            and a detailed architectural diagnosis.
          </p>
        </div>

        {/* Score bands */}
        <div className="card p-5 mb-6">
          <p className="mono text-slate-600 text-xs mb-4">// score interpretation</p>
          <div className="space-y-2.5">
            <div className="flex justify-between">
              <span className="mono text-slate-400 text-sm">19 – 27</span>
              <span className="text-green-400 text-sm font-medium">High Agility</span>
            </div>
            <div className="flex justify-between">
              <span className="mono text-slate-400 text-sm">10 – 18</span>
              <span className="text-amber-400 text-sm font-medium">Moderate Agility</span>
            </div>
            <div className="flex justify-between">
              <span className="mono text-slate-400 text-sm">0 – 9</span>
              <span className="text-red-400 text-sm font-medium">Critical Constraint</span>
            </div>
          </div>
        </div>

        {/* System name */}
        <div className="mb-6">
          <label className="mono text-slate-600 text-xs block mb-2">
            // system under evaluation (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. TLS 1.3, zkSync Era, Bitcoin L1, Custom Protocol"
            defaultValue={protocolName}
            onChange={e => { inputValue = e.target.value; }}
            onKeyDown={e => { if (e.key === 'Enter') handleStart(); }}
            className="px-4 py-3 text-sm"
            autoFocus
          />
        </div>

        <button className="btn-primary w-full py-4 text-sm tracking-wide" onClick={handleStart}>
          Begin Assessment →
        </button>

        <p className="mono text-slate-700 text-xs text-center mt-4">
          9 questions · ~3 minutes · no data collected
        </p>
      </div>
    </div>
  );
}
