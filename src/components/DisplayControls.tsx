import React, { useEffect, useRef, useState } from 'react';
import { BookMarked, Eye, Moon, SlidersHorizontal, Sparkles, Sun, Type, X } from 'lucide-react';
import type { DisplayPreferences, FontScale } from '../types';

interface Props {
  preferences: DisplayPreferences;
  onUpdatePreferences: (patch: Partial<DisplayPreferences>) => void;
  onOpenGlossaryBrowser: () => void;
}

export const DisplayControls: React.FC<Props> = ({
  preferences,
  onUpdatePreferences,
  onOpenGlossaryBrowser,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Reading comfort settings"
        title="Font size, dark theme, focus view & glossary"
        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
          preferences.focusView
            ? 'border-indigo-300 bg-indigo-50 text-indigo-800'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
        <span className="hidden sm:inline">View</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg z-50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Reading Comfort
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close comfort settings"
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Font Size Controls */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <Type className="h-3.5 w-3.5 text-teal-600" />
              Text Size
            </div>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1">
              {(
                [
                  { id: 'normal', label: 'A  Normal' },
                  { id: 'large', label: 'A+ Large' },
                  { id: 'xlarge', label: 'A++ XL' },
                ] as { id: FontScale; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onUpdatePreferences({ fontScale: opt.id })}
                  className={`rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    preferences.fontScale === opt.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-700">Theme</div>
            <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => onUpdatePreferences({ theme: 'light' })}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  preferences.theme === 'light'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                Calm Light
              </button>
              <button
                type="button"
                onClick={() => onUpdatePreferences({ theme: 'dark' })}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  preferences.theme === 'dark'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                Calm Dark
              </button>
            </div>
          </div>

          {/* Low-Distraction Focus View */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <Eye className="h-3.5 w-3.5 text-indigo-600" />
                Low-Distraction View
              </div>
              <p className="text-[11px] text-slate-500">
                Hides sidebars & extra chrome while studying
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.focusView}
              onClick={() => onUpdatePreferences({ focusView: !preferences.focusView })}
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${
                preferences.focusView ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform mt-0.5 ${
                  preferences.focusView ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Optional AI Tutor On / Off */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                Optional AI Tutor
              </div>
              <p className="text-[11px] text-slate-500">
                Uses server GEMINI_API_KEY when on
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.aiTutorEnabled}
              aria-label="Enable optional AI tutor"
              onClick={() =>
                onUpdatePreferences({ aiTutorEnabled: !preferences.aiTutorEnabled })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors cursor-pointer ${
                preferences.aiTutorEnabled ? 'bg-teal-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform mt-0.5 ${
                  preferences.aiTutorEnabled ? 'translate-x-5.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Quick Glossary Button */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenGlossaryBrowser();
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <BookMarked className="h-3.5 w-3.5 text-teal-600" />
            Open COA Quick Glossary
          </button>
        </div>
      )}
    </div>
  );
};
