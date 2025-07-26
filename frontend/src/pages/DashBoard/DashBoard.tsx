import { useMetrics } from '@/components/custom/useMetrics';
import { KpiCard } from '@/components/ui/KpiCard';
import { TopicsChart } from '@/components/ui/TopicsChart';
import { Header } from '@/components/custom/header';

export function Dashboard() {
  const metrics = useMetrics();

  if (!metrics) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 grid place-items-center">
          <span className="animate-pulse text-muted-foreground text-lg">
            Cargando métricas…
          </span>
        </main>
      </div>
    );
  }

  const {
    usersActive,
    chatsToday,
    correctRate,
    p95Latency,
    avgDuration,
    returnFreq,
    topics,
  } = metrics;

  return (
    <div className="flex flex-col min-h-screen bg-background text-base md:text-lg">
      <Header />

      <main className="flex flex-col gap-8 p-8 md:p-10 w-full max-w-6xl mx-auto">
        {/* KPI grid más holgado */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          <KpiCard label="Usuarios activos" value={usersActive} />
          <KpiCard label="Chats hoy" value={chatsToday} />
          <KpiCard
            label="Precisión"
            value={(correctRate * 100).toFixed(1) + '%'}
          />
          <KpiCard label="p95 Latencia" value={p95Latency + ' ms'} />
          <KpiCard label="Dur. media" value={avgDuration.toFixed(1) + ' s'} />
          <KpiCard
            label="Retorno"
            value={returnFreq.toFixed(2)}
            sub="charlas / usuario"
          />
        </div>

        {/* Topics card */}
        <div className="rounded-2xl bg-card shadow-kpi p-6">
          <h3 className="text-lg font-medium mb-4">
            Temas comunes (TOP 5)
          </h3>
          <TopicsChart data={topics} />
        </div>
      </main>
    </div>
  );
}
