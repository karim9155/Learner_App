"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("auth-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("auth-user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const responseData = await authApi.login(email, password);

      // Check for "jwt" (from your backend) NOT "token"
      if (responseData.jwt && responseData.user) {
        const userData = responseData.user;
        setUser(userData);
        localStorage.setItem("auth-user", JSON.stringify(userData));

        // Save the "jwt" (from your backend) NOT "token"
        localStorage.setItem("auth-token", responseData.jwt);

        router.push("/dashboard");
      } else {
        // This is what's likely causing the "Login failed" error
        throw new Error("Login success, but response format is incorrect.");
      }
    } catch (error: any) {
      console.error("Detailed login error:", error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("auth-user")
    router.push("/login")
  }

  return (
      <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}