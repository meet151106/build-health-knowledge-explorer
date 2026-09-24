import { Card, SectionTitle, Pill } from "../components/ui";

const tree = `Health_Knowledge_Explorer/
│
├── app.py                      # Streamlit application (9 modules)
├── requirements.txt            # Python dependencies
├── README.md                   # Setup & usage
├── data/
│   └── health_dataset.csv      # Educational lifestyle dataset (50 rows)
├── notebooks/
│   └── health_analysis.ipynb   # Full workflow notebook
├── src/
│   ├── data_preprocessing.py   # load, clean, encode, scale, split
│   ├── visualization.py        # matplotlib/seaborn charts
│   └── model.py                # train/evaluate/predict
└── images/
    └── dashboard_screenshots/  # report screenshots`;

const files = [
  { name: "app.py", path: "/project/app.py", desc: "Streamlit app with sidebar navigation and all 9 modules." },
  { name: "requirements.txt", path: "/project/requirements.txt", desc: "Python package requirements." },
  { name: "README.md", path: "/project/README.md", desc: "Installation and execution instructions." },
  { name: "data/health_dataset.csv", path: "/project/data/health_dataset.csv", desc: "Synthetic educational lifestyle dataset." },
  { name: "notebooks/health_analysis.ipynb", path: "/project/notebooks/health_analysis.ipynb", desc: "Jupyter notebook — full DS workflow." },
  { name: "src/data_preprocessing.py", path: "/project/src/data_preprocessing.py", desc: "Cleaning, encoding, scaling, split." },
  { name: "src/visualization.py", path: "/project/src/visualization.py", desc: "Matplotlib/Seaborn plotting helpers." },
  { name: "src/model.py", path: "/project/src/model.py", desc: "LogReg & Random Forest, metrics." },
];

export default function ProjectFiles() {
  return (
    <div className="space-y-6">
      <SectionTitle
        icon="📦"
        title="Python Project Files"
        subtitle="The complete downloadable Streamlit + Scikit-learn project source."
      />

      <Card>
        <div className="mb-3 flex flex-wrap gap-2">
          <Pill>Python</Pill>
          <Pill>Streamlit</Pill>
          <Pill>Pandas / NumPy</Pill>
          <Pill>Matplotlib / Seaborn</Pill>
          <Pill>Scikit-learn</Pill>
          <Pill>Jupyter</Pill>
        </div>
        <SectionTitle title="Folder Structure" />
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-teal-100">
          <code>{tree}</code>
        </pre>
      </Card>

      <Card>
        <SectionTitle title="Download Source Files" subtitle="Each file is bundled with this app — open in a new tab." />
        <div className="grid gap-3 md:grid-cols-2">
          {files.map((f) => (
            <a
              key={f.name}
              href={f.path}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-teal-400 hover:bg-teal-50"
            >
              <span className="text-xl">📄</span>
              <div>
                <div className="font-mono text-sm font-semibold text-slate-900 group-hover:text-teal-700">
                  {f.name}
                </div>
                <div className="text-xs text-slate-500">{f.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Dataset Recommendation" />
        <p className="text-sm text-slate-700">
          The bundled <code className="rounded bg-slate-100 px-1">health_dataset.csv</code> is
          synthetic and illustrative. For real analysis, replace it with a reliable
          public dataset such as:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-teal-700">
          <li>
            •{" "}
            <a className="underline" href="https://archive.ics.uci.edu/" target="_blank" rel="noreferrer">
              UCI Machine Learning Repository ↗
            </a>
          </li>
          <li>
            •{" "}
            <a className="underline" href="https://www.kaggle.com/datasets" target="_blank" rel="noreferrer">
              Kaggle Health Datasets ↗
            </a>
          </li>
          <li>
            •{" "}
            <a className="underline" href="https://www.who.int/data" target="_blank" rel="noreferrer">
              WHO Open Health Data ↗
            </a>
          </li>
        </ul>
      </Card>
    </div>
  );
}
