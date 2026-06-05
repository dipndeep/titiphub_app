import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { X, ChevronRight, PackageOpen } from "lucide-react"
import api from "../utils/api"

export default function NotificationListener() {
  const { user } = useAuth()
  const [completedOrders, setCompletedOrders] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Only run for customer
    if (!user || user.role !== "customer") {
      setCompletedOrders([])
      setShowNotification(false)
      return
    }

    const checkCompletedOrders = async () => {
      try {
        const res = await api.get("/orders")
        const allOrders = res.data?.orders || []
        const completed = allOrders.filter(order => order.status === "Completed")
        
        // Get already dismissed order IDs in this session
        const dismissedIdsStr = sessionStorage.getItem("titiphub_dismissed_order_ids")
        const dismissedIds = dismissedIdsStr ? JSON.parse(dismissedIdsStr) : []
        
        // Check if there are completed orders that have NOT been dismissed yet
        const newCompleted = completed.filter(order => !dismissedIds.includes(order.id))
        
        if (newCompleted.length > 0) {
          setCompletedOrders(newCompleted)
          setShowNotification(true)
        } else {
          // If all completed orders have been dismissed, hide the notification
          setShowNotification(false)
        }
      } catch (err) {
        console.error("Gagal mengecek barang selesai untuk notifikasi:", err)
      }
    }

    // Check immediately on access
    checkCompletedOrders()

    // Poll every 15 seconds to fetch new completed orders live!
    const interval = setInterval(checkCompletedOrders, 15000)

    return () => clearInterval(interval)
  }, [user])

  const handleDismiss = () => {
    setShowNotification(false)
    
    // Save all currently displayed completed order IDs as dismissed in session storage
    const currentCompletedIds = completedOrders.map(o => o.id)
    const dismissedIdsStr = sessionStorage.getItem("titiphub_dismissed_order_ids")
    const dismissedIds = dismissedIdsStr ? JSON.parse(dismissedIdsStr) : []
    
    const updatedDismissed = Array.from(new Set([...dismissedIds, ...currentCompletedIds]))
    sessionStorage.setItem("titiphub_dismissed_order_ids", JSON.stringify(updatedDismissed))
  }

  const handleGoToTracking = () => {
    handleDismiss()
  }

  if (!showNotification || completedOrders.length === 0) return null

  const firstItemName = completedOrders[0].itemName
  const otherItemsCount = completedOrders.length - 1

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-md w-full mx-4 sm:mx-0 animate-slide-in-right">
      <div className="bg-white/95 backdrop-blur-xl border border-accent/20 rounded-2xl shadow-2xl p-5 flex gap-4 items-start relative overflow-hidden group">
        {/* Shimmer line indicator at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent/80"></div>
        
        {/* Pulsing indicator */}
        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-accent animate-ping"></div>

        {/* Icon container */}
        <div className="p-3 rounded-xl bg-accent/10 text-primary shrink-0">
          <PackageOpen className="w-7 h-7 animate-pulse" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <h4 className="font-bold text-base text-gray-900 flex items-center gap-1.5 mb-1.5">
            Paket Sudah Tiba! 🎉
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Barang <span className="font-bold text-gray-900">"{firstItemName}"</span>
            {otherItemsCount > 0 ? ` dan ${otherItemsCount} barang lainnya` : ""} sudah tiba di TitipHub dan siap diambil.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <Link 
              to="/tracking" 
              onClick={handleGoToTracking}
              className="text-sm font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
            >
              Lacak & Ambil <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={handleDismiss} 
          className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100/80 absolute top-3.5 right-3.5"
          aria-label="Tutup"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  )
}
