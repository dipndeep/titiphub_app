import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Search, MessageSquare, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import api from "../../utils/api"

function formatWhatsAppLink(phone) {
  if (!phone) return null
  let clean = phone.replace(/\D/g, "")
  if (clean.startsWith("0")) {
    clean = "62" + clean.slice(1)
  }
  return `https://wa.me/${clean}`
}

export default function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")

  // Set document title
  useEffect(() => {
    document.title = "Daftar Pengguna | TitipHub"
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await api.get("/auth/users")
      setUsers(res.data?.users || [])
    } catch (err) {
      console.error(err)
      setError("Gagal mengambil daftar pengguna. Pastikan server backend Anda aktif.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filter list
  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.phone && u.phone.includes(searchQuery))
  )

  // Metrics
  const totalUsers = users.length
  const totalCustomers = users.filter(u => u.role === "customer").length
  const totalManagers = users.filter(u => u.role === "manager").length
  const totalOwners = users.filter(u => u.role === "owner").length

  return (
    <div className="pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl text-primary font-bold mb-2">Daftar Pengguna</h1>
            <p className="text-muted-foreground">Lihat dan hubungi akun manager, owner, dan customer yang terdaftar di TitipHub.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Cari berdasarkan nama, email, atau WhatsApp..." 
                className="pl-9 h-10 w-full rounded-xl border-border/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 border-border/60 shrink-0" onClick={fetchUsers} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Pengguna</p>
                <p className="text-2xl font-bold mt-1">{loading ? "..." : totalUsers}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50 border">
                <Users className="w-5 h-5 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-primary/5 border-primary/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-primary font-medium">Customer</p>
                <p className="text-2xl font-bold mt-1 text-primary">{loading ? "..." : totalCustomers}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white shadow-sm">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-secondary/5 border-secondary/10">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-secondary font-medium">Manager (Admin)</p>
                <p className="text-2xl font-bold mt-1 text-secondary">{loading ? "..." : totalManagers}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white shadow-sm">
                <Users className="w-5 h-5 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-red-50 border-red-100">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-red-600 font-medium">Owner</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{loading ? "..." : totalOwners}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white shadow-sm">
                <Users className="w-5 h-5 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table Card */}
        <Card className="border-0 shadow-xl bg-white overflow-hidden animate-fade-in-up animation-delay-200">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground font-medium">Memuat daftar pengguna...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-base font-bold text-gray-900">Tidak Ada Pengguna</p>
                <p className="text-xs mt-1">Tidak ada akun yang cocok dengan pencarian Anda.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-gray-50/80">
                  <tr className="border-b border-border/40">
                    <th className="px-6 py-4 font-semibold">Nama Pengguna</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Nomor WhatsApp</th>
                    <th className="px-6 py-4 font-semibold">Peran</th>
                    <th className="px-6 py-4 font-semibold">Tanggal Terdaftar</th>
                    <th className="px-6 py-4 font-semibold text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredUsers.map((item) => {
                    const waLink = formatWhatsAppLink(item.phone)
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{item.email}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono">
                          {item.phone || <span className="text-xs text-muted-foreground italic">—</span>}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`border-0 px-2.5 py-0.5 rounded-md font-semibold text-xs capitalize ${
                            item.role === "owner" ? "bg-red-500/10 text-red-500" :
                            item.role === "manager" ? "bg-secondary/10 text-secondary" :
                            "bg-primary/10 text-primary"
                          }`}>
                            {item.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {waLink ? (
                            <a 
                              href={waLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700 hover:underline transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" /> Hubungi WA
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">No WA tidak ada</span>
                          )}
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
