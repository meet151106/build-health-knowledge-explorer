import { useState } from "react";
import { Card, SectionTitle } from "../components/ui";
import { reportSections } from "../data/report";
import { vivaQA, pptOutline } from "../data/content";

type Tab = "report" | "install" | "viva" | "ppt";

const installSteps = [
  { t: "1. Get the project", c: "cd Health_Knowledge_Explorer" },
  { t: "2. Create virtual environment", c: "python -m venv venv\nsource venv/bin/activate   # Windows: venv\\Scripts\\activate" },
  { t: "3. Install dependencies", c: "pip install -r requirements.txt" },
  { t: "4. Run the Streamlit app", c: "streamlit run app.py" },
  { t: "5. (Optional) Open the notebook", c: "jupyter notebook notebooks/health_analysis.ipynb" },
];

export default function Documentation() {
  const [tab, setTab] = useState<Tab>("report");
  const [openQ, setOpenQ] = useState<number | null>(0);

  const tabs: { id: Tab; label: string }[] = [
    { id: "report", label: "📄 Project Report" },
    { id: "install", label: "⚙️ Install & Run" },
    { id: "viva", label: "🎤 Viva Q&A" },
    { id: "ppt", label: "📽️ PPT Outline" },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="📘"
        title="Project Documentation"
        subtitle="Complete college-project report, setup guide, viva questions and presentation outline."
      />

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-teal-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "report" && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="text-xs uppercase tracking-widest text-teal-300">
              College Data Science Project Report
            </div>
            <h2 className="mt-2 text-2xl font-bold">Health Knowledge Explorer</h2>
            <p className="mt-1 text-sm text-slate-300">
              An Educational Health-Information and Data-Analysis System
            </p>
          </Card>
          {reportSections.map((s) => (
            <Card key={s.id}>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              {s.body.length > 1 ? (
                <ul className="mt-2 space-y-1.5">
                  {s.body.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-teal-500">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-slate-700">{s.body[0]}</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === "install" && (
        <div className="space-y-4">
          <Card>
            <SectionTitle title="Step-by-step Installation & Execution" />
            <div className="space-y-3">
              {installSteps.map((s) => (
                <div key={s.t}>
                  <div className="text-sm font-medium text-slate-700">{s.t}</div>
                  <pre className="mt-1 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-teal-100">
                    <code>{s.c}</code>
                  </pre>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SectionTitle title="Sample Output" />
            <ul className="space-y-1.5 text-sm text-slate-700">
              <li>• Streamlit app opens at http://localhost:8501</li>
              <li>• Home dashboard shows 50 records, 17 attributes, 0 missing.</li>
              <li>• EDA renders histograms, box plots, scatter & heatmap.</li>
              <li>• ML page shows model comparison table & confusion matrix.</li>
              <li>• Prediction page returns an educational lifestyle pattern label.</li>
            </ul>
          </Card>
        </div>
      )}

      {tab === "viva" && (
        <div className="space-y-3">
          {vivaQA.map((qa, i) => (
            <Card key={i} className="cursor-pointer" >
              <button
                onClick={() => setOpenQ(openQ === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-medium text-slate-900">
                  Q{i + 1}. {qa.q}
                </span>
                <span className="text-slate-400">{openQ === i ? "−" : "+"}</span>
              </button>
              {openQ === i && (
                <p className="mt-3 text-sm text-slate-700">{qa.a}</p>
              )}
            </Card>
          ))}
        </div>
      )}

      {tab === "ppt" && (
        <Card>
          <SectionTitle title="Presentation / PPT Outline" subtitle="16-slide structure" />
          <div className="space-y-2">
            {pptOutline.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                {s}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
