import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, Loader2, CheckCircle2, Search, Plane, Ship, Zap, Copy, Scale, Banknote, AlertCircle, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"
import api from "../../utils/api"

function formatRupiah(num) {
  if (num === null || num === undefined) return "Rp 0"
  return "Rp " + num.toLocaleString("id-ID")
}

function formatDate(dateString) {
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  } catch (err) {
    return dateString
  }
}

export default function Tracking() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")
  const [copiedId, setCopiedId] = useState(null)

  // Document Title
  useEffect(() => {
    document.title = "Lacak Pesanan | TitipHub"
  }, [])

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders")
        setOrders(res.data?.orders || [])
      } catch (err) {
        console.error(err)
        setError("Gagal memuat daftar pesanan Anda. Silakan coba kembali.")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const statusConfig = {
    Pending: {
      icon: <Clock className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-700",
      barColor: "bg-amber-400",
      label: "Menunggu Diproses",
      description: "Barang terdaftar, menunggu Admin menimbang dan menerbitkan resi TitipHub.",
    },
    "On-going": {
      icon: <Loader2 className="w-5 h-5 animate-spin" />,
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
      description: "Barang telah tiba di TitipHub dan siap diambil! Silakan siapkan ongkir saat pengambilan.",
    },
  }

  const steps = ["Pending", "On-going", "Completed"]
  const getStepIndex = (status) => steps.indexOf(status)

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.resiTitiphub && order.resiTitiphub.toLowerCase().includes(searchQuery.toLowerCase())) ||
      order.resiAsal.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-primary">Lacak Pengiriman</span>
          </h1>
          <p className="text-muted-foreground text-lg">Pantau status pengiriman barang Anda ke TitipHub secara real-time.</p>
        </div>

        {/* Search */}
        <div className="relative mb-8 animate-fade-in-up animation-delay-100">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Cari berdasarkan nama barang atau resi TitipHub..." 
            className="pl-12 h-12 rounded-xl border-border/60 bg-white shadow-sm text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-start gap-3 text-sm animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Error Memuat Data</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Loader Skeleton */}
        {loading ? (
          <div className="grid gap-5">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-md bg-white animate-pulse">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-200" />
                      <div className="space-y-2">
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                  </div>
                  <div className="h-16 bg-gray-100 rounded-xl" />
                  <div className="h-2 bg-gray-200 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-border/40 shadow-sm p-8 flex flex-col items-center gap-4 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-dashed border-gray-200 text-muted-foreground">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Belum ada pesanan</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                {searchQuery ? "Tidak ada pesanan yang cocok dengan pencarian Anda." : "Anda belum mendaftarkan barang titipan apapun."}
              </p>
            </div>
            {!searchQuery && (
              <button 
                onClick={() => navigate("/order")}
                className="mt-2 h-11 px-6 bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl transition-all shadow-md shadow-primary/10"
              >
                Kirim Barang Sekarang
              </button>
            )}
          </div>
        ) : (
          /* Order List */
          <div className="grid gap-5">
            {filteredOrders.map((order, i) => {
              const config = statusConfig[order.status]
              const stepIdx = getStepIndex(order.status)
              return (
                <Card key={order.id} className="overflow-hidden border-0 shadow-md bg-white hover-lift animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
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
                            <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        <Badge className={`${config.color} border-0 px-3 py-1 text-xs font-semibold`}>
                          {config.label}
                        </Badge>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5 bg-gray-50 rounded-xl p-4">
                        <div>
                          <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Resi Asal</p>
                          <p className="text-sm font-medium truncate" title={order.resiAsal}>{order.resiAsal}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Resi TitipHub</p>
                          {order.resiTitiphub ? (
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-bold text-primary">{order.resiTitiphub}</p>
                              <button onClick={() => handleCopy(order.resiTitiphub, order.id)} className="text-muted-foreground hover:text-primary transition-colors" title="Salin resi">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              {copiedId === order.id && (
                                <span className="absolute bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow -mt-6">Tersalin</span>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">Menunggu admin</p>
                          )}
                        </div>
                        <div>
                          <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Jalur</p>
                          <div className="flex items-center gap-1.5">
                            {order.tipePengiriman === "udara" ? <Plane className="w-3.5 h-3.5 text-primary" /> : <Ship className="w-3.5 h-3.5 text-primary" />}
                            <span className="text-sm font-medium capitalize">{order.tipePengiriman}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Kecepatan</p>
                          <div className="flex items-center gap-1.5">
                            {order.kecepatan === "express" ? <Zap className="w-3.5 h-3.5 text-secondary" /> : <Clock className="w-3.5 h-3.5 text-secondary" />}
                            <span className="text-sm font-medium capitalize">{order.kecepatan}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Berat Paket</p>
                          {order.beratKg !== null ? (
                            <div className="flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-sm font-semibold">{order.beratKg} kg</span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">Belum ditimbang</p>
                          )}
                        </div>
                        <div>
                          <p className="text-[11px] uppercase font-semibold text-muted-foreground mb-0.5">Ongkir</p>
                          {order.ongkir !== null ? (
                            <div className="flex items-center gap-1.5">
                              <Banknote className="w-3.5 h-3.5 text-primary" />
                              <span className="text-sm font-bold text-primary">{formatRupiah(order.ongkir)}</span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">—</p>
                          )}
                        </div>
                      </div>

                      {/* Ongkir notice for completed */}
                      {order.status === "Completed" && order.ongkir !== null && (
                        <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-primary shrink-0" />
                          <p className="text-sm">
                            Siapkan biaya ongkir sebesar <span className="font-bold text-primary">{formatRupiah(order.ongkir)}</span> saat pengambilan barang di TitipHub.
                          </p>
                        </div>
                      )}

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
        )}
      </div>
    </div>
  )
}
