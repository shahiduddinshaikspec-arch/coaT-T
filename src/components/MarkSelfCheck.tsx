import React from 'react';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';

interface Props {
  marks: 2 | 5 | 10;
  outlinePoints: string[];
  checkedIndices: number[];
  onToggleIndex: (idx: number) => void;
}

const MARK_EXPECTATIONS: Record<2 | 5 | 10, string> = {
  2: 'A solid 2-mark answer needs a crisp definition or rule plus one short example, equation, or key distinction (3–4 lines).',
  5: 'A strong 5-mark answer includes the core definition, a neat diagram or truth/comparison table (when relevant), key working steps, and a short example.',
  10: 'A complete 10-mark answer builds clear sections: intro/definition, labeled block diagram or flowchart, step-by-step working or comparison table, worked example, and a 1-line summary.',
};

export const MarkSelfCheck: React.FC<Props> = ({
  marks,
  outlinePoints,
  checkedIndices,
  onToggleIndex,
}) => {
  const missingPoints = outlinePoints.filter((_, idx) => !checkedIndices.includes(idx));
  const coveredCount = outlinePoints.length - missingPoints.length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800">
          <ClipboardCheck className="h-4 w-4 text-teal-600" />
          Self-Check Checklist ({marks}-Mark Guide)
        </div>
        <span className="font-mono text-xs font-medium text-slate-600">
          {coveredCount} of {outlinePoints.length} included
        </span>
      </div>

      <p className="text-xs leading-relaxed text-slate-600">{MARK_EXPECTATIONS[marks]}</p>

      <div className="space-y-1.5">
        {outlinePoints.map((pt, idx) => {
          const checked = checkedIndices.includes(idx);
          return (
            <label
              key={idx}
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors ${
                checked
                  ? 'border-emerald-300 bg-emerald-50/60 text-emerald-950'
                  : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleIndex(idx)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>{pt}</span>
            </label>
          );
        })}
      </div>

      {/* Calm, encouraging missing-points summary (zero shaming) */}
      {missingPoints.length === 0 ? (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs font-medium text-emerald-900">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          You covered every core part expected for a {marks}-mark answer — steady work!
        </div>
      ) : (
        <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 px-3 py-2.5 text-xs text-indigo-950 space-y-1">
          <p className="font-semibold text-indigo-900">
            {coveredCount === 0
              ? `Next time you try this ${marks}-mark answer, aim to include:`
              : `Good progress (${coveredCount}/${outlinePoints.length}). Next time, also try adding:`}
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-indigo-900/90">
            {missingPoints.map((mp, idx) => (
              <li key={idx}>{mp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
