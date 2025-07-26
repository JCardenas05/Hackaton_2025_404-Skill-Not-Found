import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || "/chat", { replace: true });
    }
  }, [user, navigate, location]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Enviando enlace…");

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error(error.error_description || error.message, { id: toastId });
    } else {
      toast.success("¡Revisa tu correo para el enlace de acceso!", {
        id: toastId,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
      />

      <main className="flex min-h-screen w-full items-center justify-center bg-[hsl(var(--background))] font-sans">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            relative w-full max-w-sm rounded-2xl
            bg-[hsl(var(--card)/.6)] backdrop-blur-md
            border border-[hsl(var(--border)/.3)]
            p-8 shadow-2xl shadow-[hsl(var(--foreground)/.08)]
          "
        >
          {/* animated blob */}
          <div
            aria-hidden
            className="
              pointer-events-none absolute -inset-0.5
              animate-pulse rounded-2xl bg-gradient-to-r
              from-[hsl(var(--primary)/.15)]
              via-[hsl(var(--accent)/.15)]
              to-[hsl(var(--secondary)/.15)]
              blur-xl
            "
          />

          <h1 className="text-center text-2xl font-bold tracking-tight text-[hsl(var(--card-foreground))]">
            Bienvenidos al chat bot de Inge{" "}
            <span className="text-orange-500">Lean</span>
          </h1>
          <p className="mt-2 text-center text-sm text-[hsl(var(--muted-foreground))]">
            Coloca tu correo para recibir un enlace de acceso
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full rounded-lg border border-[hsl(var(--input))]
                bg-[hsl(var(--background)/.5)] px-4 py-2.5
                text-[hsl(var(--foreground))]
                placeholder:text-[hsl(var(--muted-foreground))]
                focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]
                transition-all duration-200 ease-in-out
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                group relative flex w-full items-center justify-center
                rounded-lg bg-[hsl(var(--primary))]
                px-4 py-2.5 font-medium text-[hsl(var(--primary-foreground))]
                transition-all duration-200 ease-in-out
                hover:scale-[1.02] active:scale-[.98]
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <span className="absolute inset-0 rounded-lg bg-[hsl(var(--accent))] opacity-0 transition-opacity group-hover:opacity-30" />
                  Enviar enlace de acceso
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </>
  );
}
