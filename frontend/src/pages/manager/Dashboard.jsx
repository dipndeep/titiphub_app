import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, ShoppingCart, Truck, CheckCircle2, XCircle, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  const [orders, setOrders] = useState([
    { id: "ORD-2026-001", customer: "Budi Santoso", itemName: "Sepatu Nike Air Max", status: "Pending", date: "18 Mei 2026" },
    { id: "ORD-2026-002", customer: "Siti Rahayu", itemName: "Kopi Kenangan 3 Cup", status: "Diproses", date: "17 Mei 2026" },
    { id: "ORD-2026-003", customer: "Agus Pratama", itemName: "Buku Tere Liye - Bumi", status: "Dikirim", date: "16 Mei 2026" },
    { id: "ORD-2026-004", customer: "Rina Melati", itemName: "Skincare Somethinc", status: "Selesai", date: "15 Mei 2026" },
  ])

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))
  }

  const statusConfig = {
    Pending: { color: "bg-amber-100 text-amber-700", label: "Menunggu" },
    Diproses: { color: "bg-blue-100 text-blue-700", label: "Diproses" },
    Dikirim: { color: "bg-secondary/15 text-secondary", label: "Dikirim" },
    Selesai: { color: "bg-green-100 text-green-700", label: "Selesai" },
    Batal: { color: "bg-red-100 text-red-700", label: "Batal" },
  }

  const stats = [
    { label: "Pesanan Baru", value: orders.filter(o => o.status === "Pending").length, icon: <Clock className="w-5 h-5 text-amber-500" />, color: "bg-amber-50" },
    { label: "Sedang Diproses", value: orders.filter(o => o.status === "Diproses").length, icon: <ShoppingCart className="w-5 h-5 text-blue-500" />, color: "bg-blue-50" },
    { label: "Dalam Pengiriman", value: orders.filter(o => o.status === "Dikirim").length, icon: <Truck className="w-5 h-5 text-secondary" />, color: "bg-secondary/10" },
    { label: "Selesai", value: orders.filter(o => o.status === "Selesai").length, icon: <CheckCircle2 className="w-5 h-5 text-accent" />, color: "bg-accent/10" },
  ]

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manager <span className="gradient-text">Dashboard</span></h1>
            <p className="text-muted-foreground">Kelola pesanan jastip dan perbarui status pengiriman.</p>
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
                <div className={`p-3 rounded-xl bg-white shadow-sm`}>
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

        <Card className="border-0 shadow-xl bg-white animate-fade-in-up animation-delay-500 overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-gray-50/50 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Daftar Pesanan Jastip
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID Pesanan</th>
                  <th className="px-6 py-4 font-semibold">Pelanggan</th>
                  <th className="px-6 py-4 font-semibold">Barang</th>
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {orders.map((order) => {
                  const config = statusConfig[order.status]
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 max-w-[200px] truncate" title={order.itemName}>{order.itemName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                      <td className="px-6 py-4">
                        <Badge className={`${config.color} border-0 px-2.5 py-0.5 rounded-md font-semibold`}>
                          {config.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          {order.status === "Pending" && (
                            <>
                              <Button size="sm" className="h-8 bg-blue-500 hover:bg-blue-600 shadow-sm" onClick={() => updateStatus(order.id, "Diproses")}>
                                <CheckCircle2 className="w-4 h-4 mr-1" /> Terima
                              </Button>
                              <Button size="sm" variant="destructive" className="h-8 shadow-sm" onClick={() => updateStatus(order.id, "Batal")}>
                                <XCircle className="w-4 h-4 mr-1" /> Tolak
                              </Button>
                            </>
                          )}
                          {order.status === "Diproses" && (
                            <Button size="sm" className="h-8 bg-secondary hover:bg-secondary/90 shadow-sm" onClick={() => updateStatus(order.id, "Dikirim")}>
                              <Truck className="w-4 h-4 mr-1" /> Kirim Barang
                            </Button>
                          )}
                          {order.status === "Dikirim" && (
                            <Button size="sm" className="h-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm" onClick={() => updateStatus(order.id, "Selesai")}>
                              <CheckCircle2 className="w-4 h-4 mr-1" /> Selesaikan
                            </Button>
                          )}
                          {(order.status === "Selesai" || order.status === "Batal") && (
                             <span className="text-xs text-muted-foreground px-2 py-1 bg-gray-100 rounded-md">Tidak ada aksi</span>
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
