import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart,
  Scatter, CartesianGrid, ZAxis, Legend,
} from "recharts";
import { Card, SectionTitle } from "../components/ui";
import { NUMERIC_COLUMNS, NumericColumn } from "../data/dataset";
import { histogram, scatterData, boxStats, correlationMatrix } from "../lib/stats";

function heatColor(v: number) {
  // v in [-1,1]
  if (v >= 0) {
    const t = v;
    return `rgb(${255 - t * 235}, ${255 - t * 110}, ${255 - t * 175})`;
  }
  const t = -v;
  return `rgb(${255 - t * 175}, ${255 - t * 110}, ${255 - t * 20})`;
}

export default function EDA() {
  const [histCol, setHistCol] = useState<NumericColumn>("bmi");
  const [boxCol, setBoxCol] = useState<NumericColumn>("systolic_bp");
  const [xCol, setXCol] = useState<NumericColumn>("physical_activity_min");
  const [yCol, setYCol] = useState<NumericColumn>("resting_heart_rate");

  const hist = histogram(histCol, 8);
  const box = boxStats(boxCol);
  const scatter = scatterData(xCol, yCol);
  const yesData = scatter.filter((d) => d.group === "Yes");
  const noData = scatter.filter((d) => d.group === "No");
  const corr = correlationMatrix(NUMERIC_COLUMNS);

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="📊"
        title="Exploratory Data Analysis"
        subtitle="Histograms, box plots, scatter plots and a correlation heatmap."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Histogram</h3>
            <select
              value={histCol}
              onChange={(e) => setHistCol(e.target.value as NumericColumn)}
              className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              {NUMERIC_COLUMNS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={hist}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Box Plot Summary</h3>
            <select
              value={boxCol}
              onChange={(e) => setBoxCol(e.target.value as NumericColumn)}
              className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              {NUMERIC_COLUMNS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex h-[240px] items-center justify-center">
            <BoxViz box={box} />
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="font-semibold text-slate-800">Scatter Plot</h3>
          <select
            value={xCol}
            onChange={(e) => setXCol(e.target.value as NumericColumn)}
            className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
          >
            {NUMERIC_COLUMNS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <span className="text-slate-400">vs</span>
          <select
            value={yCol}
            onChange={(e) => setYCol(e.target.value as NumericColumn)}
            className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
          >
            {NUMERIC_COLUMNS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid stroke="#e2e8f0" />
            <XAxis type="number" dataKey="x" name={xCol} tick={{ fontSize: 11 }} />
            <YAxis type="number" dataKey="y" name={yCol} tick={{ fontSize: 11 }} />
            <ZAxis range={[60, 60]} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="Healthy: Yes" data={yesData} fill="#14b8a6" />
            <Scatter name="Healthy: No" data={noData} fill="#f43f5e" />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <SectionTitle
          title="Correlation Heatmap"
          subtitle="Pearson correlation between numeric features"
        />
        <div className="overflow-x-auto">
          <table className="text-[10px]">
            <thead>
              <tr>
                <th className="p-1"></th>
                {NUMERIC_COLUMNS.map((c) => (
                  <th key={c} className="p-1 font-medium text-slate-500" style={{ writingMode: "vertical-rl" }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NUMERIC_COLUMNS.map((rowC, i) => (
                <tr key={rowC}>
                  <td className="whitespace-nowrap p-1 pr-2 text-right font-medium text-slate-500">
                    {rowC}
                  </td>
                  {corr[i].map((v, j) => (
                    <td
                      key={j}
                      className="h-7 w-7 text-center text-slate-800"
                      style={{ backgroundColor: heatColor(v) }}
                      title={`${rowC} × ${NUMERIC_COLUMNS[j]}: ${v}`}
                    >
                      {Math.abs(v) >= 0.5 ? v.toFixed(1) : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-lg bg-sky-50 p-3 text-sm text-sky-900">
          <strong>Observation:</strong> physical activity, daily steps and sleep
          tend to move together, while resting heart rate and blood pressure tend
          to be higher for less-active records. These are dataset patterns only
          and are not medical conclusions.
        </div>
      </Card>
    </div>
  );
}

function BoxViz({ box }: { box: ReturnType<typeof boxStats> }) {
  const range = box.max - box.min || 1;
  const pos = (v: number) => ((v - box.min) / range) * 100;
  return (
    <div className="w-full max-w-md">
      <div className="relative h-16">
        <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-300" />
        <div
          className="absolute top-1/2 h-10 -translate-y-1/2 rounded-md border-2 border-emerald-500 bg-emerald-100/60"
          style={{ left: `${pos(box.q1)}%`, width: `${pos(box.q3) - pos(box.q1)}%` }}
        />
        <div
          className="absolute top-1/2 h-10 w-0.5 -translate-y-1/2 bg-emerald-700"
          style={{ left: `${pos(box.median)}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>min {box.min}</span>
        <span>Q1 {box.q1}</span>
        <span>med {box.median}</span>
        <span>Q3 {box.q3}</span>
        <span>max {box.max}</span>
      </div>
    </div>
  );
}
