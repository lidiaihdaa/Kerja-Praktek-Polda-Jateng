import { useEffect, useState } from "react";
import axios from "axios";
import ChartsPage from "./Components/ChartsPage";
import Pendaftar from "./Components/Pendaftar";
import { StatCard } from "./Components/StatCard";
import type { CardsData } from "./Components/StatCard";
import { Button } from "@/components/ui/button";
import { Download, Calendar, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Mahasiswa {
  id: number;
  universitas: string;
  jurusan: string;
  status: string;
  user: { name: string; email: string };
}

interface RecentStudent {
  id: number;
  universitas: string;
  jurusan: string;
  user: { name: string };
}

const DashboardPage = () => {
  const [cards, setCards] = useState<CardsData | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pendaftar, setPendaftar] = useState<Mahasiswa[]>([]);
  const [recent, setRecent] = useState<RecentStudent[]>([]);

  const fetchDashboard = (start?: string, end?: string) => {
    const token = localStorage.getItem("auth_token");
    const params: any = {};
    if (start && end) {
      params.start_date = start;
      params.end_date = end;
    }

    axios.get("http://127.0.0.1:8000/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    })
    .then((res) => {
      setCards(res.data.cards);
      setRecent(res.data.recent_students || []);
    })
    .catch((err) => console.error("Gagal fetch dashboard:", err));
  };

  const fetchPendaftar = () => {
    const token = localStorage.getItem("auth_token");
    console.log("token:", token); // ← cek token ada tidak
    axios.get("http://127.0.0.1:8000/api/admin/pendaftar", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("pendaftar response:", res.data); // ← cek response
      setPendaftar(res.data.data || []);
    })
    .catch((err) => console.error("Gagal fetch pendaftar:", err));
  };

  useEffect(() => {
    fetchDashboard();
    fetchPendaftar();
  }, []);

  const handleApplyDate = () => {
    if (startDate && endDate) {
      fetchDashboard(startDate, endDate);
      setShowDatePicker(false);
    }
  };

  const handleResetDate = () => {
    setStartDate("");
    setEndDate("");
    setShowDatePicker(false);
    fetchDashboard();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    // Header
    doc.setFontSize(16);
    doc.text("Laporan Dashboard Magang Polda Jateng", 14, y);
    y += 8;

    if (startDate && endDate) {
      doc.setFontSize(10);
      doc.text(`Periode: ${startDate} s/d ${endDate}`, 14, y);
      y += 6;
    }

    doc.setFontSize(10);
    doc.text(`Dicetak: ${new Date().toLocaleDateString("id-ID")}`, 14, y);
    y += 10;

    // Tabel Statistik
    doc.setFontSize(12);
    doc.text("Ringkasan Statistik", 14, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [["Kategori", "Jumlah"]],
      body: [
        ["Pendaftar Baru", String(cards?.pendaftar ?? 0)],
        ["Pemagang Aktif", String(cards?.aktif ?? 0)],
        ["Total Instansi Mitra", String(cards?.instansi ?? 0)],
        ["Rata - Rata Nilai Alumni", String(cards?.nilai ?? 0)],
      ],
      theme: "striped",
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // Tabel Mahasiswa Magang Baru
    doc.setFontSize(12);
    doc.text("Mahasiswa Magang Baru (5 Terbaru)", 14, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [["Nama", "Universitas", "Jurusan"]],
      body: recent.map((mhs) => [
        mhs.user?.name ?? "-",
        mhs.universitas ?? "-",
        mhs.jurusan ?? "-",
      ]),
      theme: "striped",
    });

    y = (doc as any).lastAutoTable.finalY + 10;

    // Tabel Pendaftar
    doc.setFontSize(12);
    doc.text("Data Pendaftar", 14, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [["Nama", "Email", "Universitas", "Jurusan", "Status"]],
      body: pendaftar.map((item) => [
        item.user?.name ?? "-",
        item.user?.email ?? "-",
        item.universitas ?? "-",
        item.jurusan ?? "-",
        item.status ?? "-",
      ]),
      theme: "striped",
    });

    doc.save("laporan-dashboard.pdf");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Overview</h1>

      <div className="flex gap-2 items-start flex-wrap">
        <Button
          size="sm"
          className="gap-2 bg-abu hover:bg-abu/90"
          onClick={handleDownloadPDF}
        >
          <Download size={14} />
          Download
        </Button>

        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-2"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Calendar size={14} />
            {startDate && endDate ? `${startDate} s/d ${endDate}` : "Pilih Tgl"}
          </Button>

          {showDatePicker && (
            <div className="flex items-center gap-2 p-3 border rounded-xl bg-white shadow-md">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
              <span className="text-sm text-gray-500">s/d</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
              <Button size="sm" onClick={handleApplyDate} disabled={!startDate || !endDate}>
                Terapkan
              </Button>
              <Button size="sm" variant="ghost" onClick={handleResetDate}>
                <X size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <StatCard cards={cards} />
      <ChartsPage />
      <Pendaftar />
    </div>
  );
};

export default DashboardPage;