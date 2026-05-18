import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, ShoppingCart, Truck, CheckCircle2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Tracking() {
  const orders = [
    { id: "ORD-2026-001", itemName: "Sepatu Nike Air Max", status: "Diproses", date: "18 Mei 2026", customer: "Anda" },
    { id: "ORD-2026-002", itemName: "Kopi Kenangan 3 Cup", status: "Selesai", date: "17 Mei 2026", customer: "Anda" },
    { id: "ORD-2026-003", itemName: "Buku Tere Liye - Bumi", status: "Pending", date: "18 Mei 2026", customer: "Anda" },
    { id: "ORD-2026-004", itemName: "Skincare Somethinc", status: "Dikirim", date: "16 Mei 2026", customer: "Anda" },
  ]

  const statusConfig = {
    Pending: { icon: <Clock className="w-5 h-5" />, color: "bg-amber-100 text-amber-700", barWidth: "w-1/4", barColor: "bg-amber-400", label: "Menunggu Konfirmasi" },
    Diproses: { icon: <ShoppingCart className="w-5 h-5" />, color: "bg-blue-100 text-blue-700", barWidth: "w-2/4", barColor: "bg-blue-500", label: "Sedang Dibelikan" },
    Dikirim: { icon: <Truck className="w-5 h-5" />, color: "bg-secondary/15 text-secondary", barWidth: "w-3/4", barColor: "bg-secondary", label: "Dalam Pengiriman" },
    Selesai: { icon: <CheckCircle2 className="w-5 h-5" />, color: "bg-green-100 text-green-700", barWidth: "w-full", barColor: "bg-accent", label: "Pesanan Selesai" },
  }

  const steps = ["Pending", "Diproses", "Dikirim", "Selesai"]
  const getStepIndex = (status) => steps.indexOf(status)

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Lacak Pesanan</span>
          </h1>
          <p className="text-muted-foreground text-lg">Pantau status pesanan jastip Anda secara real-time.</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 animate-fade-in-up animation-delay-100">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input placeholder="Cari berdasarkan nama barang atau ID pesanan..." className="pl-12 h-12 rounded-xl border-border/60 bg-white shadow-sm text-base" />
        </div>

        {/* Order List */}
        <div className="grid gap-4">
          {orders.map((order, i) => {
            const config = statusConfig[order.status]
            const stepIdx = getStepIndex(order.status)
            return (
              <Card key={order.id} className={`overflow-hidden border-0 shadow-md bg-white hover-lift animate-fade-in-up`} style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${config.color}`}>
                          {config.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{order.itemName}</h3>
                          <p className="text-sm text-muted-foreground">{order.id} • {order.date}</p>
                        </div>
                      </div>
                      <Badge className={`${config.color} border-0 px-3 py-1 text-xs font-semibold`}>
                        {config.label}
                      </Badge>
                    </div>

                    {/* Step Tracker */}
                    <div className="flex items-center gap-1">
                      {steps.map((step, j) => (
                        <div key={step} className="flex-1 flex items-center gap-1">
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
