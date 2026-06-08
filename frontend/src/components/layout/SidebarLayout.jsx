import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { 
  LayoutDashboard, Users, LogOut, Menu, X, Crown, UserCheck, KeyRound 
} from "lucide-react"
import api from "../../utils/api"

export default function SidebarLayout({ children }) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [hasResetRequests, setHasResetRequests] = useState(false)

  const checkResetRequests = async () => {
    try {
      const res = await api.get("/auth/users")
      const list = res.data?.users || []
      const pendingResets = list.some(u => u.resetRequested)
      setHasResetRequests(pendingResets)
    } catch (err) {
      console.error("Gagal memeriksa permintaan reset password:", err)
    }
  }

  useEffect(() => {
    if (!user || (user.role !== "owner" && user.role !== "manager")) return

    checkResetRequests()

    // Poll every 15 seconds to fetch live forgot password updates!
    const interval = setInterval(checkResetRequests, 15000)
    return () => clearInterval(interval)
  }, [user, location.pathname])

  if (!user || (user.role !== "owner" && user.role !== "manager")) {
    return <>{children}</>
  }

  const handleLogout = () => {
    logout()
    navigate("/", { replace: true })
  }

  const menuItems = user.role === "owner" 
    ? [
        { path: "/owner", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { path: "/users", label: "Daftar Pengguna", icon: <Users className="w-5 h-5" /> },
        { path: "/change-password", label: "Ganti Password", icon: <KeyRound className="w-5 h-5" /> },
      ]
    : [
        { path: "/manager", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { path: "/users", label: "Daftar Pengguna", icon: <Users className="w-5 h-5" /> },
        { path: "/change-password", label: "Ganti Password", icon: <KeyRound className="w-5 h-5" /> },
      ]

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-primary text-white px-4 h-16 fixed top-0 left-0 right-0 z-50 shadow-md">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg">
          <div className="relative w-8 h-8 shrink-0 bg-white/10 rounded-lg flex items-center justify-center p-1">
            <img 
              src="/titiphub-icon-white.png" 
              alt="TitipHub Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span>TitipHub</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors relative">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          {!isOpen && hasResetRequests && (
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200/50 flex flex-col justify-between 
        transform transition-transform duration-300 ease-in-out md:translate-x-0 pt-16 md:pt-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Brand Header (Desktop) */}
        <div className="hidden md:flex items-center gap-3 px-6 h-20 border-b border-gray-100 bg-gray-50/50">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
            <img src="/titiphub-icon-white.png" alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <h1 className="font-extrabold text-base text-gray-900 leading-none">TitipHub</h1>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block mt-1">Admin Portal</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            const isUsersMenu = item.label === "Daftar Pengguna"
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative
                  ${isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/10" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"}
                `}
              >
                <div className="relative flex items-center justify-center shrink-0">
                  {item.icon}
                  {isUsersMenu && hasResetRequests && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </div>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Profile and Logout Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
          {/* User Profile Info */}
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-extrabold text-sm shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-800 truncate leading-tight">{user.name}</p>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                {user.role === "owner" ? (
                  <>
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-semibold capitalize text-amber-600">Owner</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-secondary" />
                    <span className="font-semibold capitalize text-secondary">Manager</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 pt-16 md:pt-0 min-h-screen flex flex-col overflow-x-hidden">
        <div className="flex-1 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
