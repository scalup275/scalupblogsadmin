import { createContext, useContext, useEffect, useState } from "react";
import { loginAdmin, getCurrentAdmin, logoutAdmin } from "@/lib/bot";

/* TYPES  */

type Admin = {
  id: string;
  email: string;
};

type AuthType = {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

/* -CONTEXT  */

const AuthContext = createContext<AuthType | null>(null);

/*PROVIDER  */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  /*ESSION RESTORE */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await getCurrentAdmin();
        if (data?.admin) setAdmin(data.admin);
      } catch {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  /*  LOGIN  */
  const login = async (email: string, password: string) => {
    try {
      const res = await loginAdmin(email, password);
      setAdmin(res.admin);
      return true;
    } catch {
      return false;
    }
  };

  /*  LOGOUT */
  const logout = async () => {
    await logoutAdmin();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* HOOK  */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside provider");
  return ctx;
};
