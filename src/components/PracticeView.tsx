import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookMarked,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { QUESTIONS, UNITS } from '../data/questions';
import type { StudyProgress, StudyQuestion } from '../types';
import { AnswerBlocksRenderer } from './AnswerBlocksRenderer';
import { MarkSelfCheck } from './MarkSelfCheck';
import { ReadAloudButton } from './ReadAloudButton';

interface Props {
  marksMode: 2 | 5 | 10;
  unitFilter: number | 'all';
  focusedQuestionId: string | null;
  progress: StudyProgress;
  focusView: boolean;
  onChangeMarksMode: (m: 2 | 5 | 10) => void;
  onChangeUnitFilter: (u: number | 'all') => void;
  onSelectQuestionId: (qid: string) => void;
  onSaveDraft: (qid: string, text: string) => void;
  onToggleSelfCheck: (qid: string, pointIdx: number) => void;
  onMarkGotIt: (qid: string) => void;
  onMarkForgot: (qid: string) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenNumerical: (numericalId: string) => void;
  onOpenTerm: (term: string) => void;
  onAskTutorAboutDraft: (draftText: string) => void;
}

const TEN_MARK_DEFAULT_SECONDS = 12 * 60;

export const PracticeView: React.FC<Props> = ({
  marksMode,
  unitFilter,
  focusedQuestionId,
  progress,
  focusView,
  onChangeMarksMode,
  onChangeUnitFilter,
  onSelectQuestionId,
  onSaveDraft,
  onToggleSelfCheck,
  onMarkGotIt,
  onMarkForgot,
  onOpenLesson,
  onOpenNumerical,
  onOpenTerm,
  onAskTutorAboutDraft,
}) => {
  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(
      (q) => q.marks === marksMode && (unitFilter === 'all' || q.unit === unitFilter)
    );
  }, [marksMode, unitFilter]);

  const activeIndex = useMemo(() => {
    if (focusedQuestionId) {
      const idx = filteredQuestions.findIndex((q) => q.id === focusedQuestionId);
      if (idx >= 0) return idx;
    }
    return 0;
  }, [filteredQuestions, focusedQuestionId]);

  const currentQuestion: StudyQuestion | undefined = filteredQuestions[activeIndex];

  const [hintShown, setHintShown] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [tryPromptNeeded, setTryPromptNeeded] = useState(false);

  const [examTimerSec, setExamTimerSec] = useState(TEN_MARK_DEFAULT_SECONDS);
  const [examTimerRunning, setExamTimerRunning] = useState(false);

  useEffect(() => {
    setHintShown(false);
    setAnswerRevealed(false);
    setTryPromptNeeded(false);
    setExamTimerSec(TEN_MARK_DEFAULT_SECONDS);
    setExamTimerRunning(false);
  }, [currentQuestion?.id]);

  useEffect(() => {
    if (!examTimerRunning || marksMode !== 10) return;
    const id = window.setInterval(() => {
      setExamTimerSec((prev) => {
        if (prev <= 1) {
          setExamTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [examTimerRunning, marksMode]);

  // Fast keyboard shortcuts when not typing in an input/textarea or modal
  useEffect(() => {
    if (!currentQuestion) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (document.querySelector('[role="dialog"]')) return;

      const k = e.key.toLowerCase();
      if (k === 'h') {
        e.preventDefault();
        setHintShown((v) => !v);
      } else if (k === 'r' && !answerRevealed) {
        e.preventDefault();
        const draft = (progress.questionDrafts[currentQuestion.id] || '').trim();
        const checks = progress.questionSelfChecks[currentQuestion.id] || [];
        if (!draft && checks.length === 0 && !hintShown && !tryPromptNeeded) {
          setHintShown(true);
          setTryPromptNeeded(true);
        } else {
          setAnswerRevealed(true);
          setExamTimerRunning(false);
        }
      } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
        e.preventDefault();
        onSelectQuestionId(filteredQuestions[activeIndex - 1].id);
      } else if (e.key === 'ArrowRight' && activeIndex < filteredQuestions.length - 1) {
        e.preventDefault();
        onSelectQuestionId(filteredQuestions[activeIndex + 1].id);
      } else if (k === 'g' && answerRevealed) {
        e.preventDefault();
        onMarkGotIt(currentQuestion.id);
        if (activeIndex < filteredQuestions.length - 1) {
          onSelectQuestionId(filteredQuestions[activeIndex + 1].id);
        }
      } else if (k === 'f' && answerRevealed) {
        e.preventDefault();
        onMarkForgot(currentQuestion.id);
        if (activeIndex < filteredQuestions.length - 1) {
          onSelectQuestionId(filteredQuestions[activeIndex + 1].id);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [
    currentQuestion,
    answerRevealed,
    hintShown,
    tryPromptNeeded,
    activeIndex,
    filteredQuestions,
    progress.questionDrafts,
    progress.questionSelfChecks,
    onSelectQuestionId,
    onMarkGotIt,
    onMarkForgot,
  ]);

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
        No questions match this filter. Try selecting All Units.
      </div>
    );
  }

  const userDraft = progress.questionDrafts[currentQuestion.id] || '';
  const checkedOutline = progress.questionSelfChecks[currentQuestion.id] || [];

  const hasAttempted =
    userDraft.trim().length > 0 || checkedOutline.length > 0 || hintShown;
  const isMastered = progress.masteredQuestions.includes(currentQuestion.id);
  const isForgot = progress.forgotQuestions.includes(currentQuestion.id);

  const handleRevealClick = () => {
    if (!hasAttempted && !tryPromptNeeded) {
      setHintShown(true);
      setTryPromptNeeded(true);
      return;
    }
    setAnswerRevealed(true);
    setExamTimerRunning(false);
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      onSelectQuestionId(filteredQuestions[activeIndex - 1].id);
    }
  };

  const goNext = () => {
    if (activeIndex < filteredQuestions.length - 1) {
      onSelectQuestionId(filteredQuestions[activeIndex + 1].id);
    }
  };

  const timerMins = String(Math.floor(examTimerSec / 60)).padStart(2, '0');
  const timerSecs = String(examTimerSec % 60).padStart(2, '0');

  const spokenText = answerRevealed
    ? `Question: ${currentQuestion.question}. Answer: ${currentQuestion.blocks
        .map((b) => (b.type === 'paragraph' || b.type === 'bullet' ? b.text : ''))
        .filter(Boolean)
        .join(' ')}`
    : `Question: ${currentQuestion.question}. ${hintShown ? `Hint: ${currentQuestion.hint}` : ''}`;

  return (
    <div className={focusView ? 'mx-auto max-w-3xl space-y-4' : 'space-y-5'}>
      {/* Mode Switcher Tabs */}
      {!focusView && (
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs">
          {[
            { marks: 2 as const, title: '2-Mark Recall', sub: 'Quick concepts (30)' },
            { marks: 5 as const, title: '5-Mark Outlines', sub: 'Structure & steps (40)' },
            { marks: 10 as const, title: '10-Mark Timed', sub: 'Full exam writing (20)' },
          ].map((tab) => {
            const active = marksMode === tab.marks;
            return (
              <button
                key={tab.marks}
                type="button"
                onClick={() => onChangeMarksMode(tab.marks)}
                className={`rounded-xl px-2.5 py-2.5 text-left transition-colors cursor-pointer ${
                  active ? 'bg-teal-700 text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs sm:text-sm font-semibold">{tab.title}</div>
                <div
                  className={`text-[11px] hidden sm:block ${
                    active ? 'text-teal-100' : 'text-slate-400'
                  }`}
                >
                  {tab.sub}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Unit Filter Pills */}
      {!focusView && (
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => onChangeUnitFilter('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
              unitFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Units
          </button>
          {UNITS.map((u) => (
            <button
              key={u.unit}
              type="button"
              onClick={() => onChangeUnitFilter(u.unit)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                unitFilter === u.unit
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              Unit {u.roman}
            </button>
          ))}
        </div>
      )}

      {/* Main Practice Card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-5">
        {/* Card top metadata & pagination */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
              Unit {currentQuestion.unitRoman} · {currentQuestion.qNum}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              {currentQuestion.marks} Marks
            </span>
            {currentQuestion.isHighYield && (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                High-Yield
              </span>
            )}
            {currentQuestion.checkNote && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-300 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
                <AlertTriangle className="h-3 w-3" />
                Check this answer
              </span>
            )}
            {isMastered && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                <CheckCircle2 className="h-3 w-3" />
                Got it
              </span>
            )}
            {isForgot && (
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-800">
                In Forgot-This
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ReadAloudButton text={spokenText} />
            <span className="font-mono">
              {activeIndex + 1} / {filteredQuestions.length}
            </span>
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous question"
              className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === filteredQuestions.length - 1}
              aria-label="Next question"
              className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 10-Mark Calm Exam Pacing Timer */}
        {marksMode === 10 && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-950">
              <Clock className="h-4 w-4 text-indigo-700" />
              <span className="font-medium">10-Mark Answer Timer:</span>
              <span
                className={`font-mono text-base font-semibold tabular-nums ${
                  examTimerSec === 0 ? 'text-rose-700' : 'text-indigo-900'
                }`}
              >
                {timerMins}:{timerSecs}
              </span>
              {examTimerSec === 0 && (
                <span className="text-xs font-medium text-teal-800">
                  12 minutes complete — ready to self-check your points.
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setExamTimerRunning((r) => !r)}
                className="inline-flex items-center gap-1 rounded-lg bg-indigo-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-800 cursor-pointer"
              >
                {examTimerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {examTimerRunning ? 'Pause' : 'Start 12m'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setExamTimerRunning(false);
                  setExamTimerSec(TEN_MARK_DEFAULT_SECONDS);
                }}
                aria-label="Reset 10-mark timer"
                className="rounded-lg border border-indigo-200 bg-white p-1.5 text-indigo-700 hover:bg-indigo-50 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Question Prompt */}
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h1>
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenLesson(currentQuestion.lessonId)}
              className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:text-teal-900 hover:underline cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Need basics first? Open beginner lesson
            </button>
            {currentQuestion.numericalId && (
              <button
                type="button"
                onClick={() => onOpenNumerical(currentQuestion.numericalId!)}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-xs font-medium text-indigo-800 hover:bg-indigo-100 cursor-pointer"
              >
                <Calculator className="h-3.5 w-3.5" />
                Practice this calculation step-by-step
              </button>
            )}
          </div>
        </div>

        {/* Try-first area (saved automatically!) */}
        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="recall-notes"
              className="text-xs font-semibold uppercase tracking-wider text-slate-600"
            >
              {marksMode === 2
                ? 'Step 1: Recall in your own words (keywords or 2 short sentences)'
                : marksMode === 5
                  ? 'Step 1: Sketch your 5-mark answer structure before peeking'
                  : 'Step 1: Plan your 10-mark sections, diagram, and example'}
            </label>
            <span className="text-[11px] text-slate-500">
              Auto-saved locally · Explain in your own words
            </span>
          </div>

          <textarea
            id="recall-notes"
            rows={marksMode === 2 ? 2 : 3}
            value={userDraft}
            onChange={(e) => {
              onSaveDraft(currentQuestion.id, e.target.value);
              setTryPromptNeeded(false);
            }}
            placeholder={
              marksMode === 2
                ? 'Type the main idea + one quick example in your own words...'
                : 'Jot down your headings, diagram idea, formula, or steps...'
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none"
          />

          {/* Hint & Reveal Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setHintShown((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs sm:text-sm font-medium text-amber-900 hover:bg-amber-100 cursor-pointer"
            >
              <Lightbulb className="h-4 w-4 text-amber-700" />
              {hintShown ? 'Hide Hint' : 'Show Hint First'}
            </button>

            {!answerRevealed && (
              <button
                type="button"
                onClick={handleRevealClick}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-slate-800 cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                Reveal Answer Key
              </button>
            )}

            {progress.preferences.aiTutorEnabled && userDraft.trim().length > 0 && (
              <button
                type="button"
                onClick={() => onAskTutorAboutDraft(userDraft.trim())}
                className="inline-flex items-center gap-1.5 rounded-xl border border-teal-300 bg-teal-50 px-3.5 py-2 text-xs sm:text-sm font-medium text-teal-800 hover:bg-teal-100/70 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-teal-600" />
                Check my draft with AI Tutor
              </button>
            )}
          </div>

          <p className="hidden lg:block text-[11px] text-slate-600">
            Shortcuts: <kbd className="font-mono font-semibold">H</kbd> hint ·{' '}
            <kbd className="font-mono font-semibold">R</kbd> reveal ·{' '}
            <kbd className="font-mono font-semibold">←/→</kbd> prev/next ·{' '}
            <kbd className="font-mono font-semibold">G</kbd> got it ·{' '}
            <kbd className="font-mono font-semibold">F</kbd> forgot
          </p>

          {tryPromptNeeded && !answerRevealed && (
            <p className="text-xs font-medium text-amber-800">
              Here is a hint first — picture your answer for a moment, then click “Reveal Answer Key” again to self-check!
            </p>
          )}

          {/* Hint Card with Tappable Glossary Terms */}
          {hintShown && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-sm text-amber-950 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Hint & Recall Clues
              </div>
              <p className="leading-relaxed">{currentQuestion.hint}</p>
              {currentQuestion.keywords.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] text-amber-800/90 mr-0.5">Tap term:</span>
                  {currentQuestion.keywords.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => onOpenTerm(kw)}
                      className="inline-flex items-center gap-1 rounded-full bg-white/90 border border-amber-200 px-2.5 py-0.5 text-[11px] font-medium text-amber-900 hover:border-teal-500 cursor-pointer"
                    >
                      <BookMarked className="h-2.5 w-2.5 text-teal-700" />
                      {kw}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Revealed Faithful Answer Key + Mark-Based Self-Check Rubric */}
        {answerRevealed && (
          <div className="space-y-4 rounded-2xl border border-teal-200 bg-teal-50/20 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-100 pb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                Faithful Answer Key · {currentQuestion.qNum} ({currentQuestion.marks}M)
              </span>
              <span className="text-xs text-slate-500">
                Compare structure & key points — your own wording works great!
              </span>
            </div>

            <AnswerBlocksRenderer
              blocks={currentQuestion.blocks}
              checkNote={currentQuestion.checkNote}
            />

            {/* Mark-Based Self-Check Checklist (shows missing points calmly) */}
            <MarkSelfCheck
              marks={currentQuestion.marks}
              outlinePoints={currentQuestion.outlinePoints}
              checkedIndices={checkedOutline}
              onToggleIndex={(idx) => onToggleSelfCheck(currentQuestion.id, idx)}
            />

            {/* Self-Assessment Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-teal-100 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onMarkGotIt(currentQuestion.id);
                    if (activeIndex < filteredQuestions.length - 1) goNext();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  Got it! {activeIndex < filteredQuestions.length - 1 ? 'Next →' : ''}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onMarkForgot(currentQuestion.id);
                    if (activeIndex < filteredQuestions.length - 1) goNext();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-800 hover:bg-rose-100 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  Forgot this (Save to review)
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Compact Question Jumper Strip */}
      {!focusView && (
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
          <p className="mb-2 text-xs font-medium text-slate-500">
            Jump to any {marksMode}-mark question in this set:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {filteredQuestions.map((q) => {
              const active = q.id === currentQuestion.id;
              const known = progress.masteredQuestions.includes(q.id);
              const missed = progress.forgotQuestions.includes(q.id);
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onSelectQuestionId(q.id)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
                    active
                      ? 'border-teal-600 bg-teal-700 text-white'
                      : missed
                        ? 'border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100'
                        : known
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  U{q.unit} {q.qNum}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
