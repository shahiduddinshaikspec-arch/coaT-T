import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronUp,
  Flame,
  ListChecks,
  Search,
} from 'lucide-react';
import { HIGH_YIELD_TOPICS } from '../data/highYield';
import { QUESTIONS, UNITS } from '../data/questions';
import type { StudyProgress } from '../types';
import { AnswerBlocksRenderer } from './AnswerBlocksRenderer';

interface Props {
  progress: StudyProgress;
  onToggleHighYield: (id: string) => void;
  onToggleQuestionChecked: (qid: string) => void;
  onOpenLesson: (lessonId: string) => void;
  onOpenQuestionPractice: (qid: string) => void;
  onOpenNumerical: (nid: string) => void;
}

export const ChecklistView: React.FC<Props> = ({
  progress,
  onToggleHighYield,
  onToggleQuestionChecked,
  onOpenLesson,
  onOpenQuestionPractice,
  onOpenNumerical,
}) => {
  const [tab, setTab] = useState<'high-yield' | 'all'>('high-yield');
  const [unitFilter, setUnitFilter] = useState<number | 'all'>('all');
  const [marksFilter, setMarksFilter] = useState<2 | 5 | 10 | 'all'>('all');
  const [specialFilter, setSpecialFilter] = useState<'all' | 'high-yield' | 'check' | 'unchecked'>('all');
  const [search, setSearch] = useState('');
  const [expandedQid, setExpandedQid] = useState<string | null>(null);

  const filteredHighYield = useMemo(() => {
    return HIGH_YIELD_TOPICS.filter((t) => unitFilter === 'all' || t.unit === unitFilter);
  }, [unitFilter]);

  const filteredQuestions = useMemo(() => {
    const qLower = search.trim().toLowerCase();
    return QUESTIONS.filter((q) => {
      if (unitFilter !== 'all' && q.unit !== unitFilter) return false;
      if (marksFilter !== 'all' && q.marks !== marksFilter) return false;
      if (specialFilter === 'high-yield' && !q.isHighYield) return false;
      if (specialFilter === 'check' && !q.checkNote) return false;
      if (specialFilter === 'unchecked' && progress.checkedQuestions.includes(q.id)) return false;
      if (qLower) {
        const hay = `${q.qNum} ${q.question} ${q.keywords.join(' ')} ${q.unitTitle}`.toLowerCase();
        if (!hay.includes(qLower)) return false;
      }
      return true;
    });
  }, [unitFilter, marksFilter, specialFilter, search, progress.checkedQuestions]);

  return (
    <div className="space-y-5">
      {/* Top Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setTab('high-yield')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              tab === 'high-yield'
                ? 'bg-teal-700 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Flame className="h-4 w-4" />
            High-Yield Priority ({progress.checkedHighYield.length}/{HIGH_YIELD_TOPICS.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('all')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              tab === 'all'
                ? 'bg-teal-700 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <ListChecks className="h-4 w-4" />
            All 90 Questions ({progress.checkedQuestions.length}/90)
          </button>
        </div>

        {/* Unit Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setUnitFilter('all')}
            className={`rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer ${
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
              onClick={() => setUnitFilter(u.unit)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium cursor-pointer ${
                unitFilter === u.unit
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              U{u.roman}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: HIGH-YIELD PRIORITY SPRINT */}
      {tab === 'high-yield' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-xs sm:text-sm text-amber-950">
            <span className="font-semibold">Exam Sprint Strategy:</span> These{' '}
            {HIGH_YIELD_TOPICS.length} topics repeat across the 5-mark and 10-mark sections in{' '}
            <span className="font-medium">COA_Answer_Key_SR25.docx</span>. Mastering these first
            gives you the highest score return before Thursday!
          </div>

          <div className="space-y-2.5">
            {filteredHighYield.map((topic) => {
              const checked = progress.checkedHighYield.includes(topic.id);
              const firstQ = topic.questionIds[0];
              return (
                <div
                  key={topic.id}
                  className={`rounded-2xl border p-4 transition-colors shadow-xs ${
                    checked
                      ? 'border-emerald-200 bg-emerald-50/40'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleHighYield(topic.id)}
                      aria-label={`Mark ${topic.title} ready`}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500 cursor-pointer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-700">
                          Unit {topic.unit}
                        </span>
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
                          {topic.marksBadge}
                        </span>
                      </div>
                      <h3
                        className={`mt-1 text-sm sm:text-base font-semibold ${
                          checked ? 'text-slate-500 line-through' : 'text-slate-900'
                        }`}
                      >
                        {topic.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-600">{topic.whyHighYield}</p>

                      {/* Action shortcuts */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenLesson(topic.lessonId)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-teal-600" />
                          Lesson
                        </button>
                        {firstQ && (
                          <button
                            type="button"
                            onClick={() => onOpenQuestionPractice(firstQ)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                          >
                            Practice ({topic.questionIds.length} Qs)
                          </button>
                        )}
                        {topic.numericalIds && topic.numericalIds[0] && (
                          <button
                            type="button"
                            onClick={() => onOpenNumerical(topic.numericalIds![0])}
                            className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-800 hover:bg-indigo-100 cursor-pointer"
                          >
                            <Calculator className="h-3.5 w-3.5" />
                            Step-by-Step Math
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BROWSE ALL 90 QUESTIONS */}
      {tab === 'all' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-2.5 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xs">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search any topic, formula, or Q# (e.g. Booth, DMA, Gray, Q.3)..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-800 focus:border-teal-600 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(['all', 2, 5, 10] as const).map((m) => (
                <button
                  key={String(m)}
                  type="button"
                  onClick={() => setMarksFilter(m)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer ${
                    marksFilter === m
                      ? 'bg-teal-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {m === 'all' ? 'All Marks' : `${m}M`}
                </button>
              ))}

              <select
                value={specialFilter}
                onChange={(e) => setSpecialFilter(e.target.value as typeof specialFilter)}
                aria-label="Filter by status"
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-teal-600 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="high-yield">High-Yield Only</option>
                <option value="check">Check This Answer (4)</option>
                <option value="unchecked">Unchecked Only</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filteredQuestions.length}</span>{' '}
            of 90 course questions. Click any question to inspect its faithful answer key.
          </p>

          {/* Compact Question Rows */}
          <div className="space-y-2">
            {filteredQuestions.map((q) => {
              const checked = progress.checkedQuestions.includes(q.id);
              const expanded = expandedQid === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                >
                  <div className="flex items-start gap-3 p-3.5">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleQuestionChecked(q.id)}
                      aria-label={`Check off Unit ${q.unit} ${q.qNum}`}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500 cursor-pointer"
                    />

                    <button
                      type="button"
                      onClick={() => setExpandedQid(expanded ? null : q.id)}
                      className="min-w-0 flex-1 text-left cursor-pointer"
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-700">
                          U{q.unit} · {q.qNum}
                        </span>
                        <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[11px] font-semibold text-teal-800">
                          {q.marks}M
                        </span>
                        {q.isHighYield && (
                          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
                            High-Yield
                          </span>
                        )}
                        {q.checkNote && (
                          <span className="inline-flex items-center gap-0.5 rounded bg-amber-50 border border-amber-300 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900">
                            <AlertTriangle className="h-3 w-3" />
                            Check this answer
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-1 text-sm leading-snug ${
                          checked ? 'text-slate-500 line-through' : 'text-slate-900 font-medium'
                        }`}
                      >
                        {q.question}
                      </p>
                    </button>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenQuestionPractice(q.id)}
                        className="hidden sm:inline-flex rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        Practice
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpandedQid(expanded ? null : q.id)}
                        aria-label={expanded ? 'Collapse answer' : 'Expand answer'}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
                      >
                        {expanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="border-t border-slate-100 bg-slate-50/70 p-4 space-y-3">
                      <AnswerBlocksRenderer
                        blocks={q.blocks}
                        checkNote={q.checkNote}
                        compact
                      />
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/70">
                        <button
                          type="button"
                          onClick={() => onOpenQuestionPractice(q.id)}
                          className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-800 cursor-pointer"
                        >
                          Practice Recall
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenLesson(q.lessonId)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          Open Beginner Lesson
                        </button>
                        {q.numericalId && (
                          <button
                            type="button"
                            onClick={() => onOpenNumerical(q.numericalId!)}
                            className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-800 hover:bg-indigo-100 cursor-pointer"
                          >
                            Step-by-Step Numerical
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
