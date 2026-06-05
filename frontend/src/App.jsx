import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/layout/Navbar"
import NotificationListener from "./components/NotificationListener"
import LandingPage from "./pages/LandingPage"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import CustomerOrder from "./pages/customer/Home"
import CustomerTracking from "./pages/customer/Tracking"
import ManagerDashboard from "./pages/manager/Dashboard"
import OwnerDashboard from "./pages/owner/Dashboard"
import UsersList from "./pages/shared/UsersList"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background font-sans text-foreground">
          <Navbar />
          <NotificationListener />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/order"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager"
              element={
                <ProtectedRoute allowedRoles={["manager"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["manager", "owner"]}>
                  <UsersList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
