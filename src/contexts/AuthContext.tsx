import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TOKEN_KEY, USER_KEY, authService } from "@/services/api";

export type Role = "ADMIN" | "RESEARCHER" | "FOREST_OFFICER" | "VOLUNTEER";

export interface AppUser {
  id?: number | string;
  email: string;
  fullName?: string;
  role: Role;
  organization?: string;
  designation?: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextValue {
  user: AppUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AppUser>;
  register: (payload: Record<string, any>) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<AppUser>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t) setToken(t);
    if (u) {
      try { setUser(JSON.parse(u)); } catch {}
    }
    setLoading(false);
  }, []);

  const persist = (t: string, u: AppUser) => {
    localStorage.setItem(TOKEN_KEY, t);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const login: AuthContextValue["login"] = async (email, password) => {
    const data = await authService.login(email, password);
    const role = (data.user?.role || data.role || "VOLUNTEER").toUpperCase() as Role;
    const appUser: AppUser = {
      email: data.user?.email || data.email || email,
      fullName: data.user?.fullName || data.fullName || email.split("@")[0],
      role,
      id: data.user?.id,
      organization: data.user?.organization,
      designation: data.user?.designation,
      phone: data.user?.phone,
    };
    persist(data.token, appUser);
    return appUser;
  };

  const register: AuthContextValue["register"] = async (payload) => {
    await authService.register(payload);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };

  const updateUser: AuthContextValue["updateUser"] = (patch) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
