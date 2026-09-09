"use client";

import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useState,
  useMemo,
} from "react";
import { AuthContextType, LoginCredentials, UserProfile } from "@/types/auth";
import { loginUser } from "@/lib/api";

const STORAGE_KEY = "distrilink_auth_user";

function subscribeAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("distrilink_auth_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("distrilink_auth_change", callback);
  };
}

function getAuthSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getAuthServerSnapshot(): string | null {
  return null;
}

function notifyAuthChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("distrilink_auth_change"));
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const rawUser = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getAuthServerSnapshot
  );

  const user = useMemo<UserProfile | null>(() => {
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }, [rawUser]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsSubmitting(true);
      const profile = await loginUser(credentials);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      notifyAuthChange();
      return { success: true };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan saat masuk";
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    notifyAuthChange();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isSubmitting,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}
