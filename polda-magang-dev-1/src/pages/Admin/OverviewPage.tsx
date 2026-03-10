import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CalendarIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface CardItem {
  title: string;
  value: number;
}

interface ChartItem {
  bulan: string;
  jumlah: number;
}

interface Mahasiswa {
  id: number;
  universitas: string;
  user?: {
    name?: string;
  };
}

const OverviewPage = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [chart, setChart] = useState<ChartItem[]>([]);
  const [recent, setRecent] = useState<Mahasiswa[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      let url = "http://127.0.0.1:8000/api/admin/dashboard";
      if (startDate && endDate) {
        url += `?start_date=${startDate}&end_date=${endDate}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });
      const result = await response.json();
      if (response.ok) {
        setCards(result.cards ?? []);
        setChart(result.charts ?? []);
        setRecent(result.recent_students ?? []);
      }
    } catch (error) {
      console.error("Gagal mengambil data dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(() => fetchDashboard(), 10000);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Overview Dashboard - SIMAGANG POLDA JATENG", 14, 18);

      if (startDate && endDate) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Periode: ${startDate} s/d ${endDate}`, 14, 26);
      }

      // Statistik
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Statistik", 14, 38);

      autoTable(doc, {
        startY: 42,
        head: [["Kategori", "Jumlah"]],
        body: cards.length > 0
          ? cards.map((c) => [c.title, String(c.value)])
          : [["Tidak ada data", "-"]],
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 88, 97] },
      });

      // Grafik pendaftaran sebagai tabel
      const y1 = (doc as any).lastAutoTable.finalY + 12;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Data Grafik Pendaftaran", 14, y1);

      autoTable(doc, {
        startY: y1 + 4,
        head: [["Bulan", "Jumlah Pendaftar"]],
        body: chart.length > 0
          ? chart.map((c) => [c.bulan, String(c.jumlah)])
          : [["Tidak ada data", "-"]],
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 88, 97] },
      });

      // Mahasiswa terbaru
      const y2 = (doc as any).lastAutoTable.finalY + 12;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Mahasiswa Terbaru", 14, y2);

      autoTable(doc, {
        startY: y2 + 4,
        head: [["Nama", "Universitas"]],
        body: recent.length > 0
          ? recent.map((m) => [m.user?.name ?? "-", m.universitas ?? "-"])
          : [["Tidak ada data", "-"]],
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 88, 97] },
      });

      doc.save(`overview-${new Date().toISOString().slice(0, 10)}.pdf`);

    } catch (err) {
      console.error("PDF error:", err);
      alert("Gagal membuat PDF. Cek console untuk detail error.");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* TITLE + TOMBOL */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Overview</h1>
        <div className="flex items-center gap-2">

          {/* TOMBOL DOWNLOAD */}
          <Button
            type="button"
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-900"
          >
            <Download size={16} />
            Download
          </Button>

          {/* TOMBOL PILIH TANGGAL */}
          <div className="relative" ref={datePickerRef}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDatePicker((prev) => !prev)}
              className="flex items-center gap-2"
            >
              <CalendarIcon size={16} />
              {startDate && endDate ? `${startDate} – ${endDate}` : "Pilih Tgl"}
            </Button>

            {showDatePicker && (
              <div className="absolute right-0 z-50 mt-2 p-4 bg-white border rounded-lg shadow-lg w-72 space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Dari Tanggal</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Sampai Tanggal</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div className="flex justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => { setStartDate(""); setEndDate(""); setShowDatePicker(false); }}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(false)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {cards.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada data statistik</p>
        ) : (
          cards.map((card, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* CHART */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 font-semibold">Grafik Pendaftaran</h3>
          {chart.length === 0 ? (
            <p className="text-sm text-gray-500">Tidak ada data grafik</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bulan" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="jumlah" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* MAHASISWA TERBARU */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 font-semibold">Mahasiswa Terbaru</h3>
          <div className="space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada mahasiswa baru</p>
            ) : (
              recent.map((m) => (
                <div key={m.id} className="flex justify-between border-b pb-2">
                  <span>{m.user?.name ?? "-"}</span>
                  <span className="text-sm text-gray-500">{m.universitas}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;