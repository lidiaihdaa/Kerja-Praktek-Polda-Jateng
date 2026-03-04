import { useState } from "react";
import { Link } from "react-router-dom";
// bid tik
import seoImg from "../../../assets/img/SEO.jpg";
import webdevImg from "../../../assets/img/webdev.jpg";
import integrationImg from "../../../assets/img/s.integ.jpg";
import uiuxImg from "../../../assets/img/design.jpg";
import mobileappImg from "../../../assets/img/mobileapp.jpg";
import cyber from "../../../assets/img/cyber.png";
import dashboarduser from "../../../assets/img/dashboard user.png";
// bid humas
import sosmed from "../../../assets/img/sosmed.png";
import videocampaign from "../../../assets/img/videocampaign.png";
import desaingrafis from "../../../assets/img/desaingrafis.png";
import jurnalis from "../../../assets/img/jurnalis.png";
import manajemenkonten from "../../../assets/img/manajemenkonten.png";

// 2. DATA PROYEK DENGAN GAMBAR (Lengkap 20 Proyek)
const showcaseData = [
  // --- Bidang TIK (Menggunakan foto asli kamu) ---
  { id: 1, title: "Search Engine Optimization (SEO)", kategori: "Bid TIK", img: seoImg },
  { id: 2, title: "Web Development (SIMAGANG)", kategori: "Bid TIK", img: webdevImg },
  { id: 3, title: "System Integration", kategori: "Bid TIK", img: integrationImg },
  { id: 4, title: "UI / UX Design", kategori: "Bid TIK", img: uiuxImg },
  { id: 5, title: "Mobile App Development", kategori: "Bid TIK", img: mobileappImg },
  { id: 6, title: "Audit Keamanan Jaringan (Cybersecurity)", kategori: "Bid TIK", img: cyber },
  { id: 7, title: "Pembuatan Executive Dashboard Data", kategori: "Bid TIK", img: dashboarduser},
  
  // --- Bidang Humas (Menggunakan ilustrasi Unsplash sementara) ---
  { id: 8, title: "Social Media Campaign", kategori: "Bid Humas", img: sosmed },
  { id: 9, title: "Video Company Profile", kategori: "Bid Humas", img: videocampaign },
  { id: 10, title: "Desain Grafis Edukasi Masyarakat", kategori: "Bid Humas", img: desaingrafis },
  { id: 11, title: "Peliputan & Jurnalistik Kepolisian", kategori: "Bid Humas", img: jurnalis},
  { id: 12, title: "Manajemen Konten Website Resmi", kategori: "Bid Humas", img: manajemenkonten },
  
  // --- Biro SDM (Menggunakan ilustrasi Unsplash sementara) ---
  { id: 13, title: "Analisis Beban Kerja Personel", kategori: "Biro SDM", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop" },
  { id: 14, title: "Digitalisasi Arsip Personel", kategori: "Biro SDM", img: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=600&auto=format&fit=crop" },
  { id: 15, title: "Perumusan Indikator Kinerja Personel", kategori: "Biro SDM", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" },
  { id: 16, title: "Program Dukungan Psikologis Anggota", kategori: "Biro SDM", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop" },
  
  // --- Bidang Hukum / Bidkum (Menggunakan ilustrasi Unsplash sementara) ---
  { id: 17, title: "Penyuluhan Hukum Digital", kategori: "Bidkum", img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop" },
  { id: 18, title: "Kajian Hukum Peraturan Daerah", kategori: "Bidkum", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop" },
  { id: 19, title: "Penyusunan Draft MoU & Perjanjian", kategori: "Bidkum", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop" },
  { id: 20, title: "Klasifikasi Putusan Perkara", kategori: "Bidkum", img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=600&auto=format&fit=crop" },
];

const categoryInfo: Record<string, { desc: string; jurusan: string }> = {
  "Semua": {
    desc: "Jelajahi berbagai inovasi dan kontribusi peserta magang dari berbagai bidang dan program studi di lingkungan Polda Jateng.",
    jurusan: "Semua Jurusan Terkait"
  },
  "Bid TIK": {
    desc: "Berfokus pada pengembangan teknologi, pemeliharaan jaringan, keamanan siber, dan digitalisasi sistem kepolisian.",
    jurusan: "Teknik Informatika, Sistem Informasi, Ilmu Komputer, Rekayasa Perangkat Lunak, Sains Data."
  },
  "Bid Humas": {
    desc: "Mengelola informasi publik, hubungan media, desain visual, dan kampanye digital kepolisian.",
    jurusan: "Ilmu Komunikasi, Desain Komunikasi Visual (DKV), Jurnalistik, Penyiaran, Hubungan Masyarakat."
  },
  "Biro SDM": {
    desc: "Menangani rekrutmen, pelatihan, asesmen psikologi, dan manajemen sumber daya manusia di lingkungan Polri.",
    jurusan: "Psikologi, Manajemen SDM, Administrasi Publik, Ilmu Pemerintahan."
  },
  "Bidkum": {
    desc: "Memberikan bantuan hukum, penyuluhan, dan analisis peraturan perundang-undangan.",
    jurusan: "Ilmu Hukum, Hukum Pidana, Hukum Tata Negara."
  }
};

const Project = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", ...new Set(showcaseData.map((item) => item.kategori))];

  const filteredData = activeCategory === "Semua" 
    ? showcaseData 
    : showcaseData.filter((item) => item.kategori === activeCategory);

  const displayedData = showAll ? filteredData : filteredData.slice(0, 4);

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container px-4 mx-auto max-w-7xl">
        
        <div className="text-center mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Showcase Project Magang
          </h2>
          {activeCategory === "Semua" && (
            <p className="text-gray-500 max-w-2xl mx-auto">
              {categoryInfo["Semua"].desc}
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((kategori, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCategory(kategori);
                setShowAll(false);
              }}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                activeCategory === kategori
                  ? "bg-biru text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {kategori}
            </button>
          ))}
        </div>

        {activeCategory !== "Semua" && (
          <div className="max-w-3xl mx-auto mb-12 p-6 transition-all duration-500 bg-slate-50 border border-slate-200 rounded-2xl text-center shadow-sm">
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              {categoryInfo[activeCategory].desc}
            </p>
            <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <span className="text-lg">🎓</span>
              <span className="font-bold text-gray-700 text-sm">Rekomendasi Jurusan:</span>
              <span className="font-semibold text-biru text-sm">
                {categoryInfo[activeCategory].jurusan}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {displayedData.length > 0 ? (
            displayedData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 transition-all duration-300 border border-gray-100 shadow-sm bg-gray-50 rounded-2xl hover:shadow-lg hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-block px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider rounded-lg bg-biru">
                      {item.kategori}
                    </span>
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-gray-800 group-hover:text-biru transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex justify-center mb-6 overflow-hidden rounded-xl bg-gray-200 h-64 relative">
                    <img
                      // Sekarang memanggil item.img, bukan lagi dummyimage hardcode
                      src={item.img || `https://dummyimage.com/600x300/e5e7eb/9ca3af&text=${item.title.replace(/ /g, '+')}`}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <Link 
                  to={`/proyek/${item.id}`} 
                  className="inline-flex items-center gap-3 text-sm font-bold text-gray-500 transition-colors w-max hover:text-biru"
                >
                  <span className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-200 rounded-full group-hover:bg-biru group-hover:text-white">
                    →
                  </span>
                  Learn more
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
              Belum ada proyek di kategori ini.
            </div>
          )}
        </div>

        {filteredData.length > 4 && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 font-semibold text-white transition-all rounded-full bg-biru hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : `Lihat Semua Proyek ${activeCategory !== 'Semua' ? activeCategory : ''}`}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Project;
