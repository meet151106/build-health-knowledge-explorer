import { useState } from "react";
import { Card, SectionTitle } from "../components/ui";
import { predict, PredictInput } from "../lib/ml";

const fields: {
  key: keyof PredictInput;
  label: string;
  min: number;
  max: number;
  step: number;
  def: number;
  unit?: string;
}[] = [
  { key: "age", label: "Age", min: 18, max: 80, step: 1, def: 35, unit: "yrs" },
  { key: "bmi", label: "BMI", min: 15, max: 40, step: 0.1, def: 24 },
  { key: "sleep_hours", label: "Sleep", min: 3, max: 10, step: 0.5, def: 7, unit: "hrs" },
  { key: "physical_activity_min", label: "Activity", min: 0, max: 120, step: 5, def: 40, unit: "min" },
  { key: "daily_steps", label: "Daily Steps", min: 1000, max: 15000, step: 100, def: 8000 },
  { key: "fruit_veg_servings", label: "Fruit/Veg", min: 0, max: 8, step: 1, def: 4, unit: "servings" },
  { key: "water_intake_l", label: "Water", min: 0.5, max: 4, step: 0.1, def: 2, unit: "L" },
  { key: "stress_level", label: "Stress", min: 1, max: 10, step: 1, def: 4, unit: "/10" },
  { key: "resting_heart_rate", label: "Resting HR", min: 50, max: 100, step: 1, def: 68, unit: "bpm" },
  { key: "systolic_bp", label: "Systolic BP", min: 90, max: 160, step: 1, def: 118, unit: "mmHg" },
];

export default function Prediction() {
  const [values, setValues] = useState<PredictInput>(
    Object.fromEntries(fields.map((f) => [f.key, f.def])) as unknown as PredictInput,
  );
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null);

  const update = (k: keyof PredictInput, v: number) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="🔮"
        title="Interactive Prediction (Educational)"
        subtitle="Enter lifestyle features to see an educational model output."
      />

      <div className="rounded-xl border-2 border-rose-300 bg-rose-50 p-4 text-sm font-medium text-rose-800">
        ⚠️ Educational use only. This prediction is not a medical diagnosis or
        medical advice. Consult a qualified healthcare professional for personal
        health concerns. No medication, dosage, treatment or emergency actions
        are recommended based on this output.
      </div>

      <Card>
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key}>
              <div className="mb-1 flex justify-between text-sm">
                <label className="font-medium text-slate-700">{f.label}</label>
                <span className="text-teal-700 font-semibold">
                  {values[f.key]} {f.unit ?? ""}
                </span>
              </div>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={values[f.key]}
                onChange={(e) => update(f.key, +e.target.value)}
                className="w-full accent-teal-600"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setResult(predict(values))}
          className="mt-6 w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700"
        >
          Get Educational Output
        </button>
      </Card>

      {result && (
        <Card className="border-teal-200 bg-teal-50">
          <SectionTitle title="Educational Model Output" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-4">
              <div className="text-xs font-semibold uppercase text-slate-500">
                Logistic Regression
              </div>
              <div className="mt-1 text-lg font-bold text-slate-900">
                {result.logistic}
              </div>
            </div>
            <div className="rounded-xl bg-white p-4">
              <div className="text-xs font-semibold uppercase text-slate-500">
                Random Forest / Ensemble
              </div>
              <div className="mt-1 text-lg font-bold text-slate-900">
                {result.forest}
              </div>
            </div>
            <div className="rounded-xl bg-white p-4">
              <div className="text-xs font-semibold uppercase text-slate-500">
                Model Confidence
              </div>
              <div className="mt-1 text-lg font-bold text-teal-700">
                {result.probability}%
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-600">
            This is a pattern-based educational estimate only and is not a medical
            diagnosis.
          </p>
        </Card>
      )}
    </div>
  );
}
