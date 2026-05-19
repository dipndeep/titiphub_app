import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, FileText, Send, Plane, Ship, Zap, Clock, CheckCircle2, Scale, ShieldCheck } from "lucide-react"

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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">Kirim Barang via Jastip</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-md">
              Daftarkan barang kiriman Anda ke TitipHub untuk proses jastip yang aman dan terpantau.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Kolom Kiri: Info Barang & Opsi Pengiriman */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Bento: Info Barang */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-border/40 animate-fade-in-up animation-delay-100 flex-1">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" /> Informasi Barang
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="itemName" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    Nama Barang
                  </label>
                  <Input id="itemName" placeholder="Contoh: Sepatu Nike Air Max" className="h-12 rounded-xl border-border/60 focus:border-primary bg-gray-50/50" required value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="resiAsal" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    Nomor Resi Pengiriman Asal
                  </label>
                  <Input id="resiAsal" placeholder="Resi ekspedisi asal..." className="h-12 rounded-xl border-border/60 focus:border-primary bg-gray-50/50" required value={formData.resiAsal} onChange={(e) => setFormData({ ...formData, resiAsal: e.target.value })} />
                  <p className="text-xs text-muted-foreground">Resi dari jasa ekspedisi yang Anda gunakan untuk mengirim barang ke TitipHub.</p>
                </div>
              </div>
            </div>

            {/* Baris Bawah Kiri: Jalur & Kecepatan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up animation-delay-200">
              {/* Bento: Jalur */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-border/40">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-gray-700">
                  <Plane className="w-4 h-4 text-primary" /> Jalur Pengiriman
                </h3>
                <div className="grid grid-cols-2 gap-3 h-32">
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${
                      formData.tipePengiriman === "udara"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/60 hover:border-primary/40 bg-gray-50/50"
                    }`}
                    onClick={() => setFormData({ ...formData, tipePengiriman: "udara" })}
                  >
                    <Plane className={`w-6 h-6 ${formData.tipePengiriman === "udara" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-bold ${formData.tipePengiriman === "udara" ? "text-primary" : "text-muted-foreground"}`}>Udara</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${
                      formData.tipePengiriman === "laut"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border/60 hover:border-primary/40 bg-gray-50/50"
                    }`}
                    onClick={() => setFormData({ ...formData, tipePengiriman: "laut" })}
                  >
                    <Ship className={`w-6 h-6 ${formData.tipePengiriman === "laut" ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-bold ${formData.tipePengiriman === "laut" ? "text-primary" : "text-muted-foreground"}`}>Laut</span>
                  </button>
                </div>
              </div>

              {/* Bento: Kecepatan */}
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-border/40">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-gray-700">
                  <Zap className="w-4 h-4 text-secondary" /> Kecepatan
                </h3>
                <div className="grid grid-cols-2 gap-3 h-32">
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${
                      formData.kecepatanPengiriman === "reguler"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-border/60 hover:border-secondary/40 bg-gray-50/50"
                    }`}
                    onClick={() => setFormData({ ...formData, kecepatanPengiriman: "reguler" })}
                  >
                    <Clock className={`w-6 h-6 ${formData.kecepatanPengiriman === "reguler" ? "text-secondary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-bold ${formData.kecepatanPengiriman === "reguler" ? "text-secondary" : "text-muted-foreground"}`}>Reguler</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${
                      formData.kecepatanPengiriman === "express"
                        ? "border-secondary bg-secondary/5 shadow-sm"
                        : "border-border/60 hover:border-secondary/40 bg-gray-50/50"
                    }`}
                    onClick={() => setFormData({ ...formData, kecepatanPengiriman: "express" })}
                  >
                    <Zap className={`w-6 h-6 ${formData.kecepatanPengiriman === "express" ? "text-secondary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-bold ${formData.kecepatanPengiriman === "express" ? "text-secondary" : "text-muted-foreground"}`}>Express</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Tarif & Submit */}
          <div className="lg:col-span-1 flex flex-col gap-6 animate-fade-in-up animation-delay-300">
            
            {/* Bento: Tarif */}
            <div className="bg-primary/5 p-6 md:p-8 rounded-[2rem] border border-primary/15 shadow-sm flex-1 flex flex-col">
              <p className="text-sm font-bold text-primary mb-5 flex items-center gap-2">
                <Scale className="w-5 h-5" /> Tarif Ongkir per Kg
              </p>
              <div className="flex flex-col gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plane className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-[13px] text-gray-700 font-bold">Udara Reguler</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 85.000</span>
                </div>
                
                <div className="bg-white p-3.5 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plane className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-[13px] text-gray-700 font-bold">Udara Express</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 100.000</span>
                </div>
                
                <div className="bg-white p-3.5 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Ship className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-[13px] text-gray-700 font-bold">Laut Reguler</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 80.000</span>
                </div>
                
                <div className="bg-white p-3.5 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Ship className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-[13px] text-gray-700 font-bold">Laut Express</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 95.000</span>
                </div>
              </div>

              {/* Ekstra Info untuk mengisi ruang kosong */}
              <div className="mt-auto pt-6">
                <div className="bg-white/70 p-4 rounded-xl border border-primary/20 flex items-start gap-3 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 mb-1">100% Aman & Berasuransi</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Harga sudah termasuk asuransi dasar. Jika terjadi kendala, paket Anda dilindungi jaminan TitipHub.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento: Submit Button */}
            <div className="mt-auto">
              <Button
                type="submit"
                disabled={!formData.tipePengiriman || !formData.kecepatanPengiriman}
                className="w-full h-[72px] text-lg rounded-[2rem] font-bold shadow-lg shadow-primary/20 gap-3 disabled:opacity-50 transition-transform hover:-translate-y-1"
              >
                <Send className="w-6 h-6" />
                Kirim Data
              </Button>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  )
}

