import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Download, Calendar, Pencil, ArrowLeft, Users, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BASE = "http://127.0.0.1:8000/api/admin";

type Mahasiswa = {
  id: number;
  nama: string;
  nim: string;
  universitas: string;
  divisi: string;
  nilai: number | null;
  keterangan: string | null;
};

type Grup = {
  id: number;
  nama: string;
  tipe: "kelompok" | "individu";
  anggota: Mahasiswa[];
};

const DetailPenilaian = () => {
  const { id: divisiParam } = useParams();
  const navigate = useNavigate();
  const divisi = decodeURIComponent(divisiParam ?? "");
  const token = localStorage.getItem("auth_token");

  const [grups, setGrups] = useState<Grup[]>([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/kelompok?divisi=${encodeURIComponent(divisi)}`, { headers });
      const data = await res.json();

      if (res.ok && Array.isArray(data.data)) {
        setGrups(
          data.data.map((g: any) => ({
            id: g.id,
            nama: g.nama,
            tipe: g.tipe,
            anggota: g.mahasiswa ?? [],
          }))
        );
      }
    } catch (err) {
      console.error("Gagal fetch data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [divisi]);

  const handleChangeNilai = (
    grupId: number,
    mahasiswaId: number,
    field: "nilai" | "keterangan",
    value: string
  ) => {
    setGrups((prev) =>
      prev.map((g) =>
        g.id === grupId
          ? { ...g, anggota: g.anggota.map((m) => m.id === mahasiswaId ? { ...m, [field]: value } : m) }
          : g
      )
    );
  };

  const handleSimpanNilai = async (item: Mahasiswa) => {
    try {
      const res = await fetch(`${BASE}/penilaian/${item.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ nilai: item.nilai, keterangan: item.keterangan }),
      });
      if (res.ok) {
        toast.success(`Nilai ${item.nama} berhasil disimpan`);
      } else {
        toast.error("Gagal menyimpan nilai");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="ghost" onClick={() => navigate("/admin/penilaian")}>
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-3xl font-bold">Penilaian — {divisi}</h1>
      </div>

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

      {loading ? (
        <p>Memuat data...</p>
      ) : grups.length === 0 ? (
        <p className="text-muted-foreground">Belum ada mahasiswa diterima di divisi ini.</p>
      ) : (
        <div className="space-y-4">
          {grups.map((grup) => (
            <Card key={grup.id} className="border">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-2">
                  {grup.tipe === "kelompok" ? (
                    <Users size={18} className="text-blue-500" />
                  ) : (
                    <User size={18} className="text-green-500" />
                  )}
                  <h3 className="text-base font-semibold">{grup.nama}</h3>
                  <span className="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-gray-100 rounded-full">
                    {grup.tipe}
                  </span>
                </div>

                {grup.anggota.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{item.nama.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold">{item.nama}</h4>
                          <p className="text-xs text-muted-foreground">
                            {item.nim} • {item.universitas}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">Nilai</label>
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              value={item.nilai ?? ""}
                              onChange={(e) => handleChangeNilai(grup.id, item.id, "nilai", e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">Keterangan</label>
                            <Input
                              value={item.keterangan ?? ""}
                              onChange={(e) => handleChangeNilai(grup.id, item.id, "keterangan", e.target.value)}
                            />
                          </div>
                        </div>
                        <Button size="sm" className="gap-2" onClick={() => handleSimpanNilai(item)}>
                          <Pencil size={14} />
                          Simpan Nilai
                        </Button>
                      </div>
                    </div>
                    {index < grup.anggota.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailPenilaian;