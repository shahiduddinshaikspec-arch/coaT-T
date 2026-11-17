import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Calculator,
  CheckCircle2,
  Circle,
  Clock,
  Feather,
  Lightbulb,
  Link2,
  Sparkles,
} from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { NUMERICALS } from '../data/numericals';
import { QUESTIONS, UNITS } from '../data/questions';
import { SIMPLE_LESSONS } from '../data/simpleLessons';
import type { StudyProgress } from '../types';
import { ReadAloudButton } from './ReadAloudButton';

interface Props {
  selectedUnit: number;
  selectedLessonId: string;
  progress: StudyProgress;
  focusView: boolean;
  onSelectUnit: (unit: number) => void;
  onSelectLesson: (lessonId: string) => void;
  onToggleLessonComplete: (lessonId: string) => void;
  onJumpToQuestion: (questionId: string) => void;
  onJumpToNumerical: (numericalId: string) => void;
  onOpenTerm: (termText: string) => void;
}

export const LessonsView: React.FC<Props> = ({
  selectedUnit,
  selectedLessonId,
  progress,
  focusView,
  onSelectUnit,
  onSelectLesson,
  onToggleLessonComplete,
  onJumpToQuestion,
  onJumpToNumerical,
  onOpenTerm,
}) => {
  const unitLessons = LESSONS.filter((l) => l.unit === selectedUnit).sort(
    (a, b) => a.order - b.order
  );
  const currentLesson =
    LESSONS.find((l) => l.id === selectedLessonId) || unitLessons[0] || LESSONS[0];

  const [simpleMode, setSimpleMode] = useState(false);
  const [revealedCalcSteps, setRevealedCalcSteps] = useState(1);

  useEffect(() => {
    setSimpleMode(false);
    setRevealedCalcSteps(1);
  }, [currentLesson.id]);

  const simpleGuide = SIMPLE_LESSONS[currentLesson.id];

  const currentIdx = LESSONS.findIndex((l) => l.id === currentLesson.id);
  const nextLesson =
    currentIdx >= 0 && currentIdx < LESSONS.length - 1 ? LESSONS[currentIdx + 1] : null;
  const isCompleted = progress.completedLessons.includes(currentLesson.id);

  const prereqLessons = currentLesson.prerequisiteIds
    .map((pid) => LESSONS.find((l) => l.id === pid))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const linkedQuestions = currentLesson.linkedQuestionIds
    .map((qid) => QUESTIONS.find((q) => q.id === qid))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const linkedNumericals = (currentLesson.linkedNumericalIds || [])
    .map((nid) => NUMERICALS.find((n) => n.id === nid))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const unitMeta = UNITS.find((u) => u.unit === currentLesson.unit);

  const readAloudText = simpleMode && simpleGuide
    ? `${currentLesson.title}. Simpler explanation: ${simpleGuide.plainSummary.join(' ')} Analogy: ${simpleGuide.everydayAnalogy}`
    : `${currentLesson.title}. Big idea: ${currentLesson.bigIdea} ${currentLesson.plainEnglish.join(' ')} Analogy: ${currentLesson.analogy.title}. ${currentLesson.analogy.body}`;

  return (
    <div className="space-y-5">
      {/* Unit selector bar (hidden in low-distraction focus view) */}
      {!focusView && (
        <div className="flex flex-wrap items-center gap-2">
          {UNITS.map((u) => {
            const uLessons = LESSONS.filter((l) => l.unit === u.unit);
            const uDone = uLessons.filter((l) => progress.completedLessons.includes(l.id)).length;
            const active = currentLesson.unit === u.unit;
            return (
              <button
                key={u.unit}
                type="button"
                onClick={() => {
                  onSelectUnit(u.unit);
                  const firstOfUnit = LESSONS.find((l) => l.unit === u.unit);
                  if (firstOfUnit) onSelectLesson(firstOfUnit.id);
                }}
                className={`rounded-xl border px-3 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  active
                    ? 'border-teal-600 bg-teal-700 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Unit {u.roman}
                <span
                  className={`ml-1.5 font-mono text-[11px] ${
                    active ? 'text-teal-100' : 'text-slate-400'
                  }`}
                >
                  {uDone}/{uLessons.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className={focusView ? 'mx-auto max-w-3xl' : 'grid gap-5 lg:grid-cols-12 items-start'}>
        {/* Left Sidebar: Prerequisite-Ordered Lesson Path */}
        {!focusView && (
          <aside className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                Unit {unitMeta?.roman} Learning Path
              </p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">{unitMeta?.title}</p>
              <p className="mt-1 text-xs text-slate-600">
                Ordered from foundational basics to exam topics.
              </p>
            </div>

            <div className="space-y-2">
              {unitLessons.map((lesson) => {
                const done = progress.completedLessons.includes(lesson.id);
                const active = lesson.id === currentLesson.id;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`flex w-full items-start gap-2.5 rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-teal-500 bg-teal-50/70'
                        : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/70'
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <Circle
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          active ? 'text-teal-600' : 'text-slate-300'
                        }`}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          Lesson {lesson.unit}.{lesson.order}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ~{lesson.estimatedMinutes}m
                        </span>
                      </div>
                      <p
                        className={`mt-0.5 text-xs sm:text-sm font-medium leading-snug ${
                          active ? 'text-teal-950' : 'text-slate-800'
                        }`}
                      >
                        {lesson.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Right Content: Beginner Lesson Reader */}
        <article
          className={`${
            focusView ? '' : 'lg:col-span-8'
          } rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-6`}
        >
          {/* Header & Action Pills */}
          <header className="border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
                  Lesson {currentLesson.unit}.{currentLesson.order}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  {currentLesson.estimatedMinutes} min read
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ReadAloudButton text={readAloudText} />
                <button
                  type="button"
                  onClick={() => onToggleLessonComplete(currentLesson.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {isCompleted ? 'Understood' : 'Mark Understood'}
                </button>
              </div>
            </div>

            <h1 className="mt-2.5 text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
              {currentLesson.title}
            </h1>

            {/* "Explain it more simply" button + Prerequisite chips */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {simpleGuide && (
                <button
                  type="button"
                  onClick={() => {
                    setSimpleMode((v) => !v);
                    setRevealedCalcSteps(1);
                  }}
                  aria-expanded={simpleMode}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    simpleMode
                      ? 'border-indigo-500 bg-indigo-700 text-white'
                      : 'border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                  }`}
                >
                  <Feather className="h-3.5 w-3.5" />
                  {simpleMode ? 'Hide simpler explanation' : 'Explain it more simply'}
                </button>
              )}

              {prereqLessons.length > 0 ? (
                prereqLessons.map((pl) => {
                  const plDone = progress.completedLessons.includes(pl.id);
                  return (
                    <button
                      key={pl.id}
                      type="button"
                      onClick={() => {
                        onSelectUnit(pl.unit);
                        onSelectLesson(pl.id);
                      }}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium cursor-pointer ${
                        plDone
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      {plDone ? '✓' : 'Prereq →'} Lesson {pl.unit}.{pl.order}
                    </button>
                  );
                })
              ) : (
                <span className="text-xs font-medium text-emerald-700">
                  ✓ Zero prerequisites — ideal starting point
                </span>
              )}
            </div>
          </header>

          {/* Expandable "Explain it more simply" Panel */}
          {simpleMode && simpleGuide && (
            <section className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-800">
                  <Feather className="h-4 w-4" />
                  Simpler Plain-Language Version
                </div>
                <span className="text-[11px] text-indigo-700">
                  No heavy jargon — just the core idea
                </span>
              </div>

              <div className="space-y-2.5">
                {simpleGuide.plainSummary.map((p, idx) => (
                  <p key={idx} className="text-[15px] leading-relaxed text-slate-800">
                    {p}
                  </p>
                ))}
              </div>

              {/* Unfamiliar terms decoded */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-800">
                  Unfamiliar Words Decoded
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {simpleGuide.unfamiliarTerms.map((ut, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-indigo-100 bg-white px-3 py-2 text-xs"
                    >
                      <span className="font-semibold text-slate-900">{ut.term}: </span>
                      <span className="text-slate-600">{ut.plain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fresh Everyday Analogy */}
              <div className="rounded-xl border border-teal-200 bg-white px-3.5 py-2.5 text-sm text-slate-700">
                <span className="font-semibold text-teal-800">Everyday picture: </span>
                {simpleGuide.everydayAnalogy}
              </div>

              {/* Reveal-one-step-at-a-time mini calculation walkthrough (if lesson involves math) */}
              {simpleGuide.calcWalkthrough && (
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {simpleGuide.calcWalkthrough.title}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      Showing {revealedCalcSteps} of {simpleGuide.calcWalkthrough.steps.length}
                    </span>
                  </div>

                  <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                    {simpleGuide.calcWalkthrough.steps
                      .slice(0, revealedCalcSteps)
                      .map((step, sIdx) => (
                        <li
                          key={sIdx}
                          className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 leading-relaxed"
                        >
                          {step}
                        </li>
                      ))}
                  </ol>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {revealedCalcSteps < simpleGuide.calcWalkthrough.steps.length ? (
                      <button
                        type="button"
                        onClick={() => setRevealedCalcSteps((n) => n + 1)}
                        className="rounded-lg bg-indigo-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-800 cursor-pointer"
                      >
                        Reveal next step ({revealedCalcSteps + 1}/
                        {simpleGuide.calcWalkthrough.steps.length})
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setRevealedCalcSteps(1)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Hide back to Step 1
                      </button>
                    )}

                    {linkedNumericals[0] && (
                      <button
                        type="button"
                        onClick={() => onJumpToNumerical(linkedNumericals[0].id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-800 hover:bg-indigo-100 cursor-pointer"
                      >
                        <Calculator className="h-3.5 w-3.5" />
                        Try interactive calculation →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Big Idea Box */}
          <div className="rounded-xl border border-teal-200 bg-teal-50/70 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <Sparkles className="h-3.5 w-3.5" />
              The Big Idea in One Sentence
            </div>
            <p className="mt-1.5 text-[15px] font-medium text-teal-950 leading-relaxed">
              {currentLesson.bigIdea}
            </p>
          </div>

          {/* Plain-English Explanation */}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
              <BookOpen className="h-4 w-4 text-teal-600" />
              Plain-English Explanation
            </h2>
            {currentLesson.plainEnglish.map((para, idx) => (
              <p key={idx} className="text-[15px] leading-relaxed text-slate-700">
                {para}
              </p>
            ))}
          </section>

          {/* Real-world Analogy */}
          <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-800">
              <Lightbulb className="h-3.5 w-3.5" />
              Everyday Analogy: {currentLesson.analogy.title}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-indigo-950/90">
              {currentLesson.analogy.body}
            </p>
          </section>

          {/* Important Terms (Tappable for Glossary!) */}
          <section>
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Important Terms to Remember
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] text-teal-700">
                <BookMarked className="h-3 w-3" />
                Tap any term for example
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {currentLesson.terms.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onOpenTerm(t.term)}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-left hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900 underline decoration-dotted decoration-teal-500 underline-offset-4">
                      {t.term}
                    </span>
                    <BookMarked className="h-3.5 w-3.5 shrink-0 text-teal-600 opacity-70" />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{t.meaning}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Worked Example */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-2.5">
            <h2 className="text-sm font-semibold text-slate-900">
              Worked Example: {currentLesson.workedExample.title}
            </h2>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {currentLesson.workedExample.steps.map((s, idx) => (
                <li key={idx} className="leading-relaxed">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-xs font-medium text-teal-900">
              Exam Takeaway: {currentLesson.workedExample.takeaway}
            </div>
          </section>

          {/* Visual Diagram or Table */}
          {currentLesson.diagram && (
            <figure className="diagram-card rounded-xl border border-slate-200 bg-white p-4 text-center">
              <img
                src={currentLesson.diagram.src}
                alt={currentLesson.diagram.caption}
                className="mx-auto max-h-80 w-auto max-w-full object-contain"
              />
              <figcaption className="mt-2.5 text-xs text-slate-500">
                {currentLesson.diagram.caption}
              </figcaption>
            </figure>
          )}

          {currentLesson.visualTable && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600">
                {currentLesson.visualTable.caption}
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[340px] border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      {currentLesson.visualTable.headers.map((h, i) => (
                        <th key={i} className="px-3 py-2 font-semibold text-slate-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentLesson.visualTable.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3 py-2 text-slate-700 ${
                              cIdx > 0 && /^[01\s]+$/.test(cell) ? 'font-mono' : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Linked Numericals & Exam Questions */}
          <section className="space-y-3 border-t border-slate-100 pt-5">
            {linkedNumericals.length > 0 && (
              <div>
                <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                  <Calculator className="h-3.5 w-3.5" />
                  Try the Step-by-Step Calculations for This Lesson
                </h3>
                <div className="flex flex-wrap gap-2">
                  {linkedNumericals.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => onJumpToNumerical(n.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-900 hover:bg-indigo-100 cursor-pointer"
                    >
                      <Calculator className="h-3.5 w-3.5" />
                      {n.qNum} ({n.marks}M): {n.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Link2 className="h-3.5 w-3.5" />
                Practice Linked Exam Questions ({linkedQuestions.length})
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {linkedQuestions.map((q) => {
                  const mastered = progress.masteredQuestions.includes(q.id);
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => onJumpToQuestion(q.id)}
                      className="flex items-start justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-left hover:border-teal-300 hover:bg-teal-50/30 transition-colors cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-700">
                            {q.marks}M · {q.qNum}
                          </span>
                          {q.isHighYield && (
                            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
                              High-Yield
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-slate-700 line-clamp-2">{q.question}</p>
                      </div>
                      {mastered && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Bottom Action Bar */}
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => onToggleLessonComplete(currentLesson.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                  : 'bg-teal-700 text-white hover:bg-teal-800'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {isCompleted ? 'Marked Understood' : 'Mark Lesson Understood'}
            </button>

            {nextLesson && (
              <button
                type="button"
                onClick={() => {
                  if (!isCompleted) onToggleLessonComplete(currentLesson.id);
                  onSelectUnit(nextLesson.unit);
                  onSelectLesson(nextLesson.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 cursor-pointer"
              >
                Next: Lesson {nextLesson.unit}.{nextLesson.order}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </footer>
        </article>
      </div>
    </div>
  );
};
