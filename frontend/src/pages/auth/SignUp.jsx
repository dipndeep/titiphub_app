import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2, Phone, Drone, Loader2, AlertCircle } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export default function SignUp() {
  const navigate = useNavigate()
  const { register, user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Document Title
  useEffect(() => {
    document.title = "Daftar Akun | TitipHub"
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

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok!")
      return
    }

    setLoading(true)
    try {
      await register(formData.name, formData.email, formData.phone, formData.password)
      navigate("/order")
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || "Gagal mendaftar. Silakan coba kembali dengan data yang berbeda.")
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    "Pemesanan praktis tanpa ribet",
    "Pantau status secara real-time",
    "Transparan dan terpercaya"
  ]

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl animate-float animation-delay-300"></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[900px] bg-white rounded-3xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-[95vh] md:max-h-[680px] animate-scale-in">
        
        {/* Left: Info Panel */}
        <div className="w-full md:w-5/12 p-8 text-white flex flex-col justify-center bg-oxford-navy-950 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-oxford-navy-800 to-oxford-navy-950 opacity-95"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                <Drone className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">TitipHub</span>
            </Link>
            
            <div className="mt-auto mb-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
                Mulai Perjalanan Jastip Anda.
              </h2>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Bergabunglah dengan ribuan pengguna lainnya yang telah percaya kepada kami.
              </p>
              
              <div className="space-y-3">
                {benefits.map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-accent/20 p-1 rounded-full shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form Panel */}
        <div className="w-full md:w-7/12 p-6 md:p-8 bg-white flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-[360px]">
            <div className="text-center md:text-left mb-5">
              <h3 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h3>
              <p className="text-gray-500 mt-1 text-sm">Lengkapi data untuk mendaftar gratis.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-2.5 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold text-gray-700">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="name" type="text" placeholder="Masukkan Nama" className="pl-9 h-10 rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/20 transition-all text-sm" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={loading} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="nama@email.com" className="pl-9 h-10 rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/20 transition-all text-sm" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={loading} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-xs font-semibold text-gray-700">Nomor WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="phone" type="tel" placeholder="08xxxxxxxxxx" className="pl-9 h-10 rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/20 transition-all text-sm" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={loading} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-gray-700">Kata Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 6 karakter" className="pl-9 pr-9 h-10 rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/20 transition-all text-sm" required minLength={6} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} disabled={loading} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-700">Konfirmasi Sandi</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="confirmPassword" type="password" placeholder="Ulangi sandi" className="pl-9 h-10 rounded-lg bg-gray-50 border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/20 transition-all text-sm" required minLength={6} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} disabled={loading} />
                </div>
              </div>
              
              <div className="pt-1">
                <Button type="submit" className="w-full h-11 text-base rounded-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Daftar"
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">
                Sudah punya akun?{" "}
                <Link to="/signin" className="text-primary font-bold hover:underline transition-colors">
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
