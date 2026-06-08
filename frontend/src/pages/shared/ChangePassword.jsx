import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  KeyRound, Eye, EyeOff, Loader2, Save, CheckCircle2, AlertCircle, ShieldCheck, Clock
} from "lucide-react"
import api from "../../utils/api"
import { useAuth } from "../../contexts/AuthContext"
import SidebarLayout from "../../components/layout/SidebarLayout"

export default function ChangePassword() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Set document title
  useEffect(() => {
    document.title = "Ganti Password | TitipHub"
  }, [])

  // Format date helper in Indonesian format
  const formatDate = (dateString) => {
    if (!dateString) return null
    try {
      const normalized = dateString.replace(" ", "T")
      const date = new Date(normalized)
      if (isNaN(date.getTime())) return dateString
      return date.toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    } catch (e) {
      return dateString
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setErrorMessage("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      const msg = "Semua kolom wajib diisi."
      setError(msg)
      setErrorMessage(msg)
      setShowErrorModal(true)
      return
    }

    if (newPassword.length < 6) {
      const msg = "Password baru minimal terdiri dari 6 karakter."
      setError(msg)
      setErrorMessage(msg)
      setShowErrorModal(true)
      return
    }

    if (newPassword !== confirmPassword) {
      const msg = "Konfirmasi password baru tidak cocok."
      setError(msg)
      setErrorMessage(msg)
      setShowErrorModal(true)
      return
    }

    setLoading(true)
    try {
      const res = await api.post("/auth/change-password", {
        currentPassword,
        newPassword
      })

      // Update local storage and context state
      if (res.data?.passwordUpdatedAt) {
        updateUser({ passwordUpdatedAt: res.data.passwordUpdatedAt })
      }

      setSuccess(res.data?.message || "Password Anda berhasil diperbarui!")
      setShowSuccessModal(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.error || "Gagal memperbarui password. Silakan coba lagi."
      setError(msg)
      setErrorMessage(msg)
      setShowErrorModal(true)
    } finally {
      setLoading(false)
    }
  }

  // Determine back navigation link
  const handleBack = () => {
    if (user?.role === "owner") {
      navigate("/owner")
    } else if (user?.role === "manager") {
      navigate("/manager")
    } else {
      navigate("/tracking")
    }
  }

  const isAdmin = user?.role === "owner" || user?.role === "manager"

  const content = (
    <div className={isAdmin 
      ? "py-12 px-4 flex items-center justify-center w-full" 
      : "pt-32 pb-16 px-4 bg-[#EEEEEE] min-h-screen flex items-center justify-center w-full"
    }>
      <div className="max-w-md w-full animate-fade-in-up animate-delay-100">
        {/* Informasi Keamanan Card */}
        <Card className="border-0 shadow-md bg-white overflow-hidden mb-4 animate-fade-in">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-extrabold text-gray-800">Status Keamanan Password</h4>
              <div className="flex flex-col gap-0.5 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  Terakhir diubah: <strong className="text-gray-900">{user?.passwordUpdatedAt ? formatDate(user.passwordUpdatedAt) : "Belum pernah diubah (sejak pendaftaran)"}</strong>
                </span>
                {user?.createdAt && (
                  <span className="text-[10px] text-gray-400">
                    Akun terdaftar sejak: {formatDate(user.createdAt)}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Ganti Password Card */}
        <Card className="border-0 shadow-xl bg-white overflow-hidden">
          <CardHeader className="bg-primary text-white p-6 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-4 -mt-4"></div>
            <CardTitle className="text-xl flex items-center gap-2 font-bold relative z-10">
              <KeyRound className="w-6 h-6 text-accent" />
              Ganti Password Anda
            </CardTitle>
            <p className="text-white/80 text-xs mt-1 relative z-10">
              Amankan akun Anda dengan mengganti password secara berkala.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Notifications */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-2.5 text-sm animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 border border-green-250 text-green-700 text-xs rounded-xl flex items-start gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-green-600" />
                  <span>{success}</span>
                </div>
              )}

              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Password Saat Ini</label>
                <div className="relative">
                  <Input
                    type={showCurrent ? "text" : "password"}
                    className="h-10 rounded-lg text-sm pr-10 border-border/60"
                    placeholder="Masukkan password saat ini..."
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <hr className="border-gray-100 my-2" />

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Password Baru</label>
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    className="h-10 rounded-lg text-sm pr-10 border-border/60"
                    placeholder="Minimal 6 karakter..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Konfirmasi Password Baru</label>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    className="h-10 rounded-lg text-sm pr-10 border-border/60"
                    placeholder="Ulangi password baru..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/95 text-white shadow-md font-bold rounded-xl mt-4 gap-1.5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4.5 h-4.5" /> Ganti Password
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Success Popup Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => {
              setShowSuccessModal(false)
              handleBack()
            }}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center text-gray-900 border border-gray-150 z-10 transform scale-100 transition-all duration-300 animate-in zoom-in-95">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-lg font-extrabold mb-2 text-emerald-700">Berhasil Mengganti Password</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Kata sandi Anda telah berhasil diperbarui. Silakan gunakan password baru ini saat masuk ke akun Anda berikutnya.
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                className="flex-1 h-11 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl transition-all shadow-md shadow-primary/10 text-sm"
                onClick={() => {
                  setShowSuccessModal(false)
                  handleBack()
                }}
              >
                Kembali ke Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowErrorModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center text-gray-900 border border-gray-150 z-10 transform scale-100 transition-all duration-300 animate-in zoom-in-95">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4 animate-bounce">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-lg font-extrabold mb-2 text-red-700">Gagal Mengganti Password</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md shadow-red-500/10 text-sm"
                onClick={() => setShowErrorModal(false)}
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  if (isAdmin) {
    return <SidebarLayout>{content}</SidebarLayout>
  }

  return content
}
