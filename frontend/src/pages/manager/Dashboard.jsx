import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Clock, Loader2, CheckCircle2, XCircle, Search, Filter, Plane, Ship, Zap, Ticket } from "lucide-react"

export default function Dashboard() {
  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Budi Santoso", itemName: "Sepatu Nike Air Max", resiAsal: "JNE-123456789", tipePengiriman: "Udara", kecepatan: "Express", status: "Pending", resiTitiphub: null, date: "18 Mei 2026" },
    { id: "ORD-002", customer: "Siti Rahayu", itemName: "Kopi Kenangan 3 Pack", resiAsal: "SICEPAT-987654321", tipePengiriman: "Laut", kecepatan: "Reguler", status: "On-going", resiTitiphub: "TH-2026-0002", date: "17 Mei 2026" },
    { id: "ORD-003", customer: "Agus Pratama", itemName: "Buku Tere Liye - Bumi", resiAsal: "JNT-112233445", tipePengiriman: "Udara", kecepatan: "Reguler", status: "On-going", resiTitiphub: "TH-2026-0003", date: "16 Mei 2026" },
    { id: "ORD-004", customer: "Rina Melati", itemName: "Skincare Somethinc", resiAsal: "ANTERAJA-556677", tipePengiriman: "Laut", kecepatan: "Express", status: "Completed", resiTitiphub: "TH-2026-0004", date: "15 Mei 2026" },
  ])

  const [resiInput, setResiInput] = useState({})

  const terimaAndBeriResi = (id) => {
    const resi = resiInput[id]
    if (!resi || resi.trim() === "") {
      alert("Masukkan resi TitipHub terlebih dahulu!")
      return
    }
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: "On-going", resiTitiphub: resi } : order
    ))
  }

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))
  }

  const statusConfig = {
    Pending: { color: "bg-amber-100 text-amber-700", label: "Pending" },
    "On-going": { color: "bg-blue-100 text-blue-700", label: "On-going" },
    Completed: { color: "bg-green-100 text-green-700", label: "Completed" },
  }

  const stats = [
    { label: "Kiriman Baru", value: orders.filter(o => o.status === "Pending").length, icon: <Clock className="w-5 h-5 text-amber-500" />, color: "bg-amber-50" },
    { label: "Sedang Diproses", value: orders.filter(o => o.status === "On-going").length, icon: <Loader2 className="w-5 h-5 text-blue-500" />, color: "bg-blue-50" },
    { label: "Selesai", value: orders.filter(o => o.status === "Completed").length, icon: <CheckCircle2 className="w-5 h-5 text-accent" />, color: "bg-accent/10" },
    { label: "Total Pesanan", value: orders.length, icon: <Package className="w-5 h-5 text-primary" />, color: "bg-primary/10" },
  ]

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-muted-foreground">Kelola kiriman pelanggan, terbitkan resi, dan perbarui status pengiriman.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Cari pesanan..." className="pl-9 h-10 w-[200px] lg:w-[250px] rounded-lg border-border/60" />
            </div>
            <Button variant="outline" size="icon" className="rounded-lg h-10 w-10 border-border/60">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <CardContent className={`p-4 flex items-center gap-4 ${stat.color} bg-opacity-50`}>
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <Card className="border-0 shadow-xl bg-white animate-fade-in-up animation-delay-500 overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-gray-50/50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Daftar Kiriman Pelanggan
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-gray-50/80">
                <tr>
                  <th className="px-5 py-4 font-semibold">Pelanggan</th>
                  <th className="px-5 py-4 font-semibold">Barang</th>
                  <th className="px-5 py-4 font-semibold">Resi Asal</th>
                  <th className="px-5 py-4 font-semibold">Jalur / Kecepatan</th>
                  <th className="px-5 py-4 font-semibold">Resi TitipHub</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {orders.map((order) => {
                  const config = statusConfig[order.status]
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-5 py-4">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </td>
                      <td className="px-5 py-4 max-w-[160px] truncate font-medium" title={order.itemName}>{order.itemName}</td>
                      <td className="px-5 py-4">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{order.resiAsal}</code>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            {order.tipePengiriman === "Udara" ? <Plane className="w-3 h-3" /> : <Ship className="w-3 h-3" />}
                            {order.tipePengiriman}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">
                            {order.kecepatan === "Express" ? <Zap className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {order.kecepatan}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {order.resiTitiphub ? (
                          <code className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono font-bold">{order.resiTitiphub}</code>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Belum diterbitkan</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <Badge className={`${config.color} border-0 px-2.5 py-0.5 rounded-md font-semibold`}>
                          {config.label}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col items-end gap-2">
                          {order.status === "Pending" && (
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Resi TitipHub..."
                                className="h-8 w-[140px] text-xs rounded-md border-border/60"
                                value={resiInput[order.id] || ""}
                                onChange={(e) => setResiInput({ ...resiInput, [order.id]: e.target.value })}
                              />
                              <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 shadow-sm gap-1" onClick={() => terimaAndBeriResi(order.id)}>
                                <Ticket className="w-3.5 h-3.5" /> Terbitkan
                              </Button>
                            </div>
                          )}
                          {order.status === "On-going" && (
                            <Button size="sm" className="h-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm gap-1" onClick={() => updateStatus(order.id, "Completed")}>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Barang Tiba
                            </Button>
                          )}
                          {order.status === "Completed" && (
                            <span className="text-xs text-muted-foreground px-2 py-1 bg-gray-100 rounded-md">Selesai</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
