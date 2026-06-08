import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Clock, Loader2, CheckCircle2, Search, Filter, Plane, Ship, Zap, Ticket, Scale, Pencil, X, Save, Banknote, AlertCircle, ExternalLink } from "lucide-react"
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
  const [orders, setOrders] = useState([])
  const [tariffs, setTariffs] = useState({
    "Udara-Reguler": 85000,
    "Udara-Express": 100000,
    "Laut-Reguler": 80000,
    "Laut-Express": 95000,
  })

  const [loading, setLoading] = useState(true)
  const [tariffsLoading, setTariffsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")

  // Modal state for editing tariffs
  const [showTarifModal, setShowTarifModal] = useState(false)
  const [editTarif, setEditTarif] = useState({ ...tariffs })
  const [savingTariffs, setSavingTariffs] = useState(false)

  // Submitting processing states
  const [processingOrderId, setProcessingOrderId] = useState(null)

  const [resiInput, setResiInput] = useState({})
  const [beratInput, setBeratInput] = useState({})

  // Set document title
  useEffect(() => {
    document.title = "Manager Dashboard | TitipHub"
  }, [])

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true)
    setError("")
    try {
      const [ordersRes, tariffsRes] = await Promise.all([
        api.get("/orders"),
        api.get("/tariffs")
      ])
      setOrders(ordersRes.data?.orders || [])
      if (tariffsRes.data?.tariffs) {
        setTariffs(tariffsRes.data.tariffs)
      }
    } catch (err) {
      console.error(err)
      setError("Gagal mengambil data dari server. Pastikan server backend berjalan.")
    } finally {
      setLoading(false)
      setTariffsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openTarifModal = () => {
    setEditTarif({ ...tariffs })
    setShowTarifModal(true)
  }

  const saveTarif = async () => {
    setSavingTariffs(true)
    setError("")
    try {
      const res = await api.put("/tariffs", { tariffs: editTarif })
      setTariffs(res.data?.tariffs || editTarif)
      setShowTarifModal(false)
    } catch (err) {
      console.error(err)
      alert("Gagal memperbarui tarif: " + (err.response?.data?.error || "Error server"))
    } finally {
      setSavingTariffs(false)
    }
  }

  function hitungOngkir(tipePengiriman, kecepatan, beratKg) {
    const key = `${tipePengiriman.charAt(0).toUpperCase() + tipePengiriman.slice(1).toLowerCase()}-${kecepatan.charAt(0).toUpperCase() + kecepatan.slice(1).toLowerCase()}`
    const rate = tariffs[key] || tariffs[`${tipePengiriman}-${kecepatan}`] || 0
    return rate * beratKg
  }

  const terimaAndBeriResi = async (id) => {
    const resi = resiInput[id]
    const berat = parseFloat(beratInput[id])
    if (!resi || resi.trim() === "") {
      alert("Masukkan resi TitipHub terlebih dahulu!")
      return
    }
    if (!berat || berat <= 0) {
      alert("Masukkan berat paket yang valid (dalam kg)!")
      return
    }

    const order = orders.find(o => o.id === id)
    if (!order) return

    const ongkir = hitungOngkir(order.tipePengiriman, order.kecepatan, berat)

    setProcessingOrderId(id)
    setError("")
    try {
      const res = await api.patch(`/orders/${id}/process`, {
        resiTitiphub: resi,
        beratKg: berat,
        ongkir: ongkir
      })

      // Update local state
      setOrders(orders.map(o => o.id === id ? { ...o, ...res.data.order } : o))
    } catch (err) {
      console.error(err)
      alert("Gagal memproses pesanan: " + (err.response?.data?.error || "Error server"))
    } finally {
      setProcessingOrderId(null)
    }
  }

  const completeOrder = async (id) => {
    setProcessingOrderId(id)
    setError("")
    try {
      const res = await api.patch(`/orders/${id}/complete`)
      setOrders(orders.map(o => o.id === id ? { ...o, ...res.data.order } : o))
    } catch (err) {
      console.error(err)
      alert("Gagal menyelesaikan pesanan: " + (err.response?.data?.error || "Error server"))
    } finally {
      setProcessingOrderId(null)
    }
  }

  const statusConfig = {
    Pending: { color: "bg-amber-100 text-amber-700", label: "Pending" },
    "On-going": { color: "bg-blue-100 text-blue-700", label: "On-going" },
    Completed: { color: "bg-green-100 text-green-700", label: "Completed" },
  }

  // Live filter orders
  const filteredOrders = orders.filter(o => 
    o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.itemName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.resiAsal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.resiTitiphub && o.resiTitiphub.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const stats = [
    { label: "Kiriman Baru", value: orders.filter(o => o.status === "Pending").length, icon: <Clock className="w-5 h-5 text-amber-500" />, color: "bg-amber-50" },
    { label: "Sedang Diproses", value: orders.filter(o => o.status === "On-going").length, icon: <Loader2 className="w-5 h-5 text-blue-500" />, color: "bg-blue-50" },
    { label: "Selesai", value: orders.filter(o => o.status === "Completed").length, icon: <CheckCircle2 className="w-5 h-5 text-accent" />, color: "bg-accent/10" },
    { label: "Total Pesanan", value: orders.length, icon: <Package className="w-5 h-5 text-primary" />, color: "bg-primary/10" },
  ]

  // Preview ongkir for pending orders
  const getPreviewOngkir = (order) => {
    const berat = parseFloat(beratInput[order.id])
    if (!berat || berat <= 0) return null
    return hitungOngkir(order.tipePengiriman, order.kecepatan, berat)
  }

  // Tariff display config
  const tarifItems = [
    { key: "Udara-Reguler", label: "Udara Reguler", icon: <Plane className="w-3 h-3" />, iconExtra: null },
    { key: "Udara-Express", label: "Udara Express", icon: <Plane className="w-3 h-3" />, iconExtra: <Zap className="w-3 h-3" /> },
    { key: "Laut-Reguler", label: "Laut Reguler", icon: <Ship className="w-3 h-3" />, iconExtra: null },
    { key: "Laut-Express", label: "Laut Express", icon: <Ship className="w-3 h-3" />, iconExtra: <Zap className="w-3 h-3" /> },
  ]

  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl text-primary font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Kelola kiriman pelanggan, timbang paket, terbitkan resi, dan perbarui status.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Cari pesanan..." 
                className="pl-9 h-10 w-[200px] lg:w-[250px] rounded-lg border-border/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-lg h-10 w-10 border-border/60" onClick={fetchData}>
              <Loader2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3 text-sm animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Kesalahan Pengambilan Data</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Tarif Info */}
        <div className="mb-6 p-4 bg-primary/5 border border-primary/15 rounded-xl animate-fade-in-up animation-delay-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-primary flex items-center gap-2"><Scale className="w-4 h-4" /> Tarif Ongkir per Kilogram</p>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary rounded-lg" onClick={openTarifModal} disabled={tariffsLoading}>
              <Pencil className="w-3 h-3" /> Edit Tarif
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {tarifItems.map((item) => (
              <div key={item.key} className="bg-white px-3 py-2 rounded-lg border border-border/40 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">{item.icon}{item.iconExtra}{item.label}</div>
                <p className="font-bold text-primary">
                  {tariffsLoading ? "..." : formatRupiah(tariffs[item.key])}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tarif Edit Modal */}
        {showTarifModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !savingTariffs && setShowTarifModal(false)}></div>
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scale-in overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/40">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Scale className="w-5 h-5 text-primary" /> Edit Tarif Ongkir</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Ubah harga tarif per kilogram untuk setiap jalur pengiriman.</p>
                </div>
                <button onClick={() => !savingTariffs && setShowTarifModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              {/* Body */}
              <div className="p-5 space-y-4">
                {tarifItems.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 w-36 shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {item.key.toLowerCase().startsWith("udara") ? <Plane className="w-4 h-4 text-primary" /> : <Ship className="w-4 h-4 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground">per kilogram</p>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-semibold">Rp</span>
                      <Input
                        type="number"
                        min="0"
                        step="1000"
                        className="pl-9 h-10 rounded-lg text-sm font-semibold border-border/60 focus:border-primary focus:ring-primary/20"
                        value={editTarif[item.key] || ""}
                        onChange={(e) => setEditTarif({ ...editTarif, [item.key]: parseInt(e.target.value) || 0 })}
                        disabled={savingTariffs}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end gap-2 p-5 border-t border-border/40 bg-gray-50/50">
                <Button variant="outline" size="sm" className="rounded-lg h-9 px-4" onClick={() => setShowTarifModal(false)} disabled={savingTariffs}>
                  Batal
                </Button>
                <Button size="sm" className="rounded-lg h-9 px-4 bg-primary hover:bg-primary/90 gap-1.5" onClick={saveTarif} disabled={savingTariffs}>
                  {savingTariffs ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Simpan Tarif
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-0 shadow-sm animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
              <CardContent className={`p-4 flex items-center gap-4 ${stat.color} bg-opacity-50`}>
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold">{loading ? "..." : stat.value}</p>
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
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground font-medium">Memuat daftar kiriman...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="py-20 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-base font-bold text-gray-900">Tidak ada kiriman</p>
                <p className="text-xs text-muted-foreground mt-1">Belum ada kiriman terdaftar atau cocok dengan pencarian.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-gray-50/80">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Pelanggan</th>
                    <th className="px-4 py-4 font-semibold">Barang</th>
                    <th className="px-4 py-4 font-semibold">Resi Asal</th>
                    <th className="px-4 py-4 font-semibold">Jalur / Kecepatan</th>
                    <th className="px-4 py-4 font-semibold">Berat / Ongkir</th>
                    <th className="px-4 py-4 font-semibold">Resi TitipHub</th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="px-4 py-4 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredOrders.map((order) => {
                    const config = statusConfig[order.status]
                    const previewOngkir = order.status === "Pending" ? getPreviewOngkir(order) : null
                    const isProcessing = processingOrderId === order.id

                    return (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-4 py-4">
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString('id-ID') : '—'}
                          </p>
                        </td>
                        <td className="px-4 py-4 max-w-[140px] truncate font-medium" title={order.itemName}>{order.itemName}</td>
                        <td className="px-4 py-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{order.resiAsal}</code>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                              {order.tipePengiriman.toLowerCase() === "udara" ? <Plane className="w-3 h-3" /> : <Ship className="w-3 h-3" />}
                              <span className="capitalize">{order.tipePengiriman}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">
                              {order.kecepatan.toLowerCase() === "express" ? <Zap className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              <span className="capitalize">{order.kecepatan}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {order.beratKg !== null ? (
                            <div>
                              <p className="text-sm font-semibold flex items-center gap-1"><Scale className="w-3.5 h-3.5 text-muted-foreground" /> {order.beratKg} kg</p>
                              <p className="text-xs font-bold text-primary">{formatRupiah(order.ongkir)}</p>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Belum ditimbang</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {order.resiTitiphub ? (
                            <code className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono font-bold">{order.resiTitiphub}</code>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">Belum diterbitkan</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <Badge className={`${config.color} border-0 px-2.5 py-0.5 rounded-md font-semibold`}>
                            {config.label}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col items-end gap-2">
                            {order.status === "Pending" && (
                              <div className="flex flex-col items-end gap-2">
                                {/* Berat input + auto ongkir */}
                                <div className="flex items-center gap-2">
                                  <div className="relative">
                                    <Scale className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="0.1"
                                      placeholder="Berat (kg)"
                                      className="h-8 w-[140px] text-xs rounded-md border-border/60 pl-8"
                                      value={beratInput[order.id] || ""}
                                      onChange={(e) => setBeratInput({ ...beratInput, [order.id]: e.target.value })}
                                      disabled={isProcessing}
                                    />
                                  </div>
                                </div>
                                {previewOngkir !== null && (
                                  <p className="text-xs text-right">
                                    Ongkir: <span className="font-bold text-primary">{formatRupiah(previewOngkir)}</span>
                                  </p>
                                )}
                                {/* Resi input */}
                                <div className="flex items-center gap-2">
                                  <Input
                                    placeholder="Resi TitipHub..."
                                    className="h-8 w-[120px] text-xs rounded-md border-border/60"
                                    value={resiInput[order.id] || ""}
                                    onChange={(e) => setResiInput({ ...resiInput, [order.id]: e.target.value })}
                                    disabled={isProcessing}
                                  />
                                  <Button 
                                    size="sm" 
                                    className="h-8 bg-primary hover:bg-primary/90 shadow-sm gap-1 text-xs" 
                                    onClick={() => terimaAndBeriResi(order.id)}
                                    disabled={isProcessing}
                                  >
                                    {isProcessing ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <>
                                        <Ticket className="w-3.5 h-3.5" /> Terbitkan
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                            {order.status === "On-going" && (
                              <Button 
                                size="sm" 
                                className="h-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm gap-1" 
                                onClick={() => completeOrder(order.id)}
                                disabled={isProcessing}
                              >
                                {isProcessing ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Barang Tiba
                                  </>
                                )}
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
            )}
          </div>
        </Card>


      </div>
    </div>
  )
}
