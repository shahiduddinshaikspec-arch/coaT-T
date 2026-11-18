import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Calculator,
  ClipboardCheck,
  Cloud,
  CloudOff,
  Cpu,
  EyeOff,
  GraduationCap,
  Home,
  Loader2,
  RotateCcw,
  Search,
  Sparkles,
} from 'lucide-react';
import { DisplayControls } from './components/DisplayControls';
import { FocusTimer } from './components/FocusTimer';
import { HomeView } from './components/HomeView';
import type { JumpTarget } from './components/QuickJumpModal';
import type { SyncState } from './components/SyncModal';
import { findGlossaryEntry } from './data/glossary';
import { LESSONS } from './data/lessons';
import { NUMERICALS } from './data/numericals';
import { QUESTIONS } from './data/questions';
import type {
  AppView,
  DisplayPreferences,
  GlossaryEntry,
  LastActivity,
  StudyProgress,
  StudySessionStep,
} from './types';
import type { SmartRecommendation } from './utils/smartEngine';
import {
  addUnique,
  consumeSyncCodeFromUrl,
  createDefaultProgress,
  hasSavedSession,
  loadProgress,
  loadSyncCode,
  mergeProgressClient,
  removeItem,
  saveProgress,
  saveSyncCode,
  toggleInArray,
} from './utils/storage';
import {
  buildTutorContextForLesson,
  buildTutorContextForNumerical,
  buildTutorContextForQuestion,
} from './utils/tutorContext';

// Lazy-loaded views & modals for fast initial paint and small chunks
const LessonsView = lazy(() =>
  import('./components/LessonsView').then((m) => ({ default: m.LessonsView }))
);
const PracticeView = lazy(() =>
  import('./components/PracticeView').then((m) => ({ default: m.PracticeView }))
);
const NumericalsView = lazy(() =>
  import('./components/NumericalsView').then((m) => ({ default: m.NumericalsView }))
);
const ChecklistView = lazy(() =>
  import('./components/ChecklistView').then((m) => ({ default: m.ChecklistView }))
);
const ForgotView = lazy(() =>
  import('./components/ForgotView').then((m) => ({ default: m.ForgotView }))
);
const AiTutorPanel = lazy(() =>
  import('./components/AiTutorPanel').then((m) => ({ default: m.AiTutorPanel }))
);
const GlossaryModal = lazy(() =>
  import('./components/GlossaryModal').then((m) => ({ default: m.GlossaryModal }))
);
const SessionPlannerModal = lazy(() =>
  import('./components/SessionPlannerModal').then((m) => ({ default: m.SessionPlannerModal }))
);
const QuickJumpModal = lazy(() =>
  import('./components/QuickJumpModal').then((m) => ({ default: m.QuickJumpModal }))
);
const SyncModal = lazy(() =>
  import('./components/SyncModal').then((m) => ({ default: m.SyncModal }))
);

function studyDataSignature(p: StudyProgress): string {
  return JSON.stringify({
    examDateTimeIST: p.examDateTimeIST,
    completedLessons: p.completedLessons,
    masteredQuestions: p.masteredQuestions,
    forgotQuestions: p.forgotQuestions,
    masteredNumericals: p.masteredNumericals,
    checkedHighYield: p.checkedHighYield,
    checkedQuestions: p.checkedQuestions,
    questionDrafts: p.questionDrafts,
    questionSelfChecks: p.questionSelfChecks,
    lastActivity: p.lastActivity,
    resetAt: p.resetAt ?? 0,
  });
}

const NAV_ITEMS: {
  id: AppView;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'home', label: 'Home', shortLabel: 'Home', icon: Home },
  { id: 'lessons', label: 'Lessons', shortLabel: 'Lessons', icon: BookOpen },
  { id: 'practice', label: 'Practice', shortLabel: 'Practice', icon: GraduationCap },
  { id: 'numericals', label: 'Numericals', shortLabel: 'Math', icon: Calculator },
  { id: 'checklist', label: 'Checklist', shortLabel: 'Checklist', icon: ClipboardCheck },
  { id: 'forgot', label: 'Forgot This', shortLabel: 'Forgot', icon: RotateCcw },
];

export function App() {
  const [progress, setProgress] = useState<StudyProgress>(() => loadProgress());
  const [showResumeBanner, setShowResumeBanner] = useState<boolean>(() => hasSavedSession());
  const [view, setView] = useState<AppView>('home');

  // Navigation sub-states (keep initial lesson unit and lesson ID strictly in sync)
  const initialLesson =
    (progress.lastActivity?.lessonId &&
      LESSONS.find((l) => l.id === progress.lastActivity?.lessonId)) ||
    (progress.lastActivity?.unit &&
      LESSONS.find((l) => l.unit === progress.lastActivity?.unit)) ||
    LESSONS[0];
  const [selectedLessonUnit, setSelectedLessonUnit] = useState<number>(initialLesson.unit);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(initialLesson.id);

  const [practiceMarks, setPracticeMarks] = useState<2 | 5 | 10>(
    () => progress.lastActivity?.practiceMarks || 2
  );
  const [practiceUnit, setPracticeUnit] = useState<number | 'all'>('all');
  const [focusedQuestionId, setFocusedQuestionId] = useState<string | null>(
    () => progress.lastActivity?.questionId || null
  );

  const [selectedNumericalId, setSelectedNumericalId] = useState<string>(
    () => progress.lastActivity?.numericalId || NUMERICALS[0].id
  );
  const [focusedForgotId, setFocusedForgotId] = useState<string | null>(null);

  // Modals
  const [sessionPlannerOpen, setSessionPlannerOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryEntry, setGlossaryEntry] = useState<GlossaryEntry | null>(null);
  const [quickJumpOpen, setQuickJumpOpen] = useState(false);
  const [tutorOpen, setTutorOpen] = useState(false);
  const [pendingTutorPrompt, setPendingTutorPrompt] = useState<string | null>(null);

  // Always-On Phone <-> PC Cloud Sync
  const [syncCode, setSyncCode] = useState<string>(() => consumeSyncCodeFromUrl() || loadSyncCode());
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const progressRef = useRef<StudyProgress>(progress);
  progressRef.current = progress;
  const skipNextPushRef = useRef(false);
  const syncInFlightRef = useRef(false);
  const lastDirtyAtRef = useRef(0);
  const lastSyncedAtRef = useRef(0);

  const mutateProgress = useCallback((updater: (prev: StudyProgress) => StudyProgress) => {
    const now = Date.now();
    lastDirtyAtRef.current = now;
    setProgress((prev) => {
      const next = updater(prev);
      return { ...next, updatedAt: now };
    });
  }, []);

  const pushProgress = useCallback(async (code: string, payload: StudyProgress) => {
    if (!code) return;
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setSyncState('offline');
      return;
    }
    if (syncInFlightRef.current) return;
    syncInFlightRef.current = true;
    setSyncState('syncing');

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, progress: payload }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setSyncState('error');
        setSyncError(data?.error || 'Could not reach cloud sync right now.');
        return;
      }

      if (data.progress) {
        const merged = mergeProgressClient(progressRef.current, data.progress as StudyProgress);
        if (studyDataSignature(merged) !== studyDataSignature(progressRef.current)) {
          skipNextPushRef.current = true;
          setProgress(merged);
        }
      }

      const now = Date.now();
      lastSyncedAtRef.current = now;
      setLastSyncedAt(now);
      setSyncState('synced');
      setSyncError(null);
    } catch {
      setSyncState(typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : 'error');
      setSyncError('Cloud sync paused while offline. Your progress is safe locally.');
    } finally {
      syncInFlightRef.current = false;
    }
  }, []);

  const pullAndMerge = useCallback(
    async (code: string, options?: { pushIfLocalAhead?: boolean }) => {
      if (!code) return;
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setSyncState('offline');
        return;
      }
      if (syncInFlightRef.current) return;
      syncInFlightRef.current = true;
      setSyncState('syncing');

      let shouldPushMerged: StudyProgress | null = null;

      try {
        const res = await fetch(`/api/sync?code=${encodeURIComponent(code)}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (!res.ok || !data?.ok) {
          setSyncState('error');
          setSyncError(data?.error || 'Could not fetch cloud progress right now.');
          return;
        }

        const local = progressRef.current;
        if (data.found && data.progress) {
          const remote = data.progress as StudyProgress;
          const merged = mergeProgressClient(local, remote);
          if (studyDataSignature(merged) !== studyDataSignature(local)) {
            skipNextPushRef.current = true;
            setProgress(merged);
            setShowResumeBanner(false);
          }
          if (
            options?.pushIfLocalAhead &&
            studyDataSignature(merged) !== studyDataSignature(remote)
          ) {
            shouldPushMerged = { ...merged, updatedAt: Math.max(merged.updatedAt || 0, Date.now()) };
          }
        } else if (options?.pushIfLocalAhead) {
          shouldPushMerged = { ...local, updatedAt: local.updatedAt || Date.now() };
        }

        const now = Date.now();
        lastSyncedAtRef.current = now;
        setLastSyncedAt(now);
        setSyncState('synced');
        setSyncError(null);
      } catch {
        setSyncState(typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : 'error');
        setSyncError('Could not reach cloud sync right now. Local progress is safe.');
      } finally {
        syncInFlightRef.current = false;
      }

      if (shouldPushMerged) {
        await pushProgress(code, shouldPushMerged);
      }
    },
    [pushProgress]
  );

  // Initial sync + live background polling + focus/visibility/online listeners
  useEffect(() => {
    if (!syncCode) {
      setSyncState('idle');
      setSyncError(null);
      return;
    }

    void pullAndMerge(syncCode, { pushIfLocalAhead: true });

    const handleVisibleOrFocus = () => {
      if (document.visibilityState === 'visible') {
        void pullAndMerge(syncCode, { pushIfLocalAhead: false });
      }
    };

    const handleOnline = () => {
      if (lastDirtyAtRef.current > lastSyncedAtRef.current) {
        void pushProgress(syncCode, progressRef.current);
      } else {
        void pullAndMerge(syncCode, { pushIfLocalAhead: true });
      }
    };

    const handleOffline = () => {
      setSyncState('offline');
    };

    window.addEventListener('focus', handleVisibleOrFocus);
    document.addEventListener('visibilitychange', handleVisibleOrFocus);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        void pullAndMerge(syncCode, { pushIfLocalAhead: false });
      }
    }, 12000);

    return () => {
      window.removeEventListener('focus', handleVisibleOrFocus);
      document.removeEventListener('visibilitychange', handleVisibleOrFocus);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.clearInterval(intervalId);
    };
  }, [syncCode, pullAndMerge, pushProgress]);

  // Debounced auto-push whenever local study progress changes
  useEffect(() => {
    if (!syncCode || !progress.updatedAt) return;
    if (skipNextPushRef.current) {
      skipNextPushRef.current = false;
      return;
    }

    const timerId = window.setTimeout(() => {
      void pushProgress(syncCode, progressRef.current);
    }, 900);

    return () => window.clearTimeout(timerId);
  }, [progress.updatedAt, syncCode, pushProgress]);

  const handleConnectSync = (code: string) => {
    saveSyncCode(code);
    setSyncCode(code);
    setSyncError(null);
  };

  const handleDisconnectSync = () => {
    saveSyncCode('');
    setSyncCode('');
    setSyncState('idle');
    setLastSyncedAt(null);
    setSyncError(null);
  };

  const handleSyncNow = () => {
    if (!syncCode) return;
    void pullAndMerge(syncCode, { pushIfLocalAhead: true });
  };

  // Global Quick-Jump shortcut (Ctrl+K / Cmd+K or "/" outside text inputs)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickJumpOpen((v) => !v);
        return;
      }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable)
        ) {
          return;
        }
        if (document.querySelector('[role="dialog"]')) return;
        e.preventDefault();
        setQuickJumpOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const activeTutorContext = useMemo(() => {
    if (view === 'numericals') {
      return buildTutorContextForNumerical(selectedNumericalId);
    }
    if (view === 'practice') {
      const q =
        (focusedQuestionId && QUESTIONS.find((item) => item.id === focusedQuestionId)) ||
        QUESTIONS.find(
          (item) =>
            item.marks === practiceMarks &&
            (practiceUnit === 'all' || item.unit === practiceUnit)
        ) ||
        QUESTIONS[0];
      return buildTutorContextForQuestion(q.id);
    }
    if (view === 'forgot') {
      const qid = focusedForgotId || progress.forgotQuestions[0];
      if (qid) return buildTutorContextForQuestion(qid);
    }
    return buildTutorContextForLesson(selectedLessonId);
  }, [
    view,
    selectedNumericalId,
    focusedQuestionId,
    practiceMarks,
    practiceUnit,
    focusedForgotId,
    progress.forgotQuestions,
    selectedLessonId,
  ]);

  // Persist every progress change locally
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Apply theme & font-scale classes to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', progress.preferences.theme === 'dark');
    html.classList.toggle('font-scale-large', progress.preferences.fontScale === 'large');
    html.classList.toggle('font-scale-xlarge', progress.preferences.fontScale === 'xlarge');
  }, [progress.preferences.theme, progress.preferences.fontScale]);

  const recordActivity = (activity: LastActivity) => {
    mutateProgress((prev) => ({ ...prev, lastActivity: activity }));
  };

  const handleUpdatePreferences = (patch: Partial<DisplayPreferences>) => {
    setProgress((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...patch },
    }));
  };

  const handleOpenTerm = (rawTerm: string) => {
    const match = findGlossaryEntry(rawTerm);
    setGlossaryEntry(match || null);
    setGlossaryOpen(true);
  };

  const handleOpenGlossaryBrowser = () => {
    setGlossaryEntry(null);
    setGlossaryOpen(true);
  };

  const handleNavigate = (nextView: AppView) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLesson = (lessonId: string) => {
    const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
    setSelectedLessonUnit(lesson.unit);
    setSelectedLessonId(lesson.id);
    setView('lessons');
    recordActivity({
      view: 'lessons',
      label: `Lesson ${lesson.unit}.${lesson.order}: ${lesson.title}`,
      unit: lesson.unit,
      lessonId: lesson.id,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenUnitLessons = (unit: number) => {
    const unitLessons = LESSONS.filter((l) => l.unit === unit);
    const nextUnread =
      unitLessons.find((l) => !progress.completedLessons.includes(l.id)) || unitLessons[0];
    if (nextUnread) {
      handleOpenLesson(nextUnread.id);
    }
  };

  const handleOpenUnitPractice = (unit: number, marks: 2 | 5 | 10 = 2) => {
    setPracticeUnit(unit);
    setPracticeMarks(marks);
    const firstQ = QUESTIONS.find((q) => q.unit === unit && q.marks === marks);
    setFocusedQuestionId(firstQ ? firstQ.id : null);
    setView('practice');
    if (firstQ) {
      recordActivity({
        view: 'practice',
        label: `Practice Unit ${unit} (${marks}M): ${firstQ.qNum}`,
        unit,
        practiceMarks: marks,
        questionId: firstQ.id,
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToQuestion = (qid: string) => {
    const q = QUESTIONS.find((item) => item.id === qid);
    if (!q) return;
    setPracticeMarks(q.marks);
    setPracticeUnit('all');
    setFocusedQuestionId(q.id);
    setView('practice');
    recordActivity({
      view: 'practice',
      label: `Practice Unit ${q.unit} ${q.qNum} (${q.marks}M)`,
      unit: q.unit,
      practiceMarks: q.marks,
      questionId: q.id,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNumerical = (nid: string) => {
    const num = NUMERICALS.find((n) => n.id === nid) || NUMERICALS[0];
    setSelectedNumericalId(num.id);
    setView('numericals');
    recordActivity({
      view: 'numericals',
      label: `Numerical: ${num.title}`,
      unit: num.unit,
      numericalId: num.id,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchSessionStep = (step: StudySessionStep | SmartRecommendation) => {
    if (step.kind === 'lesson') {
      handleOpenLesson(step.targetId);
    } else if (step.kind === 'numerical') {
      handleOpenNumerical(step.targetId);
    } else if (step.kind === 'practice') {
      handleJumpToQuestion(step.targetId);
    } else if (step.kind === 'forgot') {
      setFocusedForgotId(step.targetId);
      setView('forgot');
      recordActivity({
        view: 'forgot',
        label: step.title,
        unit: step.unit,
        questionId: step.targetId,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuickJumpSelect = (target: JumpTarget) => {
    if (target.kind === 'lesson') {
      handleOpenLesson(target.id);
    } else if (target.kind === 'numerical') {
      handleOpenNumerical(target.id);
    } else if (target.kind === 'question') {
      handleJumpToQuestion(target.id);
    } else if (target.kind === 'glossary') {
      setGlossaryEntry(target.entry);
      setGlossaryOpen(true);
    }
  };

  const handleAskTutorAboutDraft = (draftText: string) => {
    const clipped = draftText.slice(0, 420);
    setPendingTutorPrompt(
      `Here is my attempt in my own words: "${clipped}". Briefly tell me what I got right from the course answer key, then give me a small hint (not the full answer yet) for any missing point and ask me 1 quick follow-up question.`
    );
    setTutorOpen(true);
  };

  const handleContinueStudying = () => {
    const last = progress.lastActivity;
    if (last) {
      if (last.view === 'lessons' && last.lessonId) {
        handleOpenLesson(last.lessonId);
        return;
      }
      if (last.view === 'practice' && last.questionId) {
        handleJumpToQuestion(last.questionId);
        return;
      }
      if (last.view === 'numericals' && last.numericalId) {
        handleOpenNumerical(last.numericalId);
        return;
      }
      if (last.view === 'forgot' && last.questionId) {
        setFocusedForgotId(last.questionId);
        handleNavigate('forgot');
        return;
      }
      handleNavigate(last.view);
      return;
    }

    const firstUnreadLesson = LESSONS.find((l) => !progress.completedLessons.includes(l.id));
    if (firstUnreadLesson) {
      handleOpenLesson(firstUnreadLesson.id);
    } else {
      handleNavigate('checklist');
    }
  };

  // Progress mutators
  const handleUpdateExamDateTime = (istValue: string) => {
    mutateProgress((prev) => ({ ...prev, examDateTimeIST: istValue }));
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    mutateProgress((prev) => ({
      ...prev,
      completedLessons: toggleInArray(prev.completedLessons, lessonId),
    }));
  };

  const handleSaveDraft = (qid: string, text: string) => {
    mutateProgress((prev) => ({
      ...prev,
      questionDrafts: { ...prev.questionDrafts, [qid]: text },
    }));
  };

  const handleToggleSelfCheck = (qid: string, pointIdx: number) => {
    mutateProgress((prev) => {
      const currentList = prev.questionSelfChecks[qid] || [];
      const nextList = currentList.includes(pointIdx)
        ? currentList.filter((i) => i !== pointIdx)
        : [...currentList, pointIdx];
      return {
        ...prev,
        questionSelfChecks: { ...prev.questionSelfChecks, [qid]: nextList },
      };
    });
  };

  const handleMarkQuestionGotIt = (qid: string) => {
    mutateProgress((prev) => ({
      ...prev,
      masteredQuestions: addUnique(prev.masteredQuestions, qid),
      checkedQuestions: addUnique(prev.checkedQuestions, qid),
      forgotQuestions: removeItem(prev.forgotQuestions, qid),
    }));
  };

  const handleMarkQuestionForgot = (qid: string) => {
    mutateProgress((prev) => ({
      ...prev,
      forgotQuestions: addUnique(prev.forgotQuestions, qid),
      masteredQuestions: removeItem(prev.masteredQuestions, qid),
    }));
  };

  const handleRemoveFromForgot = (qid: string) => {
    mutateProgress((prev) => ({
      ...prev,
      forgotQuestions: removeItem(prev.forgotQuestions, qid),
    }));
  };

  const handleToggleMasteredNumerical = (nid: string) => {
    const num = NUMERICALS.find((n) => n.id === nid);
    mutateProgress((prev) => {
      const nextNumericals = toggleInArray(prev.masteredNumericals, nid);
      const isNowMastered = nextNumericals.includes(nid);
      return {
        ...prev,
        masteredNumericals: nextNumericals,
        masteredQuestions:
          isNowMastered && num
            ? addUnique(prev.masteredQuestions, num.questionId)
            : prev.masteredQuestions,
      };
    });
  };

  const handleToggleHighYield = (id: string) => {
    mutateProgress((prev) => ({
      ...prev,
      checkedHighYield: toggleInArray(prev.checkedHighYield, id),
    }));
  };

  const handleToggleQuestionChecked = (qid: string) => {
    mutateProgress((prev) => ({
      ...prev,
      checkedQuestions: toggleInArray(prev.checkedQuestions, qid),
    }));
  };

  const handleExportProgress = () => {
    try {
      const blob = new Blob([JSON.stringify(progress, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `coa-study-sprint-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Ignore blob failures
    }
  };

  const handleImportProgress = (jsonText: string): boolean => {
    try {
      const parsed = JSON.parse(jsonText) as Partial<StudyProgress>;
      if (!parsed || typeof parsed !== 'object') return false;
      const base = createDefaultProgress();
      const merged: StudyProgress = {
        examDateTimeIST:
          typeof parsed.examDateTimeIST === 'string' && parsed.examDateTimeIST.includes('T')
            ? parsed.examDateTimeIST
            : base.examDateTimeIST,
        completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
        masteredQuestions: Array.isArray(parsed.masteredQuestions) ? parsed.masteredQuestions : [],
        forgotQuestions: Array.isArray(parsed.forgotQuestions) ? parsed.forgotQuestions : [],
        masteredNumericals: Array.isArray(parsed.masteredNumericals)
          ? parsed.masteredNumericals
          : [],
        checkedHighYield: Array.isArray(parsed.checkedHighYield) ? parsed.checkedHighYield : [],
        checkedQuestions: Array.isArray(parsed.checkedQuestions) ? parsed.checkedQuestions : [],
        questionDrafts:
          parsed.questionDrafts && typeof parsed.questionDrafts === 'object'
            ? parsed.questionDrafts
            : {},
        questionSelfChecks:
          parsed.questionSelfChecks && typeof parsed.questionSelfChecks === 'object'
            ? parsed.questionSelfChecks
            : {},
        lastActivity: parsed.lastActivity ?? null,
        preferences: {
          theme: parsed.preferences?.theme === 'dark' ? 'dark' : 'light',
          fontScale:
            parsed.preferences?.fontScale === 'large' || parsed.preferences?.fontScale === 'xlarge'
              ? parsed.preferences.fontScale
              : 'normal',
          focusView: Boolean(parsed.preferences?.focusView),
          aiTutorEnabled: Boolean(parsed.preferences?.aiTutorEnabled),
        },
      };
      mutateProgress(() => merged);
      return true;
    } catch {
      return false;
    }
  };

  const handleResetAllProgress = () => {
    if (
      window.confirm(
        'Reset all saved study progress? Your exam date will reset to Thursday 10:00 AM IST.'
      )
    ) {
      const now = Date.now();
      const fresh: StudyProgress = {
        ...createDefaultProgress(),
        preferences: progress.preferences,
        resetAt: now,
        updatedAt: now,
      };
      lastDirtyAtRef.current = now;
      setProgress(fresh);
      setShowResumeBanner(false);
      setView('home');
    }
  };

  const isFocusActive =
    progress.preferences.focusView &&
    (view === 'lessons' || view === 'practice' || view === 'numericals' || view === 'forgot');

  return (
    <div className="app-shell min-h-screen flex flex-col bg-[#F8F7F4] text-slate-800">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 text-left cursor-pointer shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-700 text-white shadow-xs">
              <Cpu className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold tracking-tight text-slate-900 leading-none">
                COA Study Sprint
              </div>
              <div className="text-[11px] text-slate-600 hidden sm:block mt-0.5">
                Zero-to-Ready · AS25-05PC02
              </div>
            </div>
          </button>

          {/* Desktop Nav Tabs (hidden below lg and in low-distraction focus view) */}
          {!isFocusActive ? (
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = view === item.id;
                const badge = item.id === 'forgot' ? progress.forgotQuestions.length : 0;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={active ? 'page' : undefined}
                    onClick={() => handleNavigate(item.id)}
                    className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-teal-50 text-teal-900'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'text-teal-700' : 'text-slate-500'}`} />
                    {item.label}
                    {badge > 0 && (
                      <span className="ml-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-rose-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          ) : (
            <button
              type="button"
              onClick={() => handleUpdatePreferences({ focusView: false })}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800 hover:bg-indigo-100 cursor-pointer whitespace-nowrap"
            >
              <EyeOff className="h-3.5 w-3.5" />
              Exit Focus View
            </button>
          )}

          {/* Right Controls: Quick Search + Cloud Sync + Optional AI Tutor + Reading Comfort + Calm Focus Timer */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setQuickJumpOpen(true)}
              aria-label="Search lessons, questions, and terms (Ctrl+K)"
              title="Quick Jump (Ctrl+K or /)"
              className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 sm:px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden xl:inline font-mono text-[11px] text-slate-600">Ctrl+K</span>
            </button>
            <button
              type="button"
              onClick={() => setSyncModalOpen(true)}
              aria-label={
                syncCode
                  ? syncState === 'offline'
                    ? 'Synced offline, open Phone and PC Cloud Sync'
                    : 'Synced, open Phone and PC Cloud Sync'
                  : 'Sync progress between Phone and PC'
              }
              title={
                syncCode
                  ? `Cloud Sync active (${syncCode})`
                  : 'Sync progress automatically between Phone & PC'
              }
              className={`flex items-center gap-1.5 rounded-full border px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                syncCode
                  ? syncState === 'offline' || syncState === 'error'
                    ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {syncState === 'syncing' ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-teal-600" />
              ) : syncCode && syncState === 'offline' ? (
                <CloudOff className="h-3.5 w-3.5 text-amber-700" />
              ) : (
                <Cloud
                  className={`h-3.5 w-3.5 ${syncCode ? 'text-emerald-600' : 'text-slate-500'}`}
                />
              )}
              <span className="hidden sm:inline lg:hidden xl:inline">
                {syncCode ? 'Synced' : 'Sync'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTutorOpen(true)}
              aria-label="AI Tutor, optional Gemini assistant"
              className={`flex items-center gap-1.5 rounded-full border px-2 sm:px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                progress.preferences.aiTutorEnabled
                  ? 'border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100/70'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>
            <DisplayControls
              preferences={progress.preferences}
              onUpdatePreferences={handleUpdatePreferences}
              onOpenGlossaryBrowser={handleOpenGlossaryBrowser}
              onExportProgress={handleExportProgress}
              onImportProgress={handleImportProgress}
              onResetAllProgress={handleResetAllProgress}
            />
            <FocusTimer />
          </div>
        </div>

        {/* Dedicated mobile exit bar when Low-Distraction Focus View is active */}
        {isFocusActive && (
          <div className="sm:hidden border-t border-indigo-200 bg-indigo-50 px-4 py-2 flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-indigo-900">Low-Distraction Focus View</span>
            <button
              type="button"
              onClick={() => handleUpdatePreferences({ focusView: false })}
              className="inline-flex items-center gap-1 rounded-full border border-indigo-300 bg-white px-3 py-1 text-xs font-semibold text-indigo-900 hover:bg-indigo-100 cursor-pointer whitespace-nowrap"
            >
              <EyeOff className="h-3.5 w-3.5" />
              Exit Focus View
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 pb-24 sm:px-6 lg:pb-10">
        {view === 'home' && (
          <HomeView
            progress={progress}
            showResumeBanner={showResumeBanner}
            onDismissResumeBanner={() => setShowResumeBanner(false)}
            onUpdateExamDateTime={handleUpdateExamDateTime}
            onContinueStudying={handleContinueStudying}
            onLaunchRecommendation={handleLaunchSessionStep}
            onOpenSessionPlanner={() => setSessionPlannerOpen(true)}
            onOpenGlossary={handleOpenGlossaryBrowser}
            onOpenUnitLessons={handleOpenUnitLessons}
            onOpenUnitPractice={handleOpenUnitPractice}
            onNavigate={handleNavigate}
          />
        )}

        <Suspense
          fallback={
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
              Loading study section...
            </div>
          }
        >
          {view === 'lessons' && (
            <LessonsView
              selectedUnit={selectedLessonUnit}
              selectedLessonId={selectedLessonId}
              progress={progress}
              focusView={isFocusActive}
              onSelectUnit={setSelectedLessonUnit}
              onSelectLesson={handleOpenLesson}
              onToggleLessonComplete={handleToggleLessonComplete}
              onJumpToQuestion={handleJumpToQuestion}
              onJumpToNumerical={handleOpenNumerical}
              onOpenTerm={handleOpenTerm}
            />
          )}

          {view === 'practice' && (
            <PracticeView
              marksMode={practiceMarks}
              unitFilter={practiceUnit}
              focusedQuestionId={focusedQuestionId}
              progress={progress}
              focusView={isFocusActive}
              onChangeMarksMode={(m) => {
                setPracticeMarks(m);
                setFocusedQuestionId(null);
              }}
              onChangeUnitFilter={(u) => {
                setPracticeUnit(u);
                setFocusedQuestionId(null);
              }}
              onSelectQuestionId={(qid) => {
                setFocusedQuestionId(qid);
                const q = QUESTIONS.find((item) => item.id === qid);
                if (q) {
                  recordActivity({
                    view: 'practice',
                    label: `Practice Unit ${q.unit} ${q.qNum} (${q.marks}M)`,
                    unit: q.unit,
                    practiceMarks: q.marks,
                    questionId: q.id,
                  });
                }
              }}
              onSaveDraft={handleSaveDraft}
              onToggleSelfCheck={handleToggleSelfCheck}
              onMarkGotIt={handleMarkQuestionGotIt}
              onMarkForgot={handleMarkQuestionForgot}
              onOpenLesson={handleOpenLesson}
              onOpenNumerical={handleOpenNumerical}
              onOpenTerm={handleOpenTerm}
              onAskTutorAboutDraft={handleAskTutorAboutDraft}
            />
          )}

          {view === 'numericals' && (
            <NumericalsView
              selectedNumericalId={selectedNumericalId}
              progress={progress}
              focusView={isFocusActive}
              onSelectNumerical={handleOpenNumerical}
              onToggleMasteredNumerical={handleToggleMasteredNumerical}
              onMarkQuestionForgot={handleMarkQuestionForgot}
            />
          )}

          {view === 'checklist' && (
            <ChecklistView
              progress={progress}
              onToggleHighYield={handleToggleHighYield}
              onToggleQuestionChecked={handleToggleQuestionChecked}
              onOpenLesson={handleOpenLesson}
              onOpenQuestionPractice={handleJumpToQuestion}
              onOpenNumerical={handleOpenNumerical}
            />
          )}

          {view === 'forgot' && (
            <ForgotView
              progress={progress}
              focusedForgotId={focusedForgotId}
              focusView={isFocusActive}
              onSaveDraft={handleSaveDraft}
              onToggleSelfCheck={handleToggleSelfCheck}
              onMarkRecovered={handleMarkQuestionGotIt}
              onRemoveFromForgot={handleRemoveFromForgot}
              onOpenLesson={handleOpenLesson}
              onOpenNumerical={handleOpenNumerical}
              onGoToPractice={() => handleNavigate('practice')}
            />
          )}
        </Suspense>
      </main>

      {/* Subtle Offline Footer (hidden below lg and in focus view) */}
      {!isFocusActive && (
        <footer className="hidden lg:block border-t border-slate-200/80 bg-white/70 py-4 text-xs text-slate-600">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <span>
              COA Study Sprint · 100% local &amp; offline · Press{' '}
              <kbd className="font-mono font-semibold">Ctrl+K</kbd> anytime to jump to any topic.
            </span>
            <button
              type="button"
              onClick={handleResetAllProgress}
              className="text-slate-600 hover:text-rose-700 hover:underline cursor-pointer"
            >
              Reset saved progress
            </button>
          </div>
        </footer>
      )}

      {/* Mobile & Tablet Bottom Navigation Bar */}
      {!isFocusActive && (
        <nav
          aria-label="Mobile navigation"
          className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xs lg:hidden"
        >
          <div className="grid grid-cols-6">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              const badge = item.id === 'forgot' ? progress.forgotQuestions.length : 0;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => handleNavigate(item.id)}
                  className={`relative flex flex-col items-center justify-center py-2 text-[11px] font-medium cursor-pointer ${
                    active ? 'text-teal-700' : 'text-slate-600'
                  }`}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5" />
                    {badge > 0 && (
                      <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5">{item.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Lazy-mounted Overlays */}
      <Suspense fallback={null}>
        {sessionPlannerOpen && (
          <SessionPlannerModal
            open={sessionPlannerOpen}
            progress={progress}
            onClose={() => setSessionPlannerOpen(false)}
            onLaunchStep={handleLaunchSessionStep}
          />
        )}

        {glossaryOpen && (
          <GlossaryModal
            open={glossaryOpen}
            selectedEntry={glossaryEntry}
            onSelectEntry={setGlossaryEntry}
            onClose={() => setGlossaryOpen(false)}
          />
        )}

        {quickJumpOpen && (
          <QuickJumpModal
            open={quickJumpOpen}
            onClose={() => setQuickJumpOpen(false)}
            onSelect={handleQuickJumpSelect}
          />
        )}

        {tutorOpen && (
          <AiTutorPanel
            open={tutorOpen}
            aiEnabled={progress.preferences.aiTutorEnabled}
            context={activeTutorContext}
            pendingPrompt={pendingTutorPrompt}
            onConsumePendingPrompt={() => setPendingTutorPrompt(null)}
            onToggleAiEnabled={(enabled) => handleUpdatePreferences({ aiTutorEnabled: enabled })}
            onUseBuiltInLesson={handleOpenLesson}
            onClose={() => setTutorOpen(false)}
          />
        )}

        {syncModalOpen && (
          <SyncModal
            open={syncModalOpen}
            syncCode={syncCode}
            syncState={syncState}
            lastSyncedAt={lastSyncedAt}
            syncError={syncError}
            onConnect={handleConnectSync}
            onDisconnect={handleDisconnectSync}
            onSyncNow={handleSyncNow}
            onClose={() => setSyncModalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;
