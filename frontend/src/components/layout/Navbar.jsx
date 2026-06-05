import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Package, Menu, X, LogIn, UserPlus, LayoutDashboard, Truck, LogOut, AlertTriangle, Home, Sparkles, HelpCircle, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const isLanding = location.pathname === "/"
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (e, link) => {
    if (link.label === "Logout") {
      e.preventDefault()
      setShowLogoutConfirm(true)
    } else if (link.path.startsWith("/#")) {
      setMobileOpen(false)
      if (location.pathname === "/") {
        e.preventDefault()
        const id = link.path.replace("/#", "")
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else {
      setMobileOpen(false)
    }
  }

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false)
    navigate("/")
  }

  const getLinks = () => {
    if (location.pathname.startsWith("/manager")) {
      return [
        { path: "/manager", label: "Dashboard", icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
        { path: "/", label: "Logout", icon: <LogOut className="w-3.5 h-3.5" /> },
      ]
    }
    if (location.pathname.startsWith("/owner")) {
      return [
        { path: "/owner", label: "Dashboard", icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
        { path: "/", label: "Logout", icon: <LogOut className="w-3.5 h-3.5" /> },
      ]
    }
    if (location.pathname === "/order" || location.pathname === "/tracking") {
      return [
        { path: "/order", label: "Titip Barang", icon: <Package className="w-3.5 h-3.5" /> },
        { path: "/tracking", label: "Lacak Pesanan", icon: <Truck className="w-3.5 h-3.5" /> },
        { path: "/", label: "Logout", icon: <LogOut className="w-3.5 h-3.5" /> },
      ]
    }
    return [
      { path: "/#home", label: "Beranda", icon: <Home className="w-3.5 h-3.5" /> },
      { path: "/#features", label: "Fitur", icon: <Sparkles className="w-3.5 h-3.5" /> },
      { path: "/#how-it-works", label: "Cara Kerja", icon: <HelpCircle className="w-3.5 h-3.5" /> },
      { path: "/#testimonials", label: "Testimoni", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    ]
  }

  const isLinkActive = (link) => {
    if (location.pathname === link.path) return true
    if (isLanding && link.path.startsWith("/#")) {
      const hash = link.path.replace("/", "")
      return location.hash === hash || (location.hash === "" && link.path === "/#home")
    }
    return false
  }

  const links = getLinks()
  const showAuthButtons = location.pathname === "/"
  const isLight = !isLanding || scrolled
  const navBg = isLanding
    ? scrolled 
      ? "bg-white/80 backdrop-blur-md border-gray-200/50 shadow-lg" 
      : "bg-white/10 backdrop-blur-md border-white/10 shadow-lg"
    : "bg-white/80 backdrop-blur-md border-gray-200/50 shadow-lg"

  if (isAuthPage) return null;

  return (
    <>
      <nav className={`fixed top-4 left-0 right-0 mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-7xl z-50 rounded-2xl border transition-all duration-300 overflow-hidden ${navBg}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className={`flex items-center gap-2.5 font-bold text-xl tracking-tight transition-colors duration-300 ${isLight ? "text-gray-900" : "text-white"}`}>
            <div className="relative w-9 h-9 shrink-0">
              <img 
                src="/titiphub-icon-white.png" 
                alt="TitipHub Logo" 
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isLight ? "opacity-0" : "opacity-100"}`} 
              />
              <img 
                src="/titiphub-icon-black.png" 
                alt="TitipHub Logo" 
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isLight ? "opacity-100" : "opacity-0"}`} 
              />
            </div>
            <span>TitipHub</span>
          </Link>
        </div>

        {/* Center Links (Middle) */}
        <div className="hidden md:flex items-center justify-center gap-1">
          {links.filter(link => link.label !== "Logout").map((link) => {
            const isActive = isLinkActive(link)
            return (
              <Link
                key={link.path + link.label}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? isLight
                      ? "bg-primary/10 text-primary"
                      : "bg-white/15 text-accent"
                    : isLight
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Right Actions (Right) */}
        <div className="flex-1 flex justify-end items-center gap-2">
          {/* Logout Button (if present in links) */}
          {links.filter(link => link.label === "Logout").map((link) => {
            return (
              <Link
                key={link.path + link.label}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                className="hidden md:flex text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/10"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )
          })}

          {showAuthButtons && (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/signin">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className={`rounded-lg h-9 transition-colors duration-300 flex items-center gap-1.5 ${
                    isLight 
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Masuk
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  size="sm" 
                  className={`rounded-lg h-9 font-semibold transition-all duration-300 shadow-md flex items-center gap-1.5 ${
                    isLight 
                      ? "bg-primary text-white hover:bg-primary/95 shadow-primary/10" 
                      : "bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/20"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Daftar
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isLight 
                ? "text-gray-800 hover:bg-gray-100" 
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 pb-4 pt-2 space-y-1 animate-fade-in ${
          isLight 
            ? "bg-white/95 border-gray-100" 
            : "glass-dark border-white/10"
        }`}>
          {links.map((link) => {
            const isLogout = link.label === "Logout"
            return (
              <Link
                key={link.path + link.label}
                to={link.path}
                onClick={(e) => handleLinkClick(e, link)}
                className={`flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                  isLogout
                    ? "bg-red-500 hover:bg-red-600 text-white mt-4 shadow-sm shadow-red-500/10"
                    : isLinkActive(link)
                      ? isLight
                        ? "bg-primary/10 text-primary"
                        : "bg-white/15 text-accent"
                      : isLight
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )
          })}
          {showAuthButtons && (
            <>
              <hr className={`my-2 ${isLight ? "border-gray-100" : "border-white/10"}`} />
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                  isLight 
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <LogIn className="w-4 h-4" />
                Masuk
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                  isLight 
                    ? "bg-primary text-white hover:bg-primary/95" 
                    : "bg-accent/10 text-accent hover:bg-accent/20"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                Daftar Sekarang
              </Link>
            </>
          )}
        </div>
      )}

      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 text-center text-gray-900">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">Konfirmasi Keluar</h3>
            <p className="text-gray-500 text-sm mb-6">
              Apakah Anda yakin ingin keluar dari sistem TitipHub? Anda harus masuk kembali untuk mengakses pesanan Anda.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors text-sm"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Batal
              </button>
              <button
                type="button"
                className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md shadow-red-500/10 hover:shadow-red-500/20 transition-all text-sm"
                onClick={handleConfirmLogout}
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
