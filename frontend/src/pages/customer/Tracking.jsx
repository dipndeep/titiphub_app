import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, ShoppingCart, Truck, CheckCircle2 } from "lucide-react"

export default function Tracking() {
  // Mock data for demonstration
  const orders = [
    { id: "ORD-001", itemName: "Sepatu Nike Air Max", status: "Diproses", date: "2026-05-18" },
    { id: "ORD-002", itemName: "Kopi Janji Jiwa", status: "Selesai", date: "2026-05-17" },
    { id: "ORD-003", itemName: "Buku Tere Liye", status: "Pending", date: "2026-05-18" },
  ]

  const getStatusIcon = (status) => {
    switch(status) {
      case "Pending": return <Clock className="w-5 h-5 text-muted-foreground" />;
      case "Diproses": return <ShoppingCart className="w-5 h-5 text-blue-500" />;
      case "Dikirim": return <Truck className="w-5 h-5 text-secondary" />;
      case "Selesai": return <CheckCircle2 className="w-5 h-5 text-accent" />;
      default: return <Package className="w-5 h-5" />;
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case "Pending": return <Badge variant="outline">Pending</Badge>;
      case "Diproses": return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Diproses</Badge>;
      case "Dikirim": return <Badge variant="secondary">Dikirim</Badge>;
      case "Selesai": return <Badge variant="accent">Selesai</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Lacak Pesanan Anda</h1>
        <p className="text-muted-foreground">Pantau status pesanan jastip Anda secara real-time.</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="p-3 bg-muted rounded-full">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{order.itemName}</h3>
                    <p className="text-sm text-muted-foreground">ID: {order.id} • {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-foreground">Status Saat Ini</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
              </div>
              
              {/* Progress Bar representation */}
              <div className="bg-muted h-2 w-full">
                <div 
                  className={`h-full ${order.status === 'Selesai' ? 'bg-accent w-full' : order.status === 'Diproses' ? 'bg-blue-500 w-1/2' : order.status === 'Dikirim' ? 'bg-secondary w-3/4' : 'bg-transparent w-0'}`}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
