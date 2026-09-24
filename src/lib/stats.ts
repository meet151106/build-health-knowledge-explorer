import { dataset, HealthRecord, NumericColumn } from "../data/dataset";

export function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function std(arr: number[]): number {
  const m = mean(arr);
  return Math.sqrt(mean(arr.map((x) => (x - m) ** 2)));
}

export function quantile(arr: number[], q: number): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] !== undefined
    ? sorted[base] + rest * (sorted[base + 1] - sorted[base])
    : sorted[base];
}

export function describe(col: NumericColumn) {
  const arr = dataset.map((d) => d[col] as number);
  return {
    count: arr.length,
    mean: +mean(arr).toFixed(2),
    std: +std(arr).toFixed(2),
    min: Math.min(...arr),
    q25: +quantile(arr, 0.25).toFixed(2),
    median: +quantile(arr, 0.5).toFixed(2),
    q75: +quantile(arr, 0.75).toFixed(2),
    max: Math.max(...arr),
  };
}

export function pearson(a: number[], b: number[]): number {
  const ma = mean(a);
  const mb = mean(b);
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < a.length; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return num / Math.sqrt(da * db);
}

export function correlationMatrix(cols: readonly NumericColumn[]) {
  const vectors = cols.map((c) => dataset.map((d) => d[c] as number));
  return cols.map((_, i) =>
    cols.map((__, j) => +pearson(vectors[i], vectors[j]).toFixed(2)),
  );
}

export function histogram(col: NumericColumn, bins = 8) {
  const arr = dataset.map((d) => d[col] as number);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const width = (max - min) / bins || 1;
  const counts = new Array(bins).fill(0);
  arr.forEach((v) => {
    let idx = Math.floor((v - min) / width);
    if (idx >= bins) idx = bins - 1;
    counts[idx]++;
  });
  return counts.map((count, i) => ({
    range: `${(min + i * width).toFixed(0)}`,
    count,
  }));
}

export function boxStats(col: NumericColumn) {
  const arr = dataset.map((d) => d[col] as number);
  return {
    min: Math.min(...arr),
    q1: +quantile(arr, 0.25).toFixed(1),
    median: +quantile(arr, 0.5).toFixed(1),
    q3: +quantile(arr, 0.75).toFixed(1),
    max: Math.max(...arr),
  };
}

export function scatterData(x: NumericColumn, y: NumericColumn) {
  return dataset.map((d) => ({
    x: d[x] as number,
    y: d[y] as number,
    group: d.healthy_lifestyle,
  }));
}

export function categoryCounts(field: keyof HealthRecord) {
  const map: Record<string, number> = {};
  dataset.forEach((d) => {
    const key = String(d[field]);
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function groupMean(
  groupField: keyof HealthRecord,
  valueCol: NumericColumn,
) {
  const groups: Record<string, number[]> = {};
  dataset.forEach((d) => {
    const key = String(d[groupField]);
    (groups[key] ||= []).push(d[valueCol] as number);
  });
  return Object.entries(groups).map(([name, vals]) => ({
    name,
    value: +mean(vals).toFixed(1),
  }));
}
