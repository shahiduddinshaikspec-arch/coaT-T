import { LESSONS } from '../data/lessons';
import { NUMERICALS } from '../data/numericals';
import { QUESTIONS } from '../data/questions';
import type { AnswerBlock, StudyQuestion } from '../types';

export interface TutorTopicContext {
  topicKey: string;
  topicTitle: string;
  lessonId: string;
  excerpt: string;
  sourceLabels: string[];
}

function blocksToPlainText(blocks: AnswerBlock[]): string {
  const lines: string[] = [];
  for (const b of blocks) {
    if (b.type === 'paragraph') {
      lines.push(b.text);
    } else if (b.type === 'bullet') {
      lines.push(`- ${b.text}`);
    } else if (b.type === 'code') {
      lines.push(b.lines.join('\n'));
    } else if (b.type === 'table') {
      lines.push(b.headers.join(' | '));
      for (const row of b.rows) {
        lines.push(row.join(' | '));
      }
    } else if (b.type === 'image' && b.caption) {
      lines.push(`[Diagram: ${b.caption}]`);
    }
  }
  return lines.join('\n');
}

function formatQuestionExcerpt(q: StudyQuestion): string {
  const parts = [
    `[Unit ${q.unitRoman} ${q.qNum} (${q.marks}M)] ${q.question}`,
    `Answer Key:\n${blocksToPlainText(q.blocks)}`,
  ];
  if (q.checkNote) {
    parts.push(`FLAG — ${q.checkNote.label}: ${q.checkNote.reason}`);
  }
  return parts.join('\n');
}

export function buildTutorContextForQuestion(questionId: string): TutorTopicContext {
  const q = QUESTIONS.find((item) => item.id === questionId) || QUESTIONS[0];
  const excerpt = formatQuestionExcerpt(q).slice(0, 4200);
  return {
    topicKey: `q:${q.id}`,
    topicTitle: `Unit ${q.unitRoman} ${q.qNum} (${q.marks}M): ${q.question}`,
    lessonId: q.lessonId,
    excerpt,
    sourceLabels: [`Unit ${q.unitRoman} ${q.qNum} (${q.marks}M)`],
  };
}

export function buildTutorContextForNumerical(numericalId: string): TutorTopicContext {
  const num = NUMERICALS.find((n) => n.id === numericalId) || NUMERICALS[0];
  const q = QUESTIONS.find((item) => item.id === num.questionId);
  const parts = [
    `Calculation Topic: ${num.title} (Unit ${num.unit} ${num.qNum}, ${num.marks}M)`,
    `Problem: ${num.problemStatement}`,
    `Rule: ${num.ruleSummary}`,
  ];
  if (q) {
    parts.push(formatQuestionExcerpt(q));
  }
  if (num.checkNote && !q?.checkNote) {
    parts.push(`FLAG — ${num.checkNote.label}: ${num.checkNote.reason}`);
  }
  return {
    topicKey: `num:${num.id}`,
    topicTitle: `${num.title} (Unit ${num.unit} ${num.qNum})`,
    lessonId: q?.lessonId || `l${num.unit}-1`,
    excerpt: parts.join('\n\n').slice(0, 4200),
    sourceLabels: [`Unit ${num.unit} ${num.qNum} (${num.marks}M)`],
  };
}

export function buildTutorContextForLesson(lessonId: string): TutorTopicContext {
  const lesson = LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
  const linkedQs = lesson.linkedQuestionIds
    .map((id) => QUESTIONS.find((q) => q.id === id))
    .filter((q): q is StudyQuestion => Boolean(q));

  // Include only the most relevant 2–3 questions for this lesson, capped at 4,200 chars
  // Prefer high-yield 5M/10M + 1 concise 2M so only the relevant excerpt is sent.
  const sorted = [...linkedQs].sort((a, b) => {
    const scoreA = (a.isHighYield ? 10 : 0) + (a.marks === 5 ? 4 : a.marks === 10 ? 3 : 1);
    const scoreB = (b.isHighYield ? 10 : 0) + (b.marks === 5 ? 4 : b.marks === 10 ? 3 : 1);
    return scoreB - scoreA;
  });

  const chunks: string[] = [];
  const labels: string[] = [];
  let charCount = 0;

  for (const q of sorted) {
    const formatted = formatQuestionExcerpt(q);
    if (chunks.length > 0 && charCount + formatted.length > 3900) {
      break;
    }
    chunks.push(formatted);
    labels.push(`U${q.unit} ${q.qNum} (${q.marks}M)`);
    charCount += formatted.length;
    if (chunks.length >= 3) break;
  }

  return {
    topicKey: `lesson:${lesson.id}`,
    topicTitle: `Lesson ${lesson.unit}.${lesson.order}: ${lesson.title}`,
    lessonId: lesson.id,
    excerpt: chunks.join('\n\n---\n\n').slice(0, 4200),
    sourceLabels: labels,
  };
}
