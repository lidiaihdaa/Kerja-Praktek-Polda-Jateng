import { useState } from "react";
interface KuotaMagang {
  id: number;
  nama_divisi: string;
  sisa_kuota: number;
  kebutuhan_skill: string;
}
const Hero = () => {
  const [dataKuota, setDataKuota] = useState<KuotaMagang[]>([]);
  const cekKuotaMagang = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/kuota-magang");
      const result = await response.json();
      setDataKuota(result.data);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Gagal terhubung ke server backend.");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center h-[75vh] md:h-screen px-6 text-center text-white">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
          SIMAGANG POLDA JATENG
        </h1>

        <p className="mb-8 text-sm md:text-base">
          Wujudkan potensi Anda Bersama Polda Jawa Tengah
        </p>

        <button
          onClick={cekKuotaMagang}
          className="px-6 py-3 text-sm transition rounded bg-biru hover:bg-birutua"
        >
          Lihat Kuota
        </button>
        {dataKuota.length > 0 && (
          <div className="mt-8 bg-white text-black p-5 rounded-lg shadow-lg w-full text-left transition-all">
            <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">
              Daftar Kebutuhan Divisi
            </h3>
            <ul className="space-y-3">
              {dataKuota.map((item) => (
                <li
                  key={item.id}
                  className="p-3 border rounded-md flex justify-between items-center bg-gray-50"
                >
                  <div>
                    <p className="font-bold text-gray-800">
                      {item.nama_divisi}
                    </p>
                    <p className="text-sm text-gray-600">
                      Dicari: {item.kebutuhan_skill}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded text-white text-sm font-semibold ${item.sisa_kuota > 0 ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {item.sisa_kuota > 0
                        ? `Sisa: ${item.sisa_kuota}`
                        : "Penuh"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setDataKuota([])}
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Tutup Daftar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
