import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [orders, setOrders] = useState([
    { id: "ORD-001", customer: "Budi", itemName: "Sepatu Nike Air Max", status: "Pending", date: "2026-05-18" },
    { id: "ORD-002", customer: "Siti", itemName: "Kopi Janji Jiwa", status: "Diproses", date: "2026-05-17" },
    { id: "ORD-003", customer: "Agus", itemName: "Buku Tere Liye", status: "Dikirim", date: "2026-05-16" },
  ])

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case "Pending": return <Badge variant="outline">Pending</Badge>;
      case "Diproses": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Diproses</Badge>;
      case "Dikirim": return <Badge variant="secondary">Dikirim</Badge>;
      case "Selesai": return <Badge variant="accent">Selesai</Badge>;
      case "Batal": return <Badge variant="destructive">Batal</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Manager Dashboard</h1>
          <p className="text-muted-foreground">Kelola pesanan jastip dan perbarui status.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesanan Jastip</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted rounded-t-md">
                <tr>
                  <th className="px-4 py-3 rounded-tl-md">ID Pesanan</th>
                  <th className="px-4 py-3">Pelanggan</th>
                  <th className="px-4 py-3">Barang</th>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-tr-md">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">{order.itemName}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                      {order.status === "Pending" && (
                        <>
                          <Button size="sm" onClick={() => updateStatus(order.id, "Diproses")}>Terima</Button>
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(order.id, "Batal")}>Tolak</Button>
                        </>
                      )}
                      {order.status === "Diproses" && (
                        <Button size="sm" variant="secondary" onClick={() => updateStatus(order.id, "Dikirim")}>Kirim Barang</Button>
                      )}
                      {order.status === "Dikirim" && (
                        <Button size="sm" variant="accent" onClick={() => updateStatus(order.id, "Selesai")}>Selesaikan</Button>
                      )}
                      {order.status === "Selesai" && (
                         <span className="text-xs text-muted-foreground">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
