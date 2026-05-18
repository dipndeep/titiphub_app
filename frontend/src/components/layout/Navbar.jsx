import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Package, Menu, X } from "lucide-react"

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup"

  const getLinks = () => {
    if (location.pathname.startsWith("/manager")) {
      return [
        { path: "/manager", label: "Dashboard" },
        { path: "/", label: "Customer View" },
        { path: "/signin", label: "Logout" },
      ]
    }
    if (location.pathname.startsWith("/owner")) {
      return [
        { path: "/owner", label: "Dashboard" },
        { path: "/", label: "Customer View" },
        { path: "/signin", label: "Logout" },
      ]
    }
    if (isAuthPage) {
      return []
    }
    return [
      { path: "/", label: "Titip Pesanan" },
      { path: "/tracking", label: "Lacak Pesanan" },
    ]
  }

  const links = getLinks()

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Package className="h-6 w-6 text-accent" />
          <span>TitipHub</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              className={`text-sm font-medium hover:text-accent transition-colors ${
                location.pathname === link.path ? "text-accent" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthPage && !location.pathname.startsWith("/manager") && !location.pathname.startsWith("/owner") && (
            <div className="flex items-center gap-3 ml-4 border-l border-white/20 pl-4">
              <Link
                to="/signin"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-accent text-accent-foreground px-4 py-1.5 rounded-md hover:bg-accent/80 transition-colors"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 px-4 pb-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path + link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${
                location.pathname === link.path ? "text-accent" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthPage && !location.pathname.startsWith("/manager") && !location.pathname.startsWith("/owner") && (
            <>
              <hr className="border-white/10" />
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium hover:text-accent transition-colors"
              >
                Masuk
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
