import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Eye, EyeOff, Drone, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import api from "../../utils/api"

export default function SignIn() {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Forgot password states
  const [showForgotSuccessModal, setShowForgotSuccessModal] = useState(false)
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState("")
  const [forgotLoading, setForgotLoading] = useState(false)

  // Document Title
  useEffect(() => {
    document.title = "Masuk | TitipHub"
  }, [])

  // Auto redirect if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "owner") navigate("/owner", { replace: true })
      else if (user.role === "manager") navigate("/manager", { replace: true })
      else navigate("/order", { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const loggedInUser = await login(formData.email, formData.password)
      // Redirect based on role
      if (loggedInUser.role === "owner") {
        navigate("/owner")
      } else if (loggedInUser.role === "manager") {
        navigate("/manager")
      } else {
        navigate("/order")
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Gagal masuk. Periksa kembali email dan kata sandi Anda.")
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setError("")
    if (!formData.email) {
      setError("Silakan isi alamat email Anda di kolom email terlebih dahulu untuk meminta reset password.")
      return
    }

    setForgotLoading(true)
    try {
      const res = await api.post("/auth/forgot-password", { email: formData.email })
      setForgotSuccessMessage(res.data?.message || "Berhasil menginformasikan ke manager untuk mereset kata sandi.")
      setShowForgotSuccessModal(true)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Gagal mengirim permintaan reset password. Pastikan email terdaftar.")
    } finally {
      setForgotLoading(false)
    }
  }

  // Helper function to autofill credentials for testing
  const handleAutofill = (email, password) => {
    setFormData({ email, password })
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl animate-float animation-delay-300"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 border border-white/20 hover-lift">
            <Drone className="w-8 h-8 text-accent" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Masuk ke TitipHub</h1>
          <p className="text-white/60 mt-1">Selamat datang kembali!</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Login Akun</CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan kata sandi Anda
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-2.5 text-sm animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="nama@email.com" className="pl-10 h-11 rounded-xl border-border/60 focus:border-primary" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={loading || forgotLoading} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Kata Sandi</label>
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    disabled={loading || forgotLoading}
                    className="text-xs text-secondary hover:text-secondary/80 hover:underline transition-colors flex items-center gap-1 font-semibold"
                  >
                    {forgotLoading && <Loader2 className="w-3 h-3 animate-spin text-secondary" />}
                    Lupa kata sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Masukkan kata sandi" className="pl-10 pr-10 h-11 rounded-xl border-border/60 focus:border-primary" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} disabled={loading} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11 text-base rounded-xl font-semibold shadow-lg shadow-primary/20" disabled={loading || forgotLoading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Belum punya akun?{" "}
                <Link to="/signup" className="text-secondary font-semibold hover:underline transition-colors">Daftar sekarang</Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Demo Credentials Helper Card */}
        <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
          <p className="text-xs font-semibold text-accent mb-2 flex items-center gap-1.5">
            <span>💡 Akun Uji Coba (Demo):</span>
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-white/80">
            <button type="button" onClick={() => handleAutofill("owner@titiphub.com", "owner123")} className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left">
              <span className="font-bold text-accent block">Owner</span>
              <span>owner@titiphub.com</span>
              <span className="block text-white/40">Pass: owner123</span>
            </button>
            <button type="button" onClick={() => handleAutofill("manager@titiphub.com", "manager123")} className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left">
              <span className="font-bold text-accent block">Manager</span>
              <span>manager@titiphub.com</span>
              <span className="block text-white/40">Pass: manager123</span>
            </button>
            <button type="button" onClick={() => handleAutofill("budi@email.com", "customer123")} className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left">
              <span className="font-bold text-accent block">Customer (Budi)</span>
              <span>budi@email.com</span>
              <span className="block text-white/40">Pass: customer123</span>
            </button>
          </div>
          <p className="text-[10px] text-white/40 text-center mt-2">Klik tombol di atas untuk mengisi data otomatis.</p>
        </div>
      </div>

      {/* Forgot Password Success Modal */}
      {showForgotSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowForgotSuccessModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center text-gray-900 border border-gray-150 z-10 transform scale-100 transition-all duration-300 animate-in zoom-in-95">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-lg font-extrabold mb-2 text-emerald-700">Permintaan Dikirim</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {forgotSuccessMessage}
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                className="flex-1 h-11 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl transition-all shadow-md shadow-primary/10 text-sm"
                onClick={() => setShowForgotSuccessModal(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
