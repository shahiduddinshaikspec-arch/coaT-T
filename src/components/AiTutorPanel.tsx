import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Lightbulb,
  Loader2,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import type { TutorTopicContext } from '../utils/tutorContext';
import { useDialogA11y } from '../utils/useDialogA11y';
import { ReadAloudButton } from './ReadAloudButton';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface TutorStatus {
  configured: boolean;
  model: string;
  limit: {
    maxRequests: number;
    windowMinutes: number;
    remaining: number;
  };
}

interface Props {
  open: boolean;
  aiEnabled: boolean;
  context: TutorTopicContext;
  pendingPrompt?: string | null;
  onConsumePendingPrompt?: () => void;
  onToggleAiEnabled: (enabled: boolean) => void;
  onUseBuiltInLesson: (lessonId: string) => void;
  onClose: () => void;
}

export const AiTutorPanel: React.FC<Props> = ({
  open,
  aiEnabled,
  context,
  pendingPrompt,
  onConsumePendingPrompt,
  onToggleAiEnabled,
  onUseBuiltInLesson,
  onClose,
}) => {
  const [status, setStatus] = useState<TutorStatus | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogA11y(open, dialogRef, onClose);

  // Reset conversation whenever the grounded topic changes
  useEffect(() => {
    setMessages([]);
    setInput('');
    setErrorMsg(null);
  }, [context.topicKey]);

  // Check server configuration only when the panel opens and AI is enabled
  useEffect(() => {
    if (!open || !aiEnabled) return;
    let cancelled = false;
    setCheckingStatus(true);
    setStatusError(null);

    fetch('/api/tutor/status')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('UNAVAILABLE'))))
      .then((data: TutorStatus) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {
        if (!cancelled) {
          setStatus(null);
          setStatusError(
            'The local tutor endpoint is unavailable right now. You can use all built-in lessons and numericals completely offline.'
          );
        }
      })
      .finally(() => {
        if (!cancelled) setCheckingStatus(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, aiEnabled]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendPrompt = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || loading || !aiEnabled) return;

    setErrorMsg(null);
    const nextHistory = [...messages];
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: context.topicTitle,
          excerpt: context.excerpt,
          history: nextHistory.slice(-8),
          userMessage: trimmed,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (data.limit) {
        setStatus((prev) =>
          prev
            ? { ...prev, configured: data.configured ?? prev.configured, limit: data.limit }
            : {
                configured: Boolean(data.configured),
                model: data.model || 'gemini-2.5-flash',
                limit: data.limit,
              }
        );
      }

      if (!res.ok) {
        setErrorMsg(
          data.error ||
            'Could not get a tutor reply right now. You can keep using the built-in lessons offline.'
        );
        setMessages(nextHistory);
        return;
      }

      setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
    } catch {
      setErrorMsg(
        'Could not connect to the local server endpoint. The built-in lessons and practice modes remain fully usable offline.'
      );
      setMessages(nextHistory);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && aiEnabled && status?.configured && pendingPrompt && !loading) {
      const toSend = pendingPrompt;
      onConsumePendingPrompt?.();
      void sendPrompt(toSend);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, aiEnabled, status?.configured, pendingPrompt]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendPrompt(input);
  };

  const remaining = status?.limit?.remaining ?? 20;
  const maxReqs = status?.limit?.maxRequests ?? 20;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Optional Gemini AI Tutor"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-slate-900/40 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full sm:max-w-md h-[88vh] sm:h-full flex flex-col border-t sm:border-t-0 sm:border-l border-slate-200 bg-white shadow-xl rounded-t-2xl sm:rounded-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Visible AI On/Off Toggle */}
        <div className="border-b border-slate-200 px-4 py-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900 leading-tight">
                  Optional AI Tutor
                </h2>
                <p className="text-[11px] text-slate-500">
                  {status?.model ? `Gemini (${status.model})` : 'Gemini Flash · Grounded in SR25 key'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer">
                <span>{aiEnabled ? 'AI On' : 'AI Off'}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={aiEnabled}
                  aria-label="Toggle optional AI tutor"
                  onClick={() => onToggleAiEnabled(!aiEnabled)}
                  className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors cursor-pointer ${
                    aiEnabled ? 'bg-teal-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform mt-0.5 ${
                      aiEnabled ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close AI tutor"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Grounded Topic & Limit Pill */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs">
            <div className="font-medium text-slate-800 line-clamp-1">{context.topicTitle}</div>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-teal-600" />
                Only sends: {context.sourceLabels.join(', ')}
              </span>
              {aiEnabled && status?.configured && (
                <span className="font-mono">
                  {remaining}/{maxReqs} left
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        {!aiEnabled ? (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-center items-center text-center space-y-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h3 className="text-base font-semibold text-slate-900">AI Tutor is currently Off</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You don’t need AI to prepare — all 20 beginner lessons, 90 practice questions, and
                13 step-by-step calculations work 100% offline.
              </p>
            </div>
            <div className="flex flex-col w-full max-w-xs gap-2">
              <button
                type="button"
                onClick={() => onToggleAiEnabled(true)}
                className="rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-800 cursor-pointer"
              >
                Turn AI Tutor On
              </button>
              <button
                type="button"
                onClick={() => {
                  onUseBuiltInLesson(context.lessonId);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-teal-600" />
                Use built-in lesson instead
              </button>
            </div>
          </div>
        ) : checkingStatus ? (
          <div className="flex-1 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            Checking local server configuration...
          </div>
        ) : statusError || !status?.configured ? (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col justify-center space-y-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 space-y-2 text-sm text-amber-950">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
                No Gemini API Key Configured
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {statusError ||
                  'No GEMINI_API_KEY environment variable is set on the server. The app is completely usable offline using the built-in beginner lessons, hints, and worked numericals.'}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs text-slate-600 space-y-2">
              <div className="font-semibold text-slate-800">
                Optional: How to enable Gemini locally (server-side only)
              </div>
              <p>Set the key in your terminal session before running the app (never in browser code):</p>
              <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-[11px] text-slate-800">
{`$env:GEMINI_API_KEY="your-key-here"
npm run dev`}
              </pre>
            </div>

            <button
              type="button"
              onClick={() => {
                onUseBuiltInLesson(context.lessonId);
                onClose();
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-800 cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              Study with built-in lesson instead
            </button>
          </div>
        ) : (
          <>
            {/* Active Grounded Chat Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="space-y-3 pt-2">
                  <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-3.5 text-xs sm:text-sm text-teal-950 leading-relaxed">
                    I’ll explain this topic in simple language using only your course answer key, ask{' '}
                    <span className="font-semibold">one question at a time</span>, and give hints
                    before showing answers.
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Quick starters for this topic
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        sendPrompt(
                          'Explain this COA topic in simple everyday language from zero, then ask me one easy check question.'
                        )
                      }
                      className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer"
                    >
                      <BookOpen className="h-4 w-4 text-teal-600 shrink-0" />
                      Explain this topic simply + ask 1 question
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        sendPrompt(
                          'Quiz me on this topic by asking just ONE question. Wait for my reply and give me a hint before revealing the answer.'
                        )
                      }
                      className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
                      Quiz me (one question at a time)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        sendPrompt(
                          'Walk me through any calculation or key steps here one step at a time, giving a hint before revealing each step.'
                        )
                      }
                      className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium text-slate-800 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer"
                    >
                      <Lightbulb className="h-4 w-4 text-amber-600 shrink-0" />
                      Walk through steps with hints first
                    </button>
                  </div>
                </div>
              ) : (
                messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      m.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-teal-700 text-white rounded-br-sm'
                          : 'border border-slate-200 bg-slate-50 text-slate-800 rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.role === 'model' && (
                      <div className="mt-1">
                        <ReadAloudButton text={m.text} label="Read reply" />
                      </div>
                    )}
                  </div>
                ))
              )}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-600" />
                  Thinking calmly...
                </div>
              )}

              {errorMsg && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950">
                  {errorMsg}
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-200 bg-slate-50/70 p-3 space-y-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading || remaining === 0}
                  maxLength={600}
                  placeholder={
                    remaining === 0
                      ? 'Request limit reached — use built-in lessons'
                      : 'Answer the question, or ask for a hint...'
                  }
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-teal-600 focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim() || remaining === 0}
                  aria-label="Send message"
                  className="rounded-xl bg-teal-700 p-2.5 text-white hover:bg-teal-800 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {messages.length > 0 && (
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <button
                    type="button"
                    onClick={() => sendPrompt('Give me a small hint first, not the full answer.')}
                    disabled={loading || remaining === 0}
                    className="text-amber-800 hover:underline cursor-pointer disabled:opacity-40"
                  >
                    Ask for a hint
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMessages([]);
                      setErrorMsg(null);
                    }}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear chat
                  </button>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};
