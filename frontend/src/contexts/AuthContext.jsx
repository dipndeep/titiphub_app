import React, { createContext, useContext, useState, useEffect } from "react"
import api from "../utils/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("titiphub_token"))
  const [isLoading, setIsLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("titiphub_token")
      if (!storedToken) {
        setIsLoading(false)
        return
      }

      try {
        const res = await api.get("/auth/me")
        setUser(res.data.user)
        setToken(storedToken)
      } catch (err) {
        // Token invalid — clear everything
        localStorage.removeItem("titiphub_token")
        localStorage.removeItem("titiphub_user")
        setUser(null)
        setToken(null)
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password })
    const { token: newToken, user: userData } = res.data

    localStorage.setItem("titiphub_token", newToken)
    localStorage.setItem("titiphub_user", JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)

    return userData
  }

  const register = async (name, email, phone, password) => {
    const res = await api.post("/auth/register", { name, email, phone, password })
    const { token: newToken, user: userData } = res.data

    localStorage.setItem("titiphub_token", newToken)
    localStorage.setItem("titiphub_user", JSON.stringify(userData))
    setToken(newToken)
    setUser(userData)

    return userData
  }

  const logout = () => {
    localStorage.removeItem("titiphub_token")
    localStorage.removeItem("titiphub_user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
