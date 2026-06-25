"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  const login = useCallback(async (_email: string, _password: string): Promise<boolean> => {
    // Mock login — always succeeds
    await new Promise((r) => setTimeout(r, 1000));
    setUser({ id: "1", name: "Guest User", email: _email });
    setIsLoginOpen(false);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1200));
    setUser({ id: "1", name, email });
    setIsLoginOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoginOpen, openLogin, closeLogin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
