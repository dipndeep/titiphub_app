import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Package, ArrowRight, ShieldCheck, Truck, Clock, Star, ChevronRight, Users, BarChart3, Plane, Ship, Banknote, CheckCircle2, Store, Drone, Loader2, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const features = [
    {
      icon: <Package className="w-7 h-7" />,
      title: "Titip Mudah",
      desc: "Cukup isi form, pilih barang, dan kami yang belikan untuk Anda.",
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: "Tracking Real-time",
      desc: "Pantau status pesanan Anda dari awal hingga barang sampai di tangan.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Aman & Terpercaya",
      desc: "Sistem transparan dengan manajemen pesanan yang terstruktur rapi.",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Cepat & Responsif",
      desc: "Proses jastip cepat dengan notifikasi update status secara langsung.",
    },
  ]

  const steps = [
    { num: "01", title: "Buat Pesanan", desc: "Isi formulir titipan dengan detail barang yang Anda inginkan." },
    { num: "02", title: "Manager Proses", desc: "Tim kami menerima dan membelikan barang sesuai pesanan Anda." },
    { num: "03", title: "Barang Dikirim", desc: "Barang siap dikirim atau diambil di lokasi yang disepakati." },
    { num: "04", title: "Selesai!", desc: "Terima barang dan nikmati kemudahan jastip bersama TitipHub." },
  ]

  const testimonials = [
    { name: "Budi Santoso", role: "Customer", text: "TitipHub sangat membantu! Saya tidak perlu lagi repot mencari barang sendiri. Tinggal pesan dan tunggu diantar.", rating: 5 },
    { name: "Siti Rahayu", role: "Customer", text: "Tracking pesanannya real-time, jadi saya selalu tahu sampai mana proses pesanan saya. Sangat transparan!", rating: 5 },
    { name: "Agus Pratama", role: "Customer", text: "Sudah 3 kali pakai jasa TitipHub, selalu puas. Barang sesuai dan prosesnya cepat banget.", rating: 4 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="gradient-hero relative pt-32 pb-40 lg:pt-40 lg:pb-48">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl animate-float animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.03] blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/10">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Platform Jasa Titip #1 Lokal
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up animation-delay-100 text-shadow">
                Nitip Barang Jadi
                <span className="block text-accent mt-2">Lebih Mudah.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed animate-fade-in-up animation-delay-200">
                TitipHub menyediakan layanan jasa titip lokal yang transparan, cepat, dan terpercaya. Pesan, pantau, dan terima barang — semua dalam satu platform.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
                <Link to="/signup">
                  <Button size="lg" className="bg-accent text-gray-900 hover:bg-accent/90 h-12 px-8 text-base font-bold rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
                    Mulai Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button size="lg" className="bg-transparent h-12 px-8 text-base font-semibold rounded-xl border border-white/40 text-white hover:bg-white/10 hover:text-white transition-all duration-300">
                    Masuk Akun
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 animate-fade-in-up animation-delay-400">
                <div>
                  <p className="text-3xl font-bold text-accent">500+</p>
                  <p className="text-sm text-white/60">Pesanan Selesai</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">98%</p>
                  <p className="text-sm text-white/60">Tingkat Kepuasan</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">24 Jam</p>
                  <p className="text-sm text-white/60">Rata-rata Proses</p>
                </div>
              </div>
            </div>

            {/* Hero Visual (Floating UI Elements - Compact) */}
            <div className="hidden lg:flex justify-center items-center relative w-full h-[400px] animate-fade-in-up animation-delay-300">
              {/* Center Glow */}
              <div className="absolute w-[240px] h-[240px] rounded-full bg-accent/20 blur-[60px] animate-pulse-glow"></div>
              <div className="absolute w-[160px] h-[160px] rounded-full bg-primary/20 blur-[40px] animate-pulse-glow animation-delay-300"></div>

              {/* Center Core Element */}
              <div className="relative z-10 w-24 h-24 glass rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl animate-float">
                <img src="/titiphub-icon.png" alt="TitipHub Logo" className="w-12 h-12 object-contain" />
              </div>

              {/* Floating Element 1: Udara Express (Top Right) */}
              <div className="absolute top-12 right-12 z-20 animate-float animation-delay-100 hover-lift scale-90 origin-bottom-left">
                <div className="bg-white px-3 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plane className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-[13px]">Udara Express</p>
                    <p className="text-gray-500 text-[10px]">Estimasi 3-5 hari</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2: Laut Reguler (Bottom Left) */}
              <div className="absolute bottom-12 left-10 z-20 animate-float animation-delay-400 hover-lift scale-90 origin-top-right">
                <div className="bg-white px-3 py-2.5 rounded-xl flex items-center gap-2.5 shadow-xl">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Ship className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-[13px]">Laut Reguler</p>
                    <p className="text-gray-500 text-[10px]">Tarif Hemat</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 3: Order Completed (Top Left) */}
              <div className="absolute top-20 left-16 z-20 animate-float animation-delay-200 hover-lift scale-90 origin-bottom-right">
                <div className="bg-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xl">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <p className="text-gray-800 font-bold text-[11px]">Pesanan Tiba</p>
                </div>
              </div>

              {/* Floating Element 4: Ongkir (Bottom Right) */}
              <div className="absolute bottom-24 right-10 z-20 animate-float animation-delay-500 hover-lift scale-90 origin-top-left">
                <div className="bg-white px-3 py-2.5 rounded-xl flex flex-col gap-0.5 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Banknote className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase">Mulai Dari</span>
                  </div>
                  <p className="text-gray-900 font-extrabold text-base">Rp 80.000<span className="text-[10px] text-gray-500 font-normal">/kg</span></p>
                </div>
              </div>

              {/* Decorative Lines/Dots connecting elements */}
              <svg className="absolute inset-0 w-full h-full opacity-30 z-0 pointer-events-none" viewBox="0 0 500 400">
                <circle cx="250" cy="200" r="110" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_60s_linear_infinite]" />
                <circle cx="250" cy="200" r="160" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2 6" className="animate-[spin_40s_linear_infinite_reverse]" />
              </svg>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-[-1px] left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Fitur Unggulan</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Kenapa Harus <span className="gradient-text">TitipHub</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Platform jasa titip yang dirancang untuk memberikan pengalaman terbaik bagi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bento 1: Titip Mudah */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 overflow-hidden group md:h-[250px]">
              <div className="flex-1">
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-905">Titip Mudah</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Cukup isi form detail barang, dan tim kami yang akan membelikan barang impian Anda secara langsung.</p>
              </div>
              <div className="w-full sm:w-48 h-32 bg-gray-50 rounded-xl border border-gray-100 p-3 flex flex-col gap-2 relative overflow-hidden shrink-0">
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-full border border-gray-200 bg-white rounded-md px-2 py-1 flex items-center text-[10px] text-gray-500">
                  <span>Nama Barang...</span>
                  <span className="w-0.5 h-3 bg-primary ml-1 animate-pulse"></span>
                </div>
                <div className="h-6 w-1/2 bg-primary rounded-md self-end flex items-center justify-center text-[10px] text-white font-bold shadow-sm shadow-primary/20">
                  Kirim Data
                </div>
              </div>
            </div>

            {/* Bento 2: Tracking Real-time */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 overflow-hidden group md:h-[250px]">
              <div className="flex-1">
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-905">Tracking Real-time</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Pantau status pesanan Anda dari awal hingga barang sampai di lokasi Anda secara real-time.</p>
              </div>
              <div className="w-full sm:w-48 h-32 bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col justify-center relative overflow-hidden shrink-0">
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
                  Transit
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-[8px] font-bold">✓</div>
                    <span className="text-[9px] text-gray-500 mt-1 font-semibold">Origin</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-gray-200 mx-1 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border border-primary flex items-center justify-center animate-bounce">
                      <Truck className="w-2.5 h-2.5 text-primary" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-[8px] font-bold">2</div>
                    <span className="text-[9px] text-gray-400 mt-1">Dest</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 3: Aman & Terpercaya */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 overflow-hidden group md:h-[250px]">
              <div className="flex-1">
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-905">Aman & Terpercaya</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Sistem transparan dengan jaminan ganti rugi barang jika hilang atau rusak secara penuh.</p>
              </div>
              <div className="w-full sm:w-48 h-32 bg-primary/5 rounded-xl border border-primary/10 p-4 flex flex-col justify-center items-center gap-2 relative overflow-hidden shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-center overflow-hidden">
                  <p className="text-xs font-bold text-gray-900 truncate">Garansi Jastip Aktif</p>
                  <p className="text-[9px] text-muted-foreground truncate font-semibold">Perlindungan 100% Aman</p>
                </div>
              </div>
            </div>

            {/* Bento 4: Cepat & Responsif */}
            <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 overflow-hidden group md:h-[250px]">
              <div className="flex-1">
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-905">Cepat & Responsif</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Proses checkout belanja cepat dengan notifikasi chat otomatis saat status barang berubah.</p>
              </div>
              <div className="w-full sm:w-48 h-32 bg-gray-50 rounded-xl border border-gray-100 p-3 flex flex-col gap-2 relative overflow-hidden shrink-0 justify-center">
                <div className="bg-white border border-gray-100 p-2 rounded-xl shadow-sm self-start max-w-[90%]">
                  <p className="text-[9px] text-gray-800 leading-tight">Halo Admin, paket saya sudah dibeli? 🤔</p>
                </div>
                <div className="bg-primary/5 border border-primary/10 p-2 rounded-xl shadow-sm self-end max-w-[90%] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <p className="text-[9px] text-primary font-semibold leading-tight">Sudah dibeli kak! Hub TitipHub 📦</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-8 md:py-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Cara Kerja</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Semudah <span className="gradient-text">4 Langkah</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Proses titip barang di TitipHub sangat simpel dan transparan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Left side: Navigation steps (col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div className="space-y-3 relative">
                {/* Glowing vertical line track behind steps */}
                <div className="absolute left-[26px] top-6 bottom-6 w-[2px] bg-gray-200/60 z-0">
                  <div 
                    className="w-full bg-gradient-to-b from-primary to-secondary transition-all duration-500 rounded-full"
                    style={{ 
                      height: `${(activeStep / (steps.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                {steps.map((s, i) => {
                  const isActive = activeStep === i
                  return (
                    <div 
                      key={i} 
                      onClick={() => setActiveStep(i)}
                      className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                        isActive 
                          ? "bg-white shadow-md border-border/60" 
                          : "hover:bg-white/40 border-transparent"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-300 ${
                        isActive 
                          ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <h3 className={`font-bold text-base transition-colors ${isActive ? "text-primary" : "text-gray-800"}`}>
                          {s.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right side: Visual Preview Screen (col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] border border-border/40 shadow-xl p-6 md:p-8 flex flex-col justify-center min-h-[350px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.01] via-transparent to-secondary/[0.01]"></div>
              
              {/* Step 1 Visual (Buat Pesanan) */}
              {activeStep === 0 && (
                <div className="animate-scale-in flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-bounce">
                    <Package className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Formulir Pendaftaran Barang</h4>
                  <p className="text-sm text-muted-foreground max-w-sm mb-6">Pelanggan mengisi detail barang jastip, nomor resi belanja asal, dan memilih opsi jalur pengiriman.</p>
                  <div className="w-full max-w-md bg-gray-50 border border-gray-200/80 rounded-2xl p-4 text-left shadow-sm space-y-2.5">
                    <div className="space-y-1">
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      <div className="h-9 w-full bg-white border border-gray-200 rounded-lg flex items-center px-3 text-xs text-gray-900 font-medium">Sepatu Nike Air Max</div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      <div className="h-9 w-full bg-white border border-gray-200 rounded-lg flex items-center px-3 text-xs text-gray-800 font-mono">JNE-987654321</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-9 border border-primary bg-primary/5 rounded-lg flex items-center justify-center gap-1.5 text-xs text-primary font-bold"><Plane className="w-3.5 h-3.5" /> Udara</div>
                      <div className="h-9 border border-gray-200 rounded-lg flex items-center justify-center gap-1.5 text-xs text-gray-500 font-semibold"><Ship className="w-3.5 h-3.5" /> Laut</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 Visual (Manager Proses) */}
              {activeStep === 1 && (
                <div className="animate-scale-in flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6 animate-bounce">
                    <Scale className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Verifikasi & Timbang Paket</h4>
                  <p className="text-sm text-muted-foreground max-w-sm mb-6">Admin menimbang berat paket yang masuk, menentukan tarif ongkir, dan menerbitkan resi internal TitipHub.</p>
                  <div className="w-full max-w-md bg-gray-50 border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <span className="text-xs text-gray-500 font-medium">Status</span>
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">Pending</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="bg-white p-3 rounded-xl border border-gray-200">
                        <p className="text-[10px] text-gray-500 uppercase font-semibold">Berat Paket</p>
                        <p className="text-lg font-bold text-gray-850 flex items-center gap-1 mt-0.5"><Scale className="w-4 h-4 text-primary" /> 1.5 kg</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-200">
                        <p className="text-[10px] text-gray-500 uppercase font-semibold">Total Ongkir</p>
                        <p className="text-lg font-bold text-primary flex items-center gap-1 mt-0.5"><Banknote className="w-4 h-4" /> Rp 127.500</p>
                      </div>
                    </div>
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-2.5 text-center text-xs text-primary font-bold">
                      Resi Terbit: TH-2026-0008
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 Visual (Barang Dikirim) */}
              {activeStep === 2 && (
                <div className="animate-scale-in flex flex-col items-center text-center w-full">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-primary mb-6 animate-bounce">
                    <Truck className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Pengiriman & Live Tracking</h4>
                  <p className="text-sm text-muted-foreground max-w-sm mb-6">Barang dikirim dan pelanggan dapat memantau status secara langsung melalui peta tracking digital.</p>
                  
                  <div className="w-full max-w-md bg-gray-50 border border-gray-200/85 rounded-2xl p-5 shadow-sm">
                    {/* Simulated Map / Progress Track */}
                    <div className="h-16 w-full bg-white rounded-xl border border-gray-200 relative overflow-hidden flex items-center px-4 mb-4">
                      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <div className="w-full flex justify-between items-center relative z-10">
                        <div className="flex flex-col items-start">
                          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">Origin</span>
                          <span className="text-[9px] text-gray-400 mt-0.5">Jakarta</span>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed border-primary/30 mx-4 relative">
                          <div className="absolute -top-3 left-[60%] -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 animate-bounce">
                            <Plane className="w-3.5 h-3.5 rotate-45" />
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold">Hub</span>
                          <span className="text-[9px] text-gray-400 mt-0.5">Surabaya</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-left bg-blue-50 border border-blue-100 rounded-xl p-3">
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-blue-700">Status: Paket Transit di Semarang</p>
                        <p className="text-[9px] text-blue-600/80">Diperbarui 10 menit yang lalu</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 Visual (Selesai!) */}
              {activeStep === 3 && (
                <div className="animate-scale-in flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center text-primary mb-6 animate-pulse">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Serah Terima & Selesai</h4>
                  <p className="text-sm text-muted-foreground max-w-sm mb-6">Barang sampai di Hub tujuan, siap diambil oleh pelanggan dengan melunasi ongkir yang disepakati.</p>
                  <div className="w-full max-w-md bg-gray-50 border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-green-500 shadow-sm">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 mt-1">Paket Tiba di Hub</p>
                    <p className="text-xs text-muted-foreground">TH-2026-0008 • Sepatu Nike Air Max</p>
                    <div className="mt-2 w-full bg-green-50 border border-green-100 text-green-700 text-center font-bold text-xs py-2 rounded-lg">
                      Status: SIAP DIAMBIL (Completed)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent/15 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Testimoni</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Apa Kata <span className="gradient-text">Mereka</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Dengar langsung dari pelanggan setia TitipHub.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Spotlight Card */}
            <div className="bg-white rounded-[2rem] border border-border/40 shadow-xl p-8 md:p-12 relative overflow-hidden transition-all duration-500 min-h-[250px] flex flex-col justify-between group">
              {/* Quote Mark Decoration */}
              <span className="absolute -top-4 -left-2 text-[150px] md:text-[200px] font-black text-primary/[0.03] select-none pointer-events-none font-serif leading-none">“</span>
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star 
                      key={j} 
                      className={`w-5 h-5 ${j < testimonials[activeTestimonial].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-8 italic relative transition-all duration-300 font-medium">
                  "{testimonials[activeTestimonial].text}"
                </p>

                {/* Profile row */}
                <div className="flex items-center justify-between mt-auto flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-extrabold text-base shadow-md">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base">{testimonials[activeTestimonial].name}</p>
                      <p className="text-xs text-muted-foreground font-semibold">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      className="w-10 h-10 rounded-full border border-gray-200/80 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-600"
                      title="Sebelumnya"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button 
                      onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                      className="w-10 h-10 rounded-full border border-gray-200/80 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-gray-600"
                      title="Berikutnya"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === i ? "w-6 bg-primary" : "w-2 bg-gray-300"}`}
                  title={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-8 md:py-12 mb-10">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-3xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Siap Menitipkan Barang?</h2>
              <p className="text-white/80 text-base mb-6 max-w-lg mx-auto">
                Bergabung bersama ratusan pelanggan puas lainnya. Daftar gratis sekarang juga!
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base font-bold rounded-xl shadow-lg transition-all duration-300">
                    Daftar Gratis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button size="lg" className="bg-transparent h-12 px-8 text-base font-semibold rounded-xl border border-white/40 text-white hover:bg-white/10 hover:text-white transition-all duration-300">
                    Saya Sudah Punya Akun
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-oxford-navy-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/titiphub-icon.png" alt="TitipHub Logo" className="w-8 h-8 object-contain" />
                <span className="font-bold text-2xl">TitipHub</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Platform jasa titip lokal terpercaya yang mempermudah operasional usaha jastip Anda. Transparan, cepat, dan aman.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent">Navigasi</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link to="/" className="hover:text-accent transition-colors">Beranda</Link></li>
                <li><Link to="/order" className="hover:text-accent transition-colors">Titip Barang</Link></li>
                <li><Link to="/tracking" className="hover:text-accent transition-colors">Lacak Pesanan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-accent">Sosial Media</h4>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-oxford-navy-900 transition-colors" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-oxford-navy-900 transition-colors" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-oxford-navy-900 transition-colors" title="TikTok">
                  <svg viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} TitipHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
