import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Download, Calendar, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

type Mahasiswa = {
  id: number;
  nama: string;
  nim: string;
  universitas: string;
  divisi: string;
  nilai: number | null;
  keterangan: string | null;
};

const DetailPenilaian = () => {

  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMahasiswa = async () => {

    try {

      const token = localStorage.getItem("auth_token");

      const res = await fetch(
        "http://127.0.0.1:8000/api/admin/penilaian",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await res.json();

      if (res.ok) {

        if (Array.isArray(result.data)) {
          setMahasiswa(result.data);
        }

      }

    } catch (error) {
      console.error("Gagal mengambil data mahasiswa");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const handleChange = (
    id: number,
    field: "nilai" | "keterangan",
    value: string
  ) => {

    setMahasiswa((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      )
    );

  };

  const updateNilai = async (item: Mahasiswa) => {

    try {

      const token = localStorage.getItem("auth_token");

      await fetch(
        `http://127.0.0.1:8000/api/admin/penilaian/${item.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nilai: item.nilai,
            keterangan: item.keterangan,
          }),
        }
      );

    } catch (error) {
      console.error("Gagal update nilai");
    }

  };

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Penilaian Mahasiswa Magang
      </h1>

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

      <Card>

        <CardContent className="p-6 space-y-6">

          <h3 className="text-lg font-semibold">
            Daftar Mahasiswa
          </h3>

          {loading ? (
            <p>Memuat data...</p>
          ) : mahasiswa.length === 0 ? (
            <p>Tidak ada mahasiswa</p>
          ) : (

            mahasiswa.map((item, index) => (

              <div key={item.id}>

                <div className="flex items-start gap-4">

                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      {item.nama.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">

                    <div>

                      <h4 className="text-sm font-semibold">
                        {item.nama}
                      </h4>

                      <p className="text-xs text-muted-foreground">
                        {item.nim} • {item.universitas} • {item.divisi}
                      </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div className="space-y-1">

                        <label className="text-xs font-medium text-muted-foreground">
                          Nilai
                        </label>

                        <Input
                          type="number"
                          value={item.nilai ?? ""}
                          onChange={(e) =>
                            handleChange(
                              item.id,
                              "nilai",
                              e.target.value
                            )
                          }
                        />

                      </div>

                      <div className="space-y-1">

                        <label className="text-xs font-medium text-muted-foreground">
                          Keterangan
                        </label>

                        <Input
                          value={item.keterangan ?? ""}
                          onChange={(e) =>
                            handleChange(
                              item.id,
                              "keterangan",
                              e.target.value
                            )
                          }
                        />

                      </div>

                    </div>

                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => updateNilai(item)}
                    >
                      <Pencil size={14} />
                      Simpan Nilai
                    </Button>

                  </div>

                </div>

                {index < mahasiswa.length - 1 && (
                  <Separator className="mt-5" />
                )}

              </div>

            ))

          )}

        </CardContent>

      </Card>

    </div>

  );
};

export default DetailPenilaian;