import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ShoppingBag, CheckCircle, TrendingUp, ArrowUpRight, Activity } from "lucide-react"

export default function Dashboard() {
  const stats = [
    { label: "Total Pesanan", value: "156", icon: <ShoppingBag className="w-5 h-5 text-white" />, color: "bg-primary", change: "+12.5%", isUp: true },
    { label: "Pesanan Selesai", value: "142", icon: <CheckCircle className="w-5 h-5 text-white" />, color: "bg-accent text-accent-foreground", change: "+15.2%", isUp: true },
    { label: "Total Pengguna", value: "84", icon: <Users className="w-5 h-5 text-white" />, color: "bg-secondary", change: "+4.1%", isUp: true },
    { label: "Pendapatan Kotor", value: "Rp 5.240.000", icon: <TrendingUp className="w-5 h-5 text-white" />, color: "bg-blue-500", change: "+8.4%", isUp: true },
  ]

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Master <span className="gradient-text">Dashboard</span></h1>
            <p className="text-muted-foreground text-lg">Ringkasan performa dan metrik bisnis keseluruhan TitipHub.</p>
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-sm border-0 gap-1.5 flex items-center shadow-none">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Live Data
          </Badge>
        </div>

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
                  <h3 className="text-3xl font-bold mb-1 text-gray-800">{stat.value}</h3>
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
              <button className="text-sm text-secondary hover:underline font-medium">Lihat Semua</button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-white">
                  <tr className="border-b border-border/40">
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">Barang</th>
                    <th className="px-6 py-4 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">ORD-001</td>
                    <td className="px-6 py-4 text-gray-600">Budi Santoso</td>
                    <td className="px-6 py-4 text-gray-600">Sepatu Nike Air Max</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Diproses</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">ORD-002</td>
                    <td className="px-6 py-4 text-gray-600">Siti Rahayu</td>
                    <td className="px-6 py-4 text-gray-600">Kopi Kenangan 3 Cup</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Selesai</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">ORD-003</td>
                    <td className="px-6 py-4 text-gray-600">Agus Pratama</td>
                    <td className="px-6 py-4 text-gray-600">Buku Tere Liye</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Manager Activity */}
          <Card className="border-0 shadow-lg bg-white animate-fade-in-up animation-delay-600">
            <CardHeader className="border-b border-border/40 bg-gray-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Aktivitas Manager
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-border/40">
                 <div className="p-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                   <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary font-bold shrink-0">A</div>
                   <div>
                     <p className="text-sm font-bold text-gray-800 mb-0.5">Andi (Manager 1)</p>
                     <p className="text-sm text-gray-600 mb-1">Menyelesaikan pesanan <span className="font-semibold text-primary">ORD-002</span></p>
                     <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> 2 jam lalu</p>
                   </div>
                 </div>
                 <div className="p-5 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                   <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary font-bold shrink-0">R</div>
                   <div>
                     <p className="text-sm font-bold text-gray-800 mb-0.5">Rina (Manager 2)</p>
                     <p className="text-sm text-gray-600 mb-1">Menerima pesanan baru <span className="font-semibold text-primary">ORD-003</span></p>
                     <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> 5 jam lalu</p>
                   </div>
                 </div>
                 <div className="p-5 text-center">
                   <button className="text-sm text-secondary hover:text-primary font-medium transition-colors">Lihat Semua Aktivitas</button>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
