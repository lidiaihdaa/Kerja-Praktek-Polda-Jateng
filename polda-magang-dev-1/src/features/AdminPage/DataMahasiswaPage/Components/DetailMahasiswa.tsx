import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Download, Calendar, Pencil, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface MahasiswaDetail {
  id: number;
  nama: string;
  email: string;
  no_hp: string;
  universitas: string;
  jurusan: string;
  fakultas: string;
  nim: string;
  divisi: string;
  tgl_mulai: string;
  tgl_selesai: string;
  foto_profil: string | null;
  berkas_cv: string | null;
  berkas_surat_pengantar: string | null;
  berkas_proposal: string | null;
  status: string;
  user: { name: string; email: string };
}

const DetailMahasiswa = () => {
  const { id } = useParams();
  const token = localStorage.getItem("auth_token");

  const [mahasiswa, setMahasiswa] = useState<MahasiswaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    universitas: "",
    jurusan: "",
    fakultas: "",
    nim: "",
    divisi: "",
    tgl_mulai: "",
    tgl_selesai: "",
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/admin/mahasiswa/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const data = res.data.data;
      setMahasiswa(data);
      setForm({
        nama: data.nama ?? "",
        email: data.email ?? "",
        no_hp: data.no_hp ?? "",
        universitas: data.universitas ?? "",
        jurusan: data.jurusan ?? "",
        fakultas: data.fakultas ?? "",
        nim: data.nim ?? "",
        divisi: data.divisi ?? "",
        tgl_mulai: data.tgl_mulai ?? "",
        tgl_selesai: data.tgl_selesai ?? "",
      });
    })
    .catch((err) => {
      console.error("Gagal fetch:", err);
      toast.error("Gagal memuat data mahasiswa");
    })
    .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/admin/mahasiswa/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Data mahasiswa berhasil diupdate");
    } catch {
      toast.error("Gagal mengupdate data");
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadBerkas = (jenis: string) => {
    window.open(
      `http://127.0.0.1:8000/api/admin/mahasiswa/${id}/download/${jenis}`,
      "_blank"
    );
  };

  if (loading) return <p className="p-6">Memuat data...</p>;
  if (!mahasiswa) return <p className="p-6">Data tidak ditemukan</p>;

  const fotoUrl = mahasiswa.foto_profil
    ? `http://127.0.0.1:8000/storage/fotos/${mahasiswa.foto_profil}`
    : "https://i.pravatar.cc/200?img=47";

  const berkasItems = [
    { label: "CV", key: "berkas_cv", filename: mahasiswa.berkas_cv },
    { label: "Proposal Magang", key: "berkas_proposal", filename: mahasiswa.berkas_proposal },
    { label: "Surat Pengantar Kampus", key: "berkas_surat_pengantar", filename: mahasiswa.berkas_surat_pengantar },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Laporan</h1>

      <div className="flex gap-2">
        <Button size="sm" className="gap-2 bg-abu hover:bg-abu/90">
          <Download size={14} />
          Download
        </Button>
        <Button size="sm" variant="outline" className="gap-2">
          <Calendar size={14} />
          Pilih Tgl
        </Button>
      </div>

      <h2 className="text-lg font-semibold">Laporan Data Mahasiswa</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-shrink-0">
              <div className="w-40 h-48 overflow-hidden border-2 border-yellow-600 rounded-lg bg-gray-50">
                <img src={fotoUrl} alt="Profile" className="object-cover w-full h-full" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid items-center grid-cols-1 md:grid-cols-[160px_1fr] gap-y-4 gap-x-4">
                {[
                  { label: "Nama Lengkap", key: "nama" },
                  { label: "Email", key: "email" },
                  { label: "No. HP Aktif", key: "no_hp" },
                  { label: "NIM", key: "nim" },
                  { label: "Universitas", key: "universitas" },
                  { label: "Jurusan", key: "jurusan" },
                  { label: "Fakultas", key: "fakultas" },
                  { label: "Divisi", key: "divisi" },
                  { label: "Tgl Mulai", key: "tgl_mulai" },
                  { label: "Tgl Selesai", key: "tgl_selesai" },
                ].map(({ label, key }) => (
                  <>
                    <span key={`label-${key}`} className="text-sm font-semibold">{label}</span>
                    <Input
                      key={`input-${key}`}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* Berkas */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold">Berkas</h3>
            <div className="flex flex-wrap gap-8">
              {berkasItems.map(({ label, key, filename }) => (
                <div key={key} className="space-y-2">
                  <span className="text-sm font-medium">{label} :</span>
                  <div
                    className={`flex flex-col items-center gap-1 ${filename ? "cursor-pointer" : ""}`}
                    onClick={() => filename && handleDownloadBerkas(key)}
                    title={filename ? "Klik untuk download" : "Belum ada berkas"}
                  >
                    <div className={`flex items-center justify-center w-16 h-20 rounded transition-colors ${filename ? "bg-blue-50 hover:bg-blue-100" : "bg-gray-100"}`}>
                      <FileText size={36} className={filename ? "text-blue-400" : "text-gray-400"} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {filename ?? "Belum ada"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button
              className="gap-2 bg-abu hover:bg-abu/90"
              onClick={handleUpdate}
              disabled={saving}
            >
              <Pencil size={14} />
              {saving ? "Menyimpan..." : "Update"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailMahasiswa;