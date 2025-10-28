import React from "react";
import { BookOpen } from "lucide-react";

export default function Hero({ title, subtitle, onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 via-transparent to-transparent" />
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            {title}: Crack JEE & NEET with Confidence
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onGetStarted} className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-md hover:bg-slate-800">
              <BookOpen size={18} /> Start Practicing
            </button>
            <a href="#catalog" className="inline-flex items-center gap-2 border px-5 py-3 rounded-md text-slate-700 hover:bg-slate-50">
              Browse Tests
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video w-full rounded-xl border shadow-sm bg-white/70 backdrop-blur p-6">
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2" />
                Adaptive question mix for real exam feel
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-sky-500 mt-2" />
                Detailed solutions and instant score analytics
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-amber-500 mt-2" />
                Time-bound practice with pause protection
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-fuchsia-500 mt-2" />
                Clean, distraction-free interface designed for focus
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
