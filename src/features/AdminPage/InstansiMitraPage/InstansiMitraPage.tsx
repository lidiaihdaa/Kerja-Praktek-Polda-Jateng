import { useEffect, useState } from "react";
import axios from "axios";
import TableInstansiMitra, { type InstansiMitra } from "./Components/TableInstansiMitra";
import { Button } from "@/components/ui/button";
import { Download, Calendar, X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InstansiMitraPage = () => {
  const [data, setData] = useState<InstansiMitra[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fetchData = (start?: string, end?: string) => {
    const token = localStorage.getItem("auth_token");
    const params: any = {};
    if (start && end) {
      params.start_date = start;
      params.end_date = end;
    }

    axios
      .get("http://127.0.0.1:8000/api/admin/pendaftar", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      })
      .then((res) => {
        const pendaftar = res.data.data || [];

        const diterima = pendaftar.filter(
          (item: any) => item.status?.toLowerCase() === "diterima"
        );

        const grouped: Record<string, InstansiMitra> = {};
        diterima.forEach((item: any) => {
          const key = `${item.universitas}__${item.jurusan}`;
          if (grouped[key]) {
            grouped[key].jumlahMahasiswa += 1;
          } else {
            grouped[key] = {
              universitas: item.universitas,
              jurusan: item.jurusan,
              jumlahMahasiswa: 1,
            };
          }
        });

        setData(Object.values(grouped));
        setLoading(false);
      })
      .catch((err) => console.error("Gagal fetch:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApplyDate = () => {
    if (startDate && endDate) {
      fetchData(startDate, endDate);
      setShowDatePicker(false);
    }
  };

  const handleResetDate = () => {
    setStartDate("");
    setEndDate("");
    setShowDatePicker(false);
    fetchData();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text("Laporan Instansi Mitra Polda Jateng", 14, y);
    y += 8;

    if (startDate && endDate) {
      doc.setFontSize(10);
      doc.text(`Periode: ${startDate} s/d ${endDate}`, 14, y);
      y += 6;
    }

    doc.setFontSize(10);
    doc.text(`Dicetak: ${new Date().toLocaleDateString("id-ID")}`, 14, y);
    y += 10;

    autoTable(doc, {
      startY: y,
      head: [["Universitas", "Jurusan", "Jumlah Mahasiswa"]],
      body: data.map((item) => [
        item.universitas ?? "-",
        item.jurusan ?? "-",
        item.jumlahMahasiswa ?? 0,
      ]),
      theme: "striped",
    });

    doc.save("laporan-instansi-mitra.pdf");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Instansi Mitra</h1>

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

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <TableInstansiMitra data={data} />
      )}
    </div>
  );
};

export default InstansiMitraPage;