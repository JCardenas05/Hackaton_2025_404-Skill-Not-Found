import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

/* --------- Interface que usa el dashboard ------------------ */
export interface Kpis {
  usersActive: number;
  chatsToday: number;
  correctRate: number;    // 0‑1
  p95Latency: number;     // ms
  avgDuration: number;    // s
  returnFreq: number;     // charlas / usuario
  topics: { tema: string; total: number }[];
}

/* --------- Hook principal ---------------------------------- */
export function useMetrics() {
  const [data, setData] = useState<Kpis | null>(null);

  async function fetchMetrics() {
    /* 1. Fila más reciente de kpi_diarios -------------------- */
    const { data: kpiRow, error: kpiErr } = await supabase
      .from('kpi_diarios')
      .select('*')
      .order('fecha', { ascending: false })
      .limit(1)
      .single();

    if (kpiErr || !kpiRow) {
      console.error('Error obteniendo kpi_diarios:', kpiErr);
      return;
    }

    /* 2. TOP 5 temas del mismo día -------------------------- */
    const { data: topics, error: topicsErr } = await supabase
      .from('kpi_topics')
      .select('tema,total')
      .eq('fecha', kpiRow.fecha)
      .order('total', { ascending: false })
      .limit(100);

    if (topicsErr) {
      console.error('Error obteniendo kpi_topics:', topicsErr);
      return;
    }

    /* 3. Mapeo a la interfaz que usa el dashboard ------------ */
    setData({
      usersActive: kpiRow.usuarios_activos,
      chatsToday: kpiRow.chats_realizados,
      correctRate: kpiRow.correct_rate,                  // ya viene 0‑1
      p95Latency: kpiRow.latencia_p95_ms,
      avgDuration: kpiRow.duracion_media_ms / 1000,      // a segundos
      returnFreq: kpiRow.frecuencia_retorno,
      topics: topics ?? []
    });
  }

  /* Petición inicial + refresh cada 15 s --------------------- */
  useEffect(() => {
    fetchMetrics();
    const id = setInterval(fetchMetrics, 15_000);
    return () => clearInterval(id);
  }, []);

  return data;
}
