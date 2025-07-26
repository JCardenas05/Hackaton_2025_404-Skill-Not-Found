import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export function TopicsChart({ data }: { tema: string; total: number }[]) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="tema" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="total" radius={[8, 8, 0, 0]} fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
