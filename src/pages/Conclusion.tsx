import { Card, SectionTitle, Disclaimer } from "../components/ui";
import { modelComparison } from "../lib/ml";
import { futureScope } from "../data/content";

export default function Conclusion() {
  const best = modelComparison.reduce((a, b) =>
    a.accuracy >= b.accuracy ? a : b,
  );
  const blocks = [
    {
      icon: "🎓",
      title: "What We Learned",
      items: [
        "Health-related habits (activity, sleep, diet, steps) associate with the 'healthy lifestyle' label in this dataset.",
        "A complete Data Science workflow can be applied end-to-end on health-style data.",
      ],
    },
    {
      icon: "🔍",
      title: "Key Data-Analysis Findings",
      items: [
        "Physical activity and daily steps are among the most informative features.",
        "Resting heart rate and blood pressure tend to be higher for less-active records.",
        "Correlations reveal groups of related lifestyle features.",
      ],
    },
    {
      icon: "📊",
      title: "Model Performance",
      items: [
        `Best educational model: ${best.model} with accuracy ${best.accuracy}.`,
        `Precision ${best.precision}, recall ${best.recall}, F1 ${best.f1}.`,
        "Two models were compared to illustrate interpretability vs flexibility.",
      ],
    },
    {
      icon: "⚠️",
      title: "Project Limitations",
      items: [
        "Small, synthetic, illustrative dataset — not clinically validated.",
        "Simple feature set and models.",
        "Must never be used for medical decisions.",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="📝"
        title="Conclusion"
        subtitle="Summary of findings, performance, limitations and future work."
      />
      <Disclaimer />

      <div className="grid gap-4 md:grid-cols-2">
        {blocks.map((b) => (
          <Card key={b.title}>
            <h3 className="flex items-center gap-2 font-semibold text-slate-900">
              <span>{b.icon}</span> {b.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {b.items.map((it) => (
                <li key={it} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-teal-500">•</span>
                  {it}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="flex items-center gap-2 font-semibold text-slate-900">
          <span>🚀</span> Possible Future Improvements
        </h3>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {futureScope.map((f) => (
            <div
              key={f}
              className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
            >
              {f}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
