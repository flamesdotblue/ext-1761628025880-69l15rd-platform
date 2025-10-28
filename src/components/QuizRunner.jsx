import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Timer } from "lucide-react";

export default function QuizRunner({ test, onFinish, onExit }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // qId -> selected index
  const [secondsLeft, setSecondsLeft] = useState(test.duration * 60);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const timerRef = useRef(null);

  const current = test.questions[index];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      clearInterval(timerRef.current);
      handleSubmit(true);
    }
  }, [secondsLeft]);

  const format = (s) => {
    const m = Math.max(0, Math.floor(s / 60));
    const sec = Math.max(0, s % 60);
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const visitedCount = useMemo(() => Object.keys(answers).length, [answers]);

  const selectOption = (qId, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const next = () => {
    setIndex((i) => Math.min(test.questions.length - 1, i + 1));
  };

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const handleSubmit = (auto = false) => {
    const total = test.questions.length;
    let correct = 0;
    const breakdown = test.questions.map((q) => {
      const selected = answers[q.id];
      const isCorrect = selected === q.answerIndex;
      if (isCorrect) correct += 1;
      return {
        id: q.id,
        question: q.question,
        options: q.options,
        answerIndex: q.answerIndex,
        selected,
        explanation: q.explanation,
        correct: isCorrect,
      };
    });
    onFinish({
      testId: test.id,
      title: test.title,
      exam: test.exam,
      total,
      correct,
      incorrect: total - correct,
      unattempted: total - visitedCount,
      timeTaken: test.duration * 60 - Math.max(0, secondsLeft),
      breakdown,
      auto,
    });
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between bg-slate-50">
        <div>
          <h3 className="font-semibold text-slate-900">{test.title}</h3>
          <p className="text-xs text-slate-500">{test.exam} • {test.questions.length} Questions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${secondsLeft < 60 ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-white text-slate-700"}`}>
            <Timer size={16} /> {format(secondsLeft)}
          </div>
          <button onClick={onExit} className="text-sm text-slate-600 hover:text-slate-900">Exit</button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_280px]">
        <div className="p-5">
          <div className="text-xs text-slate-500 mb-2">Question {index + 1} of {test.questions.length}</div>
          <h4 className="text-lg font-medium text-slate-900 leading-snug">{current.question}</h4>

          <div className="mt-4 grid gap-3">
            {current.options.map((opt, idx) => {
              const selected = answers[current.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectOption(current.id, idx)}
                  className={`text-left w-full border rounded-md p-3 hover:bg-slate-50 ${selected ? "border-slate-900 bg-slate-900/5" : "border-slate-200"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border ${selected ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-500"}`}>{String.fromCharCode(65 + idx)}</span>
                    <span className="text-slate-800">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={prev} disabled={index === 0} className="text-sm rounded-md border px-3 py-2 disabled:opacity-50">Previous</button>
            <div className="flex items-center gap-3">
              <button onClick={() => setConfirmSubmit(true)} className="text-sm rounded-md border px-3 py-2 hover:bg-slate-50">Submit</button>
              <button onClick={next} disabled={index === test.questions.length - 1} className="inline-flex items-center gap-2 text-sm rounded-md bg-slate-900 text-white px-3 py-2 disabled:opacity-50">
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <aside className="p-5 border-t md:border-l md:border-t-0">
          <h5 className="text-sm font-semibold text-slate-900">Question Navigator</h5>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {test.questions.map((q, i) => {
              const visited = answers[q.id] !== undefined;
              const active = i === index;
              return (
                <button
                  key={q.id}
                  onClick={() => setIndex(i)}
                  className={`h-8 rounded text-xs border ${active ? "border-slate-900" : "border-slate-200"} ${visited ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-white text-slate-700"}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-slate-500">Answered: {visitedCount} • Unanswered: {test.questions.length - visitedCount}</div>
        </aside>
      </div>

      {confirmSubmit && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border max-w-sm w-full p-5">
            <h6 className="font-semibold text-slate-900">Submit Test?</h6>
            <p className="text-sm text-slate-600 mt-1">You have answered {visitedCount} out of {test.questions.length} questions. You cannot change answers after submission.</p>
            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={() => setConfirmSubmit(false)} className="text-sm rounded-md border px-3 py-2">Cancel</button>
              <button onClick={() => handleSubmit(false)} className="text-sm rounded-md bg-slate-900 text-white px-3 py-2">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
