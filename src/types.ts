export type AnswerBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'code'; lines: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; caption?: string };

export interface CheckNote {
  label: 'Check this answer';
  reason: string;
}

export interface StudyQuestion {
  id: string;
  unit: number;
  unitRoman: string;
  unitTitle: string;
  marks: 2 | 5 | 10;
  qNum: string;
  question: string;
  blocks: AnswerBlock[];
  hint: string;
  outlinePoints: string[];
  keywords: string[];
  isHighYield: boolean;
  highYieldGroup?: string;
  lessonId: string;
  numericalId?: string;
  checkNote?: CheckNote;
}

export interface UnitMeta {
  unit: number;
  roman: string;
  title: string;
  shortTitle: string;
  tagline: string;
  colorClass: string;
}

export interface LessonTerm {
  term: string;
  meaning: string;
}

export interface BeginnerLesson {
  id: string;
  unit: number;
  order: number;
  title: string;
  estimatedMinutes: number;
  prerequisiteIds: string[];
  bigIdea: string;
  plainEnglish: string[];
  analogy: {
    title: string;
    body: string;
  };
  terms: LessonTerm[];
  workedExample: {
    title: string;
    steps: string[];
    takeaway: string;
  };
  visualTable?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  diagram?: {
    src: string;
    caption: string;
  };
  linkedQuestionIds: string[];
  linkedNumericalIds?: string[];
}

export interface SimpleLessonGuide {
  lessonId: string;
  plainSummary: string[];
  unfamiliarTerms: { term: string; plain: string }[];
  everydayAnalogy: string;
  calcWalkthrough?: {
    title: string;
    steps: string[];
  };
}

export interface GlossaryEntry {
  id: string;
  term: string;
  aliases?: string[];
  unit: number;
  shortExplanation: string;
  example: string;
}

export interface NumericalStep {
  title: string;
  prompt: string;
  hint: string;
  placeholder: string;
  acceptedAnswers: string[];
  workedAnswer: string;
  explanation: string;
  traceRow?: string[];
}

export interface NumericalProblem {
  id: string;
  unit: number;
  questionId: string;
  qNum: string;
  marks: 2 | 5 | 10;
  title: string;
  category: string;
  problemStatement: string;
  givenItems: string[];
  ruleSummary: string;
  traceHeaders?: string[];
  initialTraceRows?: string[][];
  steps: NumericalStep[];
  finalAnswerSummary: string;
  diagram?: {
    src: string;
    caption: string;
  };
  checkNote?: CheckNote;
}

export interface HighYieldTopic {
  id: string;
  unit: number;
  title: string;
  whyHighYield: string;
  marksBadge: string;
  questionIds: string[];
  lessonId: string;
  numericalIds?: string[];
}

export interface LastActivity {
  view: AppView;
  label: string;
  unit?: number;
  lessonId?: string;
  questionId?: string;
  numericalId?: string;
  practiceMarks?: 2 | 5 | 10;
}

export type AppView = 'home' | 'lessons' | 'practice' | 'numericals' | 'checklist' | 'forgot';

export type FontScale = 'normal' | 'large' | 'xlarge';
export type ThemeMode = 'light' | 'dark';

export interface DisplayPreferences {
  theme: ThemeMode;
  fontScale: FontScale;
  focusView: boolean;
  aiTutorEnabled: boolean;
}

export interface StudySessionStep {
  id: string;
  kind: 'forgot' | 'lesson' | 'numerical' | 'practice';
  title: string;
  subtitle: string;
  reasonTag: string;
  minutes: number;
  targetId: string;
  unit: number;
}

export interface StudyProgress {
  examDateTimeIST: string;
  completedLessons: string[];
  masteredQuestions: string[];
  forgotQuestions: string[];
  masteredNumericals: string[];
  checkedHighYield: string[];
  checkedQuestions: string[];
  questionDrafts: Record<string, string>;
  questionSelfChecks: Record<string, number[]>;
  lastActivity: LastActivity | null;
  preferences: DisplayPreferences;
  updatedAt?: number;
  resetAt?: number;
}
