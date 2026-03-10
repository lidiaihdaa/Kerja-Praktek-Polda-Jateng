import { useEffect, useState } from "react";
import axios from "axios";
import Charts from "./Components/Charts";
import Map from "./Components/Map";
import { Button } from "@/components/ui/button";
import { Download, Calendar, X } from "lucide-react";

interface ChartItem {
  bulan: string;
  jumlah: number;
}

const AnalyticPage = () => {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
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

    axios.get("http://127.0.0.1:8000/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    })
    .then((res) => setChartData(res.data.charts || []))
    .catch((err) => console.error("Gagal fetch analytic:", err));
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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analisis</h1>

      <div className="flex gap-2 items-start flex-wrap">
        <Button size="sm" className="gap-2 bg-abu hover:bg-abu/90">
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

      <Charts data={chartData} />
      <Map />
    </div>
  );
};

export default AnalyticPage;