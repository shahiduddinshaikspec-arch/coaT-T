import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Calculator,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Edit3,
  Flame,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { HIGH_YIELD_TOPICS } from '../data/highYield';
import { LESSONS } from '../data/lessons';
import { NUMERICALS } from '../data/numericals';
import { QUESTIONS, UNITS } from '../data/questions';
import type { AppView, StudyProgress } from '../types';
import {
  formatExamDisplayIST,
  getCountdownParts,
  getDefaultThursdayExamIST,
} from '../utils/storage';

interface Props {
  progress: StudyProgress;
  showResumeBanner: boolean;
  onDismissResumeBanner: () => void;
  onUpdateExamDateTime: (istValue: string) => void;
  onContinueStudying: () => void;
  onOpenSessionPlanner: () => void;
  onOpenGlossary: () => void;
  onOpenUnitLessons: (unit: number) => void;
  onOpenUnitPractice: (unit: number, marks?: 2 | 5 | 10) => void;
  onNavigate: (view: AppView) => void;
}

const UNIT_ACCENTS: Record<number, { badge: string; bar: string; border: string }> = {
  1: { badge: 'bg-teal-50 text-teal-800 border-teal-200', bar: 'bg-teal-600', border: 'hover:border-teal-300' },
  2: { badge: 'bg-indigo-50 text-indigo-800 border-indigo-200', bar: 'bg-indigo-600', border: 'hover:border-indigo-300' },
  3: { badge: 'bg-sky-50 text-sky-800 border-sky-200', bar: 'bg-sky-600', border: 'hover:border-sky-300' },
  4: { badge: 'bg-violet-50 text-violet-800 border-violet-200', bar: 'bg-violet-600', border: 'hover:border-violet-300' },
  5: { badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', bar: 'bg-emerald-600', border: 'hover:border-emerald-300' },
};

export const HomeView: React.FC<Props> = ({
  progress,
  showResumeBanner,
  onDismissResumeBanner,
  onUpdateExamDateTime,
  onContinueStudying,
  onOpenSessionPlanner,
  onOpenGlossary,
  onOpenUnitLessons,
  onOpenUnitPractice,
  onNavigate,
}) => {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [editingExam, setEditingExam] = useState(false);
  const [draftDate, setDraftDate] = useState(progress.examDateTimeIST.slice(0, 10));
  const [draftTime, setDraftTime] = useState(progress.examDateTimeIST.slice(11, 16) || '10:00');

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setDraftDate(progress.examDateTimeIST.slice(0, 10));
    setDraftTime(progress.examDateTimeIST.slice(11, 16) || '10:00');
  }, [progress.examDateTimeIST]);

  const countdown = getCountdownParts(progress.examDateTimeIST, nowMs);
  const examDisplay = formatExamDisplayIST(progress.examDateTimeIST);

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (draftDate && draftTime) {
      onUpdateExamDateTime(`${draftDate}T${draftTime}`);
      setEditingExam(false);
    }
  };

  const handleResetExam = () => {
    const def = getDefaultThursdayExamIST();
    onUpdateExamDateTime(def);
    setEditingExam(false);
  };

  const nextUnreadLesson = LESSONS.find((l) => !progress.completedLessons.includes(l.id));
  const continueLabel = progress.lastActivity
    ? progress.lastActivity.label
    : nextUnreadLesson
      ? `Start from zero: Unit ${nextUnreadLesson.unit} · ${nextUnreadLesson.title}`
      : 'Review High-Yield Exam Checklist';

  const totalLessons = LESSONS.length;
  const totalQuestions = QUESTIONS.length;
  const totalHighYield = HIGH_YIELD_TOPICS.length;
  const totalNumericals = NUMERICALS.length;

  const overallPercent = Math.round(
    ((progress.completedLessons.length / totalLessons) * 0.4 +
      (progress.masteredQuestions.length / totalQuestions) * 0.35 +
      (progress.masteredNumericals.length / totalNumericals) * 0.15 +
      (progress.checkedHighYield.length / totalHighYield) * 0.1) *
      100
  );

  return (
    <div className="space-y-6">
      {/* Welcome-back auto-resume banner when reopening with saved progress */}
      {showResumeBanner && progress.lastActivity && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-teal-200 bg-teal-50/80 px-4 py-3 text-sm text-teal-950">
          <div className="min-w-0">
            <span className="font-semibold">Welcome back — your progress is saved.</span>{' '}
            <span className="text-teal-900/90">Last visited: {progress.lastActivity.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onDismissResumeBanner();
                onContinueStudying();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-800 cursor-pointer"
            >
              Continue where you left off
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onDismissResumeBanner}
              className="rounded-lg px-2 py-1 text-xs text-teal-800 hover:bg-teal-100/70 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Top Hero: Exam Countdown + Continue Studying & Time-Based Session Builder */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Editable Exam Countdown */}
        <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Exam Countdown (Asia/Kolkata · IST)
                </div>
                <p className="mt-2 text-sm text-slate-600">{examDisplay} IST</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingExam((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                <Edit3 className="h-3.5 w-3.5" />
                {editingExam ? 'Cancel' : 'Edit date & time'}
              </button>
            </div>

            {editingExam ? (
              <form onSubmit={handleSaveExam} className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block text-xs font-medium text-slate-600">
                    Exam Date (IST)
                    <input
                      type="date"
                      required
                      value={draftDate}
                      onChange={(e) => setDraftDate(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-teal-600 focus:outline-none"
                    />
                  </label>
                  <label className="block text-xs font-medium text-slate-600">
                    Exam Time (Asia/Kolkata)
                    <input
                      type="time"
                      required
                      value={draftTime}
                      onChange={(e) => setDraftTime(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-teal-600 focus:outline-none"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-teal-700 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-teal-800 cursor-pointer"
                  >
                    Save Exam Time
                  </button>
                  <button
                    type="button"
                    onClick={handleResetExam}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset to Thursday 10:00 AM IST
                  </button>
                </div>
              </form>
            ) : countdown.isPast ? (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                Your scheduled exam time is here. Take a steady breath — draw clean diagrams and lay out your structure step by step.
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds },
                ].map((cell) => (
                  <div
                    key={cell.label}
                    className="rounded-xl border border-slate-100 bg-slate-50/90 py-3 px-2 text-center"
                  >
                    <div className="font-mono text-2xl sm:text-3xl font-semibold text-slate-900 tabular-nums">
                      {String(cell.value).padStart(2, '0')}
                    </div>
                    <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      {cell.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Source: <span className="font-medium text-slate-700">COA Answer Key SR25</span> · 5 Units · 90 Qs
            </p>
            <button
              type="button"
              onClick={onOpenGlossary}
              className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline cursor-pointer"
            >
              <BookMarked className="h-3.5 w-3.5" />
              Quick Glossary
            </button>
          </div>
        </section>

        {/* Continue Studying & "How much time do you have?" CTA Card */}
        <section className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50/80 via-white to-white p-5 sm:p-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800">
                <Sparkles className="h-3.5 w-3.5" />
                Calm Next Step
              </span>
              <span className="font-mono text-xs font-semibold text-teal-700">
                {overallPercent}% Covered
              </span>
            </div>

            <h1 className="mt-2 text-lg sm:text-xl font-semibold text-slate-900 leading-snug">
              {progress.lastActivity
                ? 'Continue where you left off'
                : 'Starting COA from zero? Take it one step at a time.'}
            </h1>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{continueLabel}</p>

            {/* Overall readiness bar */}
            <div className="mt-3.5">
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all duration-300"
                  style={{ width: `${Math.max(overallPercent, 2)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <button
              type="button"
              onClick={onContinueStudying}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white shadow-xs hover:bg-teal-800 transition-colors cursor-pointer"
            >
              {progress.lastActivity ? 'Continue where you left off' : 'Continue studying'}
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onOpenSessionPlanner}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-teal-300 bg-teal-50/70 px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-teal-950 hover:bg-teal-100/70 transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-700" />
                How much time do you have?
              </span>
              <span className="font-mono text-[11px] font-semibold text-teal-800">
                10 · 20 · 40 · 60m
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onNavigate('checklist')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Flame className="h-3.5 w-3.5 text-amber-600" />
                High-Yield List
              </button>
              <button
                type="button"
                onClick={() => onNavigate('numericals')}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Calculator className="h-3.5 w-3.5 text-indigo-600" />
                Step-by-Step Math
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Progress Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('lessons')}
          className="rounded-xl border border-slate-200 bg-white p-3.5 text-left hover:border-teal-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <BookOpen className="h-3.5 w-3.5 text-teal-600" />
            Beginner Lessons
          </div>
          <div className="mt-1.5 text-xl font-semibold text-slate-900">
            {progress.completedLessons.length}{' '}
            <span className="text-sm font-normal text-slate-400">/ {totalLessons}</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('practice')}
          className="rounded-xl border border-slate-200 bg-white p-3.5 text-left hover:border-indigo-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
            Questions Known
          </div>
          <div className="mt-1.5 text-xl font-semibold text-slate-900">
            {progress.masteredQuestions.length}{' '}
            <span className="text-sm font-normal text-slate-400">/ {totalQuestions}</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('numericals')}
          className="rounded-xl border border-slate-200 bg-white p-3.5 text-left hover:border-violet-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Calculator className="h-3.5 w-3.5 text-violet-600" />
            Numericals Mastered
          </div>
          <div className="mt-1.5 text-xl font-semibold text-slate-900">
            {progress.masteredNumericals.length}{' '}
            <span className="text-sm font-normal text-slate-400">/ {totalNumericals}</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate(progress.forgotQuestions.length > 0 ? 'forgot' : 'checklist')}
          className="rounded-xl border border-slate-200 bg-white p-3.5 text-left hover:border-amber-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <ClipboardCheck className="h-3.5 w-3.5 text-amber-600" />
            {progress.forgotQuestions.length > 0 ? 'Forgot-This Queue' : 'High-Yield Ready'}
          </div>
          <div className="mt-1.5 text-xl font-semibold text-slate-900">
            {progress.forgotQuestions.length > 0 ? (
              <span className="text-rose-700">{progress.forgotQuestions.length} to retry</span>
            ) : (
              <>
                {progress.checkedHighYield.length}{' '}
                <span className="text-sm font-normal text-slate-400">/ {totalHighYield}</span>
              </>
            )}
          </div>
        </button>
      </section>

      {/* Five Unit Cards */}
      <section>
        <div className="mb-3.5 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              Five Course Units
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Learn the beginner lesson first, then recall 2M, 5M, and 10M answers in your own words.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {UNITS.map((u) => {
            const unitLessons = LESSONS.filter((l) => l.unit === u.unit);
            const doneLessons = unitLessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const unitQuestions = QUESTIONS.filter((q) => q.unit === u.unit);
            const doneQuestions = unitQuestions.filter((q) =>
              progress.masteredQuestions.includes(q.id)
            ).length;
            const unitHighYield = HIGH_YIELD_TOPICS.filter((h) => h.unit === u.unit).length;
            const unitPct = Math.round(
              ((doneLessons / unitLessons.length) * 0.5 +
                (doneQuestions / unitQuestions.length) * 0.5) *
                100
            );
            const accent = UNIT_ACCENTS[u.unit];

            return (
              <article
                key={u.unit}
                className={`flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-colors shadow-xs ${accent.border}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${accent.badge}`}
                    >
                      UNIT {u.roman}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {unitHighYield} high-yield topics
                    </span>
                  </div>

                  <h3 className="mt-3 text-[15px] font-semibold text-slate-900 leading-snug">
                    {u.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{u.tagline}</p>

                  {/* Unit progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                      <span>
                        Lessons {doneLessons}/{unitLessons.length} · Qs {doneQuestions}/
                        {unitQuestions.length}
                      </span>
                      <span className="font-mono font-medium">{unitPct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${accent.bar}`}
                        style={{ width: `${unitPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenUnitLessons(u.unit)}
                    className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Beginner Lessons
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenUnitPractice(u.unit, 2)}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Practice (18 Qs)
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
