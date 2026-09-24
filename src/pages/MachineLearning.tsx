import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  Legend,
} from "recharts";
import { Card, SectionTitle, Disclaimer } from "../components/ui";
import { modelComparison, logisticMetrics, forestMetrics } from "../lib/ml";

function ConfusionMatrix({
  m,
  title,
}: {
  m: { tp: number; tn: number; fp: number; fn: number };
  title: string;
}) {
  const cells = [
    { label: "TN", v: m.tn, cls: "bg-emerald-100 text-emerald-800" },
    { label: "FP", v: m.fp, cls: "bg-rose-50 text-rose-700" },
    { label: "FN", v: m.fn, cls: "bg-rose-50 text-rose-700" },
    { label: "TP", v: m.tp, cls: "bg-emerald-100 text-emerald-800" },
  ];
  return (
    <div>
      <div className="mb-2 text-sm font-semibold text-slate-700">{title}</div>
      <div className="grid grid-cols-2 gap-1.5">
        {cells.map((c) => (
          <div
            key={c.label}
            className={`flex flex-col items-center justify-center rounded-lg py-6 ${c.cls}`}
          >
            <span className="text-2xl font-bold">{c.v}</span>
            <span className="text-xs">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-400">
        <span>Rows: Actual · Cols: Predicted</span>
      </div>
    </div>
  );
}

export default function MachineLearning() {
  const chartData = modelComparison.map((m) => ({
    model: m.model.replace(" (ensemble)", ""),
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    F1: m.f1,
  }));
  const best = modelComparison.reduce((a, b) =>
    a.accuracy >= b.accuracy ? a : b,
  );

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="🤖"
        title="Machine Learning (Educational)"
        subtitle="Binary classification of the 'healthy lifestyle' label — comparing two models."
      />
      <Disclaimer />

      <div className="grid gap-4 md:grid-cols-2">
        {modelComparison.map((m) => (
          <Card key={m.model}>
            <h3 className="font-semibold text-slate-900">{m.model}</h3>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              {(["accuracy", "precision", "recall", "f1"] as const).map((k) => (
                <div key={k} className="rounded-lg bg-slate-50 py-2">
                  <div className="text-lg font-bold text-teal-700">{m[k]}</div>
                  <div className="text-[10px] uppercase text-slate-500">{k}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle title="Model Comparison" subtitle="Metric comparison across models" />
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="model" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Accuracy" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Precision" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Recall" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="F1" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
          🏆 Best educational model: <strong>{best.model}</strong> (accuracy {best.accuracy}).
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <ConfusionMatrix m={logisticMetrics.confusion} title="Logistic Regression" />
        </Card>
        <Card>
          <ConfusionMatrix m={forestMetrics.confusion} title="Random Forest / Ensemble" />
        </Card>
      </div>

      <Card>
        <SectionTitle title="How the models differ" />
        <div className="grid gap-4 text-sm text-slate-700 md:grid-cols-2">
          <div>
            <h4 className="font-semibold text-slate-900">Logistic Regression</h4>
            <p className="mt-1">
              A simple, interpretable linear model that estimates the probability
              of the positive class using a sigmoid of a weighted feature sum.
              Fast and easy to explain, but only captures linear relationships.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Random Forest / Ensemble</h4>
            <p className="mt-1">
              Combines many decision rules and can capture non-linear feature
              interactions, often improving accuracy at the cost of
              interpretability. Neither model is a medical diagnostic tool.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
