import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  Eye,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import { NUMERICALS } from '../data/numericals';
import { QUESTIONS } from '../data/questions';
import type { NumericalProblem, StudyProgress } from '../types';
import { AnswerBlocksRenderer } from './AnswerBlocksRenderer';
import { ReadAloudButton } from './ReadAloudButton';

interface Props {
  selectedNumericalId: string;
  progress: StudyProgress;
  focusView: boolean;
  onSelectNumerical: (id: string) => void;
  onToggleMasteredNumerical: (id: string) => void;
  onMarkQuestionForgot: (questionId: string) => void;
}

function normalizeAnswer(input: string): string {
  return input
    .toLowerCase()
    .replace(/−/g, '-')
    .replace(/[\s_()₈₂₁₀]/g, '')
    .trim();
}

export const NumericalsView: React.FC<Props> = ({
  selectedNumericalId,
  progress,
  focusView,
  onSelectNumerical,
  onToggleMasteredNumerical,
  onMarkQuestionForgot,
}) => {
  const current: NumericalProblem =
    NUMERICALS.find((n) => n.id === selectedNumericalId) || NUMERICALS[0];

  const [stepIndex, setStepIndex] = useState(0); // highest unlocked step (0..steps.length)
  const [stepInput, setStepInput] = useState('');
  const [showStepHint, setShowStepHint] = useState(false);
  const [stepFeedback, setStepFeedback] = useState<{
    status: 'correct' | 'wrong' | 'revealed';
    message: string;
  } | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFullKey, setShowFullKey] = useState(false);

  useEffect(() => {
    setStepIndex(0);
    setStepInput('');
    setShowStepHint(false);
    setStepFeedback(null);
    setCompletedSteps([]);
    setShowFullKey(false);
  }, [current.id]);

  const isMastered = progress.masteredNumericals.includes(current.id);
  const linkedQuestion = QUESTIONS.find((q) => q.id === current.questionId);
  const allStepsDone = completedSteps.length >= current.steps.length;
  const activeStep = !allStepsDone ? current.steps[stepIndex] : null;

  const handleCheckStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStep) return;
    const norm = normalizeAnswer(stepInput);
    if (!norm) {
      setStepFeedback({
        status: 'wrong',
        message: 'Type your answer for this step first, or click "Reveal Step" if you would like to see how it works.',
      });
      return;
    }

    const accepted = activeStep.acceptedAnswers.map(normalizeAnswer);
    if (accepted.includes(norm)) {
      setStepFeedback({
        status: 'correct',
        message: `Spot on! ${activeStep.explanation}`,
      });
      if (!completedSteps.includes(stepIndex)) {
        setCompletedSteps((prev) => [...prev, stepIndex]);
      }
    } else {
      setStepFeedback({
        status: 'wrong',
        message: 'Not quite yet — check the hint or try again, or click "Reveal Step" to see how it works.',
      });
    }
  };

  const handleRevealStep = () => {
    if (!activeStep) return;
    setStepFeedback({
      status: 'revealed',
      message: `Worked step: ${activeStep.workedAnswer}. ${activeStep.explanation}`,
    });
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps((prev) => [...prev, stepIndex]);
    }
  };

  const handleAdvanceStep = () => {
    if (stepIndex < current.steps.length - 1) {
      setStepIndex((i) => i + 1);
      setStepInput('');
      setShowStepHint(false);
      setStepFeedback(null);
    }
  };

  const handleRestart = () => {
    setStepIndex(0);
    setStepInput('');
    setShowStepHint(false);
    setStepFeedback(null);
    setCompletedSteps([]);
  };

  // Build visible trace rows dynamically as steps are solved/revealed!
  const visibleTraceRows: string[][] = [];
  if (current.initialTraceRows) {
    visibleTraceRows.push(...current.initialTraceRows);
  }
  current.steps.forEach((st, idx) => {
    if (completedSteps.includes(idx) && st.traceRow) {
      visibleTraceRows.push(st.traceRow);
    }
  });

  const stepAlreadyCompleted = completedSteps.includes(stepIndex);

  return (
    <div className={focusView ? 'mx-auto max-w-3xl' : 'grid gap-5 lg:grid-cols-12 items-start'}>
      {/* Sidebar: All 13 Worked Calculations */}
      {!focusView && (
      <aside className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            <Calculator className="h-3.5 w-3.5" />
            Step-by-Step Numericals ({NUMERICALS.length})
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Reveal one step at a time, try the next value yourself, then verify.
          </p>
        </div>

        <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1">
          {NUMERICALS.map((num) => {
            const active = num.id === current.id;
            const mastered = progress.masteredNumericals.includes(num.id);
            return (
              <button
                key={num.id}
                type="button"
                onClick={() => onSelectNumerical(num.id)}
                className={`flex w-full items-start justify-between gap-2 rounded-xl border p-2.5 text-left transition-colors cursor-pointer ${
                  active
                    ? 'border-indigo-500 bg-indigo-50/70'
                    : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/70'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                      U{num.unit} · {num.qNum} ({num.marks}M)
                    </span>
                    {num.checkNote && (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
                        Check note
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-1 text-xs font-medium leading-snug ${
                      active ? 'text-indigo-950' : 'text-slate-800'
                    }`}
                  >
                    {num.title}
                  </p>
                </div>
                {mastered && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </aside>
      )}

      {/* Main Step-by-Step Trainer */}
      <section className={`${focusView ? '' : 'lg:col-span-8'} rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-5`}>
        {/* Problem Header */}
        <header className="border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
                Unit {current.unit} · {current.qNum} ({current.marks}M)
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {current.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ReadAloudButton
                text={`${current.title}. ${current.problemStatement} Rule: ${current.ruleSummary}`}
              />
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Restart steps
              </button>
            </div>
          </div>

          <h1 className="mt-2.5 text-lg sm:text-xl font-semibold text-slate-900">
            {current.title}
          </h1>
          <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
            {current.problemStatement}
          </p>

          {/* Given values */}
          <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Given & Setup
            </div>
            {current.givenItems.map((g, idx) => (
              <div key={idx} className="font-mono text-xs sm:text-sm text-slate-800">
                • {g}
              </div>
            ))}
            <p className="pt-1.5 text-xs text-teal-800 font-medium">
              Rule: {current.ruleSummary}
            </p>
          </div>
        </header>

        {/* Check This Answer Alert if present */}
        {current.checkNote && (
          <div className="rounded-xl border border-amber-300 bg-amber-50/90 p-3.5 text-sm text-amber-950">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <div>
                <span className="inline-block rounded bg-amber-200/80 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
                  {current.checkNote.label}
                </span>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed">{current.checkNote.reason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Live Trace Table (for Booth's, Sign-Mag Mult, Addressing Modes) */}
        {current.traceHeaders && (
          <div className="space-y-1.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Live Trace Table (builds as you solve each step)
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[420px] border-collapse text-left text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 font-sans">
                    {current.traceHeaders.map((h, i) => (
                      <th key={i} className="px-3 py-2 font-semibold text-slate-700">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleTraceRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={current.traceHeaders.length}
                        className="px-3 py-3 text-center font-sans text-xs text-slate-400"
                      >
                        Solve or reveal Step 1 below to populate the first row.
                      </td>
                    </tr>
                  ) : (
                    visibleTraceRows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx === visibleTraceRows.length - 1 ? 'bg-teal-50/50' : ''}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3 py-2 text-slate-800 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Progress Stepper Indicator */}
        <div className="flex items-center gap-1.5">
          {current.steps.map((_, idx) => {
            const done = completedSteps.includes(idx);
            const active = idx === stepIndex && !allStepsDone;
            return (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  done ? 'bg-emerald-500' : active ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              />
            );
          })}
          <span className="ml-2 font-mono text-xs text-slate-500">
            {completedSteps.length}/{current.steps.length} steps
          </span>
        </div>

        {/* Previously Completed Steps Log */}
        {completedSteps.length > 0 && (
          <div className="space-y-2">
            {current.steps.map((st, idx) => {
              if (!completedSteps.includes(idx) || (idx === stepIndex && !allStepsDone)) {
                return null;
              }
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-emerald-200 bg-emerald-50/40 px-3.5 py-2.5 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Step {idx + 1}: {st.title}
                  </div>
                  <div className="mt-1 font-mono text-xs text-slate-800">
                    Answer: {st.workedAnswer}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Active Step Interactive Card */}
        {activeStep && (
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-indigo-700 px-2.5 py-0.5 text-xs font-semibold text-white">
                Step {stepIndex + 1} of {current.steps.length}
              </span>
              <button
                type="button"
                onClick={() => setShowStepHint((h) => !h)}
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:underline cursor-pointer"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                {showStepHint ? 'Hide hint' : 'Need a hint?'}
              </button>
            </div>

            <h2 className="text-base font-semibold text-slate-900">{activeStep.title}</h2>
            <p className="text-sm text-slate-700">{activeStep.prompt}</p>

            {showStepHint && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs sm:text-sm text-amber-950">
                <span className="font-semibold">Hint: </span>
                {activeStep.hint}
              </div>
            )}

            <form onSubmit={handleCheckStep} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                placeholder={activeStep.placeholder}
                aria-label="Your answer for this step"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-sm text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 cursor-pointer"
              >
                Check Step
              </button>
              <button
                type="button"
                onClick={handleRevealStep}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                Reveal Step
              </button>
            </form>

            {stepFeedback && (
              <div
                className={`rounded-xl border p-3.5 text-sm ${
                  stepFeedback.status === 'correct'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : stepFeedback.status === 'revealed'
                      ? 'border-teal-300 bg-teal-50 text-teal-950'
                      : 'border-rose-200 bg-rose-50 text-rose-900'
                }`}
              >
                <p className="leading-relaxed">{stepFeedback.message}</p>
                {stepAlreadyCompleted && stepIndex < current.steps.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAdvanceStep}
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                  >
                    Next Step ({stepIndex + 2} of {current.steps.length})
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Completion Banner */}
        {allStepsDone && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              All {current.steps.length} Steps Completed!
            </div>
            <p className="font-mono text-sm font-semibold text-slate-900 bg-white rounded-xl border border-emerald-200 px-3.5 py-2.5">
              {current.finalAnswerSummary}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onToggleMasteredNumerical(current.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium cursor-pointer ${
                  isMastered
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Check className="h-4 w-4" />
                {isMastered ? 'Mastered ✓' : 'Mark Numerical Mastered'}
              </button>
              <button
                type="button"
                onClick={() => onMarkQuestionForgot(current.questionId)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white px-3.5 py-2 text-sm font-medium text-rose-800 hover:bg-rose-50 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Still shaky? Add to Forgot-This
              </button>
            </div>
          </div>
        )}

        {/* Optional Flowchart Diagram & Full Faithful Answer Key Toggle */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <button
            type="button"
            onClick={() => setShowFullKey((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            {showFullKey ? 'Hide Full Worked Answer Key' : 'Compare with Full Worked Answer Key (from DOCX)'}
          </button>

          {showFullKey && linkedQuestion && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <AnswerBlocksRenderer
                blocks={linkedQuestion.blocks}
                checkNote={linkedQuestion.checkNote}
                compact
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
