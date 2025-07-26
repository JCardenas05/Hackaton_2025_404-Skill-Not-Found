// src/components/custom/useRecords.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

export interface RecordRow {
  cliente: string | null;
  tema: string | null;
  sentimiento: string | null; // 'positivo' | 'neutral' | 'negativo'
}

export function useRecords() {
  const [data, setData] = useState<RecordRow[] | null>(null);

  async function fetchRecords() {
    /* Trae las 100 conversaciones más recientes, con cliente */
    const { data, error } = await supabase
      .from('conversaciones')
      .select('tema_principal, sentimiento_global, usuarios(nombre)')
      .order('inicio', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetch registros', error);
      return;
    }

    setData(
      (data ?? []).map((row) => ({
        cliente: row.usuarios?.nombre ?? 'Sin nombre',
        tema: row.tema_principal,
        sentimiento: row.sentimiento_global,
      }))
    );
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  return data;
}
