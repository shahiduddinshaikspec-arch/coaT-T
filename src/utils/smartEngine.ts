import { HIGH_YIELD_TOPICS } from '../data/highYield';
import { LESSONS } from '../data/lessons';
import { NUMERICALS } from '../data/numericals';
import { QUESTIONS, UNITS } from '../data/questions';
import type { StudyProgress } from '../types';
import { getCountdownParts } from './storage';

export interface SmartRecommendation {
  kind: 'forgot' | 'lesson' | 'numerical' | 'practice';
  title: string;
  reason: string;
  estimatedMinutes: number;
  targetId: string;
  unit: number;
  badge: string;
}

export interface UnitReadiness {
  unit: number;
  roman: string;
  shortTitle: string;
  score: number; // 0..100 weighted exam readiness
  lessonsDone: number;
  lessonsTotal: number;
  highYieldDone: number;
  highYieldTotal: number;
  numericalsDone: number;
  numericalsTotal: number;
  forgotCount: number;
}

export function computeUnitReadiness(progress: StudyProgress): UnitReadiness[] {
  return UNITS.map((u) => {
    const unitLessons = LESSONS.filter((l) => l.unit === u.unit);
    const lessonsDone = unitLessons.filter((l) =>
      progress.completedLessons.includes(l.id)
    ).length;

    const unitHY = HIGH_YIELD_TOPICS.filter((h) => h.unit === u.unit);
    const highYieldDone = unitHY.filter((h) => progress.checkedHighYield.includes(h.id)).length;

    const unitNums = NUMERICALS.filter((n) => n.unit === u.unit);
    const numericalsDone = unitNums.filter((n) =>
      progress.masteredNumericals.includes(n.id)
    ).length;

    const unitQs = QUESTIONS.filter((q) => q.unit === u.unit);
    const qsDone = unitQs.filter((q) => progress.masteredQuestions.includes(q.id)).length;
    const forgotCount = unitQs.filter((q) => progress.forgotQuestions.includes(q.id)).length;

    // Weighted exam-readiness formula:
    // 35% beginner lessons + 35% high-yield/questions + 20% numericals (or redistributed if unit has no numericals) + 10% mastery bonus
    const lessonRatio = unitLessons.length ? lessonsDone / unitLessons.length : 1;
    const hyRatio = unitHY.length ? highYieldDone / unitHY.length : 1;
    const qRatio = unitQs.length ? qsDone / unitQs.length : 1;
    const numRatio = unitNums.length ? numericalsDone / unitNums.length : hyRatio;

    const rawScore = (lessonRatio * 0.35 + hyRatio * 0.25 + qRatio * 0.25 + numRatio * 0.15) * 100;
    const score = Math.min(100, Math.round(rawScore));

    return {
      unit: u.unit,
      roman: u.roman,
      shortTitle: u.shortTitle,
      score,
      lessonsDone,
      lessonsTotal: unitLessons.length,
      highYieldDone,
      highYieldTotal: unitHY.length,
      numericalsDone,
      numericalsTotal: unitNums.length,
      forgotCount,
    };
  });
}

/**
 * Picks the single highest-return calm next study action for the student right now.
 */
export function getSmartRecommendation(progress: StudyProgress): SmartRecommendation {
  // 1. If the student has missed questions in Forgot-This, clearing the first one is highest ROI
  if (progress.forgotQuestions.length > 0) {
    const qid = progress.forgotQuestions[0];
    const q = QUESTIONS.find((item) => item.id === qid);
    if (q) {
      return {
        kind: 'forgot',
        title: `Retry missed question: Unit ${q.unitRoman} ${q.qNum} (${q.marks}M)`,
        reason: `Clearing missed questions early locks in recall. (${progress.forgotQuestions.length} waiting in Forgot-This)`,
        estimatedMinutes: q.marks === 2 ? 3 : q.marks === 5 ? 5 : 8,
        targetId: q.id,
        unit: q.unit,
        badge: 'High-Return Review',
      };
    }
  }

  // 2. Find the weakest unit that still has an unread prerequisite lesson for a High-Yield 5M/10M topic
  const readiness = computeUnitReadiness(progress);
  const sortedUnits = [...readiness].sort((a, b) => a.score - b.score || a.unit - b.unit);

  for (const ur of sortedUnits) {
    // Check if there is a high-yield topic whose foundation lesson isn't completed yet
    const hyTopics = HIGH_YIELD_TOPICS.filter((h) => h.unit === ur.unit);
    for (const hy of hyTopics) {
      const lesson = LESSONS.find((l) => l.id === hy.lessonId);
      if (lesson && !progress.completedLessons.includes(lesson.id)) {
        // Respect prerequisites! If a prerequisite lesson isn't done yet, recommend the prerequisite first
        const unmetPrereq = lesson.prerequisiteIds
          .map((pid) => LESSONS.find((l) => l.id === pid))
          .find((pl) => pl && !progress.completedLessons.includes(pl.id));

        if (unmetPrereq) {
          return {
            kind: 'lesson',
            title: `Lesson ${unmetPrereq.unit}.${unmetPrereq.order}: ${unmetPrereq.title}`,
            reason: `Quick foundation needed before ${hy.title} (${hy.marksBadge})`,
            estimatedMinutes: unmetPrereq.estimatedMinutes,
            targetId: unmetPrereq.id,
            unit: unmetPrereq.unit,
            badge: 'Foundation First',
          };
        }

        return {
          kind: 'lesson',
          title: `Lesson ${lesson.unit}.${lesson.order}: ${lesson.title}`,
          reason: `Unlocks "${hy.title}" — repeated across ${hy.marksBadge}`,
          estimatedMinutes: lesson.estimatedMinutes,
          targetId: lesson.id,
          unit: lesson.unit,
          badge: `Shared ${hy.marksBadge}`,
        };
      }
    }

    // 3. Next, recommend an unmastered step-by-step numerical in this unit (guaranteed exam marks!)
    const nextNum = NUMERICALS.find(
      (n) => n.unit === ur.unit && !progress.masteredNumericals.includes(n.id)
    );
    if (nextNum) {
      return {
        kind: 'numerical',
        title: `Step-by-Step Math: ${nextNum.title}`,
        reason: `Worked numericals (${nextNum.marks}M · ${nextNum.qNum}) are the cleanest way to secure full marks.`,
        estimatedMinutes: nextNum.marks === 10 ? 8 : 6,
        targetId: nextNum.id,
        unit: nextNum.unit,
        badge: `${nextNum.marks}M Calculation`,
      };
    }

    // 4. Next, recommend an unmastered high-yield 5M/10M question in this unit
    const nextQ = QUESTIONS.find(
      (q) =>
        q.unit === ur.unit &&
        q.isHighYield &&
        (q.marks === 5 || q.marks === 10) &&
        !progress.masteredQuestions.includes(q.id)
    );
    if (nextQ) {
      return {
        kind: 'practice',
        title: `Outline Practice: Unit ${nextQ.unitRoman} ${nextQ.qNum} (${nextQ.marks}M)`,
        reason: nextQ.question,
        estimatedMinutes: nextQ.marks === 10 ? 10 : 5,
        targetId: nextQ.id,
        unit: nextQ.unit,
        badge: `High-Yield ${nextQ.marks}M`,
      };
    }
  }

  // 5. Fallback: any remaining unmastered question
  const anyLeft = QUESTIONS.find((q) => !progress.masteredQuestions.includes(q.id)) || QUESTIONS[0];
  return {
    kind: 'practice',
    title: `Quick Recall: Unit ${anyLeft.unitRoman} ${anyLeft.qNum} (${anyLeft.marks}M)`,
    reason: 'All priority foundations are covered — do a calm recall pass to keep concepts fresh.',
    estimatedMinutes: 3,
    targetId: anyLeft.id,
    unit: anyLeft.unit,
    badge: 'Light Refresh',
  };
}

export function getCalmPaceNote(progress: StudyProgress, nowMs: number = Date.now()): string {
  const cd = getCountdownParts(progress.examDateTimeIST, nowMs);
  const remainingLessons = LESSONS.length - progress.completedLessons.length;
  const remainingHY = HIGH_YIELD_TOPICS.length - progress.checkedHighYield.length;
  const remainingNums = NUMERICALS.length - progress.masteredNumericals.length;

  if (cd.isPast) {
    return 'Exam time is here — trust the structures and diagrams you practiced.';
  }

  if (remainingLessons === 0 && remainingHY === 0 && remainingNums === 0) {
    return 'All core lessons, high-yield topics, and numericals are covered. A light 15-minute review is plenty.';
  }

  const estMinutesLeft = remainingLessons * 7 + remainingNums * 6 + Math.max(0, remainingHY - remainingLessons) * 4;
  const blocks = Math.max(1, Math.ceil(estMinutesLeft / 25));

  if (cd.totalHours <= 12) {
    return `~${cd.totalHours}h to exam · Focus on ${Math.min(remainingHY, 6)} shared 5M/10M topics & Booth’s/2’s-comp numericals (~${Math.min(blocks, 5)} calm 25m sprints).`;
  }

  return `~${cd.totalHours}h left · ${blocks} calm 25-min study blocks comfortably cover your remaining ${remainingLessons} lessons, ${remainingNums} numericals, and ${remainingHY} high-yield topics.`;
}
