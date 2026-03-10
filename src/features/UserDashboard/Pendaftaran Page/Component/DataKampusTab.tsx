import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DataKampusTabProps {
  onNext?: (data: any) => void;
  onBack?: () => void; 
}

const DataKampusTab = ({ onNext, onBack }: DataKampusTabProps) => {
  // 🔥 PERBAIKAN: Ubah 'namaKampus' menjadi 'universitas'
  const [formData, setFormData] = useState({
    universitas: "", 
    fakultas: "",
    jurusan: "",
    nim: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormLengkap = Object.values(formData).every((val) => val.trim() !== "");

  return (
    <div className="flex flex-col gap-6 py-4 pl-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nama Perguruan Tinggi <span className="text-red-500">*</span></label>
          {/* 🔥 PERBAIKAN: name dan value disesuaikan jadi 'universitas' */}
          <Input name="universitas" placeholder="Contoh: Universitas Dian Nuswantoro" value={formData.universitas} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Fakultas <span className="text-red-500">*</span></label>
          <Input name="fakultas" placeholder="Contoh: Fakultas Ilmu Komputer" value={formData.fakultas} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Jurusan / Program Studi <span className="text-red-500">*</span></label>
          <Input name="jurusan" placeholder="Contoh: Teknik Informatika" value={formData.jurusan} onChange={handleInputChange} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">NIM <span className="text-red-500">*</span></label>
          <Input name="nim" placeholder="Masukkan Nomor Induk Mahasiswa" value={formData.nim} onChange={handleInputChange} />
        </div>

      </div>

      <div className="flex justify-between pt-4 mt-2">
        <Button variant="outline" className="px-8 h-10 rounded text-sm font-semibold border-gray-300 text-gray-600" onClick={onBack}>
          SEBELUMNYA
        </Button>

        <Button
          className={`px-8 h-10 rounded text-sm font-semibold transition-all ${isFormLengkap ? "bg-slate-500 text-white hover:bg-slate-600" : "bg-gray-300 text-gray-100"}`}
          disabled={!isFormLengkap}
          onClick={() => onNext?.(formData)}
        >
          SELANJUTNYA
        </Button>
      </div>
    </div>
  );
};

export default DataKampusTab;