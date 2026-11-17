import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { AnswerBlock, CheckNote } from '../types';

interface Props {
  blocks: AnswerBlock[];
  checkNote?: CheckNote;
  compact?: boolean;
}

export const AnswerBlocksRenderer: React.FC<Props> = ({ blocks, checkNote, compact = false }) => {
  return (
    <div className={compact ? 'space-y-2.5 text-sm leading-relaxed text-slate-700' : 'space-y-3.5 text-[15px] leading-relaxed text-slate-700'}>
      {checkNote && (
        <div
          role="note"
          className="rounded-xl border border-amber-300 bg-amber-50/90 p-3.5 text-sm text-amber-950"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            <div>
              <span className="inline-block rounded bg-amber-200/80 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
                {checkNote.label}
              </span>
              <p className="mt-1 leading-relaxed text-amber-950/90">{checkNote.reason}</p>
            </div>
          </div>
        </div>
      )}

      {blocks.map((block, idx) => {
        if (block.type === 'paragraph') {
          return (
            <p key={idx} className="text-slate-700">
              {block.text}
            </p>
          );
        }

        if (block.type === 'bullet') {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-1">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
              <p className="text-slate-700">{block.text}</p>
            </div>
          );
        }

        if (block.type === 'code') {
          return (
            <pre
              key={idx}
              className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs sm:text-sm leading-6 text-slate-800"
            >
              {block.lines.join('\n')}
            </pre>
          );
        }

        if (block.type === 'image') {
          return (
            <figure
              key={idx}
              className="diagram-card my-2 rounded-xl border border-slate-200 bg-white p-3 text-center"
            >
              <img
                src={block.src}
                alt={block.caption || 'Course diagram'}
                loading="lazy"
                className="mx-auto max-h-72 w-auto max-w-full object-contain"
              />
              {block.caption && (
                <figcaption className="mt-2 text-xs text-slate-500">{block.caption}</figcaption>
              )}
            </figure>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={idx} className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full min-w-[360px] border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {block.headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className="px-3 py-2 font-semibold text-slate-700 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {block.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/60">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-2 text-slate-700 align-top">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
