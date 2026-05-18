import React from "react"
import { Link } from "react-router-dom"
import { Package, ArrowRight, ShieldCheck, Truck, Clock, Star, ChevronRight, Users, BarChart3 } from "lucide-react"
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
      <section className="gradient-hero relative min-h-[90vh] flex items-center">
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
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base font-semibold rounded-xl shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300">
                    Mulai Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold rounded-xl border-white/30 text-white hover:bg-white/10 hover:text-white transition-all duration-300">
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
                  <p className="text-3xl font-bold text-accent">24jam</p>
                  <p className="text-sm text-white/60">Rata-rata Proses</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:flex justify-center animate-fade-in-up animation-delay-300">
              <div className="relative">
                <div className="w-[420px] h-[420px] rounded-3xl gradient-primary opacity-20 blur-3xl absolute -inset-10"></div>
                <div className="relative glass rounded-3xl p-8 shadow-2xl animate-pulse-glow">
                  <div className="space-y-4">
                    {/* Mock order card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">Sepatu Nike Air Max</p>
                          <p className="text-xs text-gray-500">ORD-2026-001</p>
                        </div>
                        <span className="ml-auto bg-accent/15 text-primary text-xs font-semibold px-3 py-1 rounded-full">Diproses</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                        <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
                        <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
                        <div className="h-1.5 flex-1 rounded-full bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-accent/15 rounded-lg flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">Kopi Kenangan</p>
                          <p className="text-xs text-gray-500">ORD-2026-002</p>
                        </div>
                        <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Selesai ✓</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                        <div className="h-1.5 flex-1 rounded-full bg-secondary"></div>
                        <div className="h-1.5 flex-1 rounded-full bg-accent"></div>
                        <div className="h-1.5 flex-1 rounded-full bg-accent"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 opacity-70">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">Buku Tere Liye</p>
                          <p className="text-xs text-gray-500">ORD-2026-003</p>
                        </div>
                        <span className="ml-auto bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">Menunggu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,70 L1440,120 L0,120 Z" fill="hsl(140, 10%, 95%)" />
          </svg>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Fitur Unggulan</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kenapa Harus <span className="gradient-text">TitipHub</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Cara Kerja</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Semudah <span className="gradient-text">4 Langkah</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Proses titip barang di TitipHub sangat simpel dan transparan.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="card-premium p-6">
                  <span className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-300">{s.num}</span>
                  <h3 className="font-bold text-lg mt-2 mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                    <ChevronRight className="w-6 h-6 text-secondary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent/15 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Testimoni</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apa Kata <span className="gradient-text">Mereka</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Dengar langsung dari pelanggan setia TitipHub.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-premium p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
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
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Menitipkan Barang?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                Bergabung bersama ratusan pelanggan puas lainnya. Daftar gratis sekarang juga!
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-12 px-8 text-base font-semibold rounded-xl shadow-lg transition-all duration-300">
                    Daftar Gratis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold rounded-xl border-white/30 text-white hover:bg-white/10 hover:text-white transition-all duration-300">
                    Saya Sudah Punya Akun
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0d3d33] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-7 w-7 text-accent" />
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
              <h4 className="font-semibold mb-4 text-accent">Akses Cepat</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><Link to="/signin" className="hover:text-accent transition-colors">Masuk</Link></li>
                <li><Link to="/signup" className="hover:text-accent transition-colors">Daftar</Link></li>
                <li><Link to="/manager" className="hover:text-accent transition-colors">Manager</Link></li>
                <li><Link to="/owner" className="hover:text-accent transition-colors">Owner</Link></li>
              </ul>
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
