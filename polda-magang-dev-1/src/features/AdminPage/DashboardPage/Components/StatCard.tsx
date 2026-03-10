import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Users, Building, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface CardsData {
  pendaftar: number;
  aktif: number;
  instansi: number;
  nilai: number;
}

interface Props {
  cards?: CardsData | null;
}

export const StatCard = ({ cards }: Props) => {
  const navigate = useNavigate();

  const data = [
    {
      title: "Pendaftar Baru",
      value: cards?.pendaftar ?? 0,
      icon: ClipboardList,
      path: "/admin/pendaftar"
    },
    {
      title: "Pemagang Aktif",
      value: cards?.aktif ?? 0,
      icon: Users,
      path: "/admin/laporan/mhs"
    },
    {
      title: "Total Instansi Mitra",
      value: cards?.instansi ?? 0,
      icon: Building,
      path: "/admin/laporan/instansi-mitra"
    },
    {
      title: "Rata - Rata Nilai Alumni",
      value: cards?.nilai ?? 0,
      icon: Award,
      path: "/admin/laporan/hasil-magang"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Icon size={16} className="text-gray-500"/>
                <p className="text-sm text-gray-500">{item.title}</p>
              </div>
              <p className="text-3xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};