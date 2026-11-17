import React, { useEffect, useRef, useState } from 'react';
import { Coffee, Pause, Play, RotateCcw, Timer, Volume2, VolumeX, X } from 'lucide-react';
import { playSoftChime } from '../utils/chime';

type PresetKey = '25-5' | '40-10';
type Phase = 'focus' | 'break';

const PRESETS: Record<PresetKey, { label: string; focusMin: number; breakMin: number }> = {
  '25-5': { label: '25 / 5 min', focusMin: 25, breakMin: 5 },
  '40-10': { label: '40 / 10 min', focusMin: 40, breakMin: 10 },
};

export const FocusTimer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<PresetKey>('25-5');
  const [phase, setPhase] = useState<Phase>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [completedNotice, setCompletedNotice] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          if (soundOn) playSoftChime();
          const nextPhase: Phase = phase === 'focus' ? 'break' : 'focus';
          setCompletedNotice(
            phase === 'focus'
              ? 'Focus block complete. Take a calm break!'
              : 'Break finished. Ready for the next sprint?'
          );
          setPhase(nextPhase);
          const nextMin =
            nextPhase === 'focus' ? PRESETS[preset].focusMin : PRESETS[preset].breakMin;
          return nextMin * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, phase, preset, soundOn]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSelectPreset = (nextPreset: PresetKey) => {
    setPreset(nextPreset);
    setPhase('focus');
    setRunning(false);
    setCompletedNotice(null);
    setSecondsLeft(PRESETS[nextPreset].focusMin * 60);
  };

  const handleSwitchPhase = (nextPhase: Phase) => {
    setPhase(nextPhase);
    setRunning(false);
    setCompletedNotice(null);
    const mins = nextPhase === 'focus' ? PRESETS[preset].focusMin : PRESETS[preset].breakMin;
    setSecondsLeft(mins * 60);
  };

  const handleReset = () => {
    setRunning(false);
    setCompletedNotice(null);
    const mins = phase === 'focus' ? PRESETS[preset].focusMin : PRESETS[preset].breakMin;
    setSecondsLeft(mins * 60);
  };

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${mins}:${secs} focus timer`}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
          running
            ? phase === 'focus'
              ? 'border-teal-300 bg-teal-50 text-teal-800'
              : 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        {phase === 'focus' ? (
          <Timer className="h-3.5 w-3.5 text-teal-600" />
        ) : (
          <Coffee className="h-3.5 w-3.5 text-emerald-600" />
        )}
        <span className="font-mono tabular-nums">
          {mins}:{secs}
        </span>
        {running && (
          <span className="hidden sm:inline text-[11px] uppercase tracking-wide opacity-75">
            {phase === 'focus' ? 'Focus' : 'Break'}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Calm focus timer"
          className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg z-50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Calm Focus Timer
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSoundOn((s) => !s)}
                aria-label={soundOn ? 'Mute timer chime' : 'Enable timer chime'}
                title={soundOn ? 'Mute chime' : 'Enable chime'}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close timer"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Preset switcher */}
          <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
            {(['25-5', '40-10'] as PresetKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectPreset(key)}
                className={`rounded-lg py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  preset === key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {PRESETS[key].label}
              </button>
            ))}
          </div>

          {/* Phase toggle */}
          <div className="mt-2.5 flex justify-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleSwitchPhase('focus')}
              className={`rounded-full px-3 py-1 font-medium cursor-pointer ${
                phase === 'focus'
                  ? 'bg-teal-100 text-teal-800'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              Study ({PRESETS[preset].focusMin}m)
            </button>
            <button
              type="button"
              onClick={() => handleSwitchPhase('break')}
              className={`rounded-full px-3 py-1 font-medium cursor-pointer ${
                phase === 'break'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              Break ({PRESETS[preset].breakMin}m)
            </button>
          </div>

          {/* Big readable readout */}
          <div className="my-4 text-center">
            <div className="font-mono text-4xl font-semibold tracking-tight text-slate-900 tabular-nums">
              {mins}:{secs}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {phase === 'focus' ? 'Single-topic calm study session' : 'Step away, breathe, hydrate'}
            </p>
          </div>

          {completedNotice && (
            <div className="mb-3 rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-2 text-xs text-teal-900">
              {completedNotice}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setCompletedNotice(null);
                setRunning((r) => !r);
              }}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-3 py-2 text-sm font-medium text-white hover:bg-teal-800 cursor-pointer"
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              title="Reset timer"
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
