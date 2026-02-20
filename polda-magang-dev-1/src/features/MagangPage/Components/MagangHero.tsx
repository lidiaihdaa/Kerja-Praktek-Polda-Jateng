import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import accImage from "@/assets/img/acc.png";

const divisions = [
  {
    name: "Hukum",
    quota: 35,
    image: accImage,
    description:
      "Divisi Hukum bertanggung jawab pada kajian regulasi, pendampingan hukum, dan analisis peraturan yang berlaku.",
    majors: "Ilmu Hukum, Hukum Pidana, Hukum Perdata, dan jurusan terkait.",
  },
  {
    name: "Ekonomi",
    quota: 25,
    image: accImage,
    description:
      "Divisi Ekonomi fokus pada analisis keuangan, pengelolaan anggaran, dan perencanaan ekonomi organisasi.",
    majors: "Manajemen, Akuntansi, Ekonomi Pembangunan, dan jurusan terkait.",
  },
  {
    name: "Teknik Informatika dan Sistem Informasi",
    quota: 40,
    image: accImage,
    description:
      "Divisi TI mengelola pengembangan sistem, pemeliharaan aplikasi, dan dukungan teknologi informasi.",
    majors: "Teknik Informatika, Sistem Informasi, Rekayasa Perangkat Lunak.",
  },
  {
    name: "Psikologi",
    quota: 20,
    image: accImage,
    description:
      "Divisi Psikologi mendukung analisis perilaku, asesmen psikologis, dan kegiatan konseling.",
    majors: "Psikologi dan jurusan terkait.",
  },
  {
    name: "Humas - Ilmu Komunikasi",
    quota: 30,
    image: accImage,
    description:
      "Divisi Humas bertugas mengelola komunikasi publik, media, dan hubungan masyarakat.",
    majors:
      "Ilmu Komunikasi, Public Relations, Jurnalistik, dan jurusan terkait.",
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
                        {/* Image */}
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
