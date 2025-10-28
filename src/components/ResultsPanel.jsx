import React from "react";
import { Trophy, Timer } from "lucide-react";

export default function ResultsPanel({ results, onRetake, onHome }) {
  const accuracy = results.total ? Math.round((results.correct / results.total) * 100) : 0;
  const time = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">Results: {results.title}</h3>
          <p className="text-xs text-slate-500">{results.exam} • {results.total} Questions</p>
        </div>
        <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border bg-white text-slate-700">
          <Timer size={16} /> {time(results.timeTaken)}
        </div>
      </div>

      <div className="p-5 grid md:grid-cols-3 gap-5">
        <div className="md:col-span-1">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 text-yellow-800"><Trophy size={18} /></div>
              <div>
                <div className="text-3xl font-bold leading-tight">{results.correct}/{results.total}</div>
                <div className="text-sm text-slate-600">Correct Answers</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 text-center text-sm">
              <div>
                <div className="font-semibold">{accuracy}%</div>
                <div className="text-slate-500">Accuracy</div>
              </div>
              <div>
                <div className="font-semibold">{results.incorrect}</div>
                <div className="text-slate-500">Incorrect</div>
              </div>
              <div>
                <div className="font-semibold">{results.unattempted}</div>
                <div className="text-slate-500">Unattempted</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={onRetake} className="flex-1 rounded-md bg-slate-900 text-white py-2 text-sm hover:bg-slate-800">Retake</button>
              <button onClick={onHome} className="flex-1 rounded-md border py-2 text-sm">Home</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-semibold text-slate-900 mb-3">Review Solutions</h4>
          <div className="space-y-4">
            {results.breakdown.map((b, i) => {
              const status = b.selected === undefined ? "Unattempted" : b.correct ? "Correct" : "Incorrect";
              return (
                <div key={b.id} className="rounded-lg border p-4">
                  <div className="text-xs text-slate-500 mb-1">Q{i + 1} • {status}</div>
                  <div className="font-medium text-slate-900">{b.question}</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {b.options.map((opt, idx) => {
                      const isAnswer = idx === b.answerIndex;
                      const isSelected = idx === b.selected;
                      return (
                        <li key={idx} className={`rounded-md border p-2 ${isAnswer ? "border-emerald-300 bg-emerald-50" : "border-slate-200"} ${isSelected && !isAnswer ? "border-rose-300 bg-rose-50" : ""}`}>
                          <span className="font-mono mr-2">{String.fromCharCode(65 + idx)}.</span>
                          {opt}
                        </li>
                      );
                    })}
                  </ul>
                  <details className="mt-3 text-sm text-slate-700">
                    <summary className="cursor-pointer select-none text-slate-800">Explanation</summary>
                    <p className="mt-2">{b.explanation}</p>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
