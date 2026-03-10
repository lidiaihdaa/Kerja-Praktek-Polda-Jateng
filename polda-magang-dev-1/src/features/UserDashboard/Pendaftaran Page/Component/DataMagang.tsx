import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { UserPlus, Trash2 } from "lucide-react";

interface DataMagangTabProps {
  onSubmit?: (data: any) => void;
  onBack?: () => void;
}

interface Divisi {
  id: number;
  nama_divisi: string;
  sisa_kuota: number;
  kebutuhan_skill: string;
}

interface Anggota {
  nama: string;
  email: string;
  nim: string;
  tgl_lahir: string;
  universitas: string;
  jurusan: string;
}

const DataMagangTab = ({ onSubmit, onBack }: DataMagangTabProps) => {
  const [formData, setFormData] = useState({
    tgl_mulai: "",
    tgl_selesai: "",
    divisi: "",
    rekomendasi: "",
    tipe: "individu", // individu | kelompok
  });

  const [anggota, setAnggota] = useState<Anggota[]>([
    { nama: "", email: "", nim: "", tgl_lahir: "", universitas: "", jurusan: "" },
  ]);

  const [divisiOptions, setDivisiOptions] = useState<Divisi[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

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

  useEffect(() => {
    if (formData.tgl_mulai && formData.tgl_selesai) {
      const start = new Date(formData.tgl_mulai);
      const end = new Date(formData.tgl_selesai);
      const diffDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

      if (diffDays < 0) {
        setErrorMsg("Tanggal selesai tidak boleh lebih awal dari tanggal mulai.");
        setIsValid(false);
        return;
      } else if (diffDays < 30) {
        setErrorMsg("Peringatan: Durasi magang di Polda Jawa Tengah minimal 1 bulan (30 hari).");
        setIsValid(false);
        return;
      } else {
        setErrorMsg(null);
      }
    } else {
      setIsValid(false);
      return;
    }

    if (!formData.divisi) {
      setIsValid(false);
      return;
    }

    // Validasi anggota jika kelompok
    if (formData.tipe === "kelompok") {
      const anggotaValid = anggota.every(
        (a) => a.nama && a.email && a.nim && a.tgl_lahir && a.universitas && a.jurusan
      );
      setIsValid(anggotaValid);
    } else {
      setIsValid(true);
    }
  }, [formData, anggota]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnggotaChange = (index: number, field: keyof Anggota, value: string) => {
    setAnggota((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [field]: value } : a))
    );
  };

  const handleTambahAnggota = () => {
    setAnggota((prev) => [
      ...prev,
      { nama: "", email: "", nim: "", tgl_lahir: "", universitas: "", jurusan: "" },
    ]);
  };

  const handleHapusAnggota = (index: number) => {
    setAnggota((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      ...(formData.tipe === "kelompok" ? { anggota } : {}),
    };
    onSubmit?.(payload);
  };

  return (
    <div className="flex flex-col gap-6 py-4 pl-2">

      {/* Pilihan Tipe */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Tipe Pendaftaran <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipe"
              value="individu"
              checked={formData.tipe === "individu"}
              onChange={handleInputChange}
              className="accent-slate-600"
            />
            <span className="text-sm">Individu</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipe"
              value="kelompok"
              checked={formData.tipe === "kelompok"}
              onChange={handleInputChange}
              className="accent-slate-600"
            />
            <span className="text-sm">Kelompok</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Divisi */}
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
            <option value="" disabled>-- Pilih Divisi --</option>
            {divisiOptions.map((div) => (
              <option
                key={div.id}
                value={div.nama_divisi}
                disabled={div.sisa_kuota <= 0}
                className={div.sisa_kuota <= 0 ? "text-red-500 font-bold" : ""}
              >
                {div.nama_divisi}{" "}
                {div.sisa_kuota <= 0 ? "(Kuota Penuh)" : `(Sisa Kuota: ${div.sisa_kuota})`}
              </option>
            ))}
          </select>
        </div>

        {/* Rekomendasi */}
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

        {/* Tgl Mulai */}
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

        {/* Tgl Selesai */}
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

      {/* Form Anggota Kelompok */}
      {formData.tipe === "kelompok" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Data Anggota Kelompok <span className="text-red-500">*</span>
            </h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={handleTambahAnggota}
            >
              <UserPlus size={14} />
              Tambah Anggota
            </Button>
          </div>

          {anggota.map((a, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Anggota {index + 1}
                </span>
                {anggota.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleHapusAnggota(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Nama Lengkap <span className="text-red-500">*</span></label>
                  <Input
                    placeholder="Nama lengkap anggota"
                    value={a.nama}
                    onChange={(e) => handleAnggotaChange(index, "nama", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Email <span className="text-red-500">*</span></label>
                  <Input
                    type="email"
                    placeholder="Email anggota"
                    value={a.email}
                    onChange={(e) => handleAnggotaChange(index, "email", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">NIM <span className="text-red-500">*</span></label>
                  <Input
                    placeholder="NIM anggota"
                    value={a.nim}
                    onChange={(e) => handleAnggotaChange(index, "nim", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Tanggal Lahir <span className="text-red-500">*</span></label>
                  <Input
                    type="date"
                    value={a.tgl_lahir}
                    onChange={(e) => handleAnggotaChange(index, "tgl_lahir", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Universitas <span className="text-red-500">*</span></label>
                  <Input
                    placeholder="Universitas anggota"
                    value={a.universitas}
                    onChange={(e) => handleAnggotaChange(index, "universitas", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-600">Jurusan <span className="text-red-500">*</span></label>
                  <Input
                    placeholder="Jurusan anggota"
                    value={a.jurusan}
                    onChange={(e) => handleAnggotaChange(index, "jurusan", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigasi */}
      <div className="flex justify-between pt-4 mt-2">
        <Button
          variant="outline"
          className="px-8 h-10 rounded text-sm font-semibold border-gray-300 text-gray-600"
          onClick={onBack}
        >
          SEBELUMNYA
        </Button>

        <Button
          className={`px-8 h-10 rounded text-sm font-semibold transition-all ${
            isValid ? "bg-slate-500 text-white hover:bg-slate-600" : "bg-gray-300 text-gray-100"
          }`}
          disabled={!isValid}
          onClick={handleSubmit}
        >
          KIRIM PENDAFTARAN
        </Button>
      </div>
    </div>
  );
};

export default DataMagangTab;