import React, { useEffect, useRef, useState } from 'react';
import {
  Check,
  Cloud,
  CloudOff,
  Copy,
  Link2,
  Loader2,
  RefreshCw,
  Shuffle,
  X,
} from 'lucide-react';
import { normalizeSyncCode } from '../utils/storage';
import { useDialogA11y } from '../utils/useDialogA11y';

export type SyncState = 'idle' | 'syncing' | 'synced' | 'offline' | 'error';

interface Props {
  open: boolean;
  syncCode: string;
  syncState: SyncState;
  lastSyncedAt: number | null;
  syncError: string | null;
  onConnect: (code: string) => void;
  onDisconnect: () => void;
  onSyncNow: () => void;
  onClose: () => void;
}

function generateFriendlyCode(): string {
  const words = ['cpu', 'alu', 'bus', 'cache', 'booth', 'ram', 'mux', 'dma'];
  const w1 = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `coa-${w1}-${num}`;
}

export const SyncModal: React.FC<Props> = ({
  open,
  syncCode,
  syncState,
  lastSyncedAt,
  syncError,
  onConnect,
  onDisconnect,
  onSyncNow,
  onClose,
}) => {
  const [draftCode, setDraftCode] = useState(syncCode);
  const [validationErr, setValidationErr] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useDialogA11y(open, dialogRef, onClose);

  useEffect(() => {
    if (open) {
      setDraftCode(syncCode);
      setValidationErr(null);
      setCopiedLink(false);
    }
  }, [open, syncCode]);

  if (!open) return null;

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeSyncCode(draftCode);
    if (clean.length < 4) {
      setValidationErr('Please enter at least 4 letters or numbers (e.g. shahid-coa).');
      return;
    }
    setValidationErr(null);
    onConnect(clean);
  };

  const autoConnectUrl = syncCode
    ? `${window.location.origin}/?sync=${encodeURIComponent(syncCode)}`
    : '';

  const handleCopyLink = async () => {
    if (!autoConnectUrl) return;
    try {
      await navigator.clipboard.writeText(autoConnectUrl);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback if clipboard blocked
      window.prompt('Copy this link and open it on your other device:', autoConnectUrl);
    }
  };

  const formattedLastSync = lastSyncedAt
    ? new Date(lastSyncedAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Automatic Phone and PC Cloud Sync"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/45 p-0 sm:p-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-teal-600" />
            <h2 className="text-sm font-semibold text-slate-900">
              Always-On Phone ↔ PC Sync
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cloud sync settings"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Use the same private Sync Code on your phone and PC. Your completed lessons, quizzes,
            drafts, numericals, and checklist will auto-sync in the background with zero login.
          </p>

          {!syncCode ? (
            <form onSubmit={handleConnectSubmit} className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="sync-code-input" className="text-xs font-semibold text-slate-700">
                    Choose a private Sync Code
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftCode(generateFriendlyCode());
                      setValidationErr(null);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 hover:underline cursor-pointer"
                  >
                    <Shuffle className="h-3 w-3" />
                    Generate one
                  </button>
                </div>
                <input
                  id="sync-code-input"
                  type="text"
                  value={draftCode}
                  onChange={(e) => {
                    setDraftCode(e.target.value);
                    setValidationErr(null);
                  }}
                  placeholder="e.g. shahid-coa-2026"
                  maxLength={48}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-slate-600">
                  Letters, numbers, hyphens, or underscores (4–48 chars). Pick something unique to you.
                </p>
              </div>

              {validationErr && (
                <p className="text-xs font-medium text-rose-700">{validationErr}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 cursor-pointer"
              >
                Enable Always-On Sync
              </button>
            </form>
          ) : (
            <div className="space-y-3.5">
              {/* Connected Status Card */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
                    {syncState === 'syncing' ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-600" />
                    ) : syncState === 'offline' ? (
                      <CloudOff className="h-3.5 w-3.5 text-amber-700" />
                    ) : (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    )}
                    {syncState === 'syncing'
                      ? 'Syncing now...'
                      : syncState === 'offline'
                        ? 'Offline (will sync when back online)'
                        : syncState === 'error'
                          ? 'Temporary sync hiccup'
                          : 'Auto-sync active'}
                  </span>
                  {formattedLastSync && (
                    <span className="font-mono text-[11px] text-emerald-800">
                      {formattedLastSync}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-700">
                  Sync Code: <strong className="font-mono text-slate-900">{syncCode}</strong>
                </div>
              </div>

              {syncError && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950">
                  {syncError}
                </div>
              )}

              {/* 1-Tap Auto-Connect Link for the other device */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                  <Link2 className="h-3.5 w-3.5 text-teal-600" />
                  Connect your other device in 1 tap
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Send this link to your phone or PC and open it once — it connects this exact Sync
                  Code automatically, and both devices stay synced from then on.
                </p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedLink ? 'Auto-Connect Link Copied!' : 'Copy 1-Tap Auto-Connect Link'}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={onSyncNow}
                  disabled={syncState === 'syncing'}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${syncState === 'syncing' ? 'animate-spin' : ''}`} />
                  Sync now
                </button>
                <button
                  type="button"
                  onClick={onDisconnect}
                  className="text-xs font-medium text-slate-600 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  Disconnect sync
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
