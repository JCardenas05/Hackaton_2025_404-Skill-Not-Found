import { useRecords } from '@/components/custom/useRecords';
import { Header } from '@/components/custom/header';
import { cn } from '@/lib/utils'; // helper opcional para unir clases

const sentimentColor: Record<string, string> = {
  positivo: 'text-green-600',
  neutral: 'text-gray-500',
  negativo: 'text-red-500'
};

export function Registros() {
  const records = useRecords();

  if (!records) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 grid place-items-center">
          <span className="animate-pulse text-muted-foreground text-lg">
            Cargando registros…
          </span>
        </main>
      </div>
    );
  }

  /* agrupar por cliente */
  const byCliente = records.reduce<Record<string, typeof records>>((acc, r) => {
    acc[r.cliente!] = acc[r.cliente!] ? [...acc[r.cliente!], r] : [r];
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-screen bg-background text-base md:text-lg">
      <Header />
      <main className="flex flex-col gap-8 p-8 md:p-10 w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-primary mb-2">Registros</h1>

        {Object.entries(byCliente).map(([cliente, rows]) => (
          <div
            key={cliente}
            className="rounded-2xl bg-card shadow-kpi p-6 overflow-x-auto"
          >
            <h2 className="text-lg font-medium mb-4">{cliente}</h2>
            <table className="min-w-full text-sm md:text-base">
              <thead>
                <tr className="text-muted-foreground text-left">
                  <th className="pb-2 pr-4 font-normal">Tema conversación</th>
                  <th className="pb-2">Sentimiento</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className={cn(
                      i % 2 ? 'bg-muted/20' : '',
                      'border-b last:border-0'
                    )}
                  >
                    <td className="py-2 pr-4">{r.tema}</td>
                    <td className={cn('py-2', sentimentColor[r.sentimiento!])}>
                      {r.sentimiento}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </div>
  );
}
