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

  cv?: File | null;
  surat_pengantar?: File | null;
  proposal?: File | null;
}

const DataMagangTab = ({ onSubmit, onBack }: DataMagangTabProps) => {
  const [formData, setFormData] = useState({
    tgl_mulai: "",
    tgl_selesai: "",
    divisi: "",
    rekomendasi: "",
    tipe: "individu",
  });

  const [divisiOptions, setDivisiOptions] = useState<Divisi[]>([]);
  const [selectedKuota, setSelectedKuota] = useState<number | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const [cv, setCv] = useState<File | null>(null);
  const [suratPengantar, setSuratPengantar] = useState<File | null>(null);
  const [proposal, setProposal] = useState<File | null>(null);

  const [anggota, setAnggota] = useState<Anggota[]>([
    {
      nama: "",
      email: "",
      nim: "",
      tgl_lahir: "",
      universitas: "",
      jurusan: "",
      cv: null,
      surat_pengantar: null,
      proposal: null,
    },
  ]);

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
        console.error("Error fetch divisi:", error);
      }
    };

    fetchDivisi();
  }, []);

  useEffect(() => {
    if (!formData.tgl_mulai || !formData.tgl_selesai) {
      setIsValid(false);
      return;
    }

    const start = new Date(formData.tgl_mulai);
    const end = new Date(formData.tgl_selesai);

    const diffDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

    if (diffDays < 0) {
      setErrorMsg("Tanggal selesai tidak boleh lebih awal dari tanggal mulai.");
      setIsValid(false);
      return;
    }

    if (diffDays < 30) {
      setErrorMsg("Durasi minimal magang adalah 1 bulan (30 hari).");
      setIsValid(false);
      return;
    }

    setErrorMsg(null);

    if (!formData.divisi) {
      setIsValid(false);
      return;
    }

    if (!cv || !suratPengantar || !proposal) {
      setIsValid(false);
      return;
    }

    if (formData.tipe === "kelompok") {
      const anggotaValid = anggota.every(
        (a) =>
          a.nama &&
          a.email &&
          a.nim &&
          a.tgl_lahir &&
          a.universitas &&
          a.jurusan &&
          a.cv &&
          a.surat_pengantar &&
          a.proposal,
      );

      setIsValid(anggotaValid);
    } else {
      setIsValid(true);
    }
  }, [formData, anggota, cv, suratPengantar, proposal]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "divisi") {
      const selected = divisiOptions.find((d) => d.nama_divisi === value);

      setSelectedKuota(selected?.sisa_kuota || 0);
    }
  };

  const handleAnggotaChange = (
    index: number,
    field: keyof Anggota,
    value: any,
  ) => {
    setAnggota((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [field]: value } : a)),
    );
  };

  const handleTambahAnggota = () => {
    setAnggota((prev) => [
      ...prev,
      {
        nama: "",
        email: "",
        nim: "",
        tgl_lahir: "",
        universitas: "",
        jurusan: "",
        cv: null,
        surat_pengantar: null,
        proposal: null,
      },
    ]);
  };

  const handleHapusAnggota = (index: number) => {
    setAnggota((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      cv,
      surat_pengantar: suratPengantar,
      proposal,
      anggota: formData.tipe === "kelompok" ? anggota : [],
    };

    onSubmit?.(payload);
  };

  return (
    <div className="flex flex-col gap-6 py-4 pl-2">
      {/* TIPE PENDAFTARAN */}

      <div className="space-y-2">
        <label className="text-sm font-medium">Tipe Pendaftaran</label>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipe"
              value="individu"
              checked={formData.tipe === "individu"}
              onChange={handleInputChange}
            />
            Individu
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipe"
              value="kelompok"
              checked={formData.tipe === "kelompok"}
              onChange={handleInputChange}
            />
            Kelompok
          </label>
        </div>
      </div>

      {/* DATA MAGANG */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Divisi Tujuan</label>

          <select
            name="divisi"
            value={formData.divisi}
            onChange={handleInputChange}
            className="h-10 border rounded-md px-3"
          >
            <option value="">-- Pilih Divisi --</option>

            {divisiOptions.map((div) => (
              <option
                key={div.id}
                value={div.nama_divisi}
                disabled={div.sisa_kuota <= 0}
              >
                {div.nama_divisi}{" "}
                {div.sisa_kuota <= 0
                  ? "(Kuota Penuh)"
                  : `(Sisa ${div.sisa_kuota})`}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Surat Rekomendasi Kampus
          </label>

          <Input
            name="rekomendasi"
            placeholder="Nama dosen / instansi"
            value={formData.rekomendasi}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Mulai Magang</label>

          <Input
            type="date"
            name="tgl_mulai"
            value={formData.tgl_mulai}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Selesai Magang</label>

          <Input
            type="date"
            name="tgl_selesai"
            value={formData.tgl_selesai}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded text-sm">
          ⚠ {errorMsg}
        </div>
      )}

      {/* UPLOAD BERKAS KETUA */}

      <div className="space-y-4 border-t pt-6">
        <h3 className="font-semibold">Upload Berkas</h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">CV (PDF)</label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setCv(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Surat Pengantar Kampus (PDF)
            </label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setSuratPengantar(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Proposal Magang (PDF)</label>
            <Input
              type="file"
              accept=".pdf"
              onChange={(e) => setProposal(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      </div>

      {/* ANGGOTA KELOMPOK */}

      {formData.tipe === "kelompok" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Anggota Kelompok</h3>

            <Button size="sm" variant="outline" onClick={handleTambahAnggota}>
              <UserPlus size={14} /> Tambah
            </Button>
          </div>

          {anggota.map((a, index) => (
            <div key={index} className="p-4 border rounded space-y-3">
              <span className="text-sm font-medium">Anggota {index + 1}</span>

              <div className="grid md:grid-cols-2 gap-3">
                <Input
                  placeholder="Nama"
                  onChange={(e) =>
                    handleAnggotaChange(index, "nama", e.target.value)
                  }
                />

                <Input
                  placeholder="Email"
                  onChange={(e) =>
                    handleAnggotaChange(index, "email", e.target.value)
                  }
                />

                <Input
                  placeholder="NIM"
                  onChange={(e) =>
                    handleAnggotaChange(index, "nim", e.target.value)
                  }
                />

                <Input
                  type="date"
                  onChange={(e) =>
                    handleAnggotaChange(index, "tgl_lahir", e.target.value)
                  }
                />

                <Input
                  placeholder="Universitas"
                  onChange={(e) =>
                    handleAnggotaChange(index, "universitas", e.target.value)
                  }
                />

                <Input
                  placeholder="Jurusan"
                  onChange={(e) =>
                    handleAnggotaChange(index, "jurusan", e.target.value)
                  }
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm">CV (PDF)</label>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      handleAnggotaChange(index, "cv", e.target.files?.[0])
                    }
                  />
                </div>

                <div>
                  <label className="text-sm">Surat Pengantar</label>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      handleAnggotaChange(
                        index,
                        "surat_pengantar",
                        e.target.files?.[0],
                      )
                    }
                  />
                </div>

                <div>
                  <label className="text-sm">Proposal</label>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      handleAnggotaChange(
                        index,
                        "proposal",
                        e.target.files?.[0],
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          SEBELUMNYA
        </Button>

        <Button disabled={!isValid} onClick={handleSubmit}>
          KIRIM PENDAFTARAN
        </Button>
      </div>
    </div>
  );
};

export default DataMagangTab;
