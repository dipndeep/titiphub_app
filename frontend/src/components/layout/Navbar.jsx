import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Package, Menu, X } from "lucide-react"
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
        { path: "/", label: "Beranda" },
        { path: "/signin", label: "Logout" },
      ]
    }
    if (location.pathname.startsWith("/owner")) {
      return [
        { path: "/owner", label: "Dashboard" },
        { path: "/", label: "Beranda" },
        { path: "/signin", label: "Logout" },
      ]
    }
    if (isAuthPage) return []
    return [
      { path: "/", label: "Beranda" },
      { path: "/order", label: "Titip Barang" },
      { path: "/tracking", label: "Lacak Pesanan" },
    ]
  }

  const links = getLinks()
  const navBg = isLanding
    ? scrolled ? "glass-dark shadow-lg" : "bg-transparent"
    : "glass-dark shadow-lg"

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white">
          <div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center">
            <Package className="h-5 w-5 text-accent" />
          </div>
          <span>TitipHub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                location.pathname === link.path
                  ? "bg-white/15 text-accent"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthPage && !location.pathname.startsWith("/manager") && !location.pathname.startsWith("/owner") && (
            <div className="flex items-center gap-2 ml-4 border-l border-white/15 pl-4">
              <Link to="/signin">
                <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg h-9">
                  Masuk
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg h-9 font-semibold shadow-lg shadow-accent/20">
                  Daftar
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 px-4 pb-4 pt-2 space-y-1 animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === link.path
                  ? "bg-white/15 text-accent"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthPage && !location.pathname.startsWith("/manager") && !location.pathname.startsWith("/owner") && (
            <>
              <hr className="border-white/10 my-2" />
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-accent rounded-lg bg-accent/10 transition-colors"
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
