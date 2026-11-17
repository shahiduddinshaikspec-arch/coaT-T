import React, { useMemo, useState } from 'react';
import { BookMarked, Search, X } from 'lucide-react';
import { GLOSSARY } from '../data/glossary';
import type { GlossaryEntry } from '../types';
import { ReadAloudButton } from './ReadAloudButton';

interface Props {
  open: boolean;
  selectedEntry: GlossaryEntry | null;
  onSelectEntry: (entry: GlossaryEntry | null) => void;
  onClose: () => void;
}

export const GlossaryModal: React.FC<Props> = ({
  open,
  selectedEntry,
  onSelectEntry,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.shortExplanation.toLowerCase().includes(q) ||
        (g.aliases && g.aliases.some((a) => a.toLowerCase().includes(q)))
    );
  }, [search]);

  if (!open) return null;

  const isBrowseMode = showAll || !selectedEntry;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="COA Quick Glossary"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/45 p-0 sm:p-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg max-h-[85vh] flex flex-col rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-teal-600" />
            <h2 className="text-sm font-semibold text-slate-900">
              {isBrowseMode ? `COA Quick Glossary (${GLOSSARY.length} terms)` : 'Quick Term Guide'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {!isBrowseMode && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="text-xs font-medium text-teal-700 hover:underline cursor-pointer"
              >
                Browse all terms
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setShowAll(false);
                onClose();
              }}
              aria-label="Close glossary"
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        {!isBrowseMode && selectedEntry ? (
          <div className="p-5 space-y-4 overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
                Unit {selectedEntry.unit}
              </span>
              <ReadAloudButton
                text={`${selectedEntry.term}. ${selectedEntry.shortExplanation} Example: ${selectedEntry.example}`}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">{selectedEntry.term}</h3>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-700">
                {selectedEntry.shortExplanation}
              </p>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-800">
                Concrete Example
              </div>
              <p className="mt-1 text-sm leading-relaxed text-indigo-950/90">
                {selectedEntry.example}
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 cursor-pointer"
              >
                Back to studying
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="border-b border-slate-100 p-3.5">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a technical term (e.g. Booth, MUX, DMA, RTL)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-800 focus:border-teal-600 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 px-4 py-2">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  No matching term found. Try a shorter keyword.
                </p>
              ) : (
                filtered.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => {
                      onSelectEntry(entry);
                      setShowAll(false);
                    }}
                    className="w-full py-3 text-left hover:bg-slate-50/70 rounded-lg px-2 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900">{entry.term}</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                        Unit {entry.unit}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 line-clamp-2">
                      {entry.shortExplanation}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
