import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Save } from "lucide-react";

type ProgresItem = {
  id: number;
  status: "Pending" | "On Progress" | "Done" | string;
  created_at: string;
  kegiatan: string;
  dokumentasi: string | null; // Dari server berupa nama file, bukan object File
};

const Progres = () => {
  const [data, setData] = useState<ProgresItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State untuk form tambah kegiatan baru
  const [kegiatanBaru, setKegiatanBaru] = useState("");
  const [fileBaru, setFileBaru] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // MENGAMBIL DATA DARI SERVER
  const fetchProgres = async () => {
    setLoading(true);
    const token = localStorage.getItem("auth_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/progres", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const result = await response.json();
      console.log("Data dari server:", result);
      if (response.ok && result.success) {
        setData(Array.isArray(result.data) ? result.data : []);
      }
    } catch (error) {
      console.error("Gagal menarik data progres", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgres();
  }, []);

  // MENYIMPAN KEGIATAN BARU
  const handleSaveBaru = async () => {
    if (!kegiatanBaru.trim()) {
      alert("Isi kegiatan tidak boleh kosong!");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("auth_token");
    
    // Karena ada file gambar, Wajib pakai FormData
    const formData = new FormData();
    formData.append("kegiatan", kegiatanBaru);
    if (fileBaru) {
      formData.append("dokumentasi", fileBaru);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/progres/simpan", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: formData
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        alert("✅ Laporan harian berhasil disimpan!");
        // Reset form
        setKegiatanBaru("");
        setFileBaru(null);
        // Tarik ulang data agar tabel ter-update
        fetchProgres(); 
      } else {
        alert("❌ Gagal menyimpan: " + (result.message || "Pastikan foto berformat JPG/PNG maksimal 2MB"));
      }
    } catch (error) {
      console.error("Error server:", error);
      alert("Terjadi kesalahan pada server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStatus = (status: string) => {
    if (status === "Done") return <Badge className="bg-green-500 hover:bg-green-600">Done</Badge>;
    if (status === "On Progress") return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">On Progress</Badge>;
    return <Badge variant="outline" className="text-gray-500">Pending</Badge>;
  };

  return (
    <div className="space-y-6">
      
      {/* FORM TAMBAH LAPORAN BARU */}
      <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
        <h2 className="flex items-center gap-2 mb-3 text-sm font-bold text-blue-800">
          <Plus size={16} /> Buat Laporan Harian Baru
        </h2>
        <div className="grid gap-3 md:grid-cols-12">
          <div className="md:col-span-6">
            <Input 
              placeholder="Deskripsikan pekerjaan hari ini..." 
              value={kegiatanBaru}
              onChange={(e) => setKegiatanBaru(e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="md:col-span-4">
            <Input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => setFileBaru(e.target.files?.[0] || null)}
              className="bg-white"
            />
          </div>
          <div className="md:col-span-2">
            <Button 
              className="w-full gap-2 text-white bg-blue-600 hover:bg-blue-700"
              onClick={handleSaveBaru}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Simpan
            </Button>
          </div>
        </div>
      </div>

      {/* TABEL RIWAYAT LAPORAN */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-xl">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-bold text-gray-700">Riwayat Progres Magang</h2>
        </div>

        {loading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="w-8 h-8 animate-spin text-abu" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tanggal</TableHead>
                <TableHead>Kegiatan</TableHead>
                <TableHead>Dokumentasi</TableHead>
                <TableHead className="text-right">Status Verifikasi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-gray-400">
                    Belum ada laporan kegiatan magang yang diisi.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </TableCell>
                    <TableCell>{item.kegiatan}</TableCell>
                    <TableCell>
                      {item.dokumentasi ? (
                        <a 
                          href={`http://127.0.0.1:8000/storage/progres/${item.dokumentasi}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-blue-600 underline hover:text-blue-800 text-sm"
                        >
                          Lihat Foto
                        </a>
                      ) : (
                        <span className="text-xs italic text-gray-400">Tidak ada foto</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {renderStatus(item.status || "Pending")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Progres;