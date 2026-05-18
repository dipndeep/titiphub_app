import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, ShoppingBag, CheckCircle, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const stats = [
    { label: "Total Pesanan", value: "156", icon: <ShoppingBag className="w-5 h-5 text-primary" />, change: "+12% dari bulan lalu" },
    { label: "Pesanan Selesai", value: "142", icon: <CheckCircle className="w-5 h-5 text-accent" />, change: "+15% dari bulan lalu" },
    { label: "Total Pengguna", value: "84", icon: <Users className="w-5 h-5 text-secondary" />, change: "+4 pengguna baru" },
    { label: "Pendapatan Kotor", value: "Rp 5.240.000", icon: <TrendingUp className="w-5 h-5 text-blue-500" />, change: "+8% dari bulan lalu" },
  ]

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Master Dashboard (Owner)</h1>
        <p className="text-muted-foreground">Ringkasan performa dan metrik bisnis TitipHub.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <div className="p-2 bg-muted rounded-full">{stat.icon}</div>
              </div>
              <div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Riwayat Transaksi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted rounded-t-md">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Barang</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">ORD-001</td>
                    <td className="px-4 py-3">Budi</td>
                    <td className="px-4 py-3">Sepatu Nike</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">Diproses</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">ORD-002</td>
                    <td className="px-4 py-3">Siti</td>
                    <td className="px-4 py-3">Kopi Janji Jiwa</td>
                    <td className="px-4 py-3 text-accent font-medium">Selesai</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Manager</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">A</div>
                 <div>
                   <p className="text-sm font-medium">Andi (Manager 1)</p>
                   <p className="text-xs text-muted-foreground">Menyelesaikan ORD-002 • 2 jam lalu</p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">R</div>
                 <div>
                   <p className="text-sm font-medium">Rina (Manager 2)</p>
                   <p className="text-xs text-muted-foreground">Menerima pesanan baru • 5 jam lalu</p>
                 </div>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
