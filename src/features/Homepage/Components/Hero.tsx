import { useState, useEffect } from "react";

interface Divisi {
  id: number;
  nama_divisi: string;
  sisa_kuota: number;
}

const Hero = () => {
  const [open, setOpen] = useState(false);
  const [divisi, setDivisi] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchKuota = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/api/kuota-magang");
      const data = await res.json();

      if (data.status === "success") {
        setDivisi(data.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil kuota:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchKuota();
    }
  }, [open]);

  return (
    <>
      <section className="flex flex-col items-center justify-center h-[75vh] md:h-screen px-6 text-center text-white">
        <div className="flex flex-col items-center justify-center w-full max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            SIMAGANG POLDA JATENG
          </h1>

          <p className="mb-8 text-sm md:text-base">
            Wujudkan potensi Anda Bersama Polda Jawa Tengah
          </p>

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 text-sm transition rounded bg-biru hover:bg-birutua"
          >
            Lihat Kuota
          </button>
        </div>
      </section>

      {/* POPUP KUOTA */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-xl">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Kuota Magang Polda Jateng
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-red-500 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Memuat data...</p>
            ) : divisi.length === 0 ? (
              <p className="text-center text-gray-500">
                Data kuota belum tersedia
              </p>
            ) : (
              <div className="space-y-3">
                {divisi.map((d) => (
                  <div
                    key={d.id}
                    className="flex justify-between items-center border p-3 rounded"
                  >
                    <span className="font-medium">{d.nama_divisi}</span>

                    <span
                      className={`font-semibold ${
                        d.sisa_kuota === 0
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {d.sisa_kuota === 0
                        ? "Penuh"
                        : `Sisa ${d.sisa_kuota}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;