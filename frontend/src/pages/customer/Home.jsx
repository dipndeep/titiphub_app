import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, FileText, Send, Plane, Ship, Zap, Clock, CheckCircle2, Scale, ShieldCheck, MapPin } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    itemName: "",
    resiAsal: "",
    tipePengiriman: "",
    kecepatanPengiriman: "",
    catatan: "",
  })
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false)
    setShowSuccessModal(true)
  }

  const handleInputLagi = () => {
    setShowSuccessModal(false)
    setFormData({
      itemName: "",
      resiAsal: "",
      tipePengiriman: "",
      kecepatanPengiriman: "",
      catatan: "",
    })
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

        <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Kolom Kiri: Info Barang & Opsi Pengiriman */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Bento: Info Barang */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-border/40 animate-fade-in-up animation-delay-100 flex-1 flex flex-col">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" /> Informasi Barang
              </h3>

              <div className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-2">
                  <label htmlFor="itemName" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    Nama Barang
                  </label>
                  <Input id="itemName" name="itemName" autoComplete="off" placeholder="Contoh: Sepatu Nike Air Max" className="h-12 rounded-xl border-border/60 focus:border-primary bg-gray-50/50" required value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="resiAsal" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    Nomor Resi Pengiriman Asal
                  </label>
                  <Input id="resiAsal" name="resiAsal" autoComplete="off" placeholder="Resi ekspedisi asal..." className="h-12 rounded-xl border-border/60 focus:border-primary bg-gray-50/50" required value={formData.resiAsal} onChange={(e) => setFormData({ ...formData, resiAsal: e.target.value })} />
                  <p className="text-xs text-muted-foreground">Resi dari ekspedisi yang Anda gunakan.</p>
                </div>

                <div className="space-y-2 flex-1 flex flex-col pt-1">
                  <label htmlFor="catatan" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                    Catatan Tambahan <span className="text-muted-foreground font-normal text-xs">(Opsional)</span>
                  </label>
                  <textarea
                    id="catatan"
                    name="catatan"
                    autoComplete="off"
                    placeholder="Contoh: Tolong tambah bubble wrap, barang mudah pecah..."
                    className="flex-1 min-h-[100px] w-full rounded-xl border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary/20 bg-gray-50/50 p-3 text-sm resize-none outline-none transition-colors"
                    value={formData.catatan}
                    onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  />
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
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${formData.tipePengiriman === "udara"
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
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${formData.tipePengiriman === "laut"
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
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${formData.kecepatanPengiriman === "reguler"
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
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-300 ${formData.kecepatanPengiriman === "express"
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
              <div className="flex flex-col gap-4">
                <div className="bg-white py-4 px-4 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plane className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-gray-700 font-bold">Udara Reguler</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 85.000</span>
                </div>

                <div className="bg-white py-4 px-4 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plane className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-gray-700 font-bold">Udara Express</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 100.000</span>
                </div>

                <div className="bg-white py-4 px-4 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Ship className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-sm text-gray-700 font-bold">Laut Reguler</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 80.000</span>
                </div>

                <div className="bg-white py-4 px-4 rounded-xl border border-border/40 shadow-sm flex items-center justify-between gap-1 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Ship className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-sm text-gray-700 font-bold">Laut Express</span>
                  </div>
                  <span className="font-bold text-primary text-sm">Rp 95.000</span>
                </div>
              </div>

              {/* Ekstra Info untuk mengisi ruang kosong */}
              <div className="mt-auto pt-6 flex flex-col gap-3">
                <div className="bg-white/70 p-4 rounded-xl border border-primary/20 flex items-start gap-3 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 mb-0.5">100% Aman & Berasuransi</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Layanan asuransi dasar untuk semua kendala.
                    </p>
                  </div>
                </div>

                <div className="bg-white/70 p-4 rounded-xl border border-primary/20 flex items-start gap-3 shadow-sm">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 mb-0.5">Live Tracking 24/7</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Pantau pergerakan barang Anda secara real-time.
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
                Kirim Data Barang
              </Button>
            </div>

          </div>
        </form>
      </div>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/15 mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Proses Berhasil!</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Barang <span className="font-semibold text-foreground">"{formData.itemName}"</span> telah berhasil didaftarkan. Anda akan mendapatkan resi TitipHub setelah Admin memproses paket Anda.
            </p>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                className="w-full h-12 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/10 hover:bg-primary/95 transition-all"
                onClick={() => navigate("/tracking")}
              >
                Lacak Pesanan Saya
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl border-border/60 hover:bg-gray-100 transition-colors"
                onClick={handleInputLagi}
              >
                Input Barang Lain
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Konfirmasi Data Barang</h3>
              <p className="text-sm text-muted-foreground">Pastikan detail barang dan opsi pengiriman Anda sudah benar sebelum dikirim.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl mb-6 space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-border/40">
                <span className="text-muted-foreground">Nama Barang:</span>
                <span className="font-bold text-gray-900 text-right max-w-[150px] sm:max-w-[180px] truncate" title={formData.itemName}>{formData.itemName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/40">
                <span className="text-muted-foreground">No Resi Asal:</span>
                <span className="font-bold text-gray-900 text-right">{formData.resiAsal}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border/40">
                <span className="text-muted-foreground">Jalur:</span>
                <span className="font-bold text-primary capitalize">{formData.tipePengiriman}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kecepatan:</span>
                <span className="font-bold text-secondary capitalize">{formData.kecepatanPengiriman}</span>
              </div>
              {formData.catatan && (
                <div className="flex justify-between border-t border-border/40 pt-2 mt-2">
                  <span className="text-muted-foreground">Catatan:</span>
                  <span className="font-medium text-gray-900 text-right max-w-[150px] sm:max-w-[180px] truncate" title={formData.catatan}>
                    {formData.catatan}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 rounded-xl border-border/60 hover:bg-gray-100 transition-colors"
                onClick={() => setShowConfirmModal(false)}
              >
                Batal
              </Button>
              <Button
                type="button"
                className="flex-1 h-12 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
                onClick={handleConfirmSubmit}
              >
                Kirim Sekarang
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

