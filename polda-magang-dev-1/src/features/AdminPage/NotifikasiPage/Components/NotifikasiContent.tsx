import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  UserPlus,
  AlertTriangle,
  Search,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Notifikasi = {
  id: number;
  type: "pendaftar" | "peringatan";
  title: string;
  description: string;
  time: string;
  actionLabel: string;
};

const DATA: Notifikasi[] = [
  {
    id: 1,
    type: "pendaftar",
    title: "Pendaftar Baru",
    description: "Budi Santoso dari Universitas Diponegoro telah mendaftar magang di divisi Subbid Tekinfo.",
    time: "2 menit yang lalu",
    actionLabel: "Lihat Detail",
  },
  {
    id: 2,
    type: "peringatan",
    title: "Peringatan Deadline",
    description: "Masa magang Tim A - Tekinfo akan berakhir dalam 7 hari. Segera lakukan penilaian akhir.",
    time: "1 jam yang lalu",
    actionLabel: "Tindak Lanjut",
  },
  {
    id: 4,
    type: "pendaftar",
    title: "Pendaftar Baru",
    description: "Siti Aminah dari Universitas Dian Nuswantoro telah mendaftar magang di divisi Humas.",
    time: "5 jam yang lalu",
    actionLabel: "Lihat Detail",
  },
  {
    id: 5,
    type: "peringatan",
    title: "Peringatan Deadline",
    description: "Laporan bulanan belum diselesaikan. Batas waktu pengumpulan: 28 Februari 2025.",
    time: "1 hari yang lalu",
    actionLabel: "Tindak Lanjut",
  },
  {
    id: 7,
    type: "pendaftar",
    title: "Pendaftar Baru",
    description: "Ahmad Fauzi dari UIN Walisongo telah mendaftar magang di divisi Reskrim.",
    time: "2 hari yang lalu",
    actionLabel: "Lihat Detail",
  },
  {
    id: 8,
    type: "peringatan",
    title: "Peringatan Deadline",
    description: "Absensi belum direkap untuk minggu ke-3 Februari 2025.",
    time: "3 hari yang lalu",
    actionLabel: "Tindak Lanjut",
  },
];

const typeConfig = {
  pendaftar: {
    bgColor: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    icon: UserPlus,
    buttonClass: "bg-green-600 hover:bg-green-700 text-white",
  },
  peringatan: {
    bgColor: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    icon: AlertTriangle,
    buttonClass: "bg-yellow-600 hover:bg-yellow-700 text-white",
  },
};

const NotifCard = ({ notif }: { notif: Notifikasi }) => {
  const config = typeConfig[notif.type];
  const Icon = config.icon;
  const navigate = useNavigate();

  const handleAction = () => {
    if (notif.type === "pendaftar") {
      navigate("/admin/pendaftar");
    } else if (notif.type === "peringatan") {
      navigate("/admin/penilaian");
    }
  };

  return (
    <Card className={`border ${config.bgColor}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg ${config.iconBg}`}>
            <Icon size={20} className={config.iconColor} />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">{notif.title}</h4>
              <span className="text-xs text-muted-foreground">{notif.time}</span>
            </div>
            <p className="text-sm text-gray-600">{notif.description}</p>
          </div>

          <Button
            size="sm"
            className={`gap-2 shrink-0 ${config.buttonClass}`}
            onClick={handleAction}
          >
            <Eye size={14} />
            {notif.actionLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const NotifikasiContent = () => {
  const [search, setSearch] = useState("");

  const filtered = DATA.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );

  const pendaftarNotifs = filtered.filter((n) => n.type === "pendaftar");
  const peringatanNotifs = filtered.filter((n) => n.type === "peringatan");

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari notifikasi..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="semua" className="w-full">
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="penting">Penting / Urgent</TabsTrigger>
          <TabsTrigger value="pendaftar">Pendaftar Baru</TabsTrigger>
        </TabsList>

        <TabsContent value="semua" className="space-y-3 mt-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tidak ada notifikasi ditemukan.</p>
          ) : (
            filtered.map((notif) => <NotifCard key={notif.id} notif={notif} />)
          )}
        </TabsContent>

        <TabsContent value="penting" className="space-y-3 mt-4">
          {peringatanNotifs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tidak ada notifikasi peringatan.</p>
          ) : (
            peringatanNotifs.map((notif) => <NotifCard key={notif.id} notif={notif} />)
          )}
        </TabsContent>

        <TabsContent value="pendaftar" className="space-y-3 mt-4">
          {pendaftarNotifs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tidak ada notifikasi pendaftar baru.</p>
          ) : (
            pendaftarNotifs.map((notif) => <NotifCard key={notif.id} notif={notif} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotifikasiContent;