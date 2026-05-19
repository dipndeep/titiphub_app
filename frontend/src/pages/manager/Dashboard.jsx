import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Clock, Loader2, CheckCircle2, Search, Filter, Plane, Ship, Zap, Ticket, Scale, Pencil, X, Save } from "lucide-react"

function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID")
}

export default function Dashboard() {
  // Editable tariffs
  const [tarif, setTarif] = useState({
    "Udara-Reguler": 85000,
    "Udara-Express": 100000,
    "Laut-Reguler": 80000,
    "Laut-Express": 95000,
  })

  // Modal state for editing tariffs
  const [showTarifModal, setShowTarifModal] = useState(false)
  const [editTarif, setEditTarif] = useState({ ...tarif })

  const openTarifModal = () => {
    setEditTarif({ ...tarif })
    setShowTarifModal(true)
  }

  const saveTarif = () => {
    setTarif({ ...editTarif })
    setShowTarifModal(false)
  }

  function hitungOngkir(tipePengiriman, kecepatan, beratKg) {
    const key = `${tipePengiriman}-${kecepatan}`
    const rate = tarif[key] || 0
    return rate * beratKg
  }

  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Budi Santoso", itemName: "Sepatu Nike Air Max", resiAsal: "JNE-123456789", tipePengiriman: "Udara", kecepatan: "Express", status: "Pending", resiTitiphub: null, beratKg: null, ongkir: null, date: "18 Mei 2026" },
    { id: "ORD-002", customer: "Siti Rahayu", itemName: "Kopi Kenangan 3 Pack", resiAsal: "SICEPAT-987654321", tipePengiriman: "Laut", kecepatan: "Reguler", status: "On-going", resiTitiphub: "TH-2026-0002", beratKg: 2.5, ongkir: 200000, date: "17 Mei 2026" },
    { id: "ORD-003", customer: "Agus Pratama", itemName: "Buku Tere Liye - Bumi", resiAsal: "JNT-112233445", tipePengiriman: "Udara", kecepatan: "Reguler", status: "On-going", resiTitiphub: "TH-2026-0003", beratKg: 1, ongkir: 85000, date: "16 Mei 2026" },
    { id: "ORD-004", customer: "Rina Melati", itemName: "Skincare Somethinc", resiAsal: "ANTERAJA-556677", tipePengiriman: "Laut", kecepatan: "Express", status: "Completed", resiTitiphub: "TH-2026-0004", beratKg: 0.5, ongkir: 47500, date: "15 Mei 2026" },
  ])

  const [resiInput, setResiInput] = useState({})
  const [beratInput, setBeratInput] = useState({})

  const terimaAndBeriResi = (id) => {
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
    const ongkir = hitungOngkir(order.tipePengiriman, order.kecepatan, berat)

    setOrders(orders.map(o =>
      o.id === id ? { ...o, status: "On-going", resiTitiphub: resi, beratKg: berat, ongkir: ongkir } : o
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
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin <span className="gradient-text">Dashboard</span></h1>
            <p className="text-muted-foreground">Kelola kiriman pelanggan, timbang paket, terbitkan resi, dan perbarui status.</p>
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

        {/* Tarif Info */}
        <div className="mb-6 p-4 bg-primary/5 border border-primary/15 rounded-xl animate-fade-in-up animation-delay-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-primary flex items-center gap-2"><Scale className="w-4 h-4" /> Tarif Ongkir per Kilogram</p>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary rounded-lg" onClick={openTarifModal}>
              <Pencil className="w-3 h-3" /> Edit Tarif
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {tarifItems.map((item) => (
              <div key={item.key} className="bg-white px-3 py-2 rounded-lg border border-border/40 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">{item.icon}{item.iconExtra}{item.label}</div>
                <p className="font-bold text-primary">{formatRupiah(tarif[item.key])}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tarif Edit Modal */}
        {showTarifModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTarifModal(false)}></div>
            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scale-in overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/40">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Scale className="w-5 h-5 text-primary" /> Edit Tarif Ongkir</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Ubah harga tarif per kilogram untuk setiap jalur pengiriman.</p>
                </div>
                <button onClick={() => setShowTarifModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              {/* Body */}
              <div className="p-5 space-y-4">
                {tarifItems.map((item) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 w-36 shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {item.key.startsWith("Udara") ? <Plane className="w-4 h-4 text-primary" /> : <Ship className="w-4 h-4 text-primary" />}
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
                        value={editTarif[item.key]}
                        onChange={(e) => setEditTarif({ ...editTarif, [item.key]: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div className="flex items-center justify-end gap-2 p-5 border-t border-border/40 bg-gray-50/50">
                <Button variant="outline" size="sm" className="rounded-lg h-9 px-4" onClick={() => setShowTarifModal(false)}>
                  Batal
                </Button>
                <Button size="sm" className="rounded-lg h-9 px-4 bg-primary hover:bg-primary/90 gap-1.5" onClick={saveTarif}>
                  <Save className="w-3.5 h-3.5" /> Simpan Tarif
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
                {orders.map((order) => {
                  const config = statusConfig[order.status]
                  const previewOngkir = order.status === "Pending" ? getPreviewOngkir(order) : null
                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-4 py-4">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </td>
                      <td className="px-4 py-4 max-w-[140px] truncate font-medium" title={order.itemName}>{order.itemName}</td>
                      <td className="px-4 py-4">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{order.resiAsal}</code>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
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
                                />
                                <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 shadow-sm gap-1 text-xs" onClick={() => terimaAndBeriResi(order.id)}>
                                  <Ticket className="w-3.5 h-3.5" /> Terbitkan
                                </Button>
                              </div>
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
