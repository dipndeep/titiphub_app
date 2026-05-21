import React from "react"
import { Link } from "react-router-dom"
import { Package, ArrowRight, ShieldCheck, Truck, Clock, Star, ChevronRight, Users, BarChart3, Plane, Ship, Banknote, CheckCircle2, Store, Drone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
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
          <div className="text-center mb-8">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Fitur Unggulan</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Kenapa Harus <span className="gradient-text">TitipHub</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Platform jasa titip yang dirancang untuk memberikan pengalaman terbaik bagi Anda.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-premium p-6 text-center group">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-500">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-8 md:py-10 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Cara Kerja</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Semudah <span className="gradient-text">4 Langkah</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Proses titip barang di TitipHub sangat simpel dan transparan.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="card-premium p-6">
                  <span className="text-4xl font-black text-primary/40 group-hover:text-primary transition-colors duration-300">{s.num}</span>
                  <h3 className="font-bold text-lg mt-2 mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100">
                    <ChevronRight className="w-4 h-4 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="inline-block bg-accent/15 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Testimoni</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Apa Kata <span className="gradient-text">Mereka</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Dengar langsung dari pelanggan setia TitipHub.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-premium p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
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
