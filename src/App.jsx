import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TestCatalog from "./components/TestCatalog";
import QuizRunner from "./components/QuizRunner";
import ResultsPanel from "./components/ResultsPanel";

const sampleTests = [
  {
    id: "jee-phy-mix-1",
    title: "JEE Physics & Math Mini Test",
    exam: "JEE",
    difficulty: "Moderate",
    duration: 10, // minutes
    tags: ["Physics", "Mathematics"],
    questions: [
      {
        id: 1,
        question: "A particle moves in a circle with constant speed v. Which of the following is true?",
        options: [
          "Acceleration is zero",
          "Acceleration is constant in magnitude and direction",
          "Acceleration is constant in magnitude but not in direction",
          "Acceleration is constant in direction but not in magnitude",
        ],
        answerIndex: 2,
        explanation:
          "Uniform circular motion has constant speed but changing velocity direction. Centripetal acceleration has constant magnitude v^2/r but continuously changes direction toward the center.",
      },
      {
        id: 2,
        question:
          "If log_a(b) = x and log_b(c) = y, then log_a(c) equals which expression?",
        options: ["xy", "x/y", "y/x", "x + y"],
        answerIndex: 0,
        explanation:
          "log_a(c) = log_a(b) * log_b(c) = x * y by base change chaining.",
      },
      {
        id: 3,
        question:
          "The time period of a simple pendulum of length L in a gravitational field g is?",
        options: ["2π√(L/g)", "2π√(g/L)", "π√(L/g)", "π√(g/L)"],
        answerIndex: 0,
        explanation: "Standard pendulum formula: T = 2π√(L/g).",
      },
      {
        id: 4,
        question:
          "Let f(x) = x^3 - 3x. The number of real roots of f(x) = 0 is:",
        options: ["0", "1", "2", "3"],
        answerIndex: 3,
        explanation: "x(x^2 - 3) = 0 ⇒ x = 0, ±√3: three distinct real roots.",
      },
      {
        id: 5,
        question:
          "Two resistors 2Ω and 3Ω are connected in series to a 10V battery. What is the power dissipated by the 3Ω resistor?",
        options: ["6 W", "12 W", "10 W", "3.6 W"],
        answerIndex: 3,
        explanation:
          "Series R = 5Ω, I = V/R = 2 A. Power in 3Ω: I^2 R = 4*3 = 12 W? Wait, current 2A gives 12W. But with 10V over 5Ω, I=2A indeed, so 12W is correct. Correct option is 12 W.",
      },
    ],
  },
  {
    id: "neet-bio-chem-1",
    title: "NEET Biology & Chemistry Mini Test",
    exam: "NEET",
    difficulty: "Easy",
    duration: 8,
    tags: ["Biology", "Chemistry"],
    questions: [
      {
        id: 1,
        question:
          "Which organelle is responsible for ATP production in eukaryotic cells?",
        options: ["Nucleus", "Mitochondria", "Golgi apparatus", "Ribosome"],
        answerIndex: 1,
        explanation: "Mitochondria are the powerhouse of the cell synthesizing ATP via oxidative phosphorylation.",
      },
      {
        id: 2,
        question:
          "The pH of a 1×10^-3 M HCl solution at 25°C is approximately:",
        options: ["1", "2", "3", "11"],
        answerIndex: 2,
        explanation:
          "Strong acid fully dissociates: [H+] = 10^-3 M ⇒ pH = 3.",
      },
      {
        id: 3,
        question:
          "Which of the following is NOT an example of connective tissue?",
        options: ["Blood", "Tendon", "Bone", "Epidermis"],
        answerIndex: 3,
        explanation: "Epidermis is epithelial tissue; blood, tendon, and bone are connective.",
      },
      {
        id: 4,
        question:
          "Avogadro's number corresponds to the number of particles in:",
        options: [
          "1 gram of any substance",
          "1 mole of any substance",
          "1 liter of any gas",
          "1 molal solution",
        ],
        answerIndex: 1,
        explanation: "Avogadro's number is the number of entities in 1 mole, regardless of substance.",
      },
      {
        id: 5,
        question:
          "During inspiration in humans, the diaphragm:",
        options: [
          "Relaxes and moves upward",
          "Contracts and moves downward",
          "Contracts and moves upward",
          "Does not move",
        ],
        answerIndex: 1,
        explanation: "Contraction flattens the diaphragm, increasing thoracic volume to draw air in.",
      },
    ],
  },
];

// Fix incorrect explanation/answer mismatch in sampleTests[0].questions[4]
// Ensure correct answer index matches explanation (12 W)
sampleTests[0].questions[4].answerIndex = 1;

export default function App() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [view, setView] = useState("home"); // home | quiz | results
  const [results, setResults] = useState(null);

  const startTest = (testId) => {
    const t = sampleTests.find((x) => x.id === testId);
    if (!t) return;
    setSelectedTest(t);
    setResults(null);
    setView("quiz");
  };

  const onFinish = (res) => {
    setResults(res);
    setView("results");
  };

  const onRetake = () => {
    if (!selectedTest) return;
    setResults(null);
    setView("quiz");
  };

  const onBackHome = () => {
    setSelectedTest(null);
    setResults(null);
    setView("home");
  };

  const heroSubtitle = useMemo(() => {
    return "Practice intelligent mock tests for JEE & NEET. Time-bound quizzes, instant analytics, and curated question banks to push your rank up.";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header onHome={onBackHome} />
      {view === "home" && (
        <>
          <Hero title="RankUp" subtitle={heroSubtitle} onGetStarted={() => setView("home")} />
          <div className="max-w-6xl mx-auto px-4 pb-20">
            <TestCatalog tests={sampleTests} onStart={startTest} />
          </div>
        </>
      )}

      {view === "quiz" && selectedTest && (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <QuizRunner test={selectedTest} onFinish={onFinish} onExit={onBackHome} />
        </div>
      )}

      {view === "results" && results && (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <ResultsPanel results={results} onRetake={onRetake} onHome={onBackHome} />
        </div>
      )}

      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} RankUp</span>
          <a href="#" className="hover:text-slate-700">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
