import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, FileText, Send, Plane, Ship, Zap, Clock, CheckCircle2 } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    itemName: "",
    resiAsal: "",
    tipePengiriman: "",
    kecepatanPengiriman: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // Simulasi notifikasi berhasil, lalu redirect
    setTimeout(() => navigate("/tracking"), 2000)
  }

  if (submitted) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto text-center animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/15 mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Data Barang Berhasil Diinput!</h2>
          <p className="text-muted-foreground mb-2">
            Barang <span className="font-semibold text-foreground">"{formData.itemName}"</span> telah berhasil didaftarkan ke sistem TitipHub.
          </p>
          <p className="text-sm text-muted-foreground">
            Anda akan menerima resi TitipHub setelah Admin memproses kiriman Anda. Mengarahkan ke halaman tracking...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Kirim Barang via Jastip</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">Daftarkan barang kiriman Anda ke TitipHub untuk proses jastip yang aman dan terpantau.</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0 bg-white animate-fade-in-up animation-delay-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Formulir Pengiriman Barang
            </CardTitle>
            <CardDescription>Masukkan detail barang dan informasi pengiriman Anda.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {/* Nama Barang */}
              <div className="space-y-2">
                <label htmlFor="itemName" className="text-sm font-semibold flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" /> Nama Barang
                </label>
                <Input id="itemName" placeholder="Contoh: Sepatu Nike Air Max, iPhone 15 Pro" className="h-11 rounded-xl border-border/60 focus:border-primary" required value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
              </div>

              {/* Resi Pengiriman Asal */}
              <div className="space-y-2">
                <label htmlFor="resiAsal" className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Nomor Resi Pengiriman Asal
                </label>
                <Input id="resiAsal" placeholder="Masukkan nomor resi dari ekspedisi asal" className="h-11 rounded-xl border-border/60 focus:border-primary" required value={formData.resiAsal} onChange={(e) => setFormData({ ...formData, resiAsal: e.target.value })} />
                <p className="text-xs text-muted-foreground">Resi dari jasa ekspedisi yang Anda gunakan untuk mengirim barang ke TitipHub.</p>
              </div>

              {/* Tipe Pengiriman Jastip */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Plane className="w-4 h-4 text-primary" /> Tipe Pengiriman Jastip
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.tipePengiriman === "udara"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                    onClick={() => setFormData({ ...formData, tipePengiriman: "udara" })}
                  >
                    <Plane className={`w-7 h-7 ${formData.tipePengiriman === "udara" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-semibold ${formData.tipePengiriman === "udara" ? "text-primary" : "text-muted-foreground"}`}>Udara</span>
                    <span className="text-[11px] text-muted-foreground">Lebih cepat</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.tipePengiriman === "laut"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                    onClick={() => setFormData({ ...formData, tipePengiriman: "laut" })}
                  >
                    <Ship className={`w-7 h-7 ${formData.tipePengiriman === "laut" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-semibold ${formData.tipePengiriman === "laut" ? "text-primary" : "text-muted-foreground"}`}>Laut</span>
                    <span className="text-[11px] text-muted-foreground">Lebih hemat</span>
                  </button>
                </div>
              </div>

              {/* Kecepatan Pengiriman */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Kecepatan Pengiriman
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.kecepatanPengiriman === "reguler"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-border/60 hover:border-secondary/40"
                    }`}
                    onClick={() => setFormData({ ...formData, kecepatanPengiriman: "reguler" })}
                  >
                    <Clock className={`w-7 h-7 ${formData.kecepatanPengiriman === "reguler" ? "text-secondary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-semibold ${formData.kecepatanPengiriman === "reguler" ? "text-secondary" : "text-muted-foreground"}`}>Reguler</span>
                    <span className="text-[11px] text-muted-foreground">Estimasi 7-14 hari</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.kecepatanPengiriman === "express"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-border/60 hover:border-secondary/40"
                    }`}
                    onClick={() => setFormData({ ...formData, kecepatanPengiriman: "express" })}
                  >
                    <Zap className={`w-7 h-7 ${formData.kecepatanPengiriman === "express" ? "text-secondary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-semibold ${formData.kecepatanPengiriman === "express" ? "text-secondary" : "text-muted-foreground"}`}>Express</span>
                    <span className="text-[11px] text-muted-foreground">Estimasi 3-5 hari</span>
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                type="submit"
                disabled={!formData.tipePengiriman || !formData.kecepatanPengiriman}
                className="w-full h-12 text-base rounded-xl font-semibold shadow-lg shadow-primary/20 gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                Kirim Data Barang
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
