interface Props {
  label: string;
  value: string | number;
  sub?: string;
}
export function KpiCard({ label, value, sub }: Props) {
  return (
    <div className="rounded-xl border p-4 w-full shadow-sm bg-card">
      <h3 className="text-sm text-muted-foreground">{label}</h3>
      <p className="text-2xl font-semibold">{value}</p>
      {sub && <span className="text-xs text-foreground/60">{sub}</span>}
    </div>
  );
}
