import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, Loader2, CheckCircle2, Search, Plane, Ship, Zap, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Tracking() {
  const orders = [
    {
      id: "TH-2026-0001",
      itemName: "Sepatu Nike Air Max",
      resiAsal: "JNE-123456789",
      tipePengiriman: "Udara",
      kecepatan: "Express",
      status: "On-going",
      resiTitiphub: "TH-2026-0001",
      date: "18 Mei 2026",
    },
    {
      id: "TH-2026-0002",
      itemName: "Kopi Kenangan 3 Pack",
      resiAsal: "SICEPAT-987654321",
      tipePengiriman: "Laut",
      kecepatan: "Reguler",
      status: "Completed",
      resiTitiphub: "TH-2026-0002",
      date: "15 Mei 2026",
    },
    {
      id: "TH-2026-0003",
      itemName: "Buku Tere Liye - Bumi",
      resiAsal: "JNT-112233445",
      tipePengiriman: "Udara",
      kecepatan: "Reguler",
      status: "Pending",
      resiTitiphub: null, // Belum diberikan admin
      date: "18 Mei 2026",
    },
  ]

  const statusConfig = {
    Pending: {
      icon: <Clock className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-700",
      barColor: "bg-amber-400",
      label: "Menunggu Diproses",
      description: "Barang terdaftar, menunggu Admin memproses.",
    },
    "On-going": {
      icon: <Loader2 className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-700",
      barColor: "bg-blue-500",
      label: "Sedang Dalam Proses",
      description: "Barang sedang dalam pengiriman ke TitipHub.",
    },
    Completed: {
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "bg-green-100 text-green-700",
      barColor: "bg-accent",
      label: "Tiba — Siap Diambil",
      description: "Barang telah tiba di TitipHub dan siap diambil!",
    },
  }

  const steps = ["Pending", "On-going", "Completed"]
  const getStepIndex = (status) => steps.indexOf(status)

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Lacak Pengiriman</span>
          </h1>
          <p className="text-muted-foreground text-lg">Pantau status pengiriman barang Anda ke TitipHub secara real-time.</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 animate-fade-in-up animation-delay-100">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Cari berdasarkan nama barang atau resi TitipHub..." className="pl-12 h-12 rounded-xl border-border/60 bg-white shadow-sm text-base" />
        </div>

        {/* Order List */}
        <div className="grid gap-5">
          {orders.map((order, i) => {
            const config = statusConfig[order.status]
            const stepIdx = getStepIndex(order.status)
            return (
              <Card key={order.id} className="overflow-hidden border-0 shadow-md bg-white hover-lift animate-fade-in-up" style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                <CardContent className="p-0">
                  <div className="p-6">
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${config.color}`}>
                          {config.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{order.itemName}</h3>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <Badge className={`${config.color} border-0 px-3 py-1 text-xs font-semibold`}>
                        {config.label}
                      </Badge>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 bg-gray-50 rounded-xl p-4">
                      <div>
                        <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Resi Asal</p>
                        <p className="text-sm font-medium truncate" title={order.resiAsal}>{order.resiAsal}</p>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Resi TitipHub</p>
                        {order.resiTitiphub ? (
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-bold text-primary">{order.resiTitiphub}</p>
                            <button onClick={() => navigator.clipboard.writeText(order.resiTitiphub)} className="text-muted-foreground hover:text-primary transition-colors" title="Salin resi">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">Menunggu admin</p>
                        )}
                      </div>
                      <div>
                        <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Jalur</p>
                        <div className="flex items-center gap-1.5">
                          {order.tipePengiriman === "Udara" ? <Plane className="w-3.5 h-3.5 text-primary" /> : <Ship className="w-3.5 h-3.5 text-primary" />}
                          <span className="text-sm font-medium">{order.tipePengiriman}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Kecepatan</p>
                        <div className="flex items-center gap-1.5">
                          {order.kecepatan === "Express" ? <Zap className="w-3.5 h-3.5 text-secondary" /> : <Clock className="w-3.5 h-3.5 text-secondary" />}
                          <span className="text-sm font-medium">{order.kecepatan}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status description */}
                    <p className="text-sm text-muted-foreground mb-4">{config.description}</p>

                    {/* Step Tracker */}
                    <div className="flex items-center gap-1.5">
                      {steps.map((step, j) => (
                        <div key={step} className="flex-1">
                          <div className={`h-2 w-full rounded-full transition-all duration-500 ${j <= stepIdx ? config.barColor : 'bg-gray-200'}`}></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {steps.map((step, j) => (
                        <span key={step} className={`text-[10px] font-medium ${j <= stepIdx ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                          {step}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
