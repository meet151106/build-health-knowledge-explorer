import { useMemo, useState } from "react";
import { Card, SectionTitle } from "../components/ui";
import { dataset, COLUMNS, NUMERIC_COLUMNS, NumericColumn } from "../data/dataset";
import { describe } from "../lib/stats";

export default function DatasetExplorer() {
  const [filterCol, setFilterCol] = useState<NumericColumn>("bmi");
  const arr = dataset.map((d) => d[filterCol] as number);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const [lo, setLo] = useState(min);
  const [hi, setHi] = useState(max);

  const filtered = useMemo(
    () =>
      dataset.filter((d) => {
        const v = d[filterCol] as number;
        return v >= lo && v <= hi;
      }),
    [filterCol, lo, hi],
  );

  const onColChange = (c: NumericColumn) => {
    setFilterCol(c);
    const a = dataset.map((d) => d[c] as number);
    setLo(Math.min(...a));
    setHi(Math.max(...a));
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="🗂️"
        title="Dataset Explorer"
        subtitle="Load records, inspect structure, check missing values and filter interactively."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <div className="text-xs font-semibold text-slate-500">Shape</div>
          <div className="mt-1 text-lg font-bold text-slate-900">
            {dataset.length} × {COLUMNS.length}
          </div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-slate-500">Numeric Cols</div>
          <div className="mt-1 text-lg font-bold text-slate-900">
            {NUMERIC_COLUMNS.length}
          </div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-slate-500">Categorical</div>
          <div className="mt-1 text-lg font-bold text-slate-900">3</div>
        </Card>
        <Card>
          <div className="text-xs font-semibold text-slate-500">Missing</div>
          <div className="mt-1 text-lg font-bold text-emerald-600">0</div>
        </Card>
      </div>

      <Card>
        <SectionTitle title="First Records (head)" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                {COLUMNS.map((c) => (
                  <th key={c} className="whitespace-nowrap px-2 py-2 font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataset.slice(0, 6).map((d) => (
                <tr key={d.id} className="border-b border-slate-100">
                  {COLUMNS.map((c) => (
                    <td key={c} className="whitespace-nowrap px-2 py-1.5 text-slate-700">
                      {String(d[c as keyof typeof d])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle title="Descriptive Statistics" subtitle="Numeric columns" />
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="px-2 py-2 font-semibold">column</th>
                {["count", "mean", "std", "min", "25%", "median", "75%", "max"].map(
                  (h) => (
                    <th key={h} className="px-2 py-2 font-semibold">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {NUMERIC_COLUMNS.map((c) => {
                const s = describe(c);
                return (
                  <tr key={c} className="border-b border-slate-100">
                    <td className="px-2 py-1.5 font-medium text-slate-800">{c}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.count}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.mean}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.std}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.min}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.q25}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.median}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.q75}</td>
                    <td className="px-2 py-1.5 text-slate-600">{s.max}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle title="Interactive Filter" subtitle={`${filtered.length} records match`} />
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={filterCol}
            onChange={(e) => onColChange(e.target.value as NumericColumn)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {NUMERIC_COLUMNS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Min</span>
            <input
              type="range"
              min={min}
              max={max}
              step={(max - min) / 100}
              value={lo}
              onChange={(e) => setLo(+e.target.value)}
            />
            <span className="w-12 font-medium">{lo.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Max</span>
            <input
              type="range"
              min={min}
              max={max}
              step={(max - min) / 100}
              value={hi}
              onChange={(e) => setHi(+e.target.value)}
            />
            <span className="w-12 font-medium">{hi.toFixed(1)}</span>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                {["id", "age", "gender", "bmi", filterCol, "healthy_lifestyle"]
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .map((c) => (
                    <th key={c} className="px-2 py-2 font-semibold">
                      {c}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 12).map((d) => (
                <tr key={d.id} className="border-b border-slate-100">
                  <td className="px-2 py-1.5">{d.id}</td>
                  <td className="px-2 py-1.5">{d.age}</td>
                  <td className="px-2 py-1.5">{d.gender}</td>
                  <td className="px-2 py-1.5">{d.bmi}</td>
                  <td className="px-2 py-1.5 font-medium text-teal-700">
                    {String(d[filterCol])}
                  </td>
                  <td className="px-2 py-1.5">{d.healthy_lifestyle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
