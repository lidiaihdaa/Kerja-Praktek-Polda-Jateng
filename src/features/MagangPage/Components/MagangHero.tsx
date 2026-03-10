import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import accImage from "@/assets/img/acc.png";

const divisions = [
  {
    name: "Satker TIK (Teknologi Informasi dan Komunikasi)",
    quota: 10,
    image: accImage,
    description:
      "Satker TIK merupakan jantung infrastruktur digital Polda Jawa Tengah. Divisi ini bertanggung jawab atas pengelolaan sistem teknologi informasi, pemeliharaan jaringan, pengembangan aplikasi, serta dukungan teknis seluruh operasional digital.",
    majors:
      "Teknik Informatika, Sistem Informasi, Teknik Komputer, Ilmu Komputer, Teknik Telekomunikasi.",
  },
  {
    name: "Satker HUMAS (Hubungan Masyarakat)",
    quota: 10,
    image: accImage,
    description:
      "Satker HUMAS fokus pada pengelolaan citra publik dan penyebaran informasi resmi Polda Jawa Tengah. Divisi ini menangani komunikasi media, dokumentasi kegiatan, serta hubungan dengan masyarakat dan instansi eksternal.",
    majors:
      "Ilmu Komunikasi, Desain Komunikasi Visual (DKV), Jurnalistik, Hubungan Internasional, Film & Televisi.",
  },
  {
    name: "Satker SDM (Sumber Daya Manusia)",
    quota: 10,
    image: accImage,
    description:
      "Satker SDM bertanggung jawab dalam mengelola administrasi personel, kesejahteraan anggota, rekrutmen, serta pengembangan kompetensi sumber daya manusia di lingkungan Polda Jawa Tengah.",
    majors:
      "Psikologi, Manajemen (SDM), Hukum, Administrasi Publik/Negara, Pendidikan.",
  },
  {
    name: "Satker LABFOR (Laboratorium Forensik)",
    quota: 10,
    image: accImage,
    description:
      "Satker LABFOR melakukan analisis ilmiah terhadap barang bukti kasus pidana. Divisi ini menggunakan metode sains modern untuk mendukung proses penyidikan melalui uji forensik fisik, kimia, biologi, maupun digital.",
    majors:
      "Kimia, Biologi, Farmasi, Fisika, Teknik Elektro, Teknik Informatika (khusus Digital Forensik).",
  },
  {
    name: "Satker DITRESKRIMUM (Direktorat Reserse Kriminal Umum)",
    quota: 10,
    image: accImage,
    description:
      "Satker DITRESKRIMUM menangani penyidikan tindak pidana konvensional seperti pencurian, penganiayaan, pembunuhan, dan kasus kriminal umum lainnya yang terjadi di wilayah hukum Jawa Tengah.",
    majors: "Hukum, Kriminologi, Sosiologi.",
  },
  {
    name: "Satker DITRESKRIMSUS (Direktorat Reserse Kriminal Khusus)",
    quota: 10,
    image: accImage,
    description:
      "Satker DITRESKRIMSUS menangani kasus-kasus pidana khusus seperti korupsi, tindak pidana perbankan, kejahatan lingkungan hidup, dan perkara yang memerlukan keahlian teknis spesifik.",
    majors:
      "Hukum, Akuntansi (Akuntansi Forensik), Ekonomi, Teknik Lingkungan.",
  },
  {
    name: "Satker BIDKUM (Bidang Hukum)",
    quota: 10,
    image: accImage,
    description:
      "Satker BIDKUM memberikan bantuan hukum, saran hukum, serta telaah peraturan perundang-undangan bagi institusi Polda Jawa Tengah dalam setiap kebijakan dan tindakan operasional.",
    majors: "Ilmu Hukum.",
  },
  {
    name: "Satker KEU (Keuangan)",
    quota: 10,
    image: accImage,
    description:
      "Satker KEU bertanggung jawab atas pengelolaan anggaran, pelaporan keuangan, serta administrasi keuangan operasional Polda Jawa Tengah sesuai regulasi yang berlaku.",
    majors: "Akuntansi, Manajemen Keuangan, Administrasi Perkantoran.",
  },
  {
    name: "Satker DITSIBER (Direktorat Tindak Pidana Siber)",
    quota: 10,
    image: accImage,
    description:
      "Satker DITSIBER menangani kejahatan yang terjadi di ruang digital, termasuk penipuan online, peretasan, penyebaran konten ilegal, dan ancaman siber lainnya yang berkembang di era teknologi.",
    majors:
      "Teknik Informatika, Keamanan Siber (Cyber Security), Sistem Informasi, Sistem Cerdas (AI).",
  },
];

const MagangHero = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="py-20 text-center bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold md:text-4xl">
            Pembagian Divisi & Kuota Magang
          </h1>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="max-w-5xl px-6 mx-auto">
          <div className="space-y-4">
            {divisions.map((division, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden border rounded-lg bg-gray-50"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="flex items-center justify-between w-full px-6 py-4 font-semibold text-left text-gray-800"
                  >
                    {division.name}
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 border-t">
                      <div className="flex flex-col gap-6 mt-6 md:flex-row">
                        <div className="w-full md:w-1/3">
                          <img
                            src={division.image}
                            alt={division.name}
                            className="w-full rounded-lg shadow-md"
                          />
                        </div>

                        <div className="w-full md:w-2/3">
                          <p className="mb-2">
                            <strong>Kuota :</strong> {division.quota}
                          </p>

                          <p className="mb-2">
                            <strong>Deskripsi :</strong>
                          </p>
                          <p className="mb-4 text-sm leading-relaxed text-gray-600">
                            {division.description}
                          </p>

                          <p className="mb-2">
                            <strong>Jurusan Terkait :</strong>
                          </p>
                          <p className="text-sm text-gray-600">
                            {division.majors}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MagangHero;