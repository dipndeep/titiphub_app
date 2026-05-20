import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Package, Menu, X, Drone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isLanding = location.pathname === "/"
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getLinks = () => {
    if (location.pathname.startsWith("/manager")) {
      return [
        { path: "/manager", label: "Dashboard" },
        { path: "/", label: "Logout" },
      ]
    }
    if (location.pathname.startsWith("/owner")) {
      return [
        { path: "/owner", label: "Dashboard" },
        { path: "/", label: "Logout" },
      ]
    }
    if (location.pathname === "/order" || location.pathname === "/tracking") {
      return [
        { path: "/order", label: "Titip Barang" },
        { path: "/tracking", label: "Lacak Pesanan" },
        { path: "/", label: "Logout" },
      ]
    }
    return []
  }

  const links = getLinks()
  const showAuthButtons = location.pathname === "/"
  const isLight = !isLanding || scrolled
  const navBg = isLanding
    ? scrolled 
      ? "bg-white/85 backdrop-blur-md border-b border-gray-200/50 shadow-sm" 
      : "bg-transparent border-b border-transparent"
    : "bg-white/85 backdrop-blur-md border-b border-gray-200/50 shadow-sm"

  if (isAuthPage) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={`flex items-center gap-2.5 font-bold text-xl tracking-tight transition-colors duration-300 ${isLight ? "text-gray-900" : "text-white"}`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${isLight ? "bg-primary/10" : "bg-accent/20"}`}>
            <Drone className={`h-5 w-5 transition-colors duration-300 ${isLight ? "text-primary" : "text-accent"}`} />
          </div>
          <span>TitipHub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path + link.label}
                to={link.path}
                className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? isLight
                      ? "bg-primary/10 text-primary"
                      : "bg-white/15 text-accent"
                    : isLight
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          {showAuthButtons && (
            <div className="flex items-center gap-2 ml-4">
              <Link to="/signin">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className={`rounded-lg h-9 transition-colors duration-300 ${
                    isLight 
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Masuk
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  size="sm" 
                  className={`rounded-lg h-9 font-semibold transition-all duration-300 shadow-md ${
                    isLight 
                      ? "bg-primary text-white hover:bg-primary/95 shadow-primary/10" 
                      : "bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent/20"
                  }`}
                >
                  Daftar
                </Button>
              </Link>
            </div>
          )}
        </div>

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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 pb-4 pt-2 space-y-1 animate-fade-in ${
          isLight 
            ? "bg-white/95 border-gray-100" 
            : "glass-dark border-white/10"
        }`}>
          {links.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === link.path
                  ? isLight
                    ? "bg-primary/10 text-primary"
                    : "bg-white/15 text-accent"
                  : isLight
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {showAuthButtons && (
            <>
              <hr className={`my-2 ${isLight ? "border-gray-100" : "border-white/10"}`} />
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                  isLight 
                    ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50" 
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Masuk
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                  isLight 
                    ? "bg-primary text-white hover:bg-primary/95" 
                    : "bg-accent/10 text-accent hover:bg-accent/20"
                }`}
              >
                Daftar Sekarang
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
