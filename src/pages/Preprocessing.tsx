import { Card, SectionTitle, Pill } from "../components/ui";
import { dataset } from "../data/dataset";

const steps = [
  {
    n: 1,
    title: "Handle Missing Values & Remove Duplicates",
    desc: "Impute numeric columns with the median and categorical columns with the mode; drop duplicate rows.",
    code: `df = df.drop_duplicates()
for col in df.columns:
    if df[col].dtype.kind in "biufc":
        df[col] = df[col].fillna(df[col].median())
    else:
        df[col] = df[col].fillna(df[col].mode().iloc[0])`,
  },
  {
    n: 2,
    title: "Encode Categorical Variables",
    desc: "Map categorical values to numeric codes for modeling.",
    code: `df["gender"] = df["gender"].map({"Male": 0, "Female": 1})
df["smoker"] = df["smoker"].map({"No": 0, "Yes": 1})
df["healthy_lifestyle"] = df["healthy_lifestyle"].map({"No": 0, "Yes": 1})`,
  },
  {
    n: 3,
    title: "Feature Scaling",
    desc: "Standardize features to zero mean and unit variance.",
    code: `from sklearn.preprocessing import StandardScaler
X_scaled = StandardScaler().fit_transform(X)`,
  },
  {
    n: 4,
    title: "Train / Test Split",
    desc: "Split into training and test sets (stratified 75/25).",
    code: `from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.25, random_state=42, stratify=y)`,
  },
];

export default function Preprocessing() {
  const trainN = Math.floor(dataset.length * 0.75);
  return (
    <div className="space-y-6">
      <SectionTitle
        icon="🧹"
        title="Data Preprocessing"
        subtitle="Step-by-step preparation of the dataset for modeling."
      />

      <div className="flex flex-wrap gap-3">
        <Pill>Duplicates removed: 0</Pill>
        <Pill>Missing imputed: 0</Pill>
        <Pill>Categorical encoded: 3</Pill>
        <Pill>Train rows: {trainN}</Pill>
        <Pill>Test rows: {dataset.length - trainN}</Pill>
      </div>

      <div className="space-y-4">
        {steps.map((s) => (
          <Card key={s.n}>
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 font-bold text-white">
                {s.n}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-teal-100">
                  <code>{s.code}</code>
                </pre>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
