import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Clock,
  GraduationCap,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import type { StudyProgress, StudySessionStep } from '../types';
import { buildTimedStudySession, type SessionDuration } from '../utils/sessionBuilder';

interface Props {
  open: boolean;
  progress: StudyProgress;
  onClose: () => void;
  onLaunchStep: (step: StudySessionStep) => void;
}

const DURATIONS: SessionDuration[] = [10, 20, 40, 60];

export const SessionPlannerModal: React.FC<Props> = ({
  open,
  progress,
  onClose,
  onLaunchStep,
}) => {
  const [duration, setDuration] = useState<SessionDuration>(20);

  const steps = useMemo(
    () => buildTimedStudySession(duration, progress),
    [duration, progress]
  );

  if (!open) return null;

  const totalMinutes = steps.reduce((acc, s) => acc + s.minutes, 0);

  const iconForKind = (kind: StudySessionStep['kind']) => {
    if (kind === 'forgot') return <RotateCcw className="h-4 w-4 text-rose-600" />;
    if (kind === 'lesson') return <BookOpen className="h-4 w-4 text-teal-600" />;
    if (kind === 'numerical') return <Calculator className="h-4 w-4 text-indigo-600" />;
    return <GraduationCap className="h-4 w-4 text-amber-600" />;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How much time do you have?"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/45 p-0 sm:p-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[88vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700">
              <Sparkles className="h-3.5 w-3.5" />
              Mini Study Session Builder
            </div>
            <h2 className="mt-0.5 text-lg font-semibold text-slate-900">
              How much time do you have?
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Prioritizes missed questions first, then topics shared by 5- and 10-mark sections.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close session builder"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Duration Selector */}
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <div className="grid grid-cols-4 gap-2">
            {DURATIONS.map((mins) => {
              const active = duration === mins;
              return (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDuration(mins)}
                  className={`rounded-xl border py-2.5 text-center transition-colors cursor-pointer ${
                    active
                      ? 'border-teal-600 bg-teal-700 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-mono text-base font-semibold">{mins}m</div>
                  <div
                    className={`text-[10px] ${
                      active ? 'text-teal-100' : 'text-slate-400'
                    }`}
                  >
                    {mins === 10
                      ? 'Quick dip'
                      : mins === 20
                        ? 'Focused'
                        : mins === 40
                          ? 'Deep block'
                          : 'Full sprint'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Planned Steps */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>
              Your {duration}-minute plan ({steps.length}{' '}
              {steps.length === 1 ? 'step' : 'steps'})
            </span>
            <span className="inline-flex items-center gap-1 font-mono font-medium text-slate-700">
              <Clock className="h-3.5 w-3.5 text-teal-600" />~{totalMinutes} min total
            </span>
          </div>

          {steps.length === 0 ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-900">
              You have already covered all prioritized items — great steady work! Feel free to browse any unit in Practice or Checklist for a light refresh.
            </div>
          ) : (
            steps.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  onLaunchStep(step);
                  onClose();
                }}
                className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left hover:border-teal-400 hover:bg-teal-50/30 transition-colors cursor-pointer"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
                  {iconForKind(step.kind)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">
                      Step {idx + 1}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                        step.kind === 'forgot'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {step.reasonTag}
                    </span>
                    <span className="ml-auto font-mono text-[11px] text-slate-500">
                      ~{step.minutes}m
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-900 leading-snug">
                    {step.title}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{step.subtitle}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5">
          <p className="text-[11px] text-slate-500">
            Start with Step 1 and go at your own pace.
          </p>
          {steps.length > 0 && (
            <button
              type="button"
              onClick={() => {
                onLaunchStep(steps[0]);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-teal-800 cursor-pointer"
            >
              Start Step 1
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
