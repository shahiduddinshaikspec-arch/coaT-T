import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  Eye,
  Lightbulb,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import type { StudyProgress, StudyQuestion } from '../types';
import { AnswerBlocksRenderer } from './AnswerBlocksRenderer';
import { MarkSelfCheck } from './MarkSelfCheck';
import { ReadAloudButton } from './ReadAloudButton';

interface Props {
  progress: StudyProgress;
  focusedForgotId: string | null;
  focusView: boolean;
  onSaveDraft: (qid: string, text: string) => void;
  onToggleSelfCheck: (qid: string, pointIdx: number) => void;
  onMarkRecovered: (qid: string) => void;
  onRemoveFromForgot: (qid: string) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenNumerical: (nid: string) => void;
  onGoToPractice: () => void;
}

export const ForgotView: React.FC<Props> = ({
  progress,
  focusedForgotId,
  focusView,
  onSaveDraft,
  onToggleSelfCheck,
  onMarkRecovered,
  onRemoveFromForgot,
  onOpenLesson,
  onOpenNumerical,
  onGoToPractice,
}) => {
  const missedQuestions = useMemo(() => {
    return progress.forgotQuestions
      .map((id) => QUESTIONS.find((q) => q.id === id))
      .filter((q): q is StudyQuestion => Boolean(q));
  }, [progress.forgotQuestions]);

  const [activeId, setActiveId] = useState<string | null>(focusedForgotId);
  const [hintOpen, setHintOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (focusedForgotId) {
      setActiveId(focusedForgotId);
      setHintOpen(false);
      setRevealed(false);
    }
  }, [focusedForgotId]);

  const currentQ =
    missedQuestions.find((q) => q.id === activeId) || missedQuestions[0] || null;

  const selectQuestion = (id: string) => {
    setActiveId(id);
    setHintOpen(false);
    setRevealed(false);
  };

  if (missedQuestions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 text-center shadow-xs space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="text-lg font-semibold text-slate-900">
          Your “Forgot This” review list is clear
        </h1>
        <p className="mx-auto max-w-md text-sm text-slate-500">
          Whenever a question feels tricky in Practice or Numericals, tap{' '}
          <span className="font-medium text-slate-700">“Forgot this”</span> and it will wait here
          for a calm second try.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onGoToPractice}
            className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-800 cursor-pointer"
          >
            Go to Practice Mode
          </button>
        </div>
      </div>
    );
  }

  const draft = currentQ ? progress.questionDrafts[currentQ.id] || '' : '';
  const checkedIndices = currentQ ? progress.questionSelfChecks[currentQ.id] || [] : [];

  return (
    <div className={focusView ? 'mx-auto max-w-3xl' : 'grid gap-5 lg:grid-cols-12 items-start'}>
      {/* Left Queue */}
      {!focusView && (
        <aside className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
          <div>
            <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-700">
              <RotateCcw className="h-3.5 w-3.5" />
              Forgot-This Review Queue ({missedQuestions.length})
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Retry each missed question in your own words until it feels familiar.
            </p>
          </div>

          <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1">
            {missedQuestions.map((q) => {
              const active = currentQ?.id === q.id;
              return (
                <div
                  key={q.id}
                  className={`flex items-start gap-2 rounded-xl border p-2.5 transition-colors ${
                    active
                      ? 'border-rose-400 bg-rose-50/70'
                      : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/70'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectQuestion(q.id)}
                    className="min-w-0 flex-1 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-700">
                        U{q.unit} · {q.qNum} ({q.marks}M)
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-800 line-clamp-2">
                      {q.question}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromForgot(q.id)}
                    title="Remove from Forgot-This"
                    className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-600 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </aside>
      )}

      {/* Right Active Retry Card */}
      {currentQ && (
        <section
          className={`${
            focusView ? '' : 'lg:col-span-8'
          } rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-5`}
        >
          <header className="border-b border-slate-100 pb-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-800">
                  Retry · Unit {currentQ.unitRoman} {currentQ.qNum}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  {currentQ.marks} Marks
                </span>
              </div>
              <ReadAloudButton
                text={`Question: ${currentQ.question}. ${hintOpen ? `Hint: ${currentQ.hint}` : ''}`}
              />
            </div>

            <h1 className="mt-2.5 text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
              {currentQ.question}
            </h1>
            <div className="mt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenLesson(currentQ.lessonId)}
                className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Re-read beginner lesson
              </button>
              {currentQ.numericalId && (
                <button
                  type="button"
                  onClick={() => onOpenNumerical(currentQ.numericalId!)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 hover:underline cursor-pointer"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  Step-by-step calculation drill
                </button>
              )}
            </div>
          </header>

          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <label
              htmlFor="retry-draft"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
            >
              Try explaining the core points in your own words (auto-saved):
            </label>
            <textarea
              id="retry-draft"
              rows={3}
              value={draft}
              onChange={(e) => onSaveDraft(currentQ.id, e.target.value)}
              placeholder="Write the main structure, formula, or diagram idea..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-teal-600 focus:outline-none"
            />

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setHintOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs sm:text-sm font-medium text-amber-900 hover:bg-amber-100 cursor-pointer"
              >
                <Lightbulb className="h-4 w-4 text-amber-700" />
                {hintOpen ? 'Hide Hint' : 'Show Hint'}
              </button>
              {!revealed && (
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-slate-800 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  Reveal Answer Key
                </button>
              )}
            </div>

            {hintOpen && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-sm text-amber-950">
                <span className="font-semibold">Hint: </span>
                {currentQ.hint}
              </div>
            )}
          </div>

          {revealed && (
            <div className="space-y-4 rounded-2xl border border-teal-200 bg-teal-50/20 p-4 sm:p-5">
              <AnswerBlocksRenderer
                blocks={currentQ.blocks}
                checkNote={currentQ.checkNote}
              />

              <MarkSelfCheck
                marks={currentQ.marks}
                outlinePoints={currentQ.outlinePoints}
                checkedIndices={checkedIndices}
                onToggleIndex={(idx) => onToggleSelfCheck(currentQ.id, idx)}
              />

              <div className="flex flex-wrap items-center gap-2.5 border-t border-teal-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = missedQuestions.findIndex((q) => q.id === currentQ.id);
                    const nextItem = missedQuestions[nextIdx + 1] || missedQuestions[0];
                    onMarkRecovered(currentQ.id);
                    if (nextItem && nextItem.id !== currentQ.id) {
                      selectQuestion(nextItem.id);
                    } else {
                      setHintOpen(false);
                      setRevealed(false);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  Got it now! Clear from Forgot-This
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const idx = missedQuestions.findIndex((q) => q.id === currentQ.id);
                    const nextItem = missedQuestions[(idx + 1) % missedQuestions.length];
                    if (nextItem) selectQuestion(nextItem.id);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Keep in list & try next
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
