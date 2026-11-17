import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookMarked, BookOpen, Calculator, GraduationCap, Search, X } from 'lucide-react';
import { GLOSSARY } from '../data/glossary';
import { LESSONS } from '../data/lessons';
import { NUMERICALS } from '../data/numericals';
import { QUESTIONS } from '../data/questions';
import type { GlossaryEntry } from '../types';
import { useDialogA11y } from '../utils/useDialogA11y';

export type JumpTarget =
  | { kind: 'lesson'; id: string }
  | { kind: 'numerical'; id: string }
  | { kind: 'question'; id: string }
  | { kind: 'glossary'; entry: GlossaryEntry };

interface SearchResult {
  key: string;
  label: string;
  sub: string;
  badge: string;
  target: JumpTarget;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (target: JumpTarget) => void;
}

export const QuickJumpModal: React.FC<Props> = ({ open, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useDialogA11y(open, dialogRef, onClose);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    const out: SearchResult[] = [];

    // 1. Lessons
    for (const l of LESSONS) {
      const hay = `lesson ${l.unit}.${l.order} ${l.title} ${l.bigIdea}`.toLowerCase();
      if (!q || hay.includes(q)) {
        out.push({
          key: `l:${l.id}`,
          label: `Lesson ${l.unit}.${l.order}: ${l.title}`,
          sub: l.bigIdea,
          badge: `Unit ${l.unit} Lesson`,
          target: { kind: 'lesson', id: l.id },
        });
      }
    }

    // 2. Numericals
    for (const n of NUMERICALS) {
      const hay = `${n.title} ${n.qNum} ${n.category} unit ${n.unit} ${n.marks}m`.toLowerCase();
      if (!q || hay.includes(q)) {
        out.push({
          key: `n:${n.id}`,
          label: n.title,
          sub: `Unit ${n.unit} ${n.qNum} · ${n.category}`,
          badge: `${n.marks}M Math`,
          target: { kind: 'numerical', id: n.id },
        });
      }
    }

    // 3. Questions (prioritize high-yield when query is empty)
    const qSource = q ? QUESTIONS : QUESTIONS.filter((item) => item.isHighYield).slice(0, 8);
    for (const item of qSource) {
      const hay =
        `unit ${item.unit} ${item.qNum} ${item.marks}m ${item.question} ${item.keywords.join(' ')}`.toLowerCase();
      if (!q || hay.includes(q)) {
        out.push({
          key: `q:${item.id}`,
          label: `U${item.unit} ${item.qNum} (${item.marks}M): ${item.question}`,
          sub: item.unitTitle,
          badge: item.isHighYield ? `High-Yield ${item.marks}M` : `${item.marks}M Question`,
          target: { kind: 'question', id: item.id },
        });
      }
    }

    // 4. Glossary terms (when searching)
    if (q) {
      for (const g of GLOSSARY) {
        const hay = `${g.term} ${(g.aliases || []).join(' ')} ${g.shortExplanation}`.toLowerCase();
        if (hay.includes(q)) {
          out.push({
            key: `g:${g.id}`,
            label: g.term,
            sub: g.shortExplanation,
            badge: 'Glossary',
            target: { kind: 'glossary', entry: g },
          });
        }
      }
    }

    return out.slice(0, 14);
  }, [query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  if (!open) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(Math.max(results.length - 1, 0), i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      e.preventDefault();
      onSelect(results[activeIdx].target);
      onClose();
    }
  };

  const iconFor = (kind: JumpTarget['kind']) => {
    if (kind === 'lesson') return <BookOpen className="h-4 w-4 text-teal-600 shrink-0" />;
    if (kind === 'numerical') return <Calculator className="h-4 w-4 text-indigo-600 shrink-0" />;
    if (kind === 'glossary') return <BookMarked className="h-4 w-4 text-emerald-600 shrink-0" />;
    return <GraduationCap className="h-4 w-4 text-amber-600 shrink-0" />;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick jump search"
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/45 pt-16 sm:pt-24 px-3 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-slate-200 px-3.5 py-2.5">
          <Search className="h-4 w-4 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to any lesson, numerical, Q#, or term (e.g. Booth, DMA, Gray, Q.3)..."
            aria-label="Search lessons, questions, numericals, and glossary"
            className="flex-1 bg-transparent py-1 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none border-0!"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick search"
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {results.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-600">
              No matches for “{query}”. Try a shorter word like “Booth”, “DMA”, or “MUX”.
            </p>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onSelect(item.target);
                  onClose();
                }}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  idx === activeIdx ? 'bg-teal-50/80' : 'hover:bg-slate-50'
                }`}
              >
                <div className="mt-0.5">{iconFor(item.target.kind)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1">
                      {item.label}
                    </span>
                    <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600 line-clamp-1">{item.sub}</p>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-3.5 py-2 text-[11px] text-slate-600">
          <span>↑↓ navigate · Enter open · Esc close</span>
          <span className="font-mono">Ctrl+K / /</span>
        </div>
      </div>
    </div>
  );
};
