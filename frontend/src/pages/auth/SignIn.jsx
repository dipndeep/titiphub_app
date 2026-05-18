import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulasi login — nanti akan terhubung ke backend
    // Untuk demo, arahkan berdasarkan email
    if (formData.email.includes("owner")) {
      navigate("/owner")
    } else if (formData.email.includes("manager")) {
      navigate("/manager")
    } else {
      navigate("/")
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary">TitipHub</h1>
          <p className="text-muted-foreground mt-1">Masuk ke akun Anda</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Selamat Datang!</CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan kata sandi untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium leading-none">
                    Kata Sandi
                  </label>
                  <button type="button" className="text-xs text-secondary hover:text-secondary/80 hover:underline transition-colors">
                    Lupa kata sandi?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    className="pl-10 pr-10"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11 text-base">
                Masuk
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Belum punya akun?{" "}
                <Link to="/signup" className="text-secondary font-medium hover:underline transition-colors">
                  Daftar sekarang
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Demo hint */}
        <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-semibold text-accent">💡 Demo:</span> Gunakan email yang mengandung kata{" "}
            <code className="bg-muted px-1 rounded text-xs">owner</code> atau{" "}
            <code className="bg-muted px-1 rounded text-xs">manager</code> untuk masuk ke dashboard masing-masing role.
          </p>
        </div>
      </div>
    </div>
  )
}
