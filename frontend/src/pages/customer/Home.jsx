import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    quantity: 1,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    console.log("Submitting:", formData)
    navigate("/tracking")
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">TitipHub</h1>
        <p className="text-muted-foreground">Layanan Jastip Lokal Terpercaya. Nitip apa saja jadi lebih mudah.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulir Titipan Barang</CardTitle>
          <CardDescription>Masukkan detail barang yang ingin Anda titipkan untuk dibelikan.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="itemName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nama Barang
              </label>
              <Input 
                id="itemName" 
                placeholder="Contoh: Sepatu Nike Air Max, Kopi Janji Jiwa" 
                required
                value={formData.itemName}
                onChange={(e) => setFormData({...formData, itemName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Deskripsi / Catatan Khusus
              </label>
              <textarea 
                id="description" 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Ukuran, warna, preferensi khusus, atau link referensi barang"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Jumlah
              </label>
              <Input 
                id="quantity" 
                type="number" 
                min="1" 
                required
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Kirim Pesanan Jastip</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
