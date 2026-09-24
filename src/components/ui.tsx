import { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  accent = "teal",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  accent?: "teal" | "blue" | "violet" | "amber";
}) {
  const accents: Record<string, string> = {
    teal: "from-teal-500 to-emerald-500",
    blue: "from-sky-500 to-blue-600",
    violet: "from-violet-500 to-indigo-600",
    amber: "from-amber-500 to-orange-500",
  };
  return (
    <Card className="overflow-hidden">
      <div
        className={cn(
          "mb-3 inline-flex rounded-lg bg-gradient-to-br px-2.5 py-1 text-xs font-semibold text-white",
          accents[accent],
        )}
      >
        {label}
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </Card>
  );
}

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-amber-300 bg-amber-50 text-amber-900",
        compact ? "px-3 py-2 text-xs" : "p-4 text-sm",
      )}
    >
      <span className="font-semibold">⚠️ Educational use only. </span>
      This tool and its predictions are not a medical diagnosis or medical
      advice. Consult a qualified healthcare professional for personal health
      concerns.
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      {children}
    </span>
  );
}
