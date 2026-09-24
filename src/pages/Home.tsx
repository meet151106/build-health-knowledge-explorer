import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie,
  Cell, Legend, CartesianGrid,
} from "recharts";
import { Card, StatCard, Disclaimer, SectionTitle, Pill } from "../components/ui";
import { dataset, NUMERIC_COLUMNS } from "../data/dataset";
import { histogram, categoryCounts } from "../lib/stats";

const COLORS = ["#14b8a6", "#f43f5e"];

export default function Home() {
  const total = dataset.length;
  const attrs = 17;
  const bmiHist = histogram("bmi", 8);
  const lifestyle = categoryCounts("healthy_lifestyle");
  const missing = 0;

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700 p-8 text-white shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>Data Science Project</Pill>
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium">
            Python · Streamlit · Scikit-learn
          </span>
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          🩺 Health Knowledge Explorer
        </h1>
        <p className="mt-3 max-w-2xl text-teal-50">
          An educational health-information and data-analysis system that helps
          you explore general health knowledge using a dataset, interactive
          visualizations and simple machine-learning techniques.
        </p>
      </div>

      <Disclaimer />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Records" value={total} accent="teal" />
        <StatCard label="Attributes" value={attrs} accent="blue" />
        <StatCard
          label="Numeric Features"
          value={NUMERIC_COLUMNS.length}
          accent="violet"
        />
        <StatCard
          label="Missing Values"
          value={missing}
          hint="After cleaning"
          accent="amber"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title="BMI Distribution" subtitle="Histogram of BMI values" />
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={bmiHist}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#14b8a6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle
            title="Healthy Lifestyle Split"
            subtitle="Distribution of the target label"
          />
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={lifestyle}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {lifestyle.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <SectionTitle
          title="Data Science Workflow"
          subtitle="The complete pipeline followed in this project"
        />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {[
            "Problem Definition", "Data Collection", "Data Understanding",
            "Data Cleaning", "EDA", "Visualization", "Feature Engineering",
            "Model Training", "Model Evaluation", "Interactive Dashboard",
            "Conclusion",
          ].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-lg bg-teal-50 px-3 py-1.5 font-medium text-teal-700">
                {s}
              </span>
              {i < arr.length - 1 && <span className="text-slate-300">→</span>}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
