import { useState } from "react";
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import DatasetExplorer from "./pages/DatasetExplorer";
import EDA from "./pages/EDA";
import Preprocessing from "./pages/Preprocessing";
import MachineLearning from "./pages/MachineLearning";
import Prediction from "./pages/Prediction";
import VizDashboard from "./pages/VizDashboard";
import Conclusion from "./pages/Conclusion";
import Documentation from "./pages/Documentation";
import ProjectFiles from "./pages/ProjectFiles";
import { cn } from "./utils/cn";

const nav = [
  { id: "home", label: "Home Dashboard", icon: "🏠", el: <Home /> },
  { id: "knowledge", label: "Health Knowledge", icon: "📚", el: <Knowledge /> },
  { id: "dataset", label: "Dataset Explorer", icon: "🗂️", el: <DatasetExplorer /> },
  { id: "eda", label: "Exploratory Analysis", icon: "📊", el: <EDA /> },
  { id: "prep", label: "Data Preprocessing", icon: "🧹", el: <Preprocessing /> },
  { id: "ml", label: "Machine Learning", icon: "🤖", el: <MachineLearning /> },
  { id: "predict", label: "Interactive Prediction", icon: "🔮", el: <Prediction /> },
  { id: "viz", label: "Visualization Dashboard", icon: "📈", el: <VizDashboard /> },
  { id: "conclusion", label: "Conclusion", icon: "📝", el: <Conclusion /> },
  { id: "docs", label: "Documentation", icon: "📘", el: <Documentation /> },
  { id: "files", label: "Project Files", icon: "📦", el: <ProjectFiles /> },
];

export default function App() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const current = nav.find((n) => n.id === active) ?? nav[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2 font-bold">
          🩺 <span>Health Knowledge Explorer</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
        >
          ☰
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 bg-gradient-to-br from-teal-600 to-emerald-600 p-5 text-white">
              <div className="text-lg font-bold">🩺 Health Knowledge</div>
              <div className="text-sm text-teal-100">Explorer</div>
              <div className="mt-1 text-xs text-teal-200">
                Educational Data Science Project
              </div>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setActive(n.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                    active === n.id
                      ? "bg-teal-50 font-semibold text-teal-700"
                      : "text-slate-600 hover:bg-slate-100",
                  )}
                >
                  <span>{n.icon}</span>
                  {n.label}
                </button>
              ))}
            </nav>
            <div className="border-t border-slate-200 p-3">
              <div className="rounded-lg bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-800">
                ⚠️ Educational use only. Not a medical diagnosis or advice.
                Consult a qualified healthcare professional.
              </div>
            </div>
          </div>
        </aside>

        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          />
        )}

        {/* Main content */}
        <main className="min-h-screen flex-1 px-4 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 hidden items-center gap-2 text-sm text-slate-400 lg:flex">
              <span>{current.icon}</span>
              <span>Health Knowledge Explorer</span>
              <span>/</span>
              <span className="font-medium text-slate-600">{current.label}</span>
            </div>
            {current.el}
            <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
              Health Knowledge Explorer · Educational Data Science Project ·
              Sources: WHO, CDC · Not for medical use.
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
