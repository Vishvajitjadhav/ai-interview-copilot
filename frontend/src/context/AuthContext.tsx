import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { loginRequest, signupRequest } from "@/services/authApi";
import { getStoredToken, setStoredToken } from "@/services/apiClient";

type AuthState = {
  token: string | null;
  email: string | null;
  userId: number | null;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readInitialState(): AuthState {
  const token = getStoredToken();
  const rawEmail = localStorage.getItem("aic_email");
  const rawId = localStorage.getItem("aic_user_id");
  return {
    token,
    email: rawEmail,
    userId: rawId ? Number(rawId) : null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(readInitialState);

  const persistSession = useCallback((token: string, email: string, userId: number) => {
    setStoredToken(token);
    localStorage.setItem("aic_email", email);
    localStorage.setItem("aic_user_id", String(userId));
    setState({ token, email, userId });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await loginRequest(email, password);
      persistSession(res.token, res.email, res.userId);
    },
    [persistSession]
  );

  const signup = useCallback(
    async (email: string, password: string) => {
      const res = await signupRequest(email, password);
      persistSession(res.token, res.email, res.userId);
    },
    [persistSession]
  );

  const logout = useCallback(() => {
    setStoredToken(null);
    localStorage.removeItem("aic_email");
    localStorage.removeItem("aic_user_id");
    setState({ token: null, email: null, userId: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token),
      login,
      signup,
      logout,
    }),
    [state, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
