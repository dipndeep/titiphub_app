import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import SignIn from "./pages/auth/SignIn"
import SignUp from "./pages/auth/SignUp"
import CustomerHome from "./pages/customer/Home"
import CustomerTracking from "./pages/customer/Tracking"
import ManagerDashboard from "./pages/manager/Dashboard"
import OwnerDashboard from "./pages/owner/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Navbar />
        <main>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<CustomerHome />} />
            <Route path="/tracking" element={<CustomerTracking />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/owner" element={<OwnerDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
