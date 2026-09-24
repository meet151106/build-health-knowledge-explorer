import { dataset } from "../data/dataset";

// Features used for the educational classifier
const FEATURES = [
  "age", "bmi", "sleep_hours", "physical_activity_min", "daily_steps",
  "fruit_veg_servings", "water_intake_l", "stress_level",
  "resting_heart_rate", "systolic_bp",
] as const;

type Feat = (typeof FEATURES)[number];

function toRow(d: (typeof dataset)[number]): number[] {
  return FEATURES.map((f) => d[f] as number);
}

const X = dataset.map(toRow);
const Y = dataset.map((d) => (d.healthy_lifestyle === "Yes" ? 1 : 0));

// Standardize
const means = FEATURES.map((_, j) => X.reduce((s, r) => s + r[j], 0) / X.length);
const stds = FEATURES.map((_, j) => {
  const m = means[j];
  return Math.sqrt(X.reduce((s, r) => s + (r[j] - m) ** 2, 0) / X.length) || 1;
});

function scale(row: number[]): number[] {
  return row.map((v, j) => (v - means[j]) / stds[j]);
}

const Xs = X.map(scale);

// Train/test split (75/25, deterministic)
const splitIdx = Math.floor(Xs.length * 0.75);
const order = Xs.map((_, i) => i);
// simple deterministic shuffle
for (let i = order.length - 1; i > 0; i--) {
  const j = (i * 37 + 11) % (i + 1);
  [order[i], order[j]] = [order[j], order[i]];
}
const trainIdx = order.slice(0, splitIdx);
const testIdx = order.slice(splitIdx);

// ---- Logistic Regression (gradient descent) ----
function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z));
}

function trainLogistic() {
  let w = new Array(FEATURES.length).fill(0);
  let b = 0;
  const lr = 0.1;
  for (let epoch = 0; epoch < 500; epoch++) {
    const gw = new Array(FEATURES.length).fill(0);
    let gb = 0;
    trainIdx.forEach((i) => {
      const z = Xs[i].reduce((s, x, j) => s + x * w[j], b);
      const p = sigmoid(z);
      const err = p - Y[i];
      Xs[i].forEach((x, j) => (gw[j] += err * x));
      gb += err;
    });
    w = w.map((wj, j) => wj - (lr * gw[j]) / trainIdx.length);
    b -= (lr * gb) / trainIdx.length;
  }
  return { w, b };
}

const logistic = trainLogistic();

function predictLogistic(row: number[]): number {
  const z = scale(row).reduce((s, x, j) => s + x * logistic.w[j], logistic.b);
  return sigmoid(z) >= 0.5 ? 1 : 0;
}

// ---- Simple "Random Forest"-like: threshold ensemble ----
// Uses key lifestyle thresholds (educational approximation)
function predictForest(row: number[]): number {
  const idx = (f: Feat) => FEATURES.indexOf(f);
  let votes = 0;
  votes += row[idx("physical_activity_min")] >= 30 ? 1 : 0;
  votes += row[idx("daily_steps")] >= 7000 ? 1 : 0;
  votes += row[idx("sleep_hours")] >= 7 ? 1 : 0;
  votes += row[idx("fruit_veg_servings")] >= 4 ? 1 : 0;
  votes += row[idx("bmi")] < 27 ? 1 : 0;
  votes += row[idx("resting_heart_rate")] < 72 ? 1 : 0;
  return votes >= 3 ? 1 : 0;
}

function metrics(predict: (row: number[]) => number) {
  let tp = 0, tn = 0, fp = 0, fn = 0;
  testIdx.forEach((i) => {
    const pred = predict(X[i]);
    const actual = Y[i];
    if (pred === 1 && actual === 1) tp++;
    else if (pred === 0 && actual === 0) tn++;
    else if (pred === 1 && actual === 0) fp++;
    else fn++;
  });
  const accuracy = (tp + tn) / (tp + tn + fp + fn);
  const precision = tp + fp === 0 ? 0 : tp / (tp + fp);
  const recall = tp + fn === 0 ? 0 : tp / (tp + fn);
  const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  return {
    accuracy: +accuracy.toFixed(3),
    precision: +precision.toFixed(3),
    recall: +recall.toFixed(3),
    f1: +f1.toFixed(3),
    confusion: { tp, tn, fp, fn },
  };
}

export const logisticMetrics = metrics(predictLogistic);
export const forestMetrics = metrics(predictForest);

export const modelComparison = [
  { model: "Logistic Regression", ...logisticMetrics },
  { model: "Random Forest (ensemble)", ...forestMetrics },
];

// Feature importance from absolute logistic weights (normalized)
export const featureImportance = (() => {
  const abs = logistic.w.map((w) => Math.abs(w));
  const total = abs.reduce((a, b) => a + b, 0) || 1;
  return FEATURES.map((f, j) => ({
    feature: f,
    importance: +(abs[j] / total).toFixed(3),
  })).sort((a, b) => b.importance - a.importance);
})();

export interface PredictInput {
  age: number;
  bmi: number;
  sleep_hours: number;
  physical_activity_min: number;
  daily_steps: number;
  fruit_veg_servings: number;
  water_intake_l: number;
  stress_level: number;
  resting_heart_rate: number;
  systolic_bp: number;
}

export function predict(input: PredictInput) {
  const row = FEATURES.map((f) => input[f]);
  const logPred = predictLogistic(row);
  const forestPred = predictForest(row);
  const z = scale(row).reduce((s, x, j) => s + x * logistic.w[j], logistic.b);
  const prob = sigmoid(z);
  return {
    logistic: logPred === 1 ? "Healthy lifestyle pattern" : "Room for improvement",
    forest: forestPred === 1 ? "Healthy lifestyle pattern" : "Room for improvement",
    probability: +(prob * 100).toFixed(1),
  };
}

export { FEATURES };
