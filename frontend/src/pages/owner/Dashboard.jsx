import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, ShoppingBag, CheckCircle, TrendingUp, ArrowUpRight, Activity, Clock, Loader2, 
  AlertCircle, Scale, Plane, Ship, Zap, Target, DollarSign, Wallet 
} from "lucide-react"
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
    totalCustomers: 0,
    totalWeight: 0,
    averageWeight: 0,
    averageOngkir: 0,
    distribution: {
      tipePengiriman: { udara: 0, laut: 0 },
      kecepatan: { reguler: 0, express: 0 }
    }
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [tariffs, setTariffs] = useState({
    "Udara-Reguler": 0,
    "Udara-Express": 0,
    "Laut-Reguler": 0,
    "Laut-Express": 0,
  })
  const [loading, setLoading] = useState(true)
  const [tariffsLoading, setTariffsLoading] = useState(true)
  const [error, setError] = useState("")

  // Document Title
  useEffect(() => {
    document.title = "Owner Dashboard | TitipHub"
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setTariffsLoading(true)
    setError("")
    try {
      const [statsRes, recentRes, tariffsRes] = await Promise.all([
        api.get("/stats"),
        api.get("/stats/recent"),
        api.get("/tariffs")
      ])
      setStatsData(statsRes.data?.stats || statsData)
      setRecentOrders(recentRes.data?.recentOrders || [])
      if (tariffsRes.data?.tariffs) {
        setTariffs(tariffsRes.data.tariffs)
      }
    } catch (err) {
      console.error(err)
      setError("Gagal memuat data dashboard Owner. Pastikan server backend Anda aktif.")
    } finally {
      setLoading(false)
      setTariffsLoading(false)
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

  const monthlyRevenueTarget = 5000000
  const targetPercentage = Math.min(
    Math.round((statsData.totalRevenue / monthlyRevenueTarget) * 100),
    100
  )

  const tarifItems = [
    { key: "Udara-Reguler", label: "Udara Reguler", icon: <Plane className="w-3.5 h-3.5" />, iconExtra: null },
    { key: "Udara-Express", label: "Udara Express", icon: <Plane className="w-3.5 h-3.5" />, iconExtra: <Zap className="w-3.5 h-3.5" /> },
    { key: "Laut-Reguler", label: "Laut Reguler", icon: <Ship className="w-3.5 h-3.5" />, iconExtra: null },
    { key: "Laut-Express", label: "Laut Express", icon: <Ship className="w-3.5 h-3.5" />, iconExtra: <Zap className="w-3.5 h-3.5" /> },
  ]

  return (
    <div className="pb-16">
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
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-border/60 bg-white" onClick={fetchData} disabled={loading}>
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

        {/* Detail Target, Metrik Bisnis & Tarif Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up animation-delay-300">
          {/* Card 1: Target Bulanan Jastip */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 font-bold text-gray-800">
                <Target className="w-5 h-5 text-primary" />
                Target Bulanan Jastip
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-3xl font-extrabold text-primary">{formatRupiah(statsData.totalRevenue)}</span>
                  <span className="text-xs text-muted-foreground font-medium">dari {formatRupiah(monthlyRevenueTarget)}</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-100 rounded-full h-3.5 mb-2 overflow-hidden relative shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500" 
                    style={{ width: `${targetPercentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-primary">{targetPercentage}% Tercapai</span>
                  <span className="text-muted-foreground">{formatRupiah(Math.max(0, monthlyRevenueTarget - statsData.totalRevenue))} Lagi</span>
                </div>
              </div>
              
              <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-xs text-primary flex items-start gap-2">
                <Wallet className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <p>Status: {targetPercentage >= 100 ? "Luar biasa! Target bulan ini telah tercapai 🎉" : "Pendapatan dihitung dari transaksi berstatus Completed."}</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Metrik Bisnis Paket */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 font-bold text-gray-800">
                <Scale className="w-5 h-5 text-secondary" />
                Statistik Paket & Ongkir
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-secondary/15 text-secondary">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Total Berat Diproses</p>
                    <p className="text-sm font-extrabold text-gray-800">{loading ? "..." : `${statsData.totalWeight} Kg`}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Rata-rata Berat / Paket</p>
                    <p className="text-sm font-extrabold text-gray-800">{loading ? "..." : `${statsData.averageWeight} Kg`}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Rata-rata Ongkir / Paket</p>
                    <p className="text-sm font-extrabold text-gray-800">{loading ? "..." : formatRupiah(statsData.averageOngkir)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Tarif Jastip Aktif */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 font-bold text-gray-800">
                <DollarSign className="w-5 h-5 text-blue-500" />
                Tarif Jastip Aktif per Kg
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-3">
                {tarifItems.map((item) => (
                  <div key={item.key} className="bg-gray-50 p-2.5 rounded-xl border border-border/40 flex flex-col justify-between h-20">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                      {item.icon}
                      {item.iconExtra}
                      <span className="truncate">{item.label}</span>
                    </div>
                    <p className="text-xs font-black text-primary mt-1">
                      {tariffsLoading ? "..." : formatRupiah(tariffs[item.key])}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-3 italic">
                *Tarif dikelola oleh Manager melalui Dashboard Admin.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visualisasi Grafik (SVG Charts) Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in-up animation-delay-400">
          {/* Chart 1: Distribusi Tipe Pengiriman (Udara vs Laut) */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-gray-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2 font-bold text-gray-800">
                <Plane className="w-5 h-5 text-primary" />
                Distribusi Jalur Pengiriman (Udara vs Laut)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                  {/* SVG Donut Chart */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {(() => {
                      const udara = statsData.distribution?.tipePengiriman?.udara || 0
                      const laut = statsData.distribution?.tipePengiriman?.laut || 0
                      const total = udara + laut
                      
                      if (total === 0) {
                        return (
                          <>
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                            </svg>
                            <span className="absolute text-xs text-muted-foreground font-semibold">Kosong</span>
                          </>
                        )
                      }
                      
                      const udaraPercent = Math.round((udara / total) * 100)
                      const circumference = 2 * Math.PI * 40 // ~251.2
                      const strokeDasharray = `${(udaraPercent / 100) * circumference} ${circumference}`
                      
                      return (
                        <>
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Laut (background) */}
                            <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="12" fill="transparent" />
                            {/* Udara */}
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              stroke="#1F6F5F" 
                              strokeWidth="12" 
                              fill="transparent" 
                              strokeDasharray={strokeDasharray}
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-black text-gray-800">{total}</span>
                            <span className="text-[10px] text-muted-foreground font-bold">Total Paket</span>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                  
                  {/* Legends */}
                  <div className="flex-1 space-y-4 w-full">
                    {(() => {
                      const udara = statsData.distribution?.tipePengiriman?.udara || 0
                      const laut = statsData.distribution?.tipePengiriman?.laut || 0
                      const total = udara + laut
                      const udaraPercent = total > 0 ? Math.round((udara / total) * 100) : 0
                      const lautPercent = total > 0 ? Math.round((laut / total) * 100) : 0

                      return (
                        <>
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="flex items-center gap-1.5 font-bold text-gray-700">
                                <span className="w-3 h-3 rounded bg-primary"></span>
                                Udara
                              </span>
                              <span className="font-bold text-gray-900">{udara} Paket ({udaraPercent}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${udaraPercent}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="flex items-center gap-1.5 font-bold text-gray-700">
                                <span className="w-3 h-3 rounded bg-blue-500"></span>
                                Laut
                              </span>
                              <span className="font-bold text-gray-900">{laut} Paket ({lautPercent}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${lautPercent}%` }}></div>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chart 2: Visualisasi Status Transaksi Jastip (Donut Chart) */}
          <Card className="border-0 shadow-lg bg-white overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-gray-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2 font-bold text-gray-800">
                <Activity className="w-5 h-5 text-secondary" />
                Visualisasi Status Transaksi Jastip
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                  {/* SVG Donut Chart */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {(() => {
                      const pending = statsData.pendingOrders || 0
                      const ongoing = statsData.ongoingOrders || 0
                      const completed = statsData.completedOrders || 0
                      const total = pending + ongoing + completed
                      
                      if (total === 0) {
                        return (
                          <>
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                            </svg>
                            <span className="absolute text-xs text-muted-foreground font-semibold">Kosong</span>
                          </>
                        )
                      }
                      
                      const pendingPercent = Math.round((pending / total) * 100)
                      const ongoingPercent = Math.round((ongoing / total) * 100)
                      const completedPercent = total > 0 ? (100 - pendingPercent - ongoingPercent) : 0
                      
                      const circumference = 2 * Math.PI * 40 // ~251.3
                      
                      const pendingDash = `${(pendingPercent / 100) * circumference} ${circumference}`
                      const ongoingDash = `${(ongoingPercent / 100) * circumference} ${circumference}`
                      const completedDash = `${(completedPercent / 100) * circumference} ${circumference}`
                      
                      const pendingOffset = 0
                      const ongoingOffset = -((pendingPercent / 100) * circumference)
                      const completedOffset = -(((pendingPercent + ongoingPercent) / 100) * circumference)
                      
                      return (
                        <>
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Completed (Green) */}
                            {completedPercent > 0 && (
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                stroke="#10b981" 
                                strokeWidth="12" 
                                fill="transparent" 
                                strokeDasharray={completedDash}
                                strokeDashoffset={completedOffset}
                                className="transition-all duration-1000 ease-out"
                              />
                            )}
                            {/* Ongoing (Blue) */}
                            {ongoingPercent > 0 && (
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                stroke="#3b82f6" 
                                strokeWidth="12" 
                                fill="transparent" 
                                strokeDasharray={ongoingDash}
                                strokeDashoffset={ongoingOffset}
                                className="transition-all duration-1000 ease-out"
                              />
                            )}
                            {/* Pending (Amber) */}
                            {pendingPercent > 0 && (
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                stroke="#fbbf24" 
                                strokeWidth="12" 
                                fill="transparent" 
                                strokeDasharray={pendingDash}
                                strokeDashoffset={pendingOffset}
                                className="transition-all duration-1000 ease-out"
                              />
                            )}
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-black text-gray-800">{total}</span>
                            <span className="text-[10px] text-muted-foreground font-bold">Transaksi</span>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                  
                  {/* Legends */}
                  <div className="flex-1 space-y-4 w-full">
                    {(() => {
                      const pending = statsData.pendingOrders || 0
                      const ongoing = statsData.ongoingOrders || 0
                      const completed = statsData.completedOrders || 0
                      const total = pending + ongoing + completed
                      const pendingPercent = total > 0 ? Math.round((pending / total) * 100) : 0
                      const ongoingPercent = total > 0 ? Math.round((ongoing / total) * 100) : 0
                      const completedPercent = total > 0 ? (100 - pendingPercent - ongoingPercent) : 0

                      return (
                        <>
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="flex items-center gap-1.5 font-bold text-gray-700">
                                <span className="w-3 h-3 rounded bg-amber-400"></span>
                                Pending
                              </span>
                              <span className="font-bold text-gray-900">{pending} Transaksi ({pendingPercent}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-amber-400 h-2 rounded-full" style={{ width: `${pendingPercent}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="flex items-center gap-1.5 font-bold text-gray-700">
                                <span className="w-3 h-3 rounded bg-blue-500"></span>
                                Ongoing
                              </span>
                              <span className="font-bold text-gray-900">{ongoing} Transaksi ({ongoingPercent}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${ongoingPercent}%` }}></div>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="flex items-center gap-1.5 font-bold text-gray-700">
                                <span className="w-3 h-3 rounded bg-green-500"></span>
                                Completed
                              </span>
                              <span className="font-bold text-gray-900">{completed} Transaksi ({completedPercent}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completedPercent}%` }}></div>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
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
