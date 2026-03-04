import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface DataMagangTabProps {
  onSubmit?: (data: any) => void;
  onBack?: () => void;
}

// Interface untuk data dari API
interface Divisi {
  id: number;
  nama_divisi: string;
  sisa_kuota: number;
  kebutuhan_skill: string;
}

const DataMagangTab = ({ onSubmit, onBack }: DataMagangTabProps) => {
  // 🔥 PERBAIKAN 1: Ubah nama variabel menjadi tgl_mulai dan tgl_selesai
  const [formData, setFormData] = useState({
    tgl_mulai: "",
    tgl_selesai: "",
    divisi: "",
    rekomendasi: "",
  });

  const [divisiOptions, setDivisiOptions] = useState<Divisi[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  // 1. Ambil Data Kuota Divisi dari Laravel saat halaman dimuat
  useEffect(() => {
    const fetchDivisi = async () => {
      try {
        const token = localStorage.getItem("auth_token");

        const response = await fetch("http://127.0.0.1:8000/api/kuota-magang", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (result.status === "success") {
          setDivisiOptions(result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data divisi:", error);
      }
    };

    fetchDivisi();
  }, []);

  // 2. Validasi Durasi (Minimal 30 Hari) dan kelengkapan data
  useEffect(() => {
    // 🔥 PERBAIKAN 2: Sesuaikan pengecekan dengan variabel baru
    if (formData.tgl_mulai && formData.tgl_selesai) {
      const start = new Date(formData.tgl_mulai);
      const end = new Date(formData.tgl_selesai);

      const diffTime = end.getTime() - start.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

      if (diffDays < 0) {
        setErrorMsg(
          "Tanggal selesai tidak boleh lebih awal dari tanggal mulai.",
        );
        setIsValid(false);
      } else if (diffDays < 30) {
        setErrorMsg(
          "Peringatan: Durasi magang di Polda Jawa Tengah minimal 1 bulan (30 hari).",
        );
        setIsValid(false);
      } else {
        setErrorMsg(null);
        // Pastikan divisi juga sudah dipilih
        if (formData.divisi !== "") {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-6 py-4 pl-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DROPDOWN DIVISI DINAMIS DARI DATABASE */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Divisi Tujuan <span className="text-red-500">*</span>
          </label>
          <select
            name="divisi"
            value={formData.divisi}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              -- Pilih Divisi --
            </option>
            {divisiOptions.map((div) => (
              <option
                key={div.id}
                value={div.nama_divisi}
                disabled={div.sisa_kuota <= 0} // Kunci opsi jika kuota habis
                className={div.sisa_kuota <= 0 ? "text-red-500 font-bold" : ""}
              >
                {div.nama_divisi}{" "}
                {div.sisa_kuota <= 0
                  ? "(Kuota Penuh)"
                  : `(Sisa Kuota: ${div.sisa_kuota})`}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Surat Rekomendasi (Dari Kampus)
          </label>
          <Input
            name="rekomendasi"
            placeholder="Nama Instansi/Dosen Pemberi Rekomendasi"
            value={formData.rekomendasi}
            onChange={handleInputChange}
          />
        </div>

        {/* 🔥 PERBAIKAN 3: Ubah atribut name dan value */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Mulai Magang <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="tgl_mulai"
            value={formData.tgl_mulai}
            onChange={handleInputChange}
          />
        </div>

        {/* 🔥 PERBAIKAN 4: Ubah atribut name dan value */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Selesai Magang <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="tgl_selesai"
            value={formData.tgl_selesai}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-md">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* DUA TOMBOL NAVIGASI */}
      <div className="flex justify-between pt-4 mt-2">
        <Button
          variant="outline"
          className="px-8 h-10 rounded text-sm font-semibold border-gray-300 text-gray-600"
          onClick={onBack}
        >
          SEBELUMNYA
        </Button>

        <Button
          className={`px-8 h-10 rounded text-sm font-semibold transition-all ${isValid ? "bg-slate-500 text-white hover:bg-slate-600" : "bg-gray-300 text-gray-100"}`}
          disabled={!isValid}
          onClick={() => onSubmit?.(formData)}
        >
          KIRIM PENDAFTARAN
        </Button>
      </div>
    </div>
  );
};

export default DataMagangTab;
