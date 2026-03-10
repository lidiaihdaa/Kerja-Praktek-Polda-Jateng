import { useParams, useNavigate } from "react-router-dom";
import { Building2, MapPin, Calendar, Wrench, ArrowLeft, CheckCircle2 } from "lucide-react";

// 1. IMPORT FOTO (Foto asli untuk 5 proyek pertama)
import seoImg from "../../assets/img/SEO.jpg";
import webdevImg from "../../assets/img/webdev.jpg";
import integrationImg from "../../assets/img/s.integ.jpg";
import uiuxImg from "../../assets/img/design.jpg";
import mobileappImg from "../../assets/img/mobileapp.jpg";

// 2. DATA LENGKAP PROYEK (Full 20 Proyek dengan Deskripsi & Tools)
const showcaseData = [
  // --- Bidang TIK ---
  { id: 1, title: "Search Engine Optimization (SEO)", kategori: "Bid TIK", desc: "Proyek optimalisasi situs web resmi agar lebih mudah ditemukan oleh masyarakat melalui mesin pencari. Fokus utama meliputi riset kata kunci strategis, perbaikan struktur URL, serta peningkatan kecepatan pemuatan halaman (Core Web Vitals) untuk menembus halaman pertama Google.", client: "Polda Jateng", date: "2026", img: seoImg, tools: ["Google Analytics", "Ahrefs", "Lighthouse", "WordPress"] },
  { id: 2, title: "Web Development (SIMAGANG)", kategori: "Bid TIK", desc: "Membangun platform portal web terintegrasi untuk pendaftaran dan monitoring peserta magang. Sistem ini memangkas waktu birokrasi pendaftaran hingga 70% dan memudahkan pembimbing dalam menilai kinerja peserta secara digital.", client: "Polda Jateng", date: "2026", img: webdevImg, tools: ["React JS", "Tailwind CSS", "Laravel", "MySQL"] },
  { id: 3, title: "System Integration", kategori: "Bid TIK", desc: "Menghubungkan berbagai pangkalan data agar dapat berkomunikasi secara otomatis dan efisien. Mengurangi redudansi data antar satuan kerja.", client: "Polda Jateng", date: "2026", img: integrationImg, tools: ["REST API", "Postman", "Node.js"] },
  { id: 4, title: "UI / UX Design", kategori: "Bid TIK", desc: "Perancangan antarmuka yang intuitif untuk seluruh aplikasi digital milik Polda Jateng berdasarkan riset pengalaman pengguna.", client: "Polda Jateng", date: "2026", img: uiuxImg, tools: ["Figma", "Miro", "Whimsical"] },
  { id: 5, title: "Mobile App Development", kategori: "Bid TIK", desc: "Pengembangan aplikasi Android dan iOS untuk sarana pelaporan darurat real-time yang langsung terhubung ke command center.", client: "Polda Jateng", date: "2026", img: mobileappImg, tools: ["Flutter", "Firebase", "Dart"] },
  { id: 6, title: "Audit Keamanan Jaringan (Cybersecurity)", kategori: "Bid TIK", desc: "Melakukan penetration testing dan penguatan keamanan sistem jaringan dari potensi ancaman siber eksternal.", client: "Polda Jateng", date: "2026", tools: ["Wireshark", "Kali Linux", "Nmap"] },
  { id: 7, title: "Pembuatan Executive Dashboard Data", kategori: "Bid TIK", desc: "Visualisasi data analitik terpusat untuk membantu proses pengambilan keputusan strategis oleh pimpinan kepolisian.", client: "Polda Jateng", date: "2026", tools: ["Tableau", "PowerBI", "Excel"] },
  
  // --- Bidang Humas ---
  { id: 8, title: "Social Media Campaign", kategori: "Bid Humas", desc: "Perancangan strategi dan konten untuk kampanye digital di media sosial resmi kepolisian guna menekan angka hoaks di masyarakat.", client: "Polda Jateng", date: "2026", tools: ["Instagram", "TikTok", "Facebook", "LinkedIn", "WhatsApp"] },
  { id: 9, title: "Video Company Profile", kategori: "Bid Humas", desc: "Pembuatan video profil sinematik yang menampilkan tugas, fungsi, dan fasilitas dari berbagai satuan kerja di lingkungan Polda Jateng.", client: "Polda Jateng", date: "2026", tools: ["Premiere Pro", "After Effects", "Kamera Mirrorless"] },
  { id: 10, title: "Desain Grafis Edukasi Masyarakat", kategori: "Bid Humas", desc: "Pembuatan infografis kreatif dan mudah dipahami untuk mengedukasi masyarakat terkait alur layanan kepolisian (SKCK, SIM, dll).", client: "Polda Jateng", date: "2026", tools: ["Illustrator", "Photoshop", "Canva"] },
  { id: 11, title: "Peliputan & Jurnalistik Kepolisian", kategori: "Bid Humas", desc: "Mendokumentasikan kegiatan utama Kapolda dan menulis press release untuk disalurkan ke berbagai media massa nasional.", client: "Polda Jateng", date: "2026", tools: ["Microsoft Word", "Kamera DSLR", "Voice Recorder"] },
  { id: 12, title: "Manajemen Konten Website Resmi", kategori: "Bid Humas", desc: "Mengelola pembaruan berita, pengumuman, dan informasi publik di portal website Tribrata News agar selalu aktual.", client: "Polda Jateng", date: "2026", tools: ["WordPress CMS", "SEO Tools", "Grammarly"] },
  
  // --- Biro SDM ---
  { id: 13, title: "Analisis Beban Kerja Personel", kategori: "Biro SDM", desc: "Mengevaluasi dan memetakan beban kerja anggota Polri untuk optimalisasi penempatan tugas dan usulan mutasi jabatan.", client: "Polda Jateng", date: "2026", tools: ["SPSS", "Microsoft Excel", "Google Forms"] },
  { id: 14, title: "Digitalisasi Arsip Personel", kategori: "Biro SDM", desc: "Mengalihmediakan ratusan data fisik personel ke dalam sistem pengarsipan digital yang terintegrasi untuk mencegah kehilangan dokumen.", client: "Polda Jateng", date: "2026", tools: ["Scanner HD", "Google Drive", "SI-SDM"] },
  { id: 15, title: "Perumusan Indikator Kinerja Personel", kategori: "Biro SDM", desc: "Membantu bagian birokrasi merancang parameter penilaian kinerja bulanan untuk anggota Polri dan Pegawai Negeri Sipil (PNS).", client: "Polda Jateng", date: "2026", tools: ["Excel", "Trello", "KPI Dashboard"] },
  { id: 16, title: "Program Dukungan Psikologis Anggota", kategori: "Biro SDM", desc: "Membantu Bagian Psikologi dalam pelaksanaan tes mental kejiwaan dan program pendampingan stres bagi anggota lapangan.", client: "Polda Jateng", date: "2026", tools: ["Alat Tes Psikologi", "Google Forms", "Zoom"] },
  
  // --- Bidang Hukum / Bidkum ---
  { id: 17, title: "Penyuluhan Hukum Digital", kategori: "Bidkum", desc: "Pembuatan materi presentasi dan modul digital interaktif untuk penyuluhan kesadaran hukum kepada kalangan pelajar dan masyarakat umum.", client: "Polda Jateng", date: "2026", tools: ["Canva", "PowerPoint", "Zoom"] },
  { id: 18, title: "Kajian Hukum Peraturan Daerah", kategori: "Bidkum", desc: "Melakukan riset dan analisis sinkronisasi peraturan daerah (Perda) terbaru dengan undang-undang kepolisian yang berlaku.", client: "Polda Jateng", date: "2026", tools: ["JDIH", "Microsoft Word", "Mendeley"] },
  { id: 19, title: "Penyusunan Draft MoU & Perjanjian", kategori: "Bidkum", desc: "Membantu penasihat hukum menyusun rancangan nota kesepahaman (MoU) antara instansi kepolisian dan pihak swasta/universitas.", client: "Polda Jateng", date: "2026", tools: ["Microsoft Word", "Google Docs"] },
  { id: 20, title: "Klasifikasi Putusan Perkara", kategori: "Bidkum", desc: "Menata, menelaah, dan mengarsipkan riwayat putusan perkara peradilan umum sebagai bahan yurisprudensi dan referensi hukum internal.", client: "Polda Jateng", date: "2026", tools: ["SIPP", "Excel", "Database Hukum"] },
];

// 3. KAMUS KEPANJANGAN DIVISI
const divisiFullName: Record<string, string> = {
  "Bid TIK": "Bidang Teknologi Informasi dan Komunikasi",
  "Bid Humas": "Bidang Hubungan Masyarakat",
  "Biro SDM": "Biro Sumber Daya Manusia",
  "Bidkum": "Bidang Hukum"
};

const DetailProyek = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = showcaseData.find((item) => item.id === Number(id));

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-slate-50">
        <h2 className="mb-4 text-3xl font-bold text-slate-800">Proyek Tidak Ditemukan</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 text-white transition rounded-lg bg-biru hover:opacity-90"
        >
          Kembali ke Daftar Proyek
        </button>
      </div>
    );
  }

  // Menyiapkan daftar tools fallback jika seandainya data kosong
  const toolsList = project.tools || ["Microsoft Office", "Trello"];

  return (
    <section className="py-20 min-h-screen bg-slate-50">
      <div className="container px-4 mx-auto max-w-5xl">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Kembali ke Daftar Proyek
        </button>

        <div className="overflow-hidden bg-white border border-slate-100 shadow-xl rounded-3xl">
          
          <div className="w-full h-64 md:h-96 bg-slate-200 relative group overflow-hidden">
            <img 
              // Menyesuaikan gambar: jika project.img ada pakai itu, jika tidak buat otomatis dari judul
              src={project.img || `https://dummyimage.com/1200x600/e5e7eb/9ca3af&text=${project.title.replace(/ /g, '+')}`} 
              alt={project.title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold text-white rounded-lg bg-biru uppercase tracking-wider shadow-sm">
                {project.kategori}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                {project.title}
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mt-10">
              
              <div className="md:col-span-2">
                <h3 className="mb-4 text-2xl font-bold text-slate-800 flex items-center gap-2">
                  Ringkasan Proyek
                </h3>
                <p className="leading-relaxed text-slate-600 text-lg mb-8 text-justify">
                  {project.desc}
                </p>

                <h3 className="mb-4 text-xl font-bold text-slate-800 mt-10">Fokus Utama</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Meningkatkan efisiensi dan transparansi operasional melalui inovasi mahasiswa magang.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Menerapkan standar dan keterampilan akademik ke dalam lingkungan instansi pemerintahan.</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-1 space-y-8">
                
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5">Informasi Detail</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3 text-slate-700">
                      <Building2 className="w-5 h-5 text-biru shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold mb-0.5">Instansi</p>
                        <p className="font-bold text-sm">{project.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 text-slate-700">
                      <MapPin className="w-5 h-5 text-biru shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold mb-0.5">Divisi / Satker</p>
                        <p className="font-bold text-sm leading-snug">{divisiFullName[project.kategori] || project.kategori}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 text-slate-700">
                      <Calendar className="w-5 h-5 text-biru shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold mb-0.5">Tahun Pelaksanaan</p>
                        <p className="font-bold text-sm">{project.date}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                    <Wrench className="w-4 h-4 text-slate-500" />
                    Tools & Teknologi
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {toolsList.map((tool, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-lg"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProyek;