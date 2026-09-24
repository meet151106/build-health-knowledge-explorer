import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  ScatterChart, Scatter, ZAxis, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { Card, SectionTitle } from "../components/ui";
import { groupMean, scatterData } from "../lib/stats";
import { featureImportance, modelComparison } from "../lib/ml";
import { NumericColumn, NUMERIC_COLUMNS } from "../data/dataset";

export default function VizDashboard() {
  const [group, setGroup] = useState<"gender" | "smoker" | "healthy_lifestyle">(
    "gender",
  );
  const [metric, setMetric] = useState<NumericColumn>("bmi");
  const bar = groupMean(group, metric);
  const scatter = scatterData("daily_steps", "systolic_bp");
  const yesData = scatter.filter((d) => d.group === "Yes");
  const noData = scatter.filter((d) => d.group === "No");

  const importance = featureImportance.slice(0, 8).map((f) => ({
    feature: f.feature.replace(/_/g, " "),
    importance: f.importance,
  }));

  const radar = modelComparison.map((m) => ({
    metric: m.model.replace(" (ensemble)", ""),
    Accuracy: m.accuracy,
    F1: m.f1,
  }));

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="📈"
        title="Data Visualization Dashboard"
        subtitle="Distributions, feature relationships, importance and model performance."
      />

      <Card>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="font-semibold text-slate-800">Group Averages</h3>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value as typeof group)}
            className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
          >
            <option value="gender">gender</option>
            <option value="smoker">smoker</option>
            <option value="healthy_lifestyle">healthy_lifestyle</option>
          </select>
          <span className="text-slate-400">→</span>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as NumericColumn)}
            className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
          >
            {NUMERIC_COLUMNS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bar}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Feature Relationship" subtitle="Steps vs Systolic BP" />
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart>
              <CartesianGrid stroke="#e2e8f0" />
              <XAxis type="number" dataKey="x" name="steps" tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="y" name="bp" tick={{ fontSize: 11 }} />
              <ZAxis range={[50, 50]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="Healthy: Yes" data={yesData} fill="#14b8a6" />
              <Scatter name="Healthy: No" data={noData} fill="#f43f5e" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle title="Feature Importance" subtitle="Top features (logistic weights)" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={importance} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="feature" width={110} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Model Performance Radar" />
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
            <Radar name="Accuracy" dataKey="Accuracy" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.4} />
            <Radar name="F1" dataKey="F1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
