import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, ShoppingBag, CheckCircle, TrendingUp, ArrowUpRight, Activity, Clock, Loader2, AlertCircle } from "lucide-react"
import api from "../../utils/api"

function formatRupiah(num) {
  if (num === null || num === undefined) return "Rp 0"
  return "Rp " + num.toLocaleString("id-ID")
}

function formatWhatsAppLink(phone) {
  if (!phone) return null
  let clean = phone.replace(/\D/g, "")
  if (clean.startsWith("0")) {
    clean = "62" + clean.slice(1)
  }
  return `https://wa.me/${clean}`
}

export default function Dashboard() {
  const [statsData, setStatsData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    ongoingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Document Title
  useEffect(() => {
    document.title = "Owner Dashboard | TitipHub"
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError("")
    try {
      const [statsRes, recentRes] = await Promise.all([
        api.get("/stats"),
        api.get("/stats/recent")
      ])
      setStatsData(statsRes.data?.stats || statsData)
      setRecentOrders(recentRes.data?.recentOrders || [])
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data dashboard Owner. Pastikan server backend Anda aktif.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const stats = [
    { label: "Total Kiriman", value: statsData.totalOrders.toString(), icon: <ShoppingBag className="w-5 h-5 text-white" />, color: "bg-primary", change: "+12.5%", isUp: true },
    { label: "Completed", value: statsData.completedOrders.toString(), icon: <CheckCircle className="w-5 h-5 text-white" />, color: "bg-accent text-accent-foreground", change: "+15.2%", isUp: true },
    { label: "Total Pelanggan", value: statsData.totalCustomers.toString(), icon: <Users className="w-5 h-5 text-white" />, color: "bg-secondary", change: "+4.1%", isUp: true },
    { label: "Pendapatan Kotor", value: formatRupiah(statsData.totalRevenue), icon: <TrendingUp className="w-5 h-5 text-white" />, color: "bg-blue-500", change: "+8.4%", isUp: true },
  ]

  const statusBadges = {
    Pending: "bg-amber-100 text-amber-800",
    "On-going": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  }

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Master <span className="gradient-text">Dashboard</span></h1>
            <p className="text-muted-foreground text-lg">Ringkasan performa dan metrik bisnis keseluruhan TitipHub.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm border-0 gap-1.5 flex items-center shadow-none">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Live Data
            </Badge>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-border/60" onClick={fetchData} disabled={loading}>
              <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3 text-sm animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Kesalahan Mengambil Data</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white relative overflow-hidden group animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl ${stat.color} shadow-md`}>
                    {stat.icon}
                  </div>
                  <Badge variant="outline" className={`border-0 bg-gray-50 flex items-center gap-1 ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : null}
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-1 text-gray-800">{loading ? "..." : stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white animate-fade-in-up animation-delay-500 overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-gray-50/50 flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Riwayat Transaksi Terbaru
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="py-12 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground text-sm">
                  Tidak ada transaksi terbaru.
                </div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-white">
                    <tr className="border-b border-border/40">
                      <th className="px-6 py-4 font-medium">Resi TitipHub</th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Barang</th>
                      <th className="px-6 py-4 font-medium">Ongkir</th>
                      <th className="px-6 py-4 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {order.resiTitiphub || <span className="text-xs text-muted-foreground italic">Menunggu proses</span>}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                        <td className="px-6 py-4 text-gray-600 max-w-[150px] truncate" title={order.itemName}>{order.itemName}</td>
                        <td className="px-6 py-4 font-semibold text-primary">{order.ongkir ? formatRupiah(order.ongkir) : "—"}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadges[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
          
          {/* Manager Activity */}
          <Card className="border-0 shadow-lg bg-white animate-fade-in-up animation-delay-600">
            <CardHeader className="border-b border-border/40 bg-gray-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Aktivitas Admin
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-border/40 text-sm">
                 <div className="p-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                   <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary font-bold shrink-0">A</div>
                   <div>
                     <p className="text-sm font-bold text-gray-800 mb-0.5">Andi (Admin 1)</p>
                     <p className="text-xs text-gray-600 mb-1">Menerbitkan resi <span className="font-semibold text-primary">TH-2026-0002</span> dan update status ke <span className="font-semibold">Completed</span></p>
                     <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Live Data</p>
                   </div>
                 </div>
                 <div className="p-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                   <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary font-bold shrink-0">D</div>
                   <div>
                     <p className="text-sm font-bold text-gray-800 mb-0.5">System (TitipHub)</p>
                     <p className="text-xs text-gray-600 mb-1">Database otomatis mensinkronisasi pengiriman baru & memvalidasi tarif jastip.</p>
                     <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Aktif</p>
                   </div>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  )
}
