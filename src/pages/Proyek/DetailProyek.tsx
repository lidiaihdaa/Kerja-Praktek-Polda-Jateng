import { useParams, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Calendar,
  Wrench,
  ArrowLeft,
  CheckCircle2,
  Users,
  Clock
} from "lucide-react";

// ================= IMPORT GAMBAR =================

// TIK
import seoImg from "../../assets/img/SEO.jpg";
import webdevImg from "../../assets/img/webdev.jpg";
import integrationImg from "../../assets/img/s.integ.jpg";
import uiuxImg from "../../assets/img/design.jpg";
import mobileappImg from "../../assets/img/mobileapp.jpg";
import cyber from "../../assets/img/cyber.png";
import dashboarduser from "../../assets/img/dashboard user.png";

// HUMAS
import sosmed from "../../assets/img/sosmed.png";
import videocampaign from "../../assets/img/videocampaign.png";
import desaingrafis from "../../assets/img/desaingrafis.png";
import jurnalis from "../../assets/img/jurnalis.png";
import manajemenkonten from "../../assets/img/manajemenkonten.png";

// SDM
import analisisbebankerja from "../../assets/img/bebankerja.png";
import arsippersonel from "../../assets/img/arsippersonel.png";
import indikatorkinerja from "../../assets/img/indikatorkinerja.png";
import piskologis from "../../assets/img/psikologisanggota.png";

// BIDKUM
import penyuluhanhukum from "../../assets/img/penyuluhanhukum.png";
import kajianhukum from "../../assets/img/kajianhukum.png";
import perjanjian from "../../assets/img/perjanjian.png";
import perkara from "../../assets/img/putusanperkara.png";

import digitalforensik from "../../assets/img/digitalforensik.png";
import dnaforensik from "../../assets/img/dnaforensik.png";
import analisiskeuangan from "../../assets/img/analisiskeuangan.png";

// ================= DATA PROJECT =================

const showcaseData = [

{
id:1,
title:"Search Engine Optimization (SEO)",
kategori:"Satker TIK",
img:seoImg,
desc:"Optimalisasi website resmi kepolisian agar mudah ditemukan masyarakat melalui mesin pencari.",
tools:["Google Analytics","Ahrefs","WordPress"]
},

{
id:2,
title:"Web Development (SIMAGANG)",
kategori:"Satker TIK",
img:webdevImg,
desc:"Pengembangan sistem pendaftaran dan monitoring peserta magang.",
tools:["React","Laravel","MySQL"]
},

{
id:3,
title:"System Integration",
kategori:"Satker TIK",
img:integrationImg,
desc:"Integrasi berbagai sistem internal untuk meningkatkan efisiensi data.",
tools:["REST API","NodeJS"]
},

{
id:4,
title:"UI / UX Design",
kategori:"Satker TIK",
img:uiuxImg,
desc:"Perancangan pengalaman pengguna untuk aplikasi internal.",
tools:["Figma"]
},

{
id:5,
title:"Mobile App Development",
kategori:"Satker TIK",
img:mobileappImg,
desc:"Pengembangan aplikasi mobile untuk layanan kepolisian.",
tools:["Flutter","Firebase"]
},

{
id:6,
title:"Audit Keamanan Jaringan",
kategori:"Satker DITSIBER",
img:cyber,
desc:"Analisis keamanan jaringan untuk mencegah serangan siber.",
tools:["Kali Linux","Wireshark"]
},

{
id:7,
title:"Executive Dashboard Data",
kategori:"Satker TIK",
img:dashboarduser,
desc:"Visualisasi data strategis untuk pimpinan.",
tools:["Power BI","Excel"]
},

{
id:8,
title:"Social Media Campaign",
kategori:"Satker HUMAS",
img:sosmed,
desc:"Strategi kampanye media sosial untuk edukasi masyarakat.",
tools:["Instagram","TikTok"]
},

{
id:9,
title:"Video Company Profile",
kategori:"Satker HUMAS",
img:videocampaign,
desc:"Produksi video profil institusi kepolisian.",
tools:["Premiere Pro","After Effects"]
},

{
id:10,
title:"Desain Grafis Edukasi Masyarakat",
kategori:"Satker HUMAS",
img:desaingrafis,
desc:"Infografis edukasi keamanan dan hukum.",
tools:["Illustrator","Photoshop"]
},

{
id:11,
title:"Peliputan & Jurnalistik Kepolisian",
kategori:"Satker HUMAS",
img:jurnalis,
desc:"Dokumentasi kegiatan kepolisian.",
tools:["DSLR","WordPress"]
},

{
id:12,
title:"Manajemen Konten Website Resmi",
kategori:"Satker HUMAS",
img:manajemenkonten,
desc:"Pengelolaan berita dan konten website resmi.",
tools:["CMS","SEO Tools"]
},

{
id:13,
title:"Analisis Beban Kerja Personel",
kategori:"Satker SDM",
img:analisisbebankerja,
desc:"Evaluasi distribusi kerja personel kepolisian.",
tools:["Excel","SPSS"]
},

{
id:14,
title:"Digitalisasi Arsip Personel",
kategori:"Satker SDM",
img:arsippersonel,
desc:"Konversi arsip fisik menjadi digital.",
tools:["Scanner","Drive"]
},

{
id:15,
title:"Perumusan Indikator Kinerja",
kategori:"Satker SDM",
img:indikatorkinerja,
desc:"Pengembangan KPI untuk personel.",
tools:["Excel"]
},

{
id:16,
title:"Program Dukungan Psikologis",
kategori:"Satker SDM",
img:piskologis,
desc:"Pendampingan psikologi bagi anggota.",
tools:["Psikotes"]
},

{
id:17,
title:"Penyuluhan Hukum Digital",
kategori:"Satker BIDKUM",
img:penyuluhanhukum,
desc:"Edukasi hukum melalui media digital.",
tools:["Canva","PowerPoint"]
},

{
id:18,
title:"Kajian Hukum Peraturan Daerah",
kategori:"Satker BIDKUM",
img:kajianhukum,
desc:"Analisis regulasi daerah.",
tools:["Word"]
},

{
id:19,
title:"Penyusunan Draft MoU",
kategori:"Satker BIDKUM",
img:perjanjian,
desc:"Penyusunan dokumen kerja sama.",
tools:["Docs"]
},

{
id:20,
title:"Klasifikasi Putusan Perkara",
kategori:"Satker BIDKUM",
img:perkara,
desc:"Pengelompokan putusan perkara hukum.",
tools:["Database Hukum"]
},

{
id:21,
title:"Analisis Digital Forensik",
kategori:"Satker LABFOR",
img: digitalforensik,
desc:"Analisis barang bukti digital.",
tools:["Autopsy","FTK"]
},

{
id:22,
title:"Analisis DNA Forensik",
kategori:"Satker LABFOR",
img:dnaforensik,
desc:"Analisis biologis barang bukti.",
tools:["Lab Tools"]
},

{
id:23,
title:"Analisis Data Kriminalitas",
kategori:"Satker DITRESKRIMUM",
img:"https://dummyimage.com/1200x600",
desc:"Analisis pola kejahatan.",
tools:["Excel"]
},

{
id:24,
title:"Investigasi Kejahatan Konvensional",
kategori:"Satker DITRESKRIMUM",
img:"https://dummyimage.com/1200x600",
desc:"Investigasi kasus kriminal umum.",
tools:["Database Kepolisian"]
},

{
id:25,
title:"Investigasi Korupsi",
kategori:"Satker DITRESKRIMSUS",
img:"https://dummyimage.com/1200x600",
desc:"Investigasi tindak pidana korupsi.",
tools:["Audit Tools"]
},

{
id:26,
title:"Analisis Kejahatan Lingkungan",
kategori:"Satker DITRESKRIMSUS",
img:"https://dummyimage.com/1200x600",
desc:"Analisis kejahatan lingkungan.",
tools:["GIS"]
},

{
id:27,
title:"Sistem Monitoring Anggaran",
kategori:"Satker KEU",
img:"https://dummyimage.com/1200x600",
desc:"Monitoring penggunaan anggaran.",
tools:["Excel"]
},

{
id:28,
title:"Analisis Laporan Keuangan",
kategori:"Satker KEU",
img: analisiskeuangan,
desc:"Analisis laporan keuangan institusi.",
tools:["Akuntansi"]
}

];

// ================= COMPONENT =================

const DetailProyek = () => {

const { id } = useParams();
const navigate = useNavigate();

const project = showcaseData.find(item => item.id === Number(id));

if(!project){

return(

<div className="flex flex-col items-center justify-center min-h-[60vh]">

<h2 className="text-3xl font-bold mb-4">
Proyek Tidak Ditemukan
</h2>

<button
onClick={()=>navigate(-1)}
className="px-6 py-2 bg-biru text-white rounded"
>
Kembali
</button>

</div>

);

}

return(

<section className="py-20 bg-slate-50 min-h-screen">

<div className="container mx-auto max-w-5xl px-4">

<button
onClick={()=>navigate(-1)}
className="flex items-center gap-2 mb-8 text-gray-500"
>
<ArrowLeft size={16}/> Kembali
</button>

<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

<img
src={project.img}
alt={project.title}
className="w-full h-96 object-cover"
/>

<div className="p-10">

<span className="bg-biru text-white px-4 py-1 rounded-lg text-xs font-bold">
{project.kategori}
</span>

<h1 className="text-4xl font-bold mt-4 mb-6">
{project.title}
</h1>

<p className="text-gray-600 mb-10">
{project.desc}
</p>

<div className="grid md:grid-cols-2 gap-8">

<div className="space-y-4">

<div className="flex gap-2 items-center">
<Building2 size={18}/> Polda Jawa Tengah
</div>

<div className="flex gap-2 items-center">
<MapPin size={18}/> Semarang
</div>

<div className="flex gap-2 items-center">
<Calendar size={18}/> 2026
</div>

<div className="flex gap-2 items-center">
<Clock size={18}/> Durasi: 3 Bulan
</div>

<div className="flex gap-2 items-center">
<Users size={18}/> Individu / Kelompok
</div>

</div>

<div>

<h3 className="font-bold mb-3 flex items-center gap-2">
<Wrench size={16}/> Tools & Teknologi
</h3>

<div className="flex flex-wrap gap-2">

{project.tools.map((tool,index)=>(
<span
key={index}
className="px-3 py-1 text-sm bg-gray-100 rounded-lg"
>
{tool}
</span>
))}

</div>

</div>

</div>

<div className="mt-10">

<h3 className="text-xl font-bold mb-4">
Fokus Utama
</h3>

<ul className="space-y-3">

<li className="flex gap-3">
<CheckCircle2 className="text-green-500"/>
Memberikan pengalaman kerja nyata bagi mahasiswa.
</li>

<li className="flex gap-3">
<CheckCircle2 className="text-green-500"/>
Meningkatkan inovasi teknologi di lingkungan kepolisian.
</li>

</ul>

</div>

</div>

</div>

</div>

</section>

);

};

export default DetailProyek;