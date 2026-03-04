import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

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

  const [loading, setLoading] = useState(true);

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

    const interval = setInterval(() => {
      fetchDashboard();
    }, 10000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* FILTER TANGGAL */}
      <div className="flex gap-2">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
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
                <Line
                  type="monotone"
                  dataKey="jumlah"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
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
              <p className="text-sm text-gray-500">
                Belum ada mahasiswa baru
              </p>
            ) : (
              recent.map((m) => (
                <div
                  key={m.id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{m.user?.name ?? "-"}</span>

                  <span className="text-sm text-gray-500">
                    {m.universitas}
                  </span>
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