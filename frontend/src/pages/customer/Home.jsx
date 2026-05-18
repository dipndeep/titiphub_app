import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, ImagePlus, FileText, Hash, Send } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ itemName: "", description: "", quantity: 1 })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/tracking")
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
            <span className="gradient-text">Titip Barang</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">Isi formulir di bawah untuk menitipkan barang yang ingin Anda belikan.</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-xl border-0 bg-white animate-fade-in-up animation-delay-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Formulir Titipan
            </CardTitle>
            <CardDescription>Masukkan detail barang yang ingin Anda titipkan.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="itemName" className="text-sm font-semibold flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" /> Nama Barang
                </label>
                <Input id="itemName" placeholder="Contoh: Sepatu Nike Air Max, Kopi Janji Jiwa" className="h-11 rounded-xl border-border/60 focus:border-primary" required value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
                  <ImagePlus className="w-4 h-4 text-primary" /> Deskripsi / Catatan Khusus
                </label>
                <textarea
                  id="description"
                  className="flex min-h-[120px] w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder="Ukuran, warna, preferensi khusus, link referensi barang, dll."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-semibold flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary" /> Jumlah
                </label>
                <Input id="quantity" type="number" min="1" className="h-11 rounded-xl border-border/60 focus:border-primary w-32" required value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button type="submit" className="w-full h-12 text-base rounded-xl font-semibold shadow-lg shadow-primary/20 gap-2">
                <Send className="w-5 h-5" />
                Kirim Pesanan Jastip
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
