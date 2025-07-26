// src/components/ui/KpiCard.tsx
interface Props {
  label: string;
  value: string | number;
  sub?: string;
}

export function KpiCard({ label, value, sub }: Props) {
  return (
    <div className="rounded-2xl bg-card shadow-kpi p-6 flex flex-col gap-2">
      <h3 className="text-sm md:text-base text-muted-foreground">{label}</h3>
      <span className="text-3xl md:text-4xl font-semibold text-primary">
        {value}
      </span>
      {sub && (
        <span className="text-xs md:text-sm text-muted-foreground">{sub}</span>
      )}
    </div>
  );
}
