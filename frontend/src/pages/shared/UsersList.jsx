import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, Search, MessageSquare, Loader2, AlertCircle, RefreshCw, KeyRound, X, Save, CheckCircle2 } from "lucide-react"
import api from "../../utils/api"
import { useAuth } from "../../contexts/AuthContext"

function formatWhatsAppLink(phone) {
  if (!phone) return null
  let clean = phone.replace(/\D/g, "")
  if (clean.startsWith("0")) {
    clean = "62" + clean.slice(1)
  }
  return `https://wa.me/${clean}`
}

export default function UsersList() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")

  // Reset Password Modal State
  const [showResetModal, setShowResetModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newPassword, setNewPassword] = useState("titiphub123")
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccessMessage, setResetSuccessMessage] = useState("")
  const [resetErrorMessage, setResetErrorMessage] = useState("")

  const canReset = (targetUser) => {
    if (!currentUser) return false
    // Cannot reset own password from this panel
    if (currentUser.id === targetUser.id) return false
    // Manager cannot reset Owner password
    if (currentUser.role === "manager" && targetUser.role === "owner") return false
    return true
  }

  const handleOpenResetModal = (targetUser) => {
    setSelectedUser(targetUser)
    setNewPassword("titiphub123")
    setResetSuccessMessage("")
    setResetErrorMessage("")
    setShowResetModal(true)
  }

  const handleResetPassword = async () => {
    if (!selectedUser) return
    setResetLoading(true)
    setResetSuccessMessage("")
    setResetErrorMessage("")
    try {
      const res = await api.patch(`/auth/users/${selectedUser.id}/reset-password`, {
        newPassword
      })
      setResetSuccessMessage(res.data?.message || "Password berhasil direset.")
      // Update local state to clear resetRequested flag
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, resetRequested: false } : u))
    } catch (err) {
      console.error(err)
      setResetErrorMessage(err.response?.data?.error || "Gagal mereset password.")
    } finally {
      setResetLoading(false)
    }
  }

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
    <div className="pb-16">
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
                          <div className="flex justify-end items-center gap-3">
                            {waLink ? (
                              <a 
                                href={waLink} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 hover:underline transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" /> Hubungi WA
                              </a>
                            ) : (
                              <span className="text-xs text-muted-foreground italic mr-2">No WA tidak ada</span>
                            )}
                            
                            {canReset(item) && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-[11px] font-bold gap-1 border-primary/20 text-primary hover:bg-primary/10 hover:text-primary rounded-lg shrink-0 relative"
                                onClick={() => handleOpenResetModal(item)}
                              >
                                <KeyRound className="w-3.5 h-3.5" /> Reset
                                {item.resetRequested && (
                                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                  </span>
                                )}
                              </Button>
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

      {/* Reset Password Modal */}
      {showResetModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !resetLoading && setShowResetModal(false)}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto animate-in zoom-in-95 duration-200 overflow-hidden text-gray-900 text-left">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/40">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-primary" />
                  Reset Password
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Reset kata sandi pengguna TitipHub.</p>
              </div>
              <button 
                onClick={() => !resetLoading && setShowResetModal(false)} 
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={resetLoading}
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              {/* User info summary */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-border/40 text-sm space-y-1.5">
                <p className="flex justify-between"><span className="text-muted-foreground">Nama:</span> <strong className="text-gray-800">{selectedUser.name}</strong></p>
                <p className="flex justify-between"><span className="text-muted-foreground">Email:</span> <strong className="text-gray-800">{selectedUser.email}</strong></p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Role:</span> 
                  <Badge className="border-0 px-2 py-0.5 rounded-md font-semibold text-xs capitalize bg-primary/10 text-primary">
                    {selectedUser.role}
                  </Badge>
                </p>
              </div>

              {resetSuccessMessage ? (
                <div className="bg-green-50 border border-green-150 p-4 rounded-xl text-green-700 text-sm space-y-2">
                  <p className="font-bold flex items-center gap-1.5 text-green-800">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Password Berhasil Direset!
                  </p>
                  <p className="text-xs text-green-700">{resetSuccessMessage}</p>
                  <div className="bg-white p-2.5 rounded-lg border font-mono font-bold text-center text-primary text-base select-all cursor-pointer" title="Klik untuk menyeleksi">
                    {newPassword}
                  </div>
                  <p className="text-[10px] text-green-600/80 italic text-center">
                    Salin password di atas dan berikan kepada pengguna agar mereka bisa masuk kembali.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resetErrorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{resetErrorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Password Baru</label>
                    <Input
                      type="text"
                      className="h-10 rounded-lg text-sm font-semibold border-border/60"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={resetLoading}
                      placeholder="Masukkan password baru..."
                    />
                    <div className="flex gap-1.5 mt-2">
                      <button
                        type="button"
                        onClick={() => setNewPassword("titiphub123")}
                        className="text-[10px] font-bold text-primary bg-primary/10 hover:bg-primary/15 px-2.5 py-1 rounded"
                        disabled={resetLoading}
                      >
                        Default (titiphub123)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#"
                          let pass = ""
                          for (let i = 0; i < 8; i++) {
                            pass += chars.charAt(Math.floor(Math.random() * chars.length))
                          }
                          setNewPassword(pass)
                        }}
                        className="text-[10px] font-bold text-secondary bg-secondary/10 hover:bg-secondary/15 px-2.5 py-1 rounded"
                        disabled={resetLoading}
                      >
                        Acak (8 Karakter)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 p-5 border-t border-border/40 bg-gray-50/50">
              {resetSuccessMessage ? (
                <Button 
                  className="rounded-lg h-9 px-4 bg-primary hover:bg-primary/95 text-white" 
                  onClick={() => setShowResetModal(false)}
                >
                  Tutup
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-lg h-9 px-4 border-border/60" 
                    onClick={() => setShowResetModal(false)} 
                    disabled={resetLoading}
                  >
                    Batal
                  </Button>
                  <Button 
                    size="sm" 
                    className="rounded-lg h-9 px-4 bg-primary hover:bg-primary/95 text-white gap-1.5" 
                    onClick={handleResetPassword} 
                    disabled={resetLoading || newPassword.length < 6}
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Mengubah...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" /> Simpan Password
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
