import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Loader2 } from "lucide-react"

/**
 * ProtectedRoute wraps routes that require authentication and specific roles.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The route content to render
 * @param {string[]} [props.allowedRoles] - Array of roles allowed (e.g. ["customer", "manager"])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth()

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">Memuat...</p>
        </div>
      </div>
    )
  }

  // Not authenticated — redirect to sign in
  if (!user) {
    return <Navigate to="/signin" replace />
  }

  // Role check — if allowedRoles specified and user's role not included
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on their actual role
    if (user.role === "owner") return <Navigate to="/owner" replace />
    if (user.role === "manager") return <Navigate to="/manager" replace />
    return <Navigate to="/order" replace />
  }

  return children
}
