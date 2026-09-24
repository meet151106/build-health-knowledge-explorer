import { useState } from "react";
import { Card, SectionTitle, Disclaimer } from "../components/ui";
import { healthTopics } from "../data/content";

export default function Knowledge() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(healthTopics[0].category);

  const filtered = healthTopics.filter(
    (t) =>
      t.category.toLowerCase().includes(query.toLowerCase()) ||
      t.summary.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <SectionTitle
        icon="📚"
        title="Health Knowledge Explorer"
        subtitle="Concise, general educational health information with references to reliable organizations."
      />
      <Disclaimer />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔎 Search health topics (e.g. sleep, nutrition)..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((topic) => {
          const isOpen = open === topic.category;
          return (
            <Card key={topic.category} className="cursor-pointer transition hover:shadow-md">
              <button
                onClick={() => setOpen(isOpen ? null : topic.category)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="text-lg font-semibold text-slate-900">
                    {topic.category}
                  </span>
                </span>
                <span className="text-slate-400">{isOpen ? "−" : "+"}</span>
              </button>
              <p className="mt-2 text-sm text-slate-600">{topic.summary}</p>
              {isOpen && (
                <div className="mt-3 space-y-3">
                  <ul className="space-y-1.5">
                    {topic.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-slate-700">
                        <span className="text-teal-500">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={topic.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-xs font-medium text-teal-700 underline"
                  >
                    Reference: {topic.source} ↗
                  </a>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-slate-500">No topics match your search.</p>
      )}
    </div>
  );
}
