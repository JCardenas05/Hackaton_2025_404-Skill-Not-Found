// src/lib/getUserRole.ts
import { supabase } from "../supabaseClient";

export async function getUserRole(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("usuarios")
    .select("rol")
    .eq("id", userId)
    .single();

  if (error || data?.rol === null) return false; // safe fallback
  return data.rol;
}
