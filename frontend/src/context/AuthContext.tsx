import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";
import { getUserRole } from "@/services/userServices";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  // signOut: () => Promise<void>;
  isAdmin: boolean | undefined;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Session:", session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setIsAdmin(await getUserRole(session.user.id));
      }
    });

    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state changed:", _event, session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setIsAdmin(await getUserRole(session.user.id));
        } else {
          setIsAdmin(undefined);
        }
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  // const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
