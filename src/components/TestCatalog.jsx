import React from "react";
import { Play, Timer } from "lucide-react";

export default function TestCatalog({ tests, onStart }) {
  return (
    <section id="catalog" className="mt-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Available Mock Tests</h2>
          <p className="text-slate-600 text-sm">Handpicked sets to mirror exam patterns</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tests.map((t) => (
          <article key={t.id} className="rounded-lg border shadow-sm bg-white p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-700">{t.exam}</span>
              <span className="text-xs text-slate-500">{t.difficulty}</span>
            </div>
            <h3 className="mt-3 font-semibold text-slate-900">{t.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-slate-50 border text-slate-600">{tag}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <div className="inline-flex items-center gap-1"><Timer size={16} /> {t.duration} min</div>
              <span>{t.questions.length} Qs</span>
            </div>
            <button onClick={() => onStart(t.id)} className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 text-white py-2 hover:bg-slate-800">
              <Play size={16} /> Start Test
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
