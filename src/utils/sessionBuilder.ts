import { HIGH_YIELD_TOPICS } from '../data/highYield';
import { LESSONS } from '../data/lessons';
import { NUMERICALS } from '../data/numericals';
import { QUESTIONS } from '../data/questions';
import type { StudyProgress, StudySessionStep } from '../types';

export type SessionDuration = 10 | 20 | 40 | 60;

export function buildTimedStudySession(
  budgetMinutes: SessionDuration,
  progress: StudyProgress
): StudySessionStep[] {
  const plan: StudySessionStep[] = [];
  const usedTargets = new Set<string>();
  let remaining: number = budgetMinutes;

  const tryAdd = (step: StudySessionStep): boolean => {
    const key = `${step.kind}:${step.targetId}`;
    if (usedTargets.has(key)) return false;
    if (step.minutes > remaining && plan.length > 0) return false;
    plan.push(step);
    usedTargets.add(key);
    remaining = Math.max(0, remaining - step.minutes);
    return true;
  };

  // Priority 1: Missed questions in "Forgot This"
  const forgotIds = progress.forgotQuestions;
  for (const qid of forgotIds) {
    if (remaining < 2) break;
    const q = QUESTIONS.find((item) => item.id === qid);
    if (!q) continue;
    const mins = q.marks === 2 ? 3 : q.marks === 5 ? 5 : 7;
    tryAdd({
      id: `sess-forgot-${q.id}`,
      kind: 'forgot',
      title: `Retry U${q.unit} ${q.qNum} (${q.marks}M)`,
      subtitle: q.question,
      reasonTag: 'Missed earlier',
      minutes: Math.min(mins, remaining || mins),
      targetId: q.id,
      unit: q.unit,
    });
  }

  // Priority 2: Topics shared across 5- and 10-mark questions (High-Yield)
  // Order unchecked high-yield topics first, then any remaining high-yield topics
  const prioritizedHighYield = [
    ...HIGH_YIELD_TOPICS.filter((t) => !progress.checkedHighYield.includes(t.id)),
    ...HIGH_YIELD_TOPICS.filter((t) => progress.checkedHighYield.includes(t.id)),
  ];

  for (const topic of prioritizedHighYield) {
    if (remaining < 4) break;

    // 2a. If its beginner lesson isn't completed yet, teach the foundation first!
    const lesson = LESSONS.find((l) => l.id === topic.lessonId);
    if (lesson && !progress.completedLessons.includes(lesson.id)) {
      const lessonMins = Math.min(lesson.estimatedMinutes, budgetMinutes === 10 ? 6 : 8);
      if (lessonMins <= remaining || plan.length === 0) {
        tryAdd({
          id: `sess-lesson-${lesson.id}`,
          kind: 'lesson',
          title: `Lesson ${lesson.unit}.${lesson.order}: ${lesson.title}`,
          subtitle: `Builds foundation for ${topic.marksBadge} (${topic.title})`,
          reasonTag: `Shared ${topic.marksBadge}`,
          minutes: lessonMins,
          targetId: lesson.id,
          unit: lesson.unit,
        });
      }
    }

    if (remaining < 4) break;

    // 2b. If this shared topic has an unmastered step-by-step numerical, include it!
    if (topic.numericalIds) {
      const nextNumId = topic.numericalIds.find(
        (nid) => !progress.masteredNumericals.includes(nid)
      );
      if (nextNumId) {
        const num = NUMERICALS.find((n) => n.id === nextNumId);
        if (num && remaining >= 5) {
          tryAdd({
            id: `sess-num-${num.id}`,
            kind: 'numerical',
            title: `Worked Calculation: ${num.title}`,
            subtitle: `Unit ${num.unit} ${num.qNum} (${num.marks}M) — step-by-step practice`,
            reasonTag: `Shared ${topic.marksBadge}`,
            minutes: num.marks === 10 ? 8 : 6,
            targetId: num.id,
            unit: num.unit,
          });
        }
      }
    }

    if (remaining < 4) break;

    // 2c. Pick an unmastered 5M or 10M question from this shared topic
    const nextQId = topic.questionIds.find((qid) => {
      const q = QUESTIONS.find((item) => item.id === qid);
      return q && (q.marks === 5 || q.marks === 10) && !progress.masteredQuestions.includes(qid);
    });
    if (nextQId) {
      const q = QUESTIONS.find((item) => item.id === nextQId);
      if (q) {
        const qMins = q.marks === 5 ? 5 : 8;
        if (qMins <= remaining || plan.length === 0) {
          tryAdd({
            id: `sess-prac-${q.id}`,
            kind: 'practice',
            title: `Outline Practice: U${q.unit} ${q.qNum} (${q.marks}M)`,
            subtitle: q.question,
            reasonTag: `Shared ${topic.marksBadge}`,
            minutes: qMins,
            targetId: q.id,
            unit: q.unit,
          });
        }
      }
    }
  }

  // Priority 3: Fill any leftover minutes with quick 2M recall or remaining lessons
  if (remaining >= 3) {
    const quick2Ms = QUESTIONS.filter(
      (q) => q.marks === 2 && !progress.masteredQuestions.includes(q.id)
    );
    for (const q of quick2Ms) {
      if (remaining < 3) break;
      tryAdd({
        id: `sess-2m-${q.id}`,
        kind: 'practice',
        title: `Quick 2-Mark Recall: U${q.unit} ${q.qNum}`,
        subtitle: q.question,
        reasonTag: 'Quick recall',
        minutes: 3,
        targetId: q.id,
        unit: q.unit,
      });
    }
  }

  return plan;
}
