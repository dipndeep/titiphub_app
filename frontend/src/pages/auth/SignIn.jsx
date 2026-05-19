import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Mail, Lock, Eye, EyeOff, Drone } from "lucide-react"

export default function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.email.includes("owner")) navigate("/owner")
    else if (formData.email.includes("manager")) navigate("/manager")
    else navigate("/order")
  }

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12 relative">
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
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="nama@email.com" className="pl-10 h-11 rounded-xl border-border/60 focus:border-primary" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Kata Sandi</label>
                  <button type="button" className="text-xs text-secondary hover:text-secondary/80 hover:underline transition-colors">Lupa kata sandi?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Masukkan kata sandi" className="pl-10 pr-10 h-11 rounded-xl border-border/60 focus:border-primary" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11 text-base rounded-xl font-semibold shadow-lg shadow-primary/20">Masuk</Button>
              <p className="text-sm text-muted-foreground text-center">
                Belum punya akun?{" "}
                <Link to="/signup" className="text-secondary font-semibold hover:underline transition-colors">Daftar sekarang</Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
          <p className="text-xs text-white/60 text-center">
            <span className="font-semibold text-accent">💡 Demo:</span> Gunakan email mengandung <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-white/80">owner</code> atau <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-white/80">manager</code> untuk masuk ke dashboard role tersebut.
          </p>
        </div>
      </div>
    </div>
  )
}
