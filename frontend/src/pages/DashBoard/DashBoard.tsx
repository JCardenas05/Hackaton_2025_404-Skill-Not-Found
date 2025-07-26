import { useMetrics } from '@/components/custom/useMetrics';
import { KpiCard } from '@/components/ui/KpiCard';
import { TopicsChart } from '@/components/ui/TopicsChart';
import { Header } from '@/components/custom/header';

export function Dashboard() {
  const metrics = useMetrics();

  /* 1. Estado de carga seguro ------------------------------- */
  if (!metrics) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 grid place-items-center">
          <span className="animate-pulse text-muted-foreground">
            Cargando métricas…
          </span>
        </main>
      </div>
    );
  }

  /* 2. Desestructurar para legibilidad ---------------------- */
  const {
    usersActive,
    chatsToday,
    correctRate,
    p95Latency,
    avgDuration,
    returnFreq,
    topics
  } = metrics;

  /* 3. Render final ----------------------------------------- */
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex flex-col gap-6 p-6 w-full max-w-5xl mx-auto">
        {/* Fila KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard label="Usuarios activos" value={usersActive} />
          <KpiCard label="Chats hoy" value={chatsToday} />
          <KpiCard
            label="Precisión"
            value={(correctRate * 100).toFixed(1) + '%'}
          />
          <KpiCard label="p95 Latencia" value={p95Latency + ' ms'} />
          <KpiCard label="Dur. media" value={avgDuration.toFixed(1) + ' s'} />
          <KpiCard
            label="Frecuencia retorno"
            value={returnFreq.toFixed(2)}
            sub="charlas / usuario"
          />
        </div>

        {/* Fila Temas comunes */}
        <div className="rounded-xl border p-4 shadow-sm bg-card">
          <h3 className="text-base mb-2">Temas comunes (TOP 5)</h3>
          <TopicsChart data={topics} />
        </div>
      </main>
    </div>
  );
}
