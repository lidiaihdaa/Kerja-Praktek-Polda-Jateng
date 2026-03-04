import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, AlertCircle, LogIn, LogOut, ShieldCheck, Info, History, X, Loader2 } from "lucide-react";
import AbsenMasuk from "./AbsenMasuk";
import AbsenPulang from "./AbsenPulang";

type AbsensiView = "table" | "masuk" | "pulang";

const Absensi = () => {
  const [view, setView] = useState<AbsensiView>("table");
  const [showRiwayat, setShowRiwayat] = useState(false); // State untuk Pop-up Riwayat
  
  const [jamMasuk, setJamMasuk] = useState<string | null>(null);
  const [jamPulang, setJamPulang] = useState<string | null>(null);
  
  const [riwayatData, setRiwayatData] = useState<any[]>([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(false);

  // Fetch Absen Hari Ini
  const fetchAbsenHariIni = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/absensi/hari-ini", {
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      const result = await response.json();
      if (response.ok && result.data) {
        if (result.data.jam_masuk) setJamMasuk(result.data.jam_masuk.substring(0, 5));
        if (result.data.jam_pulang) setJamPulang(result.data.jam_pulang.substring(0, 5));
      }
    } catch (error) {
      console.error("Gagal mengambil data absen:", error);
    }
  };

  // Fetch Riwayat Lengkap
  const fetchRiwayatLengkap = async () => {
    setLoadingRiwayat(true);
    const token = localStorage.getItem("auth_token");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/absensi/riwayat", {
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
      });
      const result = await response.json();
      if (response.ok) setRiwayatData(result.data || []);
    } catch (error) {
      console.error("Gagal mengambil riwayat:", error);
    } finally {
      setLoadingRiwayat(false);
    }
  };

  useEffect(() => {
    fetchAbsenHariIni();
  }, []);

  // Buka Pop-up dan langsung tarik data
  const handleBukaRiwayat = () => {
    setShowRiwayat(true);
    fetchRiwayatLengkap();
  };

  const handleMasukSuccess = () => {
    fetchAbsenHariIni();
    setView("table");
  };

  const handlePulangSuccess = () => {
    fetchAbsenHariIni();
    setView("table");
  };

  if (view === "masuk") return <AbsenMasuk onSuccess={handleMasukSuccess} onBack={() => setView("table")} />;
  if (view === "pulang") return <AbsenPulang onSuccess={handlePulangSuccess} onBack={() => setView("table")} />;

  return (
    <div className="space-y-6">
      {/* BANNER INFORMASI */}
      <div className="flex items-start gap-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
        <Info className="w-5 h-5 mt-0.5 shrink-0 text-blue-600" />
        <p className="text-sm text-blue-800">
          <strong>Info Sistem:</strong> Absensi menggunakan verifikasi Face Recognition. Data jam masuk dan jam pulang yang telah terekam akan dikunci otomatis oleh sistem dan tidak dapat diubah secara manual.
        </p>
      </div>

      {/* RINGKASAN STATUS HARI INI */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={`p-5 border rounded-xl shadow-sm flex items-center justify-between ${jamMasuk ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${jamMasuk ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
              <LogIn size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Jam Masuk</p>
              <p className="text-lg font-bold">{jamMasuk ? `${jamMasuk} WIB` : "-- : --"}</p>
            </div>
          </div>
          {!jamMasuk && (
            <Button onClick={() => setView("masuk")} className="bg-blue-600 hover:bg-blue-700">Absen Masuk</Button>
          )}
        </div>

        <div className={`p-5 border rounded-xl shadow-sm flex items-center justify-between ${jamPulang ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${jamPulang ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
              <LogOut size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Jam Pulang</p>
              <p className="text-lg font-bold">{jamPulang ? `${jamPulang} WIB` : "-- : --"}</p>
            </div>
          </div>
          {jamMasuk && !jamPulang && (
            <Button onClick={() => setView("pulang")} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">Absen Pulang</Button>
          )}
        </div>
      </div>

      {/* TABEL AKTIVITAS HARI INI */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-xl">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="font-bold text-gray-700">Log Kehadiran Anda</h2>
          <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
             <span className="px-3 py-1 bg-gray-200 rounded-full">
                {new Date().toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
             </span>
             {/* TOMBOL RIWAYAT BARU */}
             <Button variant="outline" size="sm" className="h-8 gap-2 text-blue-600 border-blue-200 hover:bg-blue-50" onClick={handleBukaRiwayat}>
                <History size={14} /> Riwayat Lengkap
             </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipe</TableHead>
              <TableHead>Waktu Tercatat</TableHead>
              <TableHead>Metode</TableHead>
              <TableHead className="text-right">Status Verifikasi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold text-gray-700">Absen Masuk</TableCell>
              <TableCell>
                {jamMasuk ? <span className="flex items-center gap-2 font-bold text-green-600"><CheckCircle size={16} /> {jamMasuk} WIB</span> : <span className="flex items-center gap-2 italic text-gray-400"><AlertCircle size={16} /> Belum Absen</span>}
              </TableCell>
              <TableCell className="text-sm text-gray-500">{jamMasuk ? "Face Recognition" : "-"}</TableCell>
              <TableCell className="text-right">
                {jamMasuk ? <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full"><ShieldCheck size={14} /> Valid</span> : "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-gray-700">Absen Pulang</TableCell>
              <TableCell>
                {jamPulang ? <span className="flex items-center gap-2 font-bold text-blue-600"><CheckCircle size={16} /> {jamPulang} WIB</span> : <span className="flex items-center gap-2 italic text-gray-400"><AlertCircle size={16} /> Belum Absen</span>}
              </TableCell>
              <TableCell className="text-sm text-gray-500">{jamPulang ? "Face Recognition" : "-"}</TableCell>
              <TableCell className="text-right">
                {jamPulang ? <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"><ShieldCheck size={14} /> Valid</span> : "-"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* ======================================================= */}
      {/* POP-UP (MODAL) RIWAYAT LENGKAP */}
      {/* ======================================================= */}
      {showRiwayat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-xl max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                <History size={20} className="text-blue-600" /> Riwayat Kehadiran Lengkap
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowRiwayat(false)} className="rounded-full hover:bg-gray-200">
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-4 overflow-y-auto">
              {loadingRiwayat ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <Loader2 className="w-8 h-8 mb-4 animate-spin text-blue-600" />
                  <p>Memuat data riwayat...</p>
                </div>
              ) : riwayatData.length === 0 ? (
                <div className="py-20 text-center text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Belum ada riwayat absensi yang tercatat.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jam Masuk</TableHead>
                      <TableHead>Jam Pulang</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {riwayatData.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {new Date(item.tanggal).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </TableCell>
                        <TableCell className="font-bold text-green-600">
                          {item.jam_masuk ? `${item.jam_masuk.substring(0, 5)} WIB` : "-"}
                        </TableCell>
                        <TableCell className="font-bold text-blue-600">
                          {item.jam_pulang ? `${item.jam_pulang.substring(0, 5)} WIB` : "-"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex px-2.5 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
            <div className="p-4 text-right border-t bg-gray-50">
              <Button onClick={() => setShowRiwayat(false)}>Tutup</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Absensi;