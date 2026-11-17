import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Calculator,
  ClipboardCheck,
  Cpu,
  EyeOff,
  GraduationCap,
  Home,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { AiTutorPanel } from './components/AiTutorPanel';
import { ChecklistView } from './components/ChecklistView';
import { DisplayControls } from './components/DisplayControls';
import { FocusTimer } from './components/FocusTimer';
import { ForgotView } from './components/ForgotView';
import { GlossaryModal } from './components/GlossaryModal';
import { HomeView } from './components/HomeView';
import { LessonsView } from './components/LessonsView';
import { NumericalsView } from './components/NumericalsView';
import { PracticeView } from './components/PracticeView';
import { SessionPlannerModal } from './components/SessionPlannerModal';
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
import {
  addUnique,
  createDefaultProgress,
  hasSavedSession,
  loadProgress,
  removeItem,
  saveProgress,
  toggleInArray,
} from './utils/storage';
import {
  buildTutorContextForLesson,
  buildTutorContextForNumerical,
  buildTutorContextForQuestion,
} from './utils/tutorContext';

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

  // Navigation sub-states
  const [selectedLessonUnit, setSelectedLessonUnit] = useState<number>(
    () => progress.lastActivity?.unit || 1
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    () => progress.lastActivity?.lessonId || LESSONS[0].id
  );

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
  const [tutorOpen, setTutorOpen] = useState(false);

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
    setProgress((prev) => ({ ...prev, lastActivity: activity }));
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

  const handleLaunchSessionStep = (step: StudySessionStep) => {
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
    setProgress((prev) => ({ ...prev, examDateTimeIST: istValue }));
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: toggleInArray(prev.completedLessons, lessonId),
    }));
  };

  const handleSaveDraft = (qid: string, text: string) => {
    setProgress((prev) => ({
      ...prev,
      questionDrafts: { ...prev.questionDrafts, [qid]: text },
    }));
  };

  const handleToggleSelfCheck = (qid: string, pointIdx: number) => {
    setProgress((prev) => {
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
    setProgress((prev) => ({
      ...prev,
      masteredQuestions: addUnique(prev.masteredQuestions, qid),
      checkedQuestions: addUnique(prev.checkedQuestions, qid),
      forgotQuestions: removeItem(prev.forgotQuestions, qid),
    }));
  };

  const handleMarkQuestionForgot = (qid: string) => {
    setProgress((prev) => ({
      ...prev,
      forgotQuestions: addUnique(prev.forgotQuestions, qid),
      masteredQuestions: removeItem(prev.masteredQuestions, qid),
    }));
  };

  const handleRemoveFromForgot = (qid: string) => {
    setProgress((prev) => ({
      ...prev,
      forgotQuestions: removeItem(prev.forgotQuestions, qid),
    }));
  };

  const handleToggleMasteredNumerical = (nid: string) => {
    const num = NUMERICALS.find((n) => n.id === nid);
    setProgress((prev) => {
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
    setProgress((prev) => ({
      ...prev,
      checkedHighYield: toggleInArray(prev.checkedHighYield, id),
    }));
  };

  const handleToggleQuestionChecked = (qid: string) => {
    setProgress((prev) => ({
      ...prev,
      checkedQuestions: toggleInArray(prev.checkedQuestions, qid),
    }));
  };

  const handleResetAllProgress = () => {
    if (
      window.confirm(
        'Reset all locally saved study progress? Your exam date will reset to Thursday 10:00 AM IST.'
      )
    ) {
      const fresh = createDefaultProgress();
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
              <div className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                Zero-to-Ready · AS25-05PC02
              </div>
            </div>
          </button>

          {/* Desktop Nav Tabs (hidden in low-distraction focus view) */}
          {!isFocusActive ? (
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = view === item.id;
                const badge = item.id === 'forgot' ? progress.forgotQuestions.length : 0;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`relative inline-flex items-center gap-1.5 rounded-xl px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-teal-50 text-teal-900'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? 'text-teal-700' : 'text-slate-400'}`} />
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
              className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800 hover:bg-indigo-100 cursor-pointer"
            >
              <EyeOff className="h-3.5 w-3.5" />
              Exit Focus View
            </button>
          )}

          {/* Right Controls: Optional AI Tutor + Reading Comfort + Calm Focus Timer */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setTutorOpen(true)}
              aria-label="Open optional AI Tutor"
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                progress.preferences.aiTutorEnabled
                  ? 'border-teal-300 bg-teal-50 text-teal-800 hover:bg-teal-100/70'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>
            <DisplayControls
              preferences={progress.preferences}
              onUpdatePreferences={handleUpdatePreferences}
              onOpenGlossaryBrowser={handleOpenGlossaryBrowser}
            />
            <FocusTimer />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 pb-24 sm:px-6 md:pb-10">
        {view === 'home' && (
          <HomeView
            progress={progress}
            showResumeBanner={showResumeBanner}
            onDismissResumeBanner={() => setShowResumeBanner(false)}
            onUpdateExamDateTime={handleUpdateExamDateTime}
            onContinueStudying={handleContinueStudying}
            onOpenSessionPlanner={() => setSessionPlannerOpen(true)}
            onOpenGlossary={handleOpenGlossaryBrowser}
            onOpenUnitLessons={handleOpenUnitLessons}
            onOpenUnitPractice={handleOpenUnitPractice}
            onNavigate={handleNavigate}
          />
        )}

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
      </main>

      {/* Subtle Offline Footer (hidden in focus view) */}
      {!isFocusActive && (
        <footer className="hidden md:block border-t border-slate-200/80 bg-white/70 py-4 text-xs text-slate-500">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <span>
              COA Study Sprint · 100% local & offline · Lessons, drafts, checklists, and missed items save automatically.
            </span>
            <button
              type="button"
              onClick={handleResetAllProgress}
              className="text-slate-400 hover:text-rose-700 hover:underline cursor-pointer"
            >
              Reset saved progress
            </button>
          </div>
        </footer>
      )}

      {/* Mobile Bottom Navigation Bar */}
      {!isFocusActive && (
        <nav
          aria-label="Mobile navigation"
          className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xs md:hidden"
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
                  onClick={() => handleNavigate(item.id)}
                  className={`relative flex flex-col items-center justify-center py-2 text-[10px] font-medium cursor-pointer ${
                    active ? 'text-teal-700' : 'text-slate-500'
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

      {/* Mini Study Session Planner ("How much time do you have?") */}
      <SessionPlannerModal
        open={sessionPlannerOpen}
        progress={progress}
        onClose={() => setSessionPlannerOpen(false)}
        onLaunchStep={handleLaunchSessionStep}
      />

      {/* Quick COA Glossary Modal */}
      <GlossaryModal
        open={glossaryOpen}
        selectedEntry={glossaryEntry}
        onSelectEntry={setGlossaryEntry}
        onClose={() => setGlossaryOpen(false)}
      />

      {/* Optional Server-Side Gemini Flash AI Tutor */}
      <AiTutorPanel
        open={tutorOpen}
        aiEnabled={progress.preferences.aiTutorEnabled}
        context={activeTutorContext}
        onToggleAiEnabled={(enabled) => handleUpdatePreferences({ aiTutorEnabled: enabled })}
        onUseBuiltInLesson={handleOpenLesson}
        onClose={() => setTutorOpen(false)}
      />
    </div>
  );
}

export default App;
