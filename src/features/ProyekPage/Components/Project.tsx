import { useState } from "react";
import { Link } from "react-router-dom";

// TIK
import seoImg from "../../../assets/img/SEO.jpg";
import webdevImg from "../../../assets/img/webdev.jpg";
import integrationImg from "../../../assets/img/s.integ.jpg";
import uiuxImg from "../../../assets/img/design.jpg";
import mobileappImg from "../../../assets/img/mobileapp.jpg";
import cyber from "../../../assets/img/cyber.png";
import dashboarduser from "../../../assets/img/dashboard user.png";

// HUMAS
import sosmed from "../../../assets/img/sosmed.png";
import videocampaign from "../../../assets/img/videocampaign.png";
import desaingrafis from "../../../assets/img/desaingrafis.png";
import jurnalis from "../../../assets/img/jurnalis.png";
import manajemenkonten from "../../../assets/img/manajemenkonten.png";

// SDM
import analisisbebankerja from "../../../assets/img/bebankerja.png";
import arsippersonel from "../../../assets/img/arsippersonel.png";
import indikatorkinerja from "../../../assets/img/indikatorkinerja.png";
import piskologis from "../../../assets/img/psikologisanggota.png";

// HUKUM
import penyuluhanhukum from "../../../assets/img/penyuluhanhukum.png";
import kajianhukum from "../../../assets/img/kajianhukum.png";
import perjanjian from "../../../assets/img/perjanjian.png";
import perkara from "../../../assets/img/putusanperkara.png";

//forensik
import digitalforensik from "../../../assets/img/digitalforensik.png";
import dnaforensik from "../../../assets/img/dnaforensik.png";
import analisiskeuangan from "../../../assets/img/analisiskeuangan.png";

const showcaseData = [

  // ================= TIK =================
  { id:1,title:"Search Engine Optimization (SEO)",kategori:"Satker TIK",img:seoImg },
  { id:2,title:"Web Development (SIMAGANG)",kategori:"Satker TIK",img:webdevImg },
  { id:3,title:"System Integration",kategori:"Satker TIK",img:integrationImg },
  { id:4,title:"UI / UX Design",kategori:"Satker TIK",img:uiuxImg },
  { id:5,title:"Mobile App Development",kategori:"Satker TIK",img:mobileappImg },
  { id:6,title:"Audit Keamanan Jaringan (Cybersecurity)",kategori:"Satker DITSIBER",img:cyber },
  { id:7,title:"Executive Dashboard Data",kategori:"Satker TIK",img:dashboarduser },

  // ================= HUMAS =================
  { id:8,title:"Social Media Campaign",kategori:"Satker HUMAS",img:sosmed },
  { id:9,title:"Video Company Profile",kategori:"Satker HUMAS",img:videocampaign },
  { id:10,title:"Desain Grafis Edukasi Masyarakat",kategori:"Satker HUMAS",img:desaingrafis },
  { id:11,title:"Peliputan & Jurnalistik Kepolisian",kategori:"Satker HUMAS",img:jurnalis },
  { id:12,title:"Manajemen Konten Website Resmi",kategori:"Satker HUMAS",img:manajemenkonten },

  // ================= SDM =================
  { id:13,title:"Analisis Beban Kerja Personel",kategori:"Satker SDM",img:analisisbebankerja },
  { id:14,title:"Digitalisasi Arsip Personel",kategori:"Satker SDM",img:arsippersonel },
  { id:15,title:"Perumusan Indikator Kinerja Personel",kategori:"Satker SDM",img:indikatorkinerja },
  { id:16,title:"Program Dukungan Psikologis Anggota",kategori:"Satker SDM",img:piskologis },

  // ================= BIDKUM =================
  { id:17,title:"Penyuluhan Hukum Digital",kategori:"Satker BIDKUM",img:penyuluhanhukum },
  { id:18,title:"Kajian Hukum Peraturan Daerah",kategori:"Satker BIDKUM",img:kajianhukum },
  { id:19,title:"Penyusunan Draft MoU & Perjanjian",kategori:"Satker BIDKUM",img:perjanjian },
  { id:20,title:"Klasifikasi Putusan Perkara",kategori:"Satker BIDKUM",img:perkara },

  // ================= LABFOR =================
  {
  id:21,
  title:"Analisis Digital Forensik",
  kategori:"Satker LABFOR",
  img:digitalforensik
},
{
id:22,
title:"Analisis DNA Forensik",
kategori:"Satker LABFOR",
img: dnaforensik
},

{
  id:23,
  title:"Analisis Data Kriminalitas",
  kategori:"Satker DITRESKRIMUM",
  img:"https://images.unsplash.com/photo-1605806616949-1e87b487fc2f"
},

{
  id:25,
  title:"Investigasi Korupsi",
  kategori:"Satker DITRESKRIMSUS",
  img:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
},

{
  id:27,
  title:"Sistem Monitoring Anggaran",
  kategori:"Satker KEU",
  img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f"
},
  {
    id:28,
    title:"Analisis Laporan Keuangan Institusi",
    kategori:"Satker KEU",
    img: analisiskeuangan
  }

];

const categoryInfo: Record<string,{desc:string,jurusan:string}> = {

Semua:{
desc:"Jelajahi berbagai inovasi dan kontribusi peserta magang dari berbagai satuan kerja di lingkungan Polda Jawa Tengah.",
jurusan:"Berbagai jurusan sesuai kebutuhan masing-masing satker."
},

"Satker TIK":{
desc:"Ini adalah jantung infrastruktur digital yang mengelola pengembangan sistem teknologi informasi.",
jurusan:"Teknik Informatika, Sistem Informasi, Teknik Komputer, Ilmu Komputer, Teknik Telekomunikasi."
},

"Satker HUMAS":{
desc:"Fokus pada citra publik dan penyebaran informasi kepada masyarakat.",
jurusan:"Ilmu Komunikasi, Desain Komunikasi Visual (DKV), Jurnalistik, Hubungan Internasional, Film & Televisi."
},

"Satker SDM":{
desc:"Mengelola administrasi dan kesejahteraan personel.",
jurusan:"Psikologi, Manajemen SDM, Hukum, Administrasi Publik, Pendidikan."
},

"Satker BIDKUM":{
desc:"Memberikan bantuan dan saran hukum bagi institusi.",
jurusan:"Ilmu Hukum."
},

"Satker DITSIBER":{
desc:"Menangani kejahatan di ruang digital.",
jurusan:"Teknik Informatika, Cyber Security, Sistem Informasi, Artificial Intelligence."
},

"Satker LABFOR":{
desc:"Analisis ilmiah terhadap barang bukti kriminal.",
jurusan:"Kimia, Biologi, Farmasi, Fisika, Teknik Elektro, Digital Forensik."
},

"Satker DITRESKRIMUM":{
desc:"Menangani tindak pidana konvensional.",
jurusan:"Hukum, Kriminologi, Sosiologi."
},

"Satker DITRESKRIMSUS":{
desc:"Menangani kasus khusus seperti korupsi dan kejahatan ekonomi.",
jurusan:"Hukum, Akuntansi Forensik, Ekonomi, Teknik Lingkungan."
},

"Satker KEU":{
desc:"Mengelola anggaran dan laporan keuangan institusi.",
jurusan:"Akuntansi, Manajemen Keuangan, Administrasi Perkantoran."
}

};

const Project = () => {

const [showAll,setShowAll] = useState(false);
const [activeCategory,setActiveCategory] = useState("Semua");

const categories = ["Semua",...new Set(showcaseData.map(item=>item.kategori))];

const filteredData =
activeCategory==="Semua"
? showcaseData
: showcaseData.filter(item=>item.kategori===activeCategory);

const displayedData = showAll ? filteredData : filteredData.slice(0,4);

return(

<section className="py-20 bg-white min-h-screen">

<div className="container px-4 mx-auto max-w-7xl">

<div className="text-center mb-10">

<h2 className="mb-4 text-3xl font-bold text-gray-800">
Showcase Project Magang
</h2>

<p className="text-gray-500 max-w-2xl mx-auto">
{categoryInfo[activeCategory]?.desc}
</p>

</div>

<div className="flex flex-wrap justify-center gap-3 mb-8">

{categories.map((kategori,index)=>(
<button
key={index}
onClick={()=>{
setActiveCategory(kategori);
setShowAll(false);
}}
className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
activeCategory===kategori
?"bg-biru text-white shadow-md"
:"bg-gray-100 text-gray-600 hover:bg-gray-200"
}`}
>
{kategori}
</button>
))}

</div>

{activeCategory!=="Semua" &&(

<div className="max-w-3xl mx-auto mb-12 p-6 bg-slate-50 border rounded-2xl text-center shadow-sm">

<p className="text-gray-600 mb-4">
{categoryInfo[activeCategory]?.desc}
</p>

<p className="font-semibold text-biru">
🎓 Rekomendasi Jurusan: {categoryInfo[activeCategory]?.jurusan}
</p>

</div>

)}

<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">

{displayedData.map((item)=>(

<Link key={item.id} to={`/proyek/${item.id}`} className="group block">

<div className="flex flex-col justify-between p-6 border shadow-sm bg-gray-50 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition">

<div>

<span className="px-3 py-1 text-xs font-bold text-white rounded-lg bg-biru">
{item.kategori}
</span>

<h3 className="mt-4 mb-4 text-xl font-bold text-gray-800 group-hover:text-biru">
{item.title}
</h3>

<div className="h-64 bg-gray-200 rounded-xl overflow-hidden">

<img
src={item.img}
alt={item.title}
className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
/>

</div>

</div>

<div className="mt-4 text-sm font-bold text-gray-500 group-hover:text-biru">
Learn more →
</div>

</div>

</Link>

))}

</div>

</div>

</section>

);

};

export default Project;