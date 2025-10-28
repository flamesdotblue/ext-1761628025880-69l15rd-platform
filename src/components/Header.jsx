import React from "react";
import { Rocket, Trophy } from "lucide-react";

export default function Header({ onHome }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={onHome} className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:opacity-90">
          <span className="p-2 rounded-lg bg-slate-900 text-white"><Rocket size={18} /></span>
          <span className="tracking-tight">RankUp</span>
        </button>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a className="hover:text-slate-900" href="#">JEE</a>
          <a className="hover:text-slate-900" href="#">NEET</a>
          <a className="hover:text-slate-900" href="#">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-slate-50">
            <Trophy size={16} /> Leaderboard
          </button>
        </div>
      </div>
    </header>
  );
}
